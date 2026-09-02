import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { CtaLink } from "@/components/brand";
import { ClearBag } from "@/components/clear-bag";
import { formatPrice } from "@/lib/catalog";
import { recordPaidOrder } from "@/lib/house";
import { getPaidCheckoutSession, getPaidOrder } from "@/lib/order";

export const metadata: Metadata = {
  title: "Paid",
  description: "Your Voir Noir order is paid.",
  robots: { index: false, follow: false },
};

type Props = PageProps<"/order/success">;

export default async function OrderSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const sessionId =
    typeof params.session_id === "string" ? params.session_id : undefined;
  let userId: string | null = null;
  try {
    const authState = await auth();
    userId = authState.userId;
  } catch {
    userId = null;
  }
  const session = await getPaidCheckoutSession(sessionId);
  if (session) {
    try {
      await recordPaidOrder(session, userId);
    } catch (error) {
      console.error("Order book failed", error);
    }
  }
  const order = await getPaidOrder(sessionId);

  if (!order) {
    return (
      <main
        id="content"
        className="flex min-h-[100dvh] flex-col justify-end px-6 pb-24 pt-32 md:px-10"
      >
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
          Order
        </p>
        <h1 className="font-display mt-4 max-w-[12ch] text-6xl leading-none tracking-wide md:text-8xl">
          Not this one.
        </h1>
        <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-bone-dim">
          We could not find a paid order here. The bag is where you left it. If
          money left your card, write to hello@voirnoir.co.uk.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <CtaLink href="/cart">Open bag</CtaLink>
          <CtaLink href="/contact" variant="ghost">
            Write
          </CtaLink>
        </div>
      </main>
    );
  }

  return (
    <main
      id="content"
      className="flex min-h-[100dvh] flex-col justify-end px-6 pb-24 pt-32 md:px-10"
    >
      <ClearBag paid />
      <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
        Order {order.reference}
      </p>
      <h1 className="font-display mt-4 max-w-[10ch] text-6xl leading-none tracking-wide md:text-8xl">
        Paid.
      </h1>
      <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-bone-dim">
        Printful will make the piece and post it to the UK or Ireland. Watch
        {order.email ? ` ${order.email}` : " your mail"} for tracking. The bag
        is empty again.
      </p>

      <div className="mt-12 max-w-md rounded-[2rem] border border-bone/10 bg-bone/5 p-1.5">
        <div className="rounded-[calc(2rem-0.375rem)] bg-ink-soft px-6 py-7">
          <ul className="space-y-3 text-sm">
            {order.lines.map((line) => (
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
          <p className="mt-5 flex justify-between border-t border-bone/10 pt-4 text-sm">
            <span>Total, posted free</span>
            <span className="tabular-nums">{order.amount}</span>
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
        {userId && sessionId ? (
          <CtaLink href={`/account/orders/${sessionId}`}>Keep this receipt</CtaLink>
        ) : (
          <CtaLink href="/sign-in">Keep this receipt</CtaLink>
        )}
        <CtaLink href="/shop" variant="ghost">
          Back to the house
        </CtaLink>
      </div>
    </main>
  );
}
