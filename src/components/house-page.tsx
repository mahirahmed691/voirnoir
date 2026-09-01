export function HousePage({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <main id="content" className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <article className="mx-auto max-w-[1400px]">
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
          {eyebrow}
        </p>
        <h1 className="font-display mt-5 max-w-[14ch] text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.9] tracking-wide">
          {title}
        </h1>
        <p className="mt-8 max-w-[42ch] text-lg leading-relaxed text-bone-dim">
          {lede}
        </p>
        <div className="mt-16 max-w-[68ch] space-y-10 text-base leading-relaxed text-bone-dim">
          {children}
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
