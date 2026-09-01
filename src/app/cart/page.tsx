import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Bag",
  description: "Your Voir Noir bag.",
};

export default function CartPage() {
  return (
    <main id="content" className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="font-display text-6xl leading-none tracking-wide md:text-8xl">
          Bag
        </h1>
        <div className="mt-14">
          <CartView />
        </div>
      </div>
    </main>
  );
}
