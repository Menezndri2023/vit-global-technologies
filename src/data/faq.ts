import type { Localized } from "./types";

export interface FaqItem {
  category: Localized<string>;
  question: Localized<string>;
  answer: Localized<string>;
}

export const faqItems: FaqItem[] = [
  {
    category: { fr: "Général", en: "General", ar: "عام" },
    question: {
      fr: "Dans quels pays VIT GLOBAL TECHNOLOGIES GROUP intervient-il ?",
      en: "In which countries does VIT GLOBAL TECHNOLOGIES GROUP operate?",
      ar: "في أي دول تعمل مجموعة VIT GLOBAL التقنية؟"
    },
    answer: {
      fr: "Notre siège est basé à Abidjan et nous intervenons dans toute l'Afrique de l'Ouest, en Afrique du Nord ainsi qu'en Europe, via nos équipes locales et nos filiales partenaires.",
      en: "Our headquarters is based in Abidjan and we operate across West Africa, North Africa and Europe, through our local teams and partner subsidiaries.",
      ar: "يقع مقرنا الرئيسي في أبيدجان ونعمل في جميع أنحاء غرب أفريقيا وشمال أفريقيا وأوروبا، عبر فرقنا المحلية وفروعنا الشريكة."
    }
  },
  {
    category: { fr: "Général", en: "General", ar: "عام" },
    question: {
      fr: "Quelle est la taille de vos équipes ?",
      en: "How large are your teams?",
      ar: "ما حجم فرقكم؟"
    },
    answer: {
      fr: "Le groupe compte plus de 120 collaborateurs répartis entre le siège et nos filiales, couvrant l'ensemble des expertises technologiques, créatives et stratégiques.",
      en: "The group has over 120 employees spread across headquarters and our subsidiaries, covering all technology, creative and strategic expertise.",
      ar: "تضم المجموعة أكثر من 120 موظفًا موزعين بين المقر الرئيسي وفروعنا، يغطون جميع الخبرات التقنية والإبداعية والاستراتيجية."
    }
  },
  {
    category: { fr: "Projets", en: "Projects", ar: "المشاريع" },
    question: {
      fr: "Combien de temps dure un projet type ?",
      en: "How long does a typical project take?",
      ar: "كم تستغرق مدة المشروع النموذجي؟"
    },
    answer: {
      fr: "Cela dépend de la complexité : un site vitrine peut être livré en 3 à 6 semaines, une plateforme sur mesure en 3 à 9 mois. Nous définissons toujours un calendrier précis dès le cadrage.",
      en: "It depends on complexity: a showcase site can be delivered in 3 to 6 weeks, a custom platform in 3 to 9 months. We always define a precise timeline from the scoping phase.",
      ar: "يعتمد ذلك على التعقيد: يمكن تسليم موقع تعريفي خلال 3 إلى 6 أسابيع، ومنصة مخصصة خلال 3 إلى 9 أشهر. نحدد دائمًا جدولاً زمنيًا دقيقًا منذ مرحلة التأطير."
    }
  },
  {
    category: { fr: "Projets", en: "Projects", ar: "المشاريع" },
    question: {
      fr: "Comment se déroule votre méthodologie de travail ?",
      en: "What does your project methodology look like?",
      ar: "كيف تسير منهجية عملكم؟"
    },
    answer: {
      fr: "Nous travaillons en méthodologie agile avec des sprints courts, des points d'avancement réguliers et un accès direct à votre chef de projet dédié tout au long du projet.",
      en: "We work using an agile methodology with short sprints, regular progress updates and direct access to your dedicated project manager throughout the project.",
      ar: "نعمل بمنهجية رشيقة مع دورات عمل قصيرة وتحديثات تقدم منتظمة ووصول مباشر لمدير مشروعكم المخصص طوال المشروع."
    }
  },
  {
    category: { fr: "Devis & Tarifs", en: "Quotes & Pricing", ar: "العروض والأسعار" },
    question: {
      fr: "Comment obtenir un devis pour mon projet ?",
      en: "How can I get a quote for my project?",
      ar: "كيف يمكنني الحصول على عرض سعر لمشروعي؟"
    },
    answer: {
      fr: "Remplissez notre formulaire de demande de devis en ligne ou prenez rendez-vous avec un conseiller. Nous revenons vers vous sous 24 à 48 heures avec une première estimation.",
      en: "Fill out our online quote request form or book an appointment with an advisor. We get back to you within 24 to 48 hours with an initial estimate.",
      ar: "املأ نموذج طلب عرض السعر عبر الإنترنت أو احجز موعدًا مع مستشار. سنرد عليك خلال 24 إلى 48 ساعة بتقدير أولي."
    }
  },
  {
    category: { fr: "Devis & Tarifs", en: "Quotes & Pricing", ar: "العروض والأسعار" },
    question: {
      fr: "Vos tarifs sont-ils fixes ou sur devis ?",
      en: "Are your rates fixed or quote-based?",
      ar: "هل أسعاركم ثابتة أم بحسب العرض؟"
    },
    answer: {
      fr: "Chaque projet étant unique, nos tarifs sont établis sur devis en fonction du périmètre, de la complexité technique et des délais souhaités. Nous proposons aussi des forfaits pour certains services standards.",
      en: "As every project is unique, our rates are quote-based depending on scope, technical complexity and desired timeline. We also offer fixed packages for certain standard services.",
      ar: "بما أن كل مشروع فريد، تُحدد أسعارنا بناءً على عرض سعر وفق النطاق والتعقيد التقني والمهلة المطلوبة. نقدم أيضًا باقات ثابتة لبعض الخدمات القياسية."
    }
  },
  {
    category: { fr: "Support", en: "Support", ar: "الدعم" },
    question: {
      fr: "Proposez-vous un support après la mise en production ?",
      en: "Do you offer support after go-live?",
      ar: "هل تقدمون دعمًا بعد الإطلاق؟"
    },
    answer: {
      fr: "Oui, nous proposons des contrats de maintenance et de support multicanal (email, téléphone, chat) avec des niveaux de service (SLA) adaptés à la criticité de votre activité.",
      en: "Yes, we offer maintenance and multichannel support contracts (email, phone, chat) with service levels (SLA) tailored to your business criticality.",
      ar: "نعم، نقدم عقود صيانة ودعم متعدد القنوات (بريد إلكتروني، هاتف، دردشة) مع مستويات خدمة (SLA) تتناسب مع أهمية نشاطكم."
    }
  },
  {
    category: { fr: "Support", en: "Support", ar: "الدعم" },
    question: {
      fr: "Comment contacter le support technique en urgence ?",
      en: "How do I contact technical support in an emergency?",
      ar: "كيف أتواصل مع الدعم الفني في حالة طارئة؟"
    },
    answer: {
      fr: "Nos clients sous contrat disposent d'une ligne d'astreinte dédiée. Vous pouvez également utiliser le chat en direct du site ou notre Centre de support pour toute demande.",
      en: "Clients under contract have a dedicated on-call line. You can also use the site's live chat or our Support Center for any request.",
      ar: "يتوفر لعملائنا المتعاقدين خط طوارئ مخصص. يمكنكم أيضًا استخدام الدردشة المباشرة على الموقع أو مركز الدعم لأي طلب."
    }
  },
  {
    category: { fr: "Partenariats", en: "Partnerships", ar: "الشراكات" },
    question: {
      fr: "Comment devenir partenaire de VIT GLOBAL ?",
      en: "How can I become a VIT GLOBAL partner?",
      ar: "كيف يمكنني أن أصبح شريكًا لـ VIT GLOBAL؟"
    },
    answer: {
      fr: "Rendez-vous sur notre page Partenaires ou Espace Partenaire pour soumettre votre candidature. Notre équipe partenariats étudie chaque demande selon la complémentarité stratégique et géographique.",
      en: "Visit our Partners page or Partner Area to submit your application. Our partnerships team reviews every request based on strategic and geographic fit.",
      ar: "تفضل بزيارة صفحة الشركاء أو فضاء الشركاء لتقديم طلبكم. يدرس فريق الشراكات لدينا كل طلب وفق التكامل الاستراتيجي والجغرافي."
    }
  },
  {
    category: { fr: "Partenariats", en: "Partnerships", ar: "الشراكات" },
    question: {
      fr: "Travaillez-vous avec des investisseurs internationaux ?",
      en: "Do you work with international investors?",
      ar: "هل تتعاملون مع مستثمرين دوليين؟"
    },
    answer: {
      fr: "Oui, VIT GLOBAL entretient des relations avec des investisseurs et fonds intéressés par la tech africaine. Contactez notre direction générale via le formulaire Partenaires.",
      en: "Yes, VIT GLOBAL maintains relationships with investors and funds interested in African tech. Contact our executive team via the Partners form.",
      ar: "نعم، تحافظ VIT GLOBAL على علاقات مع مستثمرين وصناديق مهتمة بالتكنولوجيا الأفريقية. تواصلوا مع إدارتنا العامة عبر نموذج الشركاء."
    }
  },
  {
    category: { fr: "Carrières", en: "Careers", ar: "الوظائف" },
    question: {
      fr: "Comment postuler à une offre d'emploi ?",
      en: "How do I apply for a job opening?",
      ar: "كيف أتقدم لوظيفة شاغرة؟"
    },
    answer: {
      fr: "Consultez nos offres sur la page Carrières et postulez directement en ligne avec votre CV et votre portfolio ou profil LinkedIn.",
      en: "Browse our openings on the Careers page and apply directly online with your resume and portfolio or LinkedIn profile.",
      ar: "تصفح عروض العمل في صفحة الوظائف وتقدم مباشرة عبر الإنترنت مع سيرتك الذاتية ومعرض أعمالك أو ملفك على LinkedIn."
    }
  },
  {
    category: { fr: "Sécurité", en: "Security", ar: "الأمن" },
    question: {
      fr: "Comment protégez-vous les données de vos clients ?",
      en: "How do you protect your clients' data?",
      ar: "كيف تحمون بيانات عملائكم؟"
    },
    answer: {
      fr: "Chiffrement systématique, hébergement sécurisé, accès restreints par rôle et audits de sécurité réguliers font partie de nos standards, conformes aux meilleures pratiques internationales.",
      en: "Systematic encryption, secure hosting, role-based access restrictions and regular security audits are part of our standards, aligned with international best practices.",
      ar: "التشفير المنهجي، الاستضافة الآمنة، تقييد الوصول حسب الأدوار والتدقيق الأمني المنتظم جزء من معاييرنا المتوافقة مع أفضل الممارسات الدولية."
    }
  }
];
