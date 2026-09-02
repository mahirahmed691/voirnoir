import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { AccountStage } from "@/components/account-stage";
import { clerkAuthAppearance } from "@/lib/clerk-appearance";
import { isClerkConfigured } from "@/lib/clerk";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to keep Voir Noir orders and receipts.",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <AccountStage
      align="center"
      eyebrow="House"
      title="Come in."
      lede="Optional. You can still pay as a guest. An account keeps receipts, an address, and the details you choose to leave."
      image={{
        src: "/images/story-room.png",
        alt: "A dark bedroom at night, black clothing over a wooden chair, a thin strip of streetlight under the door",
        caption: "The key",
      }}
    >
      {isClerkConfigured() ? (
        <div className="flex justify-center lg:justify-start">
          <SignIn forceRedirectUrl="/account" appearance={clerkAuthAppearance} />
        </div>
      ) : (
        <p className="text-lg text-bone-dim">The house book is not open yet.</p>
      )}
    </AccountStage>
  );
}
