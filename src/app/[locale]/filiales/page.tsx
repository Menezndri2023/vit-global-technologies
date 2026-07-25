import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/ui/Icon";
import { Section, Eyebrow } from "@/components/ui/Section";
import { filiales } from "@/data/filiales";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";
import { ArrowUpRight } from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "filiales" });
  return buildMetadata({ locale, title: t("heroTitle"), description: t("heroSubtitle"), path: "/filiales" });
}

export default async function FilialesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("filiales");

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
        <div className="grid gap-6 lg:grid-cols-2">
          {filiales.map((filiale) => (
            <Link
              key={filiale.slug}
              href={`/filiales/${filiale.slug}`}
              className="group rounded-3xl border border-navy-950/[0.06] bg-white p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-brand"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${filiale.color}18`, color: filiale.color }}
              >
                <Icon name={filiale.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold text-navy-950">{filiale.name}</h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-silver-500">{filiale.sector[loc]}</p>
              <p className="mt-4 text-sm leading-relaxed text-silver-600">{filiale.tagline[loc]}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2">
                {t("foundedLabel")} {filiale.founded} <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
