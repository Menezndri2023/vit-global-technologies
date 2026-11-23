/** Fuseau de référence de l'entreprise pour les rendez-vous et l'horodatage affiché. */
export const BUSINESS_TIME_ZONE = "Africa/Casablanca";

/** Créneaux proposés à la prise de rendez-vous (heure de Casablanca). */
export const TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"] as const;

/** Décalage (ms) entre l'heure locale du fuseau et UTC à un instant donné. */
function offsetAt(instant: number, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).formatToParts(new Date(instant));
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return asUtc - Math.floor(instant / 1000) * 1000;
}

/**
 * Convertit une date (AAAA-MM-JJ) et une heure (HH:MM) exprimées dans `timeZone` en instant UTC.
 * Indépendant du fuseau du serveur (UTC sur Vercel) et du navigateur du visiteur.
 */
export function zonedDateTimeToUtc(date: string, time: string, timeZone = BUSINESS_TIME_ZONE): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const naive = Date.UTC(y, m - 1, d, hh, mm);
  let result = naive - offsetAt(naive, timeZone);
  // Seconde passe pour les dates proches d'un changement d'heure.
  result = naive - offsetAt(result, timeZone);
  return new Date(result);
}

/** Date du jour (AAAA-MM-JJ) dans le fuseau de l'entreprise. */
export function todayInZone(timeZone = BUSINESS_TIME_ZONE, now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}
