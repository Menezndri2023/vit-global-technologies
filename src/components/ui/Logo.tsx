type LogoProps = {
  className?: string;
  mark?: boolean;
  wordmark?: boolean;
  tone?: "dark" | "light";
};

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vitBlue" x1="10" y1="10" x2="60" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1436A8" />
        </linearGradient>
        <linearGradient id="vitSilver" x1="60" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E4E8EE" />
          <stop offset="1" stopColor="#8892A0" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="58" r="46" stroke="#1D4ED8" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="2 5" />
      <circle cx="60" cy="14" r="2.4" fill="#1D4ED8" />
      <circle cx="15" cy="42" r="1.8" fill="#8892A0" />
      <circle cx="105" cy="42" r="1.8" fill="#1D4ED8" />
      <circle cx="102" cy="78" r="1.6" fill="#1D4ED8" />

      <path d="M18 22 L52 92 L60 92 L64 80 L34 18 Z" fill="url(#vitBlue)" />
      <path
        d="M102 22 L68 92 L60 92 L64 80 L72 80 L76 70 L68 70 L72 60 L82 60 L88 46 L78 46 L86 22 Z"
        fill="url(#vitSilver)"
      />
      <circle cx="72" cy="80" r="2.2" fill="#1436A8" />
      <circle cx="82" cy="60" r="2.2" fill="#6B7789" />
    </svg>
  );
}

export function Logo({ className, mark = true, wordmark = true, tone = "dark" }: LogoProps) {
  const titleColor = tone === "dark" ? "text-navy-900" : "text-white";
  const subColor = tone === "dark" ? "text-silver-600" : "text-silver-300";

  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      {mark && <LogoMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />}
      {wordmark && (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-[1.15rem] font-bold tracking-tight sm:text-xl ${titleColor}`}>
            <span className="text-brand-600">VIT</span> GLOBAL
          </span>
          <span className={`text-[0.55rem] font-semibold uppercase tracking-[0.25em] sm:text-[0.6rem] ${subColor}`}>
            Technologies Group
          </span>
        </span>
      )}
    </span>
  );
}
