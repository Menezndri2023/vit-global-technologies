"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { CalendarDays, Link2Off, CheckCircle2 } from "lucide-react";

type Connection = { provider: string; accountEmail: string | null; updatedAt: string };

export function CalendarPanel() {
  const t = useTranslations("admin");
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    fetch("/api/admin/calendar/status")
      .then((res) => res.json())
      .then((json) => setConnections(json.data ?? []))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function disconnect(provider: string) {
    await fetch(`/api/admin/calendar/${provider}/disconnect`, { method: "POST" });
    load();
  }

  const isConnected = (provider: string) => connections.find((c) => c.provider === provider);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {(["google", "microsoft"] as const).map((provider) => {
        const connection = isConnected(provider);
        return (
          <div key={provider} className="rounded-2xl border border-navy-950/[0.06] bg-white p-6 shadow-card">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
                <CalendarDays className="h-4.5 w-4.5" />
              </span>
              <h3 className="font-display text-base font-semibold text-navy-950 capitalize">
                {provider === "google" ? "Google Calendar" : "Outlook Calendar"}
              </h3>
            </div>

            {!loading && connection ? (
              <div className="mt-4">
                <p className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" /> {t("calendar.connected")}
                </p>
                {connection.accountEmail && <p className="mt-1 text-xs text-silver-500">{connection.accountEmail}</p>}
                <button
                  type="button"
                  onClick={() => disconnect(provider)}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-navy-950/10 px-4 py-2 text-xs font-semibold text-navy-900 hover:border-red-300 hover:text-red-600"
                >
                  <Link2Off className="h-3.5 w-3.5" /> {t("calendar.disconnect")}
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-sm text-silver-500">{t("calendar.notConnected")}</p>
                <a
                  href={`/api/admin/calendar/${provider}/connect`}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700"
                >
                  {t("calendar.connect")}
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
