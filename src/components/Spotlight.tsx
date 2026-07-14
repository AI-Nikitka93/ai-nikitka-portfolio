"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { catalogData } from "@/data/catalog";

interface SpotlightProps {
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

export default function Spotlight({ selectedReleaseId }: SpotlightProps) {
  const releases = catalogData.releases;
  const artists = catalogData.artists;

  const release = releases.find((r) => r.id === selectedReleaseId) || releases[0];
  const artist = artists.find((a) => a.id === release.artistId) || artists[0];

  const [isRotating] = useState(true);

  // Formulate cover design textures
  const textureClass = artist.texture || "street-pop";
  const accentColor = artist.accent || "#ffffff";

  return (
    <section id="spotlight" className="py-16 px-6 md:px-10 bg-[#f3efe9] overflow-hidden">
      <div className="max-w-[1120px] mx-auto border border-[#111111] bg-[#111111] text-white p-8 md:p-12 relative flex flex-col lg:flex-row gap-12 items-center shadow-[4px_4px_0px_rgba(17,17,17,0.15)]">
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
            <div className="absolute inset-4 border border-black/20 pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="flex flex-col font-sans uppercase font-bold text-black">
                <span className="text-[9px] tracking-widest">{artist.shortLane}</span>
                <span className="text-[13px] leading-none mt-1 truncate max-w-[150px]">{release.title}</span>
              </div>
              <div className="font-mono text-[9px] text-black/70 font-semibold">
                {release.dateLabel}
              </div>
            </div>

            {/* Vintage style stamp */}
            <div className="absolute top-6 left-6 px-2 py-0.5 border border-black/40 text-black/70 font-serif text-[8px] font-bold uppercase rotate-[-8deg]">
              Live Catalog
            </div>

            {/* Vinyl record wear shadow ring */}
            <div className="absolute inset-0 rounded-full border border-black/5 m-12 pointer-events-none" />
          </div>

          {/* Rotating Vinyl Record peeking out */}
          <motion.div
            animate={{ rotate: isRotating ? 360 : 0 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute left-[30%] w-60 h-60 md:w-76 md:h-76 rounded-full bg-[#0d0d0e] border border-black shadow-2xl flex items-center justify-center select-none pointer-events-none z-0"
            style={{
              backgroundImage: "repeating-radial-gradient(circle, #0d0d0e, #0d0d0e 2px, #18181b 4px, #0d0d0e 5px)",
            }}
          >
            {/* Center label */}
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center p-2 text-center text-black font-sans uppercase relative"
              style={{ backgroundColor: accentColor }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#09090b] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2" />
              <span className="text-[7px] font-black tracking-widest leading-none truncate max-w-[65px]">{artist.name}</span>
              <span className="text-[6px] text-black/60 font-mono mt-1 font-semibold">{release.type}</span>
            </div>
          </motion.div>
        </div>

        {/* Story & Tracklist Column */}
        <div className="flex-1 w-full flex flex-col justify-between self-stretch z-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#a82c16] font-sans tracking-widest uppercase mb-2">
              В ФОКУСЕ // FEATURED
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
                    {release.type}
                  </span>
                  <span className="px-2.5 py-1 border border-zinc-800">
                    {release.genre}
                  </span>
                  <span className="px-2.5 py-1 border border-zinc-800">
                    {release.dateLabel}
                  </span>
                </div>
                
                <p className="text-zinc-300 text-xs md:text-sm font-sans leading-relaxed max-w-[620px] mb-8">
                  {release.story || "Эпическое музыкальное произведение, раскрывающее грани звука и характера артиста. Глубокое погружение в жанровые традиции с привлечением технологий нового поколения."}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-auto">
            <h4 className="text-[9px] font-bold font-sans tracking-widest uppercase text-zinc-500 mb-3">
              ТРЕКЛИСТ // CATALOG LIST
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
              <span>Всего: {release.tracks.length} треков</span>
              <span>Demo Audio Loaded</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
