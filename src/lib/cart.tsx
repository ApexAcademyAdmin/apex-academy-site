"use client";

import { createContext, useContext, useEffect, useMemo, useState, useCallback, type ReactNode } from "react";

export type CartItem = {
  id: string; // product id
  name: string;
  priceCents: number;
  image?: string;
  size?: string;
  color?: string;
  qty: number;
};

// Unique line key so the same product in different size/color is a separate line.
export function lineKey(i: { id: string; size?: string; color?: string }) {
  return `${i.id}|${i.size ?? ""}|${i.color ?? ""}`;
}

type CartContextValue = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotalCents: number;
  ready: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "apex-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  // Hydrate from localStorage once on mount (persists across sessions).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore corrupt cart */
    }
    setReady(true);
  }, []);

  // Persist on every change (after hydration).
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full / unavailable */
    }
  }, [items, ready]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const key = lineKey(item);
      const existing = prev.find((p) => lineKey(p) === key);
      if (existing) {
        return prev.map((p) => (lineKey(p) === key ? { ...p, qty: Math.min(99, p.qty + qty) } : p));
      }
      return [...prev, { ...item, qty: Math.min(99, qty) }];
    });
  }, []);

  const remove = useCallback((key: string) => {
    setItems((prev) => prev.filter((p) => lineKey(p) !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((p) => lineKey(p) !== key)
        : prev.map((p) => (lineKey(p) === key ? { ...p, qty: Math.min(99, qty) } : p))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotalCents = useMemo(() => items.reduce((n, i) => n + i.priceCents * i.qty, 0), [items]);

  const value: CartContextValue = { items, add, remove, setQty, clear, count, subtotalCents, ready };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
