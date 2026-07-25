"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { realisations } from "@/data/realisations";
import type { Locale } from "@/data/types";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";

export function PortfolioGrid({ locale }: { locale: Locale }) {
  const tCommon = useTranslations("common");
  const [filter, setFilter] = useState<string>("all");

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    realisations.forEach((item) => seen.set(item.portfolioType.fr, item.portfolioType[locale]));
    return Array.from(seen.entries());
  }, [locale]);

  const filtered = filter === "all" ? realisations : realisations.filter((item) => item.portfolioType.fr === filter);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={clsx(
            "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
            filter === "all" ? "bg-brand-600 text-white" : "bg-white text-navy-900 hover:bg-brand-500/10"
          )}
        >
          {tCommon("viewAll")}
        </button>
        {categories.map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              filter === key ? "bg-brand-600 text-white" : "bg-white text-navy-900 hover:bg-brand-500/10"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Link
            key={item.slug}
            href={`/realisations/${item.slug}`}
            className="group overflow-hidden rounded-2xl border border-navy-950/[0.06] bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-brand"
          >
            <div
              className="flex h-40 items-center justify-center text-3xl font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${item.color}, #0A1730)` }}
            >
              {item.client.slice(0, 2).toUpperCase()}
            </div>
            <div className="p-5">
              <span className="inline-flex items-center rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-semibold text-brand-600">
                {item.portfolioType[locale]}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-navy-950">{item.title[locale]}</h3>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                {tCommon("viewCaseStudy")} <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
