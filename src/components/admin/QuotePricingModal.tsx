"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { detailedRateCard } from "@/data/pricing";
import { X, Plus, Trash2, Save } from "lucide-react";

export interface PricingLine {
  title: string;
  amount: string;
}

function defaultLines(): PricingLine[] {
  return detailedRateCard.map((entry) => ({ title: entry.title.fr, amount: entry.range.fr }));
}

export function QuotePricingModal({
  quoteId,
  quoteName,
  initialLines,
  onClose,
  onSaved
}: {
  quoteId: string;
  quoteName: string;
  initialLines: PricingLine[] | null;
  onClose: () => void;
  onSaved: (lines: PricingLine[] | null) => void;
}) {
  const t = useTranslations("admin");
  const [lines, setLines] = useState<PricingLine[]>(initialLines && initialLines.length > 0 ? initialLines : defaultLines());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  function updateLine(index: number, field: keyof PricingLine, value: string) {
    setLines((prev) => prev.map((line, i) => (i === index ? { ...line, [field]: value } : line)));
  }

  function removeLine(index: number) {
    setLines((prev) => prev.filter((_, i) => i !== index));
  }

  function addLine() {
    setLines((prev) => [...prev, { title: "", amount: "" }]);
  }

  async function save() {
    setSaving(true);
    setError(false);
    const cleaned = lines.map((l) => ({ title: l.title.trim(), amount: l.amount.trim() })).filter((l) => l.title && l.amount);
    try {
      const res = await fetch(`/api/admin/quote/${quoteId}/pricing`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: cleaned })
      });
      if (!res.ok) throw new Error("save failed");
      onSaved(cleaned.length > 0 ? cleaned : null);
      onClose();
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/50 p-4">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-brand">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-bold text-navy-950">{t("pricingConfig.title")}</h2>
            <p className="mt-1 text-xs text-silver-500">{t("pricingConfig.subtitle", { name: quoteName })}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-silver-500 hover:bg-navy-950/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {lines.map((line, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={line.title}
                onChange={(e) => updateLine(i, "title", e.target.value)}
                placeholder={t("pricingConfig.itemLabel")}
                className="flex-1 rounded-xl border border-navy-950/10 px-3 py-2 text-sm outline-none focus:border-brand-500"
              />
              <input
                value={line.amount}
                onChange={(e) => updateLine(i, "amount", e.target.value)}
                placeholder={t("pricingConfig.amountLabel")}
                className="w-40 rounded-xl border border-navy-950/10 px-3 py-2 text-sm outline-none focus:border-brand-500"
              />
              <button type="button" onClick={() => removeLine(i)} className="shrink-0 rounded-lg p-2 text-silver-500 hover:bg-red-50 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addLine}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-dashed border-navy-950/15 px-4 py-2 text-xs font-semibold text-navy-900 hover:border-brand-500/40"
        >
          <Plus className="h-3.5 w-3.5" /> {t("pricingConfig.addLine")}
        </button>

        {error && <p className="mt-4 text-xs font-medium text-red-500">{t("sendPricingError")}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-full border border-navy-950/10 px-4 py-2 text-sm font-medium text-navy-900">
            {t("pricingConfig.cancel")}
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> {t("pricingConfig.save")}
          </button>
        </div>
      </div>
    </div>
  );
}
