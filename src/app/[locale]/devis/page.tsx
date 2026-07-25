import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section, Eyebrow } from "@/components/ui/Section";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quotePage" });
  return buildMetadata({ locale, title: t("heroTitle"), description: t("heroSubtitle"), path: "/devis" });
}

export default async function QuotePage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale } = await params;
  const { service: serviceSlug } = await searchParams;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("quotePage");
  const sideSteps = t.raw("sideSteps") as string[];

  const defaultService = serviceSlug ? getServiceBySlug(serviceSlug)?.title[loc] : undefined;

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
                {sideSteps.map((step, i) => (
                  <div key={step} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-xs font-semibold text-brand-300">
                      {i + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-navy-950/[0.06] bg-white p-8 shadow-card sm:p-10">
            <QuoteForm defaultService={defaultService} />
          </div>
        </div>
      </Section>
    </>
  );
}
