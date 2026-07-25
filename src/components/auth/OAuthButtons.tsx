"use client";

import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

const PROVIDERS = [
  { id: "google", label: "Google", color: "#EA4335" },
  { id: "microsoft-entra-id", label: "Microsoft", color: "#00A4EF" },
  { id: "linkedin", label: "LinkedIn", color: "#0A66C2" }
];

export function OAuthButtons({
  callbackUrl,
  enabledProviders
}: {
  callbackUrl: string;
  enabledProviders: Record<string, boolean>;
}) {
  const t = useTranslations("auth");
  const active = PROVIDERS.filter((provider) => enabledProviders[provider.id]);

  if (active.length === 0) return null;

  return (
    <div className="grid gap-2.5">
      {active.map((provider) => (
        <button
          key={provider.id}
          type="button"
          onClick={() => signIn(provider.id, { callbackUrl })}
          className="flex items-center justify-center gap-2.5 rounded-xl border border-navy-950/10 bg-white py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:border-brand-500/40"
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: provider.color }} />
          {t("continueWith", { provider: provider.label })}
        </button>
      ))}
    </div>
  );
}
