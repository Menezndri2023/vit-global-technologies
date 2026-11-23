import type { Localized } from "./types";

export interface TeamMember {
  name: string;
  role: Localized<string>;
  bio: Localized<string>;
  initials: string;
}

// Seules figurent des personnes réelles ayant accepté d'apparaître sur le site.
export const teamMembers: TeamMember[] = [
  {
    name: "Manasse N'Dri",
    role: { fr: "Fondateur & Gérant", en: "Founder & Managing Director", ar: "المؤسس والمسيّر" },
    bio: {
      fr: "Fondateur et gérant de VIT GLOBAL TECHNOLOGIES GROUP. Développeur full-stack, il pilote la stratégie du groupe et le développement de ses produits : VIT AUTO, KORVA OS, MARGOKIT et VITPAY.",
      en: "Founder and managing director of VIT GLOBAL TECHNOLOGIES GROUP. A full-stack developer, he leads the group's strategy and the development of its products: VIT AUTO, KORVA OS, MARGOKIT and VITPAY.",
      ar: "مؤسس ومسيّر VIT GLOBAL TECHNOLOGIES GROUP. مطوّر برمجيات متكامل (Full-Stack)، يقود استراتيجية المجموعة وتطوير منتجاتها: VIT AUTO وKORVA OS وMARGOKIT وVITPAY."
    },
    initials: "MN"
  }
];

export interface Partner {
  name: string;
  category: Localized<string>;
}

// Technologies et plateformes avec lesquelles nous travaillons (et non des partenariats contractuels).
export const partners: Partner[] = [
  { name: "Amazon Web Services", category: { fr: "Cloud", en: "Cloud", ar: "الحوسبة السحابية" } },
  { name: "Microsoft Azure", category: { fr: "Cloud", en: "Cloud", ar: "الحوسبة السحابية" } },
  { name: "Google Cloud", category: { fr: "Cloud", en: "Cloud", ar: "الحوسبة السحابية" } },
  { name: "Vercel", category: { fr: "Hébergement web", en: "Web hosting", ar: "استضافة الويب" } },
  { name: "Stripe", category: { fr: "Paiement en ligne", en: "Online payments", ar: "الدفع الإلكتروني" } },
  { name: "Salesforce", category: { fr: "CRM", en: "CRM", ar: "إدارة علاقات العملاء" } },
  { name: "GitHub", category: { fr: "Développement", en: "Development", ar: "التطوير" } },
  { name: "PostgreSQL", category: { fr: "Base de données", en: "Database", ar: "قواعد البيانات" } }
];

export interface Testimonial {
  quote: Localized<string>;
  author: string;
  role: Localized<string>;
  company: string;
}

// N'ajouter que des témoignages réels, avec l'accord écrit du client.
export const testimonials: Testimonial[] = [];

export interface CompanyValue {
  icon: string;
  title: Localized<string>;
  description: Localized<string>;
}

export const companyValues: CompanyValue[] = [
  {
    icon: "Target",
    title: { fr: "Excellence", en: "Excellence", ar: "التميّز" },
    description: {
      fr: "Nous visons l'excellence technique et créative dans chaque projet, sans compromis sur la qualité.",
      en: "We pursue technical and creative excellence in every project, without compromising on quality.",
      ar: "نسعى للتميز التقني والإبداعي في كل مشروع، دون أي تنازل عن الجودة."
    }
  },
  {
    icon: "ShieldCheck",
    title: { fr: "Intégrité", en: "Integrity", ar: "النزاهة" },
    description: {
      fr: "Transparence, honnêteté et respect de nos engagements guident chacune de nos relations.",
      en: "Transparency, honesty and respect for our commitments guide every one of our relationships.",
      ar: "الشفافية والصدق واحترام الالتزامات توجّه كل علاقاتنا."
    }
  },
  {
    icon: "Lightbulb",
    title: { fr: "Innovation", en: "Innovation", ar: "الابتكار" },
    description: {
      fr: "Nous explorons continuellement les technologies émergentes pour garder nos clients en avance.",
      en: "We continuously explore emerging technologies to keep our clients ahead of the curve.",
      ar: "نستكشف باستمرار التقنيات الناشئة لإبقاء عملائنا في الصدارة."
    }
  },
  {
    icon: "Users",
    title: { fr: "Collaboration", en: "Collaboration", ar: "التعاون" },
    description: {
      fr: "Nous construisons chaque succès main dans la main avec nos clients, partenaires et équipes.",
      en: "We build every success hand in hand with our clients, partners and teams.",
      ar: "نبني كل نجاح يدًا بيد مع عملائنا وشركائنا وفرقنا."
    }
  },
  {
    icon: "Globe2",
    title: { fr: "Vision internationale", en: "International vision", ar: "رؤية دولية" },
    description: {
      fr: "Nous pensons global dès la conception, pour des solutions qui s'exportent et s'adaptent partout.",
      en: "We think global from day one, for solutions that export and adapt everywhere.",
      ar: "نفكر عالميًا منذ التصميم، من أجل حلول قابلة للتصدير والتكيف في كل مكان."
    }
  },
  {
    icon: "Leaf",
    title: { fr: "Responsabilité", en: "Responsibility", ar: "المسؤولية" },
    description: {
      fr: "Nous mesurons l'impact de nos décisions sur nos collaborateurs, la société et l'environnement.",
      en: "We measure the impact of our decisions on our people, society and the environment.",
      ar: "نقيس أثر قراراتنا على موظفينا والمجتمع والبيئة."
    }
  }
];

// Chiffres vérifiables uniquement (statuts, produits du groupe, engagements publiés sur le site).
/** Marchés cibles du groupe (codes ISO 3166-1), utilisés aussi dans les données structurées. */
export const TARGET_MARKETS = ["MA", "CI", "SN", "ML", "BF", "FR"] as const;

export const companyStats = [
  { value: "2026", label: { fr: "création à Casablanca", en: "founded in Casablanca", ar: "التأسيس بالدار البيضاء" } },
  { value: "6", label: { fr: "pays cibles en Afrique francophone et en Europe", en: "target countries in French-speaking Africa and Europe", ar: "دول مستهدفة في إفريقيا الفرنكوفونية وأوروبا" } },
  { value: "4", label: { fr: "produits du groupe", en: "group products", ar: "منتجات للمجموعة" } },
  { value: "3", label: { fr: "langues : FR, EN, AR", en: "languages: FR, EN, AR", ar: "لغات: الفرنسية والإنجليزية والعربية" } },
  { value: "48 h", label: { fr: "pour une proposition de devis", en: "to receive a quote proposal", ar: "لتلقي عرض سعر" } },
  { value: "30 min", label: { fr: "d'audit digital offert", en: "free digital audit", ar: "تدقيق رقمي مجاني" } }
];
