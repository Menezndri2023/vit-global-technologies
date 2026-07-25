"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import clsx from "clsx";

const localeLabels: Record<string, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية"
};

export function LanguageSwitcher({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium transition-colors",
          tone === "dark"
            ? "border-navy-900/10 text-navy-900 hover:border-brand-500/40"
            : "border-white/20 text-white hover:border-white/40"
        )}
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{locale}</span>
      </button>
      {open && (
        <div className="absolute end-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-navy-950/10 bg-white py-1 shadow-card">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => {
                router.replace(pathname, { locale: loc });
                setOpen(false);
              }}
              className={clsx(
                "block w-full px-4 py-2 text-start text-sm hover:bg-brand-500/5",
                loc === locale ? "font-semibold text-brand-600" : "text-navy-900"
              )}
            >
              {localeLabels[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
