import Stripe from "stripe";

let client: Stripe | null | undefined;

export function getStripe() {
  if (client !== undefined) return client;

  const key = process.env.STRIPE_SECRET_KEY;
  client = key ? new Stripe(key) : null;
  return client;
}

export function isCheckoutConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
