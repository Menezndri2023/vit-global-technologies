"use client";

import { FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Field, Input, Textarea, Select } from "./fields";
import { Button } from "@/components/ui/Button";
import { FormStatusMessage } from "./FormStatusMessage";
import { useFormSubmit } from "./useFormSubmit";
import { Send } from "lucide-react";

export function PartnerRequestForm() {
  const t = useTranslations();
  const locale = useLocale();
  const { status, submit } = useFormSubmit("/api/partners");
  const partnerTypeOptions = t.raw("form.partnerTypeOptions") as string[];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const ok = await submit({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      company: form.get("company"),
      country: form.get("country"),
      partnerType: form.get("partnerType"),
      message: form.get("message"),
      locale
    });
    if (ok) (e.target as HTMLFormElement).reset();
  }

  if (status === "success") return <FormStatusMessage status="success" />;

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.name")} htmlFor="p-name" required>
          <Input id="p-name" name="name" required />
        </Field>
        <Field label={t("form.email")} htmlFor="p-email" required>
          <Input id="p-email" name="email" type="email" required />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.company")} htmlFor="p-company" required>
          <Input id="p-company" name="company" required />
        </Field>
        <Field label={t("form.country")} htmlFor="p-country">
          <Input id="p-country" name="country" />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.phone")} htmlFor="p-phone">
          <Input id="p-phone" name="phone" type="tel" />
        </Field>
        <Field label={t("form.partnerType")} htmlFor="p-type" required>
          <Select id="p-type" name="partnerType" required defaultValue="">
            <option value="" disabled>
              {t("form.selectPartnerType")}
            </option>
            {partnerTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label={t("form.message")} htmlFor="p-message" required>
        <Textarea id="p-message" name="message" required minLength={10} rows={5} />
      </Field>
      {status === "error" && <FormStatusMessage status="error" />}
      <Button type="submit" disabled={status === "submitting"} icon={<Send className="h-4 w-4" />}>
        {status === "submitting" ? t("common.submitting") : t("common.submit")}
      </Button>
    </form>
  );
}
