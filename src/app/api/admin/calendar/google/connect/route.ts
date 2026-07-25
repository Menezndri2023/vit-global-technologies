import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getGoogleAuthUrl } from "@/lib/calendar";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const state = crypto.randomUUID();
  const cookieStore = await cookies();
  cookieStore.set("vit_oauth_state_google", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600
  });

  return NextResponse.redirect(getGoogleAuthUrl(state));
}
