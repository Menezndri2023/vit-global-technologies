import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { HOUR, limitByIp } from "@/lib/rate-limit";
import { consumeAccountToken } from "@/lib/account-tokens";

const schema = z.object({ token: z.string().min(10).max(200), password: z.string().min(8).max(200) });

export async function POST(request: Request) {
  const limited = await limitByIp(request, "reset-password", 10, HOUR);
  if (limited) return limited;

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const email = await consumeAccountToken("reset", parsed.data.token);
  if (!email) return NextResponse.json({ error: "invalid_or_expired" }, { status: 400 });

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  // Recevoir le lien prouve la propriété de l'adresse : l'e-mail est marqué vérifié.
  const updated = await prisma.user.updateMany({
    where: { email: { equals: email, mode: "insensitive" } },
    data: { passwordHash, emailVerified: new Date() }
  });
  if (updated.count === 0) return NextResponse.json({ error: "invalid_or_expired" }, { status: 400 });

  // Toute vérification d'e-mail en attente pour cette adresse devient inutile.
  await prisma.verificationToken.deleteMany({ where: { identifier: `verify:${email}` } });

  return NextResponse.json({ ok: true });
}
