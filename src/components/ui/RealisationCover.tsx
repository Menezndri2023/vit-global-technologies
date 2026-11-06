import { Landmark, ShoppingBag, HeartPulse, Truck, Building2, Bot, Briefcase, type LucideIcon } from "lucide-react";
import { clsx } from "clsx";
import type { Realisation } from "@/data/realisations";

const ICONS: Record<string, LucideIcon> = {
  "banque-digitale-panafricaine": Landmark,
  "marketplace-ecommerce-regionale": ShoppingBag,
  "plateforme-sante-connectee": HeartPulse,
  "gestion-flotte-intelligente": Truck,
  "portail-services-publics": Building2,
  "assistant-ia-retail": Bot
};

// Vignette visuelle d'une réalisation : icône du secteur + nom du client sur le dégradé de marque.
export function RealisationCover({ item, className }: { item: Realisation; className?: string }) {
  const Icon = ICONS[item.slug] ?? Briefcase;
  const clientName = item.client.replace(/\s*\(.*\)\s*$/, "");
  return (
    <div
      className={clsx("relative flex flex-col items-center justify-center gap-3 overflow-hidden px-4 text-center text-white", className)}
      style={{ background: `linear-gradient(135deg, ${item.color}, #0A1730)` }}
    >
      <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="relative font-display text-sm font-semibold tracking-wide text-white/90">{clientName}</span>
    </div>
  );
}
