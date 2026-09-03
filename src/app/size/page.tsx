import type { Metadata } from "next";
import Link from "next/link";
import { HousePage, HouseSection } from "@/components/house-page";
import { DYED_TEE_SIZES, SIZE_COLUMNS } from "@/lib/sizes";

export const metadata: Metadata = {
  title: "Size guide",
  description:
    "Voir Noir garment measurements, laid flat, for the garment-dyed tee, boxy tee, and caps.",
};

export default function SizePage() {
  return (
    <HousePage
      eyebrow="House"
      title="Size."
      lede="Measurements are the garment laid flat, in centimetres. Find the chest by folding along the seams. Blanks vary by a centimetre or two."
      image={{
        src: "/images/studio/tee-garment-2.jpg",
        alt: "Collar and left chest of the garment-dyed tee, the tonal mark catching light",
        caption: "Laid flat",
      }}
    >
      <HouseSection title="Garment-dyed tee">
        <p>
          Relaxed fit. If you sit between sizes, take the larger one. The cloth
          is heavy and does not cling.
        </p>
        <div className="overflow-x-auto rounded-[1.5rem] border border-bone/10 bg-bone/5 p-1.5">
          <table className="w-full min-w-[28rem] border-collapse overflow-hidden rounded-[calc(1.5rem-0.375rem)] text-left text-sm text-bone">
            <caption className="sr-only">
              Garment-dyed tee measurements in centimetres for sizes S to 4XL.
              Chest is pit to pit laid flat. Length is shoulder to hem.
            </caption>
            <thead>
              <tr className="border-b border-bone/10 bg-ink-soft text-[0.7rem] uppercase tracking-[0.18em] text-bone-dim">
                {SIZE_COLUMNS.map((column) => (
                  <th key={column.key} scope="col" className="px-4 py-3 font-normal">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DYED_TEE_SIZES.map((row) => (
                <tr key={row.size} className="border-b border-bone/10 last:border-0">
                  <th scope="row" className="px-4 py-3 font-normal text-bone">
                    {row.size}
                  </th>
                  <td className="px-4 py-3 tabular-nums">{row.chest}</td>
                  <td className="px-4 py-3 tabular-nums">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </HouseSection>

      <HouseSection title="Boxy tee">
        <p>
          Oversized, drop shoulder. It is meant to sit wide. If you want it
          closer to the body, take a size down from the garment-dyed chart.
        </p>
      </HouseSection>

      <HouseSection title="Caps">
        <p>
          Low-profile, dad hat, and camo dad hat are one size, about 58 cm,
          with an adjustable strap. The premium mesh cap fits about 55 to 60
          cm, plastic closure.
        </p>
      </HouseSection>

      <HouseSection title="Tote">
        <p>One size. About ten litres. Long handles, reinforced at the join.</p>
      </HouseSection>

      <HouseSection title="If you are unsure">
        <p>
          Write to us with a garment you already wear. Chest across, length,
          how you want this one to sit. We will answer in plain language.{" "}
          <Link href="/contact" className="text-bone underline underline-offset-4">
            Contact
          </Link>.
        </p>
      </HouseSection>
    </HousePage>
  );
}
