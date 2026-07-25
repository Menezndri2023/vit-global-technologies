"use client";

import { FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Field, Input, Textarea, Select } from "./fields";
import { Button } from "@/components/ui/Button";
import { FormStatusMessage } from "./FormStatusMessage";
import { useFormSubmit } from "./useFormSubmit";
import { CalendarCheck } from "lucide-react";

const TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

export function AppointmentForm() {
  const t = useTranslations();
  const locale = useLocale();
  const { status, submit } = useFormSubmit("/api/appointment");

  const topicOptions = t.raw("form.topicOptions") as string[];
  const today = new Date().toISOString().split("T")[0];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const ok = await submit({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      company: form.get("company"),
      topic: form.get("topic"),
      date: form.get("date"),
      timeSlot: form.get("timeSlot"),
      notes: form.get("notes"),
      locale
    });
    if (ok) (e.target as HTMLFormElement).reset();
  }

  if (status === "success") return <FormStatusMessage status="success" />;

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.name")} htmlFor="a-name" required>
          <Input id="a-name" name="name" required />
        </Field>
        <Field label={t("form.email")} htmlFor="a-email" required>
          <Input id="a-email" name="email" type="email" required />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.phone")} htmlFor="a-phone">
          <Input id="a-phone" name="phone" type="tel" />
        </Field>
        <Field label={t("form.company")} htmlFor="a-company">
          <Input id="a-company" name="company" />
        </Field>
      </div>
      <Field label={t("form.topic")} htmlFor="a-topic" required>
        <Select id="a-topic" name="topic" required defaultValue="">
          <option value="" disabled>
            {t("form.selectTopic")}
          </option>
          {topicOptions.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </Select>
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.date")} htmlFor="a-date" required>
          <Input id="a-date" name="date" type="date" min={today} required />
        </Field>
        <Field label={t("form.timeSlot")} htmlFor="a-timeSlot" required>
          <Select id="a-timeSlot" name="timeSlot" required defaultValue="">
            <option value="" disabled>
              {t("form.selectSlot")}
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label={t("form.notes")} htmlFor="a-notes">
        <Textarea id="a-notes" name="notes" rows={4} />
      </Field>
      {status === "error" && <FormStatusMessage status="error" />}
      <Button type="submit" disabled={status === "submitting"} icon={<CalendarCheck className="h-4 w-4" />}>
        {status === "submitting" ? t("common.submitting") : t("common.bookAppointment")}
      </Button>
    </form>
  );
}
