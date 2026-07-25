import type { ReactNode } from "react";
import clsx from "clsx";

export function Section({
  children,
  className,
  id,
  tone = "white"
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "white" | "muted" | "navy";
}) {
  const toneClasses = {
    white: "bg-white",
    muted: "bg-navy-950/[0.025]",
    navy: "bg-navy-950 text-white"
  };

  return (
    <section id={id} className={clsx("section-y", toneClasses[tone], className)}>
      <div className="container-vit">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "light" }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]",
        tone === "brand"
          ? "border-brand-500/20 bg-brand-500/5 text-brand-600"
          : "border-white/20 bg-white/10 text-white"
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark"
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  return (
    <div className={clsx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow tone={tone === "light" ? "light" : "brand"}>{eyebrow}</Eyebrow>}
      <h2
        className={clsx(
          "font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]",
          tone === "light" ? "text-white" : "text-navy-950"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={clsx("mt-4 text-base leading-relaxed sm:text-lg", tone === "light" ? "text-white/70" : "text-silver-600")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
