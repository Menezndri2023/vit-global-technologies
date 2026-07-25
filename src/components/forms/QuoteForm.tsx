"use client";

import { FormEvent, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Field, Input, Textarea, Select } from "./fields";
import { Button } from "@/components/ui/Button";
import { FormStatusMessage } from "./FormStatusMessage";
import { useFormSubmit } from "./useFormSubmit";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";
import type { Locale } from "@/data/types";
import { Send, Paperclip } from "lucide-react";

export function QuoteForm({ defaultService }: { defaultService?: string }) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { status, submit } = useFormSubmit("/api/quote");
  const [fileName, setFileName] = useState<string | null>(null);

  const budgetOptions = t.raw("form.budgetOptions") as string[];
  const timelineOptions = t.raw("form.timelineOptions") as string[];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.set("locale", locale);
    const ok = await submit(form);
    if (ok) (e.target as HTMLFormElement).reset();
  }

  if (status === "success") return <FormStatusMessage status="success" />;

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.name")} htmlFor="q-name" required>
          <Input id="q-name" name="name" required />
        </Field>
        <Field label={t("form.email")} htmlFor="q-email" required>
          <Input id="q-email" name="email" type="email" required />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.phone")} htmlFor="q-phone">
          <Input id="q-phone" name="phone" type="tel" />
        </Field>
        <Field label={t("form.company")} htmlFor="q-company">
          <Input id="q-company" name="company" />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.country")} htmlFor="q-country">
          <Input id="q-country" name="country" />
        </Field>
        <Field label={t("form.service")} htmlFor="q-service" required>
          <Select id="q-service" name="service" required defaultValue={defaultService ?? ""}>
            <option value="" disabled>
              {t("form.selectService")}
            </option>
            <optgroup label={t("nav.services")}>
              {services.map((s) => (
                <option key={s.slug} value={s.title[locale]}>
                  {s.title[locale]}
                </option>
              ))}
            </optgroup>
            <optgroup label={t("nav.solutions")}>
              {solutions.map((s) => (
                <option key={s.slug} value={s.title[locale]}>
                  {s.title[locale]}
                </option>
              ))}
            </optgroup>
          </Select>
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.budget")} htmlFor="q-budget">
          <Select id="q-budget" name="budget" defaultValue="">
            <option value="" disabled>
              {t("form.selectBudget")}
            </option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={t("form.timeline")} htmlFor="q-timeline">
          <Select id="q-timeline" name="timeline" defaultValue="">
            <option value="" disabled>
              {t("form.selectTimeline")}
            </option>
            {timelineOptions.map((tl) => (
              <option key={tl} value={tl}>
                {tl}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label={t("form.description")} htmlFor="q-description" required>
        <Textarea id="q-description" name="description" required minLength={10} rows={6} />
      </Field>
      <Field label={t("form.attachment")} htmlFor="q-attachment">
        <label
          htmlFor="q-attachment"
          className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-dashed border-navy-950/15 bg-navy-950/[0.02] px-4 py-3 text-sm text-silver-600 transition-colors hover:border-brand-500/40"
        >
          <Paperclip className="h-4 w-4 shrink-0 text-brand-600" />
          {fileName ?? t("form.attachmentHint")}
        </label>
        <input
          id="q-attachment"
          name="attachment"
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.zip"
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
      </Field>
      {status === "error" && <FormStatusMessage status="error" />}
      <Button type="submit" disabled={status === "submitting"} icon={<Send className="h-4 w-4" />}>
        {status === "submitting" ? t("common.submitting") : t("common.requestQuote")}
      </Button>
    </form>
  );
}
