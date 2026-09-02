import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Bellefair } from "next/font/google";
import Script from "next/script";
import { SkipLink } from "@/components/brand";
import { CartProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  ThemeProvider,
  themeInitScript,
} from "@/components/theme-provider";
import "./globals.css";

const bellefair = Bellefair({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bellefair",
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-atkinson",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://voirnoir.co.uk";

export const viewport: Viewport = {
  themeColor: "#211c16",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Voir Noir",
    template: "%s · Voir Noir",
  },
  description:
    "See dark. See light. Clothing made for our brother, printed on demand and sold on Etsy.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Voir Noir",
    description:
      "See dark. See light. Clothing made for our brother, printed on demand and sold on Etsy.",
    url: siteUrl,
    siteName: "Voir Noir",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/images/etsy/tee-garment-dyed.jpg" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      data-theme="dark"
      suppressHydrationWarning
      className={`${bellefair.variable} ${atkinson.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-bone">
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
      </body>
    </html>
  );
}
