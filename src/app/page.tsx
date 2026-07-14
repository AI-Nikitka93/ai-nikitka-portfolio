"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import Header from "@/components/Header";
import AmbientMixer from "@/components/AmbientMixer";
import MiniMixers from "@/components/MiniMixers";
import ArtistGrid from "@/components/ArtistGrid";
import Spotlight from "@/components/Spotlight";
import ReleaseGrid from "@/components/ReleaseGrid";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import { catalogData } from "@/data/catalog";

export default function Home() {
  const [hoveredArtistIndex, setHoveredArtistIndex] = useState<number | null>(null);
  const [selectedReleaseId, setSelectedReleaseId] = useState<string>("");

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Set default selected release ID (latest release)
  useEffect(() => {
    if (catalogData.releases.length > 0) {
      setSelectedReleaseId(catalogData.releases[0].id);
    }
  }, []);

  const totalReleases = catalogData.releases.length;
  const totalArtists = catalogData.artists.length;
  const totalTracks = catalogData.releases.reduce((acc, r) => acc + r.tracks.length, 0);
  const latestReleaseLabel = catalogData.releases[0]?.dateLabel || "Сегодня";

  return (
    <div className="relative min-h-screen bg-[#09090b]">
      {/* Grain overlay for tactile analogue feel */}
      <div className="grain-overlay" />

      {/* Global Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center max-w-[1360px] mx-auto px-6 md:px-10 py-20 z-10 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Copy (7 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6 select-none">
            <span className="text-xs font-bold text-[#e84f3d] font-inter tracking-widest uppercase block">
              ПРОДЮСЕРСКИЙ ЦЕНТР // CATALOG SHOWCASE
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-[1.05]">
              МУЗЫКА КАК ИСКУССТВО. <br />
              ТЕХНОЛОГИИ КАК <br />
              ИНСТРУМЕНТ.
            </h1>
            <p className="max-w-[540px] text-zinc-400 font-inter text-sm sm:text-base leading-relaxed">
              8 вселенных. 8 голосов. 1 продюсер. <br />
              Экспериментальные жанры, культурные диалоги и технологии нового поколения.
            </p>

            {/* Statistics block */}
            <div className="grid grid-cols-4 gap-4 mt-8 max-w-[620px] border-t border-glass-border pt-6">
              {[
                { label: "Артистов", value: totalArtists },
                { label: "Релизов", value: totalReleases },
                { label: "Треков", value: totalTracks },
                { label: "Обновлено", value: latestReleaseLabel, highlight: true },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    {stat.label}
                  </span>
                  <span
                    className={`text-xl sm:text-2xl font-black font-sans mt-1 ${
                      stat.highlight ? "text-[#e84f3d]" : "text-white"
                    }`}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* R3F Interactive Mixer Canvas (5 columns) */}
          <div className="lg:col-span-5 h-[400px] sm:h-[500px] lg:h-[600px] border border-glass-border bg-[#101012] relative overflow-hidden shadow-premium">
            <AmbientMixer hoveredArtistIndex={hoveredArtistIndex} />
            <div className="absolute bottom-4 left-4 text-[9px] font-mono text-zinc-600 uppercase tracking-widest pointer-events-none">
              interactive_equalizer_v2.0
            </div>
          </div>
        </div>

        {/* Mini Mixers Row under Hero */}
        <div className="w-full mt-12">
          <MiniMixers
            hoveredArtistIndex={hoveredArtistIndex}
            setHoveredArtistIndex={setHoveredArtistIndex}
          />
        </div>
      </section>

      {/* Artist Worlds Section */}
      <ArtistGrid />

      {/* Spotlight Featured Section */}
      {selectedReleaseId && (
        <Spotlight selectedReleaseId={selectedReleaseId} />
      )}

      {/* Release Catalog Grid */}
      <ReleaseGrid onSpotlightSelect={(id) => setSelectedReleaseId(id)} />

      {/* Timeline Section */}
      <Timeline onSpotlightSelect={(id) => setSelectedReleaseId(id)} />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
