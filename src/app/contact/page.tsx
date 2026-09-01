import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to Voir Noir.",
};

export default function ContactPage() {
  return (
    <main id="content" className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h1 className="font-display text-6xl leading-none tracking-wide md:text-8xl">
            Write
          </h1>
          <p className="mt-8 max-w-[36ch] text-lg leading-relaxed text-bone-dim">
            Orders, sizes, the story, or a greeting. This opens your mail app
            to hello@voirnoir.co.uk.
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
