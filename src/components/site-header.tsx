"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AccountMenuLink, AccountNav } from "@/components/account-nav";
import { Wordmark } from "@/components/brand";
import { useCart } from "@/components/cart-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/story", label: "Story" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const [pulse, setPulse] = useState(false);
  const previousCount = useRef(itemCount);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (itemCount > previousCount.current) {
      setPulse(true);
      const timer = window.setTimeout(() => setPulse(false), 700);
      previousCount.current = itemCount;
      return () => window.clearTimeout(timer);
    }
    previousCount.current = itemCount;
  }, [itemCount]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-5 md:pt-6">
        <div className="pointer-events-auto flex w-full max-w-[1100px] items-center justify-between gap-4 rounded-full border border-bone/10 bg-ink/75 px-4 py-2 shadow-[inset_0_1px_0_var(--bezel)] backdrop-blur-xl transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:px-5">
          <Wordmark />

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Primary"
          >
            {links.map((link) => {
              const current = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={`text-[0.8rem] uppercase tracking-[0.22em] transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    current ? "text-bone" : "text-bone-dim hover:text-bone"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <AccountNav />
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[0.8rem] uppercase tracking-[0.22em] text-bone transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-bone/5"
            >
              Bag
              <span
                aria-hidden="true"
                className={`inline-block text-clay tabular-nums transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  pulse ? "scale-125" : "scale-100"
                }`}
              >
                {itemCount}
              </span>
              <span className="sr-only">
                {itemCount === 1 ? "1 item" : `${itemCount} items`}
              </span>
            </Link>

            <button
              type="button"
              className="relative grid size-10 place-items-center rounded-full md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span
                className={`absolute h-px w-4 bg-bone transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "translate-y-0 rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-bone transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "translate-y-0 -rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-30 bg-ink/92 backdrop-blur-3xl transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        hidden={!open}
      >
        <nav
          aria-label="Mobile"
          className="flex min-h-[100dvh] flex-col justify-end px-6 pb-16 pt-28"
        >
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display border-b border-bone/10 py-5 text-5xl leading-none transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + index * 80}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <AccountMenuLink
            className={`font-display border-b border-bone/10 py-5 text-5xl leading-none transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${120 + links.length * 80}ms` : "0ms" }}
          />
          <ThemeToggle variant="menu" />
        </nav>
      </div>
    </>
  );
}
