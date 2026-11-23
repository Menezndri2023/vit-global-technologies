import { describe, expect, it } from "vitest";
import { validateUpload, MAX_FILE_SIZE } from "@/lib/uploads";
import { zonedDateTimeToUtc, todayInZone } from "@/lib/timezone";
import { toWinAnsi } from "@/lib/quote-pdf";
import { encryptSecret, decryptSecret } from "@/lib/secret-box";

describe("validateUpload", () => {
  const pdf = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31]);

  it("accepte un vrai PDF", () => {
    expect(validateUpload("cahier.pdf", pdf).mimeType).toBe("application/pdf");
  });

  it("refuse un exécutable renommé en .pdf", () => {
    const exe = new Uint8Array([0x4d, 0x5a, 0x90, 0x00]);
    expect(() => validateUpload("cahier.pdf", exe)).toThrow("FILE_CONTENT_MISMATCH");
  });

  it("refuse les extensions non autorisées et les fichiers trop lourds", () => {
    expect(() => validateUpload("script.html", pdf)).toThrow("FILE_TYPE_NOT_ALLOWED");
    expect(() => validateUpload("gros.pdf", new Uint8Array(MAX_FILE_SIZE + 1))).toThrow("FILE_TOO_LARGE");
  });
});

describe("fuseau horaire des rendez-vous", () => {
  it("interprète les créneaux à l'heure de Casablanca, pas à celle du serveur", () => {
    // Casablanca est à UTC+1 hors Ramadan : 10:00 locale = 09:00 UTC.
    expect(zonedDateTimeToUtc("2026-12-15", "10:00").toISOString()).toBe("2026-12-15T09:00:00.000Z");
  });

  it("donne la date du jour à Casablanca", () => {
    expect(todayInZone("Africa/Casablanca", new Date("2026-12-31T23:30:00Z"))).toBe("2027-01-01");
  });
});

describe("PDF", () => {
  it("remplace les caractères non encodables au lieu de faire échouer la génération", () => {
    expect(toWinAnsi("Société à Casablanca")).toBe("Société à Casablanca");
    expect(toWinAnsi("شركة 🚀")).toBe("???? ?");
    expect(toWinAnsi("ligne 1\r\nligne 2\tfin")).toBe("ligne 1\nligne 2 fin");
  });
});

describe("chiffrement des jetons calendrier", () => {
  it("chiffre de façon réversible et reste compatible avec les anciennes valeurs en clair", () => {
    process.env.AUTH_SECRET = "secret-de-test";
    const encrypted = encryptSecret("ya29.jeton-oauth");
    expect(encrypted).toMatch(/^enc:v1:/);
    expect(encrypted).not.toContain("jeton-oauth");
    expect(decryptSecret(encrypted)).toBe("ya29.jeton-oauth");
    expect(decryptSecret("ancien-jeton-en-clair")).toBe("ancien-jeton-en-clair");
  });
});
