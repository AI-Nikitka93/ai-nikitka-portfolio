import React from "react";

export default function Footer() {
  return (
    <footer id="status" className="border-t border-border-primary bg-bg-card py-16 px-6 md:px-10">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-12">
        {/* PUBLICATION STATUS BOX */}
        <div className="border border-border-primary bg-bg-base p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1 max-w-[800px]">
            <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest block mb-2">
              PUBLICATION STATUS
            </span>
            <h3 className="font-serif text-text-primary text-xl md:text-2xl mb-4 leading-tight">
              Готово как локальная витрина каталога.
            </h3>
            <p className="text-xs text-text-secondary font-sans leading-relaxed">
              Этот ресурс является официальным портфолио продюсера AI Nikitka93. Данные в каталоге,
              включая дискографии, метаданные и обложки, соответствуют внутренним стандартам дистрибьютора FreshTunes
              по состоянию на июль 2026 года. Внешние ссылки ведут на демонстрационные материалы,
              аудиозаписи размещены локально.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center justify-center min-h-[44px] px-6 font-sans text-xs font-bold uppercase tracking-wider bg-text-primary text-bg-base border border-border-primary hover:bg-transparent hover:text-text-primary transition-colors duration-200"
          >
            Вернуться к релизам
          </a>
        </div>

        {/* BOTTOM METADATA ROW */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border-muted text-[10px] text-text-secondary font-sans font-bold uppercase tracking-widest gap-4">
          <div>
            AI Nikitka93 Music Portfolio
          </div>
          <div>
            Catalog snapshot 05.06.2026
          </div>
        </div>
      </div>
    </footer>
  );
}
