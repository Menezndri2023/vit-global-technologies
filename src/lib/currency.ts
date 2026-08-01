import type { Locale } from "@/data/types";

export const SUPPORTED_CURRENCIES = ["MAD", "EUR", "USD", "GBP", "XOF", "XAF", "CAD"] as const;
export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number];

export const DEFAULT_CURRENCY: CurrencyCode = "MAD";

/** Pays (ISO 3166-1 alpha-2) → devise. Étendre au besoin. */
const CURRENCY_BY_COUNTRY: Record<string, CurrencyCode> = {
  MA: "MAD",
  FR: "EUR", DE: "EUR", ES: "EUR", IT: "EUR", PT: "EUR", NL: "EUR", BE: "EUR", LU: "EUR",
  IE: "EUR", AT: "EUR", FI: "EUR", GR: "EUR",
  GB: "GBP",
  US: "USD",
  CA: "CAD",
  CI: "XOF", SN: "XOF", ML: "XOF", BF: "XOF", TG: "XOF", BJ: "XOF", NE: "XOF", GW: "XOF",
  CM: "XAF", GA: "XAF", CG: "XAF", TD: "XAF", CF: "XAF", GQ: "XAF"
};

/**
 * Taux indicatifs vers 1 MAD, à réviser périodiquement (pas de flux temps réel).
 * Mis à jour manuellement — voir date ci-dessous.
 */
export const RATES_UPDATED_AT = "2026-08-01";
const RATE_FROM_MAD: Record<CurrencyCode, number> = {
  MAD: 1,
  EUR: 0.093,
  USD: 0.1,
  GBP: 0.079,
  CAD: 0.135,
  XOF: 61,
  XAF: 61
};

export function currencyForCountry(countryCode: string | null | undefined): CurrencyCode {
  if (!countryCode) return DEFAULT_CURRENCY;
  return CURRENCY_BY_COUNTRY[countryCode.toUpperCase()] ?? "EUR";
}

export function convertFromMad(amountMad: number, currency: CurrencyCode): number {
  return amountMad * RATE_FROM_MAD[currency];
}

const LOCALE_BY_LANG: Record<Locale, string> = { fr: "fr-FR", en: "en-US", ar: "ar-MA" };

export function formatMoney(amount: number, currency: CurrencyCode, locale: Locale): string {
  const digits = currency === "XOF" || currency === "XAF" ? 0 : amount % 1 === 0 ? 0 : 2;
  return new Intl.NumberFormat(LOCALE_BY_LANG[locale], {
    style: "currency",
    currency,
    maximumFractionDigits: digits,
    minimumFractionDigits: 0
  }).format(amount);
}
