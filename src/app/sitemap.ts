import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL, alternateLanguages } from "@/lib/seo";
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
  "/solutions",
  "/filiales",
  "/modele-economique",
  "/realisations",
  "/portfolio",
  "/blog",
  "/carrieres",
  "/support",
  "/contact",
  "/devis",
  "/rendez-vous",
  "/espace-client",
  "/espace-partenaire",
  "/mentions-legales",
  "/confidentialite",
  "/conditions-utilisation"
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
      alternates: { languages: alternateLanguages(path) }
    }))
  );
}
