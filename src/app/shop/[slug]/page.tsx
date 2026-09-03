import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AddToCart } from "@/components/add-to-cart";
import { CtaLink } from "@/components/brand";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ProductJsonLd } from "@/components/product-json-ld";
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
      <ProductJsonLd product={product} />
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} />
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start lg:pt-4">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
            {product.color.name}
          </p>
          <h1 className="font-display mt-4 text-5xl leading-none tracking-wide md:text-6xl">
            {product.name}
          </h1>
          <p className="mt-5 text-xl text-bone-dim">{product.tagline}</p>
          <p className="mt-6 font-display text-4xl">
            {formatPrice(product.pricePence, product.priceFrom)}
          </p>
          <p className="mt-3 text-sm text-bone-dim">
            Made to order. Free UK and Ireland postage. Eight to twenty-one
            working days.
          </p>
          <p className="mt-8 max-w-[48ch] text-base leading-relaxed text-bone-dim">
            {product.description}
          </p>
          <AddToCart product={product} />

          <dl className="mt-12 space-y-8 border-t border-bone/10 pt-10">
            <div>
              <dt className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
                Known by hand
              </dt>
              <dd className="mt-3 max-w-[48ch] text-base leading-relaxed text-bone-dim">
                {product.feel}
              </dd>
            </div>
            <div>
              <dt className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
                Cloth
              </dt>
              <dd className="mt-3 max-w-[48ch] text-sm leading-relaxed text-bone-dim">
                {product.fabric}
              </dd>
            </div>
            <div>
              <dt className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
                Care
              </dt>
              <dd className="mt-3 max-w-[48ch] text-sm leading-relaxed text-bone-dim">
                {product.care}
              </dd>
            </div>
          </dl>

          <p className="mt-10 text-sm text-bone-dim">
            <Link href="/size" className="underline underline-offset-4 hover:text-bone">
              Size guide
            </Link>
            <span aria-hidden="true"> · </span>
            <Link
              href="/shipping"
              className="underline underline-offset-4 hover:text-bone"
            >
              Shipping
            </Link>
            <span aria-hidden="true"> · </span>
            <Link href="/terms" className="underline underline-offset-4 hover:text-bone">
              Terms
            </Link>
          </p>
        </div>
      </div>

      {others.length > 0 ? (
        <aside className="mx-auto mt-28 max-w-[1400px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-3xl tracking-wide md:text-5xl">
              Also in the house
            </h2>
            <CtaLink href="/shop" variant="ghost">
              All pieces
            </CtaLink>
          </div>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 3).map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </aside>
      ) : null}
    </main>
  );
}
