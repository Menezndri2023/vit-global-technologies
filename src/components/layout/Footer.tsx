import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { services } from "@/data/services";
import { filiales } from "@/data/filiales";
import { Mail, Phone, MapPin, Facebook } from "lucide-react";
import type { Locale } from "@/data/types";
import { CONTACT_EMAIL, CONTACT_PHONES, SOCIAL_LINKS } from "@/lib/contact";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.59-2.6 2.6 2.6 0 0 1 3.37-2.48V9.66a5.73 5.73 0 0 0-.78-.05A5.69 5.69 0 0 0 4.17 15.3 5.69 5.69 0 0 0 9.86 21a5.69 5.69 0 0 0 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.25-1.48Z" />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-950/[0.06] bg-navy-950 text-white">
      <div className="container-vit py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{t("footer.tagline")}</p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.network}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-400 hover:text-brand-300"
                >
                  {social.network === "facebook" ? <Facebook className="h-4 w-4" /> : <TikTokIcon className="h-4 w-4" />}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">{t("footer.company")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><Link href="/a-propos" className="hover:text-brand-300">{t("nav.aboutOverview")}</Link></li>
              <li><Link href="/equipe" className="hover:text-brand-300">{t("nav.team")}</Link></li>
              <li><Link href="/partenaires" className="hover:text-brand-300">{t("nav.partners")}</Link></li>
              <li><Link href="/carrieres" className="hover:text-brand-300">{t("nav.careersLink")}</Link></li>
              <li><Link href="/blog" className="hover:text-brand-300">{t("nav.blog")}</Link></li>
              <li><Link href="/modele-economique" className="hover:text-brand-300">{t("nav.modeleEconomique")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">{t("footer.solutions")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-brand-300">
                    {s.title[locale]}
                  </Link>
                </li>
              ))}
              <li><Link href="/services" className="font-medium text-brand-300 hover:text-brand-200">{t("common.seeAllServices")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">{t("nav.filiales")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {filiales.map((f) => (
                <li key={f.slug}>
                  <Link href={`/filiales/${f.slug}`} className="hover:text-brand-300">
                    {f.name}
                  </Link>
                </li>
              ))}
              <li><Link href="/solutions" className="hover:text-brand-300">{t("nav.solutions")}</Link></li>
              <li><Link href="/realisations" className="hover:text-brand-300">{t("nav.realisations")}</Link></li>
              <li><Link href="/portfolio" className="hover:text-brand-300">{t("nav.portfolio")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">{t("footer.resources")}</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                {t("footer.address")}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-400" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand-300">{CONTACT_EMAIL}</a>
              </li>
              {CONTACT_PHONES.map((phone) => (
                <li key={phone.e164} className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                  <a href={phone.href} className="hover:text-brand-300">{phone.label}</a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/support"
                className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
              >
                {t("nav.support")}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} VIT GLOBAL TECHNOLOGIES GROUP — {t("footer.rights")}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/mentions-legales" className="hover:text-white/80">{t("footer.legalMentions")}</Link>
            <Link href="/confidentialite" className="hover:text-white/80">{t("footer.privacyPolicy")}</Link>
            <Link href="/conditions-utilisation" className="hover:text-white/80">{t("footer.terms")}</Link>
            <Link href="/espace-partenaire" className="hover:text-white/80">{t("nav.partnerArea")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
