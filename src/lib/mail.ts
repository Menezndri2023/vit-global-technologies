import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "@/lib/contact";
import { escapeHtml } from "@/lib/security";

// SMTP_HOST absent → Gmail (comportement historique). Pour Zoho Mail : SMTP_HOST=smtp.zoho.com, SMTP_PORT=465.
function getTransport() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  if (!user || !pass) return null;
  const host = process.env.SMTP_HOST;
  if (!host) return nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  const port = Number(process.env.SMTP_PORT ?? 465);
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
}

export function isMailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_APP_PASSWORD);
}

/** Notification interne à l'équipe. Renvoie `true` si l'e-mail est parti. */
export async function sendMail(subject: string, body: string): Promise<boolean> {
  const to = process.env.ADMIN_NOTIFY_EMAIL || CONTACT_EMAIL;
  const transport = getTransport();
  if (!to || !transport) {
    console.warn("[notify] Email NOT sent (SMTP not configured):", subject);
    return false;
  }
  try {
    // Plain text/HTML only — never pass a `raw` MIME option here (GHSA-p6gq-j5cr-w38f).
    await transport.sendMail({
      from: `"VIT GLOBAL — Notifications" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: body,
      html: `<p>${escapeHtml(body).replace(/\n/g, "<br>")}</p>`
    });
    return true;
  } catch (error) {
    console.error("[notify] Email failed", error);
    return false;
  }
}

interface ClientMailAttachment {
  filename: string;
  content: Buffer;
  contentType?: string;
}

/**
 * E-mail à un client. `html` doit déjà être construit avec des valeurs échappées (voir escapeHtml).
 * Renvoie `true` si l'e-mail est parti, `false` sinon (SMTP absent ou erreur) : l'appelant décide quoi faire.
 */
export async function sendMailTo(
  to: string,
  subject: string,
  html: string,
  attachments?: ClientMailAttachment[]
): Promise<boolean> {
  const transport = getTransport();
  if (!to || !transport) {
    console.warn("[notify] Client email NOT sent (SMTP not configured or no recipient):", subject);
    return false;
  }
  try {
    // Plain text/HTML only — never pass a `raw` MIME option here (GHSA-p6gq-j5cr-w38f).
    await transport.sendMail({
      from: `"VIT GLOBAL TECHNOLOGIES GROUP" <${process.env.SMTP_USER}>`,
      replyTo: CONTACT_EMAIL,
      to,
      subject,
      html,
      attachments
    });
    return true;
  } catch (error) {
    console.error("[notify] Client email failed", error);
    return false;
  }
}
