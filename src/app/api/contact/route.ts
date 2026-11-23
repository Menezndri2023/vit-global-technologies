import { NextResponse, after } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/schemas";
import { notifyAdmin } from "@/lib/notify";
import { HOUR, limitByIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limited = await limitByIp(request, "contact", 5, HOUR);
  if (limited) return limited;

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const entry = await prisma.contactMessage.create({ data: parsed.data });
  after(() => notifyAdmin(`Nouveau message de contact de ${entry.name} — "${entry.subject}"`));
  return NextResponse.json({ id: entry.id }, { status: 201 });
}
