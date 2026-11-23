import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { isMailConfigured } from "@/lib/mail";

/** Indique à l'admin quelles intégrations sont configurées (jamais les valeurs elles-mêmes). */
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    smtp: isMailConfigured(),
    whatsapp: Boolean(
      process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_WHATSAPP_FROM && process.env.ADMIN_NOTIFY_PHONE
    )
  });
}
