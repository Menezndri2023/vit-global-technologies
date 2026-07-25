import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildQuotePdf } from "@/lib/quote-pdf";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quote = await prisma.quoteRequest.findUnique({ where: { id }, include: { signature: true } });

  if (!quote || !quote.signature) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const pdfBytes = await buildQuotePdf(quote, quote.signature);

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="devis-signe-${quote.id}.pdf"`
    }
  });
}
