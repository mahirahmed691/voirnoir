import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { shopRooms } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description: "Voir Noir. Garment-dyed tees, caps, and a tote, made to order.",
};

function Room({
  title,
  lede,
  children,
  className = "mt-20",
}: {
  title: string;
  lede: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-4xl tracking-wide md:text-5xl">
          {title}
        </h2>
        <p className="max-w-[40ch] text-sm leading-relaxed text-bone-dim">
          {lede}
        </p>
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export default function ShopPage() {
  const { cloth, carry, head } = shopRooms();
  const [lead, ...rest] = cloth;

  return (
    <main id="content" className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h1 className="font-display text-6xl leading-none tracking-wide md:text-8xl">
            Shop
          </h1>
          <p className="max-w-[40ch] text-sm leading-relaxed text-bone-dim">
            Pay on this site. Made to order, then posted.
          </p>
        </div>

        <Room
          className="mt-16"
          title="Cloth"
          lede="Garment-dyed, boxy, and the staple crewneck. Known by weight."
        >
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            {lead ? (
              <Reveal className="md:col-span-7">
                <ProductCard product={lead} featured />
              </Reveal>
            ) : null}
            <div className="grid gap-10 md:col-span-5">
              {rest.map((product, index) => (
                <Reveal key={product.slug} delay={80 + index * 80}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </Room>

        {carry.length > 0 ? (
          <Room title="Carry" lede="Ten litres. Long handles. The bag of the house.">
            <div className="grid gap-10 md:grid-cols-12">
              {carry.map((product) => (
                <Reveal key={product.slug} className="md:col-span-5">
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </Room>
        ) : null}

        {head.length > 0 ? (
          <Room title="Head" lede="Soft crown, mesh back, dad hats. One size, then the strap.">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {head.map((product, index) => (
                <Reveal key={product.slug} delay={index * 60}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </Room>
        ) : null}
      </div>
    </main>
  );
}
