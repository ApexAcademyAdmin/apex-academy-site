"use client";

import Image from "next/image";
import { useCart, lineKey } from "@/lib/cart";
import { formatPrice } from "@/lib/store-data";

export default function CartPage() {
  const { items, setQty, remove, subtotalCents, ready, count } = useCart();

  return (
    <main className="min-h-[60vh]">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-[#171717]">
        <div className="absolute inset-0 bg-black" />
        <div className="relative max-w-[1120px] mx-auto px-6 pt-24 md:pt-28 pb-6">
          <div className="flex items-center gap-2 mb-5 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href="/" className="text-white/60 no-underline hover:text-white/80">Home</a>
            <span className="text-white/10">/</span>
            <a href="/shop" className="text-white/60 no-underline hover:text-white/80">Shop</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/50">Cart</span>
          </div>
          <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9]">Your <span className="accent-text">Cart</span></h1>
        </div>
      </section>

      <div className="max-w-[1120px] mx-auto px-6 py-8">
        {!ready ? (
          <div className="text-center py-20 text-[13px] text-white/50">Loading cart…</div>
        ) : count === 0 ? (
          <div className="text-center py-20">
            <p className="text-[14px] text-white/60 mb-6">Your cart is empty.</p>
            <a href="/shop" className="inline-flex items-center rounded-full border border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent px-6 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white no-underline hover:shadow-[0_0_20px_rgba(23,252,19,0.15)]">Browse Shop</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
            {/* Items */}
            <div className="space-y-3">
              {items.map((item) => {
                const key = lineKey(item);
                return (
                  <div key={key} className="flex gap-4 border border-[#171717] bg-radial p-3.5">
                    <div className="w-20 h-20 shrink-0 bg-black border border-[#171717] flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} width={80} height={80} className="object-contain w-full h-full" />
                      ) : (
                        <Image src="/logos/a-mark-sm.png" alt="" width={40} height={40} className="object-contain opacity-20" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-[13px] font-bold uppercase tracking-wide text-white truncate">{item.name}</h3>
                          <div className="text-[11px] text-white/55 mt-0.5">
                            {item.size && <span>Size {item.size}</span>}
                            {item.size && item.color && <span className="mx-1.5 text-white/20">·</span>}
                            {item.color && <span>{item.color}</span>}
                          </div>
                        </div>
                        <button onClick={() => remove(key)} className="text-[11px] font-bold uppercase tracking-wider text-white/40 hover:text-red-400/80 transition-colors shrink-0">Remove</button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center border border-[#171717]">
                          <button onClick={() => setQty(key, item.qty - 1)} className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-[#17FC13] cursor-pointer">−</button>
                          <span className="w-9 h-8 flex items-center justify-center text-[12px] font-bold border-x border-[#171717]">{item.qty}</span>
                          <button onClick={() => setQty(key, item.qty + 1)} className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-[#17FC13] cursor-pointer">+</button>
                        </div>
                        <span className="text-sm font-bold text-white">{formatPrice(item.priceCents * item.qty)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-24 h-fit border border-[#171717] bg-radial p-5">
              <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#17FC13]/50 mb-4">Order Summary</div>
              <div className="space-y-2.5 text-[13px]">
                <div className="flex items-center justify-between text-white/80"><span>Subtotal</span><span className="font-bold">{formatPrice(subtotalCents)}</span></div>
                <div className="flex items-center justify-between text-white/55"><span>Shipping</span><span>Calculated at checkout</span></div>
                <div className="flex items-center justify-between text-white/55"><span>Tax</span><span>Calculated at checkout</span></div>
              </div>
              <div className="border-t border-[#171717] mt-4 pt-4 flex items-center justify-between">
                <span className="text-[13px] font-bold uppercase tracking-wide text-white">Estimated Total</span>
                <span className="text-lg font-bold text-white">{formatPrice(subtotalCents)}</span>
              </div>
              <a href="/shop/checkout" className="mt-5 w-full inline-flex items-center justify-center rounded-full border border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent px-6 py-3 text-[13px] font-bold uppercase tracking-wide text-white no-underline hover:shadow-[0_0_20px_rgba(23,252,19,0.15)] transition-all">
                Checkout
              </a>
              <a href="/shop" className="block text-center mt-3 text-[11px] font-bold uppercase tracking-wider text-white/45 hover:text-white/70 no-underline">Continue Shopping</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
