import type Stripe from "stripe";
import { deserializeBag, resolveBag } from "@/lib/bag";
import { getSql } from "@/lib/db";
import { noteFromSession } from "@/lib/order";

export type HouseProfile = {
  clerkUserId: string;
  email: string;
  givenName: string;
  familyName: string;
  phone: string;
  birthday: string;
  gender: string;
  genderSelf: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  stripeCustomerId: string | null;
};

export type HouseOrder = {
  stripeSessionId: string;
  reference: string;
  email: string | null;
  amountPence: number;
  currency: string;
  receiptUrl: string | null;
  shippingName: string | null;
  shippingSummary: string | null;
  note: string | null;
  lines: { name: string; size: string; quantity: number; pence: number }[];
  paidAt: string;
};

export const GENDERS = [
  { value: "", label: "Prefer not to say" },
  { value: "woman", label: "Woman" },
  { value: "man", label: "Man" },
  { value: "non-binary", label: "Non-binary" },
  { value: "self-describe", label: "Self-describe" },
] as const;

type ProfileRow = {
  clerk_user_id: string;
  email: string | null;
  given_name: string | null;
  family_name: string | null;
  phone: string | null;
  birthday: string | null;
  gender: string | null;
  gender_self: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  region: string | null;
  postal_code: string | null;
  country: string | null;
  stripe_customer_id: string | null;
};

type OrderRow = {
  stripe_session_id: string;
  email: string | null;
  amount_pence: number;
  currency: string;
  reference: string | null;
  receipt_url: string | null;
  shipping_name: string | null;
  shipping_summary: string | null;
  note: string | null;
  lines: HouseOrder["lines"] | string;
  paid_at: string;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asDate(value: unknown) {
  if (typeof value === "string") return value.slice(0, 10);
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return "";
}

function profileFrom(row: ProfileRow): HouseProfile {
  return {
    clerkUserId: row.clerk_user_id,
    email: row.email ?? "",
    givenName: row.given_name ?? "",
    familyName: row.family_name ?? "",
    phone: row.phone ?? "",
    birthday: asDate(row.birthday),
    gender: row.gender ?? "",
    genderSelf: row.gender_self ?? "",
    addressLine1: row.address_line1 ?? "",
    addressLine2: row.address_line2 ?? "",
    city: row.city ?? "",
    region: row.region ?? "",
    postalCode: row.postal_code ?? "",
    country: row.country ?? "GB",
    stripeCustomerId: row.stripe_customer_id,
  };
}

function orderFrom(row: OrderRow): HouseOrder {
  const lines =
    typeof row.lines === "string" ? (JSON.parse(row.lines) as HouseOrder["lines"]) : row.lines;
  return {
    stripeSessionId: row.stripe_session_id,
    reference: row.reference ?? row.stripe_session_id.slice(-8).toUpperCase(),
    email: row.email,
    amountPence: row.amount_pence,
    currency: row.currency,
    receiptUrl: row.receipt_url,
    shippingName: row.shipping_name,
    shippingSummary: row.shipping_summary,
    note: row.note,
    lines: Array.isArray(lines) ? lines : [],
    paidAt: row.paid_at,
  };
}

export async function getProfile(clerkUserId: string) {
  const sql = getSql();
  if (!sql) return null;
  const rows = await sql`
    SELECT * FROM profiles WHERE clerk_user_id = ${clerkUserId} LIMIT 1
  `;
  const row = rows[0] as ProfileRow | undefined;
  return row ? profileFrom(row) : null;
}

export async function saveProfile(profile: HouseProfile) {
  const sql = getSql();
  if (!sql) throw new Error("The house book is not open.");

  await sql`
    INSERT INTO profiles (
      clerk_user_id, email, given_name, family_name, phone, birthday, gender,
      gender_self, address_line1, address_line2, city, region, postal_code, country, updated_at
    )
    VALUES (
      ${profile.clerkUserId}, ${profile.email || null}, ${profile.givenName || null},
      ${profile.familyName || null}, ${profile.phone || null},
      ${profile.birthday || null}, ${profile.gender || null}, ${profile.genderSelf || null},
      ${profile.addressLine1 || null}, ${profile.addressLine2 || null}, ${profile.city || null},
      ${profile.region || null}, ${profile.postalCode || null}, ${profile.country || "GB"}, now()
    )
    ON CONFLICT (clerk_user_id) DO UPDATE SET
      email = excluded.email,
      given_name = excluded.given_name,
      family_name = excluded.family_name,
      phone = excluded.phone,
      birthday = excluded.birthday,
      gender = excluded.gender,
      gender_self = excluded.gender_self,
      address_line1 = excluded.address_line1,
      address_line2 = excluded.address_line2,
      city = excluded.city,
      region = excluded.region,
      postal_code = excluded.postal_code,
      country = excluded.country,
      updated_at = now()
  `;

  await claimOrders(profile.clerkUserId, profile.email);
}

export async function claimOrders(clerkUserId: string, email?: string | null) {
  const sql = getSql();
  if (!sql || !email) return;
  await sql`
    UPDATE orders
    SET clerk_user_id = ${clerkUserId}
    WHERE clerk_user_id IS NULL AND lower(email) = lower(${email})
  `;
}

export async function getOrdersForUser(clerkUserId: string, email?: string | null) {
  const sql = getSql();
  if (!sql) return [];
  const rows = email
    ? await sql`
        SELECT * FROM orders
        WHERE clerk_user_id = ${clerkUserId} OR lower(email) = lower(${email})
        ORDER BY paid_at DESC
      `
    : await sql`
        SELECT * FROM orders
        WHERE clerk_user_id = ${clerkUserId}
        ORDER BY paid_at DESC
      `;
  return (rows as OrderRow[]).map(orderFrom);
}

export async function getOrderForUser(
  clerkUserId: string,
  stripeSessionId: string,
  email?: string | null,
) {
  const orders = await getOrdersForUser(clerkUserId, email);
  return orders.find((order) => order.stripeSessionId === stripeSessionId) ?? null;
}

function shippingFrom(session: Stripe.Checkout.Session) {
  const details = session.collected_information?.shipping_details;
  const address = details?.address;
  const shippingName = details?.name ?? session.customer_details?.name ?? null;
  const shippingSummary = address
    ? [address.line1, address.city, address.postal_code, address.country]
        .filter(Boolean)
        .join(", ")
    : null;
  return { shippingName, shippingSummary };
}

function receiptFrom(session: Stripe.Checkout.Session) {
  const intent = session.payment_intent;
  if (!intent || typeof intent === "string") return null;
  const charge = intent.latest_charge;
  if (!charge || typeof charge === "string") return null;
  return charge.receipt_url;
}

export async function recordPaidOrder(
  session: Stripe.Checkout.Session,
  clerkUserId?: string | null,
) {
  const sql = getSql();
  if (!sql) return;
  if (
    session.payment_status !== "paid" &&
    session.payment_status !== "no_payment_required"
  ) {
    return;
  }

  const lines = resolveBag(deserializeBag(session.metadata?.lines)).map((line) => ({
    name: line.product.name,
    size: line.size,
    quantity: line.quantity,
    pence: line.product.pricePence,
  }));
  const { shippingName, shippingSummary } = shippingFrom(session);
  const email = session.customer_details?.email ?? null;
  const userId =
    clerkUserId ||
    session.metadata?.clerk_user_id ||
    session.client_reference_id ||
    null;
  const stripeCustomerId =
    typeof session.customer === "string" ? session.customer : null;

  await sql`
    INSERT INTO orders (
      stripe_session_id, clerk_user_id, email, amount_pence, currency, reference,
      receipt_url, shipping_name, shipping_summary, note, lines, paid_at
    )
    VALUES (
      ${session.id}, ${userId || null}, ${email}, ${session.amount_total ?? 0},
      ${session.currency ?? "gbp"}, ${session.id.slice(-8).toUpperCase()},
      ${receiptFrom(session)}, ${shippingName}, ${shippingSummary},
      ${noteFromSession(session)}, ${JSON.stringify(lines)}::jsonb, to_timestamp(${session.created})
    )
    ON CONFLICT (stripe_session_id) DO UPDATE SET
      clerk_user_id = coalesce(excluded.clerk_user_id, orders.clerk_user_id),
      email = coalesce(excluded.email, orders.email),
      receipt_url = coalesce(excluded.receipt_url, orders.receipt_url),
      shipping_name = coalesce(excluded.shipping_name, orders.shipping_name),
      shipping_summary = coalesce(excluded.shipping_summary, orders.shipping_summary),
      note = coalesce(excluded.note, orders.note)
  `;

  if (userId) {
    await claimOrders(userId, email);
    if (stripeCustomerId) {
      await sql`
        INSERT INTO profiles (clerk_user_id, email, stripe_customer_id, country, updated_at)
        VALUES (${userId}, ${email}, ${stripeCustomerId}, 'GB', now())
        ON CONFLICT (clerk_user_id) DO UPDATE SET
          stripe_customer_id = coalesce(excluded.stripe_customer_id, profiles.stripe_customer_id),
          email = coalesce(excluded.email, profiles.email),
          updated_at = now()
      `;
    }
  }
}

const ALLOWED_GENDERS = new Set<string>(GENDERS.map((entry) => entry.value));

export function profileFromForm(clerkUserId: string, email: string, data: FormData): HouseProfile {
  const genderRaw = asText(data.get("gender"));
  const gender = ALLOWED_GENDERS.has(genderRaw) ? genderRaw : "";
  const birthdayRaw = asText(data.get("birthday"));
  const birthday = /^\d{4}-\d{2}-\d{2}$/.test(birthdayRaw) ? birthdayRaw : "";
  const countryRaw = asText(data.get("country"));
  return {
    clerkUserId,
    email,
    givenName: asText(data.get("givenName")).slice(0, 80),
    familyName: asText(data.get("familyName")).slice(0, 80),
    phone: asText(data.get("phone")).slice(0, 40),
    birthday,
    gender,
    genderSelf: gender === "self-describe" ? asText(data.get("genderSelf")).slice(0, 80) : "",
    addressLine1: asText(data.get("addressLine1")).slice(0, 120),
    addressLine2: asText(data.get("addressLine2")).slice(0, 120),
    city: asText(data.get("city")).slice(0, 80),
    region: asText(data.get("region")).slice(0, 80),
    postalCode: asText(data.get("postalCode")).slice(0, 16),
    country: countryRaw === "IE" ? "IE" : "GB",
    stripeCustomerId: null,
  };
}
