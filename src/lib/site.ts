export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

function isTrustedOrigin(origin: string) {
  try {
    const host = new URL(origin).hostname;
    return (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "voirnoir.co.uk" ||
      host === "www.voirnoir.co.uk" ||
      host.endsWith(".vercel.app")
    );
  } catch {
    return false;
  }
}

export function checkoutOrigin(request: Request) {
  const header = request.headers.get("origin");
  if (header && isTrustedOrigin(header)) return header;

  const fromRequest = new URL(request.url).origin;
  if (isTrustedOrigin(fromRequest)) return fromRequest;

  return siteUrl();
}

export function publicAssetOrigin() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit?.startsWith("https://")) return explicit;
  return "https://www.voirnoir.co.uk";
}

export function integrationIdentifier() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let suffix = "";
  for (let i = 0; i < 8; i += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `voirnoir_bag_${suffix}`;
}
