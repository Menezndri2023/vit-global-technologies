import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Section, Eyebrow } from "@/components/ui/Section";
import { realisations, getRealisationBySlug } from "@/data/realisations";
import { getServiceBySlug } from "@/data/services";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => realisations.map((r) => ({ locale, slug: r.slug })));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getRealisationBySlug(slug);
  if (!item) return {};
  const loc = locale as Locale;
  return buildMetadata({ locale, title: item.title[loc], description: item.summary[loc], path: `/realisations/${slug}` });
}

export default async function RealisationDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const item = getRealisationBySlug(slug);
  if (!item) notFound();

  const t = await getTranslations("realisations");
  const tCommon = await getTranslations("common");

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-24" style={{ background: `linear-gradient(135deg, ${item.color}, #0A1730)` }}>
        <div className="container-vit relative">
          <div className="mx-auto max-w-3xl text-center text-white">
            <Eyebrow tone="light">
              {item.industry[loc]} · {item.country[loc]} · {item.year}
            </Eyebrow>
            <h1 className="font-display mt-6 text-3xl font-bold tracking-tight sm:text-5xl">{item.title[loc]}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{item.summary[loc]}</p>
            {item.website && (
              <div className="mt-8 flex justify-center">
                <Button
                  as="a"
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<ArrowUpRight className="h-4 w-4" />}
                >
                  {tCommon("visitWebsite")}
                </Button>
              </div>
            )}
          </div>

          {item.image && (
            <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl shadow-navy-950/40">
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-navy-950/60 px-4 py-2.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                {item.website && (
                  <span className="ms-3 truncate rounded-md bg-white/10 px-3 py-0.5 text-xs text-white/60" dir="ltr">
                    {item.website.replace(/^https?:\/\//, "")}
                  </span>
                )}
              </div>
              <Image
                src={item.image}
                alt={item.title[loc]}
                width={1440}
                height={900}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="h-auto w-full"
                priority
              />
            </div>
          )}
        </div>
      </section>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-bold text-navy-950">{t("challengeTitle")}</h2>
            <p className="mt-3 text-base leading-relaxed text-silver-600">{item.challenge[loc]}</p>
            <h2 className="font-display mt-8 text-xl font-bold text-navy-950">{t("solutionTitle")}</h2>
            <p className="mt-3 text-base leading-relaxed text-silver-600">{item.solution[loc]}</p>
            <h2 className="font-display mt-8 text-xl font-bold text-navy-950">{t("resultsTitle")}</h2>
            <div className="mt-3 flex flex-col gap-2">
              {item.results[loc].map((result) => (
                <div key={result} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  <span className="text-sm text-navy-900">{result}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="rounded-2xl border border-navy-950/[0.06] bg-navy-950/[0.02] p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-silver-500">{tCommon("keyResults")}</p>
              <div className="mt-5 grid grid-cols-3 gap-4 lg:grid-cols-1">
                {item.stats.map((stat) => (
                  <div key={stat.label.fr}>
                    <div className="font-display text-2xl font-bold text-brand-600">{stat.value}</div>
                    <div className="text-xs text-silver-600">{stat.label[loc]}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.services.map((slug) => {
                  const service = getServiceBySlug(slug);
                  if (!service) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/services/${slug}`}
                      className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-navy-900 shadow-sm hover:text-brand-600"
                    >
                      {service.title[loc]}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="navy">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{tCommon("requestQuote")}</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button as={Link} href="/devis" icon={<ArrowRight className="h-4 w-4" />}>
              {tCommon("requestQuote")}
            </Button>
            <Button as={Link} href="/realisations" variant="outline" className="!border-white/30 !bg-transparent !text-white hover:!border-white">
              {tCommon("backToList")}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
