import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { getDirection } from "@/i18n/direction";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/layout/ChatWidget";
import { AuthSessionProvider } from "@/components/providers/AuthSessionProvider";
import { CurrencyProvider } from "@/components/providers/CurrencyProvider";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import "../globals.css";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VIT GLOBAL TECHNOLOGIES GROUP",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Boulevard Lalla Yacout & Rue El Arrar, Résidence Galis",
    addressLocality: "Casablanca",
    addressCountry: "MA"
  },
  sameAs: []
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale,
    title: { default: t("defaultTitle"), template: `%s — ${t("siteName")}` },
    description: t("defaultDescription")
  });
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  setRequestLocale(locale);
  const direction = getDirection(locale as AppLocale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={direction}>
      <body className="flex min-h-screen flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthSessionProvider>
            <CurrencyProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <ChatWidget />
            </CurrencyProvider>
          </AuthSessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
