import type { Localized } from "./types";

export interface Realisation {
  slug: string;
  client: string;
  year: string;
  country: Localized<string>;
  industry: Localized<string>;
  portfolioType: Localized<string>;
  services: string[];
  title: Localized<string>;
  summary: Localized<string>;
  challenge: Localized<string>;
  solution: Localized<string>;
  results: Localized<string[]>;
  stats: { value: string; label: Localized<string> }[];
  color: string;
  /** Capture d'écran réelle du projet (dans /public) */
  image?: string;
  /** Adresse du projet en ligne */
  website?: string;
}

export const realisations: Realisation[] = [
  {
    slug: "vit-auto-plateforme-automobile",
    client: "VIT AUTO",
    year: "2026",
    country: { fr: "Maroc", en: "Morocco", ar: "المغرب" },
    industry: { fr: "Automobile & Mobilité", en: "Automotive & Mobility", ar: "السيارات والتنقل" },
    portfolioType: { fr: "Marketplace", en: "Marketplace", ar: "سوق إلكتروني" },
    services: ["developpement-web", "ui-ux-design", "cloud-computing"],
    title: {
      fr: "VIT AUTO, la plateforme automobile du Maroc",
      en: "VIT AUTO, Morocco's automotive platform",
      ar: "VIT AUTO، منصة السيارات في المغرب"
    },
    summary: {
      fr: "Plateforme de location, vente, chauffeur privé et import de véhicules qui réunit loueurs, vendeurs et acheteurs partout au Maroc.",
      en: "A platform for vehicle rental, sales, private drivers and imports that brings together rental agencies, sellers and buyers across Morocco.",
      ar: "منصة لتأجير وبيع السيارات وخدمة السائق الخاص والاستيراد، تجمع وكالات التأجير والبائعين والمشترين في جميع أنحاء المغرب."
    },
    challenge: {
      fr: "Rassembler sur un seul service des besoins aujourd'hui éclatés (location, achat, chauffeur, import depuis la Chine, Dubaï ou l'Europe) tout en inspirant confiance aux particuliers comme aux professionnels.",
      en: "Bring needs that are usually scattered (rental, purchase, private driver, imports from China, Dubai or Europe) into a single service, while earning the trust of both individuals and professionals.",
      ar: "جمع احتياجات متفرقة عادةً (التأجير، الشراء، السائق الخاص، الاستيراد من الصين أو دبي أو أوروبا) في خدمة واحدة، مع كسب ثقة الأفراد والمهنيين على حد سواء."
    },
    solution: {
      fr: "Catalogue multi-vendeurs avec recherche par ville, état et modèle, identité des partenaires vérifiée, contrat digital, paiement sécurisé, livraison suivie par GPS et parcours d'import accompagné.",
      en: "Multi-vendor catalogue with search by city, condition and model, verified partner identities, digital contracts, secure payment, GPS-tracked delivery and an assisted import journey.",
      ar: "كتالوج متعدد البائعين مع بحث حسب المدينة والحالة والطراز، والتحقق من هوية الشركاء، وعقد رقمي، ودفع آمن، وتوصيل متتبَّع عبر GPS، ومسار استيراد مرافَق."
    },
    results: {
      fr: ["Plus de 600 véhicules disponibles en ligne", "Import accompagné depuis la Chine, Dubaï et l'Europe", "Location, vente, chauffeur et loisirs réunis sur une seule plateforme"],
      en: ["Over 600 vehicles available online", "Assisted imports from China, Dubai and Europe", "Rental, sales, drivers and leisure activities on a single platform"],
      ar: ["أكثر من 600 مركبة متاحة عبر الإنترنت", "استيراد مرافَق من الصين ودبي وأوروبا", "التأجير والبيع والسائق والأنشطة الترفيهية في منصة واحدة"]
    },
    stats: [
      { value: "600+", label: { fr: "véhicules en ligne", en: "vehicles online", ar: "مركبة متاحة" } },
      { value: "5", label: { fr: "services réunis", en: "services in one", ar: "خدمات مجتمعة" } },
      { value: "3", label: { fr: "zones d'import", en: "import regions", ar: "مناطق استيراد" } }
    ],
    color: "#EA580C",
    image: "/realisations/vit-auto.jpg",
    website: "https://vit-auto.com"
  },
  {
    slug: "korva-os-gestion-entreprise",
    client: "KORVA OS",
    year: "2026",
    country: { fr: "International", en: "International", ar: "دولي" },
    industry: { fr: "SaaS & Gestion d'entreprise", en: "SaaS & Business management", ar: "البرمجيات السحابية وإدارة الأعمال" },
    portfolioType: { fr: "Applications", en: "Applications", ar: "تطبيقات" },
    services: ["developpement-logiciel-sur-mesure", "intelligence-artificielle", "cloud-computing"],
    title: {
      fr: "KORVA OS, la gestion de l'entreprise au même endroit",
      en: "KORVA OS, running a business in one place",
      ar: "KORVA OS، إدارة الشركة في مكان واحد"
    },
    summary: {
      fr: "Logiciel de gestion tout-en-un : clients, réservations, commandes, stock, factures et site public dans un seul compte, configuré selon le métier.",
      en: "All-in-one management software: customers, bookings, orders, stock, invoices and a public website in a single account, configured for each trade.",
      ar: "برنامج إدارة شامل: العملاء والحجوزات والطلبات والمخزون والفواتير والموقع العام في حساب واحد، مُعدّ حسب نوع النشاط."
    },
    challenge: {
      fr: "Remplacer les carnets, les tableurs et les commandes perdues dans les messages par un outil que les petites entreprises adoptent dès le premier jour, sans formation ni configuration technique.",
      en: "Replace notebooks, spreadsheets and orders lost in message threads with a tool small businesses adopt from day one, without training or technical setup.",
      ar: "استبدال الدفاتر وجداول البيانات والطلبات الضائعة في الرسائل بأداة تعتمدها الشركات الصغيرة من اليوم الأول، دون تدريب أو إعداد تقني."
    },
    solution: {
      fr: "Un compte prêt à l'emploi selon le métier choisi : fiches clients avec historique, carnet de réservations partagé, stock mis à jour à chaque vente, devis et factures, automatisations, assistant IA et site public en ligne dès l'ouverture.",
      en: "An account ready to use for the chosen trade: customer records with history, a shared booking calendar, stock updated with every sale, quotes and invoices, automations, an AI assistant and a public website live from day one.",
      ar: "حساب جاهز للاستخدام حسب النشاط المختار: ملفات العملاء مع السجل، ودفتر حجوزات مشترك، ومخزون يُحدَّث مع كل عملية بيع، وعروض أسعار وفواتير، وأتمتة، ومساعد ذكاء اصطناعي، وموقع عام متاح منذ اليوم الأول."
    },
    results: {
      fr: ["17 métiers configurés d'avance", "Site public en ligne dès l'ouverture du compte", "Démarrage gratuit, sans carte bancaire"],
      en: ["17 trades pre-configured", "Public website live as soon as the account opens", "Free to start, no credit card required"],
      ar: ["17 نشاطًا مُعدًّا مسبقًا", "موقع عام متاح فور فتح الحساب", "بداية مجانية دون بطاقة بنكية"]
    },
    stats: [
      { value: "17", label: { fr: "métiers configurés", en: "trades configured", ar: "نشاطًا مُعدًّا" } },
      { value: "1", label: { fr: "seul compte", en: "single account", ar: "حساب واحد" } },
      { value: "14", label: { fr: "jours de Pro offerts", en: "days of free Pro", ar: "يومًا من Pro مجانًا" } }
    ],
    color: "#0F766E",
    image: "/realisations/korva-os.jpg",
    website: "https://app.korvasuite.com"
  },
  {
    slug: "margokit-devis-factures",
    client: "MARGOKIT",
    year: "2026",
    country: { fr: "Maroc & international", en: "Morocco & international", ar: "المغرب والعالم" },
    industry: { fr: "SaaS & Gestion commerciale", en: "SaaS & Sales management", ar: "البرمجيات السحابية والتسيير التجاري" },
    portfolioType: { fr: "Applications", en: "Applications", ar: "تطبيقات" },
    services: ["developpement-logiciel-sur-mesure", "developpement-web", "cloud-computing"],
    title: {
      fr: "MARGOKIT, les devis et factures qui montrent la marge",
      en: "MARGOKIT, quotes and invoices that show your margin",
      ar: "MARGOKIT، عروض أسعار وفواتير تُظهر هامش الربح"
    },
    summary: {
      fr: "Logiciel en ligne pour indépendants et petites entreprises : devis, factures et avoirs, avec un calculateur de bénéfice. Une solution de VIT GLOBAL TECHNOLOGIES GROUP.",
      en: "Online software for freelancers and small businesses: quotes, invoices and credit notes, with a profit calculator. A VIT GLOBAL TECHNOLOGIES GROUP solution.",
      ar: "برنامج عبر الإنترنت للمستقلين والمقاولات الصغيرة: عروض أسعار وفواتير وإشعارات دائنة، مع حاسبة للأرباح. حل من VIT GLOBAL TECHNOLOGIES GROUP."
    },
    challenge: {
      fr: "Permettre aux indépendants et aux petites entreprises d'émettre des documents commerciaux professionnels tout en sachant, avant d'envoyer un devis, ce qu'il leur rapportera réellement.",
      en: "Help freelancers and small businesses issue professional sales documents while knowing, before sending a quote, what it will actually earn them.",
      ar: "تمكين المستقلين والمقاولات الصغيرة من إصدار وثائق تجارية احترافية مع معرفة ما سيدرّه عرض السعر فعليًا قبل إرساله."
    },
    solution: {
      fr: "Une application web pour créer, envoyer et suivre devis, factures et avoirs, avec un calculateur de bénéfice intégré, une offre Pro par abonnement et un recueil du consentement conforme à la loi 09-08.",
      en: "A web application to create, send and track quotes, invoices and credit notes, with a built-in profit calculator, a Pro subscription plan and consent collection compliant with Moroccan Law 09-08.",
      ar: "تطبيق ويب لإنشاء عروض الأسعار والفواتير والإشعارات الدائنة وإرسالها وتتبعها، مع حاسبة أرباح مدمجة، واشتراك Pro، وجمع موافقة مطابق للقانون 09-08."
    },
    results: {
      fr: ["Devis, factures et avoirs dans un seul outil", "Calcul du bénéfice avant l'envoi du devis", "Service en ligne sur margokit.com"],
      en: ["Quotes, invoices and credit notes in one tool", "Profit calculated before the quote is sent", "Live service at margokit.com"],
      ar: ["عروض الأسعار والفواتير والإشعارات الدائنة في أداة واحدة", "حساب الربح قبل إرسال عرض السعر", "خدمة متاحة على margokit.com"]
    },
    stats: [
      { value: "3", label: { fr: "types de documents", en: "document types", ar: "أنواع من الوثائق" } },
      { value: "Pro", label: { fr: "offre par abonnement", en: "subscription plan", ar: "اشتراك مدفوع" } }
    ],
    color: "#7C3AED",
    website: "https://margokit.com"
  },
  {
    slug: "vitpay-encaissement",
    client: "VITPAY",
    year: "2026",
    country: { fr: "Maroc", en: "Morocco", ar: "المغرب" },
    industry: { fr: "Fintech & Paiement", en: "Fintech & Payments", ar: "التكنولوجيا المالية والأداء" },
    portfolioType: { fr: "Plateformes", en: "Platforms", ar: "منصات" },
    services: ["developpement-logiciel-sur-mesure", "cybersecurite", "cloud-computing"],
    title: {
      fr: "VITPAY, l'encaissement par lien et QR code (en préparation)",
      en: "VITPAY, payment collection by link and QR code (in preparation)",
      ar: "VITPAY، التحصيل عبر رابط ورمز QR (قيد الإعداد)"
    },
    summary: {
      fr: "Plateforme d'encaissement par lien et QR code, adossée à des prestataires de paiement agréés. Actuellement en environnement de test : le lancement est soumis à la levée des points réglementaires.",
      en: "Payment collection platform using links and QR codes, backed by licensed payment providers. Currently in a test environment: launch depends on clearing regulatory requirements.",
      ar: "منصة تحصيل عبر روابط ورموز QR بالاعتماد على مزودي أداء معتمدين. حاليًا في بيئة اختبار، ويتوقف الإطلاق على استيفاء المتطلبات التنظيمية."
    },
    challenge: {
      fr: "Permettre à un commerçant d'encaisser simplement, sans terminal coûteux, tout en garantissant qu'aucun paiement n'est confirmé sans preuve et que la plateforme ne détient jamais les fonds.",
      en: "Let merchants collect payments simply, without costly terminals, while guaranteeing that no payment is confirmed without proof and that the platform never holds funds.",
      ar: "تمكين التاجر من التحصيل ببساطة دون جهاز مكلف، مع ضمان عدم تأكيد أي أداء دون إثبات وعدم احتفاظ المنصة بالأموال أبدًا."
    },
    solution: {
      fr: "Le bénéficiaire saisit un montant, VITPAY génère un lien ou un QR code, le payeur règle chez un prestataire agréé et le paiement n'est confirmé que sur preuve du serveur. Espace Business (demandes, caisse QR, remboursements, équipe) et page de paiement en français, arabe et anglais.",
      en: "The merchant enters an amount, VITPAY generates a link or QR code, the payer pays through a licensed provider, and the payment is only confirmed on server-side proof. Business area (requests, QR checkout, refunds, team) and payment page in French, Arabic and English.",
      ar: "يُدخل المستفيد المبلغ، فتُنشئ VITPAY رابطًا أو رمز QR، ويؤدي الدافع لدى مزود معتمد، ولا يُؤكَّد الأداء إلا بإثبات من الخادم. مساحة أعمال (الطلبات، صندوق QR، الاسترجاع، الفريق) وصفحة أداء بالفرنسية والعربية والإنجليزية."
    },
    results: {
      fr: ["Aucun fonds détenu par la plateforme", "Paiement confirmé uniquement sur preuve serveur", "Interface trilingue avec arabe RTL"],
      en: ["No funds held by the platform", "Payment confirmed only on server-side proof", "Trilingual interface with right-to-left Arabic"],
      ar: ["لا تحتفظ المنصة بأي أموال", "تأكيد الأداء فقط بإثبات من الخادم", "واجهة بثلاث لغات مع العربية من اليمين إلى اليسار"]
    },
    stats: [
      { value: "Lien + QR", label: { fr: "modes d'encaissement", en: "collection methods", ar: "طرق التحصيل" } },
      { value: "3", label: { fr: "langues", en: "languages", ar: "لغات" } }
    ],
    color: "#0E7490"
  }
];

export function getRealisationBySlug(slug: string) {
  return realisations.find((item) => item.slug === slug);
}
