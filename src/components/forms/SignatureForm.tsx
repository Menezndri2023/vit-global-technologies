"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Field, Input } from "./fields";
import { Button } from "@/components/ui/Button";
import { PenLine, Download } from "lucide-react";

type Status = "idle" | "submitting" | "signed" | "error" | "email_mismatch" | "expired";

export function SignatureForm({ token, locale }: { token: string; locale: string }) {
  const t = useTranslations("signature");
  const [status, setStatus] = useState<Status>("idle");
  const [accepted, setAccepted] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!accepted) return;
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/quote/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          signerName: form.get("signerName"),
          signerEmail: form.get("signerEmail"),
          consent: true,
          locale
        })
      });
      if (res.ok) return setStatus("signed");
      const data = await res.json().catch(() => ({}));
      if (data.error === "email_mismatch") return setStatus("email_mismatch");
      if (res.status === 410) return setStatus("expired");
      if (res.status === 409) return window.location.reload();
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "signed") {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
        <p className="font-semibold text-navy-950">{t("successTitle")}</p>
        <p className="mt-2 text-sm text-silver-600">{t("successBody")}</p>
        <a
          href={`/api/quote/signed-pdf?token=${encodeURIComponent(token)}`}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Download className="h-4 w-4" /> {t("downloadPdf")}
        </a>
      </div>
    );
  }

  const errorMessage =
    status === "email_mismatch" ? t("emailMismatch") : status === "expired" ? t("expiredBody") : status === "error" ? t("error") : null;

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Field label={t("fullName")} htmlFor="signerName" required>
        <Input id="signerName" name="signerName" required minLength={2} maxLength={120} autoComplete="name" />
      </Field>
      <Field label={t("emailLabel")} htmlFor="signerEmail" required>
        <Input id="signerEmail" name="signerEmail" type="email" required maxLength={254} autoComplete="email" />
      </Field>
      <label className="flex items-start gap-2.5 text-sm text-navy-900">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-navy-950/20"
        />
        {t("consent")}
      </label>
      {errorMessage && (
        <p role="alert" className="text-xs font-medium text-red-500">
          {errorMessage}
        </p>
      )}
      <Button type="submit" disabled={!accepted || status === "submitting"} icon={<PenLine className="h-4 w-4" />}>
        {status === "submitting" ? t("submitting") : t("signButton")}
      </Button>
      <p className="text-xs text-silver-500">{t("legalNote")}</p>
    </form>
  );
}
