import { setRequestLocale } from "next-intl/server";
import { LegalPage, legalMetadata } from "@/components/sections/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return legalMetadata("conditions-utilisation", locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage slug="conditions-utilisation" locale={locale} />;
}
