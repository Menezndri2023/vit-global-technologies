"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/Logo";
import { AccountsPanel } from "./AccountsPanel";
import { CalendarPanel } from "./CalendarPanel";
import { Lock, LogOut, RefreshCw, FileDown, Paperclip, Link as LinkIcon, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

type EntityType = "contact" | "quote" | "appointment" | "job" | "partner" | "chat";
type MainTab = EntityType | "accounts" | "calendar";

const LEAD_TABS: EntityType[] = ["contact", "quote", "appointment", "job", "partner", "chat"];
const EXTRA_TABS: MainTab[] = ["accounts", "calendar"];
const STATUSES = ["NEW", "IN_PROGRESS", "DONE", "ARCHIVED"];

type Row = Record<string, unknown>;

export function AdminDashboard() {
  const t = useTranslations("admin");
  const [authState, setAuthState] = useState<"loading" | "in" | "out">("loading");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [tab, setTab] = useState<MainTab>("contact");
  const [rows, setRows] = useState<Row[]>([]);
  const [loadingRows, setLoadingRows] = useState(false);

  const loadRows = useCallback(async (type: MainTab) => {
    if (type === "accounts" || type === "calendar") {
      setAuthState((prev) => (prev === "loading" ? "in" : prev));
      return;
    }
    setLoadingRows(true);
    const res = await fetch(`/api/admin/data?type=${type}`);
    if (res.status === 401) {
      setAuthState("out");
      setLoadingRows(false);
      return;
    }
    const json = await res.json();
    setRows(json.data ?? []);
    setAuthState("in");
    setLoadingRows(false);
  }, []);

  useEffect(() => {
    loadRows(tab);
  }, [tab, loadRows]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(false);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    if (!res.ok) {
      setLoginError(true);
      return;
    }
    setPassword("");
    loadRows(tab);
  }

  async function updateStatus(id: string, status: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    await fetch("/api/admin/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: tab, id, status })
    });
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthState("out");
    setRows([]);
  }

  if (authState === "loading") {
    return <div className="flex min-h-[60vh] items-center justify-center text-silver-500">{t("title")}…</div>;
  }

  if (authState === "out") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-navy-950/[0.02] px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-3xl border border-navy-950/[0.06] bg-white p-8 shadow-card">
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>
          <h1 className="text-center font-display text-lg font-bold text-navy-950">{t("title")}</h1>
          <div className="mt-6">
            <label htmlFor="admin-password" className="text-sm font-medium text-navy-900">
              {t("passwordLabel")}
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-navy-950/10 px-4 py-3 text-sm outline-none focus:border-brand-500"
              required
            />
            {loginError && <p className="mt-2 text-xs font-medium text-red-500">{t("invalidPassword")}</p>}
          </div>
          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Lock className="h-4 w-4" /> {t("loginButton")}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-navy-950/[0.02] py-10">
      <div className="container-vit">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-2xl font-bold text-navy-950">{t("title")}</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-navy-950/10 bg-white px-4 py-2 text-sm font-medium text-navy-900 hover:border-red-300 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" /> {t("logout")}
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {LEAD_TABS.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTab(type)}
              className={clsx(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                tab === type ? "bg-brand-600 text-white" : "bg-white text-navy-900 hover:bg-brand-500/10"
              )}
            >
              {t(`tabs.${type}`)}
            </button>
          ))}
          <span className="mx-1 h-6 w-px self-center bg-navy-950/10" />
          {EXTRA_TABS.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTab(type)}
              className={clsx(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                tab === type ? "bg-navy-950 text-white" : "bg-white text-navy-900 hover:bg-navy-950/5"
              )}
            >
              {t(`tabs.${type}`)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => loadRows(tab)}
            className="ms-auto flex items-center gap-2 rounded-full border border-navy-950/10 bg-white px-4 py-2 text-sm font-medium text-navy-900"
          >
            <RefreshCw className={clsx("h-4 w-4", loadingRows && "animate-spin")} />
          </button>
        </div>

        {tab === "accounts" && <AccountsPanel />}
        {tab === "calendar" && <CalendarPanel />}

        {tab !== "accounts" && tab !== "calendar" && (
        <div className="overflow-x-auto rounded-2xl border border-navy-950/[0.06] bg-white shadow-card">
          <table className="w-full text-start text-sm">
            <thead>
              <tr className="border-b border-navy-950/[0.06] text-xs uppercase tracking-wide text-silver-500">
                <th className="whitespace-nowrap px-5 py-3 text-start">{t("columns.date")}</th>
                <th className="whitespace-nowrap px-5 py-3 text-start">{t("columns.name")}</th>
                <th className="whitespace-nowrap px-5 py-3 text-start">{t("columns.email")}</th>
                <th className="whitespace-nowrap px-5 py-3 text-start">Info</th>
                <th className="whitespace-nowrap px-5 py-3 text-start">{t("columns.status")}</th>
                <th className="whitespace-nowrap px-5 py-3 text-start">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-silver-500">
                    {t("empty")}
                  </td>
                </tr>
              )}
              {rows.map((row) => (
                <tr key={String(row.id)} className="border-b border-navy-950/[0.04] last:border-0">
                  <td className="whitespace-nowrap px-5 py-3 text-silver-600">
                    {row.createdAt ? new Date(row.createdAt as string).toLocaleString() : "—"}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 font-medium text-navy-950">{(row.name as string) || "—"}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-silver-600">{(row.email as string) || "—"}</td>
                  <td className="max-w-xs truncate px-5 py-3 text-silver-600">
                    {(row.subject as string) ||
                      (row.service as string) ||
                      (row.topic as string) ||
                      (row.position as string) ||
                      (row.partnerType as string) ||
                      (row.message as string) ||
                      "—"}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    <select
                      value={(row.status as string) || "NEW"}
                      onChange={(e) => updateStatus(String(row.id), e.target.value)}
                      className="rounded-full border border-navy-950/10 bg-brand-500/5 px-2.5 py-1 text-xs font-semibold text-brand-600 outline-none"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    <div className="flex items-center gap-3">
                      {tab === "quote" && (
                        <a
                          href={`/api/admin/quote/${row.id}/pdf`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
                        >
                          <FileDown className="h-3.5 w-3.5" /> PDF
                        </a>
                      )}
                      {tab === "quote" && row.attachmentName ? (
                        <a
                          href={`/api/admin/quote/${row.id}/attachment`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-navy-900 hover:text-brand-600"
                        >
                          <Paperclip className="h-3.5 w-3.5" /> {(row.attachmentName as string) || "Fichier"}
                        </a>
                      ) : null}
                      {tab === "quote" &&
                        (row.signature ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                            <CheckCircle2 className="h-3.5 w-3.5" /> {t("signed")}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              navigator.clipboard.writeText(`${window.location.origin}/devis/signature/${row.id}`)
                            }
                            className="inline-flex items-center gap-1 text-xs font-semibold text-navy-900 hover:text-brand-600"
                          >
                            <LinkIcon className="h-3.5 w-3.5" /> {t("copySignatureLink")}
                          </button>
                        ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
}
