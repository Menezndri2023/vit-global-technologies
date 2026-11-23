import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { consumeAccountToken } from "@/lib/account-tokens";
import { normalizeLocale } from "@/lib/account-emails";
import { limitByIp, HOUR } from "@/lib/rate-limit";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = normalizeLocale(url.searchParams.get("locale"));
  const target = (ok: boolean) => NextResponse.redirect(new URL(`/${locale}/espace-client?verified=${ok ? "1" : "0"}`, request.url));

  const limited = await limitByIp(request, "verify-email", 30, HOUR);
  if (limited) return target(false);

  const email = await consumeAccountToken("verify", url.searchParams.get("token") ?? "");
  if (!email) return target(false);

  await prisma.user.updateMany({
    where: { email: { equals: email, mode: "insensitive" }, emailVerified: null },
    data: { emailVerified: new Date() }
  });

  return target(true);
}
