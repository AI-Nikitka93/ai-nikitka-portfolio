"use client";

import React from "react";
import { Activity, Cpu } from "lucide-react";
import { ScrambleText } from "@/components/scramble-text";

// 1. Data Types
type DossierItem = {
  key: string;
  value: string;
};

type SkillItem = {
  name: string;
  pct: number;
};

// 2. Dossier Panel
type DossierPanelProps = {
  dossierId?: string;
  revDate?: string;
  items: DossierItem[];
  skills: SkillItem[];
};

export function DossierPanel({
  dossierId = "SYS.DOSSIER // CONFIDENTIAL",
  revDate = "REV_09.04.2026",
  items,
  skills,
}: DossierPanelProps) {
  return (
    <div className="signal-frame rounded-shell p-6 relative overflow-hidden flex flex-col justify-between min-h-full">
      {/* CSS Animation injection */}
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

      {/* Decorative HUD corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent/40" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent/40" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent/40" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent/40" />

      <div>
        {/* Header Block */}
        <div
          className="dossier-animate-item flex items-center justify-between border-b border-border-subtle pb-4"
          style={{ animationDelay: "0ms" }}
        >
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-accent animate-pulse" />
            <p className="signal-label text-accent font-semibold">
              <ScrambleText text={dossierId} delay={100} />
            </p>
          </div>
          <div className="font-mono text-[9px] text-titanium tracking-widest">
            {revDate}
          </div>
        </div>

        {/* Dossier Description List */}
        <dl className="mt-6 space-y-5">
          {items.map((item, idx) => (
            <div
              key={item.key}
              className="dossier-animate-item border-b border-border-subtle/40 pb-3 last:border-b-0"
              style={{ animationDelay: `${(idx + 1) * 60}ms` }}
            >
              <dt className="font-mono text-[10px] tracking-[0.24em] text-titanium uppercase">
                {item.key}
              </dt>
              <dd className="mt-1.5 text-base font-medium text-foreground">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Skills / Integration Level */}
      <div
        className="dossier-animate-item mt-8 pt-4 border-t border-border-subtle"
        style={{ animationDelay: `${(items.length + 1) * 60}ms` }}
      >
        <p className="font-mono text-[10px] tracking-[0.2%e] text-titanium uppercase">
          SYS.INTEGRATION_LEVEL
        </p>
        <div className="mt-3 space-y-3">
          {skills.map((skill, idx) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex justify-between font-mono text-[9px]">
                <span className="text-foreground">{skill.name}</span>
                <span className="text-accent">{skill.pct}%</span>
              </div>
              <div className="h-1 bg-surface-muted rounded-full overflow-hidden border border-border-subtle">
                <div
                  className="dossier-skill-bar h-full bg-accent rounded-full"
                  style={{
                    width: `${skill.pct}%`,
                    animationDelay: `${(items.length + 2) * 60 + idx * 100}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 3. Manifest Panel
type ManifestPanelProps = {
  subtitle?: string;
  title?: string;
  paragraphs: string[];
};

export function ManifestPanel({
  subtitle = "Философия и инженерный подход",
  title = "Манифест автора: философия и принципы",
  paragraphs,
}: ManifestPanelProps) {
  return (
    <div className="signal-frame signal-grid-panel interactive-surface rounded-shell p-6 md:p-7 relative min-h-full">
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

      {/* Grid Scanline Overlay (CSS Anim) */}
      <div className="card-scanline-container">
        <div className="card-scanline-grid" />
        <div className="card-scanline-line" />
      </div>

      {/* Subtitle Header */}
      <div
        className="dossier-animate-item flex items-center gap-2"
        style={{ animationDelay: "50ms" }}
      >
        <Cpu size={14} className="text-accent" />
        <p className="signal-label text-accent">{subtitle}</p>
      </div>

      {/* Main Title */}
      <h2
        className="dossier-animate-item mt-4 text-xl sm:text-2xl lg:text-[1.75rem] font-semibold tracking-normal text-foreground"
        style={{ animationDelay: "120ms" }}
      >
        {title}
      </h2>

      {/* Manifest Paragraphs */}
      <div className="mt-4 space-y-4">
        {paragraphs.map((text, idx) => {
          const isLast = idx === paragraphs.length - 1;
          return (
            <p
              key={idx}
              className={`dossier-animate-item text-sm leading-8 text-[rgba(214,207,191,0.78)] ${
                isLast
                  ? "border-t border-border-subtle/30 pt-4 italic text-[rgba(214,207,191,0.85)]"
                  : idx === 0
                  ? "text-[rgba(214,207,191,0.82)]"
                  : ""
              }`}
              style={{ animationDelay: `${200 + idx * 80}ms` }}
            >
              {text}
            </p>
          );
        })}
      </div>
    </div>
  );
}

// 4. Encapsulated Stylesheet (No dependencies)
const animationStyles = `
  @keyframes dossierSlideUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dossier-animate-item {
    opacity: 0;
    animation: dossierSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes dossierSkillFill {
    from {
      width: 0%;
    }
  }

  .dossier-skill-bar {
    animation: dossierSkillFill 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    .dossier-animate-item {
      opacity: 1 !important;
      animation: none !important;
      transform: none !important;
    }
    .dossier-skill-bar {
      animation: none !important;
      width: inherit !important;
    }
  }
`;
