import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { AccountStage } from "@/components/account-stage";
import { clerkAuthAppearance } from "@/lib/clerk-appearance";
import { isClerkConfigured } from "@/lib/clerk";

export const metadata: Metadata = {
  title: "Join",
  description: "Make a Voir Noir account for orders and receipts.",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <AccountStage
      align="center"
      eyebrow="House"
      title="Keep a key."
      lede="Optional. Guest checkout stays. If you join, orders and receipts sit here, and you can leave an address for next time."
      image={{
        src: "/images/story-room.png",
        alt: "A dark bedroom at night, black clothing over a wooden chair, a thin strip of streetlight under the door",
        caption: "The key",
      }}
    >
      {isClerkConfigured() ? (
        <div className="flex justify-center lg:justify-start">
          <SignUp forceRedirectUrl="/account" appearance={clerkAuthAppearance} />
        </div>
      ) : (
        <p className="text-lg text-bone-dim">The house book is not open yet.</p>
      )}
    </AccountStage>
  );
}
