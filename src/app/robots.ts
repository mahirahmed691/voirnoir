import type { MetadataRoute } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://voirnoir.co.uk";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/order/", "/account", "/sign-in", "/sign-up", "/api/"] },
    ],
    sitemap: `${site}/sitemap.xml`,
  };
}
