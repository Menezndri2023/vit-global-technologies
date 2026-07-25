import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";
import { services } from "@/data/services";
import { filiales } from "@/data/filiales";
import { realisations } from "@/data/realisations";
import { blogPosts } from "@/data/blog";
import { jobOpenings } from "@/data/careers";

const staticPaths = [
  "",
  "/a-propos",
  "/equipe",
  "/partenaires",
  "/services",
  "/filiales",
  "/realisations",
  "/blog",
  "/carrieres",
  "/support",
  "/contact",
  "/devis",
  "/rendez-vous",
  "/espace-client",
  "/espace-partenaire"
];

const dynamicPaths = [
  ...services.map((s) => `/services/${s.slug}`),
  ...filiales.map((f) => `/filiales/${f.slug}`),
  ...realisations.map((r) => `/realisations/${r.slug}`),
  ...blogPosts.map((b) => `/blog/${b.slug}`),
  ...jobOpenings.map((j) => `/carrieres/${j.slug}`)
];

export default function sitemap(): MetadataRoute.Sitemap {
  const allPaths = [...staticPaths, ...dynamicPaths];

  return allPaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${SITE_URL}/${loc}${path}`]))
      }
    }))
  );
}
