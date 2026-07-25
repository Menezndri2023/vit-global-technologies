import type { ReactNode } from "react";
import clsx from "clsx";

export function Card({
  children,
  className,
  hover = true,
  id
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={clsx(
        "rounded-2xl border border-navy-950/[0.06] bg-white p-6 shadow-card sm:p-8",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/20 hover:shadow-brand",
        className
      )}
    >
      {children}
    </div>
  );
}

export function StatBlock({ value, label }: { value: string; label: ReactNode }) {
  return (
    <div className="text-center sm:text-left">
      <div className="font-display text-3xl font-bold text-brand-600 sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-silver-600 sm:text-base">{label}</div>
    </div>
  );
}
