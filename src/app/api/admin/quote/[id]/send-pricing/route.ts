import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { sendMailTo } from "@/lib/mail";
import { buildRateCardPdf } from "@/lib/quote-rate-card-pdf";
import { customPricingSchema } from "@/lib/schemas";
import type { Locale } from "@/data/types";

const SUBJECT: Record<Locale, string> = {
  fr: "Votre grille tarifaire détaillée — VIT GLOBAL TECHNOLOGIES GROUP",
  en: "Your detailed rate card — VIT GLOBAL TECHNOLOGIES GROUP",
  ar: "الشبكة التسعيرية التفصيلية الخاصة بكم — VIT GLOBAL TECHNOLOGIES GROUP"
};

const BODY: Record<Locale, (name: string) => string> = {
  fr: (name) => `<p>Bonjour ${name},</p><p>Veuillez trouver ci-joint notre grille tarifaire détaillée relative à votre demande.</p><p>L'équipe VIT GLOBAL TECHNOLOGIES GROUP</p>`,
  en: (name) => `<p>Hello ${name},</p><p>Please find attached our detailed rate card related to your request.</p><p>The VIT GLOBAL TECHNOLOGIES GROUP team</p>`,
  ar: (name) => `<p>مرحبًا ${name}،</p><p>تجدون رفقته الشبكة التسعيرية التفصيلية المتعلقة بطلبكم.</p><p>فريق VIT GLOBAL TECHNOLOGIES GROUP</p>`
};

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const quote = await prisma.quoteRequest.findUnique({ where: { id } });

  if (!quote) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const locale = (["fr", "en", "ar"].includes(quote.locale) ? quote.locale : "fr") as Locale;
  const parsedCustom = customPricingSchema.safeParse(quote.customPricing);
  const customLines = parsedCustom.success ? parsedCustom.data : undefined;
  const pdfBytes = await buildRateCardPdf(locale, customLines);

  await sendMailTo(quote.email, SUBJECT[locale], BODY[locale](quote.name), [
    { filename: "grille-tarifaire-vit-global.pdf", content: Buffer.from(pdfBytes), contentType: "application/pdf" }
  ]);

  return NextResponse.json({ ok: true });
}
