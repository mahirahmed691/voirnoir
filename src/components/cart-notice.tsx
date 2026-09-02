"use client";

import { useSearchParams } from "next/navigation";

export function CartNotice() {
  const params = useSearchParams();
  if (params.get("kept") !== "1") return null;

  return (
    <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-clay">
      Nothing was taken. The bag is still here.
    </p>
  );
}
