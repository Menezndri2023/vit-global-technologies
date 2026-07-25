import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Field, Input } from "@/components/forms/fields";
import { Button } from "@/components/ui/Button";
import { AccessRequestForm } from "@/components/forms/AccessRequestForm";
import { buildMetadata } from "@/lib/seo";
import { CheckCircle2, LogIn, Lock } from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "clientArea" });
  return buildMetadata({ locale, title: t("heroTitle"), description: t("heroSubtitle"), path: "/espace-client" });
}

export default async function ClientAreaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("clientArea");
  const tForm = await getTranslations("form");
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

            <div className="mt-8 rounded-2xl border border-navy-950/[0.06] bg-white p-6">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-navy-950">
                <LogIn className="h-4 w-4 text-brand-600" /> {t("loginTitle")}
              </div>
              <div className="grid gap-4">
                <Field label={tForm("email")} htmlFor="login-email">
                  <Input id="login-email" type="email" disabled placeholder="vous@entreprise.com" className="opacity-60" />
                </Field>
                <Field label="Mot de passe" htmlFor="login-password">
                  <Input id="login-password" type="password" disabled placeholder="••••••••" className="opacity-60" />
                </Field>
                <Button type="button" disabled variant="secondary" icon={<Lock className="h-4 w-4" />}>
                  {t("loginTitle")}
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-navy-950">{t("requestAccessTitle")}</h2>
            <p className="mt-2 text-sm text-silver-600">{t("requestAccessBody")}</p>
            <div className="mt-5 rounded-3xl border border-navy-950/[0.06] bg-white p-8 shadow-card">
              <AccessRequestForm subject="Demande d'accès — Espace Client" buttonLabel={t("requestAccessButton")} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
