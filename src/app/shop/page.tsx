import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description: "Voir Noir. Garment-dyed tees, caps, and a tote, made to order.",
};

export default function ShopPage() {
  const [lead, ...rest] = products;

  return (
    <main id="content" className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h1 className="font-display text-6xl leading-none tracking-wide md:text-8xl">
            Shop
          </h1>
          <p className="max-w-[40ch] text-sm leading-relaxed text-bone-dim">
            {products.length} pieces. Pay on this site. Made to order, then
            posted.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-8">
          {lead ? (
            <Reveal className="md:col-span-8">
              <ProductCard product={lead} featured />
            </Reveal>
          ) : null}
          {rest.map((product, index) => (
            <Reveal
              key={product.slug}
              className="md:col-span-4"
              delay={100 + index * 70}
            >
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
