import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/catalog";

export function ProductCard({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}) {
  const second = product.images[1];

  return (
    <article>
      <Link
        href={`/shop/${product.slug}`}
        className="group block"
        aria-label={`${product.name}, ${formatPrice(product.pricePence, product.priceFrom)}`}
      >
        <div
          className={`rounded-[1.75rem] border border-bone/10 bg-bone/5 p-1.5 md:rounded-[2rem] ${
            featured ? "md:p-2" : ""
          }`}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-ink-soft shadow-[inset_0_1px_0_var(--bezel)] md:rounded-[calc(2rem-0.5rem)]">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, 60vw"
                  : "(max-width: 768px) 100vw, 33vw"
              }
              className={`object-cover transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                second
                  ? "group-hover:opacity-0 group-focus-visible:opacity-0"
                  : "group-hover:scale-[1.03]"
              }`}
            />
            {second ? (
              <Image
                src={second.src}
                alt=""
                fill
                sizes={
                  featured
                    ? "(max-width: 768px) 100vw, 60vw"
                    : "(max-width: 768px) 100vw, 33vw"
                }
                className="object-cover opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            ) : null}
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4 px-1">
          <div>
            <h3 className="font-display text-2xl tracking-wide md:text-[1.75rem]">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-bone-dim">{product.tagline}</p>
            <p className="mt-2 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-bone-dim">
              <span
                aria-hidden="true"
                className="size-2 rounded-full ring-1 ring-bone/25"
                style={{ backgroundColor: product.color.hex }}
              />
              {product.color.name}
            </p>
          </div>
          <p className="pt-1 text-sm tabular-nums text-bone">
            {formatPrice(product.pricePence, product.priceFrom)}
          </p>
        </div>
      </Link>
    </article>
  );
}
