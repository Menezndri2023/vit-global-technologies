import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { customPricingSchema } from "@/lib/schemas";
import { buildProposalSnapshot, issueSignLink } from "@/lib/quote-signature";
import { sendMailTo } from "@/lib/mail";
import { escapeHtml } from "@/lib/security";
import { normalizeLocale } from "@/lib/account-emails";

const COPY = {
  fr: {
    subject: "Votre proposition à signer — VIT GLOBAL TECHNOLOGIES GROUP",
    body: (name: string, url: string) =>
      `<p>Bonjour ${name},</p><p>Votre proposition commerciale est prête. Vous pouvez la consulter et la signer électroniquement via ce lien personnel (valable 14 jours) :</p><p><a href="${url}">${url}</a></p><p>Ce lien vous est strictement personnel : ne le transférez pas.</p><p>L'équipe VIT GLOBAL TECHNOLOGIES GROUP</p>`
  },
  en: {
    subject: "Your proposal to sign — VIT GLOBAL TECHNOLOGIES GROUP",
    body: (name: string, url: string) =>
      `<p>Hello ${name},</p><p>Your commercial proposal is ready. You can review and sign it electronically using this personal link (valid for 14 days):</p><p><a href="${url}">${url}</a></p><p>This link is strictly personal: please do not forward it.</p><p>The VIT GLOBAL TECHNOLOGIES GROUP team</p>`
  },
  ar: {
    subject: "عرضكم جاهز للتوقيع — VIT GLOBAL TECHNOLOGIES GROUP",
    body: (name: string, url: string) =>
      `<div dir="rtl"><p>مرحبًا ${name}،</p><p>عرضكم التجاري جاهز. يمكنكم الاطلاع عليه وتوقيعه إلكترونيًا عبر هذا الرابط الشخصي (صالح لمدة 14 يومًا):</p><p><a href="${url}">${url}</a></p><p>هذا الرابط شخصي تمامًا: يرجى عدم مشاركته.</p><p>فريق VIT GLOBAL TECHNOLOGIES GROUP</p></div>`
  }
};

/**
 * Fige la grille tarifaire actuelle en une nouvelle version de proposition, invalide les liens
 * des versions précédentes et envoie au client un lien de signature personnel.
 */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const quote = await prisma.quoteRequest.findUnique({ where: { id }, include: { signature: true } });
  if (!quote) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (quote.signature) return NextResponse.json({ error: "already_signed" }, { status: 409 });

  const lines = customPricingSchema.safeParse(quote.customPricing);
  if (!lines.success || lines.data.length === 0) {
    return NextResponse.json({ error: "pricing_required" }, { status: 400 });
  }

  const version = quote.proposalVersion + 1;
  const snapshot = buildProposalSnapshot(quote, version, lines.data);
  await prisma.quoteRequest.update({
    where: { id },
    data: { proposal: snapshot as unknown as Prisma.InputJsonValue, proposalVersion: version, proposalSentAt: new Date() }
  });

  const locale = normalizeLocale(quote.locale);
  const { url } = await issueSignLink(id, version, locale);
  const copy = COPY[locale];
  const emailSent = await sendMailTo(quote.email, copy.subject, copy.body(escapeHtml(quote.name), escapeHtml(url)));

  // Le lien est renvoyé à l'admin pour qu'il puisse le transmettre lui-même si l'e-mail n'est pas parti.
  return NextResponse.json({ ok: true, version, url, emailSent });
}
