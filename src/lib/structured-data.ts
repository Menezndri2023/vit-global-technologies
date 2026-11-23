// Données structurées schema.org partagées par les pages (JSON-LD).
// Une seule entité « Organization » (@id stable) à laquelle toutes les autres se rattachent,
// pour que moteurs de recherche et moteurs de réponse IA identifient sans ambiguïté l'entreprise.
import { SITE_URL } from "@/lib/seo";
import { CONTACT_EMAIL, CONTACT_PHONES, SOCIAL_LINKS } from "@/lib/contact";
import { TARGET_MARKETS } from "@/data/company";
import { companyLegal } from "@/data/legal";
import type { Locale } from "@/data/types";
import type { FaqItem } from "@/data/faq";
import type { Service } from "@/data/services";
import type { Realisation } from "@/data/realisations";
import type { BlogPost } from "@/data/blog";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const COUNTRY_NAMES: Record<(typeof TARGET_MARKETS)[number], string> = {
  MA: "Morocco",
  CI: "Côte d'Ivoire",
  SN: "Senegal",
  ML: "Mali",
  BF: "Burkina Faso",
  FR: "France"
};

const LANGUAGE_TAGS: Record<Locale, string> = { fr: "fr-MA", en: "en", ar: "ar-MA" };

const organizationRef = { "@id": ORGANIZATION_ID };

export function organization() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "VIT GLOBAL TECHNOLOGIES GROUP",
    alternateName: ["VIT GLOBAL", "VIT GLOBAL TECHNOLOGIES"],
    legalName: "VIT GLOBAL TECHNOLOGIES GROUP S.A.R.L.A.U.",
    foundingDate: "2026-07-27",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    image: `${SITE_URL}/og-image.png`,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONES[0].e164,
    // Identifiants officiels (registre du commerce marocain) : lèvent l'ambiguïté avec les sociétés homonymes.
    identifier: [
      { "@type": "PropertyValue", propertyID: "ICE", value: companyLegal.ice },
      ...(companyLegal.rc ? [{ "@type": "PropertyValue", propertyID: "RC Casablanca", value: companyLegal.rc.split(" ")[0] }] : [])
    ],
    founder: { "@type": "Person", name: companyLegal.publicationDirector.split(",")[0] },
    contactPoint: CONTACT_PHONES.map((phone) => ({
      "@type": "ContactPoint",
      contactType: "customer service",
      email: CONTACT_EMAIL,
      telephone: phone.e164,
      areaServed: phone.country,
      availableLanguage: ["French", "English", "Arabic"]
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Angle Bd Lalla Yacout et Rue El Araar, Résidence Galis, Imm. 9, 4e étage, Apt 17",
      addressLocality: "Casablanca",
      addressCountry: "MA"
    },
    areaServed: TARGET_MARKETS.map((code) => ({ "@type": "Country", name: COUNTRY_NAMES[code], identifier: code })),
    knowsLanguage: ["fr", "en", "ar"],
    sameAs: SOCIAL_LINKS.map((social) => social.url)
  };
}

/** Graphe présent sur toutes les pages : l'entreprise et le site. */
export function siteGraph(locale: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: "VIT GLOBAL TECHNOLOGIES GROUP",
        inLanguage: LANGUAGE_TAGS[locale as Locale] ?? locale,
        publisher: organizationRef
      }
    ]
  };
}

const HOME_LABEL: Record<Locale, string> = { fr: "Accueil", en: "Home", ar: "الرئيسية" };

/** Fil d'Ariane depuis l'accueil : [libellé, chemin sans la langue] du plus général au plus précis. */
export function breadcrumb(locale: Locale, trail: [name: string, path: string][]) {
  const items: [string, string][] = [[HOME_LABEL[locale], ""], ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${SITE_URL}/${locale}${path}`
    }))
  };
}

export function faqPage(items: FaqItem[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: LANGUAGE_TAGS[locale],
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question[locale],
      acceptedAnswer: { "@type": "Answer", text: item.answer[locale] }
    }))
  };
}

export function serviceSchema(service: Service, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/${locale}/services/${service.slug}#service`,
    name: service.title[locale],
    description: service.description[locale],
    serviceType: service.title[locale],
    url: `${SITE_URL}/${locale}/services/${service.slug}`,
    inLanguage: LANGUAGE_TAGS[locale],
    provider: organizationRef,
    areaServed: TARGET_MARKETS.map((code) => ({ "@type": "Country", name: COUNTRY_NAMES[code] })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title[locale],
      itemListElement: service.subServices[locale].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name }
      }))
    }
  };
}

/** Produits logiciels édités par VIT GLOBAL (VIT AUTO, KORVA OS, MARGOKIT, VITPAY). */
export function softwareSchema(item: Realisation, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: item.client,
    headline: item.title[locale],
    description: item.summary[locale],
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: LANGUAGE_TAGS[locale],
    ...(item.website ? { url: item.website } : {}),
    ...(item.image ? { screenshot: `${SITE_URL}${item.image}` } : {}),
    mainEntityOfPage: `${SITE_URL}/${locale}/realisations/${item.slug}`,
    featureList: item.results[locale],
    publisher: organizationRef,
    creator: organizationRef
  };
}

export function blogPostingSchema(post: BlogPost, locale: Locale) {
  const url = `${SITE_URL}/${locale}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[locale],
    description: post.excerpt[locale],
    articleSection: post.category[locale],
    inLanguage: LANGUAGE_TAGS[locale],
    datePublished: post.date,
    url,
    mainEntityOfPage: url,
    image: `${SITE_URL}/og-image.png`,
    author: organizationRef,
    publisher: organizationRef
  };
}
