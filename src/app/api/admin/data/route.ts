import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const getters = {
  contact: () => prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
  quote: () => prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" }, include: { signature: true } }),
  appointment: () => prisma.appointment.findMany({ orderBy: { createdAt: "desc" } }),
  job: () => prisma.jobApplication.findMany({ orderBy: { createdAt: "desc" } }),
  partner: () => prisma.partnerRequest.findMany({ orderBy: { createdAt: "desc" } }),
  chat: () => prisma.chatLead.findMany({ orderBy: { createdAt: "desc" } })
} as const;

type EntityType = keyof typeof getters;

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const type = url.searchParams.get("type") as EntityType | null;

  if (!type || !(type in getters)) {
    return NextResponse.json({ error: "invalid type" }, { status: 400 });
  }

  const data = await getters[type]();
  return NextResponse.json({ data });
}
