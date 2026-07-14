"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import Header from "@/components/Header";
import ReleaseMap from "@/components/ReleaseMap";
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

  return (
    <div className="relative min-h-screen bg-[#f3efe9] text-[#111111]">
      {/* Grain overlay for tactile analogue feel */}
      <div className="grain-overlay" />

      {/* Global Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center max-w-[1360px] mx-auto px-6 md:px-10 py-16 z-10 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Copy (7 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-[10px] font-bold text-[#a82c16] font-sans tracking-widest uppercase block">
              ПРОДЮСЕРСКИЙ ЦЕНТР // CATALOG SHOWCASE
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#111111] tracking-tight leading-[1.08]">
              Живой каталог артистов, альбомов и релизных линий.
            </h1>
            <p className="max-w-[580px] text-[#555450] font-sans text-sm sm:text-base leading-relaxed">
              Восемь уникальных музыкальных веток под одним продюсерским штабом: от multilingual pop и academic classical до Indian devotional, Chinese pop, Bossa Nova и Arabic organic house.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center min-h-[44px] px-6 bg-[#111111] text-white font-sans text-xs font-bold uppercase tracking-wider border border-[#111111] hover:bg-transparent hover:text-[#111111] transition-colors duration-200"
              >
                Открыть каталог
              </a>
              <a
                href="#artists"
                className="inline-flex items-center justify-center min-h-[44px] px-6 bg-transparent text-[#111111] font-sans text-xs font-bold uppercase tracking-wider border border-[#111111] hover:bg-[#111111] hover:text-white transition-colors duration-200"
              >
                Смотреть артистов
              </a>
            </div>

            {/* Statistics block */}
            <div className="grid grid-cols-4 gap-4 mt-8 max-w-[620px] border-t border-[#111111] pt-6">
              {[
                { label: "АРТИСТА", value: totalArtists },
                { label: "РЕЛИЗОВ", value: totalReleases },
                { label: "ТРЕКОВ", value: totalTracks },
                { label: "ПОСЛЕДНИЙ", value: "02.06.2026", subVal: "Nikitka Kizevich", highlight: true },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[9px] font-sans font-bold text-[#555450] uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <span
                    className={`text-lg sm:text-xl font-bold font-sans mt-1 ${
                      stat.highlight ? "text-[#a82c16]" : "text-[#111111]"
                    }`}
                  >
                    {stat.value}
                  </span>
                  {stat.subVal && (
                    <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-[#555450] mt-0.5">
                      {stat.subVal}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 2D Interactive Release Map Widget (5 columns) */}
          <div className="lg:col-span-5 h-[400px] sm:h-[500px] lg:h-[600px] shadow-[4px_4px_0px_rgba(17,17,17,1)] relative overflow-hidden">
            <ReleaseMap
              hoveredArtistIndex={hoveredArtistIndex}
              setHoveredArtistIndex={setHoveredArtistIndex}
            />
          </div>
        </div>

        {/* Mini Mixers Row under Hero */}
        <div className="w-full mt-16">
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
