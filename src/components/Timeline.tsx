"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
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
    <section id="timeline" className="py-20 px-6 md:px-10 max-w-[1360px] mx-auto border-t border-[#111111] text-[#111111]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-6 border-b border-[#111111]">
        <div>
          <span className="text-[10px] font-bold text-[#a82c16] font-sans tracking-widest uppercase block mb-2">
            ХРОНОЛОГИЯ ИЗДАНИЙ // RELEASES TIMELINE
          </span>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
            ХРОНОЛОГИЯ КАТАЛОГА
          </h2>
        </div>
        
        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-sans font-bold tracking-wider uppercase text-[#555450]">СОРТИРОВКА:</span>
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="px-4 py-2 border border-[#111111] hover:bg-[#edece8] rounded-none text-[9px] font-bold tracking-wider text-black transition-colors duration-200 uppercase font-sans"
          >
            {sortOrder === "desc" ? "СНАЧАЛА НОВЫЕ ↓" : "СНАЧАЛА СТАРЫЕ ↑"}
          </button>
        </div>
      </div>

      {/* Table-like list layout */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left font-sans border-collapse min-w-[700px]">
          <thead>
            <tr className="text-[9px] font-sans font-bold tracking-wider text-[#555450] uppercase border-b border-[#111111]">
              <th className="py-4 font-bold">ГОД</th>
              <th className="py-4 font-bold">ДАТА</th>
              <th className="py-4 font-bold">НАЗВАНИЕ РЕЛИЗА</th>
              <th className="py-4 font-bold">ИСПОЛНИТЕЛЬ</th>
              <th className="py-4 font-bold">ЖАНР</th>
              <th className="py-4 font-bold text-right">ДЕЙСТВИЕ</th>
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
                  className="border-b border-[#ccc9be] hover:bg-[#edece8] group transition-colors duration-200"
                >
                  <td className="py-4 font-serif text-lg font-bold text-[#555450] group-hover:text-black transition-colors">
                    {year}
                  </td>
                  <td className="py-4 text-xs font-mono text-[#555450] font-semibold">
                    {release.dateLabel}
                  </td>
                  <td className="py-4 font-serif text-base text-black group-hover:text-black transition-colors font-semibold">
                    {release.title}
                  </td>
                  <td className="py-4 text-sm text-[#111111] font-medium">
                    {artist.name}
                  </td>
                  <td className="py-4 text-[10px] text-[#555450] font-sans font-bold uppercase tracking-wider">
                    {release.genre} • {release.type}
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => onSpotlightSelect(release.id)}
                      className="px-4 py-1.5 border border-[#111111] hover:bg-[#111111] hover:text-white rounded-none text-[9px] font-bold tracking-wider text-black transition-all duration-200 uppercase"
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
