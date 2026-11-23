import type { Localized } from "./types";
import { CONTACT_EMAIL, CONTACT_PHONES } from "@/lib/contact";

/**
 * Identifiants légaux de la société. ⚠ À RENSEIGNER par la direction (extrait du registre de commerce) :
 * une valeur `null` n'est simplement pas affichée — rien n'est inventé.
 */
export const companyLegal = {
  name: "VIT GLOBAL TECHNOLOGIES GROUP",
  legalForm: "SARLU",
  address: "Boulevard Lalla Yacout & Rue El Arrar, Résidence Galis, Casablanca, Maroc",
  publicationDirector: "Manasse N'Dri",
  capital: null as string | null, // ex. "100 000 MAD"
  rc: null as string | null, // Registre du commerce de Casablanca, n°
  ice: null as string | null, // Identifiant commun de l'entreprise
  fiscalId: null as string | null, // Identifiant fiscal (IF)
  cndpReference: null as string | null // n° de récépissé de déclaration / autorisation CNDP
};

export interface LegalSection {
  title: Localized<string>;
  paragraphs: Localized<string[]>;
}

export interface LegalDocument {
  slug: "mentions-legales" | "confidentialite" | "conditions-utilisation";
  title: Localized<string>;
  description: Localized<string>;
  updatedAt: string;
  sections: LegalSection[];
}

const phones = CONTACT_PHONES.map((p) => p.label).join(" / ");

function identifiers(): Localized<string[]> {
  const rows: [Localized<string>, string | null][] = [
    [{ fr: "Capital social", en: "Share capital", ar: "رأس المال" }, companyLegal.capital],
    [{ fr: "Registre du commerce", en: "Trade register", ar: "السجل التجاري" }, companyLegal.rc],
    [{ fr: "ICE", en: "ICE (company identifier)", ar: "التعريف الموحد للمقاولة (ICE)" }, companyLegal.ice],
    [{ fr: "Identifiant fiscal", en: "Tax identifier", ar: "التعريف الضريبي" }, companyLegal.fiscalId]
  ];
  const filled = rows.filter(([, value]) => value);
  return {
    fr: filled.map(([label, value]) => `${label.fr} : ${value}`),
    en: filled.map(([label, value]) => `${label.en}: ${value}`),
    ar: filled.map(([label, value]) => `${label.ar}: ${value}`)
  };
}

const ids = identifiers();

export const legalDocuments: LegalDocument[] = [
  {
    slug: "mentions-legales",
    title: { fr: "Mentions légales", en: "Legal notice", ar: "الإشعار القانوني" },
    description: {
      fr: "Éditeur, hébergement et propriété intellectuelle du site vit-global.tech.",
      en: "Publisher, hosting and intellectual property of the vit-global.tech website.",
      ar: "ناشر موقع vit-global.tech واستضافته والملكية الفكرية."
    },
    updatedAt: "2026-11-23",
    sections: [
      {
        title: { fr: "Éditeur du site", en: "Website publisher", ar: "ناشر الموقع" },
        paragraphs: {
          fr: [
            `${companyLegal.name}, ${companyLegal.legalForm} (société à responsabilité limitée à associé unique) de droit marocain.`,
            `Siège social : ${companyLegal.address}.`,
            ...ids.fr,
            `Contact : ${CONTACT_EMAIL} — ${phones}.`,
            `Directeur de la publication : ${companyLegal.publicationDirector}.`
          ],
          en: [
            `${companyLegal.name}, ${companyLegal.legalForm} (single-member limited liability company) incorporated under Moroccan law.`,
            `Registered office: ${companyLegal.address}.`,
            ...ids.en,
            `Contact: ${CONTACT_EMAIL} — ${phones}.`,
            `Publication director: ${companyLegal.publicationDirector}.`
          ],
          ar: [
            `${companyLegal.name}، شركة ذات مسؤولية محدودة بشريك وحيد (${companyLegal.legalForm}) خاضعة للقانون المغربي.`,
            `المقر الاجتماعي: ${companyLegal.address}.`,
            ...ids.ar,
            `للتواصل: ${CONTACT_EMAIL} — ${phones}.`,
            `مدير النشر: ${companyLegal.publicationDirector}.`
          ]
        }
      },
      {
        title: { fr: "Hébergement", en: "Hosting", ar: "الاستضافة" },
        paragraphs: {
          fr: ["Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com."],
          en: ["The website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States — vercel.com."],
          ar: ["يستضيف الموقع Vercel Inc.، \u200F440 N Barranca Ave #4133، Covina، CA 91723، الولايات المتحدة — vercel.com."]
        }
      },
      {
        title: { fr: "Propriété intellectuelle", en: "Intellectual property", ar: "الملكية الفكرية" },
        paragraphs: {
          fr: [
            "Les contenus du site (textes, logos, visuels, code) sont la propriété de VIT GLOBAL TECHNOLOGIES GROUP ou utilisés avec autorisation. Toute reproduction sans accord écrit préalable est interdite.",
            "Les noms et marques de produits du groupe (notamment VIT AUTO, KORVA OS, MARGOKIT, VITPAY) restent la propriété de VIT GLOBAL TECHNOLOGIES GROUP. Les marques de tiers citées appartiennent à leurs titulaires respectifs."
          ],
          en: [
            "The website content (texts, logos, visuals, code) is owned by VIT GLOBAL TECHNOLOGIES GROUP or used with permission. Any reproduction without prior written consent is prohibited.",
            "The group's product names and brands (including VIT AUTO, KORVA OS, MARGOKIT, VITPAY) remain the property of VIT GLOBAL TECHNOLOGIES GROUP. Third-party trademarks mentioned belong to their respective owners."
          ],
          ar: [
            "محتويات الموقع (النصوص والشعارات والصور والشيفرة) مملوكة لـ VIT GLOBAL TECHNOLOGIES GROUP أو مستعملة بإذن. يُمنع أي نسخ دون موافقة كتابية مسبقة.",
            "تظل أسماء منتجات المجموعة وعلاماتها (ولا سيما VIT AUTO وKORVA OS وMARGOKIT وVITPAY) ملكًا لـ VIT GLOBAL TECHNOLOGIES GROUP. أما العلامات التجارية للغير المذكورة فهي ملك لأصحابها."
          ]
        }
      },
      {
        title: { fr: "Responsabilité", en: "Liability", ar: "المسؤولية" },
        paragraphs: {
          fr: ["Les informations du site sont fournies à titre indicatif. Les tarifs affichés sont des prix « à partir de » ; seul un devis signé engage les parties."],
          en: ["Information on the website is provided for guidance only. Displayed prices are \"starting from\" prices; only a signed quote is binding on the parties."],
          ar: ["تُقدَّم معلومات الموقع على سبيل الإرشاد. الأسعار المعروضة أسعار «ابتداءً من»، ولا يُلزم الطرفين إلا عرض سعر موقّع."]
        }
      }
    ]
  },
  {
    slug: "confidentialite",
    title: { fr: "Politique de confidentialité", en: "Privacy policy", ar: "سياسة الخصوصية" },
    description: {
      fr: "Données personnelles collectées sur vit-global.tech, finalités, destinataires, durées de conservation et droits.",
      en: "Personal data collected on vit-global.tech, purposes, recipients, retention periods and rights.",
      ar: "البيانات الشخصية المجمعة على vit-global.tech وأغراضها والجهات المتلقية ومدد الاحتفاظ والحقوق."
    },
    updatedAt: "2026-11-23",
    sections: [
      {
        title: { fr: "Responsable du traitement", en: "Data controller", ar: "المسؤول عن المعالجة" },
        paragraphs: {
          fr: [
            `${companyLegal.name} (${companyLegal.address}) est responsable des traitements décrits ci-dessous, réalisés conformément à la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.`,
            ...(companyLegal.cndpReference ? [`Référence CNDP : ${companyLegal.cndpReference}.`] : []),
            `Contact pour toute question relative à vos données : ${CONTACT_EMAIL}.`
          ],
          en: [
            `${companyLegal.name} (${companyLegal.address}) is the controller of the processing described below, carried out in accordance with Moroccan Law No. 09-08 on the protection of individuals with regard to the processing of personal data.`,
            ...(companyLegal.cndpReference ? [`CNDP reference: ${companyLegal.cndpReference}.`] : []),
            `Contact for any question about your data: ${CONTACT_EMAIL}.`
          ],
          ar: [
            `تُعد ${companyLegal.name} (${companyLegal.address}) مسؤولة عن المعالجات الموضحة أدناه، والتي تتم وفقًا للقانون رقم 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي.`,
            ...(companyLegal.cndpReference ? [`مرجع اللجنة الوطنية لمراقبة حماية المعطيات (CNDP): ${companyLegal.cndpReference}.`] : []),
            `للتواصل بخصوص بياناتكم: ${CONTACT_EMAIL}.`
          ]
        }
      },
      {
        title: { fr: "Données collectées et finalités", en: "Data collected and purposes", ar: "البيانات المجمعة وأغراضها" },
        paragraphs: {
          fr: [
            "Formulaires de contact, de devis, de rendez-vous, de partenariat, de candidature et chat : identité, coordonnées (e-mail, téléphone), entreprise, pays, contenu de votre demande et, le cas échéant, document joint ou liens (portfolio, LinkedIn). Finalité : répondre à votre demande, établir un devis, organiser un rendez-vous, étudier une candidature ou un partenariat.",
            "Espace client et partenaire : nom, e-mail, mot de passe (stocké uniquement sous forme chiffrée irréversible), ou identifiant fourni par Google, Microsoft ou LinkedIn si vous choisissez ce mode de connexion. Finalité : vous donner accès au suivi de vos demandes.",
            "Signature électronique d'un devis : nom, e-mail, date et heure, adresse IP, navigateur et empreinte numérique du document signé. Finalité : conserver la preuve de votre acceptation.",
            "Sécurité : adresse IP, conservée au plus 24 heures, pour limiter les envois abusifs. Pays de connexion (déduit par notre hébergeur, sans conservation) pour proposer la devise d'affichage."
          ],
          en: [
            "Contact, quote, appointment, partnership, job application and chat forms: identity, contact details (email, phone), company, country, the content of your request and, where applicable, an attached document or links (portfolio, LinkedIn). Purpose: to answer your request, prepare a quote, organise an appointment, or review an application or partnership.",
            "Client and partner areas: name, email, password (stored only in irreversibly hashed form), or the identifier provided by Google, Microsoft or LinkedIn if you choose that sign-in method. Purpose: to give you access to the follow-up of your requests.",
            "Electronic signature of a quote: name, email, date and time, IP address, browser and digital fingerprint of the signed document. Purpose: to keep evidence of your acceptance.",
            "Security: IP address, kept for no more than 24 hours, to limit abusive submissions. Country of connection (derived by our hosting provider, not stored) to suggest the display currency."
          ],
          ar: [
            "استمارات الاتصال وطلب عرض السعر والمواعيد والشراكة والترشيح والدردشة: الهوية ووسائل الاتصال (البريد الإلكتروني والهاتف) والشركة والبلد ومضمون طلبكم، وعند الاقتضاء وثيقة مرفقة أو روابط (ملف الأعمال، لينكدإن). الغرض: الرد على طلبكم أو إعداد عرض سعر أو تنظيم موعد أو دراسة ترشيح أو شراكة.",
            "مساحة العملاء والشركاء: الاسم والبريد الإلكتروني وكلمة المرور (تُحفظ فقط في صيغة مشفرة غير قابلة للاسترجاع)، أو المعرّف الذي يقدمه Google أو Microsoft أو LinkedIn إذا اخترتم طريقة الدخول هذه. الغرض: تمكينكم من متابعة طلباتكم.",
            "التوقيع الإلكتروني لعرض سعر: الاسم والبريد الإلكتروني وتاريخ ووقت التوقيع وعنوان IP والمتصفح والبصمة الرقمية للوثيقة الموقعة. الغرض: الاحتفاظ بدليل موافقتكم.",
            "الأمن: عنوان IP، يُحتفظ به 24 ساعة على الأكثر، للحد من الإرسال التعسفي. بلد الاتصال (يستنتجه مزود الاستضافة دون حفظه) لاقتراح عملة العرض."
          ]
        }
      },
      {
        title: { fr: "Destinataires et sous-traitants", en: "Recipients and processors", ar: "الجهات المتلقية والمتعاقدون من الباطن" },
        paragraphs: {
          fr: [
            "Vos données sont destinées aux seules équipes habilitées de VIT GLOBAL TECHNOLOGIES GROUP. Elles ne sont ni vendues ni louées.",
            "Prestataires techniques intervenant pour notre compte : Vercel (hébergement du site), notre fournisseur de base de données, notre service de messagerie électronique (envoi des e-mails), Twilio (notifications WhatsApp, si utilisées), Google et Microsoft (connexion et agenda, si utilisés). Certains de ces prestataires sont situés hors du Maroc, notamment aux États-Unis ; ces transferts sont limités à ce qui est nécessaire au service."
          ],
          en: [
            "Your data is intended only for authorised teams of VIT GLOBAL TECHNOLOGIES GROUP. It is neither sold nor rented.",
            "Technical providers acting on our behalf: Vercel (website hosting), our database provider, our email service (sending emails), Twilio (WhatsApp notifications, if used), Google and Microsoft (sign-in and calendar, if used). Some of these providers are located outside Morocco, notably in the United States; these transfers are limited to what is necessary for the service."
          ],
          ar: [
            "بياناتكم موجهة حصريًا إلى الفرق المخولة داخل VIT GLOBAL TECHNOLOGIES GROUP، ولا تُباع ولا تُؤجَّر.",
            "مزودو الخدمات التقنية العاملون لحسابنا: Vercel (استضافة الموقع)، ومزود قاعدة البيانات، وخدمة البريد الإلكتروني (إرسال الرسائل)، وTwilio (إشعارات واتساب إن استُعملت)، وGoogle وMicrosoft (تسجيل الدخول والتقويم إن استُعملا). يوجد بعض هؤلاء المزودين خارج المغرب، ولا سيما في الولايات المتحدة، وتقتصر هذه التحويلات على ما هو ضروري للخدمة."
          ]
        }
      },
      {
        title: { fr: "Durées de conservation", en: "Retention periods", ar: "مدد الاحتفاظ" },
        paragraphs: {
          fr: [
            "Demandes sans suite (contact, devis, rendez-vous, chat, partenariat) : 3 ans à compter du dernier échange. Candidatures : 2 ans. Compte client ou partenaire : jusqu'à sa suppression, puis 3 ans pour les demandes associées. Devis signés et preuves de signature : 10 ans, au titre des obligations commerciales et comptables. Données de sécurité (adresses IP) : 24 heures."
          ],
          en: [
            "Requests with no follow-up (contact, quote, appointment, chat, partnership): 3 years from the last exchange. Job applications: 2 years. Client or partner account: until it is deleted, then 3 years for related requests. Signed quotes and signature evidence: 10 years, under commercial and accounting obligations. Security data (IP addresses): 24 hours."
          ],
          ar: [
            "الطلبات التي لم تُتابَع (الاتصال، عروض الأسعار، المواعيد، الدردشة، الشراكة): 3 سنوات من آخر تواصل. الترشيحات: سنتان. حساب العميل أو الشريك: إلى حين حذفه، ثم 3 سنوات للطلبات المرتبطة به. عروض الأسعار الموقعة وأدلة التوقيع: 10 سنوات وفاءً بالالتزامات التجارية والمحاسبية. بيانات الأمن (عناوين IP): 24 ساعة."
          ]
        }
      },
      {
        title: { fr: "Cookies et stockage local", en: "Cookies and local storage", ar: "ملفات تعريف الارتباط والتخزين المحلي" },
        paragraphs: {
          fr: [
            "Le site n'utilise ni cookie publicitaire ni outil de mesure d'audience tiers. Seuls sont déposés des éléments strictement nécessaires : cookie de langue, cookies de session de l'espace client et de l'administration, cookie de sécurité temporaire lors de la connexion d'un agenda, et mémorisation locale de la devise d'affichage choisie."
          ],
          en: [
            "The website uses no advertising cookies and no third-party analytics. Only strictly necessary items are set: language cookie, session cookies for the client area and administration, a temporary security cookie when connecting a calendar, and local storage of your chosen display currency."
          ],
          ar: [
            "لا يستعمل الموقع أي ملفات تعريف ارتباط إعلانية ولا أدوات قياس جمهور تابعة للغير. لا يُخزَّن إلا ما هو ضروري: ملف تعريف اللغة، وملفات جلسة مساحة العملاء والإدارة، وملف أمان مؤقت عند ربط التقويم، والحفظ المحلي لعملة العرض المختارة."
          ]
        }
      },
      {
        title: { fr: "Vos droits", en: "Your rights", ar: "حقوقكم" },
        paragraphs: {
          fr: [
            `Conformément à la loi n° 09-08, vous disposez d'un droit d'accès, de rectification et d'opposition, pour motif légitime, au traitement de vos données. Pour l'exercer, écrivez à ${CONTACT_EMAIL} en précisant l'objet de votre demande ; une réponse vous sera apportée dans les meilleurs délais.`,
            "Vous pouvez également saisir la Commission nationale de contrôle de la protection des données à caractère personnel (CNDP) — www.cndp.ma."
          ],
          en: [
            `Under Law No. 09-08, you have the right to access and rectify your data and to object, on legitimate grounds, to its processing. To exercise these rights, write to ${CONTACT_EMAIL} stating the purpose of your request; we will reply as soon as possible.`,
            "You may also contact the Moroccan data protection authority (CNDP) — www.cndp.ma."
          ],
          ar: [
            `وفقًا للقانون رقم 09-08، لكم الحق في الولوج إلى بياناتكم وتصحيحها والتعرض لمعالجتها لأسباب مشروعة. لممارسة هذه الحقوق، راسلونا على ${CONTACT_EMAIL} مع تحديد موضوع طلبكم، وسنرد عليكم في أقرب الآجال.`,
            "يمكنكم أيضًا التوجه إلى اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي (CNDP) — www.cndp.ma."
          ]
        }
      }
    ]
  },
  {
    slug: "conditions-utilisation",
    title: { fr: "Conditions d'utilisation", en: "Terms of use", ar: "شروط الاستخدام" },
    description: {
      fr: "Règles d'utilisation du site vit-global.tech et de ses espaces en ligne.",
      en: "Rules for using the vit-global.tech website and its online areas.",
      ar: "قواعد استخدام موقع vit-global.tech ومساحاته الإلكترونية."
    },
    updatedAt: "2026-11-23",
    sections: [
      {
        title: { fr: "Objet", en: "Purpose", ar: "الموضوع" },
        paragraphs: {
          fr: ["Les présentes conditions encadrent l'utilisation du site vit-global.tech, édité par VIT GLOBAL TECHNOLOGIES GROUP, ainsi que de ses espaces client et partenaire. L'utilisation du site vaut acceptation de ces conditions."],
          en: ["These terms govern the use of the vit-global.tech website, published by VIT GLOBAL TECHNOLOGIES GROUP, and of its client and partner areas. Using the website implies acceptance of these terms."],
          ar: ["تنظم هذه الشروط استخدام موقع vit-global.tech الذي تنشره VIT GLOBAL TECHNOLOGIES GROUP، وكذا مساحتي العملاء والشركاء. يُعد استخدام الموقع قبولًا لهذه الشروط."]
        }
      },
      {
        title: { fr: "Comptes en ligne", en: "Online accounts", ar: "الحسابات الإلكترونية" },
        paragraphs: {
          fr: ["L'accès à l'espace client ou partenaire nécessite une adresse e-mail confirmée. Vous êtes responsable de la confidentialité de votre mot de passe et des liens personnels qui vous sont adressés (notamment les liens de signature). L'accès aux ressources partenaires est soumis à validation par nos équipes."],
          en: ["Access to the client or partner area requires a confirmed email address. You are responsible for keeping your password and the personal links sent to you (including signature links) confidential. Access to partner resources is subject to approval by our teams."],
          ar: ["يتطلب الولوج إلى مساحة العملاء أو الشركاء عنوان بريد إلكتروني مؤكدًا. أنتم مسؤولون عن سرية كلمة المرور والروابط الشخصية المرسلة إليكم (ولا سيما روابط التوقيع). يخضع الولوج إلى موارد الشركاء لمصادقة فرقنا."]
        }
      },
      {
        title: { fr: "Devis et signature électronique", en: "Quotes and electronic signature", ar: "عروض الأسعار والتوقيع الإلكتروني" },
        paragraphs: {
          fr: ["Les tarifs publiés sont indicatifs. Une proposition n'engage VIT GLOBAL TECHNOLOGIES GROUP qu'une fois émise par ses équipes et acceptée par le client. L'acceptation en ligne repose sur une signature électronique simple : nom, e-mail, horodatage, adresse IP et empreinte du document sont conservés à titre de preuve."],
          en: ["Published prices are for guidance only. A proposal binds VIT GLOBAL TECHNOLOGIES GROUP only once issued by its teams and accepted by the client. Online acceptance relies on a simple electronic signature: name, email, timestamp, IP address and document fingerprint are kept as evidence."],
          ar: ["الأسعار المنشورة استرشادية. لا يُلزم العرضُ VIT GLOBAL TECHNOLOGIES GROUP إلا بعد إصداره من فرقها وقبوله من العميل. يعتمد القبول عبر الإنترنت على توقيع إلكتروني بسيط، ويُحتفظ بالاسم والبريد الإلكتروني والتوقيت وعنوان IP وبصمة الوثيقة كدليل."]
        }
      },
      {
        title: { fr: "Usage acceptable", en: "Acceptable use", ar: "الاستخدام المقبول" },
        paragraphs: {
          fr: ["Il est interdit d'utiliser les formulaires pour envoyer des contenus illicites, des envois automatisés ou massifs, ou des fichiers malveillants, et de tenter d'accéder à des données ou espaces qui ne vous sont pas destinés. Les envois abusifs sont automatiquement limités."],
          en: ["You may not use the forms to send unlawful content, automated or bulk submissions or malicious files, nor attempt to access data or areas not intended for you. Abusive submissions are automatically limited."],
          ar: ["يُمنع استعمال الاستمارات لإرسال محتويات غير مشروعة أو إرسالات آلية أو جماعية أو ملفات ضارة، أو محاولة الولوج إلى بيانات أو مساحات غير موجهة إليكم. يتم الحد تلقائيًا من الإرسالات التعسفية."]
        }
      },
      {
        title: { fr: "Droit applicable", en: "Governing law", ar: "القانون المطبق" },
        paragraphs: {
          fr: ["Les présentes conditions sont régies par le droit marocain. À défaut de résolution amiable, tout litige relève des tribunaux compétents de Casablanca."],
          en: ["These terms are governed by Moroccan law. Failing an amicable settlement, any dispute falls within the jurisdiction of the competent courts of Casablanca."],
          ar: ["تخضع هذه الشروط للقانون المغربي. وفي حال تعذر الحل الودي، يختص بالنظر في أي نزاع محاكم الدار البيضاء المختصة."]
        }
      }
    ]
  }
];

export function getLegalDocument(slug: string) {
  return legalDocuments.find((doc) => doc.slug === slug);
}
