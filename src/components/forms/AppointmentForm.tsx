"use client";

import { FormEvent, useState } from "react";
import { BUSINESS_TIME_ZONE, TIME_SLOTS, todayInZone } from "@/lib/timezone";
import { useTranslations, useLocale } from "next-intl";
import { Field, Input, Textarea, Select } from "./fields";
import { Button } from "@/components/ui/Button";
import { FormStatusMessage } from "./FormStatusMessage";
import { useFormSubmit } from "./useFormSubmit";
import { teamMembers } from "@/data/company";
import type { Locale } from "@/data/types";
import { CalendarCheck, CalendarPlus } from "lucide-react";

// Les créneaux sont à l'heure de Casablanca : on le précise à Google Agenda (paramètre ctz)
// pour que l'événement s'affiche à la bonne heure quel que soit le fuseau du visiteur.
function buildGoogleCalendarUrl(date: string, timeSlot: string, topic: string, notes: string) {
  const [h, m] = timeSlot.split(":").map(Number);
  const endMinutes = h * 60 + m + 45;
  const day = date.replace(/-/g, "");
  const start = `${day}T${String(h).padStart(2, "0")}${String(m).padStart(2, "0")}00`;
  const end = `${day}T${String(Math.floor(endMinutes / 60)).padStart(2, "0")}${String(endMinutes % 60).padStart(2, "0")}00`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `VIT GLOBAL — ${topic}`,
    dates: `${start}/${end}`,
    ctz: BUSINESS_TIME_ZONE,
    details: notes || "Rendez-vous VIT GLOBAL TECHNOLOGIES GROUP",
    location: "VIT GLOBAL TECHNOLOGIES GROUP, Casablanca"
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function AppointmentForm() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { status, errorCode, submit } = useFormSubmit("/api/appointment");
  const [calendarUrl, setCalendarUrl] = useState<string | null>(null);

  const topicOptions = t.raw("form.topicOptions") as string[];
  const modeOptions = t.raw("form.modeOptions") as string[];
  const today = todayInZone();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const date = String(form.get("date"));
    const timeSlot = String(form.get("timeSlot"));
    const topic = String(form.get("topic"));
    const notes = String(form.get("notes") ?? "");

    const ok = await submit({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      company: form.get("company"),
      topic,
      expert: form.get("expert"),
      mode: form.get("mode"),
      date,
      timeSlot,
      notes,
      locale
    });
    if (ok) {
      setCalendarUrl(buildGoogleCalendarUrl(date, timeSlot, topic, notes));
      (e.target as HTMLFormElement).reset();
    }
  }

  if (status === "success") {
    return (
      <div className="space-y-4">
        <FormStatusMessage status="success" />
        {calendarUrl && (
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-navy-950/10 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:border-brand-500/40 hover:text-brand-600"
          >
            <CalendarPlus className="h-4 w-4" />
            {t("appointmentPage.calendarButton")}
          </a>
        )}
      </div>
    );
  }

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
      <div className="grid gap-5 sm:grid-cols-2">
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
        <Field label={t("form.expert")} htmlFor="a-expert">
          <Select id="a-expert" name="expert" defaultValue="">
            <option value="">{t("form.noPreference")}</option>
            {teamMembers.map((member) => (
              <option key={member.name} value={member.name}>
                {member.name} — {member.role[locale]}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label={t("form.mode")} htmlFor="a-mode" required>
        <Select id="a-mode" name="mode" required defaultValue="">
          <option value="" disabled>
            {t("form.selectMode")}
          </option>
          {modeOptions.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
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
      <p className="-mt-2 text-xs text-silver-500">{t("form.timezoneNote")}</p>
      <Field label={t("form.notes")} htmlFor="a-notes">
        <Textarea id="a-notes" name="notes" rows={4} />
      </Field>
      {status === "error" && <FormStatusMessage status="error" errorCode={errorCode} />}
      <Button type="submit" disabled={status === "submitting"} icon={<CalendarCheck className="h-4 w-4" />}>
        {status === "submitting" ? t("common.submitting") : t("common.bookAppointment")}
      </Button>
    </form>
  );
}
