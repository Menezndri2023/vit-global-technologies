"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { OAuthButtons } from "./OAuthButtons";
import { Field, Input } from "@/components/forms/fields";
import { Button } from "@/components/ui/Button";
import { LogIn, UserPlus, KeyRound, MailCheck } from "lucide-react";
import clsx from "clsx";

type Mode = "login" | "register" | "forgot";

export function AuthPanel({
  callbackUrl,
  enabledProviders
}: {
  callbackUrl: string;
  enabledProviders: Record<string, boolean>;
}) {
  const t = useTranslations("auth");
  const locale = useLocale();
  const [mode, setMode] = useState<Mode>("login");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setInfo(null);
    setUnverifiedEmail(null);
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setUnverifiedEmail(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const res = await signIn("credentials", {
      email,
      password: form.get("password"),
      redirect: false
    });
    setLoading(false);
    if (res?.error) {
      if (res.code === "email_not_verified") {
        setUnverifiedEmail(email);
        setError(t("emailNotVerified"));
      } else if (res.code === "too_many_attempts") {
        setError(t("tooManyAttempts"));
      } else {
        setError(t("loginError"));
      }
      return;
    }
    window.location.href = callbackUrl;
  }

  async function resendVerification() {
    if (!unverifiedEmail) return;
    await fetch("/api/auth/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: unverifiedEmail, locale })
    }).catch(() => null);
    setError(null);
    setUnverifiedEmail(null);
    setInfo(t("verificationResent"));
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.get("name"), email: form.get("email"), password: form.get("password"), locale })
    }).catch(() => null);
    setLoading(false);
    if (!res?.ok) {
      setError(res?.status === 409 ? t("emailTaken") : res?.status === 429 ? t("tooManyAttempts") : t("registerError"));
      return;
    }
    // Pas de connexion automatique : le compte doit d'abord être confirmé par e-mail.
    setMode("login");
    setInfo(t("registerCheckEmail"));
  }

  async function handleForgot(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), locale })
    }).catch(() => null);
    setLoading(false);
    if (res?.status === 429) {
      setError(t("tooManyAttempts"));
      return;
    }
    setInfo(t("resetEmailSent"));
  }

  return (
    <div className="rounded-3xl border border-navy-950/[0.06] bg-white p-8 shadow-card">
      <div className="mb-6 flex rounded-full bg-navy-950/[0.04] p-1">
        {(["login", "register"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => switchMode(tab)}
            className={clsx(
              "flex-1 rounded-full py-2 text-sm font-semibold transition-colors",
              mode === tab ? "bg-white shadow-sm text-navy-950" : "text-silver-600"
            )}
          >
            {t(tab)}
          </button>
        ))}
      </div>

      {mode !== "forgot" && (
        <>
          <OAuthButtons callbackUrl={callbackUrl} enabledProviders={enabledProviders} />
          <div className="my-5 flex items-center gap-3 text-xs text-silver-500">
            <span className="h-px flex-1 bg-navy-950/10" />
            {t("orEmail")}
            <span className="h-px flex-1 bg-navy-950/10" />
          </div>
        </>
      )}

      {info && (
        <p role="status" className="mb-4 flex items-start gap-2 rounded-xl bg-emerald-500/5 p-3 text-xs font-medium text-emerald-700">
          <MailCheck className="h-4 w-4 shrink-0" /> {info}
        </p>
      )}

      {mode === "login" && (
        <form onSubmit={handleLogin} className="grid gap-4">
          <Field label={t("email")} htmlFor="login-email" required>
            <Input id="login-email" name="email" type="email" required autoComplete="email" />
          </Field>
          <Field label={t("password")} htmlFor="login-password" required>
            <Input id="login-password" name="password" type="password" required minLength={8} autoComplete="current-password" />
          </Field>
          {error && (
            <p role="alert" className="text-xs font-medium text-red-500">
              {error}{" "}
              {unverifiedEmail && (
                <button type="button" onClick={resendVerification} className="font-semibold underline">
                  {t("resendVerification")}
                </button>
              )}
            </p>
          )}
          <Button type="submit" disabled={loading} icon={<LogIn className="h-4 w-4" />}>
            {loading ? t("loading") : t("login")}
          </Button>
          <button type="button" onClick={() => switchMode("forgot")} className="text-xs font-semibold text-brand-600 hover:text-brand-700">
            {t("forgotPassword")}
          </button>
        </form>
      )}

      {mode === "register" && (
        <form onSubmit={handleRegister} className="grid gap-4">
          <Field label={t("name")} htmlFor="register-name" required>
            <Input id="register-name" name="name" required minLength={2} maxLength={120} autoComplete="name" />
          </Field>
          <Field label={t("email")} htmlFor="register-email" required>
            <Input id="register-email" name="email" type="email" required maxLength={254} autoComplete="email" />
          </Field>
          <Field label={t("password")} htmlFor="register-password" required>
            <Input id="register-password" name="password" type="password" required minLength={8} maxLength={200} autoComplete="new-password" />
          </Field>
          {error && <p role="alert" className="text-xs font-medium text-red-500">{error}</p>}
          <Button type="submit" disabled={loading} icon={<UserPlus className="h-4 w-4" />}>
            {loading ? t("loading") : t("createAccount")}
          </Button>
        </form>
      )}

      {mode === "forgot" && (
        <form onSubmit={handleForgot} className="grid gap-4">
          <p className="text-sm text-silver-600">{t("forgotIntro")}</p>
          <Field label={t("email")} htmlFor="forgot-email" required>
            <Input id="forgot-email" name="email" type="email" required maxLength={254} autoComplete="email" />
          </Field>
          {error && <p role="alert" className="text-xs font-medium text-red-500">{error}</p>}
          <Button type="submit" disabled={loading} icon={<KeyRound className="h-4 w-4" />}>
            {loading ? t("loading") : t("sendResetLink")}
          </Button>
          <button type="button" onClick={() => switchMode("login")} className="text-xs font-semibold text-brand-600 hover:text-brand-700">
            {t("backToLogin")}
          </button>
        </form>
      )}
    </div>
  );
}
