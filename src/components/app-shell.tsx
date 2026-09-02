import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { SkipLink } from "@/components/brand";
import { CartProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  ThemeProvider,
  themeInitScript,
} from "@/components/theme-provider";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { isClerkConfigured } from "@/lib/clerk";

export function AppShell({ children }: { children: React.ReactNode }) {
  const shell = (
    <>
      <Script
        id="voirnoir-theme"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: themeInitScript }}
      />
      <ThemeProvider>
        <CartProvider>
          <div className="site-grain" aria-hidden="true" />
          <SkipLink />
          <SiteHeader />
          {children}
          <SiteFooter />
        </CartProvider>
      </ThemeProvider>
    </>
  );

  if (!isClerkConfigured()) return shell;

  return (
    <ClerkProvider
      appearance={clerkAppearance}
      afterSignOutUrl="/"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/account"
      signUpFallbackRedirectUrl="/account"
    >
      {shell}
    </ClerkProvider>
  );
}
