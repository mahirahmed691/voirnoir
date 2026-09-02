import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { parseBagItems, resolveBag, serializeBag } from "@/lib/bag";
import { getProfile } from "@/lib/house";
import { checkoutOrigin, publicAssetOrigin, integrationIdentifier } from "@/lib/site";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Checkout is not open yet. Write to hello@voirnoir.co.uk." },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "The bag could not be read." }, { status: 400 });
  }

  const items = parseBagItems(
    payload && typeof payload === "object"
      ? (payload as { items?: unknown }).items
      : [],
  );
  const lines = resolveBag(items);

  if (lines.length === 0) {
    return NextResponse.json({ error: "The bag is empty." }, { status: 400 });
  }

  const origin = checkoutOrigin(request);
  const assets = publicAssetOrigin();
  const bag = serializeBag(lines);
  let userId: string | null = null;
  try {
    const authState = await auth();
    userId = authState.userId;
  } catch {
    userId = null;
  }
  const user = userId ? await currentUser() : null;
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses[0]?.emailAddress ??
    undefined;
  const profile = userId ? await getProfile(userId) : null;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "en-GB",
      origin_context: "web",
      integration_identifier: integrationIdentifier(),
      ...(profile?.stripeCustomerId
        ? { customer: profile.stripeCustomerId }
        : {
            customer_creation: "always" as const,
            ...(email ? { customer_email: email } : {}),
          }),
      ...(userId
        ? {
            client_reference_id: userId,
          }
        : {}),
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?kept=1`,
      phone_number_collection: { enabled: true },
      shipping_address_collection: {
        allowed_countries: ["GB", "IE"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "UK and Ireland, free",
            fixed_amount: { amount: 0, currency: "gbp" },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 8 },
              maximum: { unit: "business_day", value: 21 },
            },
          },
        },
      ],
      custom_fields: [
        {
          key: "note",
          optional: true,
          type: "text",
          label: { type: "custom", custom: "Note for the house" },
          text: { maximum_length: 140 },
        },
      ],
      custom_text: {
        shipping_address: {
          message:
            "Printful posts from the United States. UK and Ireland postage is free. Allow eight to twenty-one working days.",
        },
        submit: {
          message: "Made to order. Not returned for a change of mind.",
        },
        after_submit: {
          message: "Watch your mail for tracking once Printful has the parcel.",
        },
      },
      line_items: lines.map((line) => ({
        quantity: line.quantity,
        price_data: {
          currency: "gbp",
          unit_amount: line.product.pricePence,
          product_data: {
            name: line.product.name,
            description: `Size ${line.size}`,
            images: [`${assets}${line.product.images[0].src}`],
            metadata: {
              slug: line.slug,
              size: line.size,
            },
          },
        },
      })),
      metadata: {
        lines: bag,
        ...(userId ? { clerk_user_id: userId } : {}),
      },
      payment_intent_data: {
        description: "Voir Noir",
        metadata: {
          lines: bag,
          ...(userId ? { clerk_user_id: userId } : {}),
        },
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout page." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout session failed", error);
    return NextResponse.json(
      {
        error:
          "Checkout could not open. Try again, or write to hello@voirnoir.co.uk.",
      },
      { status: 502 },
    );
  }
}
