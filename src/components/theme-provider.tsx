"use client";

import { createContext, useCallback, useContext, useMemo } from "react";

export type Theme = "dark" | "light";

type ThemeContextValue = {
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const LIGHT_COLOR = "#f3ece1";
const DARK_COLOR = "#211c16";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem("voirnoir-theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  meta?.setAttribute("content", theme === "light" ? LIGHT_COLOR : DARK_COLOR);
}

export const themeInitScript = `!function(){try{var t=localStorage.getItem("voirnoir-theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark");document.documentElement.style.colorScheme=t==="light"?"light":"dark"}catch(e){document.documentElement.setAttribute("data-theme","dark")}}();`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const toggle = useCallback(() => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "light" ? "dark" : "light");
  }, []);

  const value = useMemo(() => ({ toggle }), [toggle]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
