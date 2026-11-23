import { NextResponse } from "next/server";
import { buildQuotePdf } from "@/lib/quote-pdf";
import { resolveSignToken } from "@/lib/quote-signature";
import { HOUR, limitByIp } from "@/lib/rate-limit";

/** Téléchargement du devis signé : nécessite le jeton de signature (non expiré), jamais l'identifiant seul. */
export async function GET(request: Request) {
  const limited = await limitByIp(request, "signed-pdf", 30, HOUR);
  if (limited) return limited;

  const token = new URL(request.url).searchParams.get("token");
  const state = await resolveSignToken(token);
  if (state.status !== "signed" || !state.quote.signature) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const pdfBytes = await buildQuotePdf(state.quote, state.quote.signature);
  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="devis-signe-${state.quote.id}.pdf"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex"
    }
  });
}
