import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export function SkipLink() {
  return (
    <a href="#content" className="skip-link">
      Skip to main content
    </a>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 text-bone ${className}`}
      aria-label="Voir Noir, home"
    >
      <BrailleV />
      <span className="font-display text-[1.35rem] leading-none tracking-[0.04em]">
        voir noir
      </span>
    </Link>
  );
}

export function BrailleV({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 32"
      aria-hidden="true"
      className="shrink-0"
    >
      <title>Braille letter V</title>
      <circle cx="6" cy="6" r="2.15" fill="currentColor" />
      <circle cx="18" cy="6" r="2.15" fill="currentColor" />
      <circle cx="6" cy="16" r="2.15" fill="currentColor" />
      <circle cx="6" cy="26" r="2.15" fill="currentColor" />
      <circle cx="18" cy="26" r="2.15" fill="currentColor" />
    </svg>
  );
}

function ctaClass(variant: "solid" | "ghost", disabled = false) {
  const styles =
    variant === "solid"
      ? "bg-bone text-ink hover:bg-bone/90"
      : "bg-transparent text-bone ring-1 ring-inset ring-bone/25 hover:bg-bone/5";

  return `group inline-flex items-center gap-3 rounded-full py-2 pl-5 pr-2 text-sm tracking-wide transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${styles} ${
    disabled ? "pointer-events-none opacity-50" : ""
  }`;
}

function CtaInner({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "solid" | "ghost";
}) {
  return (
    <>
      <span>{children}</span>
      <span
        className={`grid size-8 place-items-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px ${
          variant === "solid" ? "bg-ink/10" : "bg-bone/10"
        }`}
        aria-hidden="true"
      >
        <ArrowUpRight size={14} weight="light" />
      </span>
    </>
  );
}

export function CtaButton({
  children,
  variant = "solid",
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={ctaClass(variant, disabled)}
    >
      <CtaInner variant={variant}>{children}</CtaInner>
    </button>
  );
}

export function CtaLink({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
}) {
  const className = ctaClass(variant);

  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noreferrer"
      >
        <CtaInner variant={variant}>{children}</CtaInner>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      <CtaInner variant={variant}>{children}</CtaInner>
    </Link>
  );
}
