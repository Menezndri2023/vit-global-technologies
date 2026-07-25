import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { partnerRequestSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = partnerRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const entry = await prisma.partnerRequest.create({ data: parsed.data });
  return NextResponse.json({ id: entry.id }, { status: 201 });
}
