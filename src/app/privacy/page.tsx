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
      image={{
        src: "/images/story-room.png",
        alt: "A dark bedroom at night, black clothing over a wooden chair, a thin strip of streetlight under the door",
        caption: "The book",
      }}
    >
      <HouseSection title="What stays on your machine">
        <p>
          The bag is stored in your browser, under the name voirnoir-bag. It
          does not leave the machine until you pay, or choose to write to us.
          Clearing site data empties it.
        </p>
      </HouseSection>

      <HouseSection title="What you send us">
        <p>
          If you pay, Stripe takes your name, email, card, and posting
          address, and keeps a customer record for the receipt. Printful sees
          the address so they can make and post the cloth. If you leave a note
          at checkout, Printful may print it on the packing slip. If you use
          the contact form, your mail app opens to hello@voirnoir.co.uk. We
          use that only to reply and to make the garment.
        </p>
      </HouseSection>

      <HouseSection title="If you make an account">
        <p>
          An account is optional. Guest pay still works. If you sign in, we
          keep the orders and receipts against that login, and any details you
          choose to leave: an address, a phone, a birthday, a gender. Birthday
          and gender never go to Stripe or Printful. You can leave them blank.
          Guest orders can be claimed later if the email matches.
        </p>
      </HouseSection>

      <HouseSection title="What we do not do">
        <p>
          No newsletters yet. No advertising pixels on this site. We do not
          sell the book.
        </p>
      </HouseSection>

      <HouseSection title="Ask us to forget">
        <p>
          Write to{" "}
          <Link href="/contact" className="text-bone underline underline-offset-4">
            hello@voirnoir.co.uk
          </Link>{" "}
          and we will delete the mail we hold about you, and the account book
          if you ask, unless we must keep a paid order.
        </p>
      </HouseSection>
    </HousePage>
  );
}
