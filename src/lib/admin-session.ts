import crypto from "crypto";
import { safeEqual } from "@/lib/security";

export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8;

/**
 * Clé de signature des sessions admin, dérivée d'AUTH_SECRET et du mot de passe admin :
 * changer ADMIN_PASSWORD (ou AUTH_SECRET) invalide immédiatement toutes les sessions ouvertes.
 * Le mot de passe n'est jamais placé dans le cookie.
 */
function signingKey() {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.AUTH_SECRET;
  if (!password || !secret) return null;
  return crypto.createHmac("sha256", secret).update(`vit-admin-session:${password}`).digest();
}

function sign(payload: string, key: Buffer) {
  return crypto.createHmac("sha256", key).update(payload).digest("base64url");
}

/** Valeur de cookie : `<expiration>.<nonce aléatoire>.<signature HMAC>`. */
export function createAdminSessionValue(now = Date.now()) {
  const key = signingKey();
  if (!key) throw new Error("ADMIN_PASSWORD or AUTH_SECRET missing");
  const expiresAt = now + ADMIN_SESSION_TTL_SECONDS * 1000;
  const payload = `${expiresAt}.${crypto.randomBytes(16).toString("base64url")}`;
  return `${payload}.${sign(payload, key)}`;
}

export function verifyAdminSessionValue(value: string | undefined, now = Date.now()) {
  if (!value) return false;
  const key = signingKey();
  if (!key) return false;
  const parts = value.split(".");
  if (parts.length !== 3) return false;
  const [expiresAt, nonce, signature] = parts;
  const expected = sign(`${expiresAt}.${nonce}`, key);
  if (!safeEqual(signature, expected)) return false;
  const exp = Number(expiresAt);
  return Number.isFinite(exp) && exp > now;
}

export function checkAdminPassword(input: unknown) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof input !== "string" || input.length === 0) return false;
  return safeEqual(input, expected);
}
