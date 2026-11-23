import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { statusColors } from "./ClientDashboard";
import { Handshake, FileText, Briefcase, Clock } from "lucide-react";

const DATE_LOCALE: Record<string, string> = { fr: "fr-FR", en: "en-GB", ar: "ar-MA" };

/**
 * Ne doit être rendu que pour un utilisateur dont l'e-mail est vérifié.
 * Les ressources partenaires ne sont affichées qu'aux comptes validés (rôle PARTNER ou ADMIN).
 */
export async function PartnerDashboard({
  name,
  email,
  isApprovedPartner
}: {
  name?: string | null;
  email: string;
  isApprovedPartner: boolean;
}) {
  const t = await getTranslations("partnerArea");
  const tStatus = await getTranslations("status");
  const locale = await getLocale();
  const requests = await prisma.partnerRequest.findMany({
    where: { email: { equals: email, mode: "insensitive" } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-silver-500">{t("welcomeBack")}</p>
          <h2 className="font-display text-xl font-bold text-navy-950">{name || email}</h2>
        </div>
        <SignOutButton />
      </div>

      {!isApprovedPartner && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
          <Clock className="h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-navy-900">{t("pendingApproval")}</p>
        </div>
      )}

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
                  <p className="text-xs text-silver-500">
                    {new Date(r.createdAt).toLocaleDateString(DATE_LOCALE[locale] ?? "fr-FR", { timeZone: "Africa/Casablanca" })}
                  </p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[r.status]}`}>{tStatus(r.status)}</span>
              </div>
            ))
          )}
        </div>

        {isApprovedPartner && (
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
        )}
      </div>
    </div>
  );
}
