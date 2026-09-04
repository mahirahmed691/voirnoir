import Image from "next/image";
import { CtaLink } from "@/components/brand";
import { Motto } from "@/components/motto";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { products } from "@/lib/catalog";

export default function HomePage() {
  const [lead, ...rest] = products;

  return (
    <main id="content">
      <section className="relative min-h-[100dvh]">
        <Image
          src="/images/studio/hero.jpg"
          alt="Heavy black cotton, one crease catching a thin warm light"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/20" />

        <p className="pointer-events-none absolute right-6 top-1/2 hidden origin-right -translate-y-1/2 rotate-90 text-[0.65rem] uppercase tracking-[0.42em] text-bone/55 md:block">
          voir noir · voirnoir.co.uk
        </p>

        <div className="absolute inset-x-0 bottom-0 px-6 pb-16 md:px-10 md:pb-20">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-bone/80">
            Made for our brother
          </p>
          <h1 className="font-display mt-4 max-w-[8ch] text-[clamp(4.5rem,16vw,10.5rem)] leading-[0.82] tracking-wide">
            <Motto mark />
          </h1>
          <p className="only-dark mt-6 max-w-[36ch] text-base leading-relaxed text-bone/85 md:text-lg">
            Voir Noir is French for see dark. Clothing from the night after
            sight changed, printed one piece at a time.
          </p>
          <p className="only-light mt-6 max-w-[36ch] text-base leading-relaxed text-bone/85 md:text-lg">
            Voir Noir is French for see dark. In the day the house says see
            light. Clothing printed one piece at a time.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <CtaLink href="/shop">Shop the house</CtaLink>
            <CtaLink href="/story" variant="ghost">
              Read the story
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="mx-auto flex max-w-[1400px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display max-w-[10ch] text-5xl leading-none tracking-wide md:text-7xl">
              The house
            </h2>
            <p className="max-w-[42ch] text-sm leading-relaxed text-bone-dim md:text-base">
              Garment-dyed tees, caps, and a tote. Made when you order,
              posted from Printful.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-[1400px] gap-10 md:grid-cols-12 md:gap-8">
          {lead ? (
            <Reveal className="md:col-span-7" delay={80}>
              <ProductCard product={lead} featured />
            </Reveal>
          ) : null}
          <div className="grid gap-10 md:col-span-5">
            {rest.slice(0, 2).map((product, index) => (
              <Reveal key={product.slug} delay={160 + index * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mx-auto mt-14 max-w-[1400px]" delay={280}>
          <CtaLink href="/shop">All pieces</CtaLink>
        </Reveal>
      </section>

      <section className="px-6 pb-24 md:px-10 md:pb-36">
        <Reveal>
          <div className="mx-auto grid max-w-[1400px] overflow-hidden rounded-[2rem] border border-bone/10 bg-bone/5 p-1.5 md:grid-cols-2 md:rounded-[2.5rem]">
            <div className="relative min-h-[22rem] overflow-hidden rounded-[calc(2rem-0.375rem)] md:min-h-[36rem] md:rounded-[calc(2.5rem-0.375rem)] md:rounded-r-none">
              <Image
                src="/images/story-room.png"
                alt="A dark bedroom at night, black clothing over a wooden chair, a strip of streetlight under the door"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-end px-6 py-10 md:px-12 md:py-16">
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
                The house
              </p>
              <h2 className="font-display mt-4 text-4xl leading-none tracking-wide md:text-6xl">
                Darkness is the room, not the gap.
              </h2>
              <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-bone-dim">
                The brand was started for our brother. Bacterial meningitis
                took the sight in his eye. He is Muslim. He is still here. He
                still chooses what he wears.
              </p>
              <div className="mt-10">
                <CtaLink href="/story" variant="ghost">
                  The full story
                </CtaLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
