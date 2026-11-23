"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Field, Input } from "@/components/forms/fields";
import { Button } from "@/components/ui/Button";
import { KeyRound } from "lucide-react";

export function ResetPasswordForm({ token }: { token: string }) {
  const t = useTranslations("auth");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "invalid" | "mismatch" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") ?? "");
    if (password !== String(form.get("confirm") ?? "")) return setStatus("mismatch");
    setStatus("submitting");
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password })
    }).catch(() => null);
    if (res?.ok) return setStatus("done");
    setStatus(res?.status === 400 ? "invalid" : "error");
  }

  if (status === "done") {
    return (
      <div className="grid gap-4">
        <p role="status" className="text-sm text-emerald-700">{t("resetDone")}</p>
        <Link href="/espace-client" className="text-sm font-semibold text-brand-600">
          {t("backToLogin")}
        </Link>
      </div>
    );
  }

  const message =
    status === "mismatch" ? t("passwordMismatch") : status === "invalid" ? t("resetInvalid") : status === "error" ? t("registerError") : null;

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Field label={t("newPassword")} htmlFor="reset-password" required>
        <Input id="reset-password" name="password" type="password" required minLength={8} maxLength={200} autoComplete="new-password" />
      </Field>
      <Field label={t("confirmPassword")} htmlFor="reset-confirm" required>
        <Input id="reset-confirm" name="confirm" type="password" required minLength={8} maxLength={200} autoComplete="new-password" />
      </Field>
      {message && <p role="alert" className="text-xs font-medium text-red-500">{message}</p>}
      <Button type="submit" disabled={status === "submitting"} icon={<KeyRound className="h-4 w-4" />}>
        {status === "submitting" ? t("loading") : t("resetSubmit")}
      </Button>
    </form>
  );
}
