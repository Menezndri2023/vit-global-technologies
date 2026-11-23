import { NextResponse } from "next/server";
import { currencyForCountry, DEFAULT_CURRENCY } from "@/lib/currency";

/**
 * Pays du visiteur, pour proposer la devise d'affichage par défaut.
 * Utilise l'en-tête de géolocalisation fourni par Vercel : l'adresse IP du visiteur
 * n'est plus transmise à un service tiers (ancien appel à ipapi.co).
 */
export async function GET(request: Request) {
  const raw = request.headers.get("x-vercel-ip-country");
  const country = raw && /^[A-Z]{2}$/i.test(raw) ? raw.toUpperCase() : null;
  return NextResponse.json(
    { country, currency: country ? currencyForCountry(country) : DEFAULT_CURRENCY },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
