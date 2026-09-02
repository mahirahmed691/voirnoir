"use client";

import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { isClerkConfigured } from "@/lib/clerk";

const pillClass =
  "hidden rounded-full px-3 py-2 text-[0.8rem] uppercase tracking-[0.22em] text-bone transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-bone/5 md:inline-flex";

export function AccountNav() {
  const pathname = usePathname();
  const current = pathname.startsWith("/account");
  if (!isClerkConfigured()) return null;

  return (
    <>
      <Show when="signed-out">
        <Link href="/sign-in" className={pillClass}>
          Account
        </Link>
      </Show>
      <Show when="signed-in">
        <span className="inline-flex items-center gap-1">
          <Link
            href="/account"
            aria-current={current ? "page" : undefined}
            className={pillClass}
          >
            Account
          </Link>
          <UserButton appearance={clerkAppearance} />
        </span>
      </Show>
    </>
  );
}

export function AccountMenuLink({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  if (!isClerkConfigured()) return null;
  return (
    <>
      <Show when="signed-out">
        <Link href="/sign-in" className={className} style={style}>
          Account
        </Link>
      </Show>
      <Show when="signed-in">
        <Link href="/account" className={className} style={style}>
          Account
        </Link>
      </Show>
    </>
  );
}
