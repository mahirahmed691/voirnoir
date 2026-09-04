import type Stripe from "stripe";
import { deserializeBag, resolveBag, type BagLine } from "@/lib/bag";
import { formatPrice } from "@/lib/catalog";
import { getStripe } from "@/lib/stripe";

export type PaidOrder = {
  reference: string;
  email: string | null;
  amount: string;
  shippingName: string | null;
  shippingSummary: string | null;
  note: string | null;
  lines: BagLine[];
};

export function noteFromSession(session: Stripe.Checkout.Session) {
  const field = session.custom_fields?.find((entry) => entry.key === "note");
  const value = field?.text?.value?.trim();
  return value ? value : null;
}

function shippingSummary(session: Stripe.Checkout.Session) {
  const details = session.collected_information?.shipping_details;
  const address = details?.address;
  if (!address) return null;

  return [address.line1, address.city, address.postal_code, address.country]
    .filter(Boolean)
    .join(", ");
}

export async function getPaidCheckoutSession(sessionId: string | undefined) {
  if (!sessionId?.startsWith("cs_")) return null;

  const stripe = getStripe();
  if (!stripe) return null;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent.latest_charge"],
    });
    if (
      session.payment_status !== "paid" &&
      session.payment_status !== "no_payment_required"
    ) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function getPaidOrder(
  sessionId: string | undefined,
): Promise<PaidOrder | null> {
  const session = await getPaidCheckoutSession(sessionId);
  if (!session) return null;
  return paidOrderFromSession(session);
}

export function paidOrderFromSession(session: Stripe.Checkout.Session): PaidOrder {
  return {
    reference: session.id.slice(-8).toUpperCase(),
    email: session.customer_details?.email ?? null,
    amount: formatPrice(session.amount_total ?? 0),
    shippingName:
      session.collected_information?.shipping_details?.name ??
      session.customer_details?.name ??
      null,
    shippingSummary: shippingSummary(session),
    note: noteFromSession(session),
    lines: resolveBag(deserializeBag(session.metadata?.lines)),
  };
}
