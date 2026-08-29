"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Search,
  X,
  ExternalLink,
  LayoutGrid,
  ListFilter,
  GraduationCap,
  Building2,
  Layers,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronDown,
  ChevronsDown,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  educationCertificates,
  CATEGORY_LABELS,
  type CertificateCategory,
  type CertificatePlatform,
} from "@/lib/education-data";

const INITIAL_BATCH_SIZE = 6;
const BATCH_INCREMENT = 6;

const PLATFORM_THEMES: Record<CertificatePlatform, { bg: string; text: string; border: string }> = {
  Coursera: { bg: "bg-[#0056D2]/10", text: "text-[#68a5ff]", border: "border-[#0056D2]/30" },
  edX: { bg: "bg-[#B61E2E]/10", text: "text-[#ff7582]", border: "border-[#B61E2E]/30" },
  Stepik: { bg: "bg-[#34A853]/10", text: "text-[#5ee985]", border: "border-[#34A853]/30" },
  Harvard: { bg: "bg-[#A51C30]/10", text: "text-[#ff8f9d]", border: "border-[#A51C30]/30" },
  IBM: { bg: "bg-[#0F62FE]/10", text: "text-[#78a9ff]", border: "border-[#0F62FE]/30" },
  Google: { bg: "bg-[#4285F4]/10", text: "text-[#8ab4f8]", border: "border-[#4285F4]/30" },
  Yandex: { bg: "bg-[#FC3F1D]/10", text: "text-[#ff8570]", border: "border-[#FC3F1D]/30" },
  Netology: { bg: "bg-[#6C5CE7]/10", text: "text-[#a29bfe]", border: "border-[#6C5CE7]/30" },
  GeekBrains: { bg: "bg-[#00CEC9]/10", text: "text-[#81ecec]", border: "border-[#00CEC9]/30" },
  "UN / WHO": { bg: "bg-[#009EDB]/10", text: "text-[#6cd5ff]", border: "border-[#009EDB]/30" },
  Other: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/30" },
};

export function EducationRegistry() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_BATCH_SIZE);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  // Check scroll positions for Category pills
  const updateScrollButtons = useCallback(() => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const hasScroll = el.scrollWidth > el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(hasScroll && el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [updateScrollButtons]);

  const scrollCategories = (direction: "left" | "right") => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -240 : 240;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(updateScrollButtons, 300);
  };

  // Keyboard shortcut listener (/ to search, Esc to clear)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (e.key === "/" && !isInput) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "Escape" && searchQuery) {
        setSearchQuery("");
        setVisibleCount(INITIAL_BATCH_SIZE);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchQuery]);

  // Handlers with automatic batch reset to 6 items and auto-centering
  const handleCategorySelect = (category: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(category);
    setVisibleCount(INITIAL_BATCH_SIZE);
    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
    setTimeout(updateScrollButtons, 300);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setVisibleCount(INITIAL_BATCH_SIZE);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setVisibleCount(INITIAL_BATCH_SIZE);
  };

  // Instant In-Memory Filter
  const filteredCertificates = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return educationCertificates.filter((item) => {
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      if (!matchCategory) return false;

      if (!query) return true;
      return (
        item.title.toLowerCase().includes(query) ||
        (item.titleRu && item.titleRu.toLowerCase().includes(query)) ||
        item.issuer.toLowerCase().includes(query) ||
        item.platform.toLowerCase().includes(query) ||
        item.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, selectedCategory]);

  // Sliced progressive batch of 6 items
  const totalCount = filteredCertificates.length;
  const visibleCertificates = useMemo(() => {
    return filteredCertificates.slice(0, visibleCount);
  }, [filteredCertificates, visibleCount]);

  const hasMore = visibleCount < totalCount;
  const remainingCount = totalCount - visibleCount;
  const nextBatchCount = Math.min(BATCH_INCREMENT, remainingCount);
  const progressPercent = totalCount > 0 ? Math.min(100, Math.round((visibleCertificates.length / totalCount) * 100)) : 0;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + BATCH_INCREMENT, totalCount));
  };

  const handleShowAll = () => {
    setVisibleCount(totalCount);
  };

  // Live category count calculations
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: educationCertificates.length };
    for (const cert of educationCertificates) {
      counts[cert.category] = (counts[cert.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="space-y-8">
      {/* 1. HERO TEASER: Digital Knowledge Core Art + Telemetry Stats */}
      <div className="relative overflow-hidden rounded-shell border border-border-subtle bg-[linear-gradient(135deg,rgba(183,255,60,0.06),rgba(18,24,22,0.92)_35%,rgba(10,13,12,0.98))] p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Mission copy & Metrics */}
          <div className="space-y-6 lg:col-span-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent font-semibold">
                  НЕПРЕРЫВНОЕ ОБУЧЕНИЕ // БАЗА ЗНАНИЙ
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl leading-tight">
                Реестр подтвержденных курсов и специализаций
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-[rgba(214,207,191,0.85)]">
                Здесь собраны пройденные онлайн-программы, академические специализации ведущих мировых университетов (Vanderbilt, Harvard, Stanford, MIT, IBM, Google) и сертификаты. Каждая запись содержит прямую ссылку на верификацию.
              </p>
            </div>

            {/* Telemetry Numbers Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-2">
              <div className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.6)] p-3.5 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-accent">
                  <GraduationCap size={15} />
                  <span className="font-mono text-[9px] uppercase tracking-wider">Всего курсов</span>
                </div>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-foreground mt-2">250+</span>
                <span className="text-[10px] text-titanium mt-0.5">Включая модули</span>
              </div>

              <div className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.6)] p-3.5 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-accent">
                  <Building2 size={15} />
                  <span className="font-mono text-[9px] uppercase tracking-wider">Вузы и платформы</span>
                </div>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-foreground mt-2">40+</span>
                <span className="text-[10px] text-titanium mt-0.5">Мировых академий</span>
              </div>

              <div className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.6)] p-3.5 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-accent">
                  <Layers size={15} />
                  <span className="font-mono text-[9px] uppercase tracking-wider">Сферы</span>
                </div>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-foreground mt-2">6</span>
                <span className="text-[10px] text-titanium mt-0.5">Направлений</span>
              </div>

              <div className="rounded-panel border border-accent/30 bg-accent/10 p-3.5 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-accent">
                  <ShieldCheck size={15} />
                  <span className="font-mono text-[9px] uppercase tracking-wider">Верификация</span>
                </div>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-accent mt-2">100%</span>
                <span className="text-[10px] text-foreground/80 mt-0.5">Прямые ссылки</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Knowledge Core Graphic with Dual-Zone Aura & HUD Orbital Ring */}
          <div className="flex items-center justify-center lg:col-span-4">
            <div className="relative flex h-60 w-60 items-center justify-center sm:h-72 sm:w-72 lg:h-80 lg:w-80">
              {/* Dual-Zone Ambient Glow */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(183,255,60,0.2)_0%,rgba(152,207,227,0.08)_45%,rgba(10,13,12,0)_70%)] animate-pulse-lime pointer-events-none" />

              {/* Cyber HUD Orbital Reticle */}
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full animate-[spin_120s_linear_infinite] opacity-35 pointer-events-none text-accent"
                viewBox="0 0 200 200"
              >
                <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 8" />
                <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
                <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 19" />
              </svg>

              {/* 3D Core Image */}
              <Image
                src="/education-core.png"
                alt="AI_Nikitka93 Digital Knowledge Core: 3D сфера компетенций и непрерывного образования"
                width={360}
                height={360}
                priority
                className="relative z-10 object-contain drop-shadow-[0_0_35px_rgba(183,255,60,0.28)] transition-all duration-700 hover:scale-105 hover:drop-shadow-[0_0_45px_rgba(183,255,60,0.4)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONTROL MATRIX (Instant Search + Scrollable Category Pills with Navigation Arrows) */}
      <div className="rounded-panel border border-border-subtle bg-[rgba(18,24,22,0.78)] p-4 md:p-5 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Input with [ / ] Affordance */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-titanium" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Поиск по вузу, курсу, навыку (нажмите / для фокуса)..."
              className="w-full rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.7)] py-2.5 pl-10 pr-20 text-xs sm:text-sm text-foreground placeholder:text-titanium/60 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              aria-label="Поиск по сертификатам"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="rounded p-1 text-titanium hover:text-foreground active:scale-[0.96] transition-transform"
                  aria-label="Очистить поиск"
                >
                  <X size={14} />
                </button>
              ) : (
                <kbd className="hidden sm:inline-block rounded border border-border-subtle bg-[rgba(18,24,22,0.8)] px-1.5 py-0.5 font-mono text-[10px] text-titanium">
                  /
                </kbd>
              )}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <div className="flex items-center rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.6)] p-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-xs font-mono transition duration-150 active:scale-[0.96] ${
                  viewMode === "grid"
                    ? "border border-accent/40 bg-accent/15 font-semibold text-accent"
                    : "text-titanium hover:text-foreground"
                }`}
                aria-pressed={viewMode === "grid"}
                aria-label="Сетка карточек"
              >
                <LayoutGrid size={13} />
                <span>СЕТКА</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-xs font-mono transition duration-150 active:scale-[0.96] ${
                  viewMode === "table"
                    ? "border border-accent/40 bg-accent/15 font-semibold text-accent"
                    : "text-titanium hover:text-foreground"
                }`}
                aria-pressed={viewMode === "table"}
                aria-label="Компактная таблица"
              >
                <ListFilter size={13} />
                <span>ТАБЛИЦА</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Pill Filters with Tactile Navigation Arrows & Gradient Masks */}
        <div className="relative flex items-center gap-1.5">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scrollCategories("left")}
            disabled={!canScrollLeft}
            className={`shrink-0 flex items-center justify-center h-8 w-8 rounded-panel border transition-all duration-150 active:scale-[0.92] ${
              canScrollLeft
                ? "border-accent/40 bg-[rgba(10,13,12,0.8)] text-accent hover:border-accent hover:bg-accent/15 shadow-[0_0_10px_rgba(183,255,60,0.12)] cursor-pointer"
                : "border-border-subtle/40 bg-[rgba(10,13,12,0.3)] text-titanium/30 cursor-not-allowed opacity-40"
            }`}
            aria-label="Прокрутить категории влево"
          >
            <ChevronLeft size={15} />
          </button>

          {/* Scrollable Pills Track */}
          <div
            ref={categoryScrollRef}
            onScroll={updateScrollButtons}
            className="flex-1 flex items-center gap-2 overflow-x-auto py-1 scrollbar-none scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <button
              type="button"
              onClick={(e) => handleCategorySelect("all", e)}
              className={`shrink-0 rounded-panel border px-3.5 py-1.5 text-xs transition duration-150 active:scale-[0.96] ${
                selectedCategory === "all"
                  ? "border-accent bg-accent/15 font-semibold text-foreground shadow-[0_0_12px_rgba(183,255,60,0.15)]"
                  : "border-border-subtle bg-[rgba(10,13,12,0.5)] text-titanium hover:border-accent/50 hover:text-foreground"
              }`}
            >
              Все направления ({categoryCounts.all ?? 0})
            </button>
            {(Object.keys(CATEGORY_LABELS) as CertificateCategory[]).map((catKey) => {
              const item = CATEGORY_LABELS[catKey];
              const count = categoryCounts[catKey] || 0;
              const active = selectedCategory === catKey;
              return (
                <button
                  key={catKey}
                  type="button"
                  onClick={(e) => handleCategorySelect(catKey, e)}
                  className={`shrink-0 rounded-panel border px-3.5 py-1.5 text-xs transition duration-150 active:scale-[0.96] flex items-center gap-1.5 ${
                    active
                      ? "border-accent bg-accent/15 font-semibold text-foreground shadow-[0_0_12px_rgba(183,255,60,0.15)]"
                      : "border-border-subtle bg-[rgba(10,13,12,0.5)] text-titanium hover:border-accent/50 hover:text-foreground"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  <span className="font-mono text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scrollCategories("right")}
            disabled={!canScrollRight}
            className={`shrink-0 flex items-center justify-center h-8 w-8 rounded-panel border transition-all duration-150 active:scale-[0.92] ${
              canScrollRight
                ? "border-accent/40 bg-[rgba(10,13,12,0.8)] text-accent hover:border-accent hover:bg-accent/15 shadow-[0_0_10px_rgba(183,255,60,0.12)] cursor-pointer"
                : "border-border-subtle/40 bg-[rgba(10,13,12,0.3)] text-titanium/30 cursor-not-allowed opacity-40"
            }`}
            aria-label="Прокрутить категории вправо"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Screen Reader live status */}
      <div role="status" aria-live="polite" className="sr-only">
        Показано {visibleCertificates.length} из {totalCount} курсов
      </div>

      {/* 3. DISPLAY RESULTS */}
      {filteredCertificates.length === 0 ? (
        <div className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.5)] p-12 text-center">
          <p className="font-mono text-sm text-accent uppercase tracking-wider">Ничего не найдено</p>
          <p className="mt-2 text-sm text-titanium">
            Попробуйте изменить поисковый запрос или выбрать другую категорию.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-5 inline-flex items-center gap-2 rounded-panel border border-accent bg-accent/10 px-4 py-2 text-xs font-mono text-accent hover:bg-accent/20 active:scale-[0.96] transition-transform"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID MODE: Initial 6 items (2 rows of 3) */
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCertificates.map((cert) => {
            const theme = PLATFORM_THEMES[cert.platform] || PLATFORM_THEMES.Other;
            const visibleSkills = cert.skills.slice(0, 4);
            const remainingSkillsCount = cert.skills.length - visibleSkills.length;
            const hasBadges = cert.isFlagship || cert.isSpecialization;

            return (
              <article
                key={cert.id}
                style={{ contentVisibility: "auto", containIntrinsicSize: "0 230px" }}
                className="group relative flex flex-col justify-between h-full rounded-shell border border-border-subtle bg-[linear-gradient(135deg,rgba(183,255,60,0.03),rgba(18,24,22,0.88)_40%,rgba(10,13,12,0.96))] p-5 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_24px_rgba(183,255,60,0.09)] hover:-translate-y-0.5"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-shell bg-gradient-to-r from-transparent via-accent/0 to-transparent transition-opacity duration-300 group-hover:via-accent/60" />

                <div className="flex-1 flex flex-col">
                  {/* Top Bar: Institution / University + Platform Channel */}
                  <div className="flex items-start justify-between gap-3 border-b border-border-subtle/40 pb-3">
                    <div className="flex items-start gap-2 min-w-0 flex-1">
                      <Building2 size={14} className="text-accent shrink-0 mt-0.5" />
                      <span
                        className="font-semibold text-xs sm:text-sm text-foreground leading-snug group-hover:text-accent transition-colors break-words"
                        title={cert.issuer}
                      >
                        {cert.issuer}
                      </span>
                    </div>

                    <span
                      className={`shrink-0 inline-flex items-center gap-1 rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide font-medium ${theme.border} ${theme.bg} ${theme.text}`}
                    >
                      {cert.platform}
                    </span>
                  </div>

                  {/* Flagship / Specialization Badges */}
                  {hasBadges && (
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      {cert.isFlagship && (
                        <span className="inline-flex items-center gap-1 rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[9px] uppercase text-amber-400">
                          <Award size={10} />
                          <span>Топ-программа</span>
                        </span>
                      )}
                      {cert.isSpecialization && (
                        <span className="inline-flex items-center gap-1 rounded border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[9px] uppercase text-accent">
                          <Sparkles size={9} />
                          <span>Специализация ({cert.coursesCount || 3}+ курса)</span>
                        </span>
                      )}
                    </div>
                  )}

                  {/* Program Title */}
                  <h3 className="mt-3 text-sm sm:text-base font-bold leading-snug text-foreground group-hover:text-accent transition-colors line-clamp-2">
                    {cert.title}
                  </h3>

                  {/* Russian Description / Breakdown */}
                  {cert.titleRu && (
                    <p className="mt-1.5 text-xs text-[rgba(214,207,191,0.85)] leading-relaxed line-clamp-2">
                      {cert.titleRu}
                    </p>
                  )}

                  {/* Skills tags */}
                  <div className="mt-4 pt-1 flex flex-wrap gap-1.5">
                    {visibleSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-[4px] border border-border-subtle bg-[rgba(10,13,12,0.6)] px-2 py-0.5 text-[10px] text-[rgba(214,207,191,0.74)] transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        {skill}
                      </span>
                    ))}
                    {remainingSkillsCount > 0 && (
                      <span className="rounded-[4px] border border-border-subtle bg-[rgba(10,13,12,0.4)] px-1.5 py-0.5 font-mono text-[9px] text-titanium">
                        +{remainingSkillsCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action / Verification Button */}
                <div className="mt-5 flex items-center justify-between border-t border-border-subtle/50 pt-3.5">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-titanium">
                    <BookOpen size={11} className="text-accent" />
                    <span>{cert.isSpecialization ? `Специализация` : "Сертификат"}</span>
                  </div>

                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-panel border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent transition-all duration-200 hover:border-accent hover:bg-accent/20 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    <span>Сверить сертификат</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* TABLE / COMPACT MODE */
        <div className="overflow-hidden rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.75)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[rgba(214,207,191,0.85)]">
              <thead className="border-b border-border-subtle bg-[rgba(10,13,12,0.85)] font-mono text-[10px] uppercase tracking-wider text-titanium">
                <tr>
                  <th className="py-3 px-4">Университет / Организация</th>
                  <th className="py-3 px-4">Программа / Специализация</th>
                  <th className="py-3 px-4 hidden md:table-cell">Платформа</th>
                  <th className="py-3 px-4 text-right">Подтверждение</th>
                </tr>
              </thead>
              <tbody className="divide-y border-border-subtle/30">
                {visibleCertificates.map((cert) => {
                  const theme = PLATFORM_THEMES[cert.platform] || PLATFORM_THEMES.Other;
                  return (
                    <tr
                      key={cert.id}
                      className="group transition-colors hover:bg-accent/[0.04] border-l-2 border-l-transparent hover:border-l-accent"
                    >
                      <td className="py-3 px-4 font-semibold text-foreground whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Building2 size={12} className="text-accent shrink-0" />
                          <span>{cert.issuer}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-foreground group-hover:text-accent transition-colors">
                          {cert.title}
                        </div>
                        {cert.titleRu && (
                          <div className="text-[11px] text-titanium">{cert.titleRu}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell whitespace-nowrap">
                        <span className={`inline-block rounded px-2 py-0.5 font-mono text-[9px] uppercase ${theme.border} ${theme.bg} ${theme.text} border`}>
                          {cert.platform}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 rounded-panel border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent transition-all duration-200 hover:border-accent hover:bg-accent/20 active:scale-[0.96]"
                        >
                          <span>Сверить</span>
                          <ExternalLink size={11} />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. TELEMETRY PROGRESS & PROGRESSIVE DISCLOSURE CONTROLS */}
      {filteredCertificates.length > 0 && (
        <div className="space-y-4 rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.6)] p-5 md:p-6 text-center">
          {/* Progress Bar & Telemetry Status */}
          <div className="mx-auto max-w-md space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-titanium">
              <span className="tracking-wide">
                ПОКАЗАНО: <span className="text-foreground font-semibold">{visibleCertificates.length}</span> ИЗ <span className="text-foreground font-semibold">{totalCount}</span>
              </span>
              <span className="text-accent font-semibold">{progressPercent}%</span>
            </div>

            {/* Futuristic Progress Track */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[rgba(10,13,12,0.85)] border border-border-subtle/50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent/60 via-accent to-accent shadow-[0_0_10px_rgba(183,255,60,0.5)] transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          {hasMore ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {/* Primary: Show Next Batch */}
              <button
                type="button"
                onClick={handleLoadMore}
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-panel border border-accent/40 bg-[linear-gradient(135deg,rgba(183,255,60,0.12),rgba(18,24,22,0.9))] px-6 py-3 text-xs sm:text-sm font-semibold font-mono text-accent shadow-[0_0_20px_rgba(183,255,60,0.08)] transition-all duration-200 hover:border-accent hover:bg-accent/20 hover:shadow-[0_0_28px_rgba(183,255,60,0.22)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>ПОКАЗАТЬ ЕЩЕ {nextBatchCount} КУРСОВ</span>
                <span className="inline-flex items-center justify-center rounded-full bg-accent/20 border border-accent/40 px-2 py-0.5 text-[10px] text-foreground font-mono font-normal">
                  (осталось {remainingCount})
                </span>
                <ChevronDown size={15} className="text-accent transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>

              {/* Secondary: Show All */}
              <button
                type="button"
                onClick={handleShowAll}
                className="inline-flex items-center justify-center gap-1.5 rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.6)] px-4 py-3 text-xs font-mono text-titanium hover:border-accent/40 hover:text-foreground transition-all duration-150 active:scale-[0.98]"
              >
                <ChevronsDown size={14} />
                <span>Развернуть весь реестр ({totalCount})</span>
              </button>
            </div>
          ) : totalCount > INITIAL_BATCH_SIZE ? (
            <div className="pt-2 text-center">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-titanium/80">
                <span className="h-1 w-1 rounded-full bg-accent" />
                Весь реестр из {totalCount} курсов полностью отображен
              </span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
