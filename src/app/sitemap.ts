import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://voirnoir.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: site, lastModified: now },
    { url: `${site}/shop`, lastModified: now },
    { url: `${site}/story`, lastModified: now },
    { url: `${site}/contact`, lastModified: now },
    { url: `${site}/cart`, lastModified: now },
    ...products.map((product) => ({
      url: `${site}/shop/${product.slug}`,
      lastModified: now,
    })),
  ];
}
