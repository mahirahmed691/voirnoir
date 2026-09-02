import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { AccountPanel, AccountStage } from "@/components/account-stage";
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
    <AccountStage
      align="center"
      eyebrow={`Order ${order.reference}`}
      title="Receipt."
      lede={`Paid${order.email ? ` to ${order.email}` : ""}. Printful posts to the UK or Ireland. Watch the mail for tracking.`}
      image={{
        src: "/images/studio/tote.jpg",
        alt: "Natural cotton tote standing on dark limestone, black house mark, long handles falling",
        caption: "Kept",
      }}
    >
      <AccountPanel>
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
      </AccountPanel>

      <div className="mt-8 flex flex-wrap gap-3">
        {order.receiptUrl ? (
          <CtaLink href={order.receiptUrl}>Stripe receipt</CtaLink>
        ) : null}
        <CtaLink href="/account" variant={order.receiptUrl ? "ghost" : "solid"}>
          Back to account
        </CtaLink>
      </div>
    </AccountStage>
  );
}
