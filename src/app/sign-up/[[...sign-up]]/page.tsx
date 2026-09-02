import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-appearance";

export const metadata: Metadata = {
  title: "Join",
  description: "Make a Voir Noir account for orders and receipts.",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <main id="content" className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <article className="mx-auto max-w-[1400px]">
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
          House
        </p>
        <h1 className="font-display mt-5 max-w-[14ch] text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.9] tracking-wide">
          Keep a key.
        </h1>
        <p className="mt-8 max-w-[42ch] text-lg leading-relaxed text-bone-dim">
          Optional. Guest checkout stays. If you join, orders and receipts sit
          here, and you can leave an address for next time.
        </p>
        <div className="mt-16">
          <SignUp forceRedirectUrl="/account" appearance={clerkAppearance} />
        </div>
      </article>
    </main>
  );
}
