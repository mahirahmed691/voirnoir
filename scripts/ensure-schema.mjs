import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

function loadEnv(path) {
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return;
  }
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv(".env.local");

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const sql = neon(url);

await sql`
  CREATE TABLE IF NOT EXISTS profiles (
    clerk_user_id TEXT PRIMARY KEY,
    email TEXT,
    given_name TEXT,
    family_name TEXT,
    phone TEXT,
    birthday DATE,
    gender TEXT,
    gender_self TEXT,
    address_line1 TEXT,
    address_line2 TEXT,
    city TEXT,
    region TEXT,
    postal_code TEXT,
    country TEXT,
    stripe_customer_id TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS orders (
    stripe_session_id TEXT PRIMARY KEY,
    clerk_user_id TEXT,
    email TEXT,
    amount_pence INTEGER NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'gbp',
    reference TEXT,
    receipt_url TEXT,
    shipping_name TEXT,
    shipping_summary TEXT,
    note TEXT,
    lines JSONB NOT NULL DEFAULT '[]'::jsonb,
    paid_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT`;
await sql`CREATE INDEX IF NOT EXISTS orders_clerk_user_id_idx ON orders (clerk_user_id)`;
await sql`CREATE INDEX IF NOT EXISTS orders_email_lower_idx ON orders (lower(email))`;

console.log("House book is open.");
