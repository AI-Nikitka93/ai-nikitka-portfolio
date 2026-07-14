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
            className="relative flex flex-col min-h-[460px] bg-[#f4f4f0] border border-[#111111] overflow-hidden group shadow-[2px_2px_0px_rgba(17,17,17,1)]"
          >
            {/* Peeking Vinyl Circle */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#0b0b0c] border border-black/80 opacity-80 flex items-center justify-center pointer-events-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">
              <div className="w-10 h-10 rounded-full border border-zinc-800 bg-[#121214]" />
            </div>

            {/* Sleeve Cover Cover Area */}
            <div className={`h-56 relative overflow-hidden ${artist.texture}`} style={{ backgroundColor: accent }}>
              <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
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
            <div className="p-5 flex-1 flex flex-col justify-between text-[#111111]">
              <div>
                <p className="text-[10px] text-[#555450] font-sans font-bold uppercase tracking-wider mb-2">
                  {artist.name} • {release.type}
                </p>
                <p className="text-[#555450] text-xs line-clamp-3 mb-4 font-sans leading-relaxed">
                  {release.story || "Оригинальное издание лейбла AI NIKITKA93. Экспериментальное слияние музыкального характера и аналогового саунда."}
                </p>
              </div>

              <div>
                <div className="border-t border-[#111111] pt-4 flex justify-between items-center text-[10px] font-sans font-bold text-[#555450] uppercase">
                  <span>{release.tracks.length} ТРЕКОВ</span>
                  <span>{release.genre}</span>
                </div>
                <button
                  onClick={() => onSpotlightSelect(release.id)}
                  className="w-full mt-4 py-2 border border-[#111111] hover:bg-[#111111] hover:text-white rounded-none text-xs font-bold tracking-widest text-[#111111] transition-colors duration-200 uppercase"
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
            className="relative flex flex-col min-h-[460px] bg-[#edece8] border border-[#111111] overflow-hidden group shadow-[2px_2px_0px_rgba(17,17,17,1)] texture-cardboard"
          >
            {/* Cassette face wrapper */}
            <div className="p-4 bg-[#f4f4f0] border-b border-[#111111] flex justify-between items-center text-[9px] font-mono text-[#555450] font-bold">
              <span>CASSETTE TAPE</span>
              <span>A / B SIDE</span>
            </div>

            {/* Taped label effect */}
            <div className="mx-5 my-6 p-4 bg-[#eae3cf] text-zinc-900 border border-[#111111] relative shadow-sm flex flex-col gap-2 rounded-none">
              <div className="absolute top-1 right-2 font-mono text-[8px] text-zinc-500 uppercase">NK-C90</div>
              <h3 className="text-base font-sans font-black tracking-tight uppercase leading-none border-b border-zinc-400 pb-2">
                {release.title}
              </h3>
              <p className="text-[9px] font-mono text-zinc-600 line-clamp-3 leading-snug">
                {release.story || "Аналоговая кассетная запись. Ограниченный тираж."}
              </p>
            </div>

            {/* Content info */}
            <div className="p-5 flex-1 flex flex-col justify-between text-[#111111]">
              <div className="text-[10px] font-sans font-bold flex flex-col gap-1 text-[#555450]">
                <div>ARTIST: {artist.name}</div>
                <div>RELEASE: {release.dateLabel}</div>
              </div>

              <div>
                <div className="border-t border-[#111111] pt-4 flex justify-between items-center text-[10px] font-sans font-bold text-[#555450] uppercase">
                  <span>{release.tracks.length} ТРЕКОВ</span>
                  <span>{release.genre}</span>
                </div>
                <button
                  onClick={() => onSpotlightSelect(release.id)}
                  className="w-full mt-4 py-2 border border-[#111111] hover:bg-[#111111] hover:text-white rounded-none text-xs font-bold text-[#111111] transition-colors duration-200 uppercase"
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
            className="relative flex flex-col min-h-[460px] bg-[#e6dcc5] border border-[#111111] overflow-hidden group shadow-[2px_2px_0px_rgba(17,17,17,1)]"
          >
            {/* Kraft flap lines */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-[#d8ccb3] border-b border-[#111111] flex items-center justify-center">
              <div className="w-12 h-1 bg-[#111111] rounded-full opacity-20" />
            </div>

            <div className="p-5 pt-8 flex-1 flex flex-col justify-between text-[#111111]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[9px] font-mono text-[#a82c16] border border-[#a82c16] px-1 py-0.5 rounded-none font-bold uppercase">
                    CONFIDENTIAL
                  </span>
                  <span className="text-[9px] font-mono font-bold text-[#555450]">{release.dateLabel}</span>
                </div>
                
                <h3 className="text-xl font-serif text-[#111111] tracking-tight leading-none mb-3">
                  {release.title}
                </h3>
                <p className="text-xs text-[#555450] font-sans mb-4 leading-relaxed line-clamp-4">
                  {release.story || "Запись из архива продюсера. Поставляется в оригинальном крафтовом конверте. Уникальные лингвистические коды."}
                </p>
              </div>

              <div>
                {/* Stamp overlay */}
                <div className="text-red-800/80 text-[10px] font-mono font-bold uppercase tracking-widest border border-red-800/50 px-2 py-0.5 inline-block rotate-[-6deg] mb-4">
                  DEEP AUDIO
                </div>

                <div className="border-t border-[#111111] pt-4 flex justify-between items-center text-[10px] font-sans font-bold text-[#555450] uppercase">
                  <span>{artist.name}</span>
                  <span>{release.genre}</span>
                </div>
                <button
                  onClick={() => onSpotlightSelect(release.id)}
                  className="w-full mt-4 py-2 border border-[#111111] hover:bg-[#111111] hover:text-white rounded-none text-xs font-bold text-[#111111] transition-colors duration-200 uppercase"
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
            className="relative flex flex-col min-h-[460px] bg-[#f4f4f0] border border-[#111111] overflow-hidden group shadow-[2px_2px_0px_rgba(17,17,17,1)]"
          >
            {/* Folder Tab graphic */}
            <div className="absolute top-0 left-5 w-24 h-4 bg-[#edece8] border-x border-t border-[#111111] rounded-t-sm flex items-center justify-center text-[8px] font-mono font-bold text-[#555450]">
              {release.id.substring(0, 10).toUpperCase()}
            </div>

            <div className="p-5 pt-8 flex-1 flex flex-col justify-between text-[#111111]">
              <div>
                <span className="text-[9px] font-mono text-[#555450] font-bold uppercase tracking-widest block mb-2">
                  FOLDER_REF // {release.tracks.length}_FILES
                </span>
                <h3 className="text-2xl font-serif text-[#111111] tracking-tight leading-none mb-3">
                  {release.title}
                </h3>
                <p className="text-xs text-[#555450] font-sans line-clamp-3 leading-relaxed mb-4">
                  {release.story || "Архивные файлы студии. Релиз содержит уникальные нарезки, полевые записи и синтезаторные дорожки."}
                </p>
              </div>

              <div>
                {/* Paperclip asset representation */}
                <div className="h-6 w-10 border-2 border-dashed border-zinc-400 rounded-none flex items-center justify-center text-[8px] font-mono text-zinc-500 mb-4 uppercase">
                  clip
                </div>

                <div className="border-t border-[#111111] pt-4 flex justify-between items-center text-[10px] font-sans font-bold text-[#555450] uppercase">
                  <span>{artist.name}</span>
                  <span>{release.dateLabel}</span>
                </div>
                <button
                  onClick={() => onSpotlightSelect(release.id)}
                  className="w-full mt-4 py-2 border border-[#111111] hover:bg-[#111111] hover:text-white rounded-none text-xs font-bold text-[#111111] transition-colors duration-200 uppercase"
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
            className="relative flex flex-col min-h-[460px] bg-white text-zinc-900 border border-[#111111] overflow-hidden group shadow-[2px_2px_0px_rgba(17,17,17,1)]"
          >
            {/* Library Grid overlay line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#a82c16]" />

            <div className="p-5 pt-8 flex-1 flex flex-col justify-between font-sans font-bold">
              <div>
                <div className="flex justify-between items-center text-[8px] text-zinc-500 border-b border-zinc-300 pb-2 mb-3">
                  <span>LIBRARY CATALOG CARD</span>
                  <span>NO. {release.id.substring(0, 5).toUpperCase()}</span>
                </div>

                <h3 className="text-lg font-serif tracking-tight text-zinc-800 leading-none mb-3">
                  {release.title}
                </h3>
                <p className="text-[10px] text-zinc-600 font-normal line-clamp-4 leading-relaxed mb-4">
                  {release.story || "Классическая библиотечная карточка каталога. Содержит метаданные, имена авторов и композиторов."}
                </p>
              </div>

              <div>
                {/* Stamp matrix */}
                <div className="grid grid-cols-2 gap-2 text-[8px] text-zinc-500 uppercase font-mono border border-zinc-200 p-2 mb-4 rounded-none">
                  <div>DATE: {release.dateLabel}</div>
                  <div>LANG: {release.language || "INSTR"}</div>
                </div>

                <div className="border-t border-zinc-300 pt-4 flex justify-between items-center text-[10px] text-zinc-500">
                  <span>{artist.name}</span>
                  <span>{release.genre}</span>
                </div>
                <button
                  onClick={() => onSpotlightSelect(release.id)}
                  className="w-full mt-4 py-2 border border-[#111111] hover:bg-[#111111] hover:text-white rounded-none text-xs font-bold text-black transition-colors duration-200 uppercase"
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
    <section id="catalog" className="py-20 px-6 md:px-10 max-w-[1360px] mx-auto text-[#111111]">
      {/* Title */}
      <div className="mb-12 border-b border-[#111111] pb-6">
        <span className="text-[10px] font-bold text-[#a82c16] font-sans tracking-widest uppercase block mb-2">
          МУЗЫКАЛЬНЫЕ ИЗДАНИЯ // FULL CATALOG
        </span>
        <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
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
            className={`px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-200 border rounded-none ${
              activeArtistId === "all"
                ? "bg-[#111111] text-white border-[#111111]"
                : "bg-white text-[#555450] border-[#111111] hover:bg-[#edece8] hover:text-[#111111]"
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
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-200 border rounded-none ${
                activeArtistId === artist.id
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-white text-[#555450] border-[#111111] hover:bg-[#edece8] hover:text-[#111111]"
              }`}
            >
              {artist.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="search-box flex-shrink-0 w-full lg:w-80 flex flex-col gap-1.5">
          <span className="text-[9px] font-bold font-sans tracking-wider uppercase text-[#555450]">
            ПОИСК // SEARCH
          </span>
          <input
            type="text"
            placeholder="Искать по названию, треку..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(9);
            }}
            className="w-full h-11 px-4 text-xs font-sans font-bold uppercase tracking-wider bg-white border border-[#111111] focus:outline-none focus:bg-[#f4f4f0] text-black placeholder-zinc-400 rounded-none transition-colors duration-200"
          />
        </div>
      </div>

      {/* Result stats */}
      <div className="text-[9px] font-sans font-bold tracking-wider uppercase text-[#555450] mb-6 border-b border-[#111111] pb-3">
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
        <div className="border border-[#111111] p-12 bg-[#f4f4f0] text-center rounded-none">
          <h3 className="text-lg font-serif text-[#111111] mb-2">Релизы не найдены</h3>
          <p className="text-xs text-[#555450] font-sans">Попробуйте ввести другой поисковый запрос.</p>
        </div>
      )}

      {/* Load More Button */}
      {filteredReleases.length > paginatedReleases.length && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 9)}
            className="px-6 py-3 border border-[#111111] hover:bg-[#111111] hover:text-white rounded-none text-xs font-bold tracking-wider text-black transition-all duration-200 uppercase"
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </section>
  );
}
