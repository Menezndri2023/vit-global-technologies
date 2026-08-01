import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { Section, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { PriceTag } from "@/components/ui/PriceTag";
import { CurrencySwitcher } from "@/components/ui/CurrencySwitcher";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { filiales } from "@/data/filiales";
import { serviceCategories, publicPricing, externalProcess } from "@/data/pricing";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "modeleEconomique" });
  return buildMetadata({ locale, title: t("heroTitle"), description: t("heroSubtitle"), path: "/modele-economique" });
}

export default async function ModeleEconomiquePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("modeleEconomique");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");

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

      <Section tone="navy">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="light">{t("visionTitle")}</Eyebrow>
          <p className="font-display mt-6 text-2xl font-semibold leading-snug text-white sm:text-3xl">
            {t("visionText")}
          </p>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow={tNav("filiales")} title={t("businessUnitsTitle")} subtitle={t("businessUnitsSubtitle")} align="center" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filiales.map((filiale) => (
            <Link
              key={filiale.slug}
              href={`/filiales/${filiale.slug}`}
              className="group rounded-2xl border border-navy-950/[0.06] bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-brand"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${filiale.color}18`, color: filiale.color }}
              >
                <Icon name={filiale.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-navy-950">{filiale.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-silver-500">{filiale.sector[loc]}</p>
              <p className="mt-3 text-sm leading-relaxed text-silver-600">{filiale.tagline[loc]}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow={t("pricingTitle")} title={t("categoriesTitle")} subtitle={t("categoriesSubtitle")} align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((category) => (
            <Card key={category.slug} hover={false} className="flex h-full flex-col">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                <Icon name={category.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-navy-950">{category.title[loc]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver-600">{category.description[loc]}</p>
              <div className="mt-4 flex flex-1 flex-wrap gap-1.5 content-start">
                {category.examples[loc].slice(0, 4).map((example) => (
                  <span key={example} className="rounded-full bg-navy-950/[0.04] px-2.5 py-1 text-[11px] font-medium text-navy-900">
                    {example}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <SectionHeading eyebrow={tCommon("ourServices")} title={t("pricingTitle")} subtitle={t("pricingSubtitle")} />
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-silver-500">{t("pricingCurrencyLabel")}</span>
            <CurrencySwitcher />
          </div>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {publicPricing.map((entry) => (
            <Card key={entry.slug} hover={false} className="flex flex-col">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                <Icon name={entry.icon} className="h-4.5 w-4.5" />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-navy-950">{entry.title[loc]}</h3>
              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-silver-500">{t("pricingFrom")}</p>
              <p className="mt-1 font-display text-xl font-bold text-brand-600">
                <PriceTag fromMad={entry.fromMad} toMad={entry.toMad} />
                {entry.unit && <span className="ms-1 text-sm font-medium text-silver-500">{entry.unit[loc]}</span>}
              </p>
            </Card>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-silver-500">{t("pricingDisclaimer")}</p>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow={t("heroEyebrow")} title={t("processTitle")} subtitle={t("processSubtitle")} align="center" />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {externalProcess.map((step, i) => (
            <div key={step.title.fr} className="relative flex flex-col items-center rounded-2xl border border-navy-950/[0.06] bg-white p-5 text-center shadow-card">
              <span className="absolute -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-navy-950 text-[11px] font-bold text-white">
                {i + 1}
              </span>
              <span className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                <Icon name={step.icon} className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-semibold text-navy-950">{step.title[loc]}</p>
            </div>
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
