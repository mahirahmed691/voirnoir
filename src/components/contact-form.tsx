"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { formatPrice, getProduct } from "@/lib/catalog";

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@voirnoir.co.uk";

function useOrderLines() {
  const { items, ready } = useCart();

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = getProduct(item.slug);
          if (!product) return null;
          return { ...item, product };
        })
        .filter((line) => line !== null),
    [items],
  );

  return { lines, ready };
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const { lines, ready } = useOrderLines();
  const total = lines.reduce(
    (sum, line) => sum + line.product.pricePence * line.quantity,
    0,
  );
  const hasOrder = lines.length > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const orderBlock = hasOrder
      ? [
          "Order",
          ...lines.map(
            (line) =>
              `- ${line.product.name}, size ${line.size} × ${line.quantity} — ${formatPrice(line.product.pricePence * line.quantity)}`,
          ),
          `Total: ${formatPrice(total)}`,
          "",
        ].join("\n")
      : "";

    const subject = encodeURIComponent(
      hasOrder
        ? `Voir Noir order, from ${name || "the site"}`
        : `Voir Noir, from ${name || "the site"}`,
    );
    const body = encodeURIComponent(
      `${orderBlock}${message}\n\n— ${name}${email ? `\n${email}` : ""}`,
    );

    window.location.assign(
      `mailto:${contactEmail}?subject=${subject}&body=${body}`,
    );
    setSent(true);
  }

  if (!ready) {
    return (
      <p className="text-lg text-bone-dim" aria-busy="true">
        Loading.
      </p>
    );
  }

  if (sent) {
    return (
      <p className="max-w-md text-lg leading-relaxed text-bone-dim" role="status">
        Your mail app should be open
        {hasOrder ? ", with the bag written into the message" : ""}. If nothing
        appeared, write to{" "}
        <a href={`mailto:${contactEmail}`} className="text-bone underline">
          {contactEmail}
        </a>
        .
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
      {hasOrder ? (
        <div
          id="order"
          className="rounded-[1.75rem] border border-bone/10 bg-bone/5 p-1.5"
        >
          <div className="rounded-[calc(1.75rem-0.375rem)] bg-ink-soft px-5 py-5">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
              Bag
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {lines.map((line) => (
                <li
                  key={`${line.slug}-${line.size}`}
                  className="flex justify-between gap-4"
                >
                  <span>
                    {line.product.name}, size {line.size}
                    {line.quantity > 1 ? ` × ${line.quantity}` : ""}
                  </span>
                  <span className="tabular-nums text-bone-dim">
                    {formatPrice(line.product.pricePence * line.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex justify-between border-t border-bone/10 pt-4 text-sm">
              <span>Total</span>
              <span className="tabular-nums">{formatPrice(total)}</span>
            </p>
            <p className="mt-3 text-xs text-bone-dim">
              This is written into the email.{" "}
              <Link href="/cart" className="underline underline-offset-4">
                Edit the bag
              </Link>
              .
            </p>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-[0.7rem] uppercase tracking-[0.22em] text-bone-dim">
          Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          className="min-h-12 rounded-2xl border border-bone/15 bg-ink-soft px-4 text-bone outline-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[0.7rem] uppercase tracking-[0.22em] text-bone-dim">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="min-h-12 rounded-2xl border border-bone/15 bg-ink-soft px-4 text-bone outline-none"
        />
        <p className="text-xs text-bone-dim">We only use this to reply.</p>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[0.7rem] uppercase tracking-[0.22em] text-bone-dim">
          {hasOrder ? "Note" : "Message"}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder={
            hasOrder ? "Size notes, address, anything we should know." : undefined
          }
          className="rounded-2xl border border-bone/15 bg-ink-soft px-4 py-3 text-bone outline-none placeholder:text-bone-dim/70"
        />
      </div>
      <button
        type="submit"
        className="group inline-flex items-center gap-3 rounded-full bg-bone py-2 pl-5 pr-2 text-sm text-ink transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
      >
        <span>{hasOrder ? "Request this order" : "Open email"}</span>
        <span
          className="grid size-8 place-items-center rounded-full bg-ink/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px"
          aria-hidden="true"
        >
          →
        </span>
      </button>
    </form>
  );
}
