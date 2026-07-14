"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { catalogData } from "@/data/catalog";
import { Lang, t, translateMeta } from "@/utils/translate";

interface SpotlightProps {
  lang: Lang;
  selectedReleaseId: string;
}

// Helper to generate procedural track durations based on track title hash
function getTrackDuration(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const min = 1 + (Math.abs(hash) % 4); // 1-4 mins
  const sec = Math.abs(hash >> 2) % 60; // 0-59 secs
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

export default function Spotlight({ lang, selectedReleaseId }: SpotlightProps) {
  const releases = catalogData.releases;
  const artists = catalogData.artists;

  const release = releases.find((r) => r.id === selectedReleaseId) || releases[0];
  const artist = artists.find((a) => a.id === release.artistId) || artists[0];

  const [isRotating] = useState(true);

  // Formulate cover design textures
  const textureClass = artist.texture || "street-pop";
  const accentColor = artist.accent || "#ffffff";

  return (
    <section id="spotlight" className="py-16 px-6 md:px-10 bg-bg-base overflow-hidden">
      <div className="max-w-[1120px] mx-auto border border-border-primary bg-[#0f0f11] text-white p-8 md:p-12 relative flex flex-col lg:flex-row gap-12 items-center shadow-[4px_4px_0px_var(--color-border-primary)]">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white via-zinc-400 to-black pointer-events-none" />

        {/* Vinyl Showcase Column */}
        <div className="relative w-72 h-72 md:w-[340px] md:h-[340px] flex-shrink-0 flex items-center justify-center">
          {/* Cardboard Sleeve */}
          <div
            className={`w-64 h-64 md:w-80 md:h-80 border border-black relative overflow-hidden z-10 ${textureClass}`}
            style={{
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Wear & Tear Sleeve lines */}
            <div className="absolute inset-2 border border-white/5 pointer-events-none" />
            <div className="absolute inset-4 border border-black/10 pointer-events-none" />
            
            {/* Album Label Artwork (styled procedurally) */}
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <div className="flex justify-between items-start">
                <span className="text-[7px] font-mono tracking-widest text-white/50 uppercase">
                  A93 ARCHIVE
                </span>
                <span className="text-[7px] font-mono tracking-widest text-white/50">
                  {release.dateLabel.split(".").pop()}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-sans font-bold uppercase tracking-widest" style={{ color: accentColor }}>
                  {artist.name}
                </span>
                <h4 className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight leading-tight uppercase">
                  {release.title}
                </h4>
              </div>
            </div>
            {/* Sleeve Ring Wear */}
            <div className="absolute inset-0 rounded-full border border-black/5 opacity-40 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.25)_100%)] pointer-events-none" />
          </div>

          {/* Vinyl Record sliding out */}
          <div
            className={`absolute top-4 bottom-4 left-24 right-0 rounded-full bg-[#111111] border border-zinc-800 flex items-center justify-center z-0 transition-transform duration-1000 ${
              isRotating ? "animate-[spin_20s_linear_infinite]" : ""
            }`}
            style={{
              boxShadow: "5px 5px 25px rgba(0, 0, 0, 0.6)",
              backgroundImage: "repeating-radial-gradient(circle, #222, #111 2px, #222 4px)",
            }}
          >
            {/* Grooves texture overlay */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)] opacity-80" />

            {/* Vinyl Center Sticker */}
            <div
              className="w-24 h-24 rounded-full flex flex-col items-center justify-center p-2 text-center relative border border-black"
              style={{
                backgroundColor: accentColor,
                color: "#111111",
              }}
            >
              <span className="text-[5px] font-sans font-bold uppercase tracking-widest">
                AI Nikitka93
              </span>
              <span className="text-[7px] font-serif font-black uppercase tracking-tight leading-tight my-0.5 truncate w-full">
                {release.title}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#000] mt-1 border border-zinc-800" />
            </div>
          </div>
        </div>

        {/* Detailed Description Column */}
        <div className="flex-1 flex flex-col h-full gap-8 z-10 w-full">
          <div>
            <span className="text-[10px] font-bold text-brand-accent font-sans tracking-widest uppercase mb-2 block">
              {t("spotlightTitle", lang)}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={release.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight mb-4">
                  {release.title}
                </h2>
                
                {/* 4 outlined badges side-by-side */}
                <div className="flex flex-wrap gap-2 text-[9px] font-sans font-bold uppercase tracking-wider text-zinc-400 mb-6 pb-6 border-b border-zinc-800">
                  <span className="px-2.5 py-1 border border-zinc-800 text-white" style={{ borderColor: accentColor, color: accentColor }}>
                    {artist.name}
                  </span>
                  <span className="px-2.5 py-1 border border-zinc-800">
                    {translateMeta(release.type, lang)}
                  </span>
                  <span className="px-2.5 py-1 border border-zinc-800">
                    {translateMeta(release.genre, lang)}
                  </span>
                  <span className="px-2.5 py-1 border border-zinc-800">
                    {release.dateLabel}
                  </span>
                </div>
                
                <p className="text-zinc-300 text-xs md:text-sm font-sans leading-relaxed max-w-[620px] mb-8">
                  {release.story || (lang === "ru" 
                    ? "Эпическое музыкальное произведение, раскрывающее грани звука и характера артиста. Глубокое погружение в жанровые традиции с привлечением технологий нового поколения."
                    : "An epic musical piece that unfolds the facets of sound and the artist's character. A deep dive into genre traditions using next-generation technologies."
                  )}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-auto">
            <h4 className="text-[9px] font-bold font-sans tracking-widest uppercase text-zinc-500 mb-3">
              {t("tracksTitle", lang)}
            </h4>
            <div className="border-t border-zinc-800 pt-3 flex flex-col gap-2">
              {release.tracks.map((track, trackIdx) => (
                <div key={trackIdx} className="flex justify-between items-center text-xs font-sans text-zinc-300 hover:text-white transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono text-zinc-600">{(trackIdx + 1).toString().padStart(2, "0")}</span>
                    <span>{track}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">{getTrackDuration(track)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center text-[9px] font-sans font-bold text-zinc-500 uppercase tracking-wider">
              <span>{lang === "ru" ? `Всего: ${release.tracks.length} треков` : `Total: ${release.tracks.length} tracks`}</span>
              <span>Demo Audio Loaded</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
