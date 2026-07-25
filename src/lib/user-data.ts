import { prisma } from "@/lib/prisma";

export async function getUserActivity(email: string) {
  const [quotes, appointments, messages, jobs] = await Promise.all([
    prisma.quoteRequest.findMany({ where: { email }, orderBy: { createdAt: "desc" }, include: { signature: true } }),
    prisma.appointment.findMany({ where: { email }, orderBy: { createdAt: "desc" } }),
    prisma.contactMessage.findMany({ where: { email }, orderBy: { createdAt: "desc" } }),
    prisma.jobApplication.findMany({ where: { email }, orderBy: { createdAt: "desc" } })
  ]);

  return { quotes, appointments, messages, jobs };
}
