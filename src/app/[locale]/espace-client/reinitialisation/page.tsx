import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  referrer: "no-referrer"
};

export default async function ResetPasswordPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { locale } = await params;
  const { token } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <Section tone="muted" className="min-h-[60vh]">
      <div className="mx-auto max-w-md rounded-3xl border border-navy-950/[0.06] bg-white p-8 shadow-card">
        <h1 className="font-display text-lg font-bold text-navy-950">{t("resetTitle")}</h1>
        <div className="mt-5">
          {token ? <ResetPasswordForm token={token} /> : <p className="text-sm text-red-500">{t("resetInvalid")}</p>}
        </div>
      </div>
    </Section>
  );
}
