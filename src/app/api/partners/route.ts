import { NextResponse, after } from "next/server";
import { prisma } from "@/lib/prisma";
import { partnerRequestSchema } from "@/lib/schemas";
import { notifyAdmin } from "@/lib/notify";
import { HOUR, limitByIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limited = await limitByIp(request, "partners", 5, HOUR);
  if (limited) return limited;

  const body = await request.json().catch(() => null);
  const parsed = partnerRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const entry = await prisma.partnerRequest.create({ data: parsed.data });
  after(() => notifyAdmin(`Nouvelle demande de partenariat de ${entry.company} (${entry.partnerType})`));
  return NextResponse.json({ id: entry.id }, { status: 201 });
}
