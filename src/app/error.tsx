"use client";

import { CtaButton } from "@/components/brand";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="content"
      className="flex min-h-[100dvh] flex-col justify-end px-6 pb-24 pt-32 md:px-10"
    >
      <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
        House
      </p>
      <h1 className="font-display mt-4 max-w-[10ch] text-6xl leading-none tracking-wide md:text-8xl">
        Something slipped.
      </h1>
      <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-bone-dim">
        Try again. The shop is still here.
      </p>
      <div className="mt-10">
        <CtaButton onClick={() => reset()}>Try again</CtaButton>
      </div>
    </main>
  );
}
