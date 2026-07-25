import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui/Section";
import { jobOpenings, getJobBySlug } from "@/data/careers";
import { JobApplicationForm } from "@/components/forms/JobApplicationForm";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";
import { ArrowLeft, MapPin, Clock, Briefcase } from "lucide-react";

const SPONTANEOUS_SLUG = "candidature-spontanee";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => [
    ...jobOpenings.map((j) => ({ locale, slug: j.slug })),
    { locale, slug: SPONTANEOUS_SLUG }
  ]);
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = locale as Locale;

  if (slug === SPONTANEOUS_SLUG) {
    const t = await getTranslations({ locale, namespace: "careers" });
    return buildMetadata({ locale, title: t("spontaneousButton"), description: t("noPositionBody"), path: `/carrieres/${slug}` });
  }

  const job = getJobBySlug(slug);
  if (!job) return {};
  return buildMetadata({ locale, title: job.title[loc], description: job.description[loc], path: `/carrieres/${slug}` });
}

export default async function JobDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("careers");
  const tCommon = await getTranslations("common");

  const isSpontaneous = slug === SPONTANEOUS_SLUG;
  const job = isSpontaneous ? null : getJobBySlug(slug);

  if (!isSpontaneous && !job) notFound();

  return (
    <>
      <section className="bg-grid bg-white pb-12 pt-16 sm:pt-24">
        <div className="container-vit">
          <div className="mx-auto max-w-3xl">
            <Link href="/carrieres" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
              <ArrowLeft className="h-4 w-4" /> {tCommon("backToList")}
            </Link>
            {isSpontaneous ? (
              <>
                <h1 className="font-display mt-6 text-3xl font-bold tracking-tight text-navy-950 sm:text-5xl">
                  {t("spontaneousButton")}
                </h1>
                <p className="mt-5 max-w-2xl text-base text-silver-600">{t("noPositionBody")}</p>
              </>
            ) : (
              job && (
                <>
                  <Eyebrow>{job.department[loc]}</Eyebrow>
                  <h1 className="font-display mt-6 text-3xl font-bold tracking-tight text-navy-950 sm:text-5xl">
                    {job.title[loc]}
                  </h1>
                  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-silver-600">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" /> {job.location[loc]}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" /> {job.type[loc]}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" /> {job.department[loc]}
                    </span>
                  </div>
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-900">{job.description[loc]}</p>
                  <div className="mt-6 flex flex-col gap-2">
                    {job.requirements[loc].map((req) => (
                      <div key={req} className="flex items-start gap-2.5 text-sm text-navy-900">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {req}
                      </div>
                    ))}
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </section>

      <Section tone="muted">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display mb-6 text-xl font-bold text-navy-950">{t("applyFormTitle")}</h2>
          <div className="rounded-3xl border border-navy-950/[0.06] bg-white p-8 shadow-card sm:p-10">
            <JobApplicationForm position={isSpontaneous ? t("spontaneousButton") : job?.title[loc] ?? ""} />
          </div>
        </div>
      </Section>
    </>
  );
}
