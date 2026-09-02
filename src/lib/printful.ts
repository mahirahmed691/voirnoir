import type Stripe from "stripe";
import { deserializeBag, resolveBag } from "@/lib/bag";
import { noteFromSession } from "@/lib/order";

const PRINTFUL_API = "https://api.printful.com";

export function isPrintfulConfigured() {
  return Boolean(process.env.PRINTFUL_API_TOKEN);
}

type PrintfulRecipient = {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code?: string;
  country_code: string;
  zip: string;
  phone?: string;
  email?: string;
};

async function printful<T>(path: string, init?: RequestInit): Promise<T> {
  const token = process.env.PRINTFUL_API_TOKEN;
  if (!token) {
    throw new Error("Printful is not configured");
  }

  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", "application/json");
  if (process.env.PRINTFUL_STORE_ID) {
    headers.set("X-PF-Store-Id", process.env.PRINTFUL_STORE_ID);
  }

  const response = await fetch(`${PRINTFUL_API}${path}`, {
    ...init,
    headers,
  });
  const body = (await response.json()) as {
    code?: number;
    result?: T;
    error?: { message?: string };
  };

  if (!response.ok) {
    throw new Error(body.error?.message ?? `Printful ${response.status}`);
  }

  return body.result as T;
}

function shippingFrom(session: Stripe.Checkout.Session): PrintfulRecipient | null {
  const details = session.collected_information?.shipping_details;
  const address = details?.address;
  if (!details?.name || !address?.line1 || !address.country) return null;

  return {
    name: details.name,
    address1: address.line1,
    address2: address.line2 ?? undefined,
    city: address.city ?? "",
    state_code: address.state ?? undefined,
    country_code: address.country,
    zip: address.postal_code ?? "",
    phone: session.customer_details?.phone ?? undefined,
    email: session.customer_details?.email ?? undefined,
  };
}

export async function fulfilPrintfulOrder(session: Stripe.Checkout.Session) {
  if (!isPrintfulConfigured()) return;

  const recipient = shippingFrom(session);
  if (!recipient) {
    throw new Error("Missing shipping address");
  }

  const lines = resolveBag(deserializeBag(session.metadata?.lines));
  const items = lines
    .map((line) => {
      const variantId = line.product.printfulVariants?.[line.size];
      if (!variantId) return null;
      return {
        sync_variant_id: variantId,
        quantity: line.quantity,
        retail_price: (line.product.pricePence / 100).toFixed(2),
        name: `${line.product.name} / ${line.size}`,
      };
    })
    .filter((item) => item !== null);

  if (items.length === 0) {
    console.warn("Printful skipped: no sync variants mapped for this bag");
    return;
  }

  try {
    await printful(`/orders/@${session.id}`);
    return;
  } catch {
    // First delivery of this Stripe session: create the Printful order.
  }

  const note = noteFromSession(session);

  await printful("/orders?confirm=true", {
    method: "POST",
    body: JSON.stringify({
      external_id: session.id,
      shipping: "STANDARD",
      recipient,
      items,
      ...(note
        ? {
            gift: { subject: "Voir Noir", message: note },
            packing_slip: { message: note },
          }
        : {}),
    }),
  });
}
