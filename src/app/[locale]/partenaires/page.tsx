import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { partners } from "@/data/company";
import { PartnerRequestForm } from "@/components/forms/PartnerRequestForm";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";
import { Handshake } from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partners" });
  return buildMetadata({ locale, title: t("heroTitle"), description: t("heroSubtitle"), path: "/partenaires" });
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("partners");

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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <Card key={partner.name} hover={false} className="flex flex-col items-center justify-center text-center">
              <Handshake className="h-6 w-6 text-brand-500" />
              <p className="mt-3 font-display text-base font-semibold text-navy-950">{partner.name}</p>
              <p className="mt-1 text-xs text-silver-500">{partner.category[loc]}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="mx-auto max-w-2xl">
          <SectionHeading title={t("ctaTitle")} subtitle={t("ctaBody")} align="center" />
          <div className="mt-10 rounded-3xl border border-navy-950/[0.06] bg-white p-8 shadow-card sm:p-10">
            <PartnerRequestForm />
          </div>
        </div>
      </Section>
    </>
  );
}
