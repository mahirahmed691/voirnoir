"use client";

import { useState } from "react";
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
      <fieldset>
        <legend className="text-[0.7rem] uppercase tracking-[0.22em] text-bone-dim">
          Size
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
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
      </fieldset>

      <button
        type="button"
        onClick={handleAdd}
        className="group mt-8 inline-flex w-full items-center justify-between gap-3 rounded-full bg-bone py-2 pl-6 pr-2 text-sm tracking-wide text-ink transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] sm:w-auto"
      >
        <span>{added ? "Added to bag" : "Add to bag"}</span>
        <span
          className="grid size-8 place-items-center rounded-full bg-ink/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px"
          aria-hidden="true"
        >
          +
        </span>
      </button>
    </div>
  );
}
