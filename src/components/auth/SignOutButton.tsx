"use client";

import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const t = useTranslations("auth");

  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-2 rounded-full border border-navy-950/10 bg-white px-4 py-2 text-sm font-medium text-navy-900 hover:border-red-300 hover:text-red-600"
    >
      <LogOut className="h-4 w-4" /> {t("logout")}
    </button>
  );
}
