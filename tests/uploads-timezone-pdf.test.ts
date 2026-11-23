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
  // Le décalage du Maroc dépend de la version de la base IANA (tzdata) embarquée par Node :
  // les tests vérifient l'aller-retour plutôt qu'un décalage codé en dur.
  const casablancaClock = (date: Date) =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Casablanca",
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);

  it("interprète les créneaux à l'heure de Casablanca, pas à celle du serveur", () => {
    for (const [date, time] of [["2026-12-15", "10:00"], ["2027-03-01", "09:00"], ["2027-07-20", "17:00"]]) {
      const instant = zonedDateTimeToUtc(date, time);
      expect(casablancaClock(instant)).toBe(`${date}, ${time}`);
    }
  });

  it("donne la date du jour à Casablanca", () => {
    const instant = new Date("2026-12-31T23:30:00Z");
    expect(todayInZone("Africa/Casablanca", instant)).toBe(casablancaClock(instant).slice(0, 10));
    expect(todayInZone("Asia/Tokyo", instant)).toBe("2027-01-01");
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
