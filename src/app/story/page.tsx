import type { Metadata } from "next";
import Image from "next/image";
import { CtaLink } from "@/components/brand";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Story",
  description:
    "Voir Noir was started for our brother, who lost his sight to bacterial meningitis.",
};

export default function StoryPage() {
  return (
    <main id="content" className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <article className="mx-auto max-w-[1400px]">
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
          Voir noir
        </p>
        <h1 className="font-display mt-5 max-w-[12ch] text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.9] tracking-wide">
          See dark.
        </h1>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="rounded-[2rem] border border-bone/10 bg-bone/5 p-1.5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-0.375rem)]">
                <Image
                  src="/images/story-room.png"
                  alt="A dark bedroom at night, black clothing over a wooden chair, a thin strip of streetlight under the door"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div className="space-y-8 text-lg leading-relaxed text-bone-dim lg:col-span-6 lg:col-start-7 lg:pt-10">
            <Reveal>
              <p>
                Voir Noir is French for see dark. The name is not a metaphor
                we invented for a lookbook. It is the room our brother had to
                learn after bacterial meningitis took the sight in his eye.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p>
                He is Muslim. He is our brother. The brand was made for him:
                clothes that can be known by weight, seam, and heat, and that
                still look like they belong in the day.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p>
                We print with Printful, one garment at a time. Nothing waits
                in a warehouse. When you order, a piece is made and sent. The
                first drop is four black garments. More will come as we learn
                what this house needs.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p>
                Darkness here is not a gap. It is the cloth. It is the hour
                after the lights go. It is a way of seeing that does not ask
                the eye first.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="pt-4">
                <CtaLink href="/shop">Shop the first drop</CtaLink>
              </div>
            </Reveal>
          </div>
        </div>
      </article>
    </main>
  );
}
