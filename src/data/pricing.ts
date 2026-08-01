import type { Localized } from "./types";

/**
 * Modèle économique — source unique de vérité.
 *
 * `serviceCategories`, `publicPricing` et `externalProcess` sont PUBLICS (affichés sur
 * /modele-economique). `detailedRateCard` et `internalProcess` ne doivent jamais être
 * exposés publiquement : ils alimentent uniquement le panneau admin et le PDF envoyé aux
 * prospects lors d'une demande de devis.
 */

export interface ServiceCategory {
  slug: string;
  icon: string;
  title: Localized<string>;
  description: Localized<string>;
  examples: Localized<string[]>;
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "ponctuelle",
    icon: "Zap",
    title: { fr: "Prestations ponctuelles", en: "One-off services", ar: "خدمات لمرة واحدة" },
    description: {
      fr: "Facturation unique pour une mission clairement délimitée.",
      en: "Single invoice for a clearly scoped mission.",
      ar: "فوترة واحدة لمهمة محددة بوضوح."
    },
    examples: {
      fr: ["Création de site", "Logo", "Application mobile", "Audit", "Migration", "Formation"],
      en: ["Website creation", "Logo", "Mobile application", "Audit", "Migration", "Training"],
      ar: ["إنشاء موقع", "شعار", "تطبيق جوال", "تدقيق", "ترحيل", "تدريب"]
    }
  },
  {
    slug: "forfait",
    icon: "PackageCheck",
    title: { fr: "Prestations au forfait", en: "Fixed-price packages", ar: "خدمات بسعر إجمالي" },
    description: {
      fr: "Un périmètre fixe, un prix fixe, réglé en plusieurs étapes.",
      en: "A fixed scope, a fixed price, settled in staged payments.",
      ar: "نطاق ثابت وسعر ثابت، يُسدد على مراحل."
    },
    examples: {
      fr: ["Création d'un ERP", "Plateforme SaaS", "Marketplace", "Application métier"],
      en: ["ERP build", "SaaS platform", "Marketplace", "Business application"],
      ar: ["إنشاء نظام ERP", "منصة SaaS", "سوق إلكتروني", "تطبيق أعمال"]
    }
  },
  {
    slug: "mensuelle",
    icon: "CalendarSync",
    title: { fr: "Prestations mensuelles", en: "Monthly services", ar: "خدمات شهرية" },
    description: {
      fr: "Un accompagnement continu, facturé chaque mois.",
      en: "Ongoing support, billed every month.",
      ar: "مرافقة مستمرة، تُفوتر شهريًا."
    },
    examples: {
      fr: ["Maintenance", "Support", "SEO", "Hébergement", "Cloud", "Cybersécurité", "CRM"],
      en: ["Maintenance", "Support", "SEO", "Hosting", "Cloud", "Cybersecurity", "CRM"],
      ar: ["الصيانة", "الدعم", "تحسين محركات البحث", "الاستضافة", "السحابة", "الأمن السيبراني", "CRM"]
    }
  },
  {
    slug: "abonnement",
    icon: "RefreshCcw",
    title: { fr: "Prestations sur abonnement", en: "Subscription services", ar: "خدمات بالاشتراك" },
    description: {
      fr: "Un accès continu à un logiciel SaaS du groupe.",
      en: "Ongoing access to one of the group's SaaS products.",
      ar: "وصول مستمر إلى أحد برمجيات SaaS التابعة للمجموعة."
    },
    examples: {
      fr: ["Logiciels SaaS", "CRM", "ERP", "Gestion RH", "Gestion commerciale", "Marketplace"],
      en: ["SaaS software", "CRM", "ERP", "HR management", "Sales management", "Marketplace"],
      ar: ["برمجيات SaaS", "CRM", "ERP", "إدارة الموارد البشرية", "الإدارة التجارية", "سوق إلكتروني"]
    }
  }
];

export interface PublicPricingEntry {
  slug: string;
  icon: string;
  businessUnit: string;
  title: Localized<string>;
  fromMad: number;
  toMad?: number;
  unit?: Localized<string>;
}

/** Tarifs indicatifs "à partir de", en MAD (devise de référence du groupe). Public. */
export const publicPricing: PublicPricingEntry[] = [
  {
    slug: "site-vitrine",
    icon: "Globe2",
    businessUnit: "vit-digital",
    title: { fr: "Site vitrine", en: "Showcase website", ar: "موقع تعريفي" },
    fromMad: 4500,
    toMad: 25000
  },
  {
    slug: "site-ecommerce",
    icon: "ShoppingCart",
    businessUnit: "vit-digital",
    title: { fr: "Site e-commerce", en: "E-commerce site", ar: "متجر إلكتروني" },
    fromMad: 12000,
    toMad: 50000
  },
  {
    slug: "marketplace",
    icon: "Store",
    businessUnit: "vit-digital",
    title: { fr: "Marketplace", en: "Marketplace", ar: "سوق إلكتروني" },
    fromMad: 40000,
    toMad: 200000
  },
  {
    slug: "erp",
    icon: "Layers",
    businessUnit: "vit-digital",
    title: { fr: "ERP sur mesure", en: "Custom ERP", ar: "نظام تخطيط موارد مخصص" },
    fromMad: 80000,
    toMad: 500000
  },
  {
    slug: "app-mobile",
    icon: "Smartphone",
    businessUnit: "vit-mobile",
    title: { fr: "Application mobile", en: "Mobile application", ar: "تطبيق جوال" },
    fromMad: 30000
  },
  {
    slug: "chatbot-ia",
    icon: "Bot",
    businessUnit: "vit-ai",
    title: { fr: "Chatbot IA", en: "AI Chatbot", ar: "روبوت محادثة ذكي" },
    fromMad: 15000
  },
  {
    slug: "maintenance",
    icon: "Wrench",
    businessUnit: "vit-digital",
    title: { fr: "Maintenance mensuelle", en: "Monthly maintenance", ar: "صيانة شهرية" },
    fromMad: 500,
    toMad: 10000,
    unit: { fr: "/ mois", en: "/ month", ar: "/ شهر" }
  },
  {
    slug: "hebergement-cloud",
    icon: "Cloud",
    businessUnit: "vit-cloud",
    title: { fr: "Hébergement cloud", en: "Cloud hosting", ar: "استضافة سحابية" },
    fromMad: 300,
    unit: { fr: "/ mois", en: "/ month", ar: "/ شهر" }
  }
];

export interface ProcessStep {
  icon: string;
  title: Localized<string>;
}

/** Parcours client — public. */
export const externalProcess: ProcessStep[] = [
  { icon: "UserPlus", title: { fr: "Prospect", en: "Prospect", ar: "عميل محتمل" } },
  { icon: "SearchCheck", title: { fr: "Analyse du besoin", en: "Needs analysis", ar: "تحليل الاحتياج" } },
  { icon: "FileText", title: { fr: "Devis", en: "Quote", ar: "عرض سعر" } },
  { icon: "CheckCircle2", title: { fr: "Validation", en: "Validation", ar: "التحقق" } },
  { icon: "FileSignature", title: { fr: "Contrat", en: "Contract", ar: "عقد" } },
  { icon: "Wallet", title: { fr: "Acompte", en: "Deposit", ar: "دفعة أولى" } },
  { icon: "Code2", title: { fr: "Développement", en: "Development", ar: "التطوير" } },
  { icon: "Rocket", title: { fr: "Livraison", en: "Delivery", ar: "التسليم" } },
  { icon: "Receipt", title: { fr: "Facture finale", en: "Final invoice", ar: "الفاتورة النهائية" } },
  { icon: "LifeBuoy", title: { fr: "Support", en: "Support", ar: "الدعم" } }
];

/** Pipeline interne (CRM) — admin uniquement, jamais public ni envoyé au client. */
export const internalProcess: ProcessStep[] = [
  { icon: "UserPlus", title: { fr: "Prospect", en: "Prospect", ar: "عميل محتمل" } },
  { icon: "Database", title: { fr: "CRM", en: "CRM", ar: "إدارة علاقات العملاء" } },
  { icon: "Filter", title: { fr: "Qualification", en: "Qualification", ar: "التأهيل" } },
  { icon: "FileText", title: { fr: "Devis", en: "Quote", ar: "عرض سعر" } },
  { icon: "CheckCircle2", title: { fr: "Validation", en: "Validation", ar: "التحقق" } },
  { icon: "Cog", title: { fr: "Production", en: "Production", ar: "الإنتاج" } },
  { icon: "ShieldCheck", title: { fr: "Contrôle qualité", en: "Quality control", ar: "مراقبة الجودة" } },
  { icon: "Rocket", title: { fr: "Livraison", en: "Delivery", ar: "التسليم" } },
  { icon: "Receipt", title: { fr: "Facturation", en: "Invoicing", ar: "الفوترة" } },
  { icon: "LifeBuoy", title: { fr: "Support", en: "Support", ar: "الدعم" } },
  { icon: "Heart", title: { fr: "Fidélisation", en: "Loyalty", ar: "الولاء" } }
];

export interface DetailedRateCardEntry {
  slug: string;
  title: Localized<string>;
  range: Localized<string>;
}

/** Grille tarifaire complète — admin uniquement + PDF envoyé sur demande de devis. */
export const detailedRateCard: DetailedRateCardEntry[] = [
  { slug: "site-vitrine-standard", title: { fr: "Site vitrine — à partir de", en: "Showcase website — starting at", ar: "موقع تعريفي — ابتداءً من" }, range: { fr: "4 500 MAD", en: "MAD 4,500", ar: "4,500 درهم" } },
  { slug: "site-vitrine-premium", title: { fr: "Site vitrine — Premium", en: "Showcase website — Premium", ar: "موقع تعريفي — بريميوم" }, range: { fr: "10 000 à 25 000 MAD", en: "MAD 10,000 to 25,000", ar: "10,000 إلى 25,000 درهم" } },
  { slug: "ecommerce", title: { fr: "Site e-commerce", en: "E-commerce site", ar: "متجر إلكتروني" }, range: { fr: "12 000 à 50 000 MAD", en: "MAD 12,000 to 50,000", ar: "12,000 إلى 50,000 درهم" } },
  { slug: "marketplace", title: { fr: "Marketplace", en: "Marketplace", ar: "سوق إلكتروني" }, range: { fr: "40 000 à 200 000 MAD", en: "MAD 40,000 to 200,000", ar: "40,000 إلى 200,000 درهم" } },
  { slug: "erp", title: { fr: "ERP sur mesure", en: "Custom ERP", ar: "نظام تخطيط موارد مخصص" }, range: { fr: "80 000 à 500 000 MAD", en: "MAD 80,000 to 500,000", ar: "80,000 إلى 500,000 درهم" } },
  { slug: "app-mobile", title: { fr: "Application mobile (Android / iOS)", en: "Mobile application (Android / iOS)", ar: "تطبيق جوال (Android / iOS)" }, range: { fr: "À partir de 30 000 MAD", en: "Starting at MAD 30,000", ar: "ابتداءً من 30,000 درهم" } },
  { slug: "chatbot-ia", title: { fr: "Chatbot IA", en: "AI Chatbot", ar: "روبوت محادثة ذكي" }, range: { fr: "À partir de 15 000 MAD", en: "Starting at MAD 15,000", ar: "ابتداءً من 15,000 درهم" } },
  { slug: "maintenance", title: { fr: "Maintenance mensuelle", en: "Monthly maintenance", ar: "صيانة شهرية" }, range: { fr: "500 à 10 000 MAD / mois", en: "MAD 500 to 10,000 / month", ar: "500 إلى 10,000 درهم / شهر" } },
  { slug: "hebergement-cloud", title: { fr: "Hébergement cloud", en: "Cloud hosting", ar: "استضافة سحابية" }, range: { fr: "À partir de 300 MAD / mois", en: "Starting at MAD 300 / month", ar: "ابتداءً من 300 درهم / شهر" } }
];

export interface PaymentSplit {
  label: Localized<string>;
  percentage: number;
}

/** Répartition de paiement au forfait (ex. création d'un ERP) — admin uniquement + PDF devis. */
export const forfaitPaymentSplit: PaymentSplit[] = [
  { label: { fr: "À la signature du contrat", en: "On contract signature", ar: "عند توقيع العقد" }, percentage: 30 },
  { label: { fr: "Au démarrage de la production", en: "At production kickoff", ar: "عند بدء الإنتاج" }, percentage: 40 },
  { label: { fr: "À la livraison finale", en: "On final delivery", ar: "عند التسليم النهائي" }, percentage: 30 }
];
