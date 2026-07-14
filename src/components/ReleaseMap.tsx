"use client";

import React from "react";
import { catalogData } from "@/data/catalog";

interface ReleaseMapProps {
  hoveredArtistIndex: number | null;
  setHoveredArtistIndex: (index: number | null) => void;
}

export default function ReleaseMap({ hoveredArtistIndex, setHoveredArtistIndex }: ReleaseMapProps) {
  const artists = catalogData.artists;
  const releases = catalogData.releases;

  // Calculate release counts per artist to show dynamic data
  const getArtistReleasesCount = (artistId: string) => {
    return releases.filter((r) => r.artistId === artistId).length;
  };

  const getArtistTracksCount = (artistId: string) => {
    return releases
      .filter((r) => r.artistId === artistId)
      .reduce((acc, r) => acc + r.tracks.length, 0);
  };

  const handleArtistClick = (artistId: string) => {
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
    <div className="w-full h-full border border-[#111111] bg-[#f4f4f0] p-6 flex flex-col justify-between select-none">
      <div className="flex justify-between items-center border-b border-[#111111] pb-4 mb-4">
        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#111111]">
          AI NIKITKA93
        </span>
        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#a82c16] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#a82c16] rounded-full animate-pulse"></span>
          Release Map / 2026
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-around gap-2">
        {artists.map((artist, idx) => {
          const isHovered = hoveredArtistIndex === idx;
          const isAnyHovered = hoveredArtistIndex !== null;
          const color = artist.accent || "#111111";
          const count = getArtistReleasesCount(artist.id);
          const tracks = getArtistTracksCount(artist.id);

          return (
            <div
              key={artist.id}
              onMouseEnter={() => setHoveredArtistIndex(idx)}
              onMouseLeave={() => setHoveredArtistIndex(null)}
              onClick={() => handleArtistClick(artist.id)}
              style={{
                borderColor: isHovered ? "#111111" : "#111111",
              }}
              className={`flex items-center justify-between p-2.5 border transition-all duration-300 cursor-pointer ${
                isHovered
                  ? "bg-white translate-x-1 shadow-[2px_2px_0px_rgba(17,17,17,1)]"
                  : isAnyHovered
                  ? "opacity-40 bg-[#f4f4f0] border-transparent"
                  : "bg-white border-[#111111]"
              }`}
            >
              {/* Left Column: Artist and short description */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2">
                  <span
                    style={{ backgroundColor: color }}
                    className="w-2 h-2 rounded-none inline-block flex-shrink-0"
                  />
                  <h4 className="font-serif text-[13px] font-bold text-[#111111] truncate">
                    {artist.name}
                  </h4>
                </div>
                <p className="text-[9px] text-[#555450] font-sans uppercase tracking-wider truncate mt-0.5">
                  {artist.shortLane}
                </p>
              </div>

              {/* Right Column: Mini horizontal grid of bars showing releases */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 6 }).map((_, barIdx) => {
                    const isActive = barIdx < count;
                    return (
                      <div
                        key={barIdx}
                        style={{
                          backgroundColor: isActive ? color : "#edece8",
                          height: `${12 + (barIdx * 3)}px`,
                        }}
                        className={`w-1.5 transition-all duration-300 ${
                          isActive && isHovered ? "scale-y-110" : ""
                        }`}
                      />
                    );
                  })}
                </div>
                <div className="w-12 text-right">
                  <span className="text-[10px] font-mono font-bold text-[#111111]">
                    {tracks} Trk
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[#111111] pt-4 mt-4 flex justify-between items-center text-[9px] font-sans font-bold uppercase tracking-widest text-[#555450]">
        <span>Index mapping status</span>
        <span className="text-[#111111]">100% Synced</span>
      </div>
    </div>
  );
}
