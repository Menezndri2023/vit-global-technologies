import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chatLeadSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = chatLeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const entry = await prisma.chatLead.create({ data: parsed.data });
  return NextResponse.json({ id: entry.id }, { status: 201 });
}
