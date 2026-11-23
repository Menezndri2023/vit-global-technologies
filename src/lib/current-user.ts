import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/** Utilisateur connecté, relu en base (rôle et statut de vérification à jour). */
export async function getCurrentUser() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return null;
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true, emailVerified: true }
  });
}

/**
 * Les données rattachées à un e-mail (devis, rendez-vous, messages…) ne sont visibles
 * qu'une fois la propriété de cet e-mail prouvée.
 */
export async function getVerifiedUser() {
  const user = await getCurrentUser();
  return user?.emailVerified ? user : null;
}
