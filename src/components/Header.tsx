"use client";

import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-between min-h-[72px] px-6 md:px-10 bg-bg-base/95 backdrop-blur-[12px] border-b border-border-primary text-text-primary">
      <a href="#" className="flex items-center gap-3 no-underline group">
        <div className="grid place-items-center w-11 h-11 border border-border-primary bg-[#ffdd3d] text-black font-black text-lg transition-transform duration-300 group-hover:scale-105">
          A93
        </div>
        <div className="flex flex-col">
          <strong className="text-text-primary font-serif text-sm tracking-wide">AI Nikitka93</strong>
          <small className="text-[10px] text-text-secondary font-sans font-bold uppercase tracking-widest">
            Music Portfolio
          </small>
        </div>
      </a>
      
      <nav className="hidden md:flex gap-1">
        {["Артисты", "Каталог", "Таймлайн", "Публикация"].map((item, idx) => (
          <a
            key={idx}
            href={`#${["artists", "catalog", "timeline", "status"][idx]}`}
            className="inline-flex items-center min-h-[44px] px-4 font-sans text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            {item}
          </a>
        ))}
      </nav>

      <button className="md:hidden flex flex-col gap-1.5 justify-center items-center w-10 h-10 border border-border-primary p-2.5">
        <span className="w-full h-0.5 bg-text-primary"></span>
        <span className="w-full h-0.5 bg-text-primary"></span>
      </button>
    </header>
  );
}
