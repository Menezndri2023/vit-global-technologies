import crypto from "crypto";

const PREFIX = "enc:v1:";

/**
 * Chiffrement AES-256-GCM des secrets stockés en base (jetons OAuth du calendrier).
 * Clé : DATA_ENCRYPTION_KEY si définie, sinon dérivée d'AUTH_SECRET.
 * Attention : changer cette clé rend les jetons existants illisibles (il suffit alors de reconnecter le calendrier).
 */
function key() {
  const source = process.env.DATA_ENCRYPTION_KEY || process.env.AUTH_SECRET;
  if (!source) throw new Error("DATA_ENCRYPTION_KEY or AUTH_SECRET is required to encrypt secrets");
  return crypto.createHash("sha256").update(`vit-secret-box:${source}`).digest();
}

export function encryptSecret(plain: string) {
  if (!plain) return plain;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key(), iv);
  const encrypted = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${PREFIX}${Buffer.concat([iv, tag, encrypted]).toString("base64url")}`;
}

/** Déchiffre ; une valeur historique non chiffrée est renvoyée telle quelle (rétrocompatibilité). */
export function decryptSecret(value: string) {
  if (!value || !value.startsWith(PREFIX)) return value;
  const raw = Buffer.from(value.slice(PREFIX.length), "base64url");
  const iv = raw.subarray(0, 12);
  const tag = raw.subarray(12, 28);
  const data = raw.subarray(28);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
}
