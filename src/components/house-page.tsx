import Image from "next/image";

export function HousePage({
  eyebrow,
  title,
  lede,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  image?: { src: string; alt: string; caption?: string };
  children: React.ReactNode;
}) {
  return (
    <main id="content" className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <article
        className={`mx-auto max-w-[1400px] ${
          image
            ? "grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16"
            : ""
        }`}
      >
        {image ? (
          <div className="lg:sticky lg:top-32 lg:col-span-5">
            <div className="rounded-[2rem] border border-bone/10 bg-bone/5 p-1.5">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[calc(2rem-0.375rem)] bg-ink-soft shadow-[inset_0_1px_0_var(--bezel)] lg:aspect-[4/5]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-6 pb-6 pt-16">
                  <p className="text-[0.7rem] uppercase tracking-[0.22em] text-bone/80">
                    {image.caption ?? "The house"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className={image ? "lg:col-span-6 lg:col-start-7" : ""}>
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
            {eyebrow}
          </p>
          <h1 className="font-display mt-5 max-w-[14ch] text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.9] tracking-wide">
            {title}
          </h1>
          <p className="mt-8 max-w-[42ch] text-lg leading-relaxed text-bone-dim">
            {lede}
          </p>
          <div
            className={`mt-16 space-y-10 text-base leading-relaxed text-bone-dim ${
              image ? "" : "max-w-[68ch]"
            }`}
          >
            {children}
          </div>
        </div>
      </article>
    </main>
  );
}

export function HouseSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-3xl tracking-wide text-bone">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
