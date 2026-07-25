import type { ReactNode } from "react";
import clsx from "clsx";

const baseInputClasses =
  "w-full rounded-xl border border-navy-950/10 bg-white px-4 py-3 text-sm text-navy-950 placeholder:text-silver-500 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/15";

export function Field({
  label,
  htmlFor,
  error,
  required,
  children,
  className
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-navy-900">
        {label} {required && <span className="text-brand-500">*</span>}
      </label>
      {children}
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={clsx(baseInputClasses, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} rows={props.rows ?? 5} className={clsx(baseInputClasses, "resize-none", props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={clsx(baseInputClasses, "appearance-none bg-no-repeat", props.className)} />
  );
}
