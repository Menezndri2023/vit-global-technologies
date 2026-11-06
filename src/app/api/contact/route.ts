import { NextResponse, after } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/schemas";
import { notifyAdmin } from "@/lib/notify";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const entry = await prisma.contactMessage.create({ data: parsed.data });
  after(() => notifyAdmin(`Nouveau message de contact de ${entry.name} — "${entry.subject}"`));
  return NextResponse.json({ id: entry.id }, { status: 201 });
}
