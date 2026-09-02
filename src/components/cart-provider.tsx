"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProduct } from "@/lib/catalog";
import { MAX_QTY, parseBagItems, type CartItem } from "@/lib/bag";

export type { CartItem };

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  ready: boolean;
  addItem: (slug: string, size: string) => void;
  setQuantity: (slug: string, size: string, quantity: number) => void;
  removeItem: (slug: string, size: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "voirnoir-bag";

function loadItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return parseBagItems(JSON.parse(raw) as unknown);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setItems((current) => (current.length > 0 ? current : loadItems()));
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((slug: string, size: string) => {
    setItems((current) => {
      const match = current.find(
        (item) => item.slug === slug && item.size === size,
      );
      const next = match
        ? current.map((item) =>
            item.slug === slug && item.size === size
              ? { ...item, quantity: Math.min(MAX_QTY, item.quantity + 1) }
              : item,
          )
        : [...current, { slug, size, quantity: 1 }];

      const product = getProduct(slug);
      const line = next.find((item) => item.slug === slug && item.size === size);
      const count = next.reduce((sum, item) => sum + item.quantity, 0);
      setAnnouncement(
        match && line && line.quantity === MAX_QTY && match.quantity >= MAX_QTY
          ? `Eight is the most of ${product?.name ?? "this garment"} in that size.`
          : `${product?.name ?? "Garment"}, size ${size}, added to bag. ${count} ${count === 1 ? "item" : "items"} in bag.`,
      );
      return next;
    });
  }, []);

  const setQuantity = useCallback(
    (slug: string, size: string, quantity: number) => {
      setItems((current) => {
        if (quantity <= 0) {
          return current.filter(
            (item) => !(item.slug === slug && item.size === size),
          );
        }
        return current.map((item) =>
          item.slug === slug && item.size === size
            ? { ...item, quantity: Math.min(MAX_QTY, quantity) }
            : item,
        );
      });
    },
    [],
  );

  const removeItem = useCallback((slug: string, size: string) => {
    setItems((current) => {
      const product = getProduct(slug);
      const next = current.filter(
        (item) => !(item.slug === slug && item.size === size),
      );
      setAnnouncement(`${product?.name ?? "Garment"} removed from bag.`);
      return next;
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      ready,
      addItem,
      setQuantity,
      removeItem,
      clear,
    }),
    [items, itemCount, ready, addItem, setQuantity, removeItem, clear],
  );

  return (
    <CartContext.Provider value={value}>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
