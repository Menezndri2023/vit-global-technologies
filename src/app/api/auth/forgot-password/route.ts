import { NextResponse } from "next/server";
import { z } from "zod";
import { HOUR, limitByIp, rateLimit } from "@/lib/rate-limit";
import { createAccountToken, findUserByEmail } from "@/lib/account-tokens";
import { normalizeLocale, sendPasswordResetEmail } from "@/lib/account-emails";

const schema = z.object({ email: z.string().trim().email().max(254), locale: z.string().optional() });

/** Réponse identique que le compte existe ou non, pour ne pas révéler les adresses inscrites. */
export async function POST(request: Request) {
  const limited = await limitByIp(request, "forgot-password", 5, HOUR);
  if (limited) return limited;

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const user = await findUserByEmail(parsed.data.email);
  if (user && (await rateLimit(`forgot-password:email:${user.email.toLowerCase()}`, 3, HOUR))) {
    const token = await createAccountToken("reset", user.email);
    await sendPasswordResetEmail(user.email, user.name, token, normalizeLocale(parsed.data.locale));
  }

  return NextResponse.json({ ok: true });
}
