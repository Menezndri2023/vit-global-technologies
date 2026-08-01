"use client";

import { useLocale } from "next-intl";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { convertFromMad, formatMoney } from "@/lib/currency";
import type { Locale } from "@/data/types";

export function PriceTag({ fromMad, toMad }: { fromMad: number; toMad?: number }) {
  const { currency } = useCurrency();
  const locale = useLocale() as Locale;

  const from = formatMoney(convertFromMad(fromMad, currency), currency, locale);
  const to = toMad ? formatMoney(convertFromMad(toMad, currency), currency, locale) : null;

  return (
    <span title={`${fromMad.toLocaleString("fr-FR")}${toMad ? ` – ${toMad.toLocaleString("fr-FR")}` : ""} MAD`}>
      {to ? `${from} – ${to}` : from}
    </span>
  );
}
