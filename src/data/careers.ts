import type { Localized } from "./types";

export interface JobOpening {
  slug: string;
  department: Localized<string>;
  location: Localized<string>;
  type: Localized<string>;
  title: Localized<string>;
  description: Localized<string>;
  requirements: Localized<string[]>;
}

// Appels ouverts réels : VIT GLOBAL mobilise des freelances et des partenaires selon les projets.
// N'ajouter un poste salarié (CDI, CDD, stage) que lorsqu'un recrutement est effectivement ouvert.
const REMOTE: Localized<string> = {
  fr: "À distance (Maroc, Afrique francophone, France)",
  en: "Remote (Morocco, French-speaking Africa, France)",
  ar: "عن بُعد (المغرب، أفريقيا الفرنكوفونية، فرنسا)"
};

const FREELANCE: Localized<string> = { fr: "Mission freelance", en: "Freelance assignment", ar: "مهمة حرة" };

export const jobOpenings: JobOpening[] = [
  {
    slug: "developpeur-full-stack-freelance",
    department: { fr: "Développement", en: "Development", ar: "التطوير" },
    location: REMOTE,
    type: FREELANCE,
    title: {
      fr: "Développeur·se full stack freelance (Next.js / TypeScript)",
      en: "Freelance full stack developer (Next.js / TypeScript)",
      ar: "مطور/ة متكامل/ة مستقل/ة (Next.js / TypeScript)"
    },
    description: {
      fr: "Nous constituons un réseau de développeurs que nous mobilisons sur les projets clients et sur nos produits (KORVA OS, MARGOKIT, VIT AUTO, VITPAY). Les missions sont proposées selon les besoins, avec un périmètre, une durée et une rémunération fixés à l'avance.",
      en: "We are building a network of developers we bring in on client projects and on our own products (KORVA OS, MARGOKIT, VIT AUTO, VITPAY). Assignments are offered as needs arise, with scope, duration and pay agreed upfront.",
      ar: "نكوّن شبكة من المطورين نستعين بهم في مشاريع العملاء وفي منتجاتنا (KORVA OS وMARGOKIT وVIT AUTO وVITPAY). تُقترح المهام حسب الحاجة، مع تحديد النطاق والمدة والأجر مسبقًا."
    },
    requirements: {
      fr: ["Expérience confirmée en React / Next.js et TypeScript", "Bases de données SQL (PostgreSQL, Prisma)", "Portfolio ou dépôt GitHub consultable", "Autonomie et communication écrite claire en français"],
      en: ["Solid experience with React / Next.js and TypeScript", "SQL databases (PostgreSQL, Prisma)", "Portfolio or public GitHub profile", "Autonomy and clear written communication in French"],
      ar: ["خبرة مؤكدة في React / Next.js وTypeScript", "قواعد بيانات SQL (PostgreSQL وPrisma)", "معرض أعمال أو حساب GitHub متاح", "استقلالية وتواصل كتابي واضح بالفرنسية"]
    }
  },
  {
    slug: "designer-ui-ux-freelance",
    department: { fr: "Design", en: "Design", ar: "التصميم" },
    location: REMOTE,
    type: FREELANCE,
    title: {
      fr: "Designer UI/UX freelance",
      en: "Freelance UI/UX designer",
      ar: "مصمم/ة واجهات وتجربة مستخدم مستقل/ة"
    },
    description: {
      fr: "Pour concevoir les interfaces de nos produits et des projets clients : parcours utilisateurs, maquettes et systèmes de design, en lien direct avec le développement.",
      en: "To design the interfaces of our products and client projects: user journeys, mockups and design systems, working directly with development.",
      ar: "لتصميم واجهات منتجاتنا ومشاريع العملاء: مسارات المستخدم والنماذج وأنظمة التصميم، بالتنسيق المباشر مع فريق التطوير."
    },
    requirements: {
      fr: ["Portfolio d'interfaces web ou mobiles", "Maîtrise de Figma", "Sens de l'accessibilité et du responsive", "Interfaces en français, idéalement aussi en arabe (RTL)"],
      en: ["Portfolio of web or mobile interfaces", "Proficiency in Figma", "Attention to accessibility and responsive design", "French interfaces, ideally Arabic (RTL) too"],
      ar: ["معرض أعمال لواجهات ويب أو جوال", "إتقان Figma", "اهتمام بإمكانية الوصول والتصميم المتجاوب", "واجهات بالفرنسية، ويُفضل بالعربية أيضًا (RTL)"]
    }
  },
  {
    slug: "partenaire-commercial",
    department: { fr: "Partenariats", en: "Partnerships", ar: "الشراكات" },
    location: {
      fr: "Côte d'Ivoire, Sénégal, Mali, Burkina Faso, France, Maroc",
      en: "Côte d'Ivoire, Senegal, Mali, Burkina Faso, France, Morocco",
      ar: "كوت ديفوار، السنغال، مالي، بوركينا فاسو، فرنسا، المغرب"
    },
    type: { fr: "Partenariat à la commission", en: "Commission-based partnership", ar: "شراكة بالعمولة" },
    title: {
      fr: "Partenaire commercial / apporteur d'affaires",
      en: "Sales partner / business referrer",
      ar: "شريك تجاري / وسيط أعمال"
    },
    description: {
      fr: "Vous connaissez des PME, commerçants ou indépendants dans l'un de nos marchés ? Présentez-leur nos services et nos logiciels (KORVA OS, MARGOKIT) et percevez une commission sur les contrats signés, selon des conditions écrites.",
      en: "Do you know SMEs, retailers or freelancers in one of our markets? Introduce them to our services and software (KORVA OS, MARGOKIT) and earn a commission on signed contracts, under written terms.",
      ar: "هل تعرف شركات صغيرة ومتوسطة أو تجارًا أو مستقلين في أحد أسواقنا؟ عرّفهم بخدماتنا وبرامجنا (KORVA OS وMARGOKIT) واحصل على عمولة على العقود الموقعة وفق شروط مكتوبة."
    },
    requirements: {
      fr: ["Réseau professionnel dans le pays concerné", "Aisance commerciale", "Statut permettant de facturer (auto-entrepreneur, société…)", "Intérêt pour le numérique"],
      en: ["Professional network in the country concerned", "Sales skills", "A status that allows invoicing (sole trader, company…)", "Interest in digital technology"],
      ar: ["شبكة علاقات مهنية في البلد المعني", "مهارات تجارية", "وضع قانوني يسمح بالفوترة (مقاول ذاتي، شركة…)", "اهتمام بالمجال الرقمي"]
    }
  }
];

export function getJobBySlug(slug: string) {
  return jobOpenings.find((job) => job.slug === slug);
}
