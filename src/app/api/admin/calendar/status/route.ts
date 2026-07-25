import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const connections = await prisma.calendarConnection.findMany({
    select: { provider: true, accountEmail: true, updatedAt: true }
  });

  return NextResponse.json({ data: connections });
}
