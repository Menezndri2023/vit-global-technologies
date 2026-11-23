"use client";

import { useTranslations } from "next-intl";
import { CheckCircle2, XCircle } from "lucide-react";
import type { FormErrorCode } from "./useFormSubmit";

export function FormStatusMessage({ status, errorCode }: { status: "success" | "error"; errorCode?: FormErrorCode }) {
  const t = useTranslations("common");

  if (status === "success") {
    return (
      <div role="status" className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
        <div>
          <p className="font-semibold text-navy-950">{t("successTitle")}</p>
          <p className="mt-1 text-sm text-silver-600">{t("successBody")}</p>
        </div>
      </div>
    );
  }

  return (
    <div role="alert" className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
      <p className="text-sm text-navy-950">{errorCode ? t(`errors.${errorCode}`) : t("errorBody")}</p>
    </div>
  );
}
