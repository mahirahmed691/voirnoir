import { recordPaidOrder } from "@/lib/house";
import { notifyHouseOfPaidOrder } from "@/lib/notify";
import { fulfilPrintfulOrder } from "@/lib/printful";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!stripe || !secret || !signature) {
    return new Response("Webhook is not configured", { status: 400 });
  }

  const body = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      { expand: ["payment_intent.latest_charge"] },
    );
    if (
      session.payment_status === "paid" ||
      session.payment_status === "no_payment_required"
    ) {
      try {
        await recordPaidOrder(session);
      } catch (error) {
        console.error("Order book failed", error);
      }
      try {
        await notifyHouseOfPaidOrder(session);
      } catch (error) {
        console.error("House mail failed", error);
      }
      try {
        await fulfilPrintfulOrder(session);
      } catch (error) {
        console.error("Printful fulfilment failed", error);
        return new Response("Fulfilment failed", { status: 500 });
      }
    }
  }

  return new Response("ok");
}
