import React from "react";

export default function Footer() {
  return (
    <footer id="contacts" className="border-t border-glass-border bg-[#050507] text-[#a1a1aa] py-12 px-6 md:px-10">
      <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col">
          <h4 className="font-serif text-white text-xl tracking-wide mb-2">AI NIKITKA93</h4>
          <p className="text-sm font-inter">Музыка без границ. Идеи без шума.</p>
        </div>
        
        <div className="flex flex-wrap gap-8 text-sm font-semibold tracking-wider uppercase font-inter">
          <a href="#" className="hover:text-white transition-colors duration-300">Контакты</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Пресс-Кит</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Сотрудничество</a>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold font-inter">
          <span>© 2026 AI Nikitka93. Все права защищены.</span>
        </div>
      </div>
    </footer>
  );
}
