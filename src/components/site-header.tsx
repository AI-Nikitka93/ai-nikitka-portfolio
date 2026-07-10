"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navigation, siteConfig, utilityNavigation } from "@/lib/site";

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

  const activeItem =
    navigation.find((item) => item.href === pathname) ??
    utilityNavigation.find((item) => item.href === pathname) ??
    navigation.find((item) => pathname.startsWith(item.href) && item.href !== "/");

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div
          className={`pointer-events-auto mx-auto rounded-shell border backdrop-blur-md transition-all duration-300 ${
            scrolled
              ? "border-accent/70 bg-[rgba(18,24,22,0.92)]"
              : "border-border-subtle bg-[rgba(18,24,22,0.78)]"
          }`}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
            <Link href="/" className="flex min-h-11 min-w-0 items-center rounded-panel focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent">
              <div className="flex flex-col gap-1">
                <span className="signal-label text-[10px] text-accent">
                  {siteConfig.shortName}
                </span>
                <span className="hidden text-sm font-medium text-foreground sm:inline sm:text-base">
                  {isEnglishRoute ? "work and project portfolio" : "портфолио работ и проектов"}
                </span>
                <span className="text-sm font-medium text-foreground sm:hidden">
                  {isEnglishRoute ? "portfolio" : "портфолио"}
                </span>
              </div>
            </Link>

            <div className="hidden min-w-0 items-center gap-3 2xl:flex">
              <div className="rounded-panel border border-border-subtle px-3 py-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-titanium">
                  {activeItem ? getRouteCopy(activeItem).shortLabel : "Route"}
                </span>
              </div>

              <nav
                aria-label={isEnglishRoute ? "Primary navigation" : "Основная навигация"}
                className="flex items-center gap-1"
              >
                {navigation.map((item, index) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`group relative inline-flex min-h-11 items-center rounded-panel px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? "text-foreground"
                          : "text-[rgba(214,207,191,0.7)] hover:text-foreground"
                      }`}
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="ml-2 whitespace-nowrap">{getRouteCopy(item).label}</span>
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
                href="/en"
                aria-current={pathname === "/en" ? "page" : undefined}
                className="inline-flex min-h-11 min-w-12 items-center justify-center rounded-panel border border-border-subtle px-3 font-mono text-[11px] uppercase tracking-[0.18em] text-titanium transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                aria-label="Open English summary"
              >
                EN
              </Link>
            </div>

            <div className="flex items-center gap-3 2xl:hidden">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-titanium">
                {activeItem ? getRouteCopy(activeItem).shortLabel : "Home"}
              </span>
              <Link
                href="/en"
                aria-current={pathname === "/en" ? "page" : undefined}
                className="inline-flex h-11 min-w-12 items-center justify-center rounded-panel border border-border-subtle px-3 font-mono text-[11px] uppercase tracking-[0.16em] text-titanium transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                aria-label="Open English summary"
              >
                EN
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
              className="border-t border-border-subtle px-3 pb-3 pt-2 2xl:hidden"
            >
              <div className="grid gap-2">
                {mobileNavigation.map((item, index) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setOpenPath(null)}
                      className={`flex min-h-11 items-center rounded-panel border px-3 py-3 transition-colors ${
                        isActive
                          ? "border-accent bg-[rgba(183,255,60,0.07)] text-foreground"
                          : "border-border-subtle text-[rgba(214,207,191,0.76)]"
                      }`}
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-titanium">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="ml-2">{getRouteCopy(item).label}</span>
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
