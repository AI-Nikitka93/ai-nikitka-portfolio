"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { catalogData } from "@/data/catalog";
import { Lang, t, translateArtist, translateMeta } from "@/utils/translate";

interface ReleaseGridProps {
  lang: Lang;
  onSpotlightSelect: (id: string) => void;
}

export default function ReleaseGrid({ lang, onSpotlightSelect }: ReleaseGridProps) {
  const releases = catalogData.releases;
  const artists = catalogData.artists;

  const [activeArtistId, setActiveArtistId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(9); // Pagination: load more

  const artistsById = useMemo(() => {
    return new Map(artists.map((a) => [a.id, a]));
  }, [artists]);

  // Comprehensive search/filter logic
  const filteredReleases = useMemo(() => {
    let list = releases;

    // Filter by artist
    if (activeArtistId !== "all") {
      list = list.filter((r) => r.artistId === activeArtistId);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((r) => {
        const artist = artistsById.get(r.artistId);
        return (
          r.title.toLowerCase().includes(q) ||
          r.genre.toLowerCase().includes(q) ||
          r.language.toLowerCase().includes(q) ||
          (artist && artist.name.toLowerCase().includes(q)) ||
          r.tracks.some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    // Sort by date (descending)
    return [...list].sort((a, b) => b.date.localeCompare(a.date));
  }, [activeArtistId, searchQuery, releases, artistsById]);

  // Paginated list
  const paginatedReleases = useMemo(() => {
    return filteredReleases.slice(0, visibleCount);
  }, [filteredReleases, visibleCount]);

  // Template index mapping based on release ID hash to ensure consistent templates for releases
  const getTemplateType = (releaseId: string): "vinyl" | "cassette" | "envelope" | "folder" | "catalog" => {
    let hash = 0;
    for (let i = 0; i < releaseId.length; i++) {
      hash = releaseId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const idx = Math.abs(hash) % 5;
    const types: ("vinyl" | "cassette" | "envelope" | "folder" | "catalog")[] = [
      "vinyl",
      "cassette",
      "envelope",
      "folder",
      "catalog",
    ];
    return types[idx];
  };

  const renderReleaseCard = (release: typeof releases[0]) => {
    const artist = artistsById.get(release.artistId) || artists[0];
    const template = getTemplateType(release.id);
    const accent = artist.accent || "#ffffff";

    // Outer card animations matching requested scale 0.97
    const cardAnims = {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      hover: { scale: 0.97, y: 2 },
    };

    switch (template) {
      case "vinyl":
        // 1. Vinyl Sleeve Template
        return (
          <motion.article
            layout
            variants={cardAnims}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            className="relative flex flex-col min-h-[460px] bg-bg-card border border-border-primary overflow-hidden group shadow-[2px_2px_0px_var(--color-border-primary)]"
          >
            {/* Peeking Vinyl Circle */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#0b0b0c] border border-black/85 opacity-80 flex items-center justify-center pointer-events-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">
              <div className="w-10 h-10 rounded-full border border-zinc-800 bg-[#121214]" />
            </div>

            {/* Sleeve Cover Area */}
            <div className={`h-56 relative overflow-hidden ${artist.texture}`} style={{ backgroundColor: accent }}>
              <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start text-black uppercase font-mono text-[9px] font-bold">
                <span>{translateArtist(artist, "shortLane", lang)}</span>
                <span>{release.dateLabel}</span>
              </div>
              <div className="absolute bottom-4 left-4 flex flex-col text-black">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">LP RECORD</span>
                <span className="text-lg font-serif font-bold leading-none truncate max-w-[200px]">{release.title}</span>
              </div>
              {/* Circular record shadow */}
              <div className="absolute inset-6 rounded-full border border-black/10 pointer-events-none" />
            </div>

            {/* Sleeve Content Area */}
            <div className="p-5 flex-1 flex flex-col justify-between text-text-primary">
              <p className="text-xs text-text-secondary font-sans leading-relaxed line-clamp-3 mb-4">
                {release.story || (lang === "ru" 
                  ? "Студийный виниловый релиз. Отличное качество звука и классическое оформление." 
                  : "Studio vinyl release. High-fidelity audio quality and classic design.")}
              </p>

              <div>
                <div className="border-t border-border-muted pt-4 flex justify-between items-center text-[10px] font-sans font-bold text-text-secondary uppercase">
                  <span>{release.tracks.length} {lang === "ru" ? "ТРЕКОВ" : "TRACKS"}</span>
                  <span>{translateMeta(release.genre, lang)}</span>
                </div>
                <button
                  onClick={() => onSpotlightSelect(release.id)}
                  className="w-full mt-4 py-2 border border-border-primary hover:bg-text-primary hover:text-bg-base rounded-none text-xs font-bold text-text-primary transition-colors duration-200 uppercase"
                >
                  {t("timelineView", lang)}
                </button>
              </div>
            </div>
          </motion.article>
        );

      case "cassette":
        // 2. Vintage Cassette Tape Template
        return (
          <motion.article
            layout
            variants={cardAnims}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            className="relative flex flex-col min-h-[460px] bg-bg-card border border-border-primary overflow-hidden group shadow-[2px_2px_0px_var(--color-border-primary)]"
          >
            {/* Cassette face wrapper */}
            <div className="p-4 bg-bg-cardboard border-b border-border-primary flex justify-between items-center text-[9px] font-mono text-text-secondary font-bold">
              <span>CASSETTE TAPE</span>
              <span>A / B SIDE</span>
            </div>

            {/* Taped label effect */}
            <div className="mx-5 my-6 p-4 bg-[#eae3cf] text-zinc-900 border border-zinc-400 relative shadow-sm flex flex-col gap-2 rounded-none">
              <div className="absolute top-1 right-2 font-mono text-[8px] text-zinc-500 uppercase">NK-C90</div>
              <h3 className="text-base font-sans font-black tracking-tight uppercase leading-none border-b border-zinc-400 pb-2">
                {release.title}
              </h3>
              <p className="text-[9px] font-mono text-zinc-600 line-clamp-3 leading-snug">
                {release.story || (lang === "ru" ? "Аналоговая кассетная запись. Ограниченный тираж." : "Analog cassette tape recording. Limited edition.")}
              </p>
            </div>

            {/* Content info */}
            <div className="p-5 flex-1 flex flex-col justify-between text-text-primary">
              <div className="text-[10px] font-sans font-bold flex flex-col gap-1 text-text-secondary">
                <div>ARTIST: {artist.name}</div>
                <div>RELEASE: {release.dateLabel}</div>
              </div>

              <div>
                <div className="border-t border-border-muted pt-4 flex justify-between items-center text-[10px] font-sans font-bold text-text-secondary uppercase">
                  <span>{release.tracks.length} {lang === "ru" ? "ТРЕКОВ" : "TRACKS"}</span>
                  <span>{translateMeta(release.genre, lang)}</span>
                </div>
                <button
                  onClick={() => onSpotlightSelect(release.id)}
                  className="w-full mt-4 py-2 border border-border-primary hover:bg-text-primary hover:text-bg-base rounded-none text-xs font-bold text-text-primary transition-colors duration-200 uppercase"
                >
                  {t("timelineView", lang)}
                </button>
              </div>
            </div>
          </motion.article>
        );

      case "envelope":
        // 3. Kraft Envelope Template
        return (
          <motion.article
            layout
            variants={cardAnims}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            className="relative flex flex-col min-h-[460px] bg-bg-card border border-border-primary overflow-hidden group shadow-[2px_2px_0px_var(--color-border-primary)]"
          >
            {/* Flap lines representation */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-bg-cardboard border-b border-border-primary flex items-center justify-center">
              <div className="w-12 h-1 bg-text-primary rounded-full opacity-10" />
            </div>

            <div className="p-5 pt-8 flex-1 flex flex-col justify-between text-text-primary">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[9px] font-mono text-brand-accent border border-brand-accent px-1 py-0.5 rounded-none font-bold uppercase">
                    CONFIDENTIAL
                  </span>
                  <span className="text-[9px] font-mono font-bold text-text-secondary">{release.dateLabel}</span>
                </div>

                <h3 className="text-xl font-serif text-text-primary tracking-tight leading-none mb-3">
                  {release.title}
                </h3>
                <p className="text-xs text-text-secondary font-sans mb-4 leading-relaxed line-clamp-4">
                  {release.story || (lang === "ru" 
                    ? "Запись из архива продюсера. Поставляется в оригинальном крафтовом конверте. Уникальные лингвистические коды." 
                    : "Recording from the producer's archives. Delivered in an authentic kraft envelope. Unique linguistic codes.")}
                </p>
              </div>

              <div>
                {/* Stamp overlay */}
                <div className="text-red-800/80 text-[10px] font-mono font-bold uppercase tracking-widest border border-red-800/50 px-2 py-0.5 inline-block rotate-[-6deg] mb-4">
                  DEEP AUDIO
                </div>

                <div className="border-t border-border-muted pt-4 flex justify-between items-center text-[10px] font-sans font-bold text-text-secondary uppercase">
                  <span>{artist.name}</span>
                  <span>{translateMeta(release.genre, lang)}</span>
                </div>
                <button
                  onClick={() => onSpotlightSelect(release.id)}
                  className="w-full mt-4 py-2 border border-border-primary hover:bg-text-primary hover:text-bg-base rounded-none text-xs font-bold text-text-primary transition-colors duration-200 uppercase"
                >
                  {t("timelineView", lang)}
                </button>
              </div>
            </div>
          </motion.article>
        );

      case "folder":
        // 4. File Folder Template
        return (
          <motion.article
            layout
            variants={cardAnims}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            className="relative flex flex-col min-h-[460px] bg-bg-card border border-border-primary overflow-hidden group shadow-[2px_2px_0px_var(--color-border-primary)]"
          >
            {/* Folder Tab graphic */}
            <div className="absolute top-0 left-5 w-24 h-4 bg-bg-cardboard border-x border-t border-border-primary rounded-t-sm flex items-center justify-center text-[8px] font-mono font-bold text-text-secondary">
              {release.id.substring(0, 10).toUpperCase()}
            </div>

            <div className="p-5 pt-8 flex-1 flex flex-col justify-between text-text-primary">
              <div>
                <span className="text-[9px] font-mono text-text-secondary font-bold uppercase tracking-widest block mb-2">
                  FOLDER_REF // {release.tracks.length}_FILES
                </span>
                <h3 className="text-2xl font-serif text-text-primary tracking-tight leading-none mb-3">
                  {release.title}
                </h3>
                <p className="text-xs text-text-secondary font-sans line-clamp-3 leading-relaxed mb-4">
                  {release.story || (lang === "ru" 
                    ? "Архивные файлы студии. Релиз содержит уникальные нарезки, полевые записи и синтезаторные дорожки." 
                    : "Archived studio files. The release contains unique cuts, field recordings, and synthesizer tracks.")}
                </p>
              </div>

              <div>
                {/* Paperclip representation */}
                <div className="h-6 w-10 border-2 border-dashed border-zinc-700 rounded-none flex items-center justify-center text-[8px] font-mono text-zinc-500 mb-4 uppercase">
                  clip
                </div>

                <div className="border-t border-border-muted pt-4 flex justify-between items-center text-[10px] font-sans font-bold text-text-secondary uppercase">
                  <span>{artist.name}</span>
                  <span>{release.dateLabel}</span>
                </div>
                <button
                  onClick={() => onSpotlightSelect(release.id)}
                  className="w-full mt-4 py-2 border border-border-primary hover:bg-text-primary hover:text-bg-base rounded-none text-xs font-bold text-text-primary transition-colors duration-200 uppercase"
                >
                  {t("timelineView", lang)}
                </button>
              </div>
            </div>
          </motion.article>
        );

      case "catalog":
      default:
        // 5. Index Card Catalog Template
        return (
          <motion.article
            layout
            variants={cardAnims}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            className="relative flex flex-col min-h-[460px] bg-bg-card border border-border-primary overflow-hidden group shadow-[2px_2px_0px_var(--color-border-primary)]"
          >
            {/* Top divider */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-accent" />

            <div className="p-5 pt-8 flex-1 flex flex-col justify-between text-text-primary">
              <div>
                <div className="flex justify-between items-center text-[8px] text-text-secondary border-b border-border-muted pb-2 mb-3">
                  <span>LIBRARY CATALOG CARD</span>
                  <span>NO. {release.id.substring(0, 5).toUpperCase()}</span>
                </div>

                <h3 className="text-lg font-serif tracking-tight text-text-primary leading-none mb-3">
                  {release.title}
                </h3>
                <p className="text-[10px] text-text-secondary font-normal line-clamp-4 leading-relaxed mb-4">
                  {release.story || (lang === "ru" 
                    ? "Классическая библиотечная карточка каталога. Содержит метаданные, имена авторов и композиторов." 
                    : "Classic library catalog card. Contains metadata, author names, and composer details.")}
                </p>
              </div>

              <div>
                {/* Stamp matrix */}
                <div className="grid grid-cols-2 gap-2 text-[8px] text-text-secondary uppercase font-mono border border-border-muted p-2 mb-4 rounded-none">
                  <div>DATE: {release.dateLabel}</div>
                  <div>LANG: {translateMeta(release.language, lang) || "INSTR"}</div>
                </div>

                <div className="border-t border-border-muted pt-4 flex justify-between items-center text-[10px] text-text-secondary">
                  <span>{artist.name}</span>
                  <span>{translateMeta(release.genre, lang)}</span>
                </div>
                <button
                  onClick={() => onSpotlightSelect(release.id)}
                  className="w-full mt-4 py-2 border border-border-primary hover:bg-text-primary hover:text-bg-base rounded-none text-xs font-bold text-text-primary transition-colors duration-200 uppercase"
                >
                  {t("timelineView", lang)}
                </button>
              </div>
            </div>
          </motion.article>
        );
    }
  };

  return (
    <section id="catalog" className="py-20 px-6 md:px-10 max-w-[1360px] mx-auto text-text-primary border-t border-border-primary">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
        <div>
          <span className="text-[10px] font-bold text-brand-accent font-sans tracking-widest uppercase block mb-2">
            {t("sectionCatalogTitle", lang)}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-text-primary leading-tight">
            {t("sectionCatalogHeading", lang)}
          </h2>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2 max-w-[800px]">
          <button
            onClick={() => {
              setActiveArtistId("all");
              setVisibleCount(9);
            }}
            className={`px-4 py-2 border border-border-primary text-[10px] font-sans font-bold uppercase tracking-wider transition-colors duration-200 ${
              activeArtistId === "all"
                ? "bg-text-primary text-bg-base"
                : "bg-transparent text-text-primary hover:bg-bg-cardboard"
            }`}
          >
            {t("allArtists", lang)}
          </button>
          {artists.map((artist) => (
            <button
              key={artist.id}
              onClick={() => {
                setActiveArtistId(artist.id);
                setVisibleCount(9);
              }}
              className={`px-4 py-2 border border-border-primary text-[10px] font-sans font-bold uppercase tracking-wider transition-colors duration-200 ${
                activeArtistId === artist.id
                  ? "bg-text-primary text-bg-base"
                  : "bg-transparent text-text-primary hover:bg-bg-cardboard"
              }`}
            >
              {artist.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="search-box flex-shrink-0 w-full lg:w-80 flex flex-col gap-1.5">
          <span className="text-[9px] font-bold font-sans tracking-wider uppercase text-text-secondary">
            {lang === "ru" ? "ПОИСК // SEARCH" : "SEARCH // SEARCH"}
          </span>
          <input
            type="text"
            placeholder={t("searchPlaceholder", lang)}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(9);
            }}
            className="w-full h-11 px-4 text-xs font-sans font-bold uppercase tracking-wider bg-bg-card border border-border-primary focus:outline-none focus:bg-bg-cardboard text-text-primary placeholder-zinc-500 rounded-none transition-colors duration-200"
          />
        </div>
      </div>

      {/* Result stats */}
      <div className="text-[9px] font-sans font-bold tracking-wider uppercase text-text-secondary mb-6 border-b border-border-primary pb-3">
        {lang === "ru" ? `Найдено: ${filteredReleases.length} релизов` : `Found: ${filteredReleases.length} releases`}
      </div>

      {/* Release Sleeves Grid */}
      <LayoutGroup>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {paginatedReleases.map((release) => (
              <div key={release.id} className="w-full">
                {renderReleaseCard(release)}
              </div>
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>

      {/* Empty State */}
      {filteredReleases.length === 0 && (
        <div className="border border-border-primary p-12 bg-bg-card text-center rounded-none">
          <h3 className="text-lg font-serif text-text-primary mb-2">
            {lang === "ru" ? "Релизы не найдены" : "No releases found"}
          </h3>
          <p className="text-xs text-text-secondary font-sans">
            {lang === "ru" ? "Попробуйте ввести другой поисковый запрос." : "Try entering a different search query."}
          </p>
        </div>
      )}

      {/* Load More Button */}
      {filteredReleases.length > paginatedReleases.length && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 9)}
            className="px-6 py-3 border border-border-primary hover:bg-text-primary hover:text-bg-base rounded-none text-xs font-bold tracking-wider text-text-primary transition-all duration-200 uppercase"
          >
            {lang === "ru" ? "Загрузить ещё" : "Load More"}
          </button>
        </div>
      )}
    </section>
  );
}
