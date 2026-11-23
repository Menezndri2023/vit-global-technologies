import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getVerifiedUser } from "@/lib/current-user";
import { emailsMatch } from "@/lib/quote-signature";
import { buildQuotePdf } from "@/lib/quote-pdf";

/** Téléchargement du devis signé depuis l'espace client (propriétaire vérifié uniquement). */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getVerifiedUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  const quote = await prisma.quoteRequest.findUnique({ where: { id }, include: { signature: true } });
  if (!quote?.signature || !emailsMatch(quote.email, user.email)) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const pdfBytes = await buildQuotePdf(quote, quote.signature);
  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="devis-signe-${quote.id}.pdf"`,
      "Cache-Control": "private, no-store"
    }
  });
}
