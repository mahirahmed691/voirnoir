"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckoutButton } from "@/components/checkout-button";
import { CtaLink } from "@/components/brand";
import { useCart } from "@/components/cart-provider";
import { formatPrice, getProduct } from "@/lib/catalog";
import { MAX_QTY } from "@/lib/bag";

export function CartView() {
  const { items, setQuantity, removeItem, ready } = useCart();

  const lines = items
    .map((item) => {
      const product = getProduct(item.slug);
      if (!product) return null;
      return { ...item, product };
    })
    .filter((line) => line !== null);

  const total = lines.reduce(
    (sum, line) => sum + line.product.pricePence * line.quantity,
    0,
  );

  if (!ready) {
    return (
      <p className="text-lg text-bone-dim" aria-busy="true">
        Opening the bag.
      </p>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="max-w-xl">
        <p className="text-lg leading-relaxed text-bone-dim">
          The bag is empty. Tees, caps, and a tote, made to order and posted
          from Printful.
        </p>
        <div className="mt-10">
          <CtaLink href="/shop">Shop the house</CtaLink>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-16 lg:grid-cols-[1.4fr_0.8fr] lg:items-start">
      <ul className="divide-y divide-bone/10">
        {lines.map((line) => (
          <li
            key={`${line.slug}-${line.size}`}
            className="grid grid-cols-[5.5rem_1fr] gap-5 py-8 sm:grid-cols-[7rem_1fr]"
          >
            <Link
              href={`/shop/${line.slug}`}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-soft"
            >
              <Image
                src={line.product.images[0].src}
                alt={line.product.images[0].alt}
                fill
                className="object-cover"
                sizes="112px"
              />
            </Link>
            <div className="flex min-w-0 flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link
                    href={`/shop/${line.slug}`}
                    className="font-display text-2xl tracking-wide"
                  >
                    {line.product.name}
                  </Link>
                  <p className="mt-1 text-sm text-bone-dim">Size {line.size}</p>
                </div>
                <p className="text-sm tabular-nums">
                  {formatPrice(line.product.pricePence * line.quantity)}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="inline-flex items-center rounded-full ring-1 ring-inset ring-bone/20">
                  <button
                    type="button"
                    className="grid size-10 place-items-center"
                    onClick={() =>
                      setQuantity(line.slug, line.size, line.quantity - 1)
                    }
                    aria-label={`Reduce quantity of ${line.product.name}`}
                  >
                    −
                  </button>
                  <span className="min-w-6 text-center text-sm tabular-nums">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    className="grid size-10 place-items-center disabled:opacity-40"
                    onClick={() =>
                      setQuantity(line.slug, line.size, line.quantity + 1)
                    }
                    disabled={line.quantity >= MAX_QTY}
                    aria-label={`Increase quantity of ${line.product.name}`}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="text-sm text-bone-dim underline-offset-4 hover:text-bone hover:underline"
                  onClick={() => removeItem(line.slug, line.size)}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="lg:sticky lg:top-28">
        <div className="rounded-[2rem] border border-bone/10 bg-bone/5 p-1.5">
          <div className="rounded-[calc(2rem-0.375rem)] bg-ink-soft px-6 py-8 shadow-[inset_0_1px_1px_var(--bezel)]">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-bone-dim">
            Summary
          </p>
          <div className="mt-6 flex items-end justify-between">
            <span className="text-sm text-bone-dim">Total</span>
            <span className="font-display text-4xl">
              {formatPrice(total)}
            </span>
          </div>
          <p className="mt-2 text-sm text-bone-dim">Postage, free</p>
          <p className="mt-6 text-sm leading-relaxed text-bone-dim">
            Pay here. UK and Ireland postage is free. Printful makes the piece
            and posts it from the United States. By paying you agree to the{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-bone">
              house terms
            </Link>
            .
          </p>
          <p className="mt-4 text-sm leading-relaxed text-bone-dim">
            <Link href="/sign-in" className="underline underline-offset-4 hover:text-bone">
              Sign in
            </Link>{" "}
            to keep the receipt on this house. Guest pay still works.
          </p>
          <div className="mt-8">
            <CheckoutButton items={items} />
          </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
