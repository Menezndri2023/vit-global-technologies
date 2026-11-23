import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section, Eyebrow } from "@/components/ui/Section";
import { SignatureForm } from "@/components/forms/SignatureForm";
import { resolveSignToken } from "@/lib/quote-signature";
import { CheckCircle2, AlertTriangle } from "lucide-react";

// Page strictement personnelle : jamais indexée, jamais mise en cache.
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer"
};

export default async function QuoteSignaturePage({
  params
}: {
  params: Promise<{ locale: string; token: string }>;
}) {
  const { locale, token } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("signature");

  const state = await resolveSignToken(token);

  if (state.status === "invalid" || state.status === "expired" || state.status === "superseded") {
    return (
      <Section tone="muted" className="min-h-[60vh]">
        <div className="mx-auto flex max-w-xl items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
          <AlertTriangle className="h-6 w-6 shrink-0 text-amber-600" />
          <div>
            <h1 className="font-semibold text-navy-950">{t(`${state.status}Title`)}</h1>
            <p className="mt-1 text-sm text-silver-600">{t(`${state.status}Body`)}</p>
          </div>
        </div>
      </Section>
    );
  }

  const { proposal, quote } = state;

  return (
    <>
      <section className="bg-grid bg-white pb-16 pt-16 sm:pb-20 sm:pt-24">
        <div className="container-vit">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h1 className="font-display mt-6 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">{t("title")}</h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-silver-600">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      <Section tone="muted">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-navy-950/[0.06] bg-white p-6 shadow-card">
            <h2 className="font-display text-base font-semibold text-navy-950">{t("summaryTitle")}</h2>
            <p className="mt-1 text-xs text-silver-500">
              {t("versionLabel", { version: proposal.version, reference: proposal.reference })}
            </p>
            <dl className="mt-4 grid gap-2 text-sm">
              <div className="flex justify-between gap-4 border-b border-navy-950/[0.05] py-2">
                <dt className="text-silver-500">{t("service")}</dt>
                <dd className="text-end font-medium text-navy-950">{proposal.service}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-navy-950/[0.05] py-2">
                <dt className="text-silver-500">{t("client")}</dt>
                <dd className="text-end font-medium text-navy-950">{proposal.client.name}</dd>
              </div>
              <div className="py-2">
                <dt className="mb-1 text-silver-500">{t("description")}</dt>
                <dd className="whitespace-pre-line text-navy-900">{proposal.description}</dd>
              </div>
            </dl>

            <h3 className="mt-4 font-display text-sm font-semibold text-navy-950">{t("linesTitle")}</h3>
            <ul className="mt-2 divide-y divide-navy-950/[0.05] text-sm">
              {proposal.lines.map((line, index) => (
                <li key={index} className="flex justify-between gap-4 py-2">
                  <span className="text-navy-900">{line.title}</span>
                  <span className="whitespace-nowrap font-semibold text-navy-950">{line.amount}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            {state.status === "signed" && quote.signature ? (
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-semibold text-navy-950">{t("alreadySignedTitle")}</p>
                  <p className="text-sm text-silver-600">{t("alreadySignedBody", { name: quote.signature.signerName })}</p>
                  <a
                    href={`/api/quote/signed-pdf?token=${encodeURIComponent(token)}`}
                    className="mt-2 inline-block text-sm font-semibold text-brand-600"
                  >
                    {t("downloadPdf")}
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-navy-950/[0.06] bg-white p-8 shadow-card">
                <SignatureForm token={token} locale={locale} />
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
