import type { Metadata } from "next";
import { AccountPanel, AccountStage } from "@/components/account-stage";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to Voir Noir.",
};

export default function ContactPage() {
  return (
    <AccountStage
      eyebrow="House"
      title="Write."
      lede="Orders, sizes, the story, or a greeting. Pay from the bag. If you write instead, this opens your mail app to hello@voirnoir.co.uk."
      image={{
        src: "/images/studio/cap-low.jpg",
        alt: "Black low-profile cotton cap on dark limestone, visor catching a warm light",
        caption: "Hello",
      }}
    >
      <AccountPanel>
        <ContactForm />
      </AccountPanel>
    </AccountStage>
  );
}
