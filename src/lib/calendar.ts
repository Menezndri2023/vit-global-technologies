import { prisma } from "@/lib/prisma";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.events openid email";

const MS_AUTHORITY = "https://login.microsoftonline.com/common/oauth2/v2.0";
const MS_SCOPE = "offline_access openid email Calendars.ReadWrite";

export function getGoogleAuthUrl(state: string) {
  const params = new URLSearchParams({
    client_id: process.env.AUTH_GOOGLE_ID ?? "",
    redirect_uri: process.env.GOOGLE_CALENDAR_REDIRECT_URI ?? "",
    response_type: "code",
    scope: GOOGLE_CALENDAR_SCOPE,
    access_type: "offline",
    prompt: "consent",
    state
  });
  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

export function getMicrosoftAuthUrl(state: string) {
  const params = new URLSearchParams({
    client_id: process.env.AUTH_MICROSOFT_ENTRA_ID_ID ?? "",
    redirect_uri: process.env.MICROSOFT_CALENDAR_REDIRECT_URI ?? "",
    response_type: "code",
    scope: MS_SCOPE,
    state
  });
  return `${MS_AUTHORITY}/authorize?${params.toString()}`;
}

export async function exchangeGoogleCode(code: string) {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.AUTH_GOOGLE_ID ?? "",
      client_secret: process.env.AUTH_GOOGLE_SECRET ?? "",
      redirect_uri: process.env.GOOGLE_CALENDAR_REDIRECT_URI ?? "",
      grant_type: "authorization_code",
      code
    })
  });
  if (!res.ok) throw new Error(`google_token_exchange_failed: ${await res.text()}`);
  return res.json() as Promise<{ access_token: string; refresh_token?: string; expires_in: number }>;
}

export async function exchangeMicrosoftCode(code: string) {
  const res = await fetch(`${MS_AUTHORITY}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.AUTH_MICROSOFT_ENTRA_ID_ID ?? "",
      client_secret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET ?? "",
      redirect_uri: process.env.MICROSOFT_CALENDAR_REDIRECT_URI ?? "",
      grant_type: "authorization_code",
      scope: MS_SCOPE,
      code
    })
  });
  if (!res.ok) throw new Error(`microsoft_token_exchange_failed: ${await res.text()}`);
  return res.json() as Promise<{ access_token: string; refresh_token?: string; expires_in: number }>;
}

async function refreshGoogleToken(refreshToken: string) {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.AUTH_GOOGLE_ID ?? "",
      client_secret: process.env.AUTH_GOOGLE_SECRET ?? "",
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    })
  });
  if (!res.ok) throw new Error(`google_refresh_failed: ${await res.text()}`);
  return res.json() as Promise<{ access_token: string; expires_in: number }>;
}

async function refreshMicrosoftToken(refreshToken: string) {
  const res = await fetch(`${MS_AUTHORITY}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.AUTH_MICROSOFT_ENTRA_ID_ID ?? "",
      client_secret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET ?? "",
      refresh_token: refreshToken,
      grant_type: "refresh_token",
      scope: MS_SCOPE
    })
  });
  if (!res.ok) throw new Error(`microsoft_refresh_failed: ${await res.text()}`);
  return res.json() as Promise<{ access_token: string; refresh_token?: string; expires_in: number }>;
}

async function getValidAccessToken(provider: "google" | "microsoft") {
  const connection = await prisma.calendarConnection.findFirst({ where: { provider } });
  if (!connection) return null;

  if (connection.expiresAt.getTime() > Date.now() + 60_000) {
    return connection.accessToken;
  }

  if (provider === "google") {
    const refreshed = await refreshGoogleToken(connection.refreshToken);
    await prisma.calendarConnection.update({
      where: { id: connection.id },
      data: {
        accessToken: refreshed.access_token,
        expiresAt: new Date(Date.now() + refreshed.expires_in * 1000)
      }
    });
    return refreshed.access_token;
  }

  const refreshed = await refreshMicrosoftToken(connection.refreshToken);
  await prisma.calendarConnection.update({
    where: { id: connection.id },
    data: {
      accessToken: refreshed.access_token,
      refreshToken: refreshed.refresh_token ?? connection.refreshToken,
      expiresAt: new Date(Date.now() + refreshed.expires_in * 1000)
    }
  });
  return refreshed.access_token;
}

export type CalendarEventInput = {
  summary: string;
  description: string;
  start: Date;
  end: Date;
  location?: string;
  attendeeEmail?: string;
};

export async function syncAppointmentToCalendars(event: CalendarEventInput) {
  const results: { provider: string; ok: boolean }[] = [];

  for (const provider of ["google", "microsoft"] as const) {
    const connection = await prisma.calendarConnection.findFirst({ where: { provider } });
    if (!connection) continue;

    try {
      const token = await getValidAccessToken(provider);
      if (!token) continue;

      if (provider === "google") {
        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            summary: event.summary,
            description: event.description,
            location: event.location,
            start: { dateTime: event.start.toISOString() },
            end: { dateTime: event.end.toISOString() },
            attendees: event.attendeeEmail ? [{ email: event.attendeeEmail }] : undefined
          })
        });
      } else {
        await fetch("https://graph.microsoft.com/v1.0/me/events", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: event.summary,
            body: { contentType: "Text", content: event.description },
            location: event.location ? { displayName: event.location } : undefined,
            start: { dateTime: event.start.toISOString(), timeZone: "UTC" },
            end: { dateTime: event.end.toISOString(), timeZone: "UTC" },
            attendees: event.attendeeEmail
              ? [{ emailAddress: { address: event.attendeeEmail }, type: "required" }]
              : undefined
          })
        });
      }
      results.push({ provider, ok: true });
    } catch (error) {
      console.error(`calendar_sync_failed[${provider}]`, error);
      results.push({ provider, ok: false });
    }
  }

  return results;
}

export async function saveCalendarConnection(
  provider: "google" | "microsoft",
  tokens: { access_token: string; refresh_token?: string; expires_in: number },
  accountEmail?: string
) {
  const existing = await prisma.calendarConnection.findFirst({ where: { provider } });
  const data = {
    provider,
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token ?? existing?.refreshToken ?? "",
    expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
    accountEmail
  };

  if (existing) {
    return prisma.calendarConnection.update({ where: { id: existing.id }, data });
  }
  return prisma.calendarConnection.create({ data });
}
