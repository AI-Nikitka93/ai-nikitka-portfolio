"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
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
} from "lucide-react";
import {
  educationCertificates,
  CATEGORY_LABELS,
  type CertificateCategory,
  type CertificatePlatform,
} from "@/lib/education-data";

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
  const searchInputRef = useRef<HTMLInputElement>(null);

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
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchQuery]);

  // Instant In-Memory Search & Filtering (0ms Latency)
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
        item.skills.some((skill) => skill.toLowerCase().includes(query)) ||
        String(item.year).includes(query)
      );
    });
  }, [searchQuery, selectedCategory]);

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
      <div className="relative overflow-hidden rounded-shell border border-border-subtle bg-[linear-gradient(135deg,rgba(183,255,60,0.06),rgba(18,24,22,0.9)_35%,rgba(10,13,12,0.98))] p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Mission copy & Metrics */}
          <div className="space-y-6 lg:col-span-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent font-semibold">
                  НЕПРЕРЫВНОЕ ОБУЧЕНИЕ // 2005–2026
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl leading-tight">
                Реестр подтвержденных курсов и специализаций
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-[rgba(214,207,191,0.85)]">
                Здесь собраны все пройденные онлайн-программы, международные специализации и сертификаты. Каждая запись содержит прямую ссылку на верификацию в Coursera, edX, Stepik, Google Drive или профильной академии.
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
                  <span className="font-mono text-[9px] uppercase tracking-wider">Платформы</span>
                </div>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-foreground mt-2">40+</span>
                <span className="text-[10px] text-titanium mt-0.5">Вузов и академий</span>
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

          {/* Right Column: 3D Knowledge Core Graphic with ambient glow */}
          <div className="flex items-center justify-center lg:col-span-4">
            <div className="relative h-56 w-56 sm:h-64 sm:w-64 lg:h-72 lg:w-72 flex items-center justify-center">
              {/* Radial green backdrop aura */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(183,255,60,0.18)_0%,rgba(10,13,12,0)_70%)] animate-pulse-lime pointer-events-none" />
              
              <Image
                src="/education-core.png"
                alt="AI_Nikitka93 Digital Knowledge Core: 3D сфера компетенций и непрерывного образования"
                width={360}
                height={360}
                priority
                className="relative z-10 object-contain drop-shadow-[0_0_25px_rgba(183,255,60,0.25)] transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONTROL MATRIX (Instant Search + Category Pills + View Mode) */}
      <div className="rounded-panel border border-border-subtle bg-[rgba(18,24,22,0.78)] p-4 md:p-5 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-titanium" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по курсу, вузу, навыку (нажмите / для быстрого поиска)..."
              className="w-full rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.7)] py-2.5 pl-10 pr-10 text-xs sm:text-sm text-foreground placeholder:text-titanium/60 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              aria-label="Поиск по сертификатам"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-titanium hover:text-foreground active:scale-[0.96]"
                aria-label="Очистить поиск"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <div className="flex items-center rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.6)] p-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-xs font-mono transition ${
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
                className={`flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-xs font-mono transition ${
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

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
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
                onClick={() => setSelectedCategory(catKey)}
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
      </div>

      {/* Screen Reader status */}
      <div role="status" aria-live="polite" className="sr-only">
        Найдено сертификатов: {filteredCertificates.length}
      </div>

      {/* 3. DISPLAY RESULTS (Grid or Table Mode) */}
      {filteredCertificates.length === 0 ? (
        <div className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.5)] p-12 text-center">
          <p className="font-mono text-sm text-accent uppercase tracking-wider">Ничего не найдено</p>
          <p className="mt-2 text-sm text-titanium">
            Попробуйте изменить поисковый запрос или выбрать другую категорию.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-panel border border-accent bg-accent/10 px-4 py-2 text-xs font-mono text-accent hover:bg-accent/20 active:scale-[0.96]"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID MODE */
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCertificates.map((cert) => {
            const theme = PLATFORM_THEMES[cert.platform] || PLATFORM_THEMES.Other;
            return (
              <article
                key={cert.id}
                className="group flex flex-col justify-between rounded-shell border border-border-subtle bg-[linear-gradient(135deg,rgba(183,255,60,0.03),rgba(18,24,22,0.85)_40%,rgba(10,13,12,0.95))] p-5 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_18px_rgba(183,255,60,0.07)]"
              >
                <div>
                  {/* Top Bar: Platform Badge, Year, and Flagship Star */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1 rounded border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wide font-medium ${theme.border} ${theme.bg} ${theme.text}`}>
                      {cert.platform}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {cert.isFlagship && (
                        <span className="inline-flex items-center gap-1 rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[9px] uppercase text-amber-400">
                          <Award size={10} />
                          <span>Топ-программа</span>
                        </span>
                      )}
                      <span className="font-mono text-[11px] text-titanium">{cert.year}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3.5 text-sm sm:text-base font-semibold leading-snug text-foreground group-hover:text-accent transition-colors">
                    {cert.title}
                  </h3>

                  {/* Russian Subtitle / Translation if present */}
                  {cert.titleRu && (
                    <p className="mt-1 text-xs text-[rgba(214,207,191,0.78)] leading-relaxed">
                      {cert.titleRu}
                    </p>
                  )}

                  {/* Issuer */}
                  <p className="mt-2 text-xs font-mono text-titanium">
                    {cert.issuer}
                  </p>

                  {/* Skills tags */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-[4px] border border-border-subtle bg-[rgba(10,13,12,0.6)] px-2 py-0.5 text-[10px] text-[rgba(214,207,191,0.74)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action: Link to verify */}
                <div className="mt-5 flex items-center justify-between border-t border-border-subtle/50 pt-3.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-titanium">
                    {cert.isSpecialization ? `Специализация (${cert.coursesCount || 3}+)` : "Курс"}
                  </span>
                  
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-panel border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent transition-all duration-200 hover:border-accent hover:bg-accent/20 active:scale-[0.96]"
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
              <thead className="border-b border-border-subtle bg-[rgba(10,13,12,0.8)] font-mono text-[10px] uppercase tracking-wider text-titanium">
                <tr>
                  <th className="py-3 px-4">Год</th>
                  <th className="py-3 px-4">Платформа</th>
                  <th className="py-3 px-4">Программа / Курс</th>
                  <th className="py-3 px-4 hidden md:table-cell">Организация</th>
                  <th className="py-3 px-4 text-right">Подтверждение</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/30">
                {filteredCertificates.map((cert) => {
                  const theme = PLATFORM_THEMES[cert.platform] || PLATFORM_THEMES.Other;
                  return (
                    <tr key={cert.id} className="group transition-colors hover:bg-accent/[0.04]">
                      <td className="py-3 px-4 font-mono text-[11px] text-titanium whitespace-nowrap">
                        {cert.year}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`inline-block rounded px-2 py-0.5 font-mono text-[9px] uppercase ${theme.border} ${theme.bg} ${theme.text} border`}>
                          {cert.platform}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-foreground group-hover:text-accent transition-colors">
                          {cert.title}
                        </div>
                        {cert.titleRu && (
                          <div className="text-[11px] text-titanium">{cert.titleRu}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell font-mono text-[11px] text-titanium">
                        {cert.issuer}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1 rounded border border-accent/30 bg-accent/5 px-2.5 py-1 text-[11px] font-medium text-accent hover:border-accent hover:bg-accent/15 transition-colors"
                        >
                          <span>Проверить</span>
                          <ExternalLink size={10} />
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
    </div>
  );
}
