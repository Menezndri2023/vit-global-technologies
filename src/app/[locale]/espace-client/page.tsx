import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { configuredOAuthProviders } from "@/auth";
import { getCurrentUser } from "@/lib/current-user";
import { VerifyEmailNotice } from "@/components/auth/VerifyEmailNotice";
import { Section, Eyebrow } from "@/components/ui/Section";
import { AuthPanel } from "@/components/auth/AuthPanel";
import { ClientDashboard } from "@/components/dashboard/ClientDashboard";
import { buildMetadata } from "@/lib/seo";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "clientArea" });
  return buildMetadata({ locale, title: t("heroTitle"), description: t("heroSubtitle"), path: "/espace-client" });
}

export default async function ClientAreaPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ verified?: string }>;
}) {
  const { locale } = await params;
  const { verified } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("clientArea");
  const tAuth = await getTranslations("auth");
  const user = await getCurrentUser();

  if (user) {
    return (
      <Section tone="muted" className="min-h-[70vh]">
        {user.emailVerified ? (
          <ClientDashboard name={user.name} email={user.email} />
        ) : (
          <VerifyEmailNotice email={user.email} />
        )}
      </Section>
    );
  }

  const features = t.raw("features") as string[];

  return (
    <>
      <section className="bg-grid bg-white pb-16 pt-16 sm:pb-20 sm:pt-24">
        <div className="container-vit">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{t("heroEyebrow")}</Eyebrow>
            <h1 className="font-display mt-6 text-4xl font-bold tracking-tight text-navy-950 sm:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silver-600">{t("heroSubtitle")}</p>
          </div>
        </div>
      </section>

      <Section tone="muted">
        {verified && (
          <div
            role="status"
            className={`mb-8 flex items-center gap-3 rounded-2xl border p-4 text-sm ${
              verified === "1" ? "border-emerald-500/20 bg-emerald-500/5 text-navy-900" : "border-amber-500/20 bg-amber-500/5 text-navy-900"
            }`}
          >
            {verified === "1" ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <AlertTriangle className="h-5 w-5 text-amber-600" />}
            {verified === "1" ? tAuth("verifiedSuccess") : tAuth("verifiedFailure")}
          </div>
        )}
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-lg font-bold text-navy-950">{t("featuresTitle")}</h2>
            <div className="mt-5 space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-card">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  <span className="text-sm text-navy-900">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-navy-950">{t("loginTitle")}</h2>
            <p className="mt-2 text-sm text-silver-600">{t("loginBody")}</p>
            <div className="mt-5">
              <AuthPanel callbackUrl="/espace-client" enabledProviders={configuredOAuthProviders} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
