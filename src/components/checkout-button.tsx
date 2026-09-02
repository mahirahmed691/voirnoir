"use client";

import { useState } from "react";
import { CtaButton } from "@/components/brand";
import type { CartItem } from "@/lib/bag";

export function CheckoutButton({ items }: { items: CartItem[] }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function pay() {
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Checkout could not open.");
      }
      window.location.assign(data.url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Checkout could not open.");
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <CtaButton onClick={pay} disabled={busy}>
        {busy ? "Opening checkout" : "Pay"}
      </CtaButton>
      {error ? (
        <p className="max-w-[32ch] text-sm leading-relaxed text-clay">{error}</p>
      ) : null}
    </div>
  );
}
