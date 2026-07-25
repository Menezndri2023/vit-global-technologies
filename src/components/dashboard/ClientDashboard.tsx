import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getUserActivity } from "@/lib/user-data";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { FileText, CalendarCheck, MessageSquare, Briefcase, PenLine, CheckCircle2 } from "lucide-react";

const statusColors: Record<string, string> = {
  NEW: "bg-brand-500/10 text-brand-600",
  IN_PROGRESS: "bg-amber-500/10 text-amber-600",
  DONE: "bg-emerald-500/10 text-emerald-600",
  ARCHIVED: "bg-silver-500/10 text-silver-600"
};

export async function ClientDashboard({ name, email }: { name?: string | null; email: string }) {
  const t = await getTranslations("clientArea");
  const { quotes, appointments, messages, jobs } = await getUserActivity(email);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-silver-500">{t("welcomeBack")}</p>
          <h2 className="font-display text-xl font-bold text-navy-950">{name || email}</h2>
        </div>
        <SignOutButton />
      </div>

      <div className="grid gap-6">
        <DashboardSection icon={FileText} title={t("myQuotes")} empty={quotes.length === 0}>
          {quotes.map((q) => (
            <div key={q.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-950/[0.05] py-3 last:border-0">
              <div>
                <p className="text-sm font-semibold text-navy-950">{q.service}</p>
                <p className="text-xs text-silver-500">{new Date(q.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                {q.signature ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {t("signed")}
                  </span>
                ) : (
                  <Link
                    href={`/devis/signature/${q.id}`}
                    className="inline-flex items-center gap-1 rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-semibold text-brand-600 hover:bg-brand-500/20"
                  >
                    <PenLine className="h-3.5 w-3.5" /> {t("signProposal")}
                  </Link>
                )}
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[q.status]}`}>
                  {q.status}
                </span>
              </div>
            </div>
          ))}
        </DashboardSection>

        <DashboardSection icon={CalendarCheck} title={t("myAppointments")} empty={appointments.length === 0}>
          {appointments.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-950/[0.05] py-3 last:border-0">
              <div>
                <p className="text-sm font-semibold text-navy-950">{a.topic}</p>
                <p className="text-xs text-silver-500">
                  {new Date(a.date).toLocaleDateString()} · {a.timeSlot}
                </p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[a.status]}`}>
                {a.status}
              </span>
            </div>
          ))}
        </DashboardSection>

        <DashboardSection icon={MessageSquare} title={t("myMessages")} empty={messages.length === 0}>
          {messages.map((m) => (
            <div key={m.id} className="border-b border-navy-950/[0.05] py-3 last:border-0">
              <p className="text-sm font-semibold text-navy-950">{m.subject}</p>
              <p className="text-xs text-silver-500">{new Date(m.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </DashboardSection>

        <DashboardSection icon={Briefcase} title={t("myApplications")} empty={jobs.length === 0}>
          {jobs.map((j) => (
            <div key={j.id} className="border-b border-navy-950/[0.05] py-3 last:border-0">
              <p className="text-sm font-semibold text-navy-950">{j.position}</p>
              <p className="text-xs text-silver-500">{new Date(j.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </DashboardSection>
      </div>
    </div>
  );
}

function DashboardSection({
  icon: Icon,
  title,
  empty,
  children
}: {
  icon: typeof FileText;
  title: string;
  empty: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-navy-950/[0.06] bg-white p-6 shadow-card">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <h3 className="font-display text-base font-semibold text-navy-950">{title}</h3>
      </div>
      {empty ? <p className="py-4 text-sm text-silver-500">—</p> : children}
    </div>
  );
}
