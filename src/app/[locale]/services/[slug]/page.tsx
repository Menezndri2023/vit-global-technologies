import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section, Eyebrow } from "@/components/ui/Section";
import { services, getServiceBySlug } from "@/data/services";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const loc = locale as Locale;
  return buildMetadata({
    locale,
    title: service.title[loc],
    description: service.summary[loc],
    path: `/services/${slug}`
  });
}

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations("services");
  const tCommon = await getTranslations("common");
  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="bg-grid bg-white pb-16 pt-16 sm:pb-20 sm:pt-24">
        <div className="container-vit">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{t("heroEyebrow")}</Eyebrow>
            <span className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600">
              <Icon name={service.icon} className="h-7 w-7" />
            </span>
            <h1 className="font-display mt-6 text-3xl font-bold tracking-tight text-navy-950 sm:text-5xl">
              {service.title[loc]}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silver-600">{service.description[loc]}</p>
            <div className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2">
              {service.subServices[loc].map((sub) => (
                <span
                  key={sub}
                  className="rounded-full border border-brand-500/20 bg-brand-500/5 px-3.5 py-1.5 text-xs font-semibold text-brand-700"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section tone="muted">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-xl font-bold text-navy-950 sm:text-2xl">{t("includedTitle")}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {service.features[loc].map((feature) => (
              <div key={feature} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-card">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <span className="text-sm text-navy-900">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="navy">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{t("detailCtaTitle")}</h2>
          <p className="mt-4 text-white/70">{t("detailCtaBody")}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button as={Link} href={`/devis?service=${service.slug}`} icon={<ArrowRight className="h-4 w-4" />}>
              {tCommon("requestQuote")}
            </Button>
            <Button as={Link} href="/rendez-vous" variant="outline" className="!border-white/30 !bg-transparent !text-white hover:!border-white">
              {tCommon("bookAppointment")}
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <h2 className="font-display text-xl font-bold text-navy-950 sm:text-2xl">{tCommon("relatedServices")}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {related.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`}>
              <Card className="h-full">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                  <Icon name={s.icon} className="h-4.5 w-4.5" />
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-navy-950">{s.title[loc]}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
