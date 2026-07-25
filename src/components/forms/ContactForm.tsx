"use client";

import { FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Field, Input, Textarea } from "./fields";
import { Button } from "@/components/ui/Button";
import { FormStatusMessage } from "./FormStatusMessage";
import { useFormSubmit } from "./useFormSubmit";
import { Send } from "lucide-react";

export function ContactForm() {
  const t = useTranslations();
  const locale = useLocale();
  const { status, submit } = useFormSubmit("/api/contact");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const ok = await submit({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      company: form.get("company"),
      subject: form.get("subject"),
      message: form.get("message"),
      locale
    });
    if (ok) (e.target as HTMLFormElement).reset();
  }

  if (status === "success") return <FormStatusMessage status="success" />;

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.name")} htmlFor="name" required>
          <Input id="name" name="name" required />
        </Field>
        <Field label={t("form.email")} htmlFor="email" required>
          <Input id="email" name="email" type="email" required />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.phone")} htmlFor="phone">
          <Input id="phone" name="phone" type="tel" />
        </Field>
        <Field label={t("form.company")} htmlFor="company">
          <Input id="company" name="company" />
        </Field>
      </div>
      <Field label={t("form.subject")} htmlFor="subject" required>
        <Input id="subject" name="subject" required />
      </Field>
      <Field label={t("form.message")} htmlFor="message" required>
        <Textarea id="message" name="message" required minLength={10} />
      </Field>
      {status === "error" && <FormStatusMessage status="error" />}
      <Button type="submit" disabled={status === "submitting"} icon={<Send className="h-4 w-4" />}>
        {status === "submitting" ? t("common.submitting") : t("common.sendMessage")}
      </Button>
    </form>
  );
}
