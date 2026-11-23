import { NextResponse, after } from "next/server";
import { prisma } from "@/lib/prisma";
import { jobApplicationSchema } from "@/lib/schemas";
import { notifyAdmin } from "@/lib/notify";
import { HOUR, limitByIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limited = await limitByIp(request, "careers", 5, HOUR);
  if (limited) return limited;

  const body = await request.json().catch(() => null);
  const parsed = jobApplicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const entry = await prisma.jobApplication.create({ data: parsed.data });
  after(() => notifyAdmin(`Nouvelle candidature de ${entry.name} — ${entry.position}`));
  return NextResponse.json({ id: entry.id }, { status: 201 });
}
