"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/catalog";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) return null;

  function cycle(delta: number) {
    if (images.length < 2) return;
    setActive((index) => (index + delta + images.length) % images.length);
  }

  return (
    <div>
      <div className="rounded-[2rem] border border-bone/10 bg-bone/5 p-1.5 md:p-2">
        {images.length < 2 ? (
          <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-0.375rem)] bg-ink-soft shadow-[inset_0_1px_0_var(--bezel)] md:rounded-[calc(2rem-0.5rem)]">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => cycle(1)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                cycle(1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                cycle(-1);
              }
            }}
            aria-label={`Photograph ${active + 1} of ${images.length}. Activate for the next view.`}
            className="relative block aspect-[4/5] w-full overflow-hidden rounded-[calc(2rem-0.375rem)] bg-ink-soft shadow-[inset_0_1px_0_var(--bezel)] md:rounded-[calc(2rem-0.5rem)]"
          >
            {images.map((image, index) => (
              <Image
                key={image.src}
                src={image.src}
                alt={index === active ? image.alt : ""}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={`pointer-events-none object-cover transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  index === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </button>
        )}
      </div>
      {images.length > 1 ? (
        <p className="mt-3 px-1 text-[0.65rem] uppercase tracking-[0.22em] text-bone-dim">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </p>
      ) : null}

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
                  className={`relative size-20 overflow-hidden rounded-2xl bg-ink-soft ring-1 ring-inset transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] sm:size-24 ${
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
