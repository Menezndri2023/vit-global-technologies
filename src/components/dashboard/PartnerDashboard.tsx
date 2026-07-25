import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { Handshake, FileText, Briefcase } from "lucide-react";

const statusColors: Record<string, string> = {
  NEW: "bg-brand-500/10 text-brand-600",
  IN_PROGRESS: "bg-amber-500/10 text-amber-600",
  DONE: "bg-emerald-500/10 text-emerald-600",
  ARCHIVED: "bg-silver-500/10 text-silver-600"
};

export async function PartnerDashboard({ name, email }: { name?: string | null; email: string }) {
  const t = await getTranslations("partnerArea");
  const requests = await prisma.partnerRequest.findMany({ where: { email }, orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-silver-500">{t("welcomeBack")}</p>
          <h2 className="font-display text-xl font-bold text-navy-950">{name || email}</h2>
        </div>
        <SignOutButton />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-navy-950/[0.06] bg-white p-6 shadow-card lg:col-span-2">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
              <Handshake className="h-4.5 w-4.5" />
            </span>
            <h3 className="font-display text-base font-semibold text-navy-950">{t("myRequests")}</h3>
          </div>
          {requests.length === 0 ? (
            <p className="py-4 text-sm text-silver-500">—</p>
          ) : (
            requests.map((r) => (
              <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-950/[0.05] py-3 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-navy-950">{r.partnerType}</p>
                  <p className="text-xs text-silver-500">{new Date(r.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[r.status]}`}>{r.status}</span>
              </div>
            ))
          )}
        </div>

        <div className="rounded-2xl border border-navy-950/[0.06] bg-navy-950 p-6 text-white">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <FileText className="h-4.5 w-4.5" />
            </span>
            <h3 className="font-display text-base font-semibold">{t("resourcesTitle")}</h3>
          </div>
          <div className="space-y-2 text-sm text-white/70">
            <Link href="/services" className="flex items-center gap-2 hover:text-white">
              <Briefcase className="h-3.5 w-3.5" /> {t("resourcesServices")}
            </Link>
            <Link href="/realisations" className="flex items-center gap-2 hover:text-white">
              <Briefcase className="h-3.5 w-3.5" /> {t("resourcesCaseStudies")}
            </Link>
            <Link href="/contact" className="flex items-center gap-2 hover:text-white">
              <Briefcase className="h-3.5 w-3.5" /> {t("resourcesContact")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
