import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getProduct, getShipping, TAX_RATE } from "@/lib/store-data";
import { createPayPalOrder, paypalConfigured } from "@/lib/paypal";

type IncomingItem = { id: string; size?: string; color?: string; qty: number };

function orderNumber() {
  const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars
  let s = "";
  for (let i = 0; i < 6; i++) s += abc[Math.floor(Math.random() * abc.length)];
  return `APX-${s}`;
}

export async function POST(req: NextRequest) {
  if (!paypalConfigured()) {
    return NextResponse.json({ error: "Payments are not configured yet." }, { status: 503 });
  }

  let body: { items?: IncomingItem[]; customer?: { name?: string; email?: string; phone?: string }; shipping?: { method?: string; address?: Record<string, string> } };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const items = body.items ?? [];
  const customer = body.customer ?? {};
  const shipping = body.shipping ?? {};

  if (!items.length) return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  if (!customer.name?.trim() || !customer.email?.trim()) return NextResponse.json({ error: "Name and email are required." }, { status: 400 });

  const method = shipping.method ?? "standard";
  const ship = getShipping(method);
  if (method !== "pickup") {
    const a = shipping.address ?? {};
    if (!a.line1 || !a.city || !a.state || !a.zip) return NextResponse.json({ error: "A complete shipping address is required." }, { status: 400 });
  }

  // ── Server-authoritative totals (never trust client prices) ──
  let subtotalCents = 0;
  const lineItems: { id: string; name: string; size: string | null; color: string | null; qty: number; unitCents: number }[] = [];
  for (const it of items) {
    const p = getProduct(it.id);
    if (!p) return NextResponse.json({ error: "A product in your cart is no longer available." }, { status: 400 });
    const qty = Math.max(1, Math.min(99, Math.floor(Number(it.qty) || 1)));
    if (p.sizes && (!it.size || !p.sizes.includes(it.size))) {
      return NextResponse.json({ error: `Please choose a valid size for ${p.name}.` }, { status: 400 });
    }
    subtotalCents += p.priceCents * qty;
    lineItems.push({ id: p.id, name: p.name, size: it.size ?? null, color: it.color ?? null, qty, unitCents: p.priceCents });
  }

  const shippingCents = ship.priceCents;
  const taxCents = Math.round(subtotalCents * TAX_RATE);
  const totalCents = subtotalCents + shippingCents + taxCents;
  const number = orderNumber();

  let paypalOrderId: string;
  try {
    paypalOrderId = await createPayPalOrder({
      subtotalCents,
      shippingCents,
      taxCents,
      orderNumber: number,
      items: lineItems.map((l) => ({ name: l.name, quantity: l.qty, unitCents: l.unitCents })),
    });
  } catch (e) {
    console.error("paypal create order", e);
    return NextResponse.json({ error: "Could not start payment. Please try again." }, { status: 502 });
  }

  // Record a pending order; finalized to "paid" on capture.
  const supabase = createAdminClient();
  const { error } = await supabase.from("store_orders").insert({
    order_number: number,
    status: "pending",
    email: customer.email.trim(),
    customer_name: customer.name.trim(),
    phone: customer.phone?.trim() || null,
    items: lineItems,
    subtotal_cents: subtotalCents,
    shipping_cents: shippingCents,
    tax_cents: taxCents,
    total_cents: totalCents,
    shipping_method: method,
    shipping_address: method === "pickup" ? null : shipping.address,
    paypal_order_id: paypalOrderId,
  });
  if (error) {
    console.error("store_orders insert", error);
    return NextResponse.json({ error: "Could not create your order. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ paypalOrderId, orderNumber: number });
}
