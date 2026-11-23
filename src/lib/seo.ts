import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vit-global.tech";
export const SITE_URL = rawSiteUrl.replace(/\/$/, "");

export const OG_IMAGE = { url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "VIT GLOBAL TECHNOLOGIES GROUP" };

/** URL de chaque version linguistique d'une page, plus `x-default` (version française). */
export function alternateLanguages(path = "") {
  return {
    ...Object.fromEntries(routing.locales.map((loc) => [loc, `${SITE_URL}/${loc}${path}`])),
    "x-default": `${SITE_URL}/${routing.defaultLocale}${path}`
  };
}

/** Suffixe ajouté aux titres de page : court, pour rester sous ~65 caractères dans les résultats. */
export const TITLE_SUFFIX = " | VIT GLOBAL";
const MAX_TITLE_LENGTH = 65;

/** Applique le suffixe de marque seulement si le titre complet reste lisible en entier dans Google. */
function fitTitle(title: Metadata["title"]): Metadata["title"] {
  if (typeof title !== "string") return title;
  return title.length + TITLE_SUFFIX.length <= MAX_TITLE_LENGTH ? title : { absolute: title };
}

export function buildMetadata({
  locale,
  title,
  description,
  path = ""
}: {
  locale: string;
  title: Metadata["title"];
  description: string;
  path?: string;
}): Metadata {
  const languages = alternateLanguages(path);

  const ogTitle = typeof title === "string" ? title : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title: fitTitle(title),
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}${path}`,
      languages
    },
    openGraph: {
      title: ogTitle,
      description,
      url: `${SITE_URL}/${locale}${path}`,
      siteName: "VIT GLOBAL TECHNOLOGIES GROUP",
      locale,
      type: "website",
      images: [OG_IMAGE]
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [OG_IMAGE.url]
    }
  };
}
