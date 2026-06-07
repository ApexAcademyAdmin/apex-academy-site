"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { CONTACT } from "@/lib/constants";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  colors: string[];
  description: string;
  image?: string;
  dark?: boolean; // black product — needs a spotlight bg to be visible
};

const PRODUCTS: Product[] = [
  // Bundles
  { id: "bundle-starters-2", name: "Starters Bundle — 2 Players", category: "Bundles", price: 549, colors: ["Team Colors"], description: "Everything two players need for the season: 2 Apex hats, 1 home jersey, 1 away jersey, 2 game pants, 2 pairs of socks, 1 belt, 1 batting helmet, 1 performance tee, 1 pair of training shorts, and 1 team jacket." },

  // Hats
  { id: "hat", name: "Apex Hat", category: "Hats", price: 35, colors: ["Black/Green"], description: "Official Apex Academy fitted cap. Structured black crown with a raised embroidered A mark, perforated rear panels, and a pro-style curved brim.", image: "/shop/hat.png", dark: true },

  // Jerseys
  { id: "jersey-home", name: "Home Jersey", category: "Jerseys", price: 90, colors: ["White"], description: "Official Apex Academy home jersey. White New Balance full button-down with the Apex Academy mark, green and black piping, and a pro-cut fit.", image: "/shop/jersey-home.png" },
  { id: "jersey-away", name: "Away Jersey", category: "Jerseys", price: 90, colors: ["Black"], description: "Official Apex Academy away jersey. Black New Balance full button-down with the Apex Academy mark and green piping. Pro-cut fit.", image: "/shop/jersey-away.png", dark: true },

  // Pants & Bottoms
  { id: "pants-game", name: "New Balance Game Pants", category: "Pants & Bottoms", price: 55, colors: ["White", "Black"], description: "Official New Balance game pants. Pro-length with reinforced knees, belt-loop waist, and black piping. Performance fit.", image: "/shop/pants-game.png" },
  { id: "shorts-training", name: "Training Shorts", category: "Pants & Bottoms", price: 40, colors: ["Black"], description: "Lightweight black performance training shorts with the Apex Academy mark. Athletic fit for training and warmups.", image: "/shop/shorts-training.png", dark: true },
  { id: "sweats-apex", name: "Apex Sweatpants", category: "Pants & Bottoms", price: 55, colors: ["Black"], description: "Premium black sweatpants with the embroidered Apex Academy mark. Tapered leg. Comfortable off-field wear.", image: "/shop/sweats-apex.png" },

  // Performance Wear
  { id: "tee-performance", name: "Performance T-Shirt", category: "Performance", price: 30, colors: ["Black"], description: "Moisture-wicking black performance tee with the Apex Academy mark. Athletic fit. Built for training.", image: "/shop/tee-performance.png" },
  { id: "hoodie-apex", name: "Apex Hoodie", category: "Performance", price: 65, colors: ["Black"], description: "Premium heavyweight black hoodie with the Apex Academy mark. Fleece-lined. Cold weather essential.", image: "/shop/hoodie-apex.png" },
  { id: "jacket-apex", name: "Apex Team Jacket", category: "Performance", price: 75, colors: ["Black"], description: "Black quarter-zip team jacket with the Apex Academy mark and green accents. Warm-up and travel.", image: "/shop/jacket-apex.png" },

  // Equipment
  { id: "bag-equipment", name: "Apex Equipment Bag", category: "Equipment", price: 85, colors: ["Black"], description: "Full-size black equipment bag with multiple zippered compartments, green zip pulls, and the Apex Academy mark. Padded straps.", image: "/shop/bag-equipment.png" },

  // Accessories
  { id: "belt-black", name: "Black Belt", category: "Accessories", price: 15, colors: ["Black"], description: "Standard black baseball belt. Adjustable clasp closure.", image: "/shop/belt-black.png" },
  { id: "socks-black", name: "Black Socks", category: "Accessories", price: 12, colors: ["Black"], description: "Performance baseball socks. Moisture-wicking fabric. Over-the-calf length.", image: "/shop/socks-black.png" },
  { id: "helmet-black", name: "Black Batting Helmet", category: "Accessories", price: 45, colors: ["Black"], description: "Gloss black batting helmet with the Apex Academy decal. Meets NOCSAE standards.", image: "/shop/helmet-black.png" },
  { id: "helmet-decal", name: "Apex Helmet Decal", category: "Accessories", price: 5, colors: ["Green/Black"], description: "Official Apex Academy helmet decal. Adhesive-backed. Weather-resistant.", image: "/shop/helmet-decal.png" },
];

const CATEGORIES = ["All", "Bundles", "Hats", "Jerseys", "Pants & Bottoms", "Performance", "Equipment", "Accessories"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = activeCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

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
          <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-2">
            Apex <span className="accent-text">Shop</span>
          </h1>
          <p className="text-[14px] text-white/70 leading-[1.7] max-w-lg">Official Apex Academy apparel and gear.</p>
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
                activeCategory === cat
                  ? "border-[#17FC13]/50 text-[#17FC13] bg-[#17FC13]/[0.05]"
                  : "border-[#171717] text-white/80 hover:border-white/20 hover:text-white/60"
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
            <div
              key={product.id}
              className="border border-[#171717] bg-black hover:border-[#17FC13]/20 transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Product image */}
              <div className={`relative aspect-square flex items-center justify-center overflow-hidden ${product.image ? "bg-black" : "bg-radial"}`}>
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <Image
                    src="/logos/a-mark-sm.png"
                    alt={product.name}
                    width={120}
                    height={120}
                    className="object-contain opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-500"
                  />
                )}
              </div>

              <div className="p-5">
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/70 mb-1.5">{product.category}</div>
                <h3 className="text-sm font-bold uppercase tracking-wide mb-2 text-white group-hover:text-[#17FC13] transition-colors">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">${product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUCT MODAL ── */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-2xl border border-[#171717] bg-black max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white border border-[#171717] bg-black transition-colors cursor-pointer text-lg"
              aria-label="Close"
            >
              &times;
            </button>

            <div className={`relative aspect-[4/3] flex items-center justify-center overflow-hidden ${selectedProduct.image ? "bg-black" : "bg-radial"}`}>
              {selectedProduct.image ? (
                <Image src={selectedProduct.image} alt={selectedProduct.name} fill sizes="(max-width: 768px) 100vw, 672px" className="object-contain" />
              ) : (
                <Image src="/logos/a-mark-sm.png" alt={selectedProduct.name} width={160} height={160} className="object-contain opacity-15" />
              )}
            </div>

            <div className="p-6 md:p-10">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/65 mb-2">{selectedProduct.category}</div>
              <h2 className="text-2xl md:text-3xl uppercase font-bold mb-2">{selectedProduct.name}</h2>
              <div className="text-xl font-bold text-[#17FC13] mb-6">${selectedProduct.price}</div>

              <p className="text-[14px] text-white/90 leading-[1.8] mb-8">{selectedProduct.description}</p>

              <div className="mb-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-3">Colors</div>
                <div className="flex items-center gap-2">
                  {selectedProduct.colors.map((color) => (
                    <span key={color} className="px-4 py-2 border border-[#171717] text-xs font-bold uppercase text-white/90 hover:border-[#17FC13]/30 transition-colors cursor-pointer">
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-3">Size</div>
                <div className="flex flex-wrap gap-2">
                  {["XS", "S", "M", "L", "XL", "2XL"].map((size) => (
                    <span key={size} className="w-12 h-10 flex items-center justify-center border border-[#171717] text-xs font-bold text-white/90 hover:border-[#17FC13]/30 hover:text-white transition-all cursor-pointer">
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              <Button href={`mailto:${CONTACT.email}?subject=Order: ${selectedProduct.name}`}>
                Order Now — ${selectedProduct.price}
              </Button>
              <p className="text-[11px] text-white/60 mt-4">Contact us to place your order. Custom sizing available.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
