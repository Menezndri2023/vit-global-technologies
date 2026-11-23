import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { verifyAdminSessionValue } from "@/lib/admin-session";

export { ADMIN_SESSION_TTL_SECONDS, checkAdminPassword, createAdminSessionValue, verifyAdminSessionValue } from "@/lib/admin-session";

export const ADMIN_COOKIE = "vit_admin_session";

/**
 * Accès admin accordé si :
 *  - le cookie de session admin signé est valide, ou
 *  - l'utilisateur connecté (Auth.js) a le rôle ADMIN en base et un e-mail vérifié (comptes nominatifs).
 */
export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  if (verifyAdminSessionValue(cookieStore.get(ADMIN_COOKIE)?.value)) return true;

  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return false;
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true, emailVerified: true } });
  return user?.role === "ADMIN" && Boolean(user.emailVerified);
}
