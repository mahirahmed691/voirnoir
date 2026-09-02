import type { Metadata } from "next";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { AccountForm } from "@/components/account-form";
import { AccountPanel, AccountStage } from "@/components/account-stage";
import { CtaLink } from "@/components/brand";
import { formatPrice } from "@/lib/catalog";
import { claimOrders, getOrdersForUser, getProfile, type HouseProfile } from "@/lib/house";

export const metadata: Metadata = {
  title: "Account",
  description: "Your Voir Noir details, orders, and receipts.",
  robots: { index: false, follow: false },
};

type Props = PageProps<"/account">;

function emptyProfile(clerkUserId: string, email: string, givenName: string, familyName: string): HouseProfile {
  return {
    clerkUserId,
    email,
    givenName,
    familyName,
    phone: "",
    birthday: "",
    gender: "",
    genderSelf: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "GB",
    stripeCustomerId: null,
  };
}

export default async function AccountPage({ searchParams }: Props) {
  const { userId } = await auth.protect();

  const params = await searchParams;
  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses[0]?.emailAddress ??
    "";

  await claimOrders(userId, email);

  const stored = await getProfile(userId);
  const profile =
    stored ??
    emptyProfile(
      userId,
      email,
      user?.firstName ?? "",
      user?.lastName ?? "",
    );
  const orders = await getOrdersForUser(userId, email);

  return (
    <AccountStage
      eyebrow="House"
      title="Your house."
      lede="Keep an address, a birthday if you want, and every receipt from this shop. Paying as a guest still works."
      image={{
        src: "/images/story-room.png",
        alt: "A dark bedroom at night, black clothing over a wooden chair, a thin strip of streetlight under the door",
        caption: "The book",
      }}
    >
      <AccountPanel>
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
          You
        </p>
        <h2 className="font-display mt-3 text-3xl tracking-wide text-bone">
          Details
        </h2>
        <div className="mt-8">
          <AccountForm
            profile={{
              ...profile,
              givenName: profile.givenName || user?.firstName || "",
              familyName: profile.familyName || user?.lastName || "",
            }}
            email={email}
            kept={params.kept === "1"}
          />
        </div>
      </AccountPanel>

      <section id="orders" className="mt-10">
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
          Paid
        </p>
        <h2 className="font-display mt-3 text-3xl tracking-wide text-bone">
          Orders
        </h2>

        {orders.length === 0 ? (
          <AccountPanel className="mt-6">
            <p className="max-w-[36ch] text-base leading-relaxed text-bone-dim">
              Nothing paid on this house yet. Pay from the bag, and the receipt
              will sit here.
            </p>
            <div className="mt-8">
              <CtaLink href="/cart">Open the bag</CtaLink>
            </div>
          </AccountPanel>
        ) : (
          <ul className="mt-6 space-y-3">
            {orders.map((order) => (
              <li key={order.stripeSessionId}>
                <Link
                  href={`/account/orders/${order.stripeSessionId}`}
                  className="block rounded-[1.5rem] border border-bone/10 bg-bone/5 p-1.5 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-bone/10"
                >
                  <div className="rounded-[calc(1.5rem-0.375rem)] bg-ink-soft px-5 py-4">
                    <p className="text-[0.7rem] uppercase tracking-[0.22em] text-clay">
                      {order.reference}
                    </p>
                    <p className="mt-2 flex justify-between gap-4 text-sm">
                      <span>
                        {order.lines
                          .map((line) => `${line.name}, size ${line.size}`)
                          .join(" · ")}
                      </span>
                      <span className="shrink-0 tabular-nums">
                        {formatPrice(order.amountPence)}
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </AccountStage>
  );
}
