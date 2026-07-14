"use client";

import React, { useState, useEffect } from "react";
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
      el.classList.add("ring-2", "ring-white", "duration-1000");
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-white");
      }, 2000);
    }
  };

  return (
    <div className="max-w-[1360px] mx-auto px-6 md:px-10 mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
      {artists.map((artist, idx) => {
        const isHovered = hoveredArtistIndex === idx;
        const color = artist.accent || "#ffffff";
        
        return (
          <div
            key={artist.id}
            onMouseEnter={() => setHoveredArtistIndex(idx)}
            onMouseLeave={() => setHoveredArtistIndex(null)}
            onClick={() => scrollToArtist(artist.id)}
            className="flex flex-col gap-2 p-3 bg-surface border border-glass-border hover:border-zinc-400 rounded-md cursor-pointer transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="flex items-center justify-between text-[11px] font-bold font-inter tracking-wider uppercase text-zinc-500 group-hover:text-zinc-300">
              <span className="truncate max-w-[80px]">{artist.name}</span>
              <span style={{ color }}>●</span>
            </div>
            
            {/* Visualizer bars */}
            <div className="h-10 flex items-end gap-[3px] px-1">
              {Array.from({ length: 12 }).map((_, barIdx) => {
                // Generate slightly offset random speeds / animations
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
                    className="flex-1 w-full rounded-t-sm animate-[bounceEqualizer_1s_ease-in-out_infinite]"
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
            height: 10%;
          }
          50% {
            height: 90%;
          }
        }
      `}</style>
    </div>
  );
}
