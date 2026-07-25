import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <span className="font-display text-7xl font-bold text-brand-500/20">404</span>
      <h1 className="font-display mt-4 text-2xl font-bold text-navy-950 sm:text-3xl">{t("title")}</h1>
      <p className="mt-3 max-w-md text-silver-600">{t("body")}</p>
      <Button as={Link} href="/" className="mt-8" icon={<ArrowLeft className="h-4 w-4" />}>
        {t("button")}
      </Button>
    </div>
  );
}
