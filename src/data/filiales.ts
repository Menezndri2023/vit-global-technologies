import type { Localized } from "./types";

export interface Filiale {
  slug: string;
  icon: string;
  name: string;
  sector: Localized<string>;
  tagline: Localized<string>;
  description: Localized<string>;
  offerings: Localized<string[]>;
  founded: string;
  color: string;
}

export const filiales: Filiale[] = [
  {
    slug: "vit-auto",
    icon: "Car",
    name: "VIT AUTO",
    sector: {
      fr: "Mobilité & technologies automobiles",
      en: "Mobility & automotive technology",
      ar: "التنقل وتقنيات السيارات"
    },
    tagline: {
      fr: "La mobilité intelligente au service des flottes et des concessionnaires.",
      en: "Smart mobility for fleets and dealerships.",
      ar: "التنقل الذكي في خدمة الأساطيل والوكلاء."
    },
    description: {
      fr: "VIT AUTO est la filiale du groupe dédiée aux technologies automobiles : plateformes de gestion de flotte connectée, solutions de géolocalisation, marketplace de véhicules et outils digitaux pour concessionnaires et loueurs.",
      en: "VIT AUTO is the group's subsidiary dedicated to automotive technology: connected fleet management platforms, geolocation solutions, vehicle marketplaces and digital tools for dealerships and rental companies.",
      ar: "VIT AUTO هي الفرع المتخصص في تقنيات السيارات ضمن المجموعة: منصات إدارة الأساطيل المتصلة، حلول تحديد المواقع، أسواق إلكترونية للمركبات وأدوات رقمية للوكلاء ومؤجري السيارات."
    },
    offerings: {
      fr: ["Gestion de flotte connectée", "Géolocalisation & télématique", "Marketplace véhicules", "Solutions digitales pour concessionnaires"],
      en: ["Connected fleet management", "Geolocation & telematics", "Vehicle marketplace", "Digital solutions for dealerships"],
      ar: ["إدارة أسطول متصلة", "تحديد المواقع والقياس عن بعد", "سوق إلكتروني للمركبات", "حلول رقمية للوكلاء"]
    },
    founded: "2022",
    color: "#1D4ED8"
  },
  {
    slug: "vit-digital",
    icon: "MonitorSmartphone",
    name: "VIT DIGITAL",
    sector: {
      fr: "Agence digitale & création",
      en: "Digital agency & creative studio",
      ar: "وكالة رقمية وإبداعية"
    },
    tagline: {
      fr: "Le studio créatif et technique du groupe pour vos marques digitales.",
      en: "The group's creative and technical studio for your digital brands.",
      ar: "الاستوديو الإبداعي والتقني للمجموعة لعلاماتكم الرقمية."
    },
    description: {
      fr: "VIT DIGITAL regroupe les expertises design, UX/UI, développement web et marketing digital du groupe pour livrer des expériences de marque à fort impact, du branding à la campagne d'acquisition.",
      en: "VIT DIGITAL brings together the group's design, UX/UI, web development and digital marketing expertise to deliver high-impact brand experiences, from branding to acquisition campaigns.",
      ar: "تجمع VIT DIGITAL خبرات التصميم وتجربة المستخدم وتطوير الويب والتسويق الرقمي في المجموعة لتقديم تجارب علامة تجارية عالية التأثير."
    },
    offerings: {
      fr: ["Sites & applications", "UI/UX & design systems", "Branding & identité", "Campagnes marketing digital"],
      en: ["Websites & applications", "UI/UX & design systems", "Branding & identity", "Digital marketing campaigns"],
      ar: ["مواقع وتطبيقات", "تصميم واجهات وأنظمة تصميم", "الهوية التجارية", "حملات التسويق الرقمي"]
    },
    founded: "2020",
    color: "#38BDF8"
  },
  {
    slug: "vit-consulting",
    icon: "Briefcase",
    name: "VIT CONSULTING",
    sector: {
      fr: "Conseil en stratégie & transformation",
      en: "Strategy & transformation consulting",
      ar: "استشارات الاستراتيجية والتحول"
    },
    tagline: {
      fr: "L'expertise stratégique du groupe pour les grands comptes et institutions.",
      en: "The group's strategic expertise for large accounts and institutions.",
      ar: "الخبرة الاستراتيجية للمجموعة للشركات الكبرى والمؤسسات."
    },
    description: {
      fr: "VIT CONSULTING accompagne grandes entreprises, institutions publiques et investisseurs dans leurs projets de transformation digitale, cybersécurité et gouvernance IT à l'échelle internationale.",
      en: "VIT CONSULTING supports large enterprises, public institutions and investors in their digital transformation, cybersecurity and IT governance projects on an international scale.",
      ar: "ترافق VIT CONSULTING الشركات الكبرى والمؤسسات العامة والمستثمرين في مشاريع التحول الرقمي والأمن السيبراني وحوكمة تقنية المعلومات دوليًا."
    },
    offerings: {
      fr: ["Stratégie digitale", "Gouvernance IT", "Cybersécurité & conformité", "Accompagnement au changement"],
      en: ["Digital strategy", "IT governance", "Cybersecurity & compliance", "Change management"],
      ar: ["الاستراتيجية الرقمية", "حوكمة تقنية المعلومات", "الأمن السيبراني والامتثال", "إدارة التغيير"]
    },
    founded: "2021",
    color: "#1436A8"
  },
  {
    slug: "vit-academy",
    icon: "GraduationCap",
    name: "VIT ACADEMY",
    sector: {
      fr: "Formation & montée en compétences",
      en: "Training & upskilling",
      ar: "التدريب وتطوير المهارات"
    },
    tagline: {
      fr: "Former les talents technologiques de demain.",
      en: "Training tomorrow's technology talent.",
      ar: "تكوين مواهب التكنولوجيا للغد."
    },
    description: {
      fr: "VIT ACADEMY propose des parcours de formation certifiants en développement, cybersécurité, data et IA, pour les entreprises comme pour les particuliers souhaitant se reconvertir dans la tech.",
      en: "VIT ACADEMY offers certified training paths in development, cybersecurity, data and AI, for companies as well as individuals looking to move into tech.",
      ar: "تقدم VIT ACADEMY مسارات تدريب معتمدة في البرمجة والأمن السيبراني والبيانات والذكاء الاصطناعي، للشركات والأفراد الراغبين في التحول نحو التكنولوجيا."
    },
    offerings: {
      fr: ["Bootcamps développement & data", "Certifications cybersécurité", "Formations intra-entreprise", "Accompagnement à l'insertion"],
      en: ["Development & data bootcamps", "Cybersecurity certifications", "In-company training", "Job placement support"],
      ar: ["معسكرات تدريبية في البرمجة والبيانات", "شهادات الأمن السيبراني", "تدريب داخل الشركات", "دعم التوظيف"]
    },
    founded: "2023",
    color: "#6B7789"
  }
];

export function getFilialeBySlug(slug: string) {
  return filiales.find((filiale) => filiale.slug === slug);
}
