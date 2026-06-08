// ── PayPal REST helpers (Orders v2) ──
// Uses the REST API directly over fetch — no SDK dependency.
// Configured via env: PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_ENV (sandbox|live).

const BASE = process.env.PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

export function paypalConfigured() {
  return !!(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
}

const usd = (cents: number) => (cents / 100).toFixed(2);

async function accessToken(): Promise<string> {
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!id || !secret) throw new Error("PayPal is not configured");
  const res = await fetch(`${BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error(`PayPal auth failed (${res.status})`);
  const data = await res.json();
  return data.access_token as string;
}

export type PayPalLineItem = { name: string; quantity: number; unitCents: number };

export async function createPayPalOrder(input: {
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  items: PayPalLineItem[];
  orderNumber: string;
}): Promise<string> {
  const token = await accessToken();
  const totalCents = input.subtotalCents + input.shippingCents + input.taxCents;
  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        custom_id: input.orderNumber,
        description: `Apex Academy Shop — ${input.orderNumber}`,
        amount: {
          currency_code: "USD",
          value: usd(totalCents),
          breakdown: {
            item_total: { currency_code: "USD", value: usd(input.subtotalCents) },
            shipping: { currency_code: "USD", value: usd(input.shippingCents) },
            tax_total: { currency_code: "USD", value: usd(input.taxCents) },
          },
        },
        items: input.items.map((i) => ({
          name: i.name.slice(0, 127),
          quantity: String(i.quantity),
          unit_amount: { currency_code: "USD", value: usd(i.unitCents) },
        })),
      },
    ],
  };
  const res = await fetch(`${BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`PayPal create order failed (${res.status}): ${txt.slice(0, 300)}`);
  }
  const data = await res.json();
  return data.id as string;
}

export async function capturePayPalOrder(paypalOrderId: string): Promise<{
  completed: boolean;
  captureId?: string;
  payerEmail?: string;
}> {
  const token = await accessToken();
  const res = await fetch(`${BASE}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`PayPal capture failed (${res.status}): ${txt.slice(0, 300)}`);
  }
  const data = await res.json();
  const capture = data?.purchase_units?.[0]?.payments?.captures?.[0];
  return {
    completed: data?.status === "COMPLETED" && capture?.status === "COMPLETED",
    captureId: capture?.id,
    payerEmail: data?.payer?.email_address,
  };
}
