import type { Metadata } from "next";
import Link from "next/link";
import { HousePage, HouseSection } from "@/components/house-page";
import { SIZE_COLUMNS, TOP_SIZES } from "@/lib/sizes";

export const metadata: Metadata = {
  title: "Size guide",
  description:
    "Voir Noir garment measurements, laid flat, for the hoodie, tee, crewneck, and cap.",
};

export default function SizePage() {
  return (
    <HousePage
      eyebrow="House"
      title="Size."
      lede="Measurements are the garment laid flat, in centimetres. Find the chest by folding along the seams. The numbers are a guide — Printful blanks vary by a centimetre or two."
    >
      <HouseSection title="Tops">
        <p>
          Hoodie, tee, and crewneck share this chart. If you sit between sizes,
          take the larger one. The cloth is heavy and does not cling.
        </p>
        <div className="overflow-x-auto rounded-[1.5rem] border border-bone/10 bg-bone/5 p-1.5">
          <table className="w-full min-w-[36rem] border-collapse overflow-hidden rounded-[calc(1.5rem-0.375rem)] text-left text-sm text-bone">
            <caption className="sr-only">
              Garment measurements in centimetres for sizes S to 2XL. Chest is
              pit to pit laid flat. Length is shoulder to hem. Sleeve is
              shoulder to cuff.
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
              {TOP_SIZES.map((row) => (
                <tr key={row.size} className="border-b border-bone/10 last:border-0">
                  <th scope="row" className="px-4 py-3 font-normal text-bone">
                    {row.size}
                  </th>
                  <td className="px-4 py-3 tabular-nums">{row.chest}</td>
                  <td className="px-4 py-3 tabular-nums">{row.length}</td>
                  <td className="px-4 py-3 tabular-nums">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </HouseSection>

      <HouseSection title="Umbra Cap">
        <p>
          One size. The crown fits a head of about 56 to 60 centimetres. The
          back strap is metal. Tighten until the sweatband sits still, without
          a pinch at the temples.
        </p>
      </HouseSection>

      <HouseSection title="If you are unsure">
        <p>
          Write to us with a garment you already wear — chest across, length,
          how you want this one to sit — and we will answer in plain language.{" "}
          <Link href="/contact" className="text-bone underline underline-offset-4">
            Contact
          </Link>
          .
        </p>
      </HouseSection>
    </HousePage>
  );
}
