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
import { buildMetadata, TITLE_SUFFIX } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/structured-data";
import "../globals.css";

// Seules les traductions utilisées par les composants client (« use client ») sont envoyées au navigateur ;
// les autres restent côté serveur. Ajouter ici tout nouvel espace de noms lu par un composant client.
const CLIENT_NAMESPACES = ["common", "nav", "form", "auth", "chat", "support", "signature", "admin", "appointmentPage", "careers"] as const;

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
    title: { default: t("defaultTitle"), template: `%s${TITLE_SUFFIX}` },
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
  const allMessages = await getMessages();
  const messages = Object.fromEntries(CLIENT_NAMESPACES.map((ns) => [ns, allMessages[ns]]));

  return (
    <html lang={locale} dir={direction}>
      <body className="flex min-h-screen flex-col font-sans">
        <JsonLd data={siteGraph(locale)} />
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
