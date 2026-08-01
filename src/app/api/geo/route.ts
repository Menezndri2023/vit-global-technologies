import { NextResponse } from "next/server";
import { currencyForCountry, DEFAULT_CURRENCY } from "@/lib/currency";

const CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const cache = new Map<string, { country: string | null; expiresAt: number }>();

function clientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip");
}

function isPrivateIp(ip: string) {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)
  );
}

export async function GET(request: Request) {
  const ip = clientIp(request);

  if (!ip || isPrivateIp(ip)) {
    return NextResponse.json({ country: null, currency: DEFAULT_CURRENCY });
  }

  const cached = cache.get(ip);
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json({ country: cached.country, currency: currencyForCountry(cached.country) });
  }

  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(2500)
    });
    if (!res.ok) throw new Error(`geo lookup failed: ${res.status}`);
    const data = (await res.json()) as { country_code?: string; error?: boolean };
    const country = data.error ? null : (data.country_code ?? null);
    cache.set(ip, { country, expiresAt: Date.now() + CACHE_TTL_MS });
    return NextResponse.json({ country, currency: currencyForCountry(country) });
  } catch {
    return NextResponse.json({ country: null, currency: DEFAULT_CURRENCY });
  }
}
