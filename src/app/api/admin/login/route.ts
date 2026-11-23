import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, ADMIN_SESSION_TTL_SECONDS, checkAdminPassword, createAdminSessionValue } from "@/lib/admin-auth";
import { MINUTE, limitByIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  // 5 tentatives / 15 min par IP, et 30 / 15 min au total (protège contre une attaque distribuée).
  const limited = await limitByIp(request, "admin-login", 5, 15 * MINUTE);
  if (limited) return limited;
  if (!(await rateLimit("admin-login:global", 30, 15 * MINUTE))) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const password = body?.password;

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  }

  if (!process.env.AUTH_SECRET) {
    console.error("[admin] AUTH_SECRET manquant : impossible de signer la session");
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, createAdminSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS
  });

  return NextResponse.json({ ok: true });
}
