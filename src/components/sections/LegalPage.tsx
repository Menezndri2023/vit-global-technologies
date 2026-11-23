import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Section, Eyebrow } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { getLegalDocument, type LegalDocument } from "@/data/legal";
import type { Locale } from "@/data/types";

function loc(locale: string): Locale {
  return locale === "en" || locale === "ar" ? locale : "fr";
}

export function legalMetadata(slug: LegalDocument["slug"], locale: string): Metadata {
  const doc = getLegalDocument(slug)!;
  const l = loc(locale);
  return buildMetadata({ locale, title: doc.title[l], description: doc.description[l], path: `/${slug}` });
}

export async function LegalPage({ slug, locale }: { slug: LegalDocument["slug"]; locale: string }) {
  const doc = getLegalDocument(slug)!;
  const l = loc(locale);
  const t = await getTranslations("footer");
  const updated = new Date(`${doc.updatedAt}T12:00:00Z`).toLocaleDateString(
    l === "fr" ? "fr-FR" : l === "en" ? "en-GB" : "ar-MA",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <>
      <section className="bg-grid bg-white pb-12 pt-16 sm:pt-24">
        <div className="container-vit">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>{t("legal")}</Eyebrow>
            <h1 className="font-display mt-6 text-4xl font-bold tracking-tight text-navy-950">{doc.title[l]}</h1>
            <p className="mt-4 text-sm text-silver-500">
              {t("lastUpdated")} {updated}
            </p>
          </div>
        </div>
      </section>
      <Section tone="muted">
        <div className="mx-auto max-w-3xl space-y-10">
          {doc.sections.map((section) => (
            <section key={section.title.fr}>
              <h2 className="font-display text-xl font-semibold text-navy-950">{section.title[l]}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-navy-900">
                {section.paragraphs[l].map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
