import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { exchangeGoogleCode, saveCalendarConnection } from "@/lib/calendar";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieStore = await cookies();
  const expectedState = cookieStore.get("vit_oauth_state_google")?.value;
  cookieStore.delete("vit_oauth_state_google");

  if (!code || !state || state !== expectedState) {
    return NextResponse.redirect(new URL("/admin?calendar_error=1", request.url));
  }

  try {
    const tokens = await exchangeGoogleCode(code);
    await saveCalendarConnection("google", tokens);
  } catch (error) {
    console.error("google_calendar_connect_failed", error);
    return NextResponse.redirect(new URL("/admin?calendar_error=1", request.url));
  }

  return NextResponse.redirect(new URL("/admin?calendar_connected=google", request.url));
}
