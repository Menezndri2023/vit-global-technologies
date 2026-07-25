"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { OAuthButtons } from "./OAuthButtons";
import { Field, Input } from "@/components/forms/fields";
import { Button } from "@/components/ui/Button";
import { LogIn, UserPlus } from "lucide-react";
import clsx from "clsx";

export function AuthPanel({
  callbackUrl,
  enabledProviders
}: {
  callbackUrl: string;
  enabledProviders: Record<string, boolean>;
}) {
  const t = useTranslations("auth");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false
    });
    setLoading(false);
    if (res?.error) {
      setError(t("loginError"));
      return;
    }
    window.location.href = callbackUrl;
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password")
    };
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      setLoading(false);
      setError(res.status === 409 ? t("emailTaken") : t("registerError"));
      return;
    }
    const signInRes = await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false
    });
    setLoading(false);
    if (signInRes?.error) {
      setError(t("loginError"));
      return;
    }
    window.location.href = callbackUrl;
  }

  return (
    <div className="rounded-3xl border border-navy-950/[0.06] bg-white p-8 shadow-card">
      <div className="mb-6 flex rounded-full bg-navy-950/[0.04] p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={clsx(
            "flex-1 rounded-full py-2 text-sm font-semibold transition-colors",
            mode === "login" ? "bg-white shadow-sm text-navy-950" : "text-silver-600"
          )}
        >
          {t("login")}
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={clsx(
            "flex-1 rounded-full py-2 text-sm font-semibold transition-colors",
            mode === "register" ? "bg-white shadow-sm text-navy-950" : "text-silver-600"
          )}
        >
          {t("register")}
        </button>
      </div>

      <OAuthButtons callbackUrl={callbackUrl} enabledProviders={enabledProviders} />

      <div className="my-5 flex items-center gap-3 text-xs text-silver-500">
        <span className="h-px flex-1 bg-navy-950/10" />
        {t("orEmail")}
        <span className="h-px flex-1 bg-navy-950/10" />
      </div>

      {mode === "login" ? (
        <form onSubmit={handleLogin} className="grid gap-4">
          <Field label={t("email")} htmlFor="login-email" required>
            <Input id="login-email" name="email" type="email" required />
          </Field>
          <Field label={t("password")} htmlFor="login-password" required>
            <Input id="login-password" name="password" type="password" required minLength={8} />
          </Field>
          {error && <p className="text-xs font-medium text-red-500">{error}</p>}
          <Button type="submit" disabled={loading} icon={<LogIn className="h-4 w-4" />}>
            {loading ? t("loading") : t("login")}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="grid gap-4">
          <Field label={t("name")} htmlFor="register-name" required>
            <Input id="register-name" name="name" required />
          </Field>
          <Field label={t("email")} htmlFor="register-email" required>
            <Input id="register-email" name="email" type="email" required />
          </Field>
          <Field label={t("password")} htmlFor="register-password" required>
            <Input id="register-password" name="password" type="password" required minLength={8} />
          </Field>
          {error && <p className="text-xs font-medium text-red-500">{error}</p>}
          <Button type="submit" disabled={loading} icon={<UserPlus className="h-4 w-4" />}>
            {loading ? t("loading") : t("createAccount")}
          </Button>
        </form>
      )}
    </div>
  );
}
