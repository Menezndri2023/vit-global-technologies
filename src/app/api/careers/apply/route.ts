import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jobApplicationSchema } from "@/lib/schemas";
import { notifyAdmin } from "@/lib/notify";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = jobApplicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const entry = await prisma.jobApplication.create({ data: parsed.data });
  notifyAdmin(`Nouvelle candidature de ${entry.name} — ${entry.position}`);
  return NextResponse.json({ id: entry.id }, { status: 201 });
}
