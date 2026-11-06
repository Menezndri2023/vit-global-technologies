import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vit-global.tech";
export const SITE_URL = rawSiteUrl.replace(/\/$/, "");

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
  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, `${SITE_URL}/${loc}${path}`])
  );

  const ogTitle = typeof title === "string" ? title : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title,
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
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description
    }
  };
}
