import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { customPricingSchema } from "@/lib/schemas";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = customPricingSchema.safeParse(body?.lines);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const quote = await prisma.quoteRequest.update({
    where: { id },
    data: { customPricing: parsed.data.length > 0 ? parsed.data : Prisma.JsonNull },
    select: { id: true, customPricing: true }
  });

  return NextResponse.json({ ok: true, customPricing: quote.customPricing });
}
