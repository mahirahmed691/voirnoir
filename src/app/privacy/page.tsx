import type { Metadata } from "next";
import Link from "next/link";
import { HousePage, HouseSection } from "@/components/house-page";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Voir Noir keeps, and what it does not.",
};

export default function PrivacyPage() {
  return (
    <HousePage
      eyebrow="House"
      title="Privacy."
      lede="The shop is small. We keep as little as we can. This page is the whole of it."
    >
      <HouseSection title="What stays on your machine">
        <p>
          The bag is stored in your browser, under the name voirnoir-bag. It
          does not leave the machine until you choose to write to us. Clearing
          site data empties it.
        </p>
      </HouseSection>

      <HouseSection title="What you send us">
        <p>
          If you use the contact form, your mail app opens with your name,
          email, message, and — if you asked for an order — the contents of
          the bag. That mail goes to hello@voirnoir.co.uk. We use it only to
          reply and to make the garment.
        </p>
      </HouseSection>

      <HouseSection title="What we do not do">
        <p>
          No accounts. No newsletters yet. No advertising pixels on this site.
          Live checkout is on Etsy. Printful sees your address when they print
          and post the cloth.
        </p>
      </HouseSection>

      <HouseSection title="Ask us to forget">
        <p>
          Write to{" "}
          <Link href="/contact" className="text-bone underline underline-offset-4">
            hello@voirnoir.co.uk
          </Link>{" "}
          and we will delete the mail we hold about you, unless we must keep
          it for a paid order.
        </p>
      </HouseSection>
    </HousePage>
  );
}
