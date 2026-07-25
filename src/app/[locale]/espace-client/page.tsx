import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { auth, configuredOAuthProviders } from "@/auth";
import { Section, Eyebrow } from "@/components/ui/Section";
import { AuthPanel } from "@/components/auth/AuthPanel";
import { ClientDashboard } from "@/components/dashboard/ClientDashboard";
import { buildMetadata } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";

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
  const session = await auth();

  if (session?.user?.email) {
    return (
      <Section tone="muted" className="min-h-[70vh]">
        <ClientDashboard name={session.user.name} email={session.user.email} />
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
