import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { companyValues, companyStats } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";
import { ArrowRight, Target, Compass as CompassIcon } from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return buildMetadata({ locale, title: t("heroTitle"), description: t("heroSubtitle"), path: "/a-propos" });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("about");

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

      <Section tone="muted" id="histoire" className="scroll-mt-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-navy-950 sm:text-3xl">{t("storyTitle")}</h2>
          <p className="mt-4 text-base leading-relaxed text-silver-600 sm:text-lg">{t("storyBody")}</p>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card id="vision" hover={false} className="scroll-mt-24 border-brand-500/15 bg-brand-500/[0.03]">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
              <CompassIcon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-navy-950">{t("visionTitle")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-silver-600 sm:text-base">{t("visionBody")}</p>
          </Card>
          <Card id="mission" hover={false} className="scroll-mt-24 border-navy-950/10 bg-navy-950/[0.02]">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-white">
              <Target className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-navy-950">{t("missionTitle")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-silver-600 sm:text-base">{t("missionBody")}</p>
          </Card>
        </div>
      </Section>

      <Section tone="muted" id="valeurs" className="scroll-mt-24">
        <SectionHeading title={t("valuesTitle")} subtitle={t("valuesSubtitle")} align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {companyValues.map((value) => (
            <Card key={value.title.fr} hover={false}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                <Icon name={value.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-950">{value.title[loc]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver-600">{value.description[loc]}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <SectionHeading title={t("statsTitle")} align="center" tone="light" />
        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {companyStats.map((stat) => (
            <div key={stat.label.fr} className="text-center">
              <div className="font-display text-4xl font-bold text-white">{stat.value}</div>
              <div className="mt-1 text-sm text-white/60">{stat.label[loc]}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-navy-950/[0.03] p-10 text-center sm:p-14">
          <h2 className="font-display text-2xl font-bold text-navy-950 sm:text-3xl">{t("teamCtaTitle")}</h2>
          <p className="max-w-xl text-base text-silver-600">{t("teamCtaBody")}</p>
          <Button as={Link} href="/equipe" icon={<ArrowRight className="h-4 w-4" />}>
            {t("teamCtaButton")}
          </Button>
        </div>
      </Section>
    </>
  );
}
