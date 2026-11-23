import { setRequestLocale } from "next-intl/server";
import { LegalPage, legalMetadata } from "@/components/sections/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return legalMetadata("mentions-legales", locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage slug="mentions-legales" locale={locale} />;
}
