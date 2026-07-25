import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const updaters = {
  contact: (id: string, status: string) => prisma.contactMessage.update({ where: { id }, data: { status: status as never } }),
  quote: (id: string, status: string) => prisma.quoteRequest.update({ where: { id }, data: { status: status as never } }),
  appointment: (id: string, status: string) => prisma.appointment.update({ where: { id }, data: { status: status as never } }),
  job: (id: string, status: string) => prisma.jobApplication.update({ where: { id }, data: { status: status as never } }),
  partner: (id: string, status: string) => prisma.partnerRequest.update({ where: { id }, data: { status: status as never } }),
  chat: (id: string, status: string) => prisma.chatLead.update({ where: { id }, data: { status: status as never } })
} as const;

const VALID_STATUSES = ["NEW", "IN_PROGRESS", "DONE", "ARCHIVED"];

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { type, id, status } = await request.json();

  if (!(type in updaters) || !id || !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  await updaters[type as keyof typeof updaters](id, status);
  return NextResponse.json({ ok: true });
}
