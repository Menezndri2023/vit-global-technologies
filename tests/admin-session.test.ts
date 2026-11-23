import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { checkAdminPassword, createAdminSessionValue, verifyAdminSessionValue, ADMIN_SESSION_TTL_SECONDS } from "@/lib/admin-session";

const PASSWORD = "mot-de-passe-de-test-tres-long";

describe("session administrateur", () => {
  beforeEach(() => {
    process.env.ADMIN_PASSWORD = PASSWORD;
    process.env.AUTH_SECRET = "secret-de-test";
  });
  afterEach(() => {
    delete process.env.ADMIN_PASSWORD;
    delete process.env.AUTH_SECRET;
  });

  it("ne place jamais le mot de passe dans le cookie", () => {
    const value = createAdminSessionValue();
    expect(value).not.toContain(PASSWORD);
    expect(verifyAdminSessionValue(value)).toBe(true);
  });

  it("refuse l'ancien format (cookie = mot de passe)", () => {
    expect(verifyAdminSessionValue(PASSWORD)).toBe(false);
  });

  it("refuse un cookie falsifié ou expiré", () => {
    const value = createAdminSessionValue();
    const [exp, nonce] = value.split(".");
    expect(verifyAdminSessionValue(`${Number(exp) + 1000000}.${nonce}.${value.split(".")[2]}`)).toBe(false);
    const old = createAdminSessionValue(Date.now() - (ADMIN_SESSION_TTL_SECONDS + 1) * 1000);
    expect(verifyAdminSessionValue(old)).toBe(false);
  });

  it("invalide toutes les sessions quand le mot de passe change", () => {
    const value = createAdminSessionValue();
    process.env.ADMIN_PASSWORD = "nouveau-mot-de-passe";
    expect(verifyAdminSessionValue(value)).toBe(false);
  });

  it("vérifie le mot de passe sans accepter de valeur vide", () => {
    expect(checkAdminPassword(PASSWORD)).toBe(true);
    expect(checkAdminPassword("mauvais")).toBe(false);
    expect(checkAdminPassword("")).toBe(false);
    expect(checkAdminPassword(undefined)).toBe(false);
    delete process.env.ADMIN_PASSWORD;
    expect(checkAdminPassword("")).toBe(false);
  });
});
