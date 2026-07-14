"use client";

import React from "react";

export default function Header() {
  return (
    <header className="sticky top-6 z-50 mx-4 md:mx-10 my-4 flex items-center justify-between min-h-[72px] px-6 md:px-10 rounded-full border border-glass-border bg-glass-bg backdrop-blur-[24px] saturate-[150%]">
      <a href="#" className="flex items-center gap-3 no-underline group">
        <div className="grid place-items-center w-11 h-11 border border-glass-border bg-[#ffdd3d] text-black font-black text-lg transition-transform duration-300 group-hover:scale-105">
          NK
        </div>
        <div className="flex flex-col">
          <strong className="text-white font-sans text-sm tracking-widest uppercase">AI NIKITKA93</strong>
          <small className="text-xs text-zinc-400 font-inter font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
            Live Catalog / July 2026
          </small>
        </div>
      </a>
      
      <nav className="hidden md:flex gap-1">
        {["Артисты", "Каталог", "Хронология", "Контакты"].map((item, idx) => (
          <a
            key={idx}
            href={`#${["artists", "catalog", "timeline", "contacts"][idx]}`}
            className="inline-flex items-center min-h-[44px] px-4 font-inter text-sm font-semibold tracking-wider text-zinc-300 hover:text-white border-b-2 border-transparent hover:border-white transition-all duration-300 hover:-translate-y-0.5"
          >
            {item}
          </a>
        ))}
      </nav>

      <button className="md:hidden flex flex-col gap-1.5 justify-center w-10 h-10 border border-glass-border rounded-full p-2.5">
        <span className="w-full h-0.5 bg-white"></span>
        <span className="w-full h-0.5 bg-white"></span>
      </button>
    </header>
  );
}
