"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navigation, utilityNavigation } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const isEnglishRoute = pathname === "/en";
  const menuOpen = openPath === pathname;
  const mobileNavigation = [...navigation, ...utilityNavigation];
  const englishLabels: Record<string, { label: string; shortLabel: string }> = {
    "/": { label: "Home", shortLabel: "Home" },
    "/career-path": { label: "Path", shortLabel: "Path" },
    "/portfolio": { label: "Work", shortLabel: "Work" },
    "/lab": { label: "Check", shortLabel: "Check" },
    "/about": { label: "About", shortLabel: "About" },
    "/blog": { label: "Blog", shortLabel: "Blog" },
    "/services-calculator": { label: "Scope", shortLabel: "Scope" },
    "/ai-assistant": { label: "Assistant", shortLabel: "Assistant" },
    "/links": { label: "Contact", shortLabel: "Contact" },
    "/awards-credentials": { label: "Awards", shortLabel: "Awards" },
    "/en": { label: "English", shortLabel: "EN" },
    "/privacy": { label: "Privacy", shortLabel: "Privacy" },
  };

  function getRouteCopy(item: { href: string; label: string; shortLabel: string }) {
    return isEnglishRoute ? englishLabels[item.href] ?? item : item;
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div
          className={`pointer-events-auto mx-auto rounded-shell border backdrop-blur-md transition-all duration-300 ${
            scrolled
              ? "border-accent/20 bg-[rgba(18,24,22,0.92)]"
              : "border-border-subtle bg-[rgba(18,24,22,0.78)]"
          }`}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
            <Link href="/" className="flex min-h-11 min-w-0 items-center rounded-panel focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent">
              <div className="flex flex-col gap-0.5">
                <span className="font-display text-base font-extrabold uppercase tracking-wider text-foreground leading-none">
                  AI_NIKITKA93
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-titanium leading-none">
                  {isEnglishRoute ? "Nikita Kizevich // Vibe-coding, Web Apps & AI Media" : "Никита Кизевич // Вайбкодинг, веб-сервисы и медиа на ИИ"}
                </span>
              </div>
            </Link>

            <div className="hidden min-w-0 items-center gap-3 lg:flex">
              <div className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.6)] px-3 py-1.5 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent animate-pulse-lime"></span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent font-semibold">
                  {isEnglishRoute ? "SIGNAL: ONLINE" : "СИГНАЛ: В СЕТИ"}
                </span>
              </div>

              <nav
                aria-label={isEnglishRoute ? "Primary navigation" : "Основная навигация"}
                className="flex items-center gap-1"
              >
                {navigation.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`group relative inline-flex min-h-11 items-center rounded-panel px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-150 ${
                        isActive
                          ? "text-accent text-shadow-glow"
                          : "text-[rgba(214,207,191,0.76)] hover:text-foreground"
                      }`}
                    >
                      <span className="whitespace-nowrap">{getRouteCopy(item).label}</span>
                      <span
                        className={`absolute inset-x-3 bottom-1 h-px origin-left transition-transform duration-300 ${
                          isActive
                            ? "scale-x-100 bg-accent"
                            : "scale-x-0 bg-accent group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>

              <Link
                href={isEnglishRoute ? "/" : "/en"}
                aria-current={pathname === "/en" ? "page" : undefined}
                className="inline-flex min-h-11 min-w-12 items-center justify-center rounded-panel border border-border-subtle px-3 font-mono text-[11px] uppercase tracking-[0.18em] text-titanium transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                aria-label={isEnglishRoute ? "Переключить на русский" : "Open English summary"}
              >
                {isEnglishRoute ? "RU" : "EN"}
              </Link>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <div className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.6)] px-2.5 py-1.5 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent animate-pulse-lime"></span>
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-accent font-semibold">
                  {isEnglishRoute ? "ONLINE" : "В СЕТИ"}
                </span>
              </div>
              <Link
                href={isEnglishRoute ? "/" : "/en"}
                aria-current={pathname === "/en" ? "page" : undefined}
                className="inline-flex h-11 min-w-12 items-center justify-center rounded-panel border border-border-subtle px-3 font-mono text-[11px] uppercase tracking-[0.16em] text-titanium transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                aria-label={isEnglishRoute ? "Переключить на русский" : "Open English summary"}
              >
                {isEnglishRoute ? "RU" : "EN"}
              </Link>
              <button
                type="button"
                onClick={() =>
                  setOpenPath((value) => (value === pathname ? null : pathname))
                }
                className="inline-flex h-11 w-11 items-center justify-center rounded-panel border border-border-subtle text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-panel"
                aria-label={
                  menuOpen
                    ? isEnglishRoute
                      ? "Close menu"
                      : "Закрыть меню"
                    : isEnglishRoute
                      ? "Open menu"
                      : "Открыть меню"
                }
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {menuOpen ? (
            <nav
              id="mobile-nav-panel"
              aria-label={isEnglishRoute ? "Mobile navigation" : "Мобильная навигация"}
              className="border-t border-border-subtle px-3 pb-3 pt-2 lg:hidden"
            >
              <div className="grid gap-2">
                {mobileNavigation.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setOpenPath(null)}
                      className={`flex min-h-11 items-center rounded-panel border px-3 py-3 transition-colors text-xs font-semibold uppercase tracking-wider ${
                        isActive
                          ? "border-accent bg-[rgba(183,255,60,0.07)] text-accent"
                          : "border-border-subtle text-[rgba(214,207,191,0.76)]"
                      }`}
                    >
                      <span>{getRouteCopy(item).label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
