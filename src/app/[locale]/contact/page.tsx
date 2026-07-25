import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { Mail, Phone, Clock, MapPin, FileText, CalendarCheck, LifeBuoy, ArrowRight } from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return buildMetadata({ locale, title: t("heroTitle"), description: t("heroSubtitle"), path: "/contact" });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");

  const otherWays = [
    { href: "/devis", icon: FileText, title: t("quoteCard"), desc: t("quoteCardDesc") },
    { href: "/rendez-vous", icon: CalendarCheck, title: t("appointmentCard"), desc: t("appointmentCardDesc") },
    { href: "/support", icon: LifeBuoy, title: t("supportCard"), desc: t("supportCardDesc") }
  ];

  return (
    <>
      <section className="bg-grid bg-white pb-16 pt-16 sm:pb-20 sm:pt-24">
        <div className="container-vit">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{t("heroEyebrow")}</Eyebrow>
            <h1 className="font-display mt-6 text-4xl font-bold tracking-tight text-navy-950 sm:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silver-600">{t("heroSubtitle")}</p>
          </div>
        </div>
      </section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <div className="rounded-3xl bg-navy-950 p-8 text-white">
              <h2 className="font-display text-lg font-semibold">{t("officeTitle")}</h2>
              <div className="mt-5 space-y-4 text-sm text-white/70">
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" /> {t("officeAddress")}
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-brand-400" />
                  <a href="mailto:contact@vitglobaltech.com" className="hover:text-white">
                    contact@vitglobaltech.com
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                  <a href="tel:+2250700000000" className="hover:text-white">
                    +225 07 00 00 00 00
                  </a>
                </p>
                <p className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" /> {t("hoursValue")}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-silver-500">{t("otherWays")}</p>
              {otherWays.map((way) => (
                <Link
                  key={way.href}
                  href={way.href}
                  className="flex items-center gap-4 rounded-2xl border border-navy-950/[0.06] bg-white p-4 transition-colors hover:border-brand-500/30"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                    <way.icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-navy-950">{way.title}</span>
                    <span className="block text-xs text-silver-600">{way.desc}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-silver-400" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-navy-950/[0.06] bg-white p-8 shadow-card sm:p-10">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
