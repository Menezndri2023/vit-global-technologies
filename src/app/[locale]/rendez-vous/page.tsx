import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section, Eyebrow } from "@/components/ui/Section";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { buildMetadata } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "appointmentPage" });
  return buildMetadata({ locale, title: t("heroTitle"), description: t("heroSubtitle"), path: "/rendez-vous" });
}

export default async function AppointmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("appointmentPage");
  const sideBullets = t.raw("sideBullets") as string[];

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
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="rounded-3xl bg-navy-950 p-8 text-white">
              <h2 className="font-display text-lg font-semibold">{t("sideTitle")}</h2>
              <div className="mt-5 space-y-4">
                {sideBullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3 text-sm text-white/70">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-navy-950/[0.06] bg-white p-8 shadow-card sm:p-10">
            <AppointmentForm />
          </div>
        </div>
      </Section>
    </>
  );
}
