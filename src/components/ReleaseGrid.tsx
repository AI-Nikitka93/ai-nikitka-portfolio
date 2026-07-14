"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { catalogData } from "@/data/catalog";

interface ReleaseGridProps {
  onSpotlightSelect: (id: string) => void;
}

export default function ReleaseGrid({ onSpotlightSelect }: ReleaseGridProps) {
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
    const text = release.title;

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
            className="relative flex flex-col min-h-[460px] bg-[#141416] border border-glass-border rounded-lg overflow-hidden group shadow-2xl"
          >
            {/* Peeking Vinyl Circle */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#0b0b0c] border border-zinc-800 opacity-60 flex items-center justify-center pointer-events-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">
              <div className="w-10 h-10 rounded-full border border-zinc-700/50 bg-[#121214]" />
            </div>

            {/* Sleeve Cover Cover Area */}
            <div className={`h-56 relative overflow-hidden ${artist.texture}`} style={{ backgroundColor: accent }}>
              <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start text-black uppercase font-mono text-[9px] font-bold">
                <span>{artist.shortLane}</span>
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
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-2">
                  {artist.name} • {release.type}
                </p>
                <p className="text-zinc-400 text-xs line-clamp-3 mb-4 font-inter leading-relaxed">
                  {release.story || "Оригинальное издание лейбла AI NIKITKA93. Экспериментальное слияние музыкального характера и аналогового саунда."}
                </p>
              </div>

              <div>
                <div className="border-t border-glass-border pt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                  <span>{release.tracks.length} ТРЕКОВ</span>
                  <span>{release.genre}</span>
                </div>
                <button
                  onClick={() => onSpotlightSelect(release.id)}
                  className="w-full mt-4 py-2 border border-glass-border hover:border-white rounded-md text-xs font-bold tracking-widest text-zinc-300 hover:text-white transition-colors duration-300 uppercase"
                >
                  В фокус
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
            className="relative flex flex-col min-h-[460px] bg-[#1a191c] border-2 border-zinc-800 rounded-lg overflow-hidden group shadow-2xl texture-cardboard"
          >
            {/* Cassette face wrapper */}
            <div className="p-4 bg-[#111012] border-b border-zinc-800 flex justify-between items-center text-[9px] font-mono text-zinc-500">
              <span>CASSETTE TAPE</span>
              <span>A / B SIDE</span>
            </div>

            {/* Taped label effect */}
            <div className="mx-5 my-6 p-4 bg-[#eae3cf] text-zinc-900 border border-zinc-300 relative shadow-sm flex flex-col gap-2">
              <div className="absolute top-1 right-2 font-mono text-[8px] text-zinc-500 uppercase">NK-C90</div>
              <h3 className="text-base font-sans font-black tracking-tight uppercase leading-none border-b border-zinc-400 pb-2">
                {release.title}
              </h3>
              <p className="text-[9px] font-mono text-zinc-600 line-clamp-3 leading-snug">
                {release.story || "Аналоговая кассетная запись. Ограниченный тираж."}
              </p>
            </div>

            {/* Content info */}
            <div className="p-5 flex-1 flex flex-col justify-between text-zinc-400">
              <div className="text-[10px] font-mono flex flex-col gap-1">
                <div>ARTIST: {artist.name}</div>
                <div>RELEASE: {release.dateLabel}</div>
              </div>

              <div>
                <div className="border-t border-zinc-800 pt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                  <span>{release.tracks.length} ТРЕКОВ</span>
                  <span>{release.genre}</span>
                </div>
                <button
                  onClick={() => onSpotlightSelect(release.id)}
                  className="w-full mt-4 py-2 border border-zinc-800 hover:border-zinc-500 rounded-md text-xs font-mono text-[#ffdd3d] hover:text-white transition-colors duration-300 uppercase"
                >
                  В фокус
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
            className="relative flex flex-col min-h-[460px] bg-[#27231e] border border-[#3b342b] rounded-lg overflow-hidden group shadow-2xl"
          >
            {/* Kraft flap lines */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-[#1f1b18] border-b border-[#3b342b] flex items-center justify-center">
              <div className="w-12 h-1 bg-[#100e0c] rounded-full opacity-40" />
            </div>

            <div className="p-5 pt-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[9px] font-mono text-[#cdaa54] border border-[#cdaa54]/30 px-1 py-0.5 rounded-sm uppercase">
                    CONFIDENTIAL
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500">{release.dateLabel}</span>
                </div>
                
                <h3 className="text-xl font-serif text-[#fbeee6] tracking-tight leading-none mb-3">
                  {release.title}
                </h3>
                <p className="text-[11px] text-zinc-400 font-mono mb-4 leading-relaxed line-clamp-4">
                  {release.story || "Запись из архива продюсера. Поставляется в оригинальном крафтовом конверте. Уникальные лингвистические коды."}
                </p>
              </div>

              <div>
                {/* Stamp overlay */}
                <div className="text-red-700/30 text-[10px] font-mono font-bold uppercase tracking-widest border border-red-700/20 px-2 py-0.5 inline-block rotate-[-6deg] mb-4">
                  DEEP AUDIO
                </div>

                <div className="border-t border-[#3b342b] pt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                  <span>{artist.name}</span>
                  <span>{release.genre}</span>
                </div>
                <button
                  onClick={() => onSpotlightSelect(release.id)}
                  className="w-full mt-4 py-2 border border-[#3b342b] hover:border-zinc-500 rounded-md text-xs font-bold tracking-widest text-zinc-300 hover:text-white transition-colors duration-300 uppercase"
                >
                  В фокус
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
            className="relative flex flex-col min-h-[460px] bg-[#1e1f22] border border-glass-border rounded-lg overflow-hidden group shadow-2xl"
          >
            {/* Folder Tab graphic */}
            <div className="absolute top-0 left-5 w-24 h-4 bg-[#2b2c31] border-x border-t border-glass-border rounded-t-sm flex items-center justify-center text-[8px] font-mono text-zinc-400">
              {release.id.substring(0, 10).toUpperCase()}
            </div>

            <div className="p-5 pt-8 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                  FOLDER_REF // {release.tracks.length}_FILES
                </span>
                <h3 className="text-2xl font-serif text-zinc-200 tracking-tight leading-none mb-3">
                  {release.title}
                </h3>
                <p className="text-xs text-zinc-400 font-inter line-clamp-3 leading-relaxed mb-4">
                  {release.story || "Архивные файлы студии. Релиз содержит уникальные нарезки, полевые записи и синтезаторные дорожки."}
                </p>
              </div>

              <div>
                {/* Paperclip asset representation */}
                <div className="h-6 w-10 border-2 border-dashed border-zinc-700 rounded-lg flex items-center justify-center text-[8px] font-mono text-zinc-600 mb-4 uppercase">
                  clip
                </div>

                <div className="border-t border-glass-border pt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                  <span>{artist.name}</span>
                  <span>{release.dateLabel}</span>
                </div>
                <button
                  onClick={() => onSpotlightSelect(release.id)}
                  className="w-full mt-4 py-2 border border-glass-border hover:border-white rounded-md text-xs font-bold tracking-widest text-zinc-300 hover:text-white transition-colors duration-300 uppercase"
                >
                  В фокус
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
            className="relative flex flex-col min-h-[460px] bg-[#f0ede6] text-zinc-900 border border-zinc-300 rounded-lg overflow-hidden group shadow-2xl"
          >
            {/* Library Grid overlay line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-800 opacity-60" />

            <div className="p-5 pt-8 flex-1 flex flex-col justify-between font-mono">
              <div>
                <div className="flex justify-between items-center text-[8px] text-zinc-500 border-b border-zinc-300 pb-2 mb-3">
                  <span>LIBRARY CATALOG CARD</span>
                  <span>NO. {release.id.substring(0, 5).toUpperCase()}</span>
                </div>

                <h3 className="text-lg font-bold tracking-tight text-zinc-800 leading-none mb-3">
                  {release.title}
                </h3>
                <p className="text-[10px] text-zinc-600 font-sans line-clamp-4 leading-relaxed mb-4">
                  {release.story || "Классическая библиотечная карточка каталога. Содержит метаданные, имена авторов и композиторов."}
                </p>
              </div>

              <div>
                {/* Stamp matrix */}
                <div className="grid grid-cols-2 gap-2 text-[8px] text-zinc-400 uppercase font-mono border border-zinc-200 p-2 mb-4 rounded-sm">
                  <div>DATE: {release.dateLabel}</div>
                  <div>LANG: {release.language || "INSTR"}</div>
                </div>

                <div className="border-t border-zinc-300 pt-4 flex justify-between items-center text-[10px] text-zinc-500">
                  <span>{artist.name}</span>
                  <span>{release.genre}</span>
                </div>
                <button
                  onClick={() => onSpotlightSelect(release.id)}
                  className="w-full mt-4 py-2 border border-zinc-400 hover:border-zinc-800 rounded-md text-xs font-bold text-zinc-700 hover:text-black transition-colors duration-300 uppercase"
                >
                  В фокус
                </button>
              </div>
            </div>
          </motion.article>
        );
    }
  };

  return (
    <section id="catalog" className="py-20 px-6 md:px-10 max-w-[1360px] mx-auto">
      {/* Title */}
      <div className="mb-12 border-b border-glass-border pb-6">
        <span className="text-xs font-bold text-zinc-500 font-inter tracking-widest uppercase block mb-2">
          МУЗЫКАЛЬНЫЕ ИЗДАНИЯ // FULL CATALOG
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
          КАТАЛОГ РЕЛИЗОВ
        </h2>
      </div>

      {/* Toolbar / Filters & Search */}
      <div className="catalog-toolbar mb-10 flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-end">
        {/* Filter buttons */}
        <div className="filter-group flex flex-wrap gap-2 max-w-[800px]">
          <button
            onClick={() => {
              setActiveArtistId("all");
              setVisibleCount(9);
            }}
            className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-md border ${
              activeArtistId === "all"
                ? "bg-white text-black border-white"
                : "bg-surface text-zinc-400 border-glass-border hover:border-zinc-500 hover:text-white"
            }`}
          >
            Все
          </button>
          {artists.map((artist) => (
            <button
              key={artist.id}
              onClick={() => {
                setActiveArtistId(artist.id);
                setVisibleCount(9);
              }}
              className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-md border ${
                activeArtistId === artist.id
                  ? "bg-white text-black border-white"
                  : "bg-surface text-zinc-400 border-glass-border hover:border-zinc-500 hover:text-white"
              }`}
            >
              {artist.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="search-box flex-shrink-0 w-full lg:w-80 flex flex-col gap-1.5">
          <span className="text-[10px] font-bold font-mono tracking-widest uppercase text-zinc-500">
            ПОИСК ПО КАТАЛОГУ
          </span>
          <input
            type="text"
            placeholder="Искать по названию, треку, языку..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(9);
            }}
            className="w-full h-11 px-4 text-sm bg-surface border border-glass-border hover:border-zinc-500 focus:border-white focus:outline-none rounded-md transition-colors duration-300 text-white placeholder-zinc-600"
          />
        </div>
      </div>

      {/* Result stats */}
      <div className="text-[11px] font-bold font-mono tracking-widest uppercase text-zinc-500 mb-6 border-b border-glass-border pb-3">
        Найдено: {filteredReleases.length} релизов
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
        <div className="border border-glass-border p-12 bg-surface text-center">
          <h3 className="text-xl font-serif text-zinc-400 mb-2">Релизы не найдены</h3>
          <p className="text-sm text-zinc-600 font-inter">Попробуйте ввести другой поисковый запрос.</p>
        </div>
      )}

      {/* Load More Button */}
      {filteredReleases.length > paginatedReleases.length && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 9)}
            className="px-6 py-3 border border-glass-border hover:border-white rounded-md text-xs font-bold tracking-widest text-zinc-300 hover:text-white transition-all duration-300 uppercase"
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </section>
  );
}
