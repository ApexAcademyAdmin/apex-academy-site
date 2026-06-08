"use client";

import { useState } from "react";
import Image from "next/image";
import { PRODUCTS, CATEGORIES, formatPrice, type StoreProduct } from "@/lib/store-data";
import { useCart } from "@/lib/cart";

function CartLink() {
  const { count } = useCart();
  return (
    <a href="/shop/cart" className="inline-flex items-center gap-2 px-4 py-2 border border-[#171717] hover:border-[#17FC13]/30 transition-colors no-underline">
      <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6A1 1 0 005.6 19h12.8M9 22a1 1 0 100-2 1 1 0 000 2zm9 0a1 1 0 100-2 1 1 0 000 2z" /></svg>
      <span className="text-[11px] font-bold uppercase tracking-wider text-white/85">Cart</span>
      {count > 0 && <span className="min-w-5 h-5 px-1 inline-flex items-center justify-center rounded-full bg-[#17FC13] text-black text-[10px] font-bold">{count}</span>}
    </a>
  );
}

export default function ShopPage() {
  const { add } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<StoreProduct | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const filtered = activeCategory === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  function openProduct(p: StoreProduct) {
    setSelected(p);
    setSize(null);
    setColor(p.colors.length === 1 ? p.colors[0] : null);
    setQty(1);
    setAdded(false);
  }

  function addToCart() {
    if (!selected) return;
    if (selected.sizes && !size) return; // size required
    add(
      { id: selected.id, name: selected.name, priceCents: selected.priceCents, image: selected.image, size: size ?? undefined, color: color ?? selected.colors[0] },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const needsSize = !!selected?.sizes;
  const canAdd = !!selected && (!needsSize || !!size);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="relative max-w-[1120px] mx-auto px-6 pt-24 md:pt-28 pb-6">
          <div className="flex items-center gap-2 mb-5 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href="/" className="text-white/60 no-underline hover:text-white/80">Home</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/50">Shop</span>
          </div>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-2">
                Apex <span className="accent-text">Shop</span>
              </h1>
              <p className="text-[14px] text-white/70 leading-[1.7] max-w-lg">Official Apex Academy apparel and gear.</p>
            </div>
            <CartLink />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="border-y border-[#171717] bg-radial">
        <div className="max-w-[1120px] mx-auto px-6 py-3">
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider border transition-all duration-200 cursor-pointer select-none ${
                  activeCategory === cat ? "border-[#17FC13]/50 text-[#17FC13] bg-[#17FC13]/[0.05]" : "border-[#171717] text-white/80 hover:border-white/20 hover:text-white/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1120px] mx-auto px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <div key={product.id} className="border border-[#171717] bg-black hover:border-[#17FC13]/20 transition-all duration-300 group cursor-pointer" onClick={() => openProduct(product)}>
              <div className={`relative aspect-square flex items-center justify-center overflow-hidden ${product.image ? "bg-black" : "bg-radial"}`}>
                {product.image ? (
                  <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-contain group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <Image src="/logos/a-mark-sm.png" alt={product.name} width={120} height={120} className="object-contain opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-500" />
                )}
              </div>
              <div className="p-5">
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/70 mb-1.5">{product.category}</div>
                <h3 className="text-sm font-bold uppercase tracking-wide mb-2 text-white group-hover:text-[#17FC13] transition-colors">{product.name}</h3>
                <span className="text-sm font-bold text-white">{formatPrice(product.priceCents)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUCT MODAL ── */}
      {selected && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="relative w-full max-w-2xl border border-[#171717] bg-black max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white border border-[#171717] bg-black transition-colors cursor-pointer text-lg" aria-label="Close">&times;</button>

            <div className={`relative aspect-[4/3] flex items-center justify-center overflow-hidden ${selected.image ? "bg-black" : "bg-radial"}`}>
              {selected.image ? (
                <Image src={selected.image} alt={selected.name} fill sizes="(max-width: 768px) 100vw, 672px" className="object-contain" />
              ) : (
                <Image src="/logos/a-mark-sm.png" alt={selected.name} width={160} height={160} className="object-contain opacity-15" />
              )}
            </div>

            <div className="p-6 md:p-9">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/65 mb-2">{selected.category}</div>
              <h2 className="text-2xl md:text-3xl uppercase font-bold mb-2">{selected.name}</h2>
              <div className="text-xl font-bold text-[#17FC13] mb-5">{formatPrice(selected.priceCents)}</div>
              <p className="text-[13px] text-white/80 leading-[1.75] mb-6">{selected.description}</p>

              {/* Color */}
              {selected.colors.length > 1 && (
                <div className="mb-5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2.5">Color</div>
                  <div className="flex flex-wrap items-center gap-2">
                    {selected.colors.map((c) => (
                      <button key={c} onClick={() => setColor(c)} className={`px-4 py-2 border text-xs font-bold uppercase transition-colors cursor-pointer ${color === c ? "border-[#17FC13]/50 text-[#17FC13] bg-[#17FC13]/[0.05]" : "border-[#171717] text-white/85 hover:border-[#17FC13]/30"}`}>{c}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size */}
              {selected.sizes && (
                <div className="mb-5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2.5">Size {!size && <span className="text-[#17FC13]/60">· select one</span>}</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.sizes.map((s) => (
                      <button key={s} onClick={() => setSize(s)} className={`min-w-12 h-10 px-3 flex items-center justify-center border text-xs font-bold transition-all cursor-pointer ${size === s ? "border-[#17FC13]/50 text-[#17FC13] bg-[#17FC13]/[0.05]" : "border-[#171717] text-white/85 hover:border-[#17FC13]/30 hover:text-white"}`}>{s}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-7">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2.5">Quantity</div>
                <div className="inline-flex items-center border border-[#171717]">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-[#17FC13] cursor-pointer text-lg">−</button>
                  <span className="w-12 h-10 flex items-center justify-center text-sm font-bold border-x border-[#171717]">{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(99, q + 1))} className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-[#17FC13] cursor-pointer text-lg">+</button>
                </div>
              </div>

              <button
                onClick={addToCart}
                disabled={!canAdd}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-[13px] font-bold uppercase tracking-wide transition-all cursor-pointer ${
                  added
                    ? "border-[#17FC13] bg-[#17FC13] text-black"
                    : canAdd
                    ? "border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent text-white hover:shadow-[0_0_20px_rgba(23,252,19,0.15)]"
                    : "border-[#404040] text-white/40 cursor-not-allowed"
                }`}
              >
                {added ? "Added to Cart ✓" : needsSize && !size ? "Select a Size" : `Add to Cart — ${formatPrice(selected.priceCents * qty)}`}
              </button>
              {added && (
                <a href="/shop/cart" className="block text-center mt-3 text-[12px] font-bold uppercase tracking-wide text-[#17FC13]/80 hover:text-[#17FC13] no-underline">View Cart →</a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
