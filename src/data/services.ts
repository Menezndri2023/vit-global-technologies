import type { Localized } from "./types";

export interface Service {
  slug: string;
  icon: string;
  title: Localized<string>;
  summary: Localized<string>;
  description: Localized<string>;
  features: Localized<string[]>;
  subServices: Localized<string[]>;
}

export const services: Service[] = [
  {
    slug: "transformation-digitale",
    icon: "Sparkles",
    title: {
      fr: "Transformation digitale",
      en: "Digital Transformation",
      ar: "التحول الرقمي"
    },
    summary: {
      fr: "Repenser vos processus, vos outils et votre culture pour une croissance durable.",
      en: "Rethinking your processes, tools and culture for sustainable growth.",
      ar: "إعادة تصميم عملياتكم وأدواتكم وثقافتكم من أجل نمو مستدام."
    },
    description: {
      fr: "Nous accompagnons dirigeants et directions métiers dans la définition d'une feuille de route digitale claire, alignée sur vos objectifs business, et déployée avec des équipes pluridisciplinaires.",
      en: "We support executives and business units in defining a clear digital roadmap, aligned with your business objectives and deployed by multidisciplinary teams.",
      ar: "نرافق القيادات والإدارات في وضع خارطة طريق رقمية واضحة، متوافقة مع أهدافكم التجارية، وننفذها بفرق متعددة التخصصات."
    },
    features: {
      fr: ["Audit de maturité digitale", "Feuille de route stratégique", "Conduite du changement", "Pilotage KPI & ROI"],
      en: ["Digital maturity audit", "Strategic roadmap", "Change management", "KPI & ROI monitoring"],
      ar: ["تقييم النضج الرقمي", "خارطة طريق استراتيجية", "قيادة التغيير", "متابعة مؤشرات الأداء والعائد"]
    },
    subServices: {
      fr: ["Audit numérique", "Stratégie digitale", "Conduite du changement", "Digitalisation des process"],
      en: ["Digital audit", "Digital strategy", "Change management", "Process digitalization"],
      ar: ["تدقيق رقمي", "استراتيجية رقمية", "قيادة التغيير", "رقمنة العمليات"]
    }
  },
  {
    slug: "developpement-web",
    icon: "Code2",
    title: {
      fr: "Développement Web",
      en: "Web Development",
      ar: "تطوير الويب"
    },
    summary: {
      fr: "Sites, plateformes et places de marché performantes, sur mesure et évolutives.",
      en: "High-performance, custom, scalable websites, platforms and marketplaces.",
      ar: "مواقع ومنصات وأسواق إلكترونية عالية الأداء ومخصصة وقابلة للتطور."
    },
    description: {
      fr: "De la vitrine premium à la plateforme SaaS complexe, nos équipes Full Stack conçoivent des produits web robustes, rapides et pensés pour l'expérience utilisateur.",
      en: "From a premium showcase site to a complex SaaS platform, our Full Stack teams design robust, fast web products built for user experience.",
      ar: "من الموقع التعريفي الفاخر إلى منصة SaaS المعقدة، تصمم فرقنا منتجات ويب متينة وسريعة تركز على تجربة المستخدم."
    },
    features: {
      fr: ["Sites vitrines & e-commerce", "Marketplaces & plateformes SaaS", "Portails & espaces clients", "Architecture API & microservices"],
      en: ["Showcase & e-commerce sites", "Marketplaces & SaaS platforms", "Portals & client spaces", "API & microservices architecture"],
      ar: ["مواقع تعريفية ومتاجر إلكترونية", "أسواق ومنصات SaaS", "بوابات وفضاءات عملاء", "بنية واجهات برمجية ومايكروسيرفس"]
    },
    subServices: {
      fr: ["Site vitrine", "Site e-commerce", "Marketplace", "CRM", "ERP", "Plateforme SaaS", "Applications métier", "Portail client"],
      en: ["Showcase website", "E-commerce site", "Marketplace", "CRM", "ERP", "SaaS platform", "Business applications", "Client portal"],
      ar: ["موقع تعريفي", "متجر إلكتروني", "سوق إلكتروني", "نظام CRM", "نظام ERP", "منصة SaaS", "تطبيقات أعمال", "بوابة عملاء"]
    }
  },
  {
    slug: "developpement-mobile",
    icon: "Smartphone",
    title: {
      fr: "Développement Mobile",
      en: "Mobile Development",
      ar: "تطوير التطبيقات الجوالة"
    },
    summary: {
      fr: "Des applications mobiles natives et cross-platform pensées pour l'usage terrain.",
      en: "Native and cross-platform mobile applications built for real-world use.",
      ar: "تطبيقات جوالة أصلية ومتعددة المنصات مصممة للاستخدام الميداني."
    },
    description: {
      fr: "Android, iOS, Flutter ou React Native : nous choisissons la technologie la plus adaptée à votre besoin pour livrer des applications mobiles fluides, sécurisées et évolutives.",
      en: "Android, iOS, Flutter or React Native: we choose the technology best suited to your needs to deliver smooth, secure and scalable mobile applications.",
      ar: "Android أو iOS أو Flutter أو React Native: نختار التقنية الأنسب لاحتياجكم لتقديم تطبيقات جوالة سلسة وآمنة وقابلة للتطور."
    },
    features: {
      fr: ["Applications natives iOS & Android", "Développement cross-platform", "Applications métier terrain", "Publication & maintenance stores"],
      en: ["Native iOS & Android apps", "Cross-platform development", "Field business applications", "Store publishing & maintenance"],
      ar: ["تطبيقات أصلية لـ iOS وAndroid", "تطوير متعدد المنصات", "تطبيقات أعمال ميدانية", "نشر وصيانة على المتاجر"]
    },
    subServices: {
      fr: ["Android", "iOS", "Flutter", "React Native", "Applications métier"],
      en: ["Android", "iOS", "Flutter", "React Native", "Business applications"],
      ar: ["Android", "iOS", "Flutter", "React Native", "تطبيقات أعمال"]
    }
  },
  {
    slug: "intelligence-artificielle",
    icon: "BrainCircuit",
    title: {
      fr: "Intelligence Artificielle",
      en: "Artificial Intelligence",
      ar: "الذكاء الاصطناعي"
    },
    summary: {
      fr: "Des solutions d'IA appliquée qui automatisent, prédisent et augmentent vos équipes.",
      en: "Applied AI solutions that automate, predict and augment your teams.",
      ar: "حلول ذكاء اصطناعي تطبيقية تعمل على الأتمتة والتنبؤ وتعزيز أداء فرقكم."
    },
    description: {
      fr: "Chatbots, assistants intelligents, automatisation de processus, computer vision et modèles prédictifs : nous intégrons l'IA là où elle génère une vraie valeur métier.",
      en: "Chatbots, intelligent assistants, process automation, computer vision and predictive models: we integrate AI where it generates real business value.",
      ar: "روبوتات محادثة، مساعدون ذكيون، أتمتة العمليات، رؤية حاسوبية ونماذج تنبؤية: ندمج الذكاء الاصطناعي حيث يحقق قيمة حقيقية لأعمالكم."
    },
    features: {
      fr: ["Assistants & chatbots IA", "Automatisation intelligente (RPA)", "Machine learning prédictif", "Analyse de données non structurées"],
      en: ["AI assistants & chatbots", "Intelligent automation (RPA)", "Predictive machine learning", "Unstructured data analysis"],
      ar: ["مساعدون وروبوتات محادثة ذكية", "أتمتة العمليات (RPA)", "تعلم آلي تنبؤي", "تحليل البيانات غير المهيكلة"]
    },
    subServices: {
      fr: ["Chatbots", "Agents IA", "Automatisation", "Vision par ordinateur", "Reconnaissance vocale", "IA Générative"],
      en: ["Chatbots", "AI agents", "Automation", "Computer vision", "Speech recognition", "Generative AI"],
      ar: ["روبوتات محادثة", "وكلاء ذكاء اصطناعي", "أتمتة", "رؤية حاسوبية", "التعرف على الصوت", "الذكاء الاصطناعي التوليدي"]
    }
  },
  {
    slug: "cloud-computing",
    icon: "Cloud",
    title: {
      fr: "Cloud Computing",
      en: "Cloud Computing",
      ar: "الحوسبة السحابية"
    },
    summary: {
      fr: "Migration, hébergement et optimisation cloud pour une infrastructure agile.",
      en: "Migration, hosting and cloud optimization for an agile infrastructure.",
      ar: "ترحيل واستضافة وتحسين سحابي لبنية تحتية مرنة."
    },
    description: {
      fr: "Nous concevons des architectures cloud sécurisées et scalables sur AWS, Azure et Google Cloud, avec une approche coûts maîtrisés et haute disponibilité.",
      en: "We design secure, scalable cloud architectures on AWS, Azure and Google Cloud, with a controlled-cost, high-availability approach.",
      ar: "نصمم بنى سحابية آمنة وقابلة للتوسع على AWS وAzure وGoogle Cloud، بمقاربة تراعي التكاليف وتوفر إتاحة عالية."
    },
    features: {
      fr: ["Migration cloud sécurisée", "Architecture multi-cloud & hybride", "Scalabilité & haute disponibilité", "Optimisation des coûts (FinOps)"],
      en: ["Secure cloud migration", "Multi-cloud & hybrid architecture", "Scalability & high availability", "Cost optimization (FinOps)"],
      ar: ["ترحيل سحابي آمن", "بنية متعددة السحابات وهجينة", "قابلية التوسع وإتاحة عالية", "تحسين التكاليف (FinOps)"]
    },
    subServices: {
      fr: ["Migration Cloud", "AWS", "Azure", "Google Cloud", "Sauvegarde"],
      en: ["Cloud migration", "AWS", "Azure", "Google Cloud", "Backup"],
      ar: ["الترحيل السحابي", "AWS", "Azure", "Google Cloud", "النسخ الاحتياطي"]
    }
  },
  {
    slug: "cybersecurite",
    icon: "ShieldCheck",
    title: {
      fr: "Cybersécurité",
      en: "Cybersecurity",
      ar: "الأمن السيبراني"
    },
    summary: {
      fr: "Protéger vos données, vos systèmes et votre réputation face aux cybermenaces.",
      en: "Protecting your data, systems and reputation against cyber threats.",
      ar: "حماية بياناتكم وأنظمتكم وسمعتكم من التهديدات السيبرانية."
    },
    description: {
      fr: "Audit de sécurité, tests d'intrusion, mise en conformité et supervision continue : notre équipe de spécialistes sécurise votre écosystème digital de bout en bout.",
      en: "Security audits, penetration testing, compliance and continuous monitoring: our team of specialists secures your digital ecosystem end to end.",
      ar: "تدقيق أمني، اختبارات اختراق، امتثال تنظيمي ومراقبة مستمرة: يؤمّن فريقنا المتخصص منظومتكم الرقمية بشكل شامل."
    },
    features: {
      fr: ["Audit & tests d'intrusion (pentest)", "Conformité RGPD / ISO 27001", "Supervision & réponse aux incidents", "Sécurisation des infrastructures"],
      en: ["Audit & penetration testing", "GDPR / ISO 27001 compliance", "Monitoring & incident response", "Infrastructure hardening"],
      ar: ["تدقيق واختبارات اختراق", "الامتثال لـ GDPR / ISO 27001", "المراقبة والاستجابة للحوادث", "تحصين البنية التحتية"]
    },
    subServices: {
      fr: ["Audit", "Pentest", "Sécurisation", "Surveillance", "Protection"],
      en: ["Audit", "Pentest", "Hardening", "Monitoring", "Protection"],
      ar: ["تدقيق", "اختبار اختراق", "تأمين", "مراقبة", "حماية"]
    }
  },
  {
    slug: "developpement-logiciel-sur-mesure",
    icon: "Layers",
    title: {
      fr: "Développement logiciel sur mesure",
      en: "Custom Software Development",
      ar: "تطوير برمجيات مخصصة"
    },
    summary: {
      fr: "Des logiciels métiers conçus pour vos processus, pas l'inverse.",
      en: "Business software designed for your processes, not the other way around.",
      ar: "برمجيات أعمال مصممة لتناسب عملياتكم، لا العكس."
    },
    description: {
      fr: "ERP, CRM, outils internes, plateformes verticales : nous développons des logiciels sur mesure qui s'adaptent précisément à vos flux de travail et à votre secteur.",
      en: "ERP, CRM, internal tools, vertical platforms: we build custom software that precisely fits your workflows and industry.",
      ar: "أنظمة ERP وCRM وأدوات داخلية ومنصات قطاعية: نطور برمجيات مخصصة تتلاءم بدقة مع سير عملكم وقطاعكم."
    },
    features: {
      fr: ["ERP & CRM sur mesure", "Outils métiers internes", "Intégration systèmes existants", "Maintenance évolutive"],
      en: ["Custom ERP & CRM", "Internal business tools", "Legacy systems integration", "Evolutive maintenance"],
      ar: ["أنظمة ERP وCRM مخصصة", "أدوات أعمال داخلية", "دمج مع الأنظمة القائمة", "صيانة تطويرية"]
    },
    subServices: {
      fr: ["ERP", "CRM", "Logiciels sur mesure", "Gestion commerciale", "Gestion RH", "Gestion comptable"],
      en: ["ERP", "CRM", "Custom software", "Sales management", "HR management", "Accounting management"],
      ar: ["ERP", "CRM", "برمجيات مخصصة", "إدارة تجارية", "إدارة الموارد البشرية", "إدارة محاسبية"]
    }
  },
  {
    slug: "devops",
    icon: "GitBranch",
    title: {
      fr: "DevOps",
      en: "DevOps",
      ar: "DevOps"
    },
    summary: {
      fr: "Automatiser, industrialiser et fiabiliser vos livraisons logicielles.",
      en: "Automating, industrializing and de-risking your software delivery.",
      ar: "أتمتة وتصنيع وتعزيز موثوقية عمليات إطلاق برمجياتكم."
    },
    description: {
      fr: "Mise en place de pipelines CI/CD, conteneurisation, Infrastructure as Code et culture DevOps pour livrer plus vite, plus souvent et en toute confiance.",
      en: "CI/CD pipelines, containerization, Infrastructure as Code and DevOps culture to ship faster, more often and with confidence.",
      ar: "إعداد خطوط CI/CD، الحوسبة الحاوية، البنية التحتية ككود، وثقافة DevOps للإطلاق بشكل أسرع وأكثر تواترًا وبثقة."
    },
    features: {
      fr: ["Pipelines CI/CD", "Conteneurisation (Docker, Kubernetes)", "Infrastructure as Code", "Monitoring & observabilité"],
      en: ["CI/CD pipelines", "Containerization (Docker, Kubernetes)", "Infrastructure as Code", "Monitoring & observability"],
      ar: ["خطوط CI/CD", "الحوسبة الحاوية (Docker وKubernetes)", "البنية التحتية ككود", "المراقبة والرصد"]
    },
    subServices: {
      fr: ["Docker", "Kubernetes", "CI/CD", "Monitoring"],
      en: ["Docker", "Kubernetes", "CI/CD", "Monitoring"],
      ar: ["Docker", "Kubernetes", "CI/CD", "المراقبة"]
    }
  },
  {
    slug: "infrastructures-it",
    icon: "Server",
    title: {
      fr: "Infrastructures IT",
      en: "IT Infrastructure",
      ar: "البنية التحتية لتقنية المعلومات"
    },
    summary: {
      fr: "Concevoir et maintenir des infrastructures fiables, sécurisées et évolutives.",
      en: "Designing and maintaining reliable, secure and scalable infrastructure.",
      ar: "تصميم وصيانة بنية تحتية موثوقة وآمنة وقابلة للتطور."
    },
    description: {
      fr: "Réseaux, serveurs, postes de travail, télécoms : nous concevons, déployons et administrons des infrastructures IT adaptées à la taille et aux ambitions de votre organisation.",
      en: "Networks, servers, workstations, telecoms: we design, deploy and manage IT infrastructure tailored to your organization's size and ambitions.",
      ar: "الشبكات، الخوادم، محطات العمل، الاتصالات: نصمم وننشر وندير بنية تحتية تقنية تتناسب مع حجم وطموحات مؤسستكم."
    },
    features: {
      fr: ["Conception réseau & datacenter", "Virtualisation & serveurs", "Postes de travail & télécoms", "Supervision proactive"],
      en: ["Network & datacenter design", "Virtualization & servers", "Workstations & telecoms", "Proactive monitoring"],
      ar: ["تصميم الشبكات ومراكز البيانات", "المحاكاة الافتراضية والخوادم", "محطات العمل والاتصالات", "المراقبة الاستباقية"]
    },
    subServices: {
      fr: ["Serveurs", "Virtualisation", "Réseaux", "Maintenance"],
      en: ["Servers", "Virtualization", "Networks", "Maintenance"],
      ar: ["الخوادم", "المحاكاة الافتراضية", "الشبكات", "الصيانة"]
    }
  },
  {
    slug: "data-analytics",
    icon: "BarChart3",
    title: {
      fr: "Data Analytics",
      en: "Data Analytics",
      ar: "تحليل البيانات"
    },
    summary: {
      fr: "Transformer vos données en décisions grâce à la data et au BI.",
      en: "Turning your data into decisions through data and BI.",
      ar: "تحويل بياناتكم إلى قرارات عبر تحليلات الأعمال."
    },
    description: {
      fr: "Collecte, structuration, visualisation et exploitation de vos données : nous construisons des tableaux de bord et des pipelines data qui éclairent vos décisions stratégiques.",
      en: "Collection, structuring, visualization and use of your data: we build dashboards and data pipelines that inform your strategic decisions.",
      ar: "جمع البيانات وهيكلتها وتصويرها واستثمارها: نبني لوحات تحكم وخطوط بيانات تدعم قراراتكم الاستراتيجية."
    },
    features: {
      fr: ["Data warehouse & pipelines", "Tableaux de bord BI", "Reporting temps réel", "Aide à la décision"],
      en: ["Data warehouse & pipelines", "BI dashboards", "Real-time reporting", "Decision support"],
      ar: ["مستودعات وخطوط بيانات", "لوحات تحكم لتحليلات الأعمال", "تقارير لحظية", "دعم اتخاذ القرار"]
    },
    subServices: {
      fr: ["Business Intelligence", "Power BI", "Big Data", "Analyse"],
      en: ["Business Intelligence", "Power BI", "Big Data", "Analytics"],
      ar: ["ذكاء الأعمال", "Power BI", "البيانات الضخمة", "التحليل"]
    }
  },
  {
    slug: "ui-ux-design",
    icon: "PenTool",
    title: {
      fr: "UI/UX Design",
      en: "UI/UX Design",
      ar: "تصميم واجهات وتجربة المستخدم"
    },
    summary: {
      fr: "Des interfaces intuitives et élégantes qui convertissent.",
      en: "Intuitive, elegant interfaces that convert.",
      ar: "واجهات بديهية وأنيقة تحقق التحويل."
    },
    description: {
      fr: "Recherche utilisateur, wireframes, design systems et prototypes interactifs : nous concevons des expériences digitales centrées sur vos utilisateurs et vos objectifs business.",
      en: "User research, wireframes, design systems and interactive prototypes: we craft digital experiences centered on your users and business goals.",
      ar: "بحث المستخدم، الإطارات الشبكية، أنظمة التصميم والنماذج التفاعلية: نصمم تجارب رقمية محورها المستخدم وأهداف أعمالكم."
    },
    features: {
      fr: ["Recherche & tests utilisateurs", "Design systems", "Prototypage interactif", "Accessibilité (WCAG)"],
      en: ["User research & testing", "Design systems", "Interactive prototyping", "Accessibility (WCAG)"],
      ar: ["بحث واختبار المستخدم", "أنظمة التصميم", "نماذج تفاعلية", "إمكانية الوصول (WCAG)"]
    },
    subServices: {
      fr: ["Maquettes", "Figma", "Prototypes", "Tests utilisateurs"],
      en: ["Wireframes", "Figma", "Prototypes", "User testing"],
      ar: ["مخططات أولية", "Figma", "نماذج أولية", "اختبار المستخدم"]
    }
  },
  {
    slug: "marketing-digital",
    icon: "Megaphone",
    title: {
      fr: "Marketing Digital",
      en: "Digital Marketing",
      ar: "التسويق الرقمي"
    },
    summary: {
      fr: "Générer de la visibilité, du trafic qualifié et des conversions.",
      en: "Generating visibility, qualified traffic and conversions.",
      ar: "توليد الظهور والزيارات المؤهلة والتحويلات."
    },
    description: {
      fr: "SEO, SEA, réseaux sociaux, content marketing et growth : nous bâtissons des stratégies d'acquisition mesurables et rentables, alignées sur vos objectifs commerciaux.",
      en: "SEO, SEA, social media, content marketing and growth: we build measurable, profitable acquisition strategies aligned with your commercial goals.",
      ar: "تحسين محركات البحث، الإعلانات المدفوعة، الشبكات الاجتماعية، تسويق المحتوى والنمو: نبني استراتيجيات اكتساب قابلة للقياس والربحية."
    },
    features: {
      fr: ["SEO & référencement international", "Campagnes SEA / Social Ads", "Content marketing", "Growth & automation marketing"],
      en: ["SEO & international search", "SEA / Social Ads campaigns", "Content marketing", "Growth & marketing automation"],
      ar: ["تحسين محركات البحث الدولي", "حملات إعلانية مدفوعة واجتماعية", "تسويق المحتوى", "النمو وأتمتة التسويق"]
    },
    subServices: {
      fr: ["SEO", "SEA", "Publicité", "Facebook Ads", "Google Ads", "TikTok Ads"],
      en: ["SEO", "SEA", "Advertising", "Facebook Ads", "Google Ads", "TikTok Ads"],
      ar: ["تحسين محركات البحث", "الإعلانات المدفوعة", "الدعاية", "إعلانات فيسبوك", "إعلانات غوغل", "إعلانات تيك توك"]
    }
  },
  {
    slug: "branding",
    icon: "Palette",
    title: {
      fr: "Branding & Identité de marque",
      en: "Branding & Brand Identity",
      ar: "الهوية التجارية"
    },
    summary: {
      fr: "Construire une marque forte, cohérente et mémorable à l'international.",
      en: "Building a strong, consistent and memorable brand internationally.",
      ar: "بناء علامة تجارية قوية ومتناسقة ولا تُنسى على المستوى الدولي."
    },
    description: {
      fr: "Stratégie de marque, identité visuelle, charte graphique, ton de voix : nous créons des identités de marque premium qui inspirent confiance à vos clients et partenaires.",
      en: "Brand strategy, visual identity, style guide, tone of voice: we craft premium brand identities that inspire trust in your clients and partners.",
      ar: "استراتيجية العلامة، الهوية البصرية، دليل الأسلوب ونبرة الصوت: نصمم هويات مؤسسية راقية تبعث الثقة لدى عملائكم وشركائكم."
    },
    features: {
      fr: ["Stratégie de marque", "Identité visuelle & logo", "Charte graphique complète", "Supports print & digitaux"],
      en: ["Brand strategy", "Visual identity & logo", "Complete brand guidelines", "Print & digital assets"],
      ar: ["استراتيجية العلامة التجارية", "الهوية البصرية والشعار", "دليل هوية متكامل", "مواد مطبوعة ورقمية"]
    },
    subServices: {
      fr: ["Logo", "Charte graphique", "Identité visuelle"],
      en: ["Logo", "Style guide", "Visual identity"],
      ar: ["شعار", "دليل الهوية", "الهوية البصرية"]
    }
  },
  {
    slug: "conseil",
    icon: "Compass",
    title: {
      fr: "Conseil & Stratégie",
      en: "Consulting & Strategy",
      ar: "الاستشارات والاستراتيجية"
    },
    summary: {
      fr: "Un regard d'expert pour éclairer vos décisions technologiques et business.",
      en: "Expert insight to guide your technology and business decisions.",
      ar: "رؤية خبراء لإنارة قراراتكم التقنية والتجارية."
    },
    description: {
      fr: "Nos consultants seniors interviennent en amont de vos projets pour cadrer les enjeux, arbitrer les choix technologiques et sécuriser la réussite de vos investissements.",
      en: "Our senior consultants step in upstream of your projects to frame the challenges, guide technology choices and secure the success of your investments.",
      ar: "يتدخل كبار مستشارينا في المراحل الأولى من مشاريعكم لتأطير التحديات وترشيد الخيارات التقنية وضمان نجاح استثماراتكم."
    },
    features: {
      fr: ["Cadrage stratégique de projets", "Choix technologiques & architecture", "Accompagnement direction & COMEX", "Études de faisabilité"],
      en: ["Strategic project framing", "Technology & architecture choices", "Executive & board advisory", "Feasibility studies"],
      ar: ["تأطير استراتيجي للمشاريع", "اختيار التقنيات والبنى", "مرافقة الإدارة العليا", "دراسات الجدوى"]
    },
    subServices: {
      fr: ["Transformation digitale", "Audit", "Organisation", "Accompagnement"],
      en: ["Digital transformation", "Audit", "Organization", "Advisory"],
      ar: ["التحول الرقمي", "تدقيق", "التنظيم", "المرافقة"]
    }
  },
  {
    slug: "formation-support",
    icon: "GraduationCap",
    title: {
      fr: "Formation & Support Informatique",
      en: "Training & IT Support",
      ar: "التدريب والدعم التقني"
    },
    summary: {
      fr: "Monter en compétences vos équipes et bénéficier d'un support réactif.",
      en: "Upskilling your teams and benefiting from responsive support.",
      ar: "تطوير مهارات فرقكم والاستفادة من دعم سريع الاستجابة."
    },
    description: {
      fr: "Formations techniques et digitales sur mesure, support helpdesk multicanal et maintenance applicative : nous restons à vos côtés bien après la mise en production.",
      en: "Custom technical and digital training, multichannel helpdesk support and application maintenance: we stay by your side well after go-live.",
      ar: "تدريبات تقنية ورقمية مخصصة، دعم فني متعدد القنوات وصيانة تطبيقية: نبقى إلى جانبكم بعد الإطلاق بوقت طويل."
    },
    features: {
      fr: ["Formations sur mesure", "Support helpdesk multicanal", "Maintenance corrective & évolutive", "Documentation & transfert de compétences"],
      en: ["Custom training programs", "Multichannel helpdesk support", "Corrective & evolutive maintenance", "Documentation & knowledge transfer"],
      ar: ["برامج تدريب مخصصة", "دعم فني متعدد القنوات", "صيانة تصحيحية وتطويرية", "توثيق ونقل المعرفة"]
    },
    subServices: {
      fr: ["Formation développement", "Formation IA", "Formation cybersécurité", "Maintenance & infogérance", "Assistance & télémaintenance"],
      en: ["Development training", "AI training", "Cybersecurity training", "Maintenance & managed IT", "Assistance & remote support"],
      ar: ["تدريب على البرمجة", "تدريب على الذكاء الاصطناعي", "تدريب على الأمن السيبراني", "الصيانة والإدارة المفوضة", "المساعدة والصيانة عن بُعد"]
    }
  }
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
