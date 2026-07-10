"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Maximize2, Radar, ExternalLink, Volume2, VolumeX } from "lucide-react";
import { flagshipProofCases } from "@/lib/proof-lab";
import { Lightbox } from "@/components/lightbox";
import { ScrambleText } from "@/components/scramble-text";

// Web Audio API Synthesizers
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!audioCtx) {
      const WebkitContext = (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new (window.AudioContext || WebkitContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

function playTick(isMuted: boolean) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(1600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.03);
    
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.03);
  } catch {
    // Ignore context errors
  }
}

function playBeep(isMuted: boolean) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(750, now);
    osc.frequency.exponentialRampToValueAtTime(980, now + 0.07);
    
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.08);
  } catch {
    // Ignore context errors
  }
}

export function ProofScanner() {
  const [scannerActiveId, setScannerActiveId] = useState(flagshipProofCases[0].id);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [transformStyle, setTransformStyle] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  
  const [isMuted, setIsMuted] = useState(true);
  const [isScanningSweep, setIsScanningSweep] = useState(false);
  const [mouseYPercent, setMouseYPercent] = useState<number | null>(null);

  // Sync mute state with localStorage safely after mounting to avoid hydration mismatch
  useEffect(() => {
    const saved = localStorage.getItem("proof-scanner-muted");
    if (saved !== null) {
      const muted = saved === "true";
      setTimeout(() => {
        setIsMuted(muted);
      }, 0);
    }
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      localStorage.setItem("proof-scanner-muted", String(next));
      // Unlock audio context on interaction
      getAudioContext();
      return next;
    });
  };

  const activeCase = useMemo(
    () => flagshipProofCases.find((item) => item.id === scannerActiveId) ?? flagshipProofCases[0],
    [scannerActiveId],
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt angles based on cursor distance from center (max 12 degrees)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.14, 1.14, 1.14)`
    );

    // Track vertical coordinate for laser line tracking
    const yPercent = (y / rect.height) * 100;
    setMouseYPercent(yPercent);
  };

  const handleMouseLeave = () => {
    // Smoothly spring back to normal scale and tilt
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setMouseYPercent(null);
  };

  const handleTabClick = (id: string) => {
    if (id === scannerActiveId) return;
    setScannerActiveId(id);
    playBeep(isMuted);
    setIsScanningSweep(true);
  };

  const handleTabHover = () => {
    playTick(isMuted);
  };

  const laserStyle = useMemo<React.CSSProperties>(() => {
    if (mouseYPercent !== null) {
      return {
        top: `${mouseYPercent}%`,
        transform: "translateY(-50%)",
        animation: "none",
      };
    }
    return {};
  }, [mouseYPercent]);

  return (
    <section
      id="proof-scanner"
      data-proof-scanner="true"
      data-motion-note="document check motion"
      data-field-contract="what was done / tools / result"
      data-upgrade-track="materials to add later"
      className="rounded-shell border border-border-subtle bg-[linear-gradient(145deg,rgba(183,255,60,0.08),rgba(18,24,22,0.84)_38%,rgba(10,13,12,0.96))] p-5 md:p-7"
    >
      {/* Top Part: Header Info */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Radar size={18} className="text-accent" />
            <p className="signal-label text-accent">С чего начать</p>
          </div>

          {/* Audio Feedback Controller */}
          <button
            type="button"
            onClick={toggleMute}
            className="flex items-center gap-1.5 rounded border border-border-subtle bg-panel-soft/40 px-2 py-1 font-mono text-[9.5px] uppercase tracking-wider text-titanium hover:border-accent hover:text-accent transition-colors duration-180 cursor-pointer"
            aria-label={isMuted ? "Включить звук" : "Выключить звук"}
          >
            {isMuted ? (
              <>
                <VolumeX size={10} />
                <span>AUDIO: OFF</span>
              </>
            ) : (
              <>
                <Volume2 size={10} className="text-accent animate-pulse" />
                <span className="text-accent">AUDIO: ON</span>
              </>
            )}
          </button>
        </div>
        <div className="space-y-2.5">
          <h2 className="text-2xl font-semibold tracking-normal text-foreground md:text-3xl">
            Откройте эти работы первыми.
          </h2>
          <p className="text-xs leading-6 text-[rgba(214,207,191,0.76)] max-w-2xl">
            В каждой карточке видно: где участвовал Никита, что получилось и какой документ
            или ссылка это подтверждает.
          </p>
        </div>
      </div>

      {/* Tabs Row: Horizontal Selector Grid (1x4 on desktop, 2x2 on mobile/tablet) */}
      <div
        role="radiogroup"
        aria-label="Главная работа"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-6"
      >
        {flagshipProofCases.map((item) => (
          <button
            key={item.id}
            type="button"
            role="radio"
            onClick={() => handleTabClick(item.id)}
            onMouseEnter={handleTabHover}
            aria-checked={scannerActiveId === item.id}
            className={`min-h-[84px] rounded-panel border px-3.5 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent cursor-pointer ${
              scannerActiveId === item.id
                ? "border-accent bg-accent/10"
                : "border-border-subtle bg-[rgba(10,13,12,0.28)] hover:border-accent/40"
            }`}
          >
            <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-titanium">
              {item.eyebrow}
            </span>
            <span className="mt-1.5 block text-sm font-semibold leading-5 text-foreground">
              {item.shortTitle}
            </span>
            <span className="mt-1 block text-[11px] leading-4 text-[rgba(214,207,191,0.6)] line-clamp-1">
              {item.role}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Part: 2-Column Split (Left: Wide Visual Showcase, Right: Details Panel) */}
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch mt-6">
        {/* Left Column: Document Showcase with 3D Parallax Tilt Effect */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => playTick(isMuted)}
          className="signal-frame signal-grid-panel relative overflow-hidden rounded-shell p-6 flex items-center justify-center min-h-[380px] bg-gradient-to-br from-surface-muted/50 to-background/90 border border-border-subtle group cursor-zoom-in"
          style={{ perspective: "1000px" }}
        >
          {/* Technical grid mask */}
          <div className="absolute inset-0 signal-grid-panel opacity-25 pointer-events-none" />

          {/* CRT Screen Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.06] crt-overlay mix-blend-overlay" />

          {/* Holographic Radar Pulse Behind the Document */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
            <div className="absolute w-[260px] h-[260px] rounded-full border border-accent/15 animate-[radar-pulse_4s_cubic-bezier(0.1,0.8,0.3,1)_infinite] z-0" />
            <div className="absolute w-[440px] h-[440px] rounded-full border border-accent/10 animate-[radar-pulse_4s_cubic-bezier(0.1,0.8,0.3,1)_infinite_1300ms] z-0" />
            <div className="absolute w-[620px] h-[620px] rounded-full border border-accent/5 animate-[radar-pulse_4s_cubic-bezier(0.1,0.8,0.3,1)_infinite_2600ms] z-0" />
          </div>

          {/* 3D Tilting Card Wrapper */}
          <div
            className="relative z-10 flex items-center justify-center transition-transform duration-200 ease-out"
            style={{
              transform: transformStyle,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <Image
              src={activeCase.image}
              alt={`${activeCase.shortTitle}: превью документа или работы`}
              width={600}
              height={450}
              className="object-contain max-h-[330px] w-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
              style={{ transform: "translateZ(30px)" }}
              priority
            />
          </div>

          {/* Ambient vignettes */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(10,13,12,0.3))]" />

          {/* Zoom Button Trigger */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus-visible:opacity-100 z-20"
            aria-label="Открыть документ в полноэкранном режиме"
          >
            <div className="flex items-center gap-2 rounded-panel border border-accent bg-background/90 px-4 py-2 text-xs font-mono tracking-wider text-accent transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
              <Maximize2 size={12} />
              <span>ПОЛНЫЙ ЭКРАН</span>
            </div>
          </button>

          {/* Active Result Badge */}
          <div className="absolute left-4 top-4 rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.85)] px-3 py-1.5 z-10">
            <ScrambleText
              key={activeCase.id}
              text={activeCase.result}
              className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent"
            />
          </div>

          {/* Technical ID badge in showcase */}
          <div className="absolute right-4 bottom-4 font-mono text-[9px] text-titanium uppercase tracking-[0.12em] bg-[rgba(10,13,12,0.6)] px-2 py-1 rounded border border-border-subtle z-10">
            ID: {activeCase.id.toUpperCase()}
          </div>

          {/* Laser Scanning Line */}
          <span
            aria-hidden="true"
            onAnimationEnd={() => setIsScanningSweep(false)}
            style={laserStyle}
            className={`absolute inset-x-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-accent),transparent)] opacity-70 pointer-events-none z-10 ${
              mouseYPercent !== null
                ? ""
                : isScanningSweep
                ? "top-1/2 animate-[proof-scan-sweep_1000ms_ease-in-out_forwards]"
                : "top-1/2 animate-[proof-scan_6000ms_ease-in-out_infinite]"
            }`}
          />
        </div>

        {/* Right Column: Project Details Panel */}
        <article className="signal-frame rounded-shell bg-surface/80 backdrop-blur-md p-5 md:p-6 flex flex-col justify-between border border-border-subtle">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <ScrambleText
                  key={activeCase.id}
                  text={activeCase.year}
                  className="signal-label text-accent"
                />
                <ScrambleText
                  key={activeCase.id}
                  text={activeCase.title}
                  as="h3"
                  className="mt-3 text-2xl font-semibold tracking-normal text-foreground"
                />
              </div>
              <CheckCircle2 size={18} className="text-accent flex-shrink-0" />
            </div>

            {/* Specs List with Verification Link inline */}
            <div className="mt-5 space-y-3.5">
              {[
                ["Роль", activeCase.role],
                ["Стек", activeCase.tools.join(" • ")],
                ["Документ или ссылка", activeCase.evidence],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4 border-b border-border-subtle/30 pb-2.5 last:border-b-0"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium min-w-[120px] shrink-0">
                    {label}
                  </span>
                  <span className="text-xs sm:text-sm leading-6 text-[rgba(214,207,191,0.88)] font-medium">
                    {value}
                  </span>
                </div>
              ))}

              {activeCase.verificationUrl && (
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4 border-t border-border-subtle/30 pt-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent min-w-[120px] shrink-0">
                    Верификация
                  </span>
                  <span className="text-xs sm:text-sm leading-6 text-[rgba(214,207,191,0.88)]">
                    <a
                      href={activeCase.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent hover:underline decoration-accent/30 underline-offset-4 font-semibold"
                    >
                      <span>{activeCase.verificationLabel || "Проверить источник"}</span>
                      <ExternalLink size={12} />
                    </a>
                  </span>
                </div>
              )}
            </div>

            {/* Editorial Accent paragraph */}
            <p className="mt-6 text-xs sm:text-sm leading-6 text-[rgba(214,207,191,0.78)] border-l-2 border-accent/40 pl-4 font-normal">
              {activeCase.outcome}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/portfolio/${activeCase.slug}`}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-panel border border-accent bg-accent/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/15"
            >
              Открыть работу
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/lab"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-panel border border-border-subtle px-4 py-2 text-sm font-medium text-[rgba(214,207,191,0.76)] transition-colors hover:border-accent hover:text-foreground"
            >
              Что еще есть
            </Link>
          </div>
        </article>
      </div>

      {/* Fullscreen Lightbox for Active Case */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={activeCase.image}
        alt={activeCase.title}
        issuer={activeCase.shortTitle}
        date={activeCase.year}
      />
    </section>
  );
}
