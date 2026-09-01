import { CtaLink } from "@/components/brand";

export default function NotFound() {
  return (
    <main
      id="content"
      className="flex min-h-[100dvh] flex-col justify-end px-6 pb-24 pt-32 md:px-10"
    >
      <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
        404
      </p>
      <h1 className="font-display mt-4 max-w-[10ch] text-6xl leading-none tracking-wide md:text-8xl">
        This room is empty.
      </h1>
      <p className="mt-6 max-w-[40ch] text-bone-dim">
        The page is not here. The shop still is.
      </p>
      <div className="mt-10">
        <CtaLink href="/shop">Back to the drop</CtaLink>
      </div>
    </main>
  );
}
