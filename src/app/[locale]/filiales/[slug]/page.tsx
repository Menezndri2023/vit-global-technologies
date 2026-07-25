import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, Eyebrow } from "@/components/ui/Section";
import { filiales, getFilialeBySlug } from "@/data/filiales";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => filiales.map((f) => ({ locale, slug: f.slug })));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const filiale = getFilialeBySlug(slug);
  if (!filiale) return {};
  const loc = locale as Locale;
  return buildMetadata({
    locale,
    title: `${filiale.name} — ${filiale.sector[loc]}`,
    description: filiale.tagline[loc],
    path: `/filiales/${slug}`
  });
}

export default async function FilialeDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const filiale = getFilialeBySlug(slug);
  if (!filiale) notFound();

  const t = await getTranslations("filiales");
  const tCommon = await getTranslations("common");

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-24" style={{ background: `linear-gradient(135deg, ${filiale.color}, #0A1730)` }}>
        <div className="container-vit relative">
          <div className="mx-auto max-w-3xl text-center text-white">
            <Eyebrow tone="light">{filiale.sector[loc]}</Eyebrow>
            <span className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
              <Icon name={filiale.icon} className="h-7 w-7" />
            </span>
            <h1 className="font-display mt-6 text-3xl font-bold tracking-tight sm:text-5xl">{filiale.name}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{filiale.tagline[loc]}</p>
            <p className="mt-4 text-sm text-white/60">
              {t("foundedLabel")} {filiale.founded}
            </p>
          </div>
        </div>
      </section>

      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <p className="text-base leading-relaxed text-silver-600 sm:text-lg">{filiale.description[loc]}</p>
        </div>
      </Section>

      <Section tone="muted">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-xl font-bold text-navy-950 sm:text-2xl">{t("offeringsTitle")}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {filiale.offerings[loc].map((offering) => (
              <div key={offering} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-card">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: filiale.color }} />
                <span className="text-sm text-navy-900">{offering}</span>
              </div>
            ))}
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
            <Button as={Link} href="/filiales" variant="outline" className="!border-white/30 !bg-transparent !text-white hover:!border-white">
              {tCommon("backToList")}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
