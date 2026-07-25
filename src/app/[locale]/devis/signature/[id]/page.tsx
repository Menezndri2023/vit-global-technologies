import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Section, Eyebrow } from "@/components/ui/Section";
import { SignatureForm } from "@/components/forms/SignatureForm";
import { CheckCircle2 } from "lucide-react";

export default async function QuoteSignaturePage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("signature");

  const quote = await prisma.quoteRequest.findUnique({ where: { id }, include: { signature: true } });
  if (!quote) notFound();

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
            <dl className="mt-4 grid gap-2 text-sm">
              <div className="flex justify-between border-b border-navy-950/[0.05] py-2">
                <dt className="text-silver-500">{t("service")}</dt>
                <dd className="font-medium text-navy-950">{quote.service}</dd>
              </div>
              <div className="flex justify-between border-b border-navy-950/[0.05] py-2">
                <dt className="text-silver-500">{t("client")}</dt>
                <dd className="font-medium text-navy-950">{quote.name}</dd>
              </div>
              <div className="flex justify-between border-b border-navy-950/[0.05] py-2">
                <dt className="text-silver-500">{t("budget")}</dt>
                <dd className="font-medium text-navy-950">{quote.budget ?? "—"}</dd>
              </div>
              <div className="py-2">
                <dt className="mb-1 text-silver-500">{t("description")}</dt>
                <dd className="text-navy-900">{quote.description}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8">
            {quote.signature ? (
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-semibold text-navy-950">{t("alreadySignedTitle")}</p>
                  <p className="text-sm text-silver-600">
                    {t("alreadySignedBody", { name: quote.signature.signerName })}
                  </p>
                  <a href={`/api/quote/${quote.id}/pdf-signed`} className="mt-2 inline-block text-sm font-semibold text-brand-600">
                    {t("downloadPdf")}
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-navy-950/[0.06] bg-white p-8 shadow-card">
                <SignatureForm quoteId={quote.id} defaultEmail={quote.email} />
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
