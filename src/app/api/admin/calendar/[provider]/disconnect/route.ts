import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function POST(request: Request, { params }: { params: Promise<{ provider: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { provider } = await params;
  await prisma.calendarConnection.deleteMany({ where: { provider } });
  return NextResponse.json({ ok: true });
}
