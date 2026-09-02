import type { Metadata } from "next";
import Link from "next/link";
import { HousePage, HouseSection } from "@/components/house-page";
import { ETSY_SHOP } from "@/lib/catalog";

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
      lede="Nothing sits in a warehouse. When you order, Printful makes the piece, then posts it. Live orders go through our Etsy shop. UK delivery is free."
    >
      <HouseSection title="How it is made">
        <p>
          Each piece is printed when you ask for it. Making usually takes a few
          working days. Then it is posted from Printful in the United States.
        </p>
      </HouseSection>

      <HouseSection title="UK">
        <p>
          Delivery to the UK is free on the Etsy listings. Once it is in the
          post, allow a week or two. Etsy will send tracking when Printful has
          the parcel.
        </p>
      </HouseSection>

      <HouseSection title="Returns">
        <p>
          Etsy listings accept returns and exchanges within thirty days. If
          the piece arrives damaged or not what you ordered, write through
          Etsy or to{" "}
          <Link href="/contact" className="text-bone underline underline-offset-4">
            hello@voirnoir.co.uk
          </Link>
          .
        </p>
      </HouseSection>

      <HouseSection title="Buy">
        <p>
          The shop on this site holds the bag. Checkout lives on{" "}
          <a
            href={ETSY_SHOP}
            className="text-bone underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            Etsy
          </a>{" "}
          until we wire Printful here.
        </p>
      </HouseSection>
    </HousePage>
  );
}
