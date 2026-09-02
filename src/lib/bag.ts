import { getProduct, type Product } from "@/lib/catalog";

export type CartItem = {
  slug: string;
  size: string;
  quantity: number;
};

export type BagLine = {
  slug: string;
  size: string;
  quantity: number;
  product: Product;
};

export const MAX_QTY = 8;
const MAX_LINES = 12;

export function parseBagItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const item = entry as Record<string, unknown>;
      const slug = typeof item.slug === "string" ? item.slug : "";
      const size = typeof item.size === "string" ? item.size : "";
      const quantity = Number(item.quantity);
      if (!slug || !size || !Number.isFinite(quantity)) return null;
      return {
        slug,
        size,
        quantity: Math.min(MAX_QTY, Math.max(1, Math.floor(quantity))),
      };
    })
    .filter((item): item is CartItem => item !== null)
    .slice(0, MAX_LINES);
}

export function resolveBag(items: CartItem[]): BagLine[] {
  const lines: BagLine[] = [];

  for (const item of items) {
    const product = getProduct(item.slug);
    if (!product) continue;
    if (!product.sizes.includes(item.size)) continue;
    lines.push({
      slug: item.slug,
      size: item.size,
      quantity: item.quantity,
      product,
    });
  }

  return lines;
}

export function serializeBag(lines: BagLine[]) {
  return lines
    .map((line) => `${line.slug}|${line.size}|${line.quantity}`)
    .join(",");
}

export function deserializeBag(raw: string | null | undefined): CartItem[] {
  if (!raw) return [];
  return parseBagItems(
    raw.split(",").map((entry) => {
      const [slug, size, quantity] = entry.split("|");
      return { slug, size, quantity: Number(quantity) };
    }),
  );
}
