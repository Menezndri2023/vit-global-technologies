"use client";

import { FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Field, Input, Textarea } from "./fields";
import { Button } from "@/components/ui/Button";
import { FormStatusMessage } from "./FormStatusMessage";
import { useFormSubmit } from "./useFormSubmit";
import { Send } from "lucide-react";

export function JobApplicationForm({ position }: { position: string }) {
  const t = useTranslations();
  const locale = useLocale();
  const { status, submit } = useFormSubmit("/api/careers/apply");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const ok = await submit({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      position: form.get("position"),
      portfolioUrl: form.get("portfolioUrl"),
      linkedinUrl: form.get("linkedinUrl"),
      message: form.get("message"),
      locale
    });
    if (ok) (e.target as HTMLFormElement).reset();
  }

  if (status === "success") return <FormStatusMessage status="success" />;

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <input type="hidden" name="position" value={position} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.name")} htmlFor="j-name" required>
          <Input id="j-name" name="name" required />
        </Field>
        <Field label={t("form.email")} htmlFor="j-email" required>
          <Input id="j-email" name="email" type="email" required />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.phone")} htmlFor="j-phone">
          <Input id="j-phone" name="phone" type="tel" />
        </Field>
        <Field label={t("form.position")} htmlFor="j-position-display">
          <Input id="j-position-display" value={position} disabled className="opacity-70" />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.portfolioUrl")} htmlFor="j-portfolio">
          <Input id="j-portfolio" name="portfolioUrl" type="url" placeholder="https://" />
        </Field>
        <Field label={t("form.linkedinUrl")} htmlFor="j-linkedin">
          <Input id="j-linkedin" name="linkedinUrl" type="url" placeholder="https://linkedin.com/in/…" />
        </Field>
      </div>
      <Field label={t("form.message")} htmlFor="j-message">
        <Textarea id="j-message" name="message" rows={5} />
      </Field>
      {status === "error" && <FormStatusMessage status="error" />}
      <Button type="submit" disabled={status === "submitting"} icon={<Send className="h-4 w-4" />}>
        {status === "submitting" ? t("common.submitting") : t("careers.applyButton")}
      </Button>
    </form>
  );
}
