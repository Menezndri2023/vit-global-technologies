import { NextResponse, after } from "next/server";
import { prisma } from "@/lib/prisma";
import { notifyAdmin } from "@/lib/notify";
import { z } from "zod";

const signSchema = z.object({
  signerName: z.string().min(2),
  signerEmail: z.string().email()
});

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const parsed = signSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const quote = await prisma.quoteRequest.findUnique({ where: { id }, include: { signature: true } });
  if (!quote) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  if (quote.signature) {
    return NextResponse.json({ error: "already_signed" }, { status: 409 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : null;
  const userAgent = request.headers.get("user-agent");

  const signature = await prisma.signature.create({
    data: {
      quoteId: id,
      signerName: parsed.data.signerName,
      signerEmail: parsed.data.signerEmail,
      ipAddress,
      userAgent
    }
  });

  after(() => notifyAdmin(`Devis ${id} signé électroniquement par ${signature.signerName}`));

  return NextResponse.json({ ok: true }, { status: 201 });
}
