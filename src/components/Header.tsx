"use client";

import React from "react";
import { Lang, t } from "@/utils/translate";

interface HeaderProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export default function Header({ lang, setLang }: HeaderProps) {
  const toggleLanguage = () => {
    setLang(lang === "ru" ? "en" : "ru");
  };

  const navItems = [
    { labelKey: "navArtists", href: "#artists" },
    { labelKey: "navCatalog", href: "#catalog" },
    { labelKey: "navTimeline", href: "#timeline" },
    { labelKey: "navStatus", href: "#status" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-between min-h-[72px] px-6 md:px-10 bg-bg-base/95 backdrop-blur-[12px] border-b border-border-primary text-text-primary">
      <a href="#" className="flex items-center gap-3 no-underline group">
        <div className="grid place-items-center w-11 h-11 border border-border-primary bg-[#ffdd3d] text-black font-black text-lg transition-transform duration-300 group-hover:scale-105">
          A93
        </div>
        <div className="flex flex-col">
          <strong className="text-text-primary font-serif text-sm tracking-wide">
            {t("portfolioTitle", lang)}
          </strong>
          <small className="text-[10px] text-text-secondary font-sans font-bold uppercase tracking-widest">
            {t("portfolioSubtitle", lang)}
          </small>
        </div>
      </a>
      
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex gap-1">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="inline-flex items-center min-h-[44px] px-4 font-sans text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {t(item.labelKey, lang)}
            </a>
          ))}
        </nav>

        {/* Language Switcher Toggle */}
        <button
          onClick={toggleLanguage}
          className="inline-flex items-center justify-center min-h-[32px] px-3.5 border border-border-primary text-[10px] font-sans font-bold tracking-widest hover:bg-text-primary hover:text-bg-base transition-colors duration-200 uppercase"
        >
          {lang === "ru" ? "EN" : "RU"}
        </button>
      </div>

      <button className="md:hidden flex flex-col gap-1.5 justify-center items-center w-10 h-10 border border-border-primary p-2.5">
        <span className="w-full h-0.5 bg-text-primary"></span>
        <span className="w-full h-0.5 bg-text-primary"></span>
      </button>
    </header>
  );
}
