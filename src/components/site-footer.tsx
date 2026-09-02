import Link from "next/link";
import { BrailleV } from "@/components/brand";
import { Motto } from "@/components/motto";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-bone/10 px-6 py-16 md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 text-bone">
            <BrailleV />
            <p className="font-display text-3xl tracking-[0.04em]">voir noir</p>
          </div>
          <p className="mt-5 max-w-[36ch] text-sm leading-relaxed text-bone-dim">
            <Motto /> Clothing made for our brother, printed one piece at a
            time through Printful.
          </p>
        </div>

        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-bone-dim">
            Visit
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/shop" className="hover:text-clay">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/story" className="hover:text-clay">
                Story
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-clay">
                Bag
              </Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-clay">
                Account
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-clay">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-bone-dim">
            House
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/size" className="hover:text-clay">
                Size guide
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-clay">
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-clay">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-clay">
                Terms
              </Link>
            </li>
            <li>
              <a href="mailto:hello@voirnoir.co.uk" className="hover:text-clay">
                hello@voirnoir.co.uk
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
