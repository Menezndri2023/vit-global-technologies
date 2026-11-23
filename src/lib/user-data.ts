import { prisma } from "@/lib/prisma";

/** À n'appeler qu'avec l'e-mail d'un utilisateur dont l'adresse est vérifiée (voir getVerifiedUser). */
export async function getUserActivity(email: string) {
  const where = { email: { equals: email, mode: "insensitive" as const } };
  const [quotes, appointments, messages, jobs] = await Promise.all([
    prisma.quoteRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        service: true,
        status: true,
        createdAt: true,
        proposalVersion: true,
        proposalSentAt: true,
        signature: { select: { signedAt: true } }
      }
    }),
    prisma.appointment.findMany({ where, orderBy: { createdAt: "desc" } }),
    prisma.contactMessage.findMany({ where, orderBy: { createdAt: "desc" } }),
    prisma.jobApplication.findMany({ where, orderBy: { createdAt: "desc" } })
  ]);

  return { quotes, appointments, messages, jobs };
}
