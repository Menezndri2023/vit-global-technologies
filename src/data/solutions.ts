import type { Localized } from "./types";

export interface Solution {
  slug: string;
  icon: string;
  title: Localized<string>;
  summary: Localized<string>;
  features: Localized<string[]>;
}

export const solutions: Solution[] = [
  {
    slug: "gestion-commerciale",
    icon: "ShoppingCart",
    title: { fr: "Gestion commerciale", en: "Sales & Commerce Management", ar: "إدارة تجارية" },
    summary: {
      fr: "Facturation, stocks, achats et ventes centralisés dans un outil unique et intuitif.",
      en: "Invoicing, inventory, purchasing and sales centralized in a single intuitive tool.",
      ar: "الفوترة والمخزون والمشتريات والمبيعات في أداة واحدة مركزية وبديهية."
    },
    features: {
      fr: ["Facturation & devis", "Gestion des stocks", "Suivi des ventes", "Reporting commercial"],
      en: ["Invoicing & quotes", "Inventory management", "Sales tracking", "Sales reporting"],
      ar: ["الفوترة وعروض الأسعار", "إدارة المخزون", "متابعة المبيعات", "تقارير تجارية"]
    }
  },
  {
    slug: "gestion-immobiliere",
    icon: "Building2",
    title: { fr: "Gestion immobilière", en: "Real Estate Management", ar: "إدارة عقارية" },
    summary: {
      fr: "Pilotez biens, locataires, baux et paiements sur une plateforme unique.",
      en: "Manage properties, tenants, leases and payments on a single platform.",
      ar: "أدر العقارات والمستأجرين والعقود والمدفوعات عبر منصة واحدة."
    },
    features: {
      fr: ["Suivi des biens & baux", "Gestion locataires", "Encaissement des loyers", "Alertes échéances"],
      en: ["Property & lease tracking", "Tenant management", "Rent collection", "Deadline alerts"],
      ar: ["متابعة العقارات والعقود", "إدارة المستأجرين", "تحصيل الإيجارات", "تنبيهات المواعيد"]
    }
  },
  {
    slug: "gestion-scolaire",
    icon: "GraduationCap",
    title: { fr: "Gestion scolaire", en: "School Management", ar: "إدارة مدرسية" },
    summary: {
      fr: "Inscriptions, notes, emplois du temps et communication parents-école simplifiés.",
      en: "Enrollment, grades, schedules and parent-school communication simplified.",
      ar: "تبسيط التسجيل والدرجات والجداول والتواصل بين المدرسة وأولياء الأمور."
    },
    features: {
      fr: ["Inscriptions en ligne", "Bulletins & notes", "Emplois du temps", "Portail parents"],
      en: ["Online enrollment", "Report cards & grades", "Timetables", "Parent portal"],
      ar: ["تسجيل إلكتروني", "كشوف الدرجات", "الجداول الزمنية", "بوابة أولياء الأمور"]
    }
  },
  {
    slug: "gestion-hospitaliere",
    icon: "HeartPulse",
    title: { fr: "Gestion hospitalière", en: "Hospital Management", ar: "إدارة استشفائية" },
    summary: {
      fr: "Dossiers patients, rendez-vous et facturation médicale sur une plateforme sécurisée.",
      en: "Patient records, appointments and medical billing on a secure platform.",
      ar: "ملفات المرضى والمواعيد والفوترة الطبية على منصة آمنة."
    },
    features: {
      fr: ["Dossier patient électronique", "Prise de rendez-vous", "Facturation médicale", "Gestion des stocks pharmacie"],
      en: ["Electronic patient records", "Appointment scheduling", "Medical billing", "Pharmacy inventory"],
      ar: ["ملف طبي إلكتروني", "حجز المواعيد", "الفوترة الطبية", "إدارة مخزون الصيدلية"]
    }
  },
  {
    slug: "gestion-transport",
    icon: "Truck",
    title: { fr: "Gestion transport & logistique", en: "Transport & Logistics Management", ar: "إدارة النقل واللوجستيات" },
    summary: {
      fr: "Planification des tournées, suivi des livraisons et optimisation des flottes.",
      en: "Route planning, delivery tracking and fleet optimization.",
      ar: "تخطيط الجولات وتتبع التوصيل وتحسين الأسطول."
    },
    features: {
      fr: ["Planification des tournées", "Suivi des livraisons en temps réel", "Gestion de flotte", "Optimisation des coûts"],
      en: ["Route planning", "Real-time delivery tracking", "Fleet management", "Cost optimization"],
      ar: ["تخطيط الجولات", "تتبع التوصيل لحظيًا", "إدارة الأسطول", "تحسين التكاليف"]
    }
  },
  {
    slug: "marketplace",
    icon: "Store",
    title: { fr: "Marketplace multi-vendeurs", en: "Multi-vendor Marketplace", ar: "سوق إلكتروني متعدد البائعين" },
    summary: {
      fr: "Lancez votre place de marché avec paiement, logistique et gestion vendeurs intégrés.",
      en: "Launch your marketplace with integrated payment, logistics and vendor management.",
      ar: "أطلق سوقك الإلكتروني مع دفع ولوجستيات وإدارة بائعين مدمجة."
    },
    features: {
      fr: ["Espace vendeurs", "Paiement sécurisé", "Gestion des commandes", "Commission automatisée"],
      en: ["Vendor space", "Secure payment", "Order management", "Automated commission"],
      ar: ["فضاء للبائعين", "دفع آمن", "إدارة الطلبات", "عمولة آلية"]
    }
  },
  {
    slug: "plateforme-rh",
    icon: "Users",
    title: { fr: "Plateforme RH", en: "HR Platform", ar: "منصة الموارد البشرية" },
    summary: {
      fr: "Recrutement, paie, congés et évaluation des collaborateurs en un seul endroit.",
      en: "Recruitment, payroll, leave and employee evaluation in one place.",
      ar: "التوظيف والرواتب والإجازات وتقييم الموظفين في مكان واحد."
    },
    features: {
      fr: ["Gestion des recrutements", "Paie automatisée", "Suivi des congés", "Évaluation de performance"],
      en: ["Recruitment management", "Automated payroll", "Leave tracking", "Performance evaluation"],
      ar: ["إدارة التوظيف", "رواتب آلية", "متابعة الإجازات", "تقييم الأداء"]
    }
  },
  {
    slug: "erp",
    icon: "Layers",
    title: { fr: "ERP sur mesure", en: "Custom ERP", ar: "نظام تخطيط موارد مخصص" },
    summary: {
      fr: "Unifiez finance, achats, production et RH dans un seul système intégré.",
      en: "Unify finance, procurement, production and HR in a single integrated system.",
      ar: "وحّد المالية والمشتريات والإنتاج والموارد البشرية في نظام متكامل واحد."
    },
    features: {
      fr: ["Modules finance & comptabilité", "Gestion de production", "Achats & fournisseurs", "Reporting consolidé"],
      en: ["Finance & accounting modules", "Production management", "Purchasing & suppliers", "Consolidated reporting"],
      ar: ["وحدات المالية والمحاسبة", "إدارة الإنتاج", "المشتريات والموردين", "تقارير موحدة"]
    }
  },
  {
    slug: "crm",
    icon: "Contact",
    title: { fr: "CRM sur mesure", en: "Custom CRM", ar: "نظام إدارة علاقات العملاء المخصص" },
    summary: {
      fr: "Centralisez prospects, clients et opportunités pour booster vos ventes.",
      en: "Centralize leads, customers and opportunities to boost your sales.",
      ar: "مركز العملاء المحتملين والحاليين والفرص لتعزيز مبيعاتك."
    },
    features: {
      fr: ["Suivi des prospects", "Pipeline commercial", "Historique client", "Automatisation des relances"],
      en: ["Lead tracking", "Sales pipeline", "Customer history", "Follow-up automation"],
      ar: ["متابعة العملاء المحتملين", "مسار المبيعات", "سجل العملاء", "أتمتة المتابعة"]
    }
  },
  {
    slug: "pos",
    icon: "CreditCard",
    title: { fr: "Point de vente (POS)", en: "Point of Sale (POS)", ar: "نقطة بيع" },
    summary: {
      fr: "Une caisse moderne connectée à vos stocks et à votre comptabilité en temps réel.",
      en: "A modern checkout connected to your inventory and accounting in real time.",
      ar: "نقطة بيع حديثة متصلة بمخزونك ومحاسبتك في الوقت الفعلي."
    },
    features: {
      fr: ["Caisse tactile", "Synchronisation stocks", "Multi-magasins", "Rapports de vente quotidiens"],
      en: ["Touch checkout", "Inventory sync", "Multi-store support", "Daily sales reports"],
      ar: ["نقطة بيع باللمس", "مزامنة المخزون", "دعم متعدد المتاجر", "تقارير مبيعات يومية"]
    }
  }
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
