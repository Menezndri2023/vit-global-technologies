"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";

type UserRow = {
  id: string;
  name: string | null;
  email: string;
  role: "CLIENT" | "PARTNER" | "ADMIN";
  createdAt: string;
};

const ROLES = ["CLIENT", "PARTNER", "ADMIN"];

export function AccountsPanel() {
  const t = useTranslations("admin");
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((json) => setUsers(json.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function updateRole(id: string, role: string) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: role as UserRow["role"] } : u)));
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, role })
    });
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-navy-950/[0.06] bg-white shadow-card">
      <table className="w-full text-start text-sm">
        <thead>
          <tr className="border-b border-navy-950/[0.06] text-xs uppercase tracking-wide text-silver-500">
            <th className="whitespace-nowrap px-5 py-3 text-start">{t("columns.date")}</th>
            <th className="whitespace-nowrap px-5 py-3 text-start">{t("columns.name")}</th>
            <th className="whitespace-nowrap px-5 py-3 text-start">{t("columns.email")}</th>
            <th className="whitespace-nowrap px-5 py-3 text-start">{t("accounts.role")}</th>
          </tr>
        </thead>
        <tbody>
          {!loading && users.length === 0 && (
            <tr>
              <td colSpan={4} className="px-5 py-10 text-center text-silver-500">
                {t("empty")}
              </td>
            </tr>
          )}
          {users.map((u) => (
            <tr key={u.id} className="border-b border-navy-950/[0.04] last:border-0">
              <td className="whitespace-nowrap px-5 py-3 text-silver-600">{new Date(u.createdAt).toLocaleString()}</td>
              <td className="whitespace-nowrap px-5 py-3 font-medium text-navy-950">{u.name || "—"}</td>
              <td className="whitespace-nowrap px-5 py-3 text-silver-600">{u.email}</td>
              <td className="whitespace-nowrap px-5 py-3">
                <select
                  value={u.role}
                  onChange={(e) => updateRole(u.id, e.target.value)}
                  className={clsx(
                    "rounded-full border border-navy-950/10 px-2.5 py-1 text-xs font-semibold outline-none",
                    u.role === "ADMIN" ? "bg-red-500/10 text-red-600" : u.role === "PARTNER" ? "bg-cyan-500/10 text-cyan-700" : "bg-brand-500/5 text-brand-600"
                  )}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
