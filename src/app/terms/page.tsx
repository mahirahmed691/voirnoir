import type { Metadata } from "next";
import Link from "next/link";
import { HousePage, HouseSection } from "@/components/house-page";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "How buying from Voir Noir works: payment, making, posting, and returns.",
};

export default function TermsPage() {
  return (
    <HousePage
      eyebrow="House"
      title="Terms."
      lede="Pay on this site. Printful makes the piece. These are the rules of the house."
      image={{
        src: "/images/studio/cap-dad.jpg",
        alt: "Black dad hat on dark linen, antique buckle catching a clay-gold light",
        caption: "The house",
      }}
    >
      <HouseSection title="Who sells">
        <p>
          Voir Noir sells clothing from this site. Stripe takes the payment.
          Printful prints, packs, and posts. Write to{" "}
          <Link href="/contact" className="text-bone underline underline-offset-4">
            hello@voirnoir.co.uk
          </Link>{" "}
          if something is wrong.
        </p>
      </HouseSection>

      <HouseSection title="The order">
        <p>
          The bag is not a contract. When Stripe confirms payment, the order is
          made. Prices are in pounds. We post to the United Kingdom and Ireland
          only, and postage is free. A note on checkout is a wish, not a
          promise about the print.
        </p>
      </HouseSection>

      <HouseSection title="Making">
        <p>
          Each piece is printed when you pay. Nothing sits in a warehouse.
          Allow a few working days for making, then eight to twenty-one working
          days on the water and the road from the United States.
        </p>
      </HouseSection>

      <HouseSection title="Returns">
        <p>
          Made-to-order cloth is not taken back for a change of mind. If the
          piece arrives damaged or not what you ordered, write within thirty
          days and we will make it right.
        </p>
      </HouseSection>

      <HouseSection title="Your details">
        <p>
          Stripe holds the card. Printful sees the posting address. An optional
          account on this site can keep receipts and the details you leave.
          How little else we keep is on{" "}
          <Link href="/privacy" className="text-bone underline underline-offset-4">
            Privacy
          </Link>.
        </p>
      </HouseSection>
    </HousePage>
  );
}
