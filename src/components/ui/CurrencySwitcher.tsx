"use client";

import { useCurrency } from "@/components/providers/CurrencyProvider";
import { SUPPORTED_CURRENCIES } from "@/lib/currency";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as (typeof SUPPORTED_CURRENCIES)[number])}
      className="rounded-full border border-navy-950/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-navy-900 outline-none focus:border-brand-500"
      aria-label="Devise"
    >
      {SUPPORTED_CURRENCIES.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
