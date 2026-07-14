"use client";

import React from "react";
import { motion } from "framer-motion";
import { catalogData } from "@/data/catalog";

export default function ArtistGrid() {
  const artists = catalogData.artists;

  // Custom styling templates based on artist ID
  const renderArtistCard = (artist: typeof artists[0]) => {
    const avatar = (artist.avatarUrl ? artist.avatarUrl.replace("./", "/") : `/assets/avatars/${artist.id.replace("-", "_")}.jpg`) + "?v=20260714-2345";
    
    switch (artist.id) {
      case "nikitka-ai":
        // Polaroid Template
        return (
          <motion.div
            id={`artist-card-${artist.id}`}
            whileHover={{ scale: 1.02, rotate: -1, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex flex-col p-4 bg-[#f8f6f0] text-zinc-900 border border-zinc-300 shadow-xl rounded-none transform rotate-1 self-start w-full"
          >
            <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden border border-zinc-200">
              <img src={avatar} alt={artist.name} className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-red-600 text-white text-[9px] font-bold uppercase tracking-wider">
                Live
              </div>
            </div>
            <div className="pt-4 pb-2 flex flex-col gap-1 font-serif text-center">
              <h3 className="text-xl font-bold tracking-tight text-zinc-800">{artist.name}</h3>
              <p className="text-xs text-zinc-500 font-sans tracking-wide uppercase font-bold">{artist.shortLane}</p>
              <span className="text-[10px] text-zinc-400 font-sans italic mt-2">"Live is real..."</span>
            </div>
          </motion.div>
        );

      case "nikita-kizevich":
        // Archival Document Template (Vertical to match aspect ratio of other cards)
        return (
          <motion.div
            id={`artist-card-${artist.id}`}
            whileHover={{ scale: 1.02, rotate: 1, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex flex-col p-5 bg-[#eae4d3] text-zinc-900 border-2 border-[#cfc8b3] shadow-lg rounded-none w-full font-mono min-h-[420px] justify-between"
            style={{
              backgroundImage: "radial-gradient(circle at 10% 20%, rgba(0,0,0,0.01) 0%, transparent 100%)",
            }}
          >
            {/* Folder tab */}
            <div className="absolute -top-3 left-6 px-3 py-0.5 bg-[#cfc8b3] text-[9px] font-mono uppercase tracking-wider font-bold">
              FILE_REF // 19-B
            </div>

            <div className="flex flex-col gap-4 h-full justify-between">
              {/* Photo at the top */}
              <div className="w-full aspect-[4/3] bg-zinc-800 border border-zinc-400 overflow-hidden relative grayscale">
                <img src={avatar} alt={artist.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-yellow-900/10 mix-blend-multiply pointer-events-none" />
              </div>
              
              {/* Text section */}
              <div className="flex flex-col gap-2 flex-grow mt-2">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider">COMPOSER_CLASS:</span>
                <h3 className="text-lg font-bold tracking-tighter text-zinc-800 leading-tight">{artist.name}</h3>
                <p className="text-[10px] text-zinc-600 font-sans leading-tight mt-1">{artist.role}</p>
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
            className="relative flex flex-col bg-[#e6dfcc] text-zinc-950 p-4 border border-[#d2c9b4] shadow-lg rounded-none w-full"
          >
            {/* Post stamp */}
            <div className="absolute top-2 right-2 w-10 h-12 bg-amber-900/10 border border-amber-900/20 rounded-sm flex flex-col items-center justify-center text-[8px] font-serif text-amber-900/60 uppercase select-none pointer-events-none rotate-6">
              <span className="text-[5px]">INDIA</span>
              <span className="font-bold">2026</span>
            </div>

            <div className="aspect-[4/3] bg-zinc-900 overflow-hidden relative">
              <img src={avatar} alt={artist.name} className="w-full h-full object-cover sepia-[30%]" />
            </div>
            <div className="pt-4 flex flex-col gap-1">
              <h3 className="text-lg font-serif font-bold text-zinc-800">{artist.name}</h3>
              <p className="text-xs text-zinc-500 font-sans tracking-wide leading-tight">{artist.core}</p>
              <div className="mt-2 text-[9px] text-zinc-400 font-mono tracking-widest uppercase border-t border-zinc-300 pt-2">
                CATALOG REF: {artist.id}
              </div>
            </div>
          </motion.div>
        );

      case "niko-xian":
        // Magazine Cover Template
        return (
          <motion.div
            id={`artist-card-${artist.id}`}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative overflow-hidden aspect-[4/5] shadow-2xl rounded-none border border-glass-border w-full group"
          >
            <img src={avatar} alt={artist.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            
            {/* Typography Overlays */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">C-POP SPECIAL</span>
                <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">2026 // 07</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono">尼科先</span>
                <h3 className="text-3xl font-serif font-black leading-none text-white">{artist.name}</h3>
                <p className="text-xs text-zinc-300 font-sans mt-2">{artist.lane}</p>
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
            className="relative flex flex-col bg-black text-[#00f0ff] p-5 border border-[#e00078]/40 shadow-neon rounded-none w-full font-mono overflow-hidden"
          >
            {/* Cyberpunk grid overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,240,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,1)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

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
              <p className="text-[10px] text-zinc-400 leading-snug font-sans mt-1">{artist.core}</p>
              
              {/* Barcode representation */}
              <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center">
                <div className="flex flex-col gap-0.5 text-[8px] text-zinc-500">
                  <span>ID: {artist.id}</span>
                  <span>IP: 192.88.26.01</span>
                </div>
                <div className="h-6 w-16 bg-[repeating-linear-gradient(90deg,#00f0ff,#00f0ff_2px,transparent_2px,transparent_4px)] opacity-50" />
              </div>
            </div>
          </motion.div>
        );

      case "kezevix":
        // Brutalist / Concrete poster Template
        return (
          <motion.div
            id={`artist-card-${artist.id}`}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative flex flex-col p-5 bg-[#18181b] text-white border-2 border-[#27272a] shadow-xl rounded-none w-full font-sans"
            style={{
              backgroundImage: "radial-gradient(circle at 100% 100%, rgba(0,255,102,0.03) 0%, transparent 60%)",
            }}
          >
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
              <p className="text-xs text-zinc-400 mt-2 font-inter leading-relaxed">{artist.role}</p>
            </div>
          </motion.div>
        );

      case "niquiano":
        // Analog Film Strip / warm visual
        return (
          <motion.div
            id={`artist-card-${artist.id}`}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative flex flex-col bg-[#1e1411] text-[#fbeee6] p-4 border border-[#3b2b25] shadow-2xl rounded-none w-full"
          >
            {/* Film sprocket holes on left */}
            <div className="absolute left-1 top-0 bottom-0 w-2 flex flex-col justify-around opacity-30 select-none pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-1.5 h-2 bg-black rounded-sm" />
              ))}
            </div>

            <div className="pl-3">
              <div className="aspect-[16/10] bg-zinc-900 overflow-hidden relative border border-[#3b2b25]">
                <img src={avatar} alt={artist.name} className="w-full h-full object-cover saturate-75 brightness-90" />
              </div>
              <div className="pt-4 flex flex-col gap-1">
                <span className="text-[9px] text-[#ff5722] font-mono tracking-widest uppercase">35MM FILM EXPOSURE</span>
                <h3 className="text-xl font-serif font-bold text-[#fbeee6] leading-none mt-1">{artist.name}</h3>
                <p className="text-xs text-zinc-400 font-sans mt-2">{artist.core}</p>
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
            className="relative flex flex-col bg-[#0b0c0d] text-zinc-400 p-5 border border-zinc-800 shadow-md rounded-none w-full font-mono text-xs"
          >
            {/* CCTV timestamps */}
            <div className="flex justify-between items-center text-[9px] text-zinc-500 mb-2">
              <span>CAM 08 - OUTDOOR</span>
              <span>14/07/2026 17:52:10</span>
            </div>

            <div className="aspect-[4/3] bg-zinc-950 border border-zinc-900 overflow-hidden relative">
              <img src={avatar} alt={artist.name} className="w-full h-full object-cover grayscale brightness-75 contrast-125" />
              {/* Surveillance grid lines */}
              <div className="absolute top-2 left-2 text-[8px] text-green-500 opacity-60">● REC</div>
              <div className="absolute bottom-2 right-2 text-[8px] text-white/40">1080p 30fps</div>
            </div>

            <div className="mt-4 flex flex-col gap-1">
              <h3 className="text-lg font-serif font-bold text-white tracking-tight">{artist.name}</h3>
              <p className="text-[10px] text-zinc-500 font-sans mt-1 leading-snug">{artist.core}</p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="artists" className="py-20 px-6 md:px-10 max-w-[1360px] mx-auto text-[#111111]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#111111] pb-6">
        <div>
          <span className="text-[10px] font-bold text-[#a82c16] font-sans tracking-widest uppercase block mb-2">
            ИССЛЕДУЙТЕ МИРЫ // 8 ARTISTS
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#111111] leading-tight">
            8 ВСЕЛЕННЫХ. 8 ГОЛОСОВ. <br />
            <span className="text-[#555450]">1 ПРОДЮСЕР.</span>
          </h2>
        </div>
        <p className="max-w-[400px] text-xs text-[#555450] font-sans leading-relaxed">
          Разные сцены, один каталог. Каждый артист — это отдельная музыкальная вселенная со своими языковыми кодами, культурой и саундом. Погрузитесь в их дискографии.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {artists.map((artist) => (
          <div key={artist.id} className="flex justify-center w-full">
            {renderArtistCard(artist)}
          </div>
        ))}
      </div>
    </section>
  );
}
