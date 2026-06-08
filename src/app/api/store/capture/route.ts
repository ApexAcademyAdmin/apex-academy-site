import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { capturePayPalOrder, paypalConfigured } from "@/lib/paypal";
import { sendEmail, adminEmail, orderConfirmationEmail, orderAdminEmail, type StoreOrderEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  if (!paypalConfigured()) return NextResponse.json({ error: "Payments are not configured yet." }, { status: 503 });

  let paypalOrderId: string | undefined;
  try {
    ({ paypalOrderId } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!paypalOrderId) return NextResponse.json({ error: "Missing order." }, { status: 400 });

  const supabase = createAdminClient();
  const { data: order } = await supabase.from("store_orders").select("*").eq("paypal_order_id", paypalOrderId).single();
  if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });

  // Idempotency: if already finalized, just return success.
  if (order.status !== "pending") {
    return NextResponse.json({ ok: true, orderNumber: order.order_number });
  }

  let result;
  try {
    result = await capturePayPalOrder(paypalOrderId);
  } catch (e) {
    console.error("paypal capture", e);
    return NextResponse.json({ error: "Payment could not be completed." }, { status: 502 });
  }
  if (!result.completed) {
    return NextResponse.json({ error: "Payment was not completed." }, { status: 402 });
  }

  await supabase
    .from("store_orders")
    .update({ status: "paid", paypal_capture_id: result.captureId ?? null })
    .eq("id", order.id);

  // Confirmation + admin notification (never fail the order on email).
  const payload: StoreOrderEmail = {
    orderNumber: order.order_number,
    email: order.email,
    customerName: order.customer_name,
    items: order.items,
    subtotalCents: order.subtotal_cents,
    shippingCents: order.shipping_cents,
    taxCents: order.tax_cents,
    totalCents: order.total_cents,
    shippingMethod: order.shipping_method,
    shippingAddress: order.shipping_address,
  };
  try {
    const conf = orderConfirmationEmail(payload);
    const adm = orderAdminEmail(payload);
    await Promise.allSettled([
      sendEmail({ to: order.email, subject: conf.subject, html: conf.html, text: conf.text, replyTo: adminEmail(), template: "order_confirmation" }),
      sendEmail({ to: adminEmail(), subject: adm.subject, html: adm.html, text: adm.text, replyTo: order.email, template: "order_admin" }),
    ]);
  } catch (e) {
    console.error("order email", e);
  }

  return NextResponse.json({ ok: true, orderNumber: order.order_number });
}
