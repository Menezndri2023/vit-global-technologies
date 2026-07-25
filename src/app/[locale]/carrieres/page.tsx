import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { jobOpenings } from "@/data/careers";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";
import { ArrowRight, MapPin, Clock } from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "careers" });
  return buildMetadata({ locale, title: t("heroTitle"), description: t("heroSubtitle"), path: "/carrieres" });
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("careers");
  const whyReasons = t.raw("whyReasons") as { title: string; description: string }[];

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
        <SectionHeading title={t("whyTitle")} align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyReasons.map((reason, i) => (
            <div key={reason.title} className="rounded-2xl bg-white p-6 shadow-card">
              <span className="font-display text-3xl font-bold text-brand-500/25">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-base font-semibold text-navy-950">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading title={t("openPositions")} align="center" />
        <div className="mt-12 grid gap-4">
          {jobOpenings.map((job) => (
            <Link key={job.slug} href={`/carrieres/${job.slug}`}>
              <Card className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy-950">{job.title[loc]}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-silver-600">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" /> {job.location[loc]}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" /> {job.type[loc]}
                    </span>
                    <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs font-semibold text-brand-600">
                      {job.department[loc]}
                    </span>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-600">
                  {t("applyButton")} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{t("noPositionTitle")}</h2>
          <p className="mt-4 text-white/70">{t("noPositionBody")}</p>
          <Link
            href="/carrieres/candidature-spontanee"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-white/90"
          >
            {t("spontaneousButton")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
