"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { catalogData } from "@/data/catalog";
import { Lang, t, translateMeta } from "@/utils/translate";

interface TimelineProps {
  lang: Lang;
  onSpotlightSelect: (id: string) => void;
}

export default function Timeline({ lang, onSpotlightSelect }: TimelineProps) {
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
    <section id="timeline" className="py-20 px-6 md:px-10 max-w-[1360px] mx-auto border-t border-border-primary text-text-primary">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-6 border-b border-border-primary">
        <div>
          <span className="text-[10px] font-bold text-brand-accent font-sans tracking-widest uppercase block mb-2">
            {t("sectionTimelineTitle", lang)}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
            {t("sectionTimelineHeading", lang)}
          </h2>
        </div>
        
        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-sans font-bold tracking-wider uppercase text-text-secondary">
            {t("sortBy", lang)}
          </span>
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="px-4 py-2 border border-border-primary hover:bg-bg-cardboard rounded-none text-[9px] font-bold tracking-wider text-text-primary transition-colors duration-200 uppercase font-sans"
          >
            {sortOrder === "desc" ? t("sortNewest", lang) : t("sortOldest", lang)}
          </button>
        </div>
      </div>

      {/* Table-like list layout */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left font-sans border-collapse min-w-[700px]">
          <thead>
            <tr className="text-[9px] font-sans font-bold tracking-wider text-text-secondary uppercase border-b border-border-primary">
              <th className="py-4 font-bold">{t("timelineYear", lang)}</th>
              <th className="py-4 font-bold">{t("timelineDate", lang)}</th>
              <th className="py-4 font-bold">{t("timelineRelease", lang)}</th>
              <th className="py-4 font-bold">{t("timelineArtist", lang)}</th>
              <th className="py-4 font-bold">{t("timelineGenre", lang)}</th>
              <th className="py-4 font-bold text-right">{t("timelineAction", lang)}</th>
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
                  className="border-b border-border-muted hover:bg-bg-cardboard group transition-colors duration-200"
                >
                  <td className="py-4 font-serif text-lg font-bold text-text-secondary group-hover:text-text-primary transition-colors">
                    {year}
                  </td>
                  <td className="py-4 text-xs font-mono text-text-secondary font-semibold">
                    {release.dateLabel}
                  </td>
                  <td className="py-4 font-serif text-base text-text-primary group-hover:text-text-primary transition-colors font-semibold">
                    {release.title}
                  </td>
                  <td className="py-4 text-sm text-text-primary font-medium">
                    {artist.name}
                  </td>
                  <td className="py-4 text-[10px] text-text-secondary font-sans font-bold uppercase tracking-wider">
                    {translateMeta(release.genre, lang)} • {translateMeta(release.type, lang)}
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => onSpotlightSelect(release.id)}
                      className="px-4 py-1.5 border border-border-primary hover:bg-text-primary hover:text-bg-base rounded-none text-[9px] font-bold tracking-wider text-text-primary transition-all duration-200 uppercase"
                    >
                      {t("timelineView", lang)}
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
