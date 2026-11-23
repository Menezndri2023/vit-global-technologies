import type { Localized } from "./types";

export interface BlogPost {
  slug: string;
  category: Localized<string>;
  date: string;
  readTime: string;
  author: string;
  authorRole: Localized<string>;
  title: Localized<string>;
  excerpt: Localized<string>;
  content: Localized<string[]>;
  color: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ia-generative-entreprises-africaines",
    category: { fr: "Intelligence Artificielle", en: "Artificial Intelligence", ar: "الذكاء الاصطناعي" },
    date: "2026-11-10",
    readTime: "6 min",
    author: "Équipe VIT GLOBAL",
    authorRole: { fr: "Directrice IA & Data", en: "Head of AI & Data", ar: "مديرة الذكاء الاصطناعي والبيانات" },
    title: {
      fr: "IA générative : ce que les entreprises africaines doivent savoir en 2026",
      en: "Generative AI: what African businesses need to know in 2026",
      ar: "الذكاء الاصطناعي التوليدي: ما يجب أن تعرفه الشركات الأفريقية في 2026"
    },
    excerpt: {
      fr: "L'IA générative n'est plus une option mais un avantage compétitif. Voici comment l'adopter sans risque et avec un ROI mesurable.",
      en: "Generative AI is no longer optional but a competitive advantage. Here's how to adopt it safely with measurable ROI.",
      ar: "لم يعد الذكاء الاصطناعي التوليدي خيارًا بل ميزة تنافسية. إليك كيفية تبنّيه بأمان وبعائد استثمار قابل للقياس."
    },
    content: {
      fr: [
        "L'IA générative s'impose désormais comme un levier de productivité incontournable pour les entreprises, y compris sur les marchés africains en forte croissance digitale.",
        "Chez VIT GLOBAL, nous constatons que les organisations qui réussissent leur adoption commencent toujours par un cas d'usage précis et mesurable — automatisation du support client, génération de contenu, ou aide à la décision — avant d'élargir le périmètre.",
        "La clé du succès réside dans la gouvernance des données, la formation des équipes et le choix d'une architecture capable d'évoluer avec la maturité de l'organisation."
      ],
      en: [
        "Generative AI is now an unavoidable productivity lever for businesses, including in Africa's fast-growing digital markets.",
        "At VIT GLOBAL, we see that organizations that succeed always start with a precise, measurable use case — customer support automation, content generation, or decision support — before expanding scope.",
        "The key to success lies in data governance, team training, and choosing an architecture able to evolve with the organization's maturity."
      ],
      ar: [
        "أصبح الذكاء الاصطناعي التوليدي رافعة إنتاجية لا غنى عنها للشركات، بما في ذلك الأسواق الأفريقية ذات النمو الرقمي السريع.",
        "في VIT GLOBAL، نلاحظ أن المؤسسات الناجحة تبدأ دائمًا بحالة استخدام دقيقة وقابلة للقياس - أتمتة دعم العملاء أو توليد المحتوى أو دعم القرار - قبل توسيع النطاق.",
        "يكمن مفتاح النجاح في حوكمة البيانات وتدريب الفرق واختيار بنية قادرة على التطور مع نضج المؤسسة."
      ]
    },
    color: "#0369A1"
  },
  {
    slug: "cybersecurite-pme-guide",
    category: { fr: "Cybersécurité", en: "Cybersecurity", ar: "الأمن السيبراني" },
    date: "2026-10-14",
    readTime: "5 min",
    author: "Équipe VIT GLOBAL",
    authorRole: { fr: "Responsable Cybersécurité", en: "Head of Cybersecurity", ar: "مسؤول الأمن السيبراني" },
    title: {
      fr: "Cybersécurité : le guide essentiel pour les PME en croissance",
      en: "Cybersecurity: the essential guide for growing SMEs",
      ar: "الأمن السيبراني: الدليل الأساسي للشركات الصغيرة والمتوسطة النامية"
    },
    excerpt: {
      fr: "Les PME insuffisamment protégées sont une cible de choix pour les cyberattaques. Voici les 6 réflexes à adopter dès maintenant.",
      en: "Under-protected SMEs are a prime target for cyberattacks. Here are the 6 practices to adopt right now.",
      ar: "الشركات الصغيرة والمتوسطة غير المحمية بشكل كافٍ هدف مفضل للهجمات السيبرانية. إليك 6 ممارسات يجب تبنيها الآن."
    },
    content: {
      fr: [
        "Les PME sont devenues une cible privilégiée des cybercriminels, précisément parce qu'elles investissent moins dans leur sécurité que les grands groupes.",
        "Un audit de sécurité régulier, une politique de mots de passe robuste, la sensibilisation des équipes et un plan de réponse aux incidents constituent le socle minimal de protection.",
        "Investir dans la cybersécurité n'est plus une charge mais un facteur de confiance déterminant auprès de vos clients et partenaires."
      ],
      en: [
        "SMEs have become a prime target for cybercriminals, precisely because they invest less in security than large corporations.",
        "Regular security audits, strong password policies, team awareness and an incident response plan form the minimum baseline of protection.",
        "Investing in cybersecurity is no longer a cost but a decisive trust factor with your clients and partners."
      ],
      ar: [
        "أصبحت الشركات الصغيرة والمتوسطة هدفًا مفضلاً لمجرمي الإنترنت، تحديدًا لأنها تستثمر أقل في الأمن مقارنة بالشركات الكبرى.",
        "يشكل التدقيق الأمني المنتظم وسياسة كلمات المرور القوية وتوعية الفرق وخطة الاستجابة للحوادث الحد الأدنى من الحماية.",
        "لم يعد الاستثمار في الأمن السيبراني عبئًا بل عامل ثقة حاسمًا لدى عملائكم وشركائكم."
      ]
    },
    color: "#1436A8"
  },
  {
    slug: "cloud-hybride-choisir-architecture",
    category: { fr: "Cloud Computing", en: "Cloud Computing", ar: "الحوسبة السحابية" },
    date: "2026-09-16",
    readTime: "7 min",
    author: "Équipe VIT GLOBAL",
    authorRole: { fr: "Architecte Cloud Principal", en: "Principal Cloud Architect", ar: "كبير مهندسي الحوسبة السحابية" },
    title: {
      fr: "Cloud hybride : comment choisir la bonne architecture pour votre entreprise",
      en: "Hybrid cloud: how to choose the right architecture for your business",
      ar: "السحابة الهجينة: كيف تختار البنية المناسبة لشركتك"
    },
    excerpt: {
      fr: "Cloud public, privé ou hybride ? Notre méthodologie pour arbitrer selon vos contraintes de coûts, de sécurité et de souveraineté.",
      en: "Public, private or hybrid cloud? Our methodology for deciding based on your cost, security and sovereignty constraints.",
      ar: "سحابة عامة أم خاصة أم هجينة؟ منهجيتنا لاتخاذ القرار وفق قيود التكلفة والأمن والسيادة."
    },
    content: {
      fr: [
        "Le choix d'une architecture cloud ne doit jamais être dicté par la mode, mais par une analyse rigoureuse de vos contraintes métier, réglementaires et budgétaires.",
        "Le modèle hybride s'impose souvent comme le meilleur compromis pour les organisations soumises à des exigences de souveraineté des données tout en cherchant l'élasticité du cloud public.",
        "Notre méthodologie évalue systématiquement la criticité des données, la latence requise et le coût total de possession avant toute recommandation."
      ],
      en: [
        "Choosing a cloud architecture should never be dictated by trends, but by a rigorous analysis of your business, regulatory and budget constraints.",
        "The hybrid model is often the best compromise for organizations subject to data sovereignty requirements while seeking the elasticity of public cloud.",
        "Our methodology systematically evaluates data criticality, required latency and total cost of ownership before any recommendation."
      ],
      ar: [
        "لا ينبغي أن يُملى اختيار البنية السحابية بالموضة، بل بتحليل دقيق لقيودكم التجارية والتنظيمية والميزانية.",
        "غالبًا ما يكون النموذج الهجين أفضل حل وسط للمؤسسات الخاضعة لمتطلبات سيادة البيانات مع سعيها لمرونة السحابة العامة.",
        "تقيّم منهجيتنا بشكل منهجي حساسية البيانات وزمن الاستجابة المطلوب والتكلفة الإجمالية قبل تقديم أي توصية."
      ]
    },
    color: "#1D4ED8"
  }
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
