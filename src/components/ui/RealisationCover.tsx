import Image from "next/image";
import { clsx } from "clsx";
import type { Realisation } from "@/data/realisations";

// Vignette d'une réalisation : capture réelle du projet si disponible,
// sinon dégradé de marque + initiales (identité d'origine) avec motif discret.
export function RealisationCover({ item, className }: { item: Realisation; className?: string }) {
  const clientName = item.client.replace(/\s*\(.*\)\s*$/, "");

  if (item.image) {
    return (
      <div className={clsx("relative overflow-hidden bg-navy-950", className)}>
        <Image
          src={item.image}
          alt={clientName}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-navy-950/10" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={clsx("relative flex flex-col items-center justify-center overflow-hidden text-white", className)}
      style={{ background: `linear-gradient(135deg, ${item.color}, #0A1730)` }}
    >
      <svg className="pointer-events-none absolute -right-10 -top-12 h-48 w-48 text-white/10" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "14px 14px" }}
        aria-hidden="true"
      />
      <span className="relative text-3xl font-bold">{item.client.slice(0, 2).toUpperCase()}</span>
      <span className="relative mt-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">{clientName}</span>
    </div>
  );
}
