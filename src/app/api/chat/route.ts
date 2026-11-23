import { NextResponse, after } from "next/server";
import { prisma } from "@/lib/prisma";
import { chatLeadSchema } from "@/lib/schemas";
import { notifyAdmin } from "@/lib/notify";
import { HOUR, limitByIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limited = await limitByIp(request, "chat", 20, HOUR);
  if (limited) return limited;

  const body = await request.json().catch(() => null);
  const parsed = chatLeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = { ...parsed.data, email: parsed.data.email || undefined };
  const entry = await prisma.chatLead.create({ data });
  if (entry.email) {
    after(() => notifyAdmin(`Nouveau lead chat de ${entry.name ?? entry.email} sur ${entry.page ?? "le site"}`));
  }
  return NextResponse.json({ id: entry.id }, { status: 201 });
}
