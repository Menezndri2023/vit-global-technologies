import twilio from "twilio";

function getClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) return null;
  return twilio(sid, token);
}

export async function sendSms(to: string, body: string) {
  const client = getClient();
  const from = process.env.TWILIO_SMS_FROM;
  if (!client || !from) {
    console.info("[notify] SMS skipped (Twilio not configured):", body);
    return;
  }
  try {
    await client.messages.create({ to, from, body });
  } catch (error) {
    console.error("[notify] SMS failed", error);
  }
}

export async function sendWhatsApp(to: string, body: string) {
  const client = getClient();
  const from = process.env.TWILIO_WHATSAPP_FROM;
  if (!client || !from) {
    console.info("[notify] WhatsApp skipped (Twilio not configured):", body);
    return;
  }
  try {
    await client.messages.create({
      to: `whatsapp:${to.replace("whatsapp:", "")}`,
      from: `whatsapp:${from.replace("whatsapp:", "")}`,
      body
    });
  } catch (error) {
    console.error("[notify] WhatsApp failed", error);
  }
}

export async function notifyAdmin(body: string) {
  const adminPhone = process.env.ADMIN_NOTIFY_PHONE;
  if (!adminPhone) {
    console.info("[notify] Admin notification skipped (no ADMIN_NOTIFY_PHONE):", body);
    return;
  }
  await sendWhatsApp(adminPhone, body);
}
