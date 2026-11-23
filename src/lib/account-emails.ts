import { sendMailTo } from "@/lib/mail";
import { escapeHtml } from "@/lib/security";
import { SITE_URL } from "@/lib/seo";
import type { Locale } from "@/data/types";

export function normalizeLocale(value: unknown): Locale {
  return value === "en" || value === "ar" ? value : "fr";
}

const VERIFY_COPY: Record<Locale, { subject: string; intro: string; button: string; outro: string }> = {
  fr: {
    subject: "Confirmez votre adresse e-mail — VIT GLOBAL TECHNOLOGIES GROUP",
    intro: "Merci d'avoir créé votre espace. Pour l'activer et accéder à vos demandes, confirmez votre adresse e-mail :",
    button: "Confirmer mon adresse e-mail",
    outro: "Ce lien est valable 48 heures. Si vous n'êtes pas à l'origine de cette inscription, ignorez simplement ce message."
  },
  en: {
    subject: "Confirm your email address — VIT GLOBAL TECHNOLOGIES GROUP",
    intro: "Thank you for creating your account. To activate it and access your requests, please confirm your email address:",
    button: "Confirm my email address",
    outro: "This link is valid for 48 hours. If you did not sign up, simply ignore this message."
  },
  ar: {
    subject: "تأكيد عنوان بريدكم الإلكتروني — VIT GLOBAL TECHNOLOGIES GROUP",
    intro: "شكرًا لإنشاء حسابكم. لتفعيله والوصول إلى طلباتكم، يرجى تأكيد عنوان بريدكم الإلكتروني:",
    button: "تأكيد عنوان البريد الإلكتروني",
    outro: "هذا الرابط صالح لمدة 48 ساعة. إذا لم تقوموا بالتسجيل، يرجى تجاهل هذه الرسالة."
  }
};

const RESET_COPY: Record<Locale, { subject: string; intro: string; button: string; outro: string }> = {
  fr: {
    subject: "Réinitialisation de votre mot de passe — VIT GLOBAL TECHNOLOGIES GROUP",
    intro: "Une demande de réinitialisation du mot de passe de votre espace a été effectuée. Pour choisir un nouveau mot de passe :",
    button: "Choisir un nouveau mot de passe",
    outro: "Ce lien est valable 1 heure et ne peut être utilisé qu'une fois. Si vous n'êtes pas à l'origine de cette demande, ignorez ce message : votre mot de passe reste inchangé."
  },
  en: {
    subject: "Reset your password — VIT GLOBAL TECHNOLOGIES GROUP",
    intro: "A password reset was requested for your account. To choose a new password:",
    button: "Choose a new password",
    outro: "This link is valid for 1 hour and can only be used once. If you did not request this, ignore this message: your password remains unchanged."
  },
  ar: {
    subject: "إعادة تعيين كلمة المرور — VIT GLOBAL TECHNOLOGIES GROUP",
    intro: "تم طلب إعادة تعيين كلمة مرور حسابكم. لاختيار كلمة مرور جديدة:",
    button: "اختيار كلمة مرور جديدة",
    outro: "هذا الرابط صالح لمدة ساعة واحدة ولا يمكن استخدامه إلا مرة واحدة. إذا لم تقوموا بهذا الطلب، يرجى تجاهل هذه الرسالة."
  }
};

function layout(locale: Locale, name: string | null | undefined, intro: string, url: string, button: string, outro: string) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const greeting = locale === "fr" ? "Bonjour" : locale === "en" ? "Hello" : "مرحبًا";
  return `<div dir="${dir}" style="font-family:Arial,sans-serif;line-height:1.6;color:#0b1730">
<p>${greeting}${name ? ` ${escapeHtml(name)}` : ""},</p>
<p>${intro}</p>
<p><a href="${escapeHtml(url)}" style="display:inline-block;background:#1c4fd8;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:bold">${button}</a></p>
<p style="font-size:12px;color:#6b7587">${escapeHtml(url)}</p>
<p style="font-size:12px;color:#6b7587">${outro}</p>
<p>VIT GLOBAL TECHNOLOGIES GROUP</p></div>`;
}

export function sendVerificationEmail(email: string, name: string | null | undefined, token: string, locale: Locale) {
  const copy = VERIFY_COPY[locale];
  const url = `${SITE_URL}/api/auth/verify-email?token=${encodeURIComponent(token)}&locale=${locale}`;
  return sendMailTo(email, copy.subject, layout(locale, name, copy.intro, url, copy.button, copy.outro));
}

export function sendPasswordResetEmail(email: string, name: string | null | undefined, token: string, locale: Locale) {
  const copy = RESET_COPY[locale];
  const url = `${SITE_URL}/${locale}/espace-client/reinitialisation?token=${encodeURIComponent(token)}`;
  return sendMailTo(email, copy.subject, layout(locale, name, copy.intro, url, copy.button, copy.outro));
}
