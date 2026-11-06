"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import type { Locale } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/data/services";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import clsx from "clsx";

type MenuKey = "company" | "services" | "resources" | null;

export function Header() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, []);

  const companyLinks = [
    { href: "/a-propos", label: t("nav.aboutOverview"), desc: t("nav.aboutOverviewDesc"), icon: "Building2" },
    { href: "/a-propos#histoire", label: t("nav.companyHistory"), desc: t("nav.companyHistoryDesc"), icon: "History" },
    { href: "/a-propos#vision", label: t("nav.companyVision"), desc: t("nav.companyVisionDesc"), icon: "Telescope" },
    { href: "/a-propos#mission", label: t("nav.companyMission"), desc: t("nav.companyMissionDesc"), icon: "Target" },
    { href: "/a-propos#valeurs", label: t("nav.companyValues"), desc: t("nav.companyValuesDesc"), icon: "Gem" },
    { href: "/equipe", label: t("nav.team"), desc: t("nav.teamDesc"), icon: "Users" },
    { href: "/partenaires", label: t("nav.partners"), desc: t("nav.partnersDesc"), icon: "Handshake" },
    { href: "/carrieres", label: t("nav.careersLink"), desc: t("nav.careersDesc"), icon: "Briefcase" },
    { href: "/modele-economique", label: t("nav.modeleEconomique"), desc: t("nav.modeleEconomiqueDesc"), icon: "PieChart" }
  ];

  const resourceLinks = [
    { href: "/realisations", label: t("nav.realisations"), desc: t("nav.realisationsDesc"), icon: "Trophy" },
    { href: "/portfolio", label: t("nav.portfolio"), desc: t("nav.portfolioDesc"), icon: "GalleryHorizontal" },
    { href: "/blog", label: t("nav.blog"), desc: t("nav.blogDesc"), icon: "Newspaper" },
    { href: "/support", label: t("nav.support"), desc: t("nav.supportDesc"), icon: "LifeBuoy" }
  ];

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled ? "border-navy-950/[0.06] bg-white/90 backdrop-blur-lg" : "border-transparent bg-white"
      )}
    >
      <div className="container-vit flex h-18 items-center justify-between gap-4 py-3">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <div ref={navRef} className="hidden items-center gap-0.5 xl:flex 2xl:gap-1">
          <NavDropdown
            label={t("nav.company")}
            isOpen={openMenu === "company"}
            onToggle={() => setOpenMenu(openMenu === "company" ? null : "company")}
          >
            <div className="grid w-[560px] grid-cols-2 gap-1 p-2">
              {companyLinks.map((item) => (
                <DropdownItem key={item.href} {...item} onNavigate={() => setOpenMenu(null)} />
              ))}
            </div>
          </NavDropdown>

          <NavDropdown
            label={t("nav.services")}
            isOpen={openMenu === "services"}
            onToggle={() => setOpenMenu(openMenu === "services" ? null : "services")}
          >
            <div className="grid w-[640px] grid-cols-2 gap-6 p-6">
              <div>
                <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-silver-500">
                  {t("nav.services")}
                </p>
                <div className="grid gap-0.5">
                  {services.slice(0, 8).map((s) => (
                    <MiniLink key={s.slug} href={`/services/${s.slug}`} icon={s.icon} label={s.title[locale]} onNavigate={() => setOpenMenu(null)} />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-silver-500">
                  &nbsp;
                </p>
                <div className="grid gap-0.5">
                  {services.slice(8).map((s) => (
                    <MiniLink key={s.slug} href={`/services/${s.slug}`} icon={s.icon} label={s.title[locale]} onNavigate={() => setOpenMenu(null)} />
                  ))}
                </div>
                <Link
                  href="/services"
                  onClick={() => setOpenMenu(null)}
                  className="mt-3 flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-semibold text-brand-600 hover:bg-brand-500/5"
                >
                  {t("common.seeAllServices")} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </NavDropdown>

          <NavLink href="/solutions" onClick={() => setOpenMenu(null)}>
            {t("nav.solutions")}
          </NavLink>

          <NavLink href="/filiales" onClick={() => setOpenMenu(null)}>
            {t("nav.filiales")}
          </NavLink>

          <NavDropdown
            label={t("nav.resources")}
            isOpen={openMenu === "resources"}
            onToggle={() => setOpenMenu(openMenu === "resources" ? null : "resources")}
          >
            <div className="grid w-80 gap-1 p-2">
              {resourceLinks.map((item) => (
                <DropdownItem key={item.href} {...item} onNavigate={() => setOpenMenu(null)} />
              ))}
            </div>
          </NavDropdown>

          <NavLink href="/contact" onClick={() => setOpenMenu(null)}>
            {t("nav.contact")}
          </NavLink>
        </div>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <LanguageSwitcher />
          <Link href="/espace-client" className="whitespace-nowrap px-2 text-sm font-medium text-navy-900/70 hover:text-brand-600">
            {t("nav.clientArea")}
          </Link>
          <Button as={Link} href="/devis" size="sm" className="whitespace-nowrap">
            {t("nav.getStarted")}
          </Button>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-full border border-navy-900/10 p-2 xl:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label={t("common.menu")}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white xl:hidden">
          <div className="container-vit flex h-18 items-center justify-between border-b border-navy-950/[0.06] py-3">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-navy-900/10 p-2"
              aria-label={t("common.close")}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="container-vit flex-1 overflow-y-auto py-6">
            <MobileAccordion
              label={t("nav.company")}
              open={mobileSection === "company"}
              onToggle={() => setMobileSection(mobileSection === "company" ? null : "company")}
            >
              {companyLinks.map((item) => (
                <MiniLink key={item.href} href={item.href} icon={item.icon} label={item.label} onNavigate={() => setMobileOpen(false)} />
              ))}
            </MobileAccordion>
            <MobileAccordion
              label={t("nav.services")}
              open={mobileSection === "services"}
              onToggle={() => setMobileSection(mobileSection === "services" ? null : "services")}
            >
              {services.map((s) => (
                <MiniLink key={s.slug} href={`/services/${s.slug}`} icon={s.icon} label={s.title[locale]} onNavigate={() => setMobileOpen(false)} />
              ))}
            </MobileAccordion>
            <Link href="/solutions" onClick={() => setMobileOpen(false)} className="block border-b border-navy-950/[0.06] py-4 font-semibold text-navy-900">
              {t("nav.solutions")}
            </Link>
            <Link href="/filiales" onClick={() => setMobileOpen(false)} className="block border-b border-navy-950/[0.06] py-4 font-semibold text-navy-900">
              {t("nav.filiales")}
            </Link>
            <MobileAccordion
              label={t("nav.resources")}
              open={mobileSection === "resources"}
              onToggle={() => setMobileSection(mobileSection === "resources" ? null : "resources")}
            >
              {resourceLinks.map((item) => (
                <MiniLink key={item.href} href={item.href} icon={item.icon} label={item.label} onNavigate={() => setMobileOpen(false)} />
              ))}
            </MobileAccordion>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block border-b border-navy-950/[0.06] py-4 font-semibold text-navy-900">
              {t("nav.contact")}
            </Link>
            <Link href="/espace-client" onClick={() => setMobileOpen(false)} className="block border-b border-navy-950/[0.06] py-4 font-semibold text-navy-900">
              {t("nav.clientArea")}
            </Link>
            <div className="mt-6 flex flex-col gap-3">
              <LanguageSwitcher />
              <Button as={Link} href="/devis" onClick={() => setMobileOpen(false)}>
                {t("nav.getStarted")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="whitespace-nowrap rounded-full px-3 py-2 2xl:px-4 text-sm font-medium text-navy-900/80 transition-colors hover:bg-navy-900/5 hover:text-navy-950"
    >
      {children}
    </Link>
  );
}

function NavDropdown({
  label,
  children,
  isOpen,
  onToggle
}: {
  label: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={clsx(
          "flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 2xl:px-4 text-sm font-medium transition-colors",
          isOpen ? "bg-navy-900/5 text-navy-950" : "text-navy-900/80 hover:bg-navy-900/5 hover:text-navy-950"
        )}
      >
        {label}
        <ChevronDown className={clsx("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="absolute start-0 top-full z-50 mt-2 rounded-2xl border border-navy-950/[0.06] bg-white shadow-brand">
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownItem({
  href,
  label,
  desc,
  icon,
  onNavigate
}: {
  href: string;
  label: string;
  desc: string;
  icon: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-brand-500/5"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
        <Icon name={icon} className="h-4.5 w-4.5" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-navy-950">{label}</span>
        <span className="block text-xs text-silver-600">{desc}</span>
      </span>
    </Link>
  );
}

function MiniLink({ href, label, icon, onNavigate }: { href: string; label: string; icon: string; onNavigate: () => void }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-navy-900/80 transition-colors hover:bg-brand-500/5 hover:text-brand-600"
    >
      <Icon name={icon} className="h-4 w-4 shrink-0 text-brand-500" />
      {label}
    </Link>
  );
}

function MobileAccordion({
  label,
  open,
  onToggle,
  children
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-navy-950/[0.06]">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between py-4 font-semibold text-navy-900">
        {label}
        <ChevronDown className={clsx("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="flex flex-col gap-0.5 pb-4">{children}</div>}
    </div>
  );
}
