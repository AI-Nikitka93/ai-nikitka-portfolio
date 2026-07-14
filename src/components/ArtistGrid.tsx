"use client";

import React from "react";
import { motion } from "framer-motion";
import { catalogData } from "@/data/catalog";
import { Lang, t, translateArtist } from "@/utils/translate";

interface ArtistGridProps {
  lang: Lang;
}

export default function ArtistGrid({ lang }: ArtistGridProps) {
  const artists = catalogData.artists;

  // Custom styling templates based on artist ID
  const renderArtistCard = (artist: typeof artists[0]) => {
    const avatar = (artist.avatarUrl ? artist.avatarUrl.replace("./", "/") : `/assets/avatars/${artist.id.replace("-", "_")}.jpg`) + "?v=20260714-2359";
    
    switch (artist.id) {
      case "nikitka-ai":
        // Polaroid Template
        return (
          <motion.div
            id={`artist-card-${artist.id}`}
            whileHover={{ scale: 1.02, rotate: -1, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex flex-col p-4 bg-white text-black border border-zinc-200 shadow-xl rounded-none w-full h-full justify-between min-h-[420px]"
          >
            {/* Red Live Sticker */}
            <div className="absolute top-2 right-2 bg-red-600 text-white text-[7px] font-sans font-bold px-1.5 py-0.5 uppercase tracking-widest animate-pulse z-10">
              LIVE
            </div>
            
            <div className="flex-grow flex flex-col justify-start">
              <div className="w-full aspect-[4/5] bg-zinc-100 overflow-hidden border border-zinc-300 relative">
                <img src={avatar} alt={artist.name} className="w-full h-full object-cover" />
              </div>
              <div className="pt-4 pb-2 text-center flex flex-col gap-1">
                <h3 className="font-sans font-black text-2xl tracking-tighter text-zinc-950 uppercase italic leading-none">
                  {artist.name}
                </h3>
                <p className="text-[10px] text-zinc-500 font-sans font-bold uppercase tracking-widest mt-1">
                  {translateArtist(artist, "shortLane", lang)}
                </p>
              </div>
            </div>
            <div className="text-center pt-2 border-t border-zinc-100 mt-2">
              <blockquote className="text-[9px] text-zinc-400 italic font-serif">
                "Live is real..."
              </blockquote>
            </div>
          </motion.div>
        );

      case "nikita-kizevich":
        // Archival Document Template
        return (
          <motion.div
            id={`artist-card-${artist.id}`}
            whileHover={{ scale: 1.02, rotate: 1, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex flex-col p-5 bg-[#eae4d3] text-zinc-900 border-2 border-[#cfc8b3] shadow-lg rounded-none w-full h-full justify-between min-h-[420px]"
            style={{
              backgroundImage: "radial-gradient(circle at 10% 20%, rgba(0,0,0,0.01) 0%, transparent 100%)",
            }}
          >
            {/* Folder tab */}
            <div className="absolute -top-3 left-6 px-3 py-0.5 bg-[#cfc8b3] text-[9px] font-mono uppercase tracking-wider font-bold">
              FILE_REF // 19-B
            </div>

            <div className="flex flex-col gap-4 h-full justify-between flex-grow">
              {/* Photo at the top */}
              <div className="w-full aspect-square bg-zinc-800 border border-zinc-400 overflow-hidden relative">
                <img src={avatar} alt={artist.name} className="w-full h-full object-cover" />
              </div>
              
              {/* Text section */}
              <div className="flex flex-col gap-2 flex-grow mt-2">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider">COMPOSER_CLASS:</span>
                <h3 className="text-lg font-bold tracking-tighter text-zinc-800 leading-tight">{artist.name}</h3>
                <p className="text-[10px] text-zinc-600 font-sans leading-tight mt-1">
                  {translateArtist(artist, "role", lang)}
                </p>
              </div>

              {/* Footer metadata */}
              <div className="border-t border-zinc-400 pt-3 text-[9px] text-zinc-500 flex flex-col gap-1 mt-auto">
                <div>LANG: {artist.language}</div>
                <div>ACC: {artist.accent}</div>
              </div>
            </div>
            
            {/* Rubber stamp */}
            <div className="absolute right-4 bottom-4 w-12 h-12 rounded-full border-2 border-red-800/40 text-red-800/40 flex items-center justify-center text-[7px] font-bold uppercase tracking-widest rotate-12 select-none pointer-events-none">
              APPROVED
            </div>
          </motion.div>
        );

      case "nikitaal":
        // Postcard / Ethno-travel Template
        return (
          <motion.div
            id={`artist-card-${artist.id}`}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative flex flex-col bg-[#e6dfcc] text-zinc-950 p-4 border border-[#d2c9b4] shadow-lg rounded-none w-full h-full justify-between min-h-[420px]"
          >
            {/* Post stamp */}
            <div className="absolute top-2 right-2 w-10 h-12 bg-amber-900/10 border border-amber-900/20 rounded-sm flex flex-col items-center justify-center text-[8px] font-serif text-amber-900/60 uppercase select-none pointer-events-none rotate-6">
              <span className="text-[5px]">INDIA</span>
              <span className="font-bold">2026</span>
            </div>

            <div className="flex-grow flex flex-col justify-start">
              <div className="aspect-[4/3] bg-zinc-900 overflow-hidden relative">
                <img src={avatar} alt={artist.name} className="w-full h-full object-cover sepia-[30%]" />
              </div>
              <div className="pt-4 flex flex-col gap-1">
                <h3 className="text-lg font-serif font-bold text-zinc-800">{artist.name}</h3>
                <p className="text-xs text-zinc-500 font-sans tracking-wide leading-tight">
                  {translateArtist(artist, "core", lang)}
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-2 border-t border-zinc-300 text-[9px] text-zinc-400 font-mono tracking-widest uppercase">
              CATALOG REF: {artist.id}
            </div>
          </motion.div>
        );

      case "niko-xian":
        // Magazine Cover Template
        return (
          <motion.div
            id={`artist-card-${artist.id}`}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative overflow-hidden shadow-2xl rounded-none border border-glass-border w-full group h-full flex flex-col justify-between min-h-[420px] p-6 text-white"
          >
            <img src={avatar} alt={artist.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            
            {/* Typography Overlays */}
            <div className="relative z-10 flex flex-col justify-between h-full flex-grow">
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">C-POP SPECIAL</span>
                <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">2026 // 07</span>
              </div>
              
              <div className="flex flex-col gap-1 mt-auto pt-20">
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono">尼科先</span>
                <h3 className="text-3xl font-serif font-black leading-none text-white">{artist.name}</h3>
                <p className="text-xs text-zinc-300 font-sans mt-2">
                  {translateArtist(artist, "lane", lang)}
                </p>
              </div>
            </div>
          </motion.div>
        );

      case "nkvis":
        // Glitch Cyber Ticket Template
        return (
          <motion.div
            id={`artist-card-${artist.id}`}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative flex flex-col bg-black text-[#00f0ff] p-5 border border-[#e00078]/40 shadow-neon rounded-none w-full font-mono overflow-hidden h-full justify-between min-h-[420px]"
          >
            {/* Cyberpunk grid overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,240,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,1)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <div className="flex-grow flex flex-col justify-start">
              <div className="aspect-[16/9] bg-zinc-950 border border-[#e00078]/30 overflow-hidden relative">
                <img src={avatar} alt={artist.name} className="w-full h-full object-cover saturate-150 contrast-125" />
                <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color-dodge" />
              </div>

              <div className="mt-4 flex flex-col gap-1">
                <div className="flex justify-between items-center text-[9px] text-[#e00078]">
                  <span>VIRTUAL_DIVA // SYSTEM_ACTIVE</span>
                  <span>VER. 2026.07</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white mt-1">{artist.name}</h3>
                <p className="text-[10px] text-zinc-400 leading-snug font-sans mt-1">
                  {translateArtist(artist, "core", lang)}
                </p>
              </div>
            </div>
            
            {/* Barcode representation */}
            <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center w-full">
              <div className="flex flex-col gap-0.5 text-[8px] text-zinc-500">
                <span>ID: {artist.id}</span>
                <span>IP: 192.88.26.01</span>
              </div>
              <div className="h-6 w-16 bg-[repeating-linear-gradient(90deg,#00f0ff,#00f0ff_2px,transparent_2px,transparent_4px)] opacity-50" />
            </div>
          </motion.div>
        );

      case "kezevix":
        // Brutalist / Concrete poster Template
        return (
          <motion.div
            id={`artist-card-${artist.id}`}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative flex flex-col p-5 bg-[#18181b] text-white border-2 border-[#27272a] shadow-xl rounded-none w-full h-full justify-between min-h-[420px] font-sans"
            style={{
              backgroundImage: "radial-gradient(circle at 100% 100%, rgba(0,255,102,0.03) 0%, transparent 60%)",
            }}
          >
            <div className="flex-grow flex flex-col justify-start">
              <div className="aspect-[4/3] bg-zinc-950 border border-zinc-800 overflow-hidden relative">
                <img src={avatar} alt={artist.name} className="w-full h-full object-cover grayscale contrast-125" />
                {/* Overlay lines */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,102,0.15)_50%)] bg-[size:100%_4px] pointer-events-none" />
              </div>

              <div className="mt-4 flex flex-col">
                <div className="flex justify-between items-center text-[9px] text-[#00ff66] font-mono tracking-widest uppercase">
                  <span>[ INDUSTRIAL AUDIO ]</span>
                  <span>KZE-X.06</span>
                </div>
                <h3 className="text-2xl font-serif font-black tracking-tight text-white mt-1 uppercase">{artist.name}</h3>
                <p className="text-xs text-zinc-400 mt-2 font-inter leading-relaxed">
                  {translateArtist(artist, "role", lang)}
                </p>
              </div>
            </div>
          </motion.div>
        );

      case "niquiano":
        // Analog Film Strip / warm visual
        return (
          <motion.div
            id={`artist-card-${artist.id}`}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative flex flex-col bg-[#1e1411] text-[#fbeee6] p-4 border border-[#3b2b25] shadow-2xl rounded-none w-full h-full justify-between min-h-[420px] pl-8"
          >
            {/* Film sprocket holes on left */}
            <div className="absolute left-1.5 top-0 bottom-0 w-2.5 flex flex-col justify-around opacity-30 select-none pointer-events-none py-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-2 h-2.5 bg-black rounded-sm border border-zinc-800" />
              ))}
            </div>

            <div className="flex-grow flex flex-col justify-start">
              <div className="aspect-[16/10] bg-zinc-950 overflow-hidden relative border border-[#3b2b25]">
                <img src={avatar} alt={artist.name} className="w-full h-full object-cover saturate-75 brightness-90" />
              </div>
              <div className="pt-4 flex flex-col gap-1">
                <span className="text-[9px] text-[#ff5722] font-mono tracking-widest uppercase">35MM FILM EXPOSURE</span>
                <h3 className="text-xl font-serif font-bold text-[#fbeee6] leading-none mt-1">{artist.name}</h3>
                <p className="text-xs text-zinc-400 font-sans mt-2">
                  {translateArtist(artist, "core", lang)}
                </p>
              </div>
            </div>
          </motion.div>
        );

      case "nita-kizevich":
        // CCTV / Surveillance Frame Template
        return (
          <motion.div
            id={`artist-card-${artist.id}`}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative flex flex-col bg-[#0b0c0d] text-zinc-400 p-5 border border-zinc-800 shadow-md rounded-none w-full h-full justify-between min-h-[420px] font-mono text-xs"
          >
            {/* CCTV timestamps */}
            <div className="flex justify-between items-center text-[9px] text-zinc-500 mb-2">
              <span>CAM 08 - OUTDOOR</span>
              <span>14/07/2026 17:52:10</span>
            </div>

            <div className="flex-grow flex flex-col justify-start">
              <div className="aspect-[4/3] bg-zinc-955 border border-zinc-900 overflow-hidden relative">
                <img src={avatar} alt={artist.name} className="w-full h-full object-cover grayscale brightness-75 contrast-125" />
                {/* Surveillance grid lines */}
                <div className="absolute top-2 left-2 text-[8px] text-green-500 opacity-60">● REC</div>
                <div className="absolute bottom-2 right-2 text-[8px] text-white/40">1080p 30fps</div>
              </div>

              <div className="mt-4 flex flex-col gap-1">
                <h3 className="text-lg font-serif font-bold text-white tracking-tight">{artist.name}</h3>
                <p className="text-[10px] text-zinc-500 font-sans mt-1 leading-snug">
                  {translateArtist(artist, "core", lang)}
                </p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="artists" className="py-20 px-6 md:px-10 max-w-[1360px] mx-auto text-text-primary">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border-primary pb-6 text-text-primary">
        <div>
          <span className="text-[10px] font-bold text-brand-accent font-sans tracking-widest uppercase block mb-2">
            {t("sectionArtistsTitle", lang)}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-text-primary">
            {lang === "ru" ? (
              <>
                8 ВСЕЛЕННЫХ. 8 АРТИСТОВ. <br />
                <span className="text-text-secondary">1 ПРОДЮСЕР (ОДИН ЧЕЛОВЕК).</span>
              </>
            ) : (
              <>
                8 UNIVERSES. 8 ARTISTS. <br />
                <span className="text-text-secondary">1 PRODUCER (ONE PERSON).</span>
              </>
            )}
          </h2>
        </div>
        <p className="max-w-[400px] text-xs text-text-secondary font-sans leading-relaxed">
          {lang === "ru" 
            ? "Разные сцены, один каталог. 8 виртуальных артистов от одного человека. Каждый — это отдельная музыкальная вселенная со своими языковыми кодами, культурой и саундом."
            : "Different scenes, one catalog. 8 virtual artists from a single person. Every artist is a distinct musical universe with their own linguistic codes, culture, and sound."
          }
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {artists.map((artist) => (
          <div key={artist.id} className="flex w-full items-stretch">
            {renderArtistCard(artist)}
          </div>
        ))}
      </div>
    </section>
  );
}
