// Coordonnées officielles de l'entreprise — source unique utilisée par le site et le SEO (JSON-LD).
export const CONTACT_EMAIL = "contact@vit-global.tech";

export const CONTACT_PHONES = [
  { href: "tel:+212607742672", label: "+212 6 07 74 26 72", e164: "+212607742672", country: "MA" },
  { href: "tel:+2250748124635", label: "+225 07 48 12 46 35", e164: "+2250748124635", country: "CI" }
] as const;

// Comptes officiels sur les réseaux sociaux (affichés dans le pied de page et déclarés dans le JSON-LD « sameAs »).
// N'ajouter ici que des comptes appartenant réellement à VIT GLOBAL TECHNOLOGIES GROUP.
export const SOCIAL_LINKS = [
  { network: "facebook", label: "Facebook", url: "https://www.facebook.com/profile.php?id=1475412788979303" },
  { network: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/vit-global-technologies-group/" },
  { network: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@vitglobaltech" }
] as const;

// Fiche Google Business Profile de l'entreprise (déclarée dans le JSON-LD « sameAs », pas affichée dans le pied de page).
export const GOOGLE_BUSINESS_PROFILE_URL = "https://share.google/kFUGMMkZdAB6TfzIQ";
