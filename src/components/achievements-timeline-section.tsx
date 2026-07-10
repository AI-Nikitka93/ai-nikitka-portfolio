"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";

type AwardSlide = {
  id: string;
  slug: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  year: string;
  description: string;
  image: string;
  stats?: { label: string; value: string }[];
};

const awardSlides: readonly AwardSlide[] = [
  {
    id: "35awards",
    slug: "sig-01-35awards-ai-imaging-field-results",
    title: "TOP 35",
    titleAccent: "35AWARDS",
    subtitle: "INTERNATIONAL AI PHOTOGRAPHY AWARD",
    year: "2025-2026",
    description: "Международная премия в области ИИ-фотографии. 9 работ прошли в финальные фазы, автор вошел в ТОП-35 лучших в мире.",
    image: "/proof-assets/sig-01-35awards-2026.jpg",
    stats: [
      { label: "Living Creatures", value: "Top 35" },
      { label: "Landscape", value: "Top 50" },
      { label: "Undocumented", value: "Top 70" }
    ]
  },
  {
    id: "helix-film",
    slug: "sig-02-labstory-helix-best-animated-film",
    title: "ГРАН-ПРИ",
    titleAccent: "LABSTORY",
    subtitle: "ЛУЧШИЙ АНИМАЦИОННЫЙ ФИЛЬМ",
    year: "2025",
    description: "1-е место на корпоративном творческом конкурсе Helix за лучший нейросетевой мультфильм о лабораторной диагностике.",
    image: "/proof-assets/sig-02-helix-film.png",
    stats: [
      { label: "Награда", value: "Гран-при" },
      { label: "Номинация", value: "Фильм" },
      { label: "Стек", value: "Runway/Luma" }
    ]
  },
  {
    id: "kinomatik",
    slug: "sig-04-kinomatik-laureate-neurovideo-competition",
    title: "ЛАУРЕАТ",
    titleAccent: "КИНОМАТИК",
    subtitle: "МЕЖДУНАРОДНЫЙ ФЕСТИВАЛЬ ЦИФРОВОГО ИСКУССТВА",
    year: "2026",
    description: "Короткометражный фильм вошел в число 15 лучших работ международного фестиваля цифрового искусства в номинации «Нейросетевое видео».",
    image: "/proof-assets/sig-04-kinomatik.jpg",
    stats: [
      { label: "Ранг", value: "Лауреат" },
      { label: "Проект", value: "Партизаны" },
      { label: "Стек", value: "VEO 3/Stable" }
    ]
  },
  {
    id: "helix-tech",
    slug: "sig-03-labstory-helix-technical-mastery",
    title: "МАСТЕРСТВО",
    titleAccent: "HELIX TECH",
    subtitle: "ДИПЛОМ ЗА ТЕХНИЧЕСКОЕ МАСТЕРСТВО",
    year: "2025",
    description: "Специальная награда конкурса за качество цветокоррекции, чистоту монтажа, апскейлинг и постпродакшн видеоряда.",
    image: "/proof-assets/sig-03-helix-tech.png",
    stats: [
      { label: "Фокус", value: "Постпродакшн" },
      { label: "Рейтинг", value: "Max Quality" },
      { label: "Метод", value: "Upscaler AI" }
    ]
  },
  {
    id: "amd-hackathon",
    slug: "sig-07-nvidia-blackwell-nvfp4-kernel-hackathon",
    title: "УСПЕШНО",
    titleAccent: "AMD CLOUD",
    subtitle: "AMD DEVELOPER HACKATHON 2026",
    year: "2026",
    description: "Разработка и успешная сдача ИИ-решения на базе AMD Developer Cloud, ROCm, Qwen3, LangChain и AgentOps.",
    image: "/proof-assets/support-07-amd-hackathon-2026.jpg",
    stats: [
      { label: "Платформа", value: "AMD Cloud" },
      { label: "Сертификат", value: "CMQHZY14" },
      { label: "Стек", value: "ROCm/Lang" }
    ]
  }
];

const timelineNodes = [
  { year: "2020", label1: "Электрик 5 р.", label2: "Пром. объекты", coords: "SYS // 53.900" },
  { year: "2021", label1: "Электромонтаж", label2: "Минскводоканал", coords: "SYS // 53.901" },
  { year: "2022", label1: "Знакомство с ИИ", label2: "Ноябрь: ChatGPT", coords: "AI_ST // 53.902" },
  { year: "2023", label1: "Промптинг", label2: "Разбор на винтики", coords: "R&D // 53.903" },
  { year: "2024", label1: "Нейрокартинки", label2: "Плотная работа", coords: "IMG // 53.904" },
  { year: "2025", label1: "Видеогенерация", label2: "Первые победы", coords: "VID // 53.905" },
  { year: "2026", label1: "Сейчас:", label2: "Вайбкодинг & R&D", isCurrent: true, coords: "LIVE // 53.906" }
];

export function AchievementsTimelineSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % awardSlides.length);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  const currentAward = awardSlides[activeSlide];

  return (
    <section className="space-y-6">
      {/* HUD Embedded Styles for Keyframe Animations */}
      <style jsx global>{`
        @keyframes laser-sweep-vertical {
          0% { top: 4%; opacity: 0.1; }
          10% { opacity: 0.9; }
          90% { opacity: 0.9; }
          100% { top: 96%; opacity: 0.1; }
        }
        @keyframes ring-spin-ccw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-laser-sweep-vertical {
          animation: laser-sweep-vertical 6s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
        }
        .animate-ring-spin-ccw {
          animation: ring-spin-ccw 12s linear infinite;
        }
      `}</style>

      {/* 2-Column Grid Layout: Slider on Left, stacked Path & Quote on Right (matching design mockup) */}
      <div className="grid gap-6 lg:grid-cols-[1.14fr_0.86fr] items-stretch">
        
        {/* Left Column Card: Dynamic Awards Slider (Full Height) */}
        <div 
          className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.76)] p-6 md:p-8 grid sm:grid-cols-[1.18fr_0.82fr] gap-6 overflow-hidden relative min-h-[420px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Tactical Background Grid Details */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(142,150,140,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(142,150,140,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="flex flex-col justify-between h-full z-10">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                  ГЛАВНЫЕ ДОСТИЖЕНИЯ
                </p>
                <div className="flex gap-1.5">
                  {awardSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeSlide ? "w-4 bg-accent" : "w-1.5 bg-border-subtle/50 hover:bg-accent/40"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight transition-all duration-300">
                <span className="text-accent">{currentAward.title}</span> {currentAward.subtitle}
              </h3>
              
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-titanium">
                {currentAward.titleAccent} {"//"} {currentAward.year}
              </p>
              
              <p className="text-xs sm:text-sm leading-6 text-[rgba(214,207,191,0.82)] min-h-[72px] transition-all duration-300">
                {currentAward.description}
              </p>

              {/* Dynamic slide-specific stats grid */}
              {currentAward.stats && (
                <div className="grid grid-cols-3 gap-2 mt-4 transition-all duration-300">
                  {currentAward.stats.map((stat, idx) => (
                    <div key={idx} className="rounded border border-border-subtle/50 bg-[rgba(10,13,12,0.4)] p-2 text-center">
                      <span className="block font-mono text-[8px] uppercase tracking-wider text-titanium mb-1">
                        {stat.label}
                      </span>
                      <span className="font-mono text-xs font-semibold text-accent truncate block">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-border-subtle/30">
              <Link
                href={`/portfolio/${currentAward.slug}`}
                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-panel border border-accent/40 bg-accent/4 px-4 py-2 text-xs font-bold text-accent transition-all duration-300 hover:border-accent hover:bg-accent/18 hover:scale-[1.02] shadow-[0_0_8px_rgba(183,255,60,0.05)] hover:shadow-[0_0_18px_rgba(183,255,60,0.2)]"
              >
                ПОДРОБНЕЕ
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Right Side of the Left Card: Large, fully visible Certificate/Poster Image */}
          <div className="relative rounded-panel overflow-hidden border border-border-subtle min-h-[220px] sm:min-h-full transition-all duration-500 bg-[rgba(10,13,12,0.45)] flex items-center justify-center p-3 select-none">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-15 blur-lg pointer-events-none transition-all duration-500 scale-[1.05]"
              style={{
                backgroundImage: `url('${currentAward.image}')`,
              }}
            />
            {/* Overlay gradient masks to blend with the card edges */}
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(18,24,22,0.92)] via-transparent to-transparent pointer-events-none sm:block hidden z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,24,22,0.92)] via-transparent to-transparent pointer-events-none z-10" />
            
            {/* Actual contain image for full readability */}
            <div className="relative w-full h-full min-h-[200px] sm:min-h-[280px] z-0 flex items-center justify-center">
              <Image 
                src={currentAward.image}
                alt={currentAward.title}
                fill
                sizes="(max-width: 640px) 100vw, 40vw"
                className="object-contain rounded drop-shadow-[0_16px_40px_rgba(0,0,0,0.9)] transition-all duration-500 hover:scale-[1.03]"
                priority
              />
            </div>
          </div>

        </div>

        {/* Right Column Stack: Vertical HUD Timeline (Top) + Quote (Bottom) */}
        <div className="flex flex-col gap-6 justify-between items-stretch">
          
          {/* Card 1: Vertical HUD Career Path Timeline */}
          <div className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.76)] p-5 md:p-6 flex flex-col justify-between flex-1 relative overflow-hidden">
            {/* Tactical Grid Overlay & Corner Brackets */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(142,150,140,0.025)_1px,transparent_1px)] bg-[size:100%_12px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40 pointer-events-none" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent/40 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent/40 pointer-events-none" />

            <div className="flex justify-between items-center mb-4 z-10">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                ПУТЬ РАЗВИТИЯ // TIMELINE_FLOW
              </p>
              <div className="font-mono text-[8px] text-titanium flex items-center gap-1.5 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                TELEMETRY ACTIVE
              </div>
            </div>

            {/* Vertical Stepper Container */}
            <div className="relative flex-1 flex flex-col justify-between py-1.5 pl-2 pr-1">
              
              {/* Vertical line background */}
              <div className="absolute top-2 bottom-2 left-[53px] w-[1px] bg-border-subtle/30 pointer-events-none" />
              
              {/* Colored progress line leading to active current year (2026) */}
              <div className="absolute top-2 bottom-2 left-[53px] w-[1px] bg-gradient-to-b from-accent/10 via-accent/40 to-accent pointer-events-none" />
              
              {/* Vertical scanner laser sweep point */}
              <div className="absolute left-[50px] w-2 h-2 -ml-0.5 rounded-full bg-accent animate-laser-sweep-vertical pointer-events-none shadow-[0_0_8px_#b7ff3c]" />

              {timelineNodes.map((node, idx) => {
                const isHoveredNode = activeNode === idx;
                return (
                  <div 
                    key={idx} 
                    className="flex items-center text-left relative group min-h-[36px] outline-none focus-visible:ring-1 focus-visible:ring-accent rounded transition-all duration-200" 
                    tabIndex={0}
                    onMouseEnter={() => setActiveNode(idx)}
                    onMouseLeave={() => setActiveNode(null)}
                    aria-label={`Год ${node.year}: ${node.label1}, ${node.label2}`}
                  >
                    
                    {/* Year on the left (IBM Plex Mono typography) */}
                    <span className={`font-mono text-[11px] font-bold w-[38px] text-right pr-2 transition-colors duration-200 select-none ${
                      node.isCurrent 
                        ? "text-accent drop-shadow-[0_0_5px_rgba(183,255,60,0.6)]" 
                        : isHoveredNode
                          ? "text-accent"
                          : "text-titanium"
                    }`}>
                      {node.year}
                    </span>
                    
                    {/* Interactive Dot/HUD reticle in the middle */}
                    <div className="w-[30px] flex justify-center z-10">
                      {node.isCurrent ? (
                        /* Currently Active Rotating HUD Crosshair node */
                        <div className="relative w-6 h-6 flex items-center justify-center">
                          <svg className="absolute w-5 h-5 animate-ring-spin-ccw text-accent" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                          </svg>
                          <div className="absolute w-3.5 h-3.5 rounded-full border border-accent/80 animate-ping opacity-75" />
                          <div className="h-2 w-2 rounded-full bg-accent border border-void-black z-10 shadow-[0_0_8px_#b7ff3c]" />
                        </div>
                      ) : (
                        /* Inactive / Targetable Node */
                        <div className="relative w-5 h-5 flex items-center justify-center">
                          <div className={`absolute inset-0 border border-accent/60 rounded scale-75 opacity-0 transition-all duration-300 ${
                            isHoveredNode ? "opacity-100 scale-100 rotate-45" : ""
                          }`} />
                          <div className={`h-2 w-2 rounded-full border transition-all duration-300 ${
                            isHoveredNode 
                              ? "bg-accent/40 border-accent scale-110" 
                              : "bg-[rgba(18,24,22,0.96)] border-border-subtle"
                          }`} />
                        </div>
                      )}
                    </div>
                    
                    {/* Description on the right - flowing horizontally with ample space */}
                    <div className="flex-1 pl-3.5 leading-tight flex items-baseline gap-2 flex-wrap">
                      <span className={`text-[11px] font-bold transition-colors ${
                        node.isCurrent 
                          ? "text-accent" 
                          : isHoveredNode
                            ? "text-accent"
                            : "text-[rgba(214,207,191,0.95)]"
                      }`}>
                        {node.label1}
                      </span>
                      <span className="text-[9px] text-titanium/40 font-mono select-none">•</span>
                      <span className={`text-[10px] transition-colors duration-200 ${
                        node.isCurrent
                          ? "text-foreground font-medium"
                          : isHoveredNode
                            ? "text-[rgba(214,207,191,0.85)]"
                            : "text-[rgba(214,207,191,0.62)]"
                      }`}>
                        {node.label2}
                      </span>

                      {/* Technical coordinates tag revealed on hover */}
                      <span className={`font-mono text-[7px] text-accent/50 ml-auto pr-1 transition-opacity duration-300 pointer-events-none select-none ${
                        isHoveredNode ? "opacity-100" : "opacity-0"
                      }`}>
                        {node.coords}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: Deep Visionary Quote (Cancer Cure Mission) */}
          <div className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.32)] p-6 relative overflow-hidden flex flex-col justify-center flex-1 min-h-[160px]">
            <div className="absolute top-4 left-4 text-accent/10 pointer-events-none">
              <Quote size={40} />
            </div>
            
            <blockquote className="relative z-10 text-xs sm:text-[13px] leading-6 text-[rgba(214,207,191,0.85)] pl-6 border-l-2 border-accent/40 italic">
              «Генерация медиафайлов — это лишь эффектная демонстрация. Настоящая сила ИИ ещё не раскрыта. Я верю, что его главная миссия — спасать жизни и побеждать болезни. Моя долгосрочная цель — внести вклад в разработку ИИ-архитектур для поиска лекарства от онкологии. Технологии должны служить человечеству на самом глубоком уровне.»
            </blockquote>
            
            <div className="mt-3 pl-6 text-right font-mono text-[9px] uppercase tracking-wider text-titanium">
              — Никита Кизевич / <span className="text-accent font-semibold">AI ARCHITECT</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
