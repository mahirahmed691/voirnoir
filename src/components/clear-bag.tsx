"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart-provider";

export function ClearBag({ paid = false }: { paid?: boolean }) {
  const { clear, ready } = useCart();

  useEffect(() => {
    if (!ready || !paid) return;
    clear();
  }, [clear, ready, paid]);

  return null;
}
