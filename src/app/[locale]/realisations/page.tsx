import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Section, Eyebrow } from "@/components/ui/Section";
import { realisations } from "@/data/realisations";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";
import { ArrowRight } from "lucide-react";
import { RealisationCover } from "@/components/ui/RealisationCover";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "realisations" });
  return buildMetadata({ locale, title: t("heroTitle"), description: t("heroSubtitle"), path: "/realisations" });
}

export default async function RealisationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("realisations");
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
          {realisations.map((item) => (
            <Link key={item.slug} href={`/realisations/${item.slug}`}>
              <Card className="flex h-full flex-col">
                <RealisationCover item={item} className="h-32 rounded-xl" />
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-600">
                  <span>{item.industry[loc]}</span>
                  <span className="text-silver-400">·</span>
                  <span className="text-silver-500">{item.country[loc]}</span>
                </div>
                <h3 className="mt-1 font-display text-lg font-semibold text-navy-950">{item.title[loc]}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-silver-600">{item.summary[loc]}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  {tCommon("viewCaseStudy")} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
