import crypto from "crypto";

/** Jeton aléatoire non devinable (256 bits), encodé pour être utilisé dans une URL. */
export function generateToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString("base64url");
}

/** Empreinte SHA-256 d'un jeton : seule cette empreinte est stockée en base. */
export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/** Comparaison à temps constant de deux chaînes (évite les attaques temporelles). */
export function safeEqual(a: string, b: string) {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb) && a.length === b.length;
}

/** Échappe une valeur avant insertion dans du HTML (e-mails notamment). */
export function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Adresse IP du client. Sur Vercel, `x-real-ip` et `x-forwarded-for` sont posés par la plateforme
 * (une valeur fournie par le client est écrasée).
 */
export function clientIp(headers: Headers): string {
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

/** Nom de fichier sûr pour un en-tête Content-Disposition. */
export function safeFilename(name: string | null | undefined, fallback = "fichier") {
  const cleaned = (name ?? "")
    .normalize("NFKD")
    .replace(/[^\w.\- ]+/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
  return cleaned || fallback;
}

/** Sérialisation JSON stable (clés triées) pour calculer une empreinte reproductible. */
export function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${canonicalJson(v)}`).join(",")}}`;
  }
  return JSON.stringify(value ?? null);
}

export function sha256Hex(value: string) {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
}
