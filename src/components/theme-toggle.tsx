"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle({
  variant = "nav",
}: {
  variant?: "nav" | "menu";
}) {
  const { toggle } = useTheme();

  if (variant === "menu") {
    return (
      <button
        type="button"
        onClick={toggle}
        className="font-display mt-8 w-full border-b border-bone/10 py-5 text-left text-5xl leading-none text-bone"
        aria-label="Switch between see dark and see light"
      >
        <span className="only-dark">See light</span>
        <span className="only-light">See dark</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[0.8rem] uppercase tracking-[0.22em] text-bone transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-bone/5"
      aria-label="Switch between see dark and see light"
    >
      <Sun size={16} weight="light" className="only-dark" aria-hidden="true" />
      <Moon size={16} weight="light" className="only-light" aria-hidden="true" />
      <span className="hidden sm:inline">
        <span className="only-dark">See light</span>
        <span className="only-light">See dark</span>
      </span>
    </button>
  );
}
