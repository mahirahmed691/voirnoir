import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { isClerkConfigured } from "@/lib/clerk";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to keep Voir Noir orders and receipts.",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <main id="content" className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <article className="mx-auto max-w-[1400px]">
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
          House
        </p>
        <h1 className="font-display mt-5 max-w-[14ch] text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.9] tracking-wide">
          Come in.
        </h1>
        <p className="mt-8 max-w-[42ch] text-lg leading-relaxed text-bone-dim">
          Optional. You can still pay as a guest. An account keeps receipts,
          an address, and the details you choose to leave.
        </p>
        <div className="mt-16">
          {isClerkConfigured() ? (
            <SignIn forceRedirectUrl="/account" appearance={clerkAppearance} />
          ) : (
            <p className="text-lg text-bone-dim">The house book is not open yet.</p>
          )}
        </div>
      </article>
    </main>
  );
}
