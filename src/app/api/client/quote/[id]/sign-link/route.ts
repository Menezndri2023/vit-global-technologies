import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getVerifiedUser } from "@/lib/current-user";
import { emailsMatch, issueSignLink } from "@/lib/quote-signature";
import { normalizeLocale } from "@/lib/account-emails";
import { HOUR, limitByIp } from "@/lib/rate-limit";

/**
 * Depuis l'espace client : émet un lien de signature frais pour la proposition en cours,
 * uniquement pour le titulaire vérifié de l'adresse e-mail du devis.
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const url = new URL(request.url);
  const locale = normalizeLocale(url.searchParams.get("locale"));
  const back = () => NextResponse.redirect(new URL(`/${locale}/espace-client`, request.url));

  const limited = await limitByIp(request, "client-sign-link", 20, HOUR);
  if (limited) return limited;

  const user = await getVerifiedUser();
  if (!user) return back();

  const { id } = await params;
  const quote = await prisma.quoteRequest.findUnique({ where: { id }, include: { signature: true } });
  if (!quote || !emailsMatch(quote.email, user.email) || quote.signature || !quote.proposalSentAt || quote.proposalVersion < 1) {
    return back();
  }

  const { url: signUrl } = await issueSignLink(quote.id, quote.proposalVersion, locale);
  return NextResponse.redirect(signUrl);
}
