import { NextResponse } from "next/server";
import { z } from "zod";
import { HOUR, limitByIp, rateLimit } from "@/lib/rate-limit";
import { createAccountToken, findUserByEmail } from "@/lib/account-tokens";
import { normalizeLocale, sendVerificationEmail } from "@/lib/account-emails";
import { getCurrentUser } from "@/lib/current-user";

const schema = z.object({ email: z.string().trim().email().max(254).optional(), locale: z.string().optional() });

/**
 * Renvoie le lien de vérification. Accepte soit l'utilisateur connecté (ex. compte Microsoft),
 * soit un e-mail saisi. La réponse est identique que le compte existe ou non (pas d'énumération).
 */
export async function POST(request: Request) {
  const limited = await limitByIp(request, "resend-verification", 5, HOUR);
  if (limited) return limited;

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const locale = normalizeLocale(parsed.data.locale);

  const sessionUser = await getCurrentUser();
  const user = sessionUser ?? (parsed.data.email ? await findUserByEmail(parsed.data.email) : null);

  if (user && !user.emailVerified && (await rateLimit(`resend-verification:email:${user.email.toLowerCase()}`, 3, HOUR))) {
    const token = await createAccountToken("verify", user.email);
    await sendVerificationEmail(user.email, user.name, token, locale);
  }

  return NextResponse.json({ ok: true });
}
