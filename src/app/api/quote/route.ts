import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { quoteSchema } from "@/lib/schemas";
import { readUploadedFile } from "@/lib/uploads";
import { notifyAdmin } from "@/lib/notify";
import { sendMailTo } from "@/lib/mail";
import { buildRateCardPdf } from "@/lib/quote-rate-card-pdf";
import type { Locale } from "@/data/types";

const CONFIRMATION_COPY: Record<Locale, { subject: string; greeting: (name: string) => string; body: string; nextSteps: string; footer: string }> = {
  fr: {
    subject: "Confirmation de votre demande de devis — VIT GLOBAL TECHNOLOGIES GROUP",
    greeting: (name) => `Bonjour ${name},`,
    body: "Nous avons bien reçu votre demande de devis. Notre équipe l'analyse et reviendra vers vous sous 48h ouvrées avec une proposition détaillée.",
    nextSteps: "Prochaines étapes : analyse du besoin → devis → validation → contrat → acompte → développement → livraison.",
    footer: "Vous trouverez en pièce jointe notre grille tarifaire détaillée à titre indicatif."
  },
  en: {
    subject: "Your quote request has been received — VIT GLOBAL TECHNOLOGIES GROUP",
    greeting: (name) => `Hello ${name},`,
    body: "We have received your quote request. Our team is reviewing it and will get back to you within 48 business hours with a detailed proposal.",
    nextSteps: "Next steps: needs analysis → quote → validation → contract → deposit → development → delivery.",
    footer: "Please find our detailed rate card attached for your information."
  },
  ar: {
    subject: "تأكيد استلام طلب عرض السعر — VIT GLOBAL TECHNOLOGIES GROUP",
    greeting: (name) => `مرحبًا ${name}،`,
    body: "لقد تلقينا طلب عرض السعر الخاص بكم. يقوم فريقنا بدراسته وسيعود إليكم خلال 48 ساعة عمل باقتراح مفصل.",
    nextSteps: "الخطوات القادمة: تحليل الاحتياج ← عرض السعر ← التحقق ← العقد ← الدفعة الأولى ← التطوير ← التسليم.",
    footer: "تجدون رفقته الشبكة التسعيرية التفصيلية على سبيل الإعلام."
  }
};

async function sendQuoteConfirmation(entry: { name: string; email: string; locale: string }) {
  const locale = (["fr", "en", "ar"].includes(entry.locale) ? entry.locale : "fr") as Locale;
  const copy = CONFIRMATION_COPY[locale];
  try {
    const pdfBytes = await buildRateCardPdf(locale);
    await sendMailTo(
      entry.email,
      copy.subject,
      `<p>${copy.greeting(entry.name)}</p><p>${copy.body}</p><p>${copy.nextSteps}</p><p>${copy.footer}</p>`,
      [{ filename: "grille-tarifaire-vit-global.pdf", content: Buffer.from(pdfBytes), contentType: "application/pdf" }]
    );
  } catch (error) {
    console.error("[quote] confirmation email failed", error);
  }
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "INVALID_BODY" }, { status: 400 });
  }

  const fields = Object.fromEntries(
    Array.from(formData.entries()).filter(([, value]) => typeof value === "string")
  ) as Record<string, string>;

  const file = formData.get("attachment");
  let attachmentData: Uint8Array | undefined;
  let attachmentName: string | undefined;
  let attachmentMimeType: string | undefined;

  if (file instanceof File && file.size > 0) {
    try {
      const saved = await readUploadedFile(file);
      attachmentData = saved.data;
      attachmentName = saved.originalName;
      attachmentMimeType = saved.mimeType;
    } catch (error) {
      const code = error instanceof Error ? error.message : "UPLOAD_FAILED";
      return NextResponse.json({ error: code }, { status: 400 });
    }
  }

  const parsed = quoteSchema.safeParse(fields);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const entry = await prisma.quoteRequest.create({
    data: {
      ...parsed.data,
      attachmentData: attachmentData ? Buffer.from(attachmentData) : undefined,
      attachmentName,
      attachmentMimeType
    }
  });
  notifyAdmin(`Nouvelle demande de devis de ${entry.name} — ${entry.service}`);
  sendQuoteConfirmation(entry);
  return NextResponse.json({ id: entry.id }, { status: 201 });
}
