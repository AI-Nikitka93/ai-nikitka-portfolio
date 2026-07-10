"use client";

import React, { useRef } from "react";
import { Brain, Cpu, Search, Wrench, Award, Terminal } from "lucide-react";

export const stepsData = [
  {
    id: "idea",
    index: "01",
    icon: Brain
  },
  {
    id: "research",
    index: "02",
    icon: Search
  },
  {
    id: "prototype",
    index: "03",
    icon: Terminal
  },
  {
    id: "train",
    index: "04",
    icon: Cpu
  },
  {
    id: "deploy",
    index: "05",
    icon: Wrench
  },
  {
    id: "impact",
    index: "06",
    icon: Award
  }
] as const;

const translations = {
  ru: {
    idea: { title: "ИДЕЯ", desc: "Поиск гипотезы и концепта проекта" },
    research: { title: "АНАЛИЗ", desc: "Анализ аналогов и решений" },
    prototype: { title: "ПРОМПТИНГ", desc: "Подбор промптов и ИИ-архитектуры" },
    train: { title: "РАЗРАБОТКА", desc: "Запуск агентов, контроль и правки" },
    deploy: { title: "ТЕСТИРОВАНИЕ", desc: "Длительная отладка и полировка" },
    impact: { title: "ДЕМО-РЕЛИЗ", desc: "Публикация кейса в портфолио" }
  },
  en: {
    idea: { title: "IDEA", desc: "Concept generation & project hypothesis" },
    research: { title: "ANALYSIS", desc: "Analyzing competitors and solutions" },
    prototype: { title: "PROMPTING", desc: "Prompt assembly & AI structuring" },
    train: { title: "DEVELOPMENT", desc: "Agent orchestration, audit & edits" },
    deploy: { title: "TESTING", desc: "Deep debugging & manual verification" },
    impact: { title: "DEMO RELEASE", desc: "Publishing reference code & portfolio" }
  }
} as const;

type StepId = typeof stepsData[number]["id"];

export type LaboratoryWorkflowProps = {
  lang?: "ru" | "en";
};

export function LaboratoryWorkflow({ lang = "ru" }: LaboratoryWorkflowProps) {
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>, idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;

    // Skip tilt effect on smaller touch-screens for better mobile usability
    if (window.innerWidth < 1024) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // cursor x inside card
    const y = e.clientY - rect.top;  // cursor y inside card
    
    // Normalize coordinates between -0.5 and 0.5
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    
    // Calculate tilt angles (limit to a subtle 8 degrees max tilt)
    const tiltX = normY * 8;
    const tiltY = -normX * 8;
    
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = "transform 0.08s ease-out";

    // Dynamic light glare gradient reflection
    const glare = card.querySelector(".card-glare") as HTMLDivElement;
    if (glare) {
      glare.style.background = `radial-gradient(circle 120px at ${x}px ${y}px, rgba(183,255,60,0.12), transparent 80%)`;
    }
  };

  const handleMouseLeaveCard = (idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    
    // Smoothly ease back to zero-tilt layout
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    card.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
    
    const glare = card.querySelector(".card-glare") as HTMLDivElement;
    if (glare) {
      glare.style.background = "transparent";
    }
  };

  return (
    <div className="relative mt-8 select-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes laser-slide {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        .hud-corner-tl, .hud-corner-tr, .hud-corner-bl, .hud-corner-br {
          position: absolute;
          width: 5px;
          height: 5px;
          opacity: 0.15;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          z-index: 20;
        }
        .hud-corner-tl {
          top: 6px;
          left: 6px;
          border-top: 1px solid var(--color-accent);
          border-left: 1px solid var(--color-accent);
        }
        .hud-corner-tr {
          top: 6px;
          right: 6px;
          border-top: 1px solid var(--color-accent);
          border-right: 1px solid var(--color-accent);
        }
        .hud-corner-bl {
          bottom: 6px;
          left: 6px;
          border-bottom: 1px solid var(--color-accent);
          border-left: 1px solid var(--color-accent);
        }
        .hud-corner-br {
          bottom: 6px;
          right: 6px;
          border-bottom: 1px solid var(--color-accent);
          border-right: 1px solid var(--color-accent);
        }
        
        .group:hover .hud-corner-tl, .group:focus-within .hud-corner-tl { top: -1px; left: -1px; opacity: 0.95; filter: drop-shadow(0 0 2px var(--color-accent)); }
        .group:hover .hud-corner-tr, .group:focus-within .hud-corner-tr { top: -1px; right: -1px; opacity: 0.95; filter: drop-shadow(0 0 2px var(--color-accent)); }
        .group:hover .hud-corner-bl, .group:focus-within .hud-corner-bl { bottom: -1px; left: -1px; opacity: 0.95; filter: drop-shadow(0 0 2px var(--color-accent)); }
        .group:hover .hud-corner-br, .group:focus-within .hud-corner-br { bottom: -1px; right: -1px; opacity: 0.95; filter: drop-shadow(0 0 2px var(--color-accent)); }
      `}} />

      <ol 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
        aria-label="Лабораторный воркфлоу (этапы работы)"
      >
        {stepsData.map((step, idx) => {
          const Icon = step.icon;
          const text = translations[lang][step.id as StepId];
          
          return (
            <li
              key={step.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              tabIndex={0}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeaveCard(idx)}
              className="group relative rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.32)] p-4 flex flex-col justify-between hover:border-accent/40 focus-visible:border-accent/40 focus-visible:ring-1 focus-visible:ring-accent/30 focus-visible:outline-none transition-all duration-300"
            >
              {/* Glassmorphism Dynamic Glare Reflection overlay */}
              <div className="card-glare absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-panel" />

              {/* HUD Target Corners */}
              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent font-semibold">
                    {step.index}
                  </span>
                  <Icon size={16} className="text-titanium group-hover:text-accent group-focus-visible:text-accent group-hover:rotate-[360deg] transition-all duration-700 ease-in-out" />
                </div>
                <h4 className="mt-3 text-sm font-semibold tracking-wider text-foreground">
                  {text?.title || step.id.toUpperCase()}
                </h4>
              </div>
              
              <p className="mt-2 text-[11px] leading-5 text-[rgba(214,207,191,0.64)] relative z-10">
                {text?.desc || ""}
              </p>

              {/* Mobile connector: 2-column grid layout (visible < md on even indices) */}
              {idx % 2 === 0 && idx < 5 && (
                <div className="absolute top-1/2 left-[calc(100%+0.375rem)] -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none block md:hidden">
                  <svg
                    className="w-5 h-5 text-accent/20 group-hover:text-accent/60 group-focus-visible:text-accent/60 transition-colors duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              )}

              {/* Tablet connector: 3-column grid layout (visible md to lg when index % 3 < 2) */}
              {idx % 3 < 2 && idx < 5 && (
                <div className="absolute top-1/2 left-[calc(100%+0.375rem)] -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none hidden md:block lg:hidden">
                  <svg
                    className="w-5 h-5 text-accent/20 group-hover:text-accent/60 group-focus-visible:text-accent/60 transition-colors duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              )}

              {/* Desktop connector: 6-column grid layout (visible >= lg on all except last) */}
              {idx < 5 && (
                <div className="absolute top-1/2 left-[calc(100%+0.375rem)] -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none hidden lg:flex items-center justify-center w-[24px] h-6 overflow-visible">
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" className="overflow-visible">
                    {/* Background path */}
                    <path
                      d="M0 12h24"
                      stroke="var(--color-border)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      className="opacity-20"
                    />
                    {/* Active moving laser pulse */}
                    <path
                      d="M0 12h24"
                      stroke="var(--color-accent)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="6 18"
                      className="stroke-accent"
                      style={{
                        filter: "drop-shadow(0 0 3px var(--color-accent))",
                        animation: "laser-slide 1.2s linear infinite",
                      }}
                    />
                  </svg>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
