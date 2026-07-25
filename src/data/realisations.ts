import type { Localized } from "./types";

export interface Realisation {
  slug: string;
  client: string;
  year: string;
  country: Localized<string>;
  industry: Localized<string>;
  services: string[];
  title: Localized<string>;
  summary: Localized<string>;
  challenge: Localized<string>;
  solution: Localized<string>;
  results: Localized<string[]>;
  stats: { value: string; label: Localized<string> }[];
  color: string;
}

export const realisations: Realisation[] = [
  {
    slug: "banque-digitale-panafricaine",
    client: "NovaBank Group",
    year: "2024",
    country: { fr: "Côte d'Ivoire", en: "Côte d'Ivoire", ar: "ساحل العاج" },
    industry: { fr: "Banque & Fintech", en: "Banking & Fintech", ar: "البنوك والتقنية المالية" },
    services: ["developpement-web-mobile", "cybersecurite", "cloud-computing"],
    title: {
      fr: "Application bancaire mobile panafricaine",
      en: "Pan-African mobile banking application",
      ar: "تطبيق بنكي جوال عابر لأفريقيا"
    },
    summary: {
      fr: "Conception et développement d'une application bancaire mobile déployée dans 6 pays, avec authentification biométrique et paiements instantanés.",
      en: "Design and development of a mobile banking application deployed in 6 countries, with biometric authentication and instant payments.",
      ar: "تصميم وتطوير تطبيق بنكي جوال تم نشره في 6 دول، مع مصادقة بيومترية ومدفوعات فورية."
    },
    challenge: {
      fr: "Offrir une expérience bancaire mobile unifiée et sécurisée dans plusieurs pays aux contraintes réglementaires différentes, tout en garantissant une disponibilité 24/7.",
      en: "Deliver a unified, secure mobile banking experience across several countries with different regulatory constraints, while guaranteeing 24/7 availability.",
      ar: "تقديم تجربة بنكية جوالة موحدة وآمنة عبر عدة دول ذات قيود تنظيمية مختلفة، مع ضمان توفر مستمر."
    },
    solution: {
      fr: "Architecture cloud multi-région, authentification biométrique, moteur de paiement instantané et conformité aux normes bancaires locales, livrés en méthodologie agile avec des cycles de release courts.",
      en: "Multi-region cloud architecture, biometric authentication, instant payment engine and compliance with local banking standards, delivered using agile methodology with short release cycles.",
      ar: "بنية سحابية متعددة المناطق، مصادقة بيومترية، محرك دفع فوري وامتثال للمعايير المصرفية المحلية، ضمن منهجية رشيقة ودورات إصدار قصيرة."
    },
    results: {
      fr: ["+420 000 téléchargements en 12 mois", "Temps de disponibilité de 99.95%", "Réduction de 60% du temps d'onboarding client"],
      en: ["+420,000 downloads in 12 months", "99.95% uptime", "60% reduction in customer onboarding time"],
      ar: ["أكثر من 420,000 تنزيل خلال 12 شهرًا", "نسبة توفر 99.95٪", "خفض وقت تسجيل العملاء بنسبة 60٪"]
    },
    stats: [
      { value: "420K+", label: { fr: "téléchargements", en: "downloads", ar: "تنزيل" } },
      { value: "6", label: { fr: "pays déployés", en: "countries live", ar: "دول" } },
      { value: "99.95%", label: { fr: "disponibilité", en: "uptime", ar: "نسبة التوفر" } }
    ],
    color: "#1436A8"
  },
  {
    slug: "marketplace-ecommerce-regionale",
    client: "SoukPlus",
    year: "2023",
    country: { fr: "Maroc", en: "Morocco", ar: "المغرب" },
    industry: { fr: "E-commerce & Retail", en: "E-commerce & Retail", ar: "التجارة الإلكترونية والتجزئة" },
    services: ["developpement-web-mobile", "data-analytics", "marketing-digital"],
    title: {
      fr: "Marketplace e-commerce multi-vendeurs",
      en: "Multi-vendor e-commerce marketplace",
      ar: "منصة تجارة إلكترونية متعددة البائعين"
    },
    summary: {
      fr: "Développement d'une marketplace multi-vendeurs avec paiement en ligne, logistique intégrée et tableau de bord analytique pour plus de 800 vendeurs.",
      en: "Development of a multi-vendor marketplace with online payment, integrated logistics and analytics dashboard for over 800 sellers.",
      ar: "تطوير منصة تجارة إلكترونية متعددة البائعين بدفع إلكتروني ولوجستيات مدمجة ولوحة تحليلات لأكثر من 800 بائع."
    },
    challenge: {
      fr: "Concevoir une plateforme capable d'absorber des pics de trafic saisonniers tout en simplifiant la gestion des stocks pour des centaines de petits vendeurs.",
      en: "Design a platform able to absorb seasonal traffic spikes while simplifying inventory management for hundreds of small sellers.",
      ar: "تصميم منصة قادرة على استيعاب ذروات الزيارات الموسمية مع تبسيط إدارة المخزون لمئات البائعين الصغار."
    },
    solution: {
      fr: "Architecture headless scalable, intégration de multiples passerelles de paiement locales et internationales, et outils de gestion de catalogue simplifiés pour les vendeurs.",
      en: "Scalable headless architecture, integration of multiple local and international payment gateways, and simplified catalog management tools for sellers.",
      ar: "بنية headless قابلة للتوسع، دمج بوابات دفع محلية ودولية متعددة، وأدوات إدارة كتالوج مبسطة للبائعين."
    },
    results: {
      fr: ["+800 vendeurs actifs en 8 mois", "Chiffre d'affaires x3.5 sur la plateforme", "Taux de conversion en hausse de 38%"],
      en: ["+800 active sellers in 8 months", "3.5x revenue on the platform", "38% increase in conversion rate"],
      ar: ["أكثر من 800 بائع نشط خلال 8 أشهر", "إيرادات المنصة تضاعفت 3.5 مرة", "ارتفاع معدل التحويل بنسبة 38٪"]
    },
    stats: [
      { value: "800+", label: { fr: "vendeurs actifs", en: "active sellers", ar: "بائع نشط" } },
      { value: "x3.5", label: { fr: "croissance CA", en: "revenue growth", ar: "نمو الإيرادات" } },
      { value: "+38%", label: { fr: "conversion", en: "conversion", ar: "معدل التحويل" } }
    ],
    color: "#38BDF8"
  },
  {
    slug: "plateforme-sante-connectee",
    client: "MediLink Health",
    year: "2024",
    country: { fr: "Sénégal", en: "Senegal", ar: "السنغال" },
    industry: { fr: "Santé", en: "Healthcare", ar: "الصحة" },
    services: ["developpement-logiciel-sur-mesure", "cybersecurite", "intelligence-artificielle"],
    title: {
      fr: "Plateforme de télémédecine et dossier patient",
      en: "Telemedicine platform and patient records",
      ar: "منصة الطب عن بُعد وملفات المرضى"
    },
    summary: {
      fr: "Plateforme de téléconsultation et de dossier médical partagé connectant plus de 150 établissements de santé.",
      en: "Teleconsultation platform and shared medical record connecting over 150 healthcare facilities.",
      ar: "منصة استشارات عن بُعد وملف طبي مشترك تربط أكثر من 150 مؤسسة صحية."
    },
    challenge: {
      fr: "Garantir la confidentialité stricte des données de santé tout en rendant les téléconsultations accessibles en zones rurales à faible connectivité.",
      en: "Guarantee strict confidentiality of health data while making teleconsultations accessible in low-connectivity rural areas.",
      ar: "ضمان سرية صارمة للبيانات الصحية مع إتاحة الاستشارات عن بُعد في المناطق الريفية ذات الاتصال الضعيف."
    },
    solution: {
      fr: "Chiffrement de bout en bout, mode dégradé hors ligne, triage assisté par IA et hébergement conforme aux normes de santé internationales.",
      en: "End-to-end encryption, offline degraded mode, AI-assisted triage and hosting compliant with international health standards.",
      ar: "تشفير من طرف إلى طرف، وضع عمل دون اتصال، فرز مدعوم بالذكاء الاصطناعي واستضافة متوافقة مع المعايير الصحية الدولية."
    },
    results: {
      fr: ["150+ établissements connectés", "90 000 téléconsultations la première année", "Temps d'attente moyen réduit de 45%"],
      en: ["150+ connected facilities", "90,000 teleconsultations in year one", "45% reduction in average wait time"],
      ar: ["أكثر من 150 مؤسسة متصلة", "90,000 استشارة عن بُعد في السنة الأولى", "خفض متوسط وقت الانتظار بنسبة 45٪"]
    },
    stats: [
      { value: "150+", label: { fr: "établissements", en: "facilities", ar: "مؤسسة" } },
      { value: "90K", label: { fr: "téléconsultations", en: "teleconsultations", ar: "استشارة" } },
      { value: "-45%", label: { fr: "temps d'attente", en: "wait time", ar: "وقت الانتظار" } }
    ],
    color: "#1D4ED8"
  },
  {
    slug: "gestion-flotte-intelligente",
    client: "VIT AUTO × TransLog",
    year: "2023",
    country: { fr: "Côte d'Ivoire", en: "Côte d'Ivoire", ar: "ساحل العاج" },
    industry: { fr: "Transport & Logistique", en: "Transport & Logistics", ar: "النقل واللوجستيات" },
    services: ["intelligence-artificielle", "data-analytics", "infrastructures-it"],
    title: {
      fr: "Plateforme de gestion de flotte intelligente",
      en: "Smart fleet management platform",
      ar: "منصة إدارة أسطول ذكية"
    },
    summary: {
      fr: "Solution de géolocalisation et de maintenance prédictive pour une flotte de plus de 1 200 véhicules commerciaux.",
      en: "Geolocation and predictive maintenance solution for a fleet of over 1,200 commercial vehicles.",
      ar: "حل لتحديد المواقع والصيانة التنبؤية لأسطول يضم أكثر من 1,200 مركبة تجارية."
    },
    challenge: {
      fr: "Réduire les coûts de maintenance imprévue et améliorer la sécurité des chauffeurs sur un parc de véhicules dispersé sur tout le territoire.",
      en: "Reduce unplanned maintenance costs and improve driver safety across a fleet spread nationwide.",
      ar: "خفض تكاليف الصيانة غير المخططة وتحسين سلامة السائقين لأسطول موزع على مستوى البلاد."
    },
    solution: {
      fr: "Boîtiers IoT connectés, modèle prédictif de maintenance, scoring de conduite et tableau de bord centralisé pour les gestionnaires de flotte.",
      en: "Connected IoT devices, predictive maintenance model, driving score and centralized dashboard for fleet managers.",
      ar: "أجهزة إنترنت الأشياء متصلة، نموذج صيانة تنبؤي، تقييم للقيادة ولوحة تحكم مركزية لمديري الأسطول."
    },
    results: {
      fr: ["Réduction de 32% des coûts de maintenance", "Baisse de 27% des incidents de conduite", "ROI atteint en 9 mois"],
      en: ["32% reduction in maintenance costs", "27% drop in driving incidents", "ROI achieved in 9 months"],
      ar: ["خفض تكاليف الصيانة بنسبة 32٪", "انخفاض حوادث القيادة بنسبة 27٪", "تحقيق العائد على الاستثمار خلال 9 أشهر"]
    },
    stats: [
      { value: "1 200+", label: { fr: "véhicules connectés", en: "connected vehicles", ar: "مركبة متصلة" } },
      { value: "-32%", label: { fr: "coûts maintenance", en: "maintenance costs", ar: "تكاليف الصيانة" } },
      { value: "9 mois", label: { fr: "ROI", en: "ROI", ar: "العائد" } }
    ],
    color: "#6B7789"
  },
  {
    slug: "portail-services-publics",
    client: "Ministère du Numérique (client institutionnel)",
    year: "2022",
    country: { fr: "Côte d'Ivoire", en: "Côte d'Ivoire", ar: "ساحل العاج" },
    industry: { fr: "Secteur public", en: "Public sector", ar: "القطاع العام" },
    services: ["developpement-web-mobile", "cybersecurite", "conseil"],
    title: {
      fr: "Portail unifié de services publics numériques",
      en: "Unified digital public services portal",
      ar: "بوابة موحدة للخدمات الحكومية الرقمية"
    },
    summary: {
      fr: "Portail centralisant plus de 40 démarches administratives en ligne, avec identité numérique sécurisée pour les citoyens.",
      en: "Portal centralizing over 40 online administrative procedures, with secure digital identity for citizens.",
      ar: "بوابة تجمع أكثر من 40 إجراءً إداريًا إلكترونيًا، مع هوية رقمية آمنة للمواطنين."
    },
    challenge: {
      fr: "Unifier des dizaines de services administratifs historiquement cloisonnés dans une expérience citoyenne simple, accessible et sécurisée.",
      en: "Unify dozens of historically siloed administrative services into a simple, accessible and secure citizen experience.",
      ar: "توحيد عشرات الخدمات الإدارية المنعزلة تاريخيًا في تجربة مواطن بسيطة وميسّرة وآمنة."
    },
    solution: {
      fr: "Architecture API unifiée, identité numérique certifiée, design accessible (WCAG) et hébergement souverain avec audit de sécurité indépendant.",
      en: "Unified API architecture, certified digital identity, accessible design (WCAG) and sovereign hosting with independent security audit.",
      ar: "بنية واجهات برمجية موحدة، هوية رقمية معتمدة، تصميم ميسّر (WCAG) واستضافة سيادية مع تدقيق أمني مستقل."
    },
    results: {
      fr: ["40+ démarches dématérialisées", "1,2 million de citoyens inscrits", "Temps de traitement moyen divisé par 4"],
      en: ["40+ digitized procedures", "1.2 million registered citizens", "Average processing time cut by 4x"],
      ar: ["أكثر من 40 إجراءً رقميًا", "1.2 مليون مواطن مسجل", "خفض متوسط وقت المعالجة 4 مرات"]
    },
    stats: [
      { value: "40+", label: { fr: "démarches en ligne", en: "online procedures", ar: "إجراء إلكتروني" } },
      { value: "1.2M", label: { fr: "citoyens inscrits", en: "registered citizens", ar: "مواطن مسجل" } },
      { value: "x4", label: { fr: "rapidité", en: "faster", ar: "أسرع" } }
    ],
    color: "#1436A8"
  },
  {
    slug: "assistant-ia-retail",
    client: "GroupeShop International",
    year: "2024",
    country: { fr: "France", en: "France", ar: "فرنسا" },
    industry: { fr: "Retail & Distribution", en: "Retail & Distribution", ar: "التجزئة والتوزيع" },
    services: ["intelligence-artificielle", "ui-ux-design", "marketing-digital"],
    title: {
      fr: "Assistant IA conversationnel pour le service client",
      en: "Conversational AI assistant for customer service",
      ar: "مساعد ذكاء اصطناعي محادثي لخدمة العملاء"
    },
    summary: {
      fr: "Déploiement d'un assistant IA multicanal (web, WhatsApp, mobile) traitant plus de 70% des demandes clients sans intervention humaine.",
      en: "Deployment of a multichannel AI assistant (web, WhatsApp, mobile) handling over 70% of customer requests without human intervention.",
      ar: "نشر مساعد ذكاء اصطناعي متعدد القنوات (ويب، واتساب، جوال) يعالج أكثر من 70٪ من طلبات العملاء دون تدخل بشري."
    },
    challenge: {
      fr: "Absorber une croissance rapide des volumes de support client sans dégrader la qualité de service ni exploser les coûts.",
      en: "Absorb rapid growth in customer support volumes without degrading service quality or exploding costs.",
      ar: "استيعاب نمو سريع في حجم طلبات دعم العملاء دون التأثير على جودة الخدمة أو تضخم التكاليف."
    },
    solution: {
      fr: "Assistant IA entraîné sur la base de connaissance client, transfert fluide vers un conseiller humain pour les cas complexes, et amélioration continue par apprentissage des interactions.",
      en: "AI assistant trained on the client's knowledge base, smooth handoff to a human advisor for complex cases, and continuous improvement through interaction learning.",
      ar: "مساعد ذكاء اصطناعي مدرب على قاعدة معرفة العميل، وتحويل سلس إلى مستشار بشري للحالات المعقدة، وتحسين مستمر من خلال التعلم من التفاعلات."
    },
    results: {
      fr: ["70% des demandes résolues automatiquement", "Temps de réponse moyen sous 8 secondes", "Satisfaction client en hausse de 24%"],
      en: ["70% of requests resolved automatically", "Average response time under 8 seconds", "Customer satisfaction up 24%"],
      ar: ["حل 70٪ من الطلبات تلقائيًا", "متوسط وقت الاستجابة أقل من 8 ثوانٍ", "ارتفاع رضا العملاء بنسبة 24٪"]
    },
    stats: [
      { value: "70%", label: { fr: "résolution auto", en: "auto-resolved", ar: "حل تلقائي" } },
      { value: "<8s", label: { fr: "temps de réponse", en: "response time", ar: "وقت الاستجابة" } },
      { value: "+24%", label: { fr: "satisfaction", en: "satisfaction", ar: "الرضا" } }
    ],
    color: "#38BDF8"
  }
];

export function getRealisationBySlug(slug: string) {
  return realisations.find((item) => item.slug === slug);
}
