import Link from "next/link";
import { BrailleV } from "@/components/brand";
import { Motto } from "@/components/motto";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-bone/10 px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-display text-[clamp(3.25rem,9vw,8rem)] leading-[0.88] tracking-wide text-bone">
          <Motto mark />
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:mt-20">
          <div>
            <div className="flex items-center gap-3 text-bone">
              <BrailleV />
              <p className="font-display text-3xl tracking-[0.04em]">voir noir</p>
            </div>
            <p className="mt-5 max-w-[36ch] text-sm leading-relaxed text-bone-dim">
              Clothing made for our brother, printed one piece at a time
              through Printful.
            </p>
          </div>

          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-bone-dim">
              Visit
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/shop" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-clay">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/story" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-clay">
                  Story
                </Link>
              </li>
              <li>
                <Link href="/cart" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-clay">
                  Bag
                </Link>
              </li>
              <li>
                <Link href="/account" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-clay">
                  Account
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-clay">
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
                <Link href="/size" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-clay">
                  Size guide
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-clay">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-clay">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-clay">
                  Terms
                </Link>
              </li>
              <li>
                <a href="mailto:hello@voirnoir.co.uk" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-clay">
                  hello@voirnoir.co.uk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
