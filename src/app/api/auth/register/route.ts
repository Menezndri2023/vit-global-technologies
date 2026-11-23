import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { HOUR, limitByIp } from "@/lib/rate-limit";
import { createAccountToken, findUserByEmail } from "@/lib/account-tokens";
import { normalizeLocale, sendVerificationEmail } from "@/lib/account-emails";

const registerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(200),
  locale: z.string().optional()
});

export async function POST(request: Request) {
  const limited = await limitByIp(request, "register", 5, HOUR);
  if (limited) return limited;

  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { name, password } = parsed.data;
  const email = parsed.data.email.toLowerCase();
  const locale = normalizeLocale(parsed.data.locale);

  const existing = await findUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "email_taken" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, role: "CLIENT" }
  });

  // Le compte reste inactif (aucune donnée visible, connexion refusée) tant que l'e-mail n'est pas confirmé.
  const token = await createAccountToken("verify", email);
  const verificationSent = await sendVerificationEmail(email, name, token, locale);

  return NextResponse.json({ id: user.id, verificationSent }, { status: 201 });
}
