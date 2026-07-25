import type { Localized } from "./types";

export interface TeamMember {
  name: string;
  role: Localized<string>;
  bio: Localized<string>;
  initials: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Manasse N'Dri",
    role: { fr: "Fondateur & Directeur Général", en: "Founder & CEO", ar: "المؤسس والمدير العام" },
    bio: {
      fr: "Vision stratégique et pilotage international du groupe, avec plus de 15 ans d'expérience en technologie et transformation digitale.",
      en: "Strategic vision and international leadership of the group, with over 15 years of experience in technology and digital transformation.",
      ar: "رؤية استراتيجية وقيادة دولية للمجموعة، بخبرة تفوق 15 عامًا في التكنولوجيا والتحول الرقمي."
    },
    initials: "MN"
  },
  {
    name: "Aïcha Koné",
    role: { fr: "Directrice IA & Data", en: "Head of AI & Data", ar: "مديرة الذكاء الاصطناعي والبيانات" },
    bio: {
      fr: "Pilote la stratégie et les projets d'intelligence artificielle appliquée pour l'ensemble des clients du groupe.",
      en: "Leads the strategy and applied artificial intelligence projects for all of the group's clients.",
      ar: "تقود استراتيجية ومشاريع الذكاء الاصطناعي التطبيقي لجميع عملاء المجموعة."
    },
    initials: "AK"
  },
  {
    name: "Yannick Bamba",
    role: { fr: "Responsable Cybersécurité", en: "Head of Cybersecurity", ar: "مسؤول الأمن السيبراني" },
    bio: {
      fr: "Expert en sécurité offensive et défensive, garant de la protection des systèmes clients et internes.",
      en: "Expert in offensive and defensive security, guaranteeing the protection of client and internal systems.",
      ar: "خبير في الأمن الهجومي والدفاعي، يضمن حماية أنظمة العملاء والأنظمة الداخلية."
    },
    initials: "YB"
  },
  {
    name: "Mohamed El Amrani",
    role: { fr: "Architecte Cloud Principal", en: "Principal Cloud Architect", ar: "كبير مهندسي الحوسبة السحابية" },
    bio: {
      fr: "Conçoit des architectures cloud robustes et scalables pour les projets les plus complexes du groupe.",
      en: "Designs robust, scalable cloud architectures for the group's most complex projects.",
      ar: "يصمم بنى سحابية متينة وقابلة للتوسع لأعقد مشاريع المجموعة."
    },
    initials: "ME"
  },
  {
    name: "Fatou Diarra",
    role: { fr: "Directrice des Talents", en: "Head of Talent", ar: "مديرة المواهب" },
    bio: {
      fr: "Attire et développe les talents technologiques et créatifs du groupe à l'échelle internationale.",
      en: "Attracts and develops the group's technology and creative talent on an international scale.",
      ar: "تجتذب وتطوّر المواهب التقنية والإبداعية للمجموعة على المستوى الدولي."
    },
    initials: "FD"
  },
  {
    name: "Julien Marchetti",
    role: { fr: "Directeur Commercial International", en: "International Sales Director", ar: "مدير المبيعات الدولية" },
    bio: {
      fr: "Développe les partenariats commerciaux du groupe en Europe et coordonne les relations investisseurs.",
      en: "Develops the group's commercial partnerships in Europe and coordinates investor relations.",
      ar: "يطوّر شراكات المجموعة التجارية في أوروبا وينسّق علاقات المستثمرين."
    },
    initials: "JM"
  }
];

export interface Partner {
  name: string;
  category: Localized<string>;
}

export const partners: Partner[] = [
  { name: "Amazon Web Services", category: { fr: "Partenaire Cloud", en: "Cloud Partner", ar: "شريك سحابي" } },
  { name: "Microsoft Azure", category: { fr: "Partenaire Cloud", en: "Cloud Partner", ar: "شريك سحابي" } },
  { name: "Google Cloud", category: { fr: "Partenaire Cloud", en: "Cloud Partner", ar: "شريك سحابي" } },
  { name: "Stripe", category: { fr: "Partenaire Paiement", en: "Payment Partner", ar: "شريك دفع" } },
  { name: "Orange Digital Ventures", category: { fr: "Partenaire Stratégique", en: "Strategic Partner", ar: "شريك استراتيجي" } },
  { name: "Salesforce", category: { fr: "Partenaire Technologique", en: "Technology Partner", ar: "شريك تقني" } },
  { name: "GitHub", category: { fr: "Partenaire Technologique", en: "Technology Partner", ar: "شريك تقني" } },
  { name: "Chambre de Commerce Internationale", category: { fr: "Partenaire Institutionnel", en: "Institutional Partner", ar: "شريك مؤسسي" } }
];

export interface Testimonial {
  quote: Localized<string>;
  author: string;
  role: Localized<string>;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: {
      fr: "VIT GLOBAL a transformé notre vision digitale en une plateforme concrète, livrée dans les temps et au-delà de nos attentes.",
      en: "VIT GLOBAL turned our digital vision into a concrete platform, delivered on time and beyond our expectations.",
      ar: "حوّلت VIT GLOBAL رؤيتنا الرقمية إلى منصة ملموسة، تم تسليمها في الوقت المحدد وفاقت توقعاتنا."
    },
    author: "Ibrahim Sow",
    role: { fr: "Directeur Général", en: "CEO", ar: "المدير العام" },
    company: "NovaBank Group"
  },
  {
    quote: {
      fr: "Une équipe réactive, experte et à l'écoute. Le meilleur partenaire technologique que nous ayons eu.",
      en: "A responsive, expert and attentive team. The best technology partner we've ever had.",
      ar: "فريق سريع الاستجابة وخبير ومنصت. أفضل شريك تقني تعاملنا معه."
    },
    author: "Amina Traoré",
    role: { fr: "COO", en: "COO", ar: "المديرة التنفيذية للعمليات" },
    company: "SoukPlus"
  },
  {
    quote: {
      fr: "Le niveau d'exigence de VIT GLOBAL en matière de sécurité nous a permis de passer notre certification sans réserve.",
      en: "VIT GLOBAL's rigor on security allowed us to pass our certification without a single reservation.",
      ar: "مستوى الدقة الذي تتحلى به VIT GLOBAL في الأمن مكّننا من اجتياز شهادتنا دون أي تحفظات."
    },
    author: "Claire Dubois",
    role: { fr: "DSI", en: "CIO", ar: "مديرة نظم المعلومات" },
    company: "MediLink Health"
  }
];

export interface CompanyValue {
  icon: string;
  title: Localized<string>;
  description: Localized<string>;
}

export const companyValues: CompanyValue[] = [
  {
    icon: "Target",
    title: { fr: "Excellence", en: "Excellence", ar: "التميّز" },
    description: {
      fr: "Nous visons l'excellence technique et créative dans chaque projet, sans compromis sur la qualité.",
      en: "We pursue technical and creative excellence in every project, without compromising on quality.",
      ar: "نسعى للتميز التقني والإبداعي في كل مشروع، دون أي تنازل عن الجودة."
    }
  },
  {
    icon: "ShieldCheck",
    title: { fr: "Intégrité", en: "Integrity", ar: "النزاهة" },
    description: {
      fr: "Transparence, honnêteté et respect de nos engagements guident chacune de nos relations.",
      en: "Transparency, honesty and respect for our commitments guide every one of our relationships.",
      ar: "الشفافية والصدق واحترام الالتزامات توجّه كل علاقاتنا."
    }
  },
  {
    icon: "Lightbulb",
    title: { fr: "Innovation", en: "Innovation", ar: "الابتكار" },
    description: {
      fr: "Nous explorons continuellement les technologies émergentes pour garder nos clients en avance.",
      en: "We continuously explore emerging technologies to keep our clients ahead of the curve.",
      ar: "نستكشف باستمرار التقنيات الناشئة لإبقاء عملائنا في الصدارة."
    }
  },
  {
    icon: "Users",
    title: { fr: "Collaboration", en: "Collaboration", ar: "التعاون" },
    description: {
      fr: "Nous construisons chaque succès main dans la main avec nos clients, partenaires et équipes.",
      en: "We build every success hand in hand with our clients, partners and teams.",
      ar: "نبني كل نجاح يدًا بيد مع عملائنا وشركائنا وفرقنا."
    }
  },
  {
    icon: "Globe2",
    title: { fr: "Vision internationale", en: "International vision", ar: "رؤية دولية" },
    description: {
      fr: "Nous pensons global dès la conception, pour des solutions qui s'exportent et s'adaptent partout.",
      en: "We think global from day one, for solutions that export and adapt everywhere.",
      ar: "نفكر عالميًا منذ التصميم، من أجل حلول قابلة للتصدير والتكيف في كل مكان."
    }
  },
  {
    icon: "Leaf",
    title: { fr: "Responsabilité", en: "Responsibility", ar: "المسؤولية" },
    description: {
      fr: "Nous mesurons l'impact de nos décisions sur nos collaborateurs, la société et l'environnement.",
      en: "We measure the impact of our decisions on our people, society and the environment.",
      ar: "نقيس أثر قراراتنا على موظفينا والمجتمع والبيئة."
    }
  }
];

export const companyStats = [
  { value: "120+", label: { fr: "collaborateurs", en: "employees", ar: "موظف" } },
  { value: "14", label: { fr: "pays d'intervention", en: "countries served", ar: "دولة" } },
  { value: "300+", label: { fr: "projets livrés", en: "projects delivered", ar: "مشروع منجز" } },
  { value: "98%", label: { fr: "satisfaction client", en: "client satisfaction", ar: "رضا العملاء" } }
];
