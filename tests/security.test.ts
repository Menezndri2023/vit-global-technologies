import { describe, expect, it } from "vitest";
import { canonicalJson, escapeHtml, generateToken, hashToken, safeEqual, safeFilename, clientIp } from "@/lib/security";

describe("escapeHtml", () => {
  it("neutralise les balises et attributs injectés dans un e-mail", () => {
    expect(escapeHtml('<a href="https://phish.example">Cliquez</a>')).toBe(
      "&lt;a href=&quot;https://phish.example&quot;&gt;Cliquez&lt;/a&gt;"
    );
    expect(escapeHtml("O'Brien & Co")).toBe("O&#39;Brien &amp; Co");
  });
});

describe("jetons", () => {
  it("génère des jetons longs, uniques et non stockés en clair", () => {
    const a = generateToken();
    const b = generateToken();
    expect(a).not.toBe(b);
    expect(a.length).toBeGreaterThanOrEqual(43);
    expect(hashToken(a)).toMatch(/^[0-9a-f]{64}$/);
    expect(hashToken(a)).not.toContain(a);
  });

  it("compare en temps constant", () => {
    expect(safeEqual("secret", "secret")).toBe(true);
    expect(safeEqual("secret", "secreT")).toBe(false);
    expect(safeEqual("secret", "secret-long")).toBe(false);
  });
});

describe("safeFilename", () => {
  it("empêche l'injection d'en-tête via le nom de fichier", () => {
    const name = safeFilename('evil".pdf\r\nSet-Cookie: x=1');
    expect(name).not.toMatch(/["\r\n]/);
    expect(safeFilename("")).toBe("fichier");
  });
});

describe("canonicalJson", () => {
  it("est indépendant de l'ordre des clés (empreinte reproductible)", () => {
    expect(canonicalJson({ b: 1, a: [2, { d: 3, c: 4 }] })).toBe(canonicalJson({ a: [2, { c: 4, d: 3 }], b: 1 }));
  });
});

describe("clientIp", () => {
  it("privilégie x-real-ip posé par la plateforme", () => {
    expect(clientIp(new Headers({ "x-real-ip": "1.2.3.4", "x-forwarded-for": "9.9.9.9" }))).toBe("1.2.3.4");
    expect(clientIp(new Headers({ "x-forwarded-for": "5.6.7.8, 10.0.0.1" }))).toBe("5.6.7.8");
    expect(clientIp(new Headers())).toBe("unknown");
  });
});
