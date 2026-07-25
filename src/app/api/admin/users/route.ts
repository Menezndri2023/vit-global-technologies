import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, createdAt: true, image: true }
  });

  return NextResponse.json({ data: users });
}

const VALID_ROLES = ["CLIENT", "PARTNER", "ADMIN"];

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id, role } = await request.json();
  if (!id || !VALID_ROLES.includes(role)) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  await prisma.user.update({ where: { id }, data: { role } });
  return NextResponse.json({ ok: true });
}
