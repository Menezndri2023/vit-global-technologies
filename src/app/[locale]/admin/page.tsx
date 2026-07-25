import { setRequestLocale } from "next-intl/server";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata = {
  robots: { index: false, follow: false }
};

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AdminDashboard />;
}
