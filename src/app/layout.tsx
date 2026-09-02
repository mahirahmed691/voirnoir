import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Bellefair } from "next/font/google";
import { AppShell } from "@/components/app-shell";
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
    "See dark. See light. Clothing made for our brother, printed on demand.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Voir Noir",
    description:
      "See dark. See light. Clothing made for our brother, printed on demand.",
    url: siteUrl,
    siteName: "Voir Noir",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/images/studio/hero.jpg" }],
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
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
