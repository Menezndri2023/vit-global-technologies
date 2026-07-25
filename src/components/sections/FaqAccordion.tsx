"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { faqItems } from "@/data/faq";
import type { Locale } from "@/data/types";
import { ChevronDown, Search } from "lucide-react";
import clsx from "clsx";

export function FaqAccordion({ locale }: { locale: Locale }) {
  const t = useTranslations("support");
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = useMemo(() => {
    if (!query.trim()) return faqItems;
    const q = query.toLowerCase();
    return faqItems.filter(
      (item) => item.question[locale].toLowerCase().includes(q) || item.answer[locale].toLowerCase().includes(q)
    );
  }, [query, locale]);

  return (
    <div>
      <div className="relative mx-auto max-w-xl">
        <Search className="absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-silver-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full rounded-full border border-navy-950/10 bg-white py-3 ps-11 pe-4 text-sm outline-none focus:border-brand-500"
        />
      </div>

      <div className="mx-auto mt-10 max-w-3xl divide-y divide-navy-950/[0.06] rounded-2xl border border-navy-950/[0.06] bg-white">
        {filtered.map((item, i) => (
          <div key={item.question.fr}>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
            >
              <span className="text-sm font-semibold text-navy-950 sm:text-base">{item.question[locale]}</span>
              <ChevronDown className={clsx("h-4 w-4 shrink-0 text-brand-600 transition-transform", openIndex === i && "rotate-180")} />
            </button>
            {openIndex === i && (
              <div className="px-6 pb-5 text-sm leading-relaxed text-silver-600">{item.answer[locale]}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
