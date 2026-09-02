/**
 * Voir Noir fulfils through Printful.
 *
 * The shop currently reads from `src/lib/catalog.ts` (Etsy listings) so the
 * site can live before API keys exist. Checkout is on Etsy. When you are
 * ready to fulfil from this site:
 *
 * 1. Create a Printful store and copy the API token + store ID
 * 2. Put them in `.env.local` (see `.env.example`)
 * 3. Map each catalogue `slug` to a Printful sync product ID
 *
 * Docs: https://developers.printful.com
 */
export function isPrintfulConfigured() {
  return Boolean(
    process.env.PRINTFUL_API_TOKEN && process.env.PRINTFUL_STORE_ID,
  );
}

export const PRINTFUL_API = "https://api.printful.com";
