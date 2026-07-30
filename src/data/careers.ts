import type { Localized } from "./types";

export interface JobOpening {
  slug: string;
  department: Localized<string>;
  location: Localized<string>;
  type: Localized<string>;
  title: Localized<string>;
  description: Localized<string>;
  requirements: Localized<string[]>;
}

export const jobOpenings: JobOpening[] = [
  {
    slug: "ingenieur-full-stack-senior",
    department: { fr: "Développement", en: "Development", ar: "التطوير" },
    location: { fr: "Casablanca / Abidjan / Hybride", en: "Casablanca / Abidjan / Hybrid", ar: "الدار البيضاء / أبيدجان / هجين" },
    type: { fr: "CDI", en: "Full-time", ar: "دوام كامل" },
    title: {
      fr: "Ingénieur·e Full Stack Senior (React / Node.js)",
      en: "Senior Full Stack Engineer (React / Node.js)",
      ar: "مهندس/ة برمجيات متكامل أول (React / Node.js)"
    },
    description: {
      fr: "Vous concevrez et développerez des plateformes web et mobiles pour nos clients internationaux, au sein d'équipes agiles pluridisciplinaires.",
      en: "You will design and build web and mobile platforms for our international clients within multidisciplinary agile teams.",
      ar: "ستصمم/ين وتطور/ين منصات ويب وجوال لعملائنا الدوليين ضمن فرق رشيقة متعددة التخصصات."
    },
    requirements: {
      fr: ["5+ ans d'expérience Full Stack", "Maîtrise de React, Node.js, TypeScript", "Expérience en architecture cloud", "Anglais professionnel"],
      en: ["5+ years of Full Stack experience", "Proficiency in React, Node.js, TypeScript", "Experience with cloud architecture", "Professional English"],
      ar: ["خبرة 5 سنوات فأكثر في التطوير المتكامل", "إتقان React وNode.js وTypeScript", "خبرة في البنية السحابية", "إنجليزية مهنية"]
    }
  },
  {
    slug: "expert-cybersecurite",
    department: { fr: "Cybersécurité", en: "Cybersecurity", ar: "الأمن السيبراني" },
    location: { fr: "Casablanca / Abidjan", en: "Casablanca / Abidjan", ar: "الدار البيضاء / أبيدجان" },
    type: { fr: "CDI", en: "Full-time", ar: "دوام كامل" },
    title: {
      fr: "Expert·e Cybersécurité & Pentest",
      en: "Cybersecurity & Pentest Expert",
      ar: "خبير/ة أمن سيبراني واختبار اختراق"
    },
    description: {
      fr: "Vous piloterez les audits de sécurité, tests d'intrusion et la mise en conformité de nos clients grands comptes.",
      en: "You will lead security audits, penetration tests and compliance efforts for our key accounts.",
      ar: "ستقود/ين عمليات التدقيق الأمني واختبارات الاختراق وجهود الامتثال لعملائنا الكبار."
    },
    requirements: {
      fr: ["Certification OSCP / CEH appréciée", "Expérience en pentest applicatif & réseau", "Bonne connaissance ISO 27001", "Esprit d'analyse et rigueur"],
      en: ["OSCP / CEH certification a plus", "Experience in application & network pentesting", "Good knowledge of ISO 27001", "Analytical mindset and rigor"],
      ar: ["يُفضل شهادة OSCP / CEH", "خبرة في اختبار اختراق التطبيقات والشبكات", "معرفة جيدة بمعيار ISO 27001", "روح تحليلية ودقة"]
    }
  },
  {
    slug: "data-scientist-ia",
    department: { fr: "Data & IA", en: "Data & AI", ar: "البيانات والذكاء الاصطناعي" },
    location: { fr: "Casablanca / Abidjan / Télétravail", en: "Casablanca / Abidjan / Remote", ar: "الدار البيضاء / أبيدجان / عن بُعد" },
    type: { fr: "CDI", en: "Full-time", ar: "دوام كامل" },
    title: {
      fr: "Data Scientist / Ingénieur·e IA",
      en: "Data Scientist / AI Engineer",
      ar: "عالم بيانات / مهندس ذكاء اصطناعي"
    },
    description: {
      fr: "Vous concevrez des modèles de machine learning et des solutions d'IA appliquée pour des cas d'usage métiers concrets.",
      en: "You will design machine learning models and applied AI solutions for concrete business use cases.",
      ar: "ستصمم/ين نماذج تعلم آلي وحلول ذكاء اصطناعي تطبيقية لحالات استخدام تجارية ملموسة."
    },
    requirements: {
      fr: ["Master en data science / IA ou équivalent", "Python, PyTorch/TensorFlow", "Expérience en mise en production de modèles", "Anglais technique"],
      en: ["Master's in data science / AI or equivalent", "Python, PyTorch/TensorFlow", "Experience deploying models to production", "Technical English"],
      ar: ["ماجستير في علم البيانات / الذكاء الاصطناعي أو ما يعادله", "Python وPyTorch/TensorFlow", "خبرة في نشر النماذج للإنتاج", "إنجليزية تقنية"]
    }
  },
  {
    slug: "product-designer-ui-ux",
    department: { fr: "Design", en: "Design", ar: "التصميم" },
    location: { fr: "Casablanca / Abidjan / Hybride", en: "Casablanca / Abidjan / Hybrid", ar: "الدار البيضاء / أبيدجان / هجين" },
    type: { fr: "CDI", en: "Full-time", ar: "دوام كامل" },
    title: {
      fr: "Product Designer UI/UX",
      en: "UI/UX Product Designer",
      ar: "مصمم/ة منتج UI/UX"
    },
    description: {
      fr: "Vous concevrez des expériences digitales intuitives, du wireframe au design system, en étroite collaboration avec les équipes produit.",
      en: "You will design intuitive digital experiences, from wireframe to design system, in close collaboration with product teams.",
      ar: "ستصمم/ين تجارب رقمية بديهية، من الإطار الشبكي إلى نظام التصميم، بالتعاون الوثيق مع فرق المنتج."
    },
    requirements: {
      fr: ["3+ ans en UI/UX design", "Maîtrise de Figma", "Portfolio démontrant une approche centrée utilisateur", "Sensibilité à l'accessibilité"],
      en: ["3+ years in UI/UX design", "Figma proficiency", "Portfolio demonstrating user-centered approach", "Accessibility awareness"],
      ar: ["خبرة 3 سنوات فأكثر في تصميم UI/UX", "إتقان Figma", "معرض أعمال يظهر نهجًا محوره المستخدم", "وعي بإمكانية الوصول"]
    }
  },
  {
    slug: "consultant-transformation-digitale",
    department: { fr: "Conseil", en: "Consulting", ar: "الاستشارات" },
    location: { fr: "Casablanca / Abidjan / Déplacements", en: "Casablanca / Abidjan / Travel required", ar: "الدار البيضاء / أبيدجان / يتطلب تنقل" },
    type: { fr: "CDI", en: "Full-time", ar: "دوام كامل" },
    title: {
      fr: "Consultant·e Senior Transformation Digitale",
      en: "Senior Digital Transformation Consultant",
      ar: "مستشار/ة أول للتحول الرقمي"
    },
    description: {
      fr: "Vous accompagnerez nos clients grands comptes dans la définition et le pilotage de leur stratégie de transformation digitale.",
      en: "You will support our key accounts in defining and steering their digital transformation strategy.",
      ar: "سترافق/ين عملاءنا الكبار في تحديد وقيادة استراتيجية التحول الرقمي الخاصة بهم."
    },
    requirements: {
      fr: ["5+ ans en conseil ou direction de projets digitaux", "Excellentes capacités de communication", "Expérience internationale appréciée", "Français et anglais courants"],
      en: ["5+ years in consulting or digital project leadership", "Excellent communication skills", "International experience a plus", "Fluent French and English"],
      ar: ["خبرة 5 سنوات فأكثر في الاستشارات أو قيادة المشاريع الرقمية", "مهارات تواصل ممتازة", "يُفضل خبرة دولية", "إتقان الفرنسية والإنجليزية"]
    }
  },
  {
    slug: "chef-de-projet-devops",
    department: { fr: "DevOps", en: "DevOps", ar: "DevOps" },
    location: { fr: "Casablanca / Abidjan / Télétravail", en: "Casablanca / Abidjan / Remote", ar: "الدار البيضاء / أبيدجان / عن بُعد" },
    type: { fr: "CDI", en: "Full-time", ar: "دوام كامل" },
    title: {
      fr: "Ingénieur·e DevOps / SRE",
      en: "DevOps / SRE Engineer",
      ar: "مهندس/ة DevOps / SRE"
    },
    description: {
      fr: "Vous industrialiserez nos pipelines de déploiement et garantirez la fiabilité de nos infrastructures et de celles de nos clients.",
      en: "You will industrialize our deployment pipelines and ensure the reliability of our infrastructure and that of our clients.",
      ar: "ستعملون/ين على تصنيع خطوط النشر لدينا وضمان موثوقية بنيتنا التحتية وبنية عملائنا."
    },
    requirements: {
      fr: ["Expérience CI/CD, Docker, Kubernetes", "Maîtrise d'un cloud provider majeur", "Culture Infrastructure as Code", "Astreinte occasionnelle"],
      en: ["CI/CD, Docker, Kubernetes experience", "Proficiency with a major cloud provider", "Infrastructure as Code culture", "Occasional on-call"],
      ar: ["خبرة في CI/CD وDocker وKubernetes", "إتقان مزود سحابي رئيسي", "ثقافة البنية التحتية ككود", "مناوبة طوارئ أحيانًا"]
    }
  }
];

export function getJobBySlug(slug: string) {
  return jobOpenings.find((job) => job.slug === slug);
}
