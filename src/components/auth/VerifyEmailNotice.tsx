"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MailCheck } from "lucide-react";
import { SignOutButton } from "./SignOutButton";

/** Affiché aux utilisateurs connectés dont l'adresse e-mail n'est pas encore vérifiée. */
export function VerifyEmailNotice({ email }: { email: string }) {
  const t = useTranslations("auth");
  const locale = useLocale();
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  async function resend() {
    setState("sending");
    await fetch("/api/auth/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale })
    }).catch(() => null);
    setState("sent");
  }

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-navy-950/[0.06] bg-white p-8 shadow-card">
      <div className="flex items-start gap-3">
        <MailCheck className="h-6 w-6 shrink-0 text-brand-600" />
        <div>
          <h2 className="font-display text-lg font-bold text-navy-950">{t("verifyTitle")}</h2>
          <p className="mt-2 text-sm text-silver-600">{t("verifyBody", { email })}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={resend}
          disabled={state !== "idle"}
          className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {state === "sent" ? t("verificationResent") : t("resendVerification")}
        </button>
        <SignOutButton />
      </div>
    </div>
  );
}
