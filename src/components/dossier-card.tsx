"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { getEvidencePresentation, type PortfolioFrontmatter } from "@/lib/proof-archive";
import { Lightbox } from "@/components/lightbox";

type DossierCardProps = {
  slug: string;
  frontmatter: PortfolioFrontmatter & {
    orientation?: "portrait" | "landscape";
    aspectRatio?: string;
  };
};

function localizeDossierType(type: string | undefined) {
  if (type === "Signal Marker") return "Основная работа";
  if (type === "Proof Artifact") return "Подтвержденный результат";
  return type || "Работа";
}

export function DossierCard({ slug, frontmatter }: DossierCardProps) {
  const href = `/portfolio/${slug}`;
  const isTextVariant = frontmatter.variant === "text";
  const isPortrait = frontmatter.orientation === "portrait";
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Relative coordinates from -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setCoords({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Dynamic style for 3D tilt
  const tiltStyle = !prefersReducedMotion && isHovered ? {
    transform: `perspective(1000px) rotateX(${coords.y * -10}deg) rotateY(${coords.x * 10}deg) translateY(-4px)`,
    transition: "transform 100ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease",
    boxShadow: `0 20px 40px rgba(183, 255, 60, ${Math.abs(coords.x) * 0.08})`,
  } : {
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
    transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease",
  };

  // Dynamic style for the reflective glare highlight
  const glareStyle = !prefersReducedMotion && isHovered ? {
    background: `radial-gradient(circle at ${(coords.x + 0.5) * 100}% ${(coords.y + 0.5) * 100}%, rgba(183, 255, 60, 0.06) 0%, transparent 60%)`,
    transition: "background 50ms linear",
  } : {
    background: "transparent",
    transition: "background 500ms ease",
  };

  return (
    <>
      <Link
        href={href}
        className="group block focus-visible:outline-none"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={tiltStyle}
          className="relative rounded-shell"
        >
          <article
            className={`relative overflow-hidden rounded-shell border border-border-subtle bg-surface/90 p-4 transition-colors duration-300 group-hover:border-accent/40 group-focus-visible:border-accent md:p-5 ${
              isTextVariant 
                ? "min-h-[24rem]" 
                : isPortrait 
                  ? "min-h-[38rem]" 
                  : "min-h-[32rem]"
            }`}
          >
            {/* Glare overlay layer */}
            <div 
              className="pointer-events-none absolute inset-0 z-10 rounded-shell" 
              style={glareStyle} 
            />

            {/* Sequential 4-edge border-glow draw spans */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-px w-0 bg-accent opacity-90 transition-[width,opacity] duration-[250ms] ease-out group-hover:w-full group-focus-visible:w-full"
            />
            <span
              aria-hidden="true"
              className="absolute right-0 top-0 h-0 w-px bg-accent opacity-0 transition-[height,opacity] delay-[150ms] duration-[200ms] ease-out group-hover:h-full group-hover:opacity-100 group-focus-visible:h-full group-focus-visible:opacity-100"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-px w-0 bg-accent opacity-0 transition-[width,opacity] delay-[300ms] duration-[250ms] ease-out group-hover:w-full group-hover:opacity-100 group-focus-visible:w-full group-focus-visible:opacity-100"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-0 w-px bg-accent opacity-0 transition-[height,opacity] delay-[450ms] duration-[200ms] ease-out group-hover:h-full group-hover:opacity-100 group-focus-visible:h-full group-focus-visible:opacity-100"
            />

            <div className="flex h-full flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-titanium">
                    {frontmatter.dossierId}
                  </p>
                  <span className="inline-flex border border-border-subtle px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(214,207,191,0.76)]">
                    {localizeDossierType(frontmatter.dossierType)}
                  </span>
                </div>

                <span className="inline-flex h-10 w-10 items-center justify-center rounded-panel border border-border-subtle text-titanium transition-colors duration-300 group-hover:border-accent group-hover:text-accent group-focus-visible:border-accent group-focus-visible:text-accent">
                  <ArrowUpRight size={16} />
                </span>
              </div>

              {isTextVariant ? (
                <TextBackedPanel frontmatter={frontmatter} />
              ) : (
                <ImageBackedPanel 
                  frontmatter={frontmatter} 
                  onZoomClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                />
              )}

              <div className="mt-auto space-y-3">
                <h3 className="text-xl font-semibold tracking-normal text-foreground md:text-2xl">
                  {frontmatter.title}
                </h3>
                <div className="grid gap-3 text-sm text-[rgba(214,207,191,0.76)] sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-titanium">
                      Где подтверждается
                    </p>
                    <p className="mt-1">{frontmatter.issuer}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-titanium">
                      Дата
                    </p>
                    <p className="mt-1">{frontmatter.date || frontmatter.year || "дата не указана"}</p>
                  </div>
                </div>

                {!isTextVariant && frontmatter.signalStrength?.length ? (
                  <div className="grid gap-2 border-t border-border-subtle pt-3">
                    {frontmatter.signalStrength.slice(0, 2).map((item, index) => (
                      <div
                        key={item}
                        className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 text-sm text-[rgba(214,207,191,0.72)]"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="leading-7">{item}</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                <p className="text-sm leading-7 text-[rgba(214,207,191,0.78)]">
                  {frontmatter.archiveNote}
                </p>
              </div>
            </div>
          </article>
        </div>
      </Link>

      {/* Accessible Fullscreen Lightbox */}
      {!isTextVariant && frontmatter.image && (
        <Lightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          src={frontmatter.image}
          alt={frontmatter.title || ""}
          issuer={frontmatter.issuer}
          date={frontmatter.date || frontmatter.year}
        />
      )}
    </>
  );
}

function ImageBackedPanel({
  frontmatter,
  onZoomClick,
}: {
  frontmatter: PortfolioFrontmatter & {
    orientation?: "portrait" | "landscape";
  };
  onZoomClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const evidence = getEvidencePresentation(
    frontmatter.evidenceStatus,
    frontmatter.publicEvidenceLevel,
  );
  
  const isPortrait = frontmatter.orientation === "portrait";

  return (
    <div 
      className={`relative overflow-hidden rounded-panel border border-border-subtle bg-panel/40 backdrop-blur-sm transition-all duration-300 group-hover:border-accent/20 ${
        isPortrait ? "aspect-[3/4] w-full" : "aspect-[1.58/1] w-full"
      }`}
    >
      {/* Dark vignette backdrop gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,27,25,0.4)_0%,rgba(10,13,12,0.9)_100%)] z-0" />
      
      {frontmatter.image ? (
        <div className="relative h-full w-full p-3 flex items-center justify-center z-10">
          <Image
            src={frontmatter.image}
            alt={frontmatter.title || frontmatter.dossierId}
            width={1200}
            height={isPortrait ? 1600 : 800}
            sizes="(min-width: 1280px) 480px, (min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
            priority={frontmatter.order === 1}
          />
          
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,12,0.05)_0%,rgba(10,13,12,0.4)_100%)] z-20" />
          
          {/* Zoom Overlay Trigger */}
          <button
            type="button"
            onClick={onZoomClick}
            aria-label="Открыть документ в полноэкранном режиме"
            className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus-visible:opacity-100 z-30 group-focus-visible:opacity-100"
          >
            <div className="flex items-center gap-2 rounded-panel border border-accent bg-background/90 px-4 py-2 text-xs font-mono tracking-wider text-accent transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
              <Maximize2 size={12} />
              <span>ПОЛНЫЙ ЭКРАН</span>
            </div>
          </button>
        </div>
      ) : (
        <div className="h-full w-full bg-surface-strong flex items-center justify-center">
          <span className="font-mono text-xs text-titanium">нет файла</span>
        </div>
      )}

      {/* Badges Overlays */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 z-20 pointer-events-none">
        <div className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.85)] px-2.5 py-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
            {frontmatter.metricLabel || "документ"}
          </span>
        </div>
        <div className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.85)] px-2.5 py-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-titanium">
            {isPortrait ? "вертикальный" : "горизонтальный"}
          </span>
        </div>
      </div>
      
      {/* Footer Info Overlay */}
      <div className="absolute inset-x-0 bottom-0 grid gap-2 p-4 md:grid-cols-[1fr_auto] md:items-end z-20 pointer-events-none">
        <div className="space-y-1">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
            Подтверждение
          </p>
          <p className="text-xs text-foreground bg-[rgba(10,13,12,0.7)] px-2 py-1 rounded-[4px] inline-block border border-border-subtle">
            {evidence.shortLabel}
          </p>
        </div>
        <div className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.9)] p-2 md:min-w-[120px] text-center">
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-titanium">
            Итог
          </p>
          <p className="mt-1 font-mono text-lg leading-none tracking-normal text-foreground">
            {frontmatter.metricValue || "есть"}
          </p>
        </div>
      </div>
    </div>
  );
}

function TextBackedPanel({
  frontmatter,
}: {
  frontmatter: PortfolioFrontmatter;
}) {
  const evidence = getEvidencePresentation(
    frontmatter.evidenceStatus,
    frontmatter.publicEvidenceLevel,
  );

  return (
    <div className="relative flex min-h-[16rem] flex-col justify-between overflow-hidden rounded-panel border border-border-subtle bg-surface-muted p-4 md:min-h-[17rem] md:p-5">
      <div className="absolute inset-y-0 right-6 hidden w-px bg-[linear-gradient(180deg,rgba(142,150,140,0),rgba(142,150,140,0.4),rgba(142,150,140,0))] md:block" />
      <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(183,255,60,0.12),transparent_36%)]" />
      <div>
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-titanium">
            {frontmatter.metricLabel || "результат"}
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
            цифра
          </span>
        </div>
        <p
          className="mt-5 font-mono text-5xl font-medium leading-none tracking-normal text-foreground transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent sm:text-6xl"
        >
          {frontmatter.metricValue}
        </p>
        {frontmatter.metricSecondary ? (
          <p className="mt-3 font-mono text-sm uppercase tracking-[0.18em] text-[rgba(214,207,191,0.74)]">
            {frontmatter.metricSecondary}
          </p>
        ) : null}
      </div>

      <div className="space-y-4">
        <div className="metric-rule h-px w-[24%] transition-[width] duration-300 group-hover:w-full group-focus-visible:w-full" />
        {frontmatter.signalStrength?.length ? (
          <div className="grid gap-2">
            {frontmatter.signalStrength.slice(0, 2).map((item, index) => (
              <div
                key={item}
                className="grid grid-cols-[36px_minmax(0,1fr)] gap-3 text-sm text-[rgba(214,207,191,0.72)]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="leading-7">{item}</p>
              </div>
            ))}
          </div>
        ) : null}
        <div className="grid grid-cols-2 gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
          <span>результат</span>
          <span className="text-right">{evidence.shortLabel}</span>
        </div>
      </div>
    </div>
  );
}
