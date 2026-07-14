"use client";

import React from "react";
import { catalogData } from "@/data/catalog";

interface MiniMixersProps {
  hoveredArtistIndex: number | null;
  setHoveredArtistIndex: (index: number | null) => void;
}

export default function MiniMixers({ hoveredArtistIndex, setHoveredArtistIndex }: MiniMixersProps) {
  const artists = catalogData.artists;

  const scrollToArtist = (artistId: string) => {
    const el = document.getElementById(`artist-card-${artistId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-2", "ring-[#111111]", "duration-1000");
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-[#111111]");
      }, 2000);
    }
  };

  return (
    <div className="max-w-[1360px] mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 select-none">
      {artists.map((artist, idx) => {
        const isHovered = hoveredArtistIndex === idx;
        const color = artist.accent || "#111111";
        
        return (
          <div
            key={artist.id}
            onMouseEnter={() => setHoveredArtistIndex(idx)}
            onMouseLeave={() => setHoveredArtistIndex(null)}
            onClick={() => scrollToArtist(artist.id)}
            className={`flex flex-col gap-2 p-3 border cursor-pointer transition-all duration-200 group rounded-none ${
              isHovered
                ? "bg-white border-[#111111] shadow-[2px_2px_0px_rgba(17,17,17,1)] translate-x-0.5 -translate-y-0.5"
                : "bg-[#f4f4f0] border-[#111111]"
            }`}
          >
            <div className="flex items-center justify-between text-[9px] font-bold font-sans tracking-wider uppercase text-[#555450] group-hover:text-black">
              <span className="truncate max-w-[80px]">{artist.name}</span>
              <span style={{ color }}>●</span>
            </div>
            
            {/* Visualizer bars */}
            <div className="h-10 flex items-end gap-[3.5px] px-1">
              {Array.from({ length: 12 }).map((_, barIdx) => {
                // Generate delay
                const delay = `${(barIdx * 0.08).toFixed(2)}s`;
                const duration = isHovered ? "0.4s" : `${(0.8 + (barIdx % 5) * 0.1).toFixed(2)}s`;
                
                return (
                  <span
                    key={barIdx}
                    style={{
                      backgroundColor: color,
                      animationDelay: delay,
                      animationDuration: duration,
                    }}
                    className="flex-1 w-full rounded-none animate-[bounceEqualizer_1s_ease-in-out_infinite]"
                  />
                );
              })}
            </div>
          </div>
        );
      })}

      <style jsx global>{`
        @keyframes bounceEqualizer {
          0%, 100% {
            height: 15%;
          }
          50% {
            height: 90%;
          }
        }
      `}</style>
    </div>
  );
}
