"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { SHIPPING_OPTIONS, getShipping, TAX_RATE, formatPrice } from "@/lib/store-data";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    paypal?: any;
  }
}

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalCents, ready, count, clear } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("standard");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateUS, setStateUS] = useState("MA");
  const [zip, setZip] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [venmoUnavailable, setVenmoUnavailable] = useState(false);
  const [processing, setProcessing] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);

  const shippingCents = getShipping(method).priceCents;
  const taxCents = Math.round(subtotalCents * TAX_RATE);
  const totalCents = subtotalCents + shippingCents + taxCents;

  const isPickup = method === "pickup";
  const emailValid = /\S+@\S+\.\S+/.test(email);
  const addressValid = isPickup || (line1.trim() && city.trim() && stateUS && /^\d{5}$/.test(zip.trim()));
  const formValid = !!(name.trim() && emailValid && addressValid && count > 0);

  // Keep latest values for PayPal closures.
  const dataRef = useRef({ items, name, email, phone, method, line1, line2, city, stateUS, zip });
  dataRef.current = { items, name, email, phone, method, line1, line2, city, stateUS, zip };

  // Load the PayPal SDK (Venmo-only).
  useEffect(() => {
    if (!PAYPAL_CLIENT_ID) return;
    if (window.paypal) { setSdkReady(true); return; }
    const s = document.createElement("script");
    s.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=buttons&enable-funding=venmo&disable-funding=card,credit,paylater&currency=USD`;
    s.async = true;
    s.onload = () => setSdkReady(true);
    s.onerror = () => setError("Could not load the payment system. Please refresh.");
    document.body.appendChild(s);
  }, []);

  // Render the Venmo button when ready + form valid.
  useEffect(() => {
    if (!sdkReady || !window.paypal || !btnRef.current) return;
    btnRef.current.innerHTML = "";
    if (!formValid) return;

    let buttons: any;
    try {
      buttons = window.paypal.Buttons({
        fundingSource: window.paypal.FUNDING.VENMO,
        style: { layout: "vertical", shape: "pill", height: 48, color: "blue", label: "pay" },
        createOrder: async () => {
          setError(null);
          const d = dataRef.current;
          const res = await fetch("/api/store/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: d.items.map((i) => ({ id: i.id, size: i.size, color: i.color, qty: i.qty })),
              customer: { name: d.name, email: d.email, phone: d.phone },
              shipping: { method: d.method, address: { line1: d.line1, line2: d.line2, city: d.city, state: d.stateUS, zip: d.zip } },
            }),
          });
          const json = await res.json();
          if (!res.ok) throw new Error(json.error || "Could not start checkout.");
          return json.paypalOrderId;
        },
        onApprove: async (data: any) => {
          setProcessing(true); // hide checkout UI behind a clean processing screen
          try {
            const res = await fetch("/api/store/capture", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paypalOrderId: data.orderID }),
            });
            const json = await res.json();
            if (!res.ok) { setProcessing(false); setError(json.error || "Payment could not be completed."); return; }
            clear();
            router.push(`/shop/success?order=${encodeURIComponent(json.orderNumber)}`);
          } catch {
            setProcessing(false);
            setError("Payment could not be completed. Please try again.");
          }
        },
        onError: (err: any) => {
          console.error(err);
          setError("Something went wrong with payment. Please try again.");
        },
      });
      if (buttons.isEligible && !buttons.isEligible()) { setVenmoUnavailable(true); return; }
      setVenmoUnavailable(false);
      buttons.render(btnRef.current);
    } catch (e) {
      console.error(e);
      setVenmoUnavailable(true);
    }
    return () => { try { buttons?.close?.(); } catch { /* noop */ } };
  }, [sdkReady, formValid, method, clear, router]);

  if (ready && count === 0) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center py-20">
          <p className="text-[14px] text-white/60 mb-6">Your cart is empty.</p>
          <a href="/shop" className="inline-flex items-center rounded-full border border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent px-6 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white no-underline">Browse Shop</a>
        </div>
      </main>
    );
  }

  const field = "w-full bg-black border border-[#171717] px-3.5 py-2.5 text-[13px] text-white placeholder-white/30 focus:border-[#17FC13]/40 focus:outline-none transition-colors";
  const label = "block text-[10px] font-bold uppercase tracking-[0.15em] text-white/55 mb-1.5";

  return (
    <main className="min-h-[60vh]">
      {/* Processing overlay — hides the checkout UI while the payment is finalized */}
      {processing && (
        <div className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-5 rounded-full border-2 border-[#17FC13]/20 border-t-[#17FC13] animate-spin" />
            <div className="text-[13px] font-bold uppercase tracking-[0.2em] text-white mb-1">Completing Your Order</div>
            <div className="text-[12px] text-white/55">Please don&apos;t close this window…</div>
          </div>
        </div>
      )}

      <section className="relative overflow-hidden border-b border-[#171717]">
        <div className="absolute inset-0 bg-black" />
        <div className="relative max-w-[1120px] mx-auto px-6 pt-24 md:pt-28 pb-6">
          <div className="flex items-center gap-2 mb-5 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href="/shop" className="text-white/60 no-underline hover:text-white/80">Shop</a>
            <span className="text-white/10">/</span>
            <a href="/shop/cart" className="text-white/60 no-underline hover:text-white/80">Cart</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/50">Checkout</span>
          </div>
          <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9]"><span className="accent-text">Checkout</span></h1>
        </div>
      </section>

      <div className="max-w-[1120px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Form */}
        <div className="space-y-7">
          {/* Contact */}
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#17FC13]/50 mb-4">Contact</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2"><label className={label}>Full Name</label><input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="First Last" /></div>
              <div><label className={label}>Email</label><input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" /></div>
              <div><label className={label}>Phone <span className="text-white/30">(optional)</span></label><input className={field} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 555-5555" /></div>
            </div>
          </div>

          {/* Shipping method */}
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#17FC13]/50 mb-4">Delivery</div>
            <div className="space-y-2">
              {SHIPPING_OPTIONS.map((s) => (
                <button key={s.id} onClick={() => setMethod(s.id)} className={`w-full flex items-center justify-between border px-4 py-3 text-left transition-colors ${method === s.id ? "border-[#17FC13]/50 bg-[#17FC13]/[0.04]" : "border-[#171717] hover:border-white/20"}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-3.5 h-3.5 rounded-full border ${method === s.id ? "border-[#17FC13] bg-[#17FC13]" : "border-white/30"}`} />
                    <div>
                      <div className="text-[12px] font-bold uppercase tracking-wide text-white">{s.label}</div>
                      <div className="text-[11px] text-white/50">{s.detail}</div>
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-white">{s.priceCents ? formatPrice(s.priceCents) : "Free"}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Address */}
          {!isPickup && (
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#17FC13]/50 mb-4">Shipping Address</div>
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
                <div className="sm:col-span-6"><label className={label}>Address</label><input className={field} value={line1} onChange={(e) => setLine1(e.target.value)} placeholder="Street address" /></div>
                <div className="sm:col-span-6"><label className={label}>Apt / Unit <span className="text-white/30">(optional)</span></label><input className={field} value={line2} onChange={(e) => setLine2(e.target.value)} placeholder="Apt, suite, unit" /></div>
                <div className="sm:col-span-3"><label className={label}>City</label><input className={field} value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" /></div>
                <div className="sm:col-span-1"><label className={label}>State</label>
                  <select className={field} value={stateUS} onChange={(e) => setStateUS(e.target.value)}>{US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}</select>
                </div>
                <div className="sm:col-span-2"><label className={label}>Zip</label><input className={field} value={zip} onChange={(e) => setZip(e.target.value)} placeholder="00000" inputMode="numeric" /></div>
              </div>
            </div>
          )}

          {/* Payment */}
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#17FC13]/50 mb-4">Payment — Venmo</div>
            {error && <div className="mb-3 text-[12px] text-red-400/90 border border-red-500/20 bg-red-500/[0.04] px-3.5 py-2.5">{error}</div>}
            {!PAYPAL_CLIENT_ID ? (
              <div className="border border-[#171717] bg-radial p-5 text-[12px] text-white/60 leading-[1.7]">
                Venmo checkout is being set up. Once it&apos;s live you&apos;ll be able to pay here directly.
              </div>
            ) : !formValid ? (
              <div className="border border-[#171717] bg-radial p-5 text-[12px] text-white/55">Complete your contact and {isPickup ? "details" : "shipping"} information above to pay with Venmo.</div>
            ) : venmoUnavailable ? (
              <div className="border border-[#171717] bg-radial p-5 text-[12px] text-white/60 leading-[1.7]">Venmo isn&apos;t available for this device/account. Venmo works best on mobile in the U.S. — please try again on your phone, or contact us to complete your order.</div>
            ) : (
              <div ref={btnRef} className="min-h-[52px]" />
            )}
            <p className="text-[11px] text-white/40 mt-3 leading-[1.6]">Secure payment handled by Venmo / PayPal. Apex Academy never sees your payment details.</p>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 h-fit border border-[#171717] bg-radial p-5">
          <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#17FC13]/50 mb-4">Order Summary</div>
          <div className="space-y-2.5 max-h-[260px] overflow-y-auto mb-4">
            {items.map((i) => (
              <div key={`${i.id}|${i.size}|${i.color}`} className="flex items-start justify-between gap-3 text-[12px]">
                <div className="min-w-0">
                  <div className="text-white/85 font-semibold truncate">{i.name}</div>
                  <div className="text-white/45 text-[11px]">{[i.size, i.color, `×${i.qty}`].filter(Boolean).join(" · ")}</div>
                </div>
                <span className="text-white/80 font-bold shrink-0">{formatPrice(i.priceCents * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#171717] pt-4 space-y-2 text-[13px]">
            <div className="flex justify-between text-white/70"><span>Subtotal</span><span>{formatPrice(subtotalCents)}</span></div>
            <div className="flex justify-between text-white/70"><span>Shipping</span><span>{shippingCents ? formatPrice(shippingCents) : "Free"}</span></div>
            <div className="flex justify-between text-white/70"><span>Tax</span><span>{formatPrice(taxCents)}</span></div>
            <div className="flex justify-between pt-2 border-t border-[#171717] text-white font-bold text-base"><span className="uppercase tracking-wide">Total</span><span>{formatPrice(totalCents)}</span></div>
          </div>
        </div>
      </div>
    </main>
  );
}
