import type { Metadata } from "next";
import Link from "next/link";
import { HousePage, HouseSection } from "@/components/house-page";

export const metadata: Metadata = {
  title: "Shipping and returns",
  description:
    "Voir Noir is made to order through Printful and posted to the UK. How posting and returns work.",
};

export default function ShippingPage() {
  return (
    <HousePage
      eyebrow="House"
      title="Post."
      lede="Nothing sits in a warehouse. When you order on this site, Printful makes the piece, then posts it. UK and Ireland delivery is free."
      image={{
        src: "/images/studio/tote.jpg",
        alt: "Natural cotton tote standing on dark limestone, black house mark, long handles falling",
        caption: "Posted",
      }}
    >
      <HouseSection title="How it is made">
        <p>
          Each piece is printed when you pay. Making usually takes a few
          working days. Then it is posted from Printful in the United States.
        </p>
      </HouseSection>

      <HouseSection title="UK and Ireland">
        <p>
          Delivery is free. Once it is in the post, allow a week or two. We
          send tracking when Printful has the parcel.
        </p>
      </HouseSection>

      <HouseSection title="Returns">
        <p>
          Made-to-order cloth is not taken back for a change of mind. If the
          piece arrives damaged or not what you ordered, write to{" "}
          <Link href="/contact" className="text-bone underline underline-offset-4">
            hello@voirnoir.co.uk
          </Link>{" "}
          within thirty days and we will make it right.
        </p>
      </HouseSection>

      <HouseSection title="Buy">
        <p>
          Add to the bag, then pay on this site. Stripe takes the card.
          Printful cuts and posts the garment. By paying you agree to the{" "}
          <Link href="/terms" className="text-bone underline underline-offset-4">
            house terms
          </Link>.
        </p>
      </HouseSection>
    </HousePage>
  );
}
