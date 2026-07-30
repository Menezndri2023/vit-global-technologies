"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { MessageCircle, X, Send, MessageCircleMore, LifeBuoy } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import clsx from "clsx";

type Message = { from: "bot" | "user"; text: string };

export function ChatWidget() {
  const t = useTranslations("chat");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    function onOpenRequest() {
      setOpen(true);
    }
    window.addEventListener("vit:open-chat", onOpenRequest);
    return () => window.removeEventListener("vit:open-chat", onOpenRequest);
  }, []);

  function sendMessage() {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, page: pathname, locale })
    }).catch(() => {});

    setTimeout(() => {
      setShowLeadForm(true);
    }, 500);
  }

  async function sendLead() {
    if (!email.trim()) return;
    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        message: messages.map((m) => `${m.from}: ${m.text}`).join("\n") || "Demande de contact via chat",
        page: pathname,
        locale
      })
    }).catch(() => {});
    setLeadSent(true);
    setShowLeadForm(false);
  }

  return (
    <div className="fixed bottom-5 end-5 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[520px] w-[340px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-navy-950/10 bg-white shadow-brand sm:w-[380px]">
          <div className="flex items-center justify-between bg-navy-950 px-4 py-4 text-white">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8" />
              <div>
                <p className="text-sm font-semibold">{t("title")}</p>
                <p className="flex items-center gap-1.5 text-xs text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {t("subtitle")}
                </p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label={t("openLabel")}>
              <X className="h-5 w-5 text-white/70 hover:text-white" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-navy-950/[0.02] p-4">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-navy-900 shadow-sm">
              {t("welcome")}
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href="https://wa.me/212607742672"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-500/20"
              >
                <MessageCircleMore className="h-3.5 w-3.5" /> {t("whatsappLabel")}
              </a>
              <Link
                href="/support"
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-500/20"
              >
                <LifeBuoy className="h-3.5 w-3.5" /> {t("faqLabel")}
              </Link>
            </div>

            {messages.map((m, i) => (
              <div
                key={i}
                className={clsx(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                  m.from === "user"
                    ? "ms-auto rounded-tr-sm bg-brand-600 text-white"
                    : "rounded-tl-sm bg-white text-navy-900"
                )}
              >
                {m.text}
              </div>
            ))}

            {showLeadForm && !leadSent && (
              <div className="rounded-2xl border border-brand-500/20 bg-white p-4 text-sm shadow-sm">
                <p className="mb-3 font-medium text-navy-900">{t("leadPrompt")}</p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("namePlaceholder")}
                  className="mb-2 w-full rounded-lg border border-navy-950/10 px-3 py-2 text-sm outline-none focus:border-brand-500"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className="mb-3 w-full rounded-lg border border-navy-950/10 px-3 py-2 text-sm outline-none focus:border-brand-500"
                />
                <button
                  type="button"
                  onClick={sendLead}
                  className="w-full rounded-lg bg-brand-600 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  {t("leadSubmit")}
                </button>
              </div>
            )}

            {leadSent && (
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-navy-900 shadow-sm">
                {t("leadThanks")}
              </div>
            )}
          </div>

          <div className="border-t border-navy-950/[0.06] p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={t("placeholder")}
                className="flex-1 rounded-full border border-navy-950/10 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
              />
              <button
                type="button"
                onClick={sendMessage}
                aria-label={t("send")}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-700"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[0.65rem] text-silver-500">{t("botDisclaimer")}</p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("openLabel")}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-brand transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
