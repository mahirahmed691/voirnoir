import type Stripe from "stripe";
import { formatPrice } from "@/lib/catalog";
import { paidOrderFromSession } from "@/lib/order";

const HOUSE_MAIL = ["vn@gmail.com", "mahirahmed691@gmail.com"];

function notifyList() {
  const fromEnv = process.env.ORDER_NOTIFY_EMAILS;
  if (!fromEnv) return HOUSE_MAIL;
  return fromEnv
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export async function notifyHouseOfPaidOrder(
  session: Stripe.Checkout.Session,
) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  const to = notifyList();
  const from =
    process.env.RESEND_FROM ?? "Voir Noir <hello@voirnoir.co.uk>";
  if (to.length === 0) return;

  const order = paidOrderFromSession(session);
  const lines =
    order.lines.length > 0
      ? order.lines
          .map(
            (line) =>
              `- ${line.product.name}, size ${line.size} × ${line.quantity} (${formatPrice(line.product.pricePence * line.quantity)})`,
          )
          .join("\n")
      : "- (lines were not on the session)";

  const text = [
    "A piece is paid.",
    `Reference: ${order.reference}`,
    `Total: ${order.amount}, posted free`,
    order.email ? `Buyer: ${order.email}` : "Buyer: not given",
    order.shippingName || order.shippingSummary
      ? `Post: ${[order.shippingName, order.shippingSummary].filter(Boolean).join(", ")}`
      : "Post: not given",
    "Lines:",
    lines,
    order.note ? `Note: ${order.note}` : null,
    `Session: ${session.id}`,
  ]
    .filter((block): block is string => Boolean(block))
    .join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `order-paid/${session.id}`,
    },
    body: JSON.stringify({
      from,
      to,
      subject: `Paid, ${order.reference}`,
      text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`House mail failed: ${response.status} ${detail}`);
  }
}
