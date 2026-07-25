import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section, Eyebrow } from "@/components/ui/Section";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { solutions } from "@/data/solutions";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";
import { CheckCircle2, ArrowRight } from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutionsPage" });
  return buildMetadata({ locale, title: t("heroTitle"), description: t("heroSubtitle"), path: "/solutions" });
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("solutionsPage");
  const tCommon = await getTranslations("common");

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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <Card key={solution.slug} hover={false} className="flex h-full flex-col">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                <Icon name={solution.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-950">{solution.title[loc]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver-600">{solution.summary[loc]}</p>
              <div className="mt-4 flex-1 space-y-2">
                {solution.features[loc].map((feature) => (
                  <div key={feature} className="flex items-start gap-2 text-xs text-navy-900">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
                    {feature}
                  </div>
                ))}
              </div>
              <Link
                href={`/devis?service=${solution.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600"
              >
                {tCommon("requestQuote")} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBanner
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        primaryLabel={tCommon("requestQuote")}
        primaryHref="/devis"
        secondaryLabel={tCommon("bookAppointment")}
        secondaryHref="/rendez-vous"
      />
    </>
  );
}
