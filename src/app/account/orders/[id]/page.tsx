import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { CtaLink } from "@/components/brand";
import { formatPrice } from "@/lib/catalog";
import { getOrderForUser } from "@/lib/house";

export const metadata: Metadata = {
  title: "Receipt",
  description: "A Voir Noir order kept on this house.",
  robots: { index: false, follow: false },
};

type Props = PageProps<"/account/orders/[id]">;

export default async function AccountOrderPage({ params }: Props) {
  const { userId } = await auth.protect();

  const { id } = await params;
  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses[0]?.emailAddress ??
    "";
  const order = await getOrderForUser(userId, id, email);

  if (!order) notFound();

  return (
    <main
      id="content"
      className="flex min-h-[100dvh] flex-col justify-end px-6 pb-24 pt-32 md:px-10"
    >
      <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
        Order {order.reference}
      </p>
      <h1 className="font-display mt-4 max-w-[12ch] text-6xl leading-none tracking-wide md:text-8xl">
        Receipt.
      </h1>
      <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-bone-dim">
        Paid
        {order.email ? ` to ${order.email}` : ""}. Printful posts to the UK or
        Ireland. Watch the mail for tracking.
      </p>

      <div className="mt-12 max-w-md rounded-[2rem] border border-bone/10 bg-bone/5 p-1.5">
        <div className="rounded-[calc(2rem-0.375rem)] bg-ink-soft px-6 py-7">
          <ul className="space-y-3 text-sm">
            {order.lines.map((line) => (
              <li
                key={`${line.name}-${line.size}`}
                className="flex justify-between gap-4"
              >
                <span>
                  {line.name}, size {line.size}
                  {line.quantity > 1 ? ` × ${line.quantity}` : ""}
                </span>
                <span className="tabular-nums text-bone-dim">
                  {formatPrice(line.pence * line.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 flex justify-between border-t border-bone/10 pt-4 text-sm">
            <span>Total, posted free</span>
            <span className="tabular-nums">{formatPrice(order.amountPence)}</span>
          </p>
          {order.shippingName || order.shippingSummary ? (
            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-bone-dim">
              {[order.shippingName, order.shippingSummary]
                .filter(Boolean)
                .join(", ")}
            </p>
          ) : null}
          {order.note ? (
            <p className="mt-4 text-sm leading-relaxed text-bone-dim">
              Note: {order.note}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {order.receiptUrl ? (
          <CtaLink href={order.receiptUrl}>Stripe receipt</CtaLink>
        ) : null}
        <CtaLink href="/account" variant={order.receiptUrl ? "ghost" : "solid"}>
          Back to account
        </CtaLink>
      </div>
    </main>
  );
}
