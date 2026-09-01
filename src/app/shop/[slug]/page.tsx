import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { CtaLink } from "@/components/brand";
import { formatPrice, getProduct, products } from "@/lib/catalog";

type Props = PageProps<"/shop/[slug]">;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Garment" };

  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      images: [{ url: product.images[0].src }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = products.filter((item) => item.slug !== product.slug);

  return (
    <main id="content" className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="rounded-[2rem] border border-bone/10 bg-bone/5 p-1.5 md:p-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-0.375rem)] bg-ink-soft md:rounded-[calc(2rem-0.5rem)]">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>
          {product.images[1] ? (
            <div className="mt-4 hidden overflow-hidden rounded-[1.75rem] border border-bone/10 lg:block">
              <div className="relative aspect-[16/8]">
                <Image
                  src={product.images[1].src}
                  alt={product.images[1].alt}
                  fill
                  sizes="55vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-5 lg:pt-8">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
            {product.color.name}
          </p>
          <h1 className="font-display mt-4 text-5xl leading-none tracking-wide md:text-6xl">
            {product.name}
          </h1>
          <p className="mt-5 text-xl text-bone-dim">{product.tagline}</p>
          <p className="mt-6 font-display text-4xl">
            {formatPrice(product.pricePence)}
          </p>
          <p className="mt-8 max-w-[48ch] text-base leading-relaxed text-bone-dim">
            {product.description}
          </p>
          <p className="mt-6 text-sm text-bone-dim">{product.fabric}</p>
          <AddToCart product={product} />
        </div>
      </div>

      {others.length > 0 ? (
        <aside className="mx-auto mt-28 max-w-[1400px]">
          <h2 className="font-display text-3xl tracking-wide">Also in the drop</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {others.map((item) => (
              <CtaLink key={item.slug} href={`/shop/${item.slug}`} variant="ghost">
                {item.name}
              </CtaLink>
            ))}
          </div>
        </aside>
      ) : null}
    </main>
  );
}
