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
          <div
            className={`relative overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-ink-soft md:rounded-[calc(2rem-0.5rem)] ${
              featured ? "aspect-[4/5] md:aspect-[4/5]" : "aspect-[4/5]"
            }`}
          >
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, 60vw"
                  : "(max-width: 768px) 100vw, 33vw"
              }
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
            />
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4 px-1">
          <div>
            <h3 className="font-display text-2xl tracking-wide md:text-[1.75rem]">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-bone-dim">{product.tagline}</p>
          </div>
          <p className="pt-1 text-sm tabular-nums text-bone">
            {formatPrice(product.pricePence, product.priceFrom)}
          </p>
        </div>
      </Link>
    </article>
  );
}
