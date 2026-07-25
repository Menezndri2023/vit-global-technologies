"use client";

import { FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Field, Input } from "./fields";
import { Button } from "@/components/ui/Button";
import { FormStatusMessage } from "./FormStatusMessage";
import { useFormSubmit } from "./useFormSubmit";
import { ArrowRight } from "lucide-react";

export function AccessRequestForm({ subject, buttonLabel }: { subject: string; buttonLabel: string }) {
  const t = useTranslations();
  const locale = useLocale();
  const { status, submit } = useFormSubmit("/api/contact");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const ok = await submit({
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
      subject,
      message: `${subject} — ${t("common.since")} ${form.get("company") || "N/A"}`,
      locale
    });
    if (ok) (e.target as HTMLFormElement).reset();
  }

  if (status === "success") return <FormStatusMessage status="success" />;

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Field label={t("form.name")} htmlFor="ar-name" required>
        <Input id="ar-name" name="name" required />
      </Field>
      <Field label={t("form.email")} htmlFor="ar-email" required>
        <Input id="ar-email" name="email" type="email" required />
      </Field>
      <Field label={t("form.company")} htmlFor="ar-company">
        <Input id="ar-company" name="company" />
      </Field>
      {status === "error" && <FormStatusMessage status="error" />}
      <Button type="submit" disabled={status === "submitting"} icon={<ArrowRight className="h-4 w-4" />}>
        {status === "submitting" ? t("common.submitting") : buttonLabel}
      </Button>
    </form>
  );
}
