"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { CONTACT } from "@/lib/constants";

export default function SuccessPage() {
  const { clear } = useCart();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderNumber(params.get("order"));
    clear(); // safety — cart is emptied after a completed order
  }, [clear]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full text-center">
        <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-[#17FC13]/40 bg-[#17FC13]/[0.06] flex items-center justify-center">
          <svg className="w-6 h-6 text-[#17FC13]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/60 mb-3">Order Confirmed</div>
        <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-4">Thank You<span className="accent-text">.</span></h1>
        <p className="text-[14px] text-white/75 leading-[1.75] mb-6">
          Your order is confirmed and a receipt is on its way to your email. We&apos;ll be in touch with shipping or pickup details.
        </p>

        {orderNumber && (
          <div className="inline-flex items-center gap-2 border border-[#171717] bg-radial px-5 py-3 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Order</span>
            <span className="text-sm font-bold text-white font-mono">{orderNumber}</span>
          </div>
        )}

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a href="/shop" className="inline-flex items-center rounded-full border border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent px-6 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white no-underline hover:shadow-[0_0_20px_rgba(23,252,19,0.15)]">Continue Shopping</a>
          <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center rounded-full border border-[#404040] px-6 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white/80 no-underline hover:border-[#17FC13]/40">Contact Support</a>
        </div>
        <p className="text-[11px] text-white/40 mt-8">Questions about your order? Email {CONTACT.email}</p>
      </div>
    </main>
  );
}
