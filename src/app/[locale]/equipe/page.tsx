import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Section, Eyebrow } from "@/components/ui/Section";
import { teamMembers } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  return buildMetadata({ locale, title: t("heroTitle"), description: t("heroSubtitle"), path: "/equipe" });
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("team");

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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member.name} hover={false} className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-navy-800 font-display text-xl font-bold text-white">
                {member.initials}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-950">{member.name}</h3>
              <p className="mt-1 text-sm font-medium text-brand-600">{member.role[loc]}</p>
              <p className="mt-3 text-sm leading-relaxed text-silver-600">{member.bio[loc]}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
