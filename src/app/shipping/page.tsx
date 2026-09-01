import type { Metadata } from "next";
import Link from "next/link";
import { HousePage, HouseSection } from "@/components/house-page";

export const metadata: Metadata = {
  title: "Shipping and returns",
  description:
    "Voir Noir is printed on demand in the UK through Printful. How posting and returns work.",
};

export default function ShippingPage() {
  return (
    <HousePage
      eyebrow="House"
      title="Post."
      lede="Nothing sits in a warehouse. When you order, Printful makes the garment, then posts it. Most UK parcels arrive within a week of leaving the press."
    >
      <HouseSection title="How it is made">
        <p>
          Each piece is printed when you ask for it. Making usually takes two
          to five working days. Then it is posted from Printful in the UK.
        </p>
      </HouseSection>

      <HouseSection title="UK">
        <p>
          Once it is in the post, expect two to five working days. You will
          have a tracking number when Printful has it. We will pass that on
          when checkout is wired; until then we send it by hand with your
          order.
        </p>
      </HouseSection>

      <HouseSection title="Outside the UK">
        <p>
          We can post further. Duties and longer transit sit with the
          destination. Write first if you are ordering from abroad so we can
          be honest about time and cost.
        </p>
      </HouseSection>

      <HouseSection title="If something is wrong">
        <p>
          Print-on-demand cloth is made for you, so we cannot take unworn
          change-of-mind returns yet. If the piece arrives damaged, mis-sized
          against the{" "}
          <Link href="/size" className="text-bone underline underline-offset-4">
            size guide
          </Link>
          , or not what you ordered, write within fourteen days with a
          photograph or a clear description. We will replace or refund.
        </p>
      </HouseSection>

      <HouseSection title="Questions">
        <p>
          <Link href="/contact" className="text-bone underline underline-offset-4">
            hello@voirnoir.co.uk
          </Link>
        </p>
      </HouseSection>
    </HousePage>
  );
}
