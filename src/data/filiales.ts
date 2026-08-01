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
    slug: "vit-digital",
    icon: "MonitorSmartphone",
    name: "VIT DIGITAL",
    sector: {
      fr: "Développement informatique",
      en: "Software development",
      ar: "التطوير المعلوماتي"
    },
    tagline: {
      fr: "Le pôle qui conçoit et développe vos plateformes web sur mesure.",
      en: "The unit that designs and builds your custom web platforms.",
      ar: "القطب الذي يصمم ويطور منصاتكم الرقمية المخصصة."
    },
    description: {
      fr: "VIT DIGITAL est le pôle historique du groupe dédié au développement informatique : sites vitrines, sites e-commerce, plateformes SaaS, marketplaces, CRM, ERP, applications métier, API et portails clients, avec un engagement de maintenance dans la durée.",
      en: "VIT DIGITAL is the group's founding software development unit: showcase websites, e-commerce sites, SaaS platforms, marketplaces, CRM, ERP, business applications, APIs and client portals, backed by long-term maintenance.",
      ar: "VIT DIGITAL هو القطب التأسيسي للمجموعة المتخصص في التطوير المعلوماتي: مواقع تعريفية، متاجر إلكترونية، منصات SaaS، أسواق إلكترونية، أنظمة CRM وERP، تطبيقات أعمال، واجهات برمجية وبوابات عملاء، مع التزام بالصيانة على المدى الطويل."
    },
    offerings: {
      fr: ["Sites vitrines & e-commerce", "Plateformes SaaS & marketplaces", "CRM, ERP & applications métier", "API, portails clients & maintenance"],
      en: ["Showcase & e-commerce sites", "SaaS platforms & marketplaces", "CRM, ERP & business applications", "APIs, client portals & maintenance"],
      ar: ["مواقع تعريفية ومتاجر إلكترونية", "منصات SaaS وأسواق إلكترونية", "أنظمة CRM وERP وتطبيقات أعمال", "واجهات برمجية وبوابات عملاء وصيانة"]
    },
    founded: "2020",
    color: "#38BDF8"
  },
  {
    slug: "vit-mobile",
    icon: "Smartphone",
    name: "VIT MOBILE",
    sector: {
      fr: "Développement mobile",
      en: "Mobile development",
      ar: "تطوير التطبيقات الجوالة"
    },
    tagline: {
      fr: "Des applications mobiles natives et cross-platform pour vos usages terrain.",
      en: "Native and cross-platform mobile applications for your field operations.",
      ar: "تطبيقات جوالة أصلية ومتعددة المنصات لاستخداماتكم الميدانية."
    },
    description: {
      fr: "VIT MOBILE conçoit et développe des applications Android, iPhone, ainsi qu'en Flutter, React Native et Progressive Web Apps, avec un suivi de maintenance et de publication sur les stores pour garantir la performance dans la durée.",
      en: "VIT MOBILE designs and builds Android and iPhone applications, as well as Flutter, React Native and Progressive Web Apps, with ongoing maintenance and store publishing to keep performance high over time.",
      ar: "تصمم VIT MOBILE وتطور تطبيقات Android وiPhone، إضافة إلى Flutter وReact Native وتطبيقات الويب التقدمية، مع متابعة الصيانة والنشر على المتاجر لضمان الأداء على المدى الطويل."
    },
    offerings: {
      fr: ["Applications natives Android & iOS", "Développement Flutter & React Native", "Progressive Web Apps (PWA)", "Publication, suivi & maintenance"],
      en: ["Native Android & iOS apps", "Flutter & React Native development", "Progressive Web Apps (PWA)", "Store publishing, monitoring & maintenance"],
      ar: ["تطبيقات أصلية لـ Android وiOS", "تطوير باستخدام Flutter وReact Native", "تطبيقات ويب تقدمية (PWA)", "النشر والمتابعة والصيانة"]
    },
    founded: "2022",
    color: "#22C55E"
  },
  {
    slug: "vit-ai",
    icon: "BrainCircuit",
    name: "VIT AI",
    sector: {
      fr: "Intelligence artificielle",
      en: "Artificial intelligence",
      ar: "الذكاء الاصطناعي"
    },
    tagline: {
      fr: "L'intelligence artificielle appliquée au service de vos performances.",
      en: "Applied artificial intelligence at the service of your performance.",
      ar: "الذكاء الاصطناعي التطبيقي في خدمة أدائكم."
    },
    description: {
      fr: "VIT AI développe des chatbots IA, des agents IA autonomes, des solutions d'automatisation, de l'OCR, de l'IA générative, de la vision par ordinateur et des assistants virtuels, pour transformer vos données en décisions et vos process en gains de temps.",
      en: "VIT AI builds AI chatbots, autonomous AI agents, automation solutions, OCR, generative AI, computer vision and virtual assistants, turning your data into decisions and your processes into time savings.",
      ar: "تطور VIT AI روبوتات محادثة ذكية ووكلاء ذكاء اصطناعي مستقلين وحلول أتمتة والتعرف الضوئي على الحروف والذكاء الاصطناعي التوليدي والرؤية الحاسوبية والمساعدين الافتراضيين، لتحويل بياناتكم إلى قرارات وعملياتكم إلى مكاسب في الوقت."
    },
    offerings: {
      fr: ["Chatbots & agents IA", "Automatisation intelligente & OCR", "IA générative & vision par ordinateur", "Analyse de données & assistants virtuels"],
      en: ["AI chatbots & agents", "Intelligent automation & OCR", "Generative AI & computer vision", "Data analysis & virtual assistants"],
      ar: ["روبوتات محادثة ووكلاء ذكاء اصطناعي", "أتمتة ذكية والتعرف الضوئي على الحروف", "الذكاء الاصطناعي التوليدي والرؤية الحاسوبية", "تحليل البيانات والمساعدون الافتراضيون"]
    },
    founded: "2023",
    color: "#A855F7"
  },
  {
    slug: "vit-cloud",
    icon: "Cloud",
    name: "VIT CLOUD",
    sector: {
      fr: "Infrastructure & cloud",
      en: "Infrastructure & cloud",
      ar: "البنية التحتية والحوسبة السحابية"
    },
    tagline: {
      fr: "Une infrastructure fiable, sécurisée et supervisée en continu.",
      en: "Reliable, secure infrastructure, monitored around the clock.",
      ar: "بنية تحتية موثوقة وآمنة مع مراقبة مستمرة."
    },
    description: {
      fr: "VIT CLOUD prend en charge l'hébergement, le déploiement, le DevOps, la conteneurisation (Docker, Kubernetes) et les infrastructures AWS, Azure et Google Cloud, avec monitoring et sauvegardes pour garantir la continuité de vos services.",
      en: "VIT CLOUD handles hosting, deployment, DevOps, containerization (Docker, Kubernetes) and AWS, Azure and Google Cloud infrastructure, with monitoring and backups to guarantee service continuity.",
      ar: "تتولى VIT CLOUD الاستضافة والنشر وDevOps والحوسبة الحاوية (Docker وKubernetes) والبنية التحتية على AWS وAzure وGoogle Cloud، مع المراقبة والنسخ الاحتياطي لضمان استمرارية خدماتكم."
    },
    offerings: {
      fr: ["Hébergement & déploiement", "DevOps, Docker & Kubernetes", "AWS, Azure & Google Cloud", "Monitoring & sauvegardes"],
      en: ["Hosting & deployment", "DevOps, Docker & Kubernetes", "AWS, Azure & Google Cloud", "Monitoring & backups"],
      ar: ["الاستضافة والنشر", "DevOps وDocker وKubernetes", "AWS وAzure وGoogle Cloud", "المراقبة والنسخ الاحتياطي"]
    },
    founded: "2023",
    color: "#0D9488"
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
      fr: "L'expertise stratégique du groupe pour sécuriser vos décisions.",
      en: "The group's strategic expertise to secure your decisions.",
      ar: "الخبرة الاستراتيجية للمجموعة لضمان قراراتكم."
    },
    description: {
      fr: "VIT CONSULTING accompagne dirigeants, institutions et startups dans l'audit informatique, la transformation digitale, l'architecture logicielle, la gestion de projet, la cybersécurité et l'accompagnement des jeunes pousses à l'échelle internationale.",
      en: "VIT CONSULTING supports executives, institutions and startups in IT audits, digital transformation, software architecture, project management, cybersecurity and startup mentoring on an international scale.",
      ar: "ترافق VIT CONSULTING القيادات والمؤسسات والشركات الناشئة في التدقيق المعلوماتي والتحول الرقمي وبنية البرمجيات وإدارة المشاريع والأمن السيبراني ومرافقة الشركات الناشئة على المستوى الدولي."
    },
    offerings: {
      fr: ["Audit informatique & transformation digitale", "Architecture logicielle & gestion de projet", "Cybersécurité & conformité", "Accompagnement startup"],
      en: ["IT audit & digital transformation", "Software architecture & project management", "Cybersecurity & compliance", "Startup mentoring"],
      ar: ["التدقيق المعلوماتي والتحول الرقمي", "بنية البرمجيات وإدارة المشاريع", "الأمن السيبراني والامتثال", "مرافقة الشركات الناشئة"]
    },
    founded: "2021",
    color: "#1436A8"
  },
  {
    slug: "vit-auto",
    icon: "Car",
    name: "VIT AUTO",
    sector: {
      fr: "Marketplace automobile",
      en: "Automotive marketplace",
      ar: "سوق السيارات"
    },
    tagline: {
      fr: "La mobilité intelligente au service des particuliers et des flottes.",
      en: "Smart mobility for individuals and fleets alike.",
      ar: "التنقل الذكي في خدمة الأفراد والأساطيل."
    },
    description: {
      fr: "VIT AUTO est la filiale du groupe dédiée à la marketplace automobile : vente et location de véhicules, chauffeurs, import-export, gestion de flotte et services B2B pour concessionnaires, loueurs et entreprises.",
      en: "VIT AUTO is the group's subsidiary dedicated to the automotive marketplace: vehicle sales and rentals, chauffeur services, import-export, fleet management and B2B services for dealerships, rental companies and businesses.",
      ar: "VIT AUTO هي الفرع المتخصص في سوق السيارات ضمن المجموعة: بيع وتأجير المركبات، خدمات السائقين، الاستيراد والتصدير، إدارة الأساطيل وخدمات B2B للوكلاء ومؤجري السيارات والشركات."
    },
    offerings: {
      fr: ["Vente & location de véhicules", "Chauffeurs & services B2B", "Import & export", "Gestion de flotte"],
      en: ["Vehicle sales & rentals", "Chauffeur & B2B services", "Import & export", "Fleet management"],
      ar: ["بيع وتأجير المركبات", "خدمات السائقين وB2B", "الاستيراد والتصدير", "إدارة الأسطول"]
    },
    founded: "2022",
    color: "#1D4ED8"
  }
];

export function getFilialeBySlug(slug: string) {
  return filiales.find((filiale) => filiale.slug === slug);
}
