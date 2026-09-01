"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/catalog";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) return null;

  return (
    <div>
      <div className="rounded-[2rem] border border-bone/10 bg-bone/5 p-1.5 md:p-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-0.375rem)] bg-ink-soft md:rounded-[calc(2rem-0.5rem)]">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        </div>
      </div>

      {images.length > 1 ? (
        <ul className="mt-4 flex gap-3" aria-label="Garment photographs">
          {images.map((image, index) => {
            const selected = index === active;
            return (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={selected}
                  aria-label={`Photograph ${index + 1} of ${images.length}: ${image.alt}`}
                  className={`relative size-20 overflow-hidden rounded-2xl bg-ink-soft ring-1 ring-inset transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] sm:size-24 ${
                    selected ? "ring-bone" : "ring-bone/15 hover:ring-bone/40"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
