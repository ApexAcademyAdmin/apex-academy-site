// ── Apex Academy store catalog ──
// Source of truth for products. Prices are stored in cents to avoid float math.
// (Admin/DB-managed inventory is a later phase; this is the catalog the storefront renders.)

export type StoreProduct = {
  id: string;
  name: string;
  category: string;
  priceCents: number;
  colors: string[];
  sizes?: string[]; // omitted = one-size / no size selection needed
  description: string;
  image?: string;
  dark?: boolean; // black product — needs a spotlight bg to read on the card
  status?: "active" | "soldout";
};

const APPAREL = ["YM", "YL", "S", "M", "L", "XL", "2XL"];
const HEAD = ["S/M", "L/XL"];

export const PRODUCTS: StoreProduct[] = [
  { id: "bundle-starters-2", name: "Starters Bundle — 2 Players", category: "Bundles", priceCents: 54900, colors: ["Team Colors"], description: "Everything two players need for the season: 2 Apex hats, 1 home jersey, 1 away jersey, 2 game pants, 2 pairs of socks, 1 belt, 1 batting helmet, 1 performance tee, 1 pair of training shorts, and 1 team jacket. Sizing confirmed after checkout.", image: "/shop/bundle-starters.png" },

  { id: "hat", name: "Apex Hat", category: "Hats", priceCents: 3500, colors: ["Black/Green"], sizes: HEAD, description: "Official Apex Academy fitted cap. Structured black crown with a raised embroidered A mark, perforated rear panels, and a pro-style curved brim.", image: "/shop/hat.png", dark: true },

  { id: "jersey-home", name: "Home Jersey", category: "Jerseys", priceCents: 9000, colors: ["White"], sizes: APPAREL, description: "Official Apex Academy home jersey. White New Balance full button-down with the Apex Academy mark, green and black piping, and a pro-cut fit.", image: "/shop/jersey-home.png" },
  { id: "jersey-away", name: "Away Jersey", category: "Jerseys", priceCents: 9000, colors: ["Black"], sizes: APPAREL, description: "Official Apex Academy away jersey. Black New Balance full button-down with the Apex Academy mark and green piping. Pro-cut fit.", image: "/shop/jersey-away.png", dark: true },

  { id: "pants-game", name: "New Balance Game Pants", category: "Pants & Bottoms", priceCents: 5500, colors: ["White", "Black"], sizes: APPAREL, description: "Official New Balance game pants. Pro-length with reinforced knees, belt-loop waist, and black piping. Performance fit.", image: "/shop/pants-game.png" },
  { id: "shorts-training", name: "Training Shorts", category: "Pants & Bottoms", priceCents: 4000, colors: ["Black"], sizes: APPAREL, description: "Lightweight black performance training shorts with the Apex Academy mark. Athletic fit for training and warmups.", image: "/shop/shorts-training.png", dark: true },
  { id: "sweats-apex", name: "Apex Sweatpants", category: "Pants & Bottoms", priceCents: 5500, colors: ["Black"], sizes: APPAREL, description: "Premium black sweatpants with the embroidered Apex Academy mark. Tapered leg. Comfortable off-field wear.", image: "/shop/sweats-apex.png" },

  { id: "tee-performance", name: "Performance T-Shirt", category: "Performance", priceCents: 3000, colors: ["Black"], sizes: APPAREL, description: "Moisture-wicking black performance tee with the Apex Academy mark. Athletic fit. Built for training.", image: "/shop/tee-performance.png" },
  { id: "hoodie-apex", name: "Apex Hoodie", category: "Performance", priceCents: 6500, colors: ["Black"], sizes: APPAREL, description: "Premium heavyweight black hoodie with the Apex Academy mark. Fleece-lined. Cold weather essential.", image: "/shop/hoodie-apex.png" },
  { id: "jacket-apex", name: "Apex Team Jacket", category: "Performance", priceCents: 7500, colors: ["Black"], sizes: APPAREL, description: "Black quarter-zip team jacket with the Apex Academy mark and green accents. Warm-up and travel.", image: "/shop/jacket-apex.png" },

  { id: "bag-equipment", name: "Apex Equipment Bag", category: "Equipment", priceCents: 8500, colors: ["Black"], description: "Full-size black equipment bag with multiple zippered compartments, green zip pulls, and the Apex Academy mark. Padded straps.", image: "/shop/bag-equipment.png" },

  { id: "belt-black", name: "Black Belt", category: "Accessories", priceCents: 1500, colors: ["Black"], description: "Standard black baseball belt. Adjustable clasp closure.", image: "/shop/belt-black.png" },
  { id: "socks-black", name: "Black Socks", category: "Accessories", priceCents: 1200, colors: ["Black"], sizes: ["M", "L"], description: "Performance baseball socks. Moisture-wicking fabric. Over-the-calf length.", image: "/shop/socks-black.png" },
  { id: "helmet-black", name: "Black Batting Helmet", category: "Accessories", priceCents: 4500, colors: ["Black"], sizes: HEAD, description: "Gloss black batting helmet with the Apex Academy decal. Meets NOCSAE standards.", image: "/shop/helmet-black.png" },
  { id: "helmet-decal", name: "Apex Helmet Decal", category: "Accessories", priceCents: 500, colors: ["Green/Black"], description: "Official Apex Academy helmet decal. Adhesive-backed. Weather-resistant.", image: "/shop/helmet-decal.png" },
];

export const CATEGORIES = ["All", "Bundles", "Hats", "Jerseys", "Pants & Bottoms", "Performance", "Equipment", "Accessories"];

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

// ── Shipping options (server-authoritative; mirrored on the cart/checkout UI) ──
export type ShippingOption = { id: string; label: string; detail: string; priceCents: number };
export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: "pickup", label: "Local Pickup", detail: "Free — arrange pickup after ordering", priceCents: 0 },
  { id: "standard", label: "Standard Shipping", detail: "5–7 business days", priceCents: 800 },
  { id: "expedited", label: "Expedited Shipping", detail: "2–3 business days", priceCents: 2000 },
];
export function getShipping(id: string) {
  return SHIPPING_OPTIONS.find((s) => s.id === id) ?? SHIPPING_OPTIONS[1];
}

export const TAX_RATE = 0.0625; // MA sales tax (6.25%)
