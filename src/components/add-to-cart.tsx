"use client";

import Link from "next/link";
import { useState } from "react";
import { CtaButton, CtaLink } from "@/components/brand";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/catalog";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (!size) return;
    addItem(product.slug, size);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="mt-10">
      <div className="flex items-baseline justify-between gap-4">
        <p
          id="size-label"
          className="text-[0.7rem] uppercase tracking-[0.22em] text-bone-dim"
        >
          Size
        </p>
        <Link
          href="/size"
          className="text-sm text-bone-dim underline-offset-4 hover:text-bone hover:underline"
        >
          Size guide
        </Link>
      </div>
      <div
        role="radiogroup"
        aria-labelledby="size-label"
        className="mt-3 flex flex-wrap gap-2"
      >
        {product.sizes.map((option) => {
          const selected = option === size;
          return (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name="size"
                value={option}
                checked={selected}
                onChange={() => setSize(option)}
                className="sr-only"
              />
              <span
                className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-4 text-sm ring-1 ring-inset transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  selected
                    ? "bg-bone text-ink ring-bone"
                    : "text-bone ring-bone/20 hover:ring-bone/50"
                }`}
              >
                {option}
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <CtaButton onClick={handleAdd}>
          <span aria-live="polite">{added ? "Added to bag" : "Add to bag"}</span>
        </CtaButton>
        <CtaLink href="/cart" variant="ghost">
          Open bag
        </CtaLink>
      </div>
    </div>
  );
}
