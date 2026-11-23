// /llms.txt : résumé de l'entreprise et index des pages clés pour les moteurs de réponse IA (format llmstxt.org).
// Généré à partir des mêmes données que le site : aucune information n'est dupliquée à la main.
import { SITE_URL } from "@/lib/seo";
import { CONTACT_EMAIL, CONTACT_PHONES, GOOGLE_BUSINESS_PROFILE_URL, SOCIAL_LINKS } from "@/lib/contact";
import { companyLegal } from "@/data/legal";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";
import { realisations } from "@/data/realisations";
import { blogPosts } from "@/data/blog";
import { faqItems } from "@/data/faq";

export const dynamic = "force-static";

const page = (path: string) => `${SITE_URL}/fr${path}`;

function build() {
  const lines: string[] = [
    "# VIT GLOBAL TECHNOLOGIES GROUP",
    "",
    `> Société de services numériques et éditeur de logiciels fondée le 27 juillet 2026 à Casablanca (Maroc), ${companyLegal.legalForm}${companyLegal.capital ? ` au capital de ${companyLegal.capital}` : ""}. Elle développe ses propres produits (VIT AUTO, KORVA OS, MARGOKIT, VITPAY) et accompagne les entreprises au Maroc, en Côte d'Ivoire, au Sénégal, au Mali, au Burkina Faso et en France : développement web et mobile, intelligence artificielle, cloud, cybersécurité et conseil.`,
    "",
    "Informations d'identification (pour ne pas confondre avec des sociétés homonymes) :",
    `- Raison sociale : VIT GLOBAL TECHNOLOGIES GROUP ${companyLegal.legalForm}`,
    `- Siège : ${companyLegal.address}`,
    `- ICE : ${companyLegal.ice}${companyLegal.rc ? ` ; RC : ${companyLegal.rc}` : ""}`,
    `- Site officiel : ${SITE_URL} (français, anglais, arabe : /fr, /en, /ar)`,
    `- Contact : ${CONTACT_EMAIL} ; ${CONTACT_PHONES.map((p) => p.label).join(" ; ")}`,
    `- Comptes officiels : ${SOCIAL_LINKS.map((s) => s.url).join(" ; ")} ; fiche Google : ${GOOGLE_BUSINESS_PROFILE_URL}`,
    "",
    "## Produits",
    ...realisations.map(
      (r) => `- [${r.client}](${page(`/realisations/${r.slug}`)}): ${r.summary.fr}${r.website ? ` Site : ${r.website}` : ""}`
    ),
    "",
    "## Services",
    ...services.map((s) => `- [${s.title.fr}](${page(`/services/${s.slug}`)}): ${s.summary.fr}`),
    "",
    "## Solutions logicielles métiers",
    `- [Catalogue des solutions](${page("/solutions")}): ${solutions.map((s) => s.title.fr).join(", ")}`,
    "",
    "## Entreprise",
    `- [À propos](${page("/a-propos")}): histoire, mission et valeurs`,
    `- [Équipe](${page("/equipe")}): fondateur et gérant`,
    `- [Contact](${page("/contact")}): coordonnées et formulaire`,
    `- [Demander un devis](${page("/devis")}): première réponse sous 24 à 48 h`,
    `- [Prendre rendez-vous](${page("/rendez-vous")}): échange de 30 minutes avec un conseiller`,
    `- [Mentions légales](${page("/mentions-legales")})`,
    "",
    "## Questions fréquentes",
    ...faqItems.map((f) => `- ${f.question.fr} ${f.answer.fr}`),
    "",
    "## Optional",
    ...blogPosts.map((p) => `- [${p.title.fr}](${page(`/blog/${p.slug}`)}): ${p.excerpt.fr}`),
    `- [English version](${SITE_URL}/en)`,
    `- [النسخة العربية](${SITE_URL}/ar)`,
    ""
  ];
  return lines.join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" }
  });
}
