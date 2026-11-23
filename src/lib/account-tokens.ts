import { prisma } from "@/lib/prisma";
import { generateToken, hashToken } from "@/lib/security";

export type AccountTokenPurpose = "verify" | "reset";

const TTL_MS: Record<AccountTokenPurpose, number> = {
  verify: 48 * 60 * 60 * 1000,
  reset: 60 * 60 * 1000
};

function identifier(purpose: AccountTokenPurpose, email: string) {
  return `${purpose}:${email.toLowerCase()}`;
}

/** Crée un jeton (vérification d'e-mail ou réinitialisation) ; seul son hash est stocké. Les anciens jetons sont révoqués. */
export async function createAccountToken(purpose: AccountTokenPurpose, email: string) {
  const token = generateToken();
  const id = identifier(purpose, email);
  await prisma.$transaction([
    prisma.verificationToken.deleteMany({ where: { identifier: id } }),
    prisma.verificationToken.create({
      data: { identifier: id, token: hashToken(token), expires: new Date(Date.now() + TTL_MS[purpose]) }
    })
  ]);
  return token;
}

/** Consomme un jeton : renvoie l'e-mail associé s'il est valide, puis le supprime (usage unique). */
export async function consumeAccountToken(purpose: AccountTokenPurpose, token: string) {
  if (!token || token.length > 200) return null;
  const record = await prisma.verificationToken.findUnique({ where: { token: hashToken(token) } });
  if (!record || !record.identifier.startsWith(`${purpose}:`)) return null;
  await prisma.verificationToken.delete({ where: { token: record.token } }).catch(() => null);
  if (record.expires.getTime() < Date.now()) return null;
  return record.identifier.slice(purpose.length + 1);
}

export function findUserByEmail(email: string) {
  return prisma.user.findFirst({ where: { email: { equals: email.trim(), mode: "insensitive" } } });
}
