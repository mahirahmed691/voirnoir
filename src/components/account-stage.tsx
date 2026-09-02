import Image from "next/image";

export function AccountPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[2rem] border border-bone/10 bg-bone/5 p-1.5 ${className}`}>
      <div className="rounded-[calc(2rem-0.375rem)] bg-ink-soft px-6 py-8 md:px-8 md:py-10">
        {children}
      </div>
    </div>
  );
}

export function AccountStage({
  eyebrow,
  title,
  lede,
  image,
  children,
  align = "start",
}: {
  eyebrow: string;
  title: string;
  lede: React.ReactNode;
  image: { src: string; alt: string; caption?: string };
  children: React.ReactNode;
  align?: "start" | "center";
}) {
  const centered = align === "center";

  return (
    <main
      id="content"
      className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40"
    >
      <article
        className={`mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-16 ${
          centered
            ? "lg:min-h-[calc(100dvh-14rem)] lg:items-center"
            : "lg:items-start"
        }`}
      >
        <div
          className={
            centered ? "lg:col-span-5" : "lg:sticky lg:top-32 lg:col-span-5"
          }
        >
          <div className="rounded-[2rem] border border-bone/10 bg-bone/5 p-1.5">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[calc(2rem-0.375rem)] lg:aspect-[4/5]">
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

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
            {eyebrow}
          </p>
          <h1 className="font-display mt-5 max-w-[12ch] text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.9] tracking-wide">
            {title}
          </h1>
          <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-bone-dim">
            {lede}
          </p>
          <div className="mt-8">{children}</div>
        </div>
      </article>
    </main>
  );
}
