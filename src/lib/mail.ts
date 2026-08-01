import nodemailer from "nodemailer";

function getTransport() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  if (!user || !pass) return null;
  return nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
}

export async function sendMail(subject: string, body: string) {
  const to = process.env.ADMIN_NOTIFY_EMAIL;
  const transport = getTransport();
  if (!to || !transport) {
    console.info("[notify] Email skipped (SMTP not configured):", subject);
    return;
  }
  try {
    // Plain text/HTML only — never pass a `raw` MIME option here (GHSA-p6gq-j5cr-w38f).
    await transport.sendMail({
      from: `"VIT GLOBAL — Notifications" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: body,
      html: `<p>${body.replace(/\n/g, "<br>")}</p>`
    });
  } catch (error) {
    console.error("[notify] Email failed", error);
  }
}

interface ClientMailAttachment {
  filename: string;
  content: Buffer;
  contentType?: string;
}

export async function sendMailTo(
  to: string,
  subject: string,
  html: string,
  attachments?: ClientMailAttachment[]
) {
  const transport = getTransport();
  if (!to || !transport) {
    console.info("[notify] Client email skipped (SMTP not configured or no recipient):", subject);
    return;
  }
  try {
    // Plain text/HTML only — never pass a `raw` MIME option here (GHSA-p6gq-j5cr-w38f).
    await transport.sendMail({
      from: `"VIT GLOBAL TECHNOLOGIES GROUP" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      attachments
    });
  } catch (error) {
    console.error("[notify] Client email failed", error);
  }
}
