"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_CURRENCY, SUPPORTED_CURRENCIES, type CurrencyCode } from "@/lib/currency";

const STORAGE_KEY = "vit_currency";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

interface StoredCurrency {
  currency: CurrencyCode;
  manual: boolean;
  expiresAt: number;
}

interface CurrencyContextValue {
  currency: CurrencyCode;
  loading: boolean;
  isManual: boolean;
  setCurrency: (currency: CurrencyCode) => void;
  resetToDetected: () => void;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function readStorage(): StoredCurrency | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredCurrency;
    if (!SUPPORTED_CURRENCIES.includes(parsed.currency)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStorage(value: StoredCurrency) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // localStorage indisponible (navigation privée...) — pas bloquant
  }
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [isManual, setIsManual] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = readStorage();
    if (stored && stored.manual) {
      setCurrencyState(stored.currency);
      setIsManual(true);
      setLoading(false);
      return;
    }
    if (stored && stored.expiresAt > Date.now()) {
      setCurrencyState(stored.currency);
      setLoading(false);
      return;
    }

    let cancelled = false;
    fetch("/api/geo")
      .then((res) => res.json())
      .then((data: { currency?: CurrencyCode }) => {
        if (cancelled) return;
        const detected = data.currency && SUPPORTED_CURRENCIES.includes(data.currency) ? data.currency : DEFAULT_CURRENCY;
        setCurrencyState(detected);
        writeStorage({ currency: detected, manual: false, expiresAt: Date.now() + CACHE_TTL_MS });
      })
      .catch(() => {
        if (!cancelled) setCurrencyState(DEFAULT_CURRENCY);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      loading,
      isManual,
      setCurrency: (next: CurrencyCode) => {
        setCurrencyState(next);
        setIsManual(true);
        writeStorage({ currency: next, manual: true, expiresAt: Date.now() + CACHE_TTL_MS });
      },
      resetToDetected: () => {
        setIsManual(false);
        setLoading(true);
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
        fetch("/api/geo")
          .then((res) => res.json())
          .then((data: { currency?: CurrencyCode }) => {
            const detected = data.currency && SUPPORTED_CURRENCIES.includes(data.currency) ? data.currency : DEFAULT_CURRENCY;
            setCurrencyState(detected);
            writeStorage({ currency: detected, manual: false, expiresAt: Date.now() + CACHE_TTL_MS });
          })
          .catch(() => setCurrencyState(DEFAULT_CURRENCY))
          .finally(() => setLoading(false));
      }
    }),
    [currency, loading, isManual]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within a CurrencyProvider");
  return ctx;
}
