"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { catalogData } from "@/data/catalog";

interface TimelineProps {
  onSpotlightSelect: (id: string) => void;
}

export default function Timeline({ onSpotlightSelect }: TimelineProps) {
  const releases = catalogData.releases;
  const artists = catalogData.artists;

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const artistsById = useMemo(() => {
    return new Map(artists.map((a) => [a.id, a]));
  }, [artists]);

  const sortedReleases = useMemo(() => {
    return [...releases].sort((a, b) => {
      const cmp = a.date.localeCompare(b.date);
      return sortOrder === "asc" ? cmp : -cmp;
    });
  }, [releases, sortOrder]);

  return (
    <section id="timeline" className="py-20 px-6 md:px-10 max-w-[1360px] mx-auto border-t border-glass-border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-6 border-b border-glass-border">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-inter tracking-widest uppercase block mb-2">
            ХРОНОЛОГИЯ ИЗДАНИЙ // RELEASES TIMELINE
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
            ХРОНОЛОГИЯ КАТАЛОГА
          </h2>
        </div>
        
        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">СОРТИРОВКА:</span>
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="px-3 py-1.5 border border-glass-border hover:border-white rounded-md text-[10px] font-bold tracking-widest text-zinc-300 hover:text-white transition-colors duration-300 uppercase font-mono"
          >
            {sortOrder === "desc" ? "СНАЧАЛА НОВЫЕ ↓" : "СНАЧАЛА СТАРЫЕ ↑"}
          </button>
        </div>
      </div>

      {/* Table-like list layout */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left font-inter border-collapse min-w-[700px]">
          <thead>
            <tr className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-glass-border">
              <th className="py-4 font-normal">ГОД</th>
              <th className="py-4 font-normal">ДАТА</th>
              <th className="py-4 font-normal">НАЗВАНИЕ РЕЛИЗА</th>
              <th className="py-4 font-normal">ИСПОЛНИТЕЛЬ</th>
              <th className="py-4 font-normal font-sans">ЖАНР</th>
              <th className="py-4 font-normal text-right">ДЕЙСТВИЕ</th>
            </tr>
          </thead>
          <tbody>
            {sortedReleases.map((release, index) => {
              const artist = artistsById.get(release.artistId) || artists[0];
              const year = release.dateLabel ? release.dateLabel.split(".").pop() : "2026";
              
              return (
                <motion.tr
                  key={release.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(0.3, index * 0.04), duration: 0.4 }}
                  className="border-b border-glass-border hover:bg-zinc-950/40 group transition-colors duration-300"
                >
                  <td className="py-4 font-serif text-lg font-bold text-zinc-400 group-hover:text-white transition-colors">
                    {year}
                  </td>
                  <td className="py-4 text-xs font-mono text-zinc-500">
                    {release.dateLabel}
                  </td>
                  <td className="py-4 font-serif text-base text-zinc-200 group-hover:text-white transition-colors font-semibold">
                    {release.title}
                  </td>
                  <td className="py-4 text-sm text-zinc-300">
                    {artist.name}
                  </td>
                  <td className="py-4 text-xs text-zinc-500 font-mono uppercase">
                    {release.genre} • {release.type}
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => onSpotlightSelect(release.id)}
                      className="px-4 py-1.5 border border-glass-border hover:border-white rounded-md text-[10px] font-bold tracking-widest text-zinc-300 hover:text-white hover:bg-zinc-900 transition-all duration-300 uppercase"
                    >
                      Смотреть
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
