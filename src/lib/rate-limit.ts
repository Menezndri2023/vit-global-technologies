import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { clientIp } from "@/lib/security";

/**
 * Limitation de fréquence à fenêtre glissante, stockée en base pour être partagée
 * entre toutes les instances serverless (une Map en mémoire ne suffit pas sur Vercel).
 * En cas d'indisponibilité de la base, la requête est laissée passer (fail-open) :
 * les routes concernées échoueraient de toute façon à l'écriture.
 */
export async function rateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  try {
    const since = new Date(Date.now() - windowMs);
    const count = await prisma.rateLimitHit.count({ where: { key, createdAt: { gte: since } } });
    if (count >= limit) return false;
    await prisma.rateLimitHit.create({ data: { key } });
    // Nettoyage opportuniste des entrées de plus de 24 h.
    if (Math.random() < 0.02) {
      await prisma.rateLimitHit.deleteMany({ where: { createdAt: { lt: new Date(Date.now() - 24 * 3600 * 1000) } } });
    }
    return true;
  } catch (error) {
    console.error("[rate-limit] check failed", error);
    return true;
  }
}

/** Limite par IP pour une route publique ; renvoie une réponse 429 si la limite est atteinte. */
export async function limitByIp(request: Request, scope: string, limit: number, windowMs: number) {
  const ip = clientIp(request.headers);
  const allowed = await rateLimit(`${scope}:ip:${ip}`, limit, windowMs);
  if (allowed) return null;
  return NextResponse.json(
    { error: "too_many_requests" },
    { status: 429, headers: { "Retry-After": String(Math.ceil(windowMs / 1000)) } }
  );
}

export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
