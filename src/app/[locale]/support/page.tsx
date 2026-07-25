import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Section, Eyebrow } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";
import { MessageCircle, Mail } from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "support" });
  return buildMetadata({ locale, title: t("heroTitle"), description: t("heroSubtitle"), path: "/support" });
}

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("support");

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
        <FaqAccordion locale={loc} />
      </Section>

      <Section tone="navy">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{t("stillNeedHelp")}</h2>
          <p className="mt-4 text-white/70">{t("stillNeedHelpBody")}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button as={Link} href="/contact" icon={<Mail className="h-4 w-4" />}>
              {t("contactSupportButton")}
            </Button>
            <Button variant="outline" className="!border-white/30 !bg-transparent !text-white hover:!border-white" icon={<MessageCircle className="h-4 w-4" />}>
              {t("chatButton")}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
