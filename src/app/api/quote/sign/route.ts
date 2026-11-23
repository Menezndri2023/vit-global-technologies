import { NextResponse, after } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { notifyAdmin } from "@/lib/notify";
import { HOUR, limitByIp } from "@/lib/rate-limit";
import { clientIp, escapeHtml } from "@/lib/security";
import { computeDocumentHash, emailsMatch, resolveSignToken } from "@/lib/quote-signature";
import { buildQuotePdf } from "@/lib/quote-pdf";
import { sendMailTo } from "@/lib/mail";
import { normalizeLocale } from "@/lib/account-emails";
import fr from "../../../../../messages/fr.json";
import en from "../../../../../messages/en.json";
import ar from "../../../../../messages/ar.json";

const CONSENT = { fr: fr.signature.consent, en: en.signature.consent, ar: ar.signature.consent };

const signSchema = z.object({
  token: z.string().min(20).max(200),
  signerName: z.string().trim().min(2).max(120),
  signerEmail: z.string().trim().email().max(254),
  consent: z.literal(true),
  locale: z.string().optional()
});

const CONFIRMATION = {
  fr: { subject: "Votre devis signé — VIT GLOBAL TECHNOLOGIES GROUP", body: (n: string) => `<p>Bonjour ${n},</p><p>Nous confirmons la signature électronique de votre devis. Vous trouverez en pièce jointe l'exemplaire signé.</p><p>L'équipe VIT GLOBAL TECHNOLOGIES GROUP</p>` },
  en: { subject: "Your signed quote — VIT GLOBAL TECHNOLOGIES GROUP", body: (n: string) => `<p>Hello ${n},</p><p>We confirm the electronic signature of your quote. Please find the signed copy attached.</p><p>The VIT GLOBAL TECHNOLOGIES GROUP team</p>` },
  ar: { subject: "عرض السعر الموقّع — VIT GLOBAL TECHNOLOGIES GROUP", body: (n: string) => `<div dir="rtl"><p>مرحبًا ${n}،</p><p>نؤكد التوقيع الإلكتروني لعرض السعر الخاص بكم. تجدون رفقته النسخة الموقّعة.</p><p>فريق VIT GLOBAL TECHNOLOGIES GROUP</p></div>` }
};

export async function POST(request: Request) {
  const limited = await limitByIp(request, "quote-sign", 10, HOUR);
  if (limited) return limited;

  const parsed = signSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }
  const locale = normalizeLocale(parsed.data.locale);

  const state = await resolveSignToken(parsed.data.token);
  if (state.status === "signed") return NextResponse.json({ error: "already_signed" }, { status: 409 });
  if (state.status !== "ready") return NextResponse.json({ error: state.status }, { status: 410 });

  const { quote, proposal, tokenId } = state;

  // Seul le destinataire de la proposition peut la signer.
  if (!emailsMatch(parsed.data.signerEmail, quote.email)) {
    return NextResponse.json({ error: "email_mismatch" }, { status: 403 });
  }

  const consentText = CONSENT[locale];
  const documentHash = computeDocumentHash(proposal, consentText);

  let signature;
  try {
    signature = await prisma.$transaction(async (tx) => {
      // Consommation atomique du jeton : un double envoi ne peut pas produire deux signatures.
      const consumed = await tx.quoteSignToken.updateMany({
        where: { id: tokenId, usedAt: null },
        data: { usedAt: new Date() }
      });
      if (consumed.count !== 1) throw new Error("token_already_used");

      return tx.signature.create({
        data: {
          quoteId: quote.id,
          signerName: parsed.data.signerName,
          signerEmail: parsed.data.signerEmail.toLowerCase(),
          ipAddress: clientIp(request.headers),
          userAgent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
          proposalVersion: proposal.version,
          snapshot: proposal as unknown as Prisma.InputJsonValue,
          documentHash,
          consentText,
          locale
        }
      });
    });
  } catch (error) {
    const alreadySigned =
      (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") ||
      (error instanceof Error && error.message === "token_already_used");
    if (alreadySigned) return NextResponse.json({ error: "already_signed" }, { status: 409 });
    throw error;
  }

  after(async () => {
    await notifyAdmin(`Devis ${quote.id} (v${proposal.version}) signé électroniquement par ${signature.signerName}. Empreinte : ${documentHash}`);
    const pdf = await buildQuotePdf(quote, signature);
    const copy = CONFIRMATION[locale];
    await sendMailTo(quote.email, copy.subject, copy.body(escapeHtml(signature.signerName)), [
      { filename: `devis-signe-${quote.id}.pdf`, content: Buffer.from(pdf), contentType: "application/pdf" }
    ]);
  });

  return NextResponse.json({ ok: true, documentHash }, { status: 201 });
}
