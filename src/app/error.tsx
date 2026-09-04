"use client";

import { AccountStage } from "@/components/account-stage";
import { CtaButton } from "@/components/brand";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AccountStage
      eyebrow="House"
      title="Something slipped."
      lede="Try again. The shop is still here."
      image={{
        src: "/images/studio/cap-low.jpg",
        alt: "Black low-profile cotton cap on dark limestone, visor catching a warm light",
        caption: "Still here",
      }}
      align="center"
    >
      <CtaButton onClick={() => reset()}>Try again</CtaButton>
    </AccountStage>
  );
}
