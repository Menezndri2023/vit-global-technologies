"use client";

import { useLocale } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { internalProcess, detailedRateCard, forfaitPaymentSplit } from "@/data/pricing";
import type { Locale } from "@/data/types";

export function BusinessModelPanel() {
  const locale = useLocale() as Locale;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-navy-950/[0.06] bg-white p-6 shadow-card">
        <h2 className="font-display text-lg font-bold text-navy-950">Processus interne (CRM)</h2>
        <p className="mt-1 text-xs text-silver-500">Usage interne uniquement — jamais communiqué au client.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {internalProcess.map((step, i) => (
            <div key={step.title.fr} className="flex items-center gap-3 rounded-xl border border-navy-950/[0.06] bg-navy-950/[0.02] p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-950 text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
                <Icon name={step.icon} className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-navy-900">{step.title[locale]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-navy-950/[0.06] bg-white p-6 shadow-card">
        <h2 className="font-display text-lg font-bold text-navy-950">Grille tarifaire détaillée</h2>
        <p className="mt-1 text-xs text-silver-500">
          Non publiée sur le site — envoyée au prospect (PDF) lors d&apos;une demande de devis.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-start text-sm">
            <thead>
              <tr className="border-b border-navy-950/[0.06] text-xs uppercase tracking-wide text-silver-500">
                <th className="px-3 py-2 text-start">Offre</th>
                <th className="px-3 py-2 text-start">Tarif</th>
              </tr>
            </thead>
            <tbody>
              {detailedRateCard.map((entry) => (
                <tr key={entry.slug} className="border-b border-navy-950/[0.04] last:border-0">
                  <td className="px-3 py-2.5 font-medium text-navy-950">{entry.title[locale]}</td>
                  <td className="px-3 py-2.5 text-brand-600">{entry.range[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-navy-950/[0.06] bg-white p-6 shadow-card">
        <h2 className="font-display text-lg font-bold text-navy-950">Répartition de paiement au forfait</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {forfaitPaymentSplit.map((split) => (
            <div key={split.label.fr} className="rounded-xl border border-navy-950/[0.06] bg-navy-950/[0.02] p-4 text-center">
              <div className="font-display text-2xl font-bold text-brand-600">{split.percentage}%</div>
              <div className="mt-1 text-xs text-silver-600">{split.label[locale]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
