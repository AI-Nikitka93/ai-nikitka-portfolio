"use client";

import React, { useEffect, useState, useRef } from "react";
import { Terminal, Send, MapPin, Activity, ShieldCheck, Cpu, VolumeX, Volume2, X } from "lucide-react";

type AvailabilityStatusProps = {
  mode?: "floating" | "embedded";
};

// Module-level shared audio context to prevent browser limits on active contexts
let sharedAudioCtx: AudioContext | null = null;

function getSharedAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;
  
  try {
    if (!sharedAudioCtx) {
      sharedAudioCtx = new AudioContextClass();
    }
    if (sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume();
    }
    return sharedAudioCtx;
  } catch (e) {
    console.warn("Failed to initialize Web Audio Context:", e);
    return null;
  }
}

export function AvailabilityStatus({ mode = "embedded" }: AvailabilityStatusProps) {
  const [mounted, setMounted] = useState(false);
  const [minskTime, setMinskTime] = useState<Date | null>(null);
  const [isPinged, setIsPinged] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "SYS.LOC: MINSK, BY // NODE:82-2",
    "SYS.TIMEZONE: UTC+3 [MSK]",
    "GATEWAY STATUS: STANDBY",
    "SECURE CORE: SHIELD_ON",
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Load sound preference from localStorage asynchronously to avoid lint warning
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("availability-sound-enabled");
      const timer = setTimeout(() => {
        setSoundEnabled(stored === "true");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newVal = !soundEnabled;
    setSoundEnabled(newVal);
    if (typeof window !== "undefined") {
      localStorage.setItem("availability-sound-enabled", String(newVal));
    }
    if (newVal) {
      // Play a startup chime to confirm audio is enabled
      playChimeSound(true);
    }
  };
  
  // Audio synthesis for click sound (hacker click vibe) using Web Audio API
  const playClickSound = () => {
    if (!soundEnabled) return;
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    
    try {
      const now = ctx.currentTime;
      
      // White noise buffer for the high-frequency transient click
      const bufferSize = ctx.sampleRate * 0.015; // 15ms buffer
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(6500, now);
      noiseFilter.Q.setValueAtTime(4, now);
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.012, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.006);
      
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      
      // Clean resonant metallic ring
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(3800, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.012);
      
      oscGain.gain.setValueAtTime(0.008, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);
      
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      
      noise.start(now);
      osc.start(now);
      
      noise.stop(now + 0.02);
      osc.stop(now + 0.02);
    } catch (e) {
      console.warn("Audio click playback failed:", e);
    }
  };

  const playPingSound = playClickSound;

  // Delicate high-fidelity synthetic hover tick for marquee items
  const playTickSound = () => {
    if (!soundEnabled) return;
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.015);
      
      gain.gain.setValueAtTime(0.003, now); // extremely subtle and elegant
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.015);
    } catch {
      // Ignore
    }
  };

  // Beautiful status chime chord (perfect fifths) with organic LFO vibrato
  const playChimeSound = (force = false) => {
    if (!soundEnabled && !force) return;
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    
    try {
      const now = ctx.currentTime;
      const duration = 0.25;
      
      const frequencies = [880, 1320, 1760];
      const gains = [0.012, 0.006, 0.003];
      
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.018, now + 0.008);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2800, now);
      
      masterGain.connect(filter);
      filter.connect(ctx.destination);
      
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(6.5, now);
        lfoGain.gain.setValueAtTime(3.5, now);
        
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        
        oscGain.gain.setValueAtTime(gains[idx], now);
        
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        
        lfo.start(now);
        osc.start(now);
        
        lfo.stop(now + duration);
        osc.stop(now + duration);
      });
    } catch (e) {
      console.warn("Audio chime playback failed:", e);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    
    // Initial calculation of Minsk (UTC+3) Time
    const updateTime = () => {
      const date = new Date();
      const utc = date.getTime() + date.getTimezoneOffset() * 60000;
      const calculatedMinskTime = new Date(utc + 3600000 * 3);
      setMinskTime(calculatedMinskTime);
      return calculatedMinskTime;
    };

    const initialMinskTime = updateTime();
    const interval = setInterval(updateTime, 1000);
    
    const hour = initialMinskTime.getHours();
    const isOnline = hour >= 12 || hour < 4;

    // Initialize base terminal logs asynchronously to avoid lint warning
    const logsTimer = setTimeout(() => {
      setTerminalLogs([
        "ГЕО: Минск, Беларусь (UTC+3)",
        `СТАТУС: ${isOnline ? "Активен // На связи" : "Вне сети // Отдых"}`,
        `РЕЖИМ: ${isOnline ? "Работает // Активно кодит" : "Автономный режим // Старт в 12:00"}`,
        "СВЯЗЬ: Telegram active // На связи",
      ]);
    }, 0);

    return () => {
      clearTimeout(timer);
      clearTimeout(logsTimer);
      clearInterval(interval);
    };
  }, []);

  // Calculate status based on Nikita's routine: 12:00 to 04:00 (Minsk time) is active, 04:00 to 12:00 is standby
  const getStatusInfo = () => {
    if (!minskTime) return { 
      isOnline: true, 
      label: "АКТИВЕН // НА СВЯЗИ", 
      desc: "РАБОТАЕТ // АКТИВНО КОДИТ" 
    };
    
    const hour = minskTime.getHours();
    const isOnline = hour >= 12 || hour < 4;
    
    return {
      isOnline,
      label: isOnline ? "АКТИВЕН // НА СВЯЗИ" : "ВНЕ СЕТИ // ОТДЫХ",
      desc: isOnline ? "РАБОТАЕТ // АКТИВНО КОДИТ" : "АВТОНОМНЫЙ РЕЖИМ // СТАРТ В 12:00",
    };
  };

  const status = getStatusInfo();

  const handlePing = () => {
    if (isPinged) return;
    setIsPinged(true);
    playPingSound();

    const hour = minskTime ? minskTime.getHours() : 12;
    const isOnline = hour >= 12 || hour < 4;

    // Reset logs with initial entries
    setTerminalLogs([
      "ГЕО: Минск, Беларусь (UTC+3)",
      `СТАТУС: ${isOnline ? "Активен // На связи" : "Вне сети // Отдых"}`,
      `РЕЖИМ: ${isOnline ? "Работает // Активно кодит" : "Автономный режим // Старт в 12:00"}`,
      "СВЯЗЬ: Telegram active // На связи",
      ">> Запуск проверки связи...",
    ]);

    const logsToAdd = [
      ">> Подключение к шлюзу...",
      isOnline 
        ? ">> Статус: Никита в сети // На связи" 
        : ">> Статус: Автоответчик активен // Вне сети",
      isOnline
        ? ">> Процесс: Пишет код и настраивает ИИ"
        : ">> Процесс: Автоматический старт завтра в 12:00",
      ">> Проверка завершена. Связь установлена.",
    ];

    logsToAdd.forEach((log, index) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, log]);
        playPingSound();
        if (index === logsToAdd.length - 1) {
          setIsPinged(false);
        }
      }, (index + 1) * 300);
    });
  };

  const formatTime = (date: Date | null) => {
    if (!date) return "--:--:--";
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  const isFloating = mode === "floating";

  // If we are server-side rendering, return placeholder skeleton to prevent mismatch
  if (!mounted) {
    return (
      <div className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.85)] p-5 animate-pulse min-h-[180px]">
        <div className="h-4 bg-border-subtle rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-border-subtle rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-border-subtle rounded w-3/4"></div>
      </div>
    );
  }

  // Floating Micro Badge / Bubble
  if (isFloating && !isExpanded) {
    return (
      <>
        {/* Style block for animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes glow-pulse-lime {
            0%, 100% { box-shadow: 0 0 6px rgba(183, 255, 60, 0.4), 0 0 14px rgba(183, 255, 60, 0.15); transform: scale(1); }
            50% { box-shadow: 0 0 14px rgba(183, 255, 60, 0.8), 0 0 28px rgba(183, 255, 60, 0.4); transform: scale(1.12); }
          }
          @keyframes glow-pulse-orange {
            0%, 100% { box-shadow: 0 0 6px rgba(255, 106, 42, 0.3), 0 0 12px rgba(255, 106, 42, 0.1); transform: scale(1); }
            50% { box-shadow: 0 0 12px rgba(255, 106, 42, 0.6), 0 0 24px rgba(255, 106, 42, 0.35); transform: scale(1.08); }
          }
          @keyframes ring-expand {
            0% { transform: scale(0.9); opacity: 0.8; }
            100% { transform: scale(2.4); opacity: 0; }
          }
          @keyframes scanline-v {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateY(100%); opacity: 0; }
          }
          @keyframes noise-flicker {
            0%, 100% { opacity: 0.96; }
            50% { opacity: 1; }
            20% { opacity: 0.94; }
            80% { opacity: 0.98; }
          }
        `}} />
        
        <button
          onClick={() => {
            setIsExpanded(true);
            playPingSound();
          }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full border border-border-subtle bg-[rgba(10,13,12,0.85)] p-2 pr-4 backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-[rgba(18,24,22,0.95)] hover:scale-105 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          aria-label="Открыть статус занятости"
        >
          {/* Pulsing Core Indicator */}
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(18,24,22,0.8)] border border-border-subtle">
            <span 
              className="absolute h-4 w-4 rounded-full"
              style={{
                animation: "ring-expand 2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
                backgroundColor: status.isOnline ? "rgba(183, 255, 60, 0.4)" : "rgba(255, 106, 42, 0.3)",
              }}
            />
            <span 
              className="h-2.5 w-2.5 rounded-full z-10"
              style={{
                backgroundColor: status.isOnline ? "#b7ff3c" : "#ff6a2a",
                animation: status.isOnline ? "glow-pulse-lime 1.8s infinite" : "glow-pulse-orange 2.2s infinite",
              }}
            />
          </div>
          
          <div className="flex flex-col text-left">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-titanium leading-none mb-1">
              МИНСК // {formatTime(minskTime).split(":")[0]}:{formatTime(minskTime).split(":")[1]}
            </span>
            <span className={`text-xs font-semibold leading-none ${status.isOnline ? "text-accent" : "text-ember"}`}>
              {status.isOnline ? "НА СВЯЗИ" : "ОТДЫХ"}
            </span>
          </div>
        </button>
      </>
    );
  }

  // If we are embedded in the page, render the horizontal marquee ticker
  if (!isFloating) {
    const time = formatTime(minskTime);
    return (
      <MarqueeTrack 
        isOnline={status.isOnline}
        onPlayChime={playChimeSound}
      >
        <span 
          className="flex items-center gap-2 shrink-0 hover:text-accent transition-colors duration-150 cursor-default py-1"
          onMouseEnter={playTickSound}
        >
          <span className="text-titanium/50">ГЕО:</span>{" "}
          <ScrambleText text="МИНСК, БЕЛАРУСЬ" active={status.isOnline} />
        </span>
        
        <CyberCog className="text-titanium/30" />
        
        <span 
          className="flex items-center gap-2 shrink-0 hover:text-foreground transition-colors duration-150 cursor-default py-1"
          onMouseEnter={playTickSound}
        >
          <span className="text-titanium/50">ВРЕМЯ:</span>{" "}
          <span className="font-bold text-foreground tracking-wider tabular-nums">{time}</span>
        </span>
        
        <RadarCircle active={status.isOnline} />
        
        <span 
          className="flex items-center gap-2 shrink-0 hover:scale-102 transition-transform duration-150 cursor-default py-1"
          onMouseEnter={playTickSound}
        >
          <span className="text-titanium/50">СТАТУС:</span>{" "}
          <span className={`font-bold ${status.isOnline ? "text-accent" : "text-ember"} chromatic-text glitch-hover-text`}>
            <ScrambleText text={status.label} active={status.isOnline} />
          </span>
        </span>
        
        <BlinkingChevrons />
        
        <span 
          className="flex items-center gap-2 shrink-0 hover:text-foreground transition-colors duration-150 cursor-default py-1"
          onMouseEnter={playTickSound}
        >
          <span className="text-titanium/50">РЕЖИМ:</span>{" "}
          <span className="text-[rgba(214,207,191,0.85)] font-bold">
            <ScrambleText text={status.desc} active={status.isOnline} />
          </span>
        </span>
        
        <CyberCog className="text-titanium/30" />
        
        <span 
          className="flex items-center gap-2 shrink-0 hover:text-accent transition-colors duration-150 cursor-default py-1"
          onMouseEnter={playTickSound}
        >
          <span className="text-titanium/50">СВЯЗЬ:</span>{" "}
          <span className="text-accent font-bold tracking-widest">
            <ScrambleText text="ЗАЩИЩЕНО" active={true} />
          </span>
        </span>
      </MarqueeTrack>
    );
  }

  // Full Expanded Card Layout (can be floating card or embedded in-page)
  return (
    <>
      {/* Style block for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes glow-pulse-lime {
          0%, 100% { box-shadow: 0 0 6px rgba(183, 255, 60, 0.4), 0 0 14px rgba(183, 255, 60, 0.15); transform: scale(1); }
          50% { box-shadow: 0 0 14px rgba(183, 255, 60, 0.8), 0 0 28px rgba(183, 255, 60, 0.4); transform: scale(1.12); }
        }
        @keyframes glow-pulse-orange {
          0%, 100% { box-shadow: 0 0 6px rgba(255, 106, 42, 0.3), 0 0 12px rgba(255, 106, 42, 0.1); transform: scale(1); }
          50% { box-shadow: 0 0 12px rgba(255, 106, 42, 0.6), 0 0 24px rgba(255, 106, 42, 0.35); transform: scale(1.08); }
        }
        @keyframes ring-expand {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes scanline-v {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes noise-flicker {
          0%, 100% { opacity: 0.96; }
          50% { opacity: 1; }
          20% { opacity: 0.94; }
          80% { opacity: 0.98; }
        }
      `}} />

      <div 
        className={`${
          isFloating 
            ? "fixed bottom-6 right-6 z-40 w-[320px] md:w-[360px] shadow-[0_16px_48px_rgba(0,0,0,0.6)]" 
            : "w-full text-left"
        } rounded-shell border border-border-subtle bg-gradient-to-br from-[rgba(22,27,25,0.92)] to-[rgba(10,13,12,0.98)] backdrop-blur-xl transition-all duration-300`}
        style={{
          animation: "noise-flicker 4s infinite",
          borderColor: isPinged ? "var(--color-accent)" : "rgba(142, 150, 140, 0.18)",
        }}
      >
        {/* Hardware Bevel Header / Top Panel */}
        <div className="flex items-center justify-between border-b border-border-subtle bg-[rgba(10,13,12,0.6)] px-4 py-3 rounded-t-shell">
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-titanium" />
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-titanium">
              ТЕЛЕМЕТРИЯ СТАТУСА // V93
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="p-1 rounded hover:bg-border-subtle transition-colors text-titanium hover:text-foreground"
              title={soundEnabled ? "Выключить звук" : "Включить звук"}
            >
              {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            </button>
            
            {/* Close Button if Floating */}
            {isFloating && (
              <button
                onClick={() => {
                  setIsExpanded(false);
                  playPingSound();
                }}
                className="rounded p-1 text-titanium hover:bg-border-subtle hover:text-foreground transition-colors"
                aria-label="Свернуть статус"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Main Display Body (with scanner effect) */}
        <div className="relative overflow-hidden p-5">
          {/* Active Scanner Line overlay */}
          <div 
            className="absolute inset-x-0 h-0.5 pointer-events-none z-10"
            style={{
              background: `linear-gradient(90deg, transparent, ${status.isOnline ? "#b7ff3c" : "#ff6a2a"} 30%, ${status.isOnline ? "#b7ff3c" : "#ff6a2a"} 70%, transparent)`,
              boxShadow: `0 0 10px ${status.isOnline ? "#b7ff3c" : "#ff6a2a"}`,
              animation: "scanline-v 3.5s linear infinite",
              top: 0,
            }}
          />

          {/* Background Sci-Fi Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.06] signal-grid-panel" />

          {/* Grid Layout: Status Circle + Time */}
          <div className="grid grid-cols-[80px_1fr] gap-4 items-center mb-5">
            {/* Holographic Status Light Token */}
            <div className="flex flex-col items-center justify-center relative">
              <div 
                className="relative flex h-16 w-16 items-center justify-center rounded-full border border-border-subtle bg-gradient-to-br from-[rgba(18,24,22,0.9)] to-[rgba(10,13,12,0.98)]"
                style={{
                  boxShadow: status.isOnline 
                    ? "inset 0 0 12px rgba(183, 255, 60, 0.15)"
                    : "inset 0 0 12px rgba(255, 106, 42, 0.1)",
                }}
              >
                {/* Expand Ring animation */}
                <span 
                  className="absolute h-8 w-8 rounded-full pointer-events-none"
                  style={{
                    animation: "ring-expand 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite",
                    backgroundColor: status.isOnline ? "rgba(183, 255, 60, 0.3)" : "rgba(255, 106, 42, 0.2)",
                  }}
                />
                
                {/* Core status light */}
                <div 
                  className="h-5 w-5 rounded-full z-10"
                  style={{
                    backgroundColor: status.isOnline ? "#b7ff3c" : "#ff6a2a",
                    animation: status.isOnline ? "glow-pulse-lime 1.5s infinite" : "glow-pulse-orange 2s infinite",
                  }}
                />
              </div>
              <span className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-titanium leading-none">
                NODE_ST
              </span>
            </div>

            {/* Time / Zone info */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-titanium">
                <MapPin size={12} className="flex-shrink-0" />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em]">
                  MINSK, BY (UTC+3)
                </span>
              </div>
              
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-2xl font-bold tracking-wider text-foreground leading-none">
                  {formatTime(minskTime)}
                </span>
                <span className="font-mono text-[9px] text-accent uppercase animate-pulse">
                  TICK
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Activity size={10} className={status.isOnline ? "text-accent animate-pulse" : "text-titanium"} />
                  <span className="font-mono text-[9px] tracking-wide text-titanium">
                    РАСПИСАНИЕ: 12-04
                  </span>
                </div>
                <div className="h-1 w-1 rounded-full bg-border-subtle" />
                <span className={`font-mono text-[9px] font-medium ${status.isOnline ? "text-accent" : "text-ember"}`}>
                  {status.desc}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Console Screen */}
          <div className="rounded border border-border-subtle bg-[rgba(10,13,12,0.92)] p-3 font-mono text-[10px] leading-5 text-[rgba(214,207,191,0.85)] max-h-[140px] overflow-y-auto mb-4 select-none scrollbar-thin">
            <div className="flex items-center gap-1.5 border-b border-border-subtle pb-1 mb-2 text-titanium text-[8px]">
              <Terminal size={10} />
              <span>ПОТОК СИСТЕМНОЙ ТЕЛЕМЕТРИИ</span>
            </div>
            
            {terminalLogs.length === 0 ? (
              <p className="text-[rgba(214,207,191,0.4)]">{"// BOOT PROTOCOL IDLE"}</p>
            ) : (
              terminalLogs.map((log, index) => (
                <div 
                  key={index} 
                  className={
                    log.startsWith(">>") 
                      ? "text-accent" 
                      : log.includes("STATUS:") 
                      ? status.isOnline ? "text-accent font-semibold" : "text-ember font-semibold"
                      : "text-[rgba(214,207,191,0.65)]"
                  }
                >
                  {log}
                </div>
              ))
            )}
            
            {/* Blinking Caret */}
            <div className="inline-block h-3 w-1.5 bg-accent ml-1 animate-pulse" />
          </div>

          {/* Ping Button / Hardware Trigger */}
          <button
            onClick={handlePing}
            disabled={isPinged}
            className={`w-full flex items-center justify-center gap-2 rounded-panel border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              isPinged 
                ? "border-accent/40 bg-accent/5 text-accent/60 cursor-not-allowed"
                : "border-border hover:border-accent hover:bg-accent/5 text-foreground hover:text-accent active:scale-[0.98] shadow-sm hover:shadow-[0_0_12px_rgba(183,255,60,0.18)]"
            }`}
          >
            {isPinged ? (
              <>
                <span className="h-3 w-3 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                ПРОВЕРКА СВЯЗИ...
              </>
            ) : (
              <>
                <Send size={12} />
                ПРОВЕРИТЬ СТАТУС СВЯЗИ
              </>
            )}
          </button>
        </div>

        {/* Footer Hardware Info */}
        <div className="flex items-center justify-between border-t border-border-subtle bg-[rgba(10,13,12,0.4)] px-4 py-2 rounded-b-shell text-[8px] font-mono text-titanium">
          <div className="flex items-center gap-1">
            <ShieldCheck size={10} className="text-accent" />
            <span>СОЕДИНЕНИЕ: ЗАЩИЩЕНО</span>
          </div>
          <span>СИГНАЛ: СТАБИЛЬНЫЙ</span>
        </div>
      </div>
    </>
  );
}

function CyberCog({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1 shrink-0 select-none opacity-80 group-hover:opacity-100 transition-opacity duration-300 mx-2 ${className}`}>
      <svg 
        className="w-5 h-5 text-accent animate-spin-cog-cw shrink-0"
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" fill="currentColor" className="text-accent/20" />
      </svg>
      <svg 
        className="w-3.5 h-3.5 text-titanium animate-spin-cog-ccw shrink-0 -ml-1.5 mt-2"
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" fill="currentColor" className="text-titanium/20" />
      </svg>
    </div>
  );
}

function RadarCircle({ active = true }: { active?: boolean }) {
  return (
    <span className="relative flex h-3.5 w-3.5 items-center justify-center shrink-0">
      <span 
        className={`absolute h-full w-full rounded-full opacity-65 ${
          active ? "bg-accent/40" : "bg-ember/40"
        } animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]`} 
        style={{ willChange: "transform, opacity" }}
      />
      <span className={`h-2 w-2 rounded-full ${active ? "bg-accent" : "bg-ember"}`} />
    </span>
  );
}

function BlinkingChevrons() {
  return (
    <span 
      className="flex items-center shrink-0 font-bold text-accent/90 tracking-tighter animate-[pulse_1.2s_cubic-bezier(0.4,0,0.6,1)_infinite] mx-1"
      style={{ willChange: "opacity" }}
    >
      <span>&gt;&gt;&gt;</span>
    </span>
  );
}

interface ScrambleTextProps {
  text: string;
  active?: boolean;
}

function ScrambleText({ text, active = true }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isScramblingRef = useRef(false);
  const frameRef = useRef(0);

  const chars = "01101001_/*?#@$[]{}&%+=▰▱▲▼◆◇○●□■✕";

  const startScramble = () => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;
    frameRef.current = 0;
    
    const originalText = text;
    const duration = 10; // total ticks

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      frameRef.current += 1;
      
      const scrambled = originalText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          
          const progressThreshold = (frameRef.current / duration) * originalText.length;
          
          if (index < progressThreshold) {
            return originalText[index];
          }
          
          if (Math.random() < 0.3) {
            return chars[Math.floor(Math.random() * chars.length)];
          }
          
          return char;
        })
        .join("");

      setDisplayText(scrambled);

      if (frameRef.current >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(originalText);
        isScramblingRef.current = false;
      }
    }, 50);
  };

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span 
      onMouseEnter={startScramble}
      className={`cursor-default transition-all duration-300 relative inline-block ${
        active 
          ? "hover:text-accent hover:animate-[glitch-flicker_0.3s_ease]" 
          : "hover:text-ember hover:animate-[glitch-flicker_0.3s_ease]"
      }`}
      style={{
        willChange: "text-shadow, transform",
      }}
    >
      {displayText}
    </span>
  );
}

interface MarqueeTrackProps {
  children: React.ReactNode;
  isOnline: boolean;
  onPlayChime: () => void;
}

function MarqueeTrack({ 
  children, 
  isOnline,
  onPlayChime
}: MarqueeTrackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const xRef = useRef(0);
  const currentSpeedRef = useRef(1.0);
  const targetSpeedRef = useRef(1.0);
  const isHoveredRef = useRef(false);
  const animationFrameIdRef = useRef<number | null>(null);
  const [trackWidth, setTrackWidth] = useState<number>(0);

  useEffect(() => {
    if (!trackRef.current) return;
    
    const updateWidth = () => {
      if (trackRef.current) {
        const halfWidth = trackRef.current.scrollWidth / 2;
        setTrackWidth(halfWidth);
      }
    };

    updateWidth();
    
    const observer = new ResizeObserver(updateWidth);
    if (trackRef.current) {
      observer.observe(trackRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (trackWidth === 0) return;

    const animate = () => {
      const decelerationFactor = 0.06;
      currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * decelerationFactor;

      xRef.current -= currentSpeedRef.current;

      if (xRef.current <= -trackWidth) {
        xRef.current += trackWidth;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0px, 0px)`;
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [trackWidth]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    targetSpeedRef.current = 0.08; // slow down beautifully on hover
    onPlayChime(); // Play the high-fidelity welcoming chime
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    targetSpeedRef.current = 1.2; // resume normal speed
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden border border-border-subtle bg-gradient-to-r from-[rgba(18,24,22,0.38)] to-[rgba(10,13,12,0.58)] py-4 sm:py-5 rounded-panel backdrop-blur-md transition-all duration-500 group select-none hover:border-accent/40 hover:shadow-[0_0_35px_rgba(183,255,60,0.12)]"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        @keyframes laser-sweep {
          0% { left: -25%; }
          100% { left: 125%; }
        }
        @keyframes cyber-flicker {
          0%, 100% { opacity: 0.98; }
          30% { opacity: 0.95; }
          32% { opacity: 1; }
          65% { opacity: 0.93; }
          67% { opacity: 1; }
          90% { opacity: 0.97; }
        }
        .tech-grid {
          background-image: 
            linear-gradient(to right, ${isOnline ? "rgba(183, 255, 60, 0.12)" : "rgba(255, 106, 42, 0.12)"} 1px, transparent 1px),
            linear-gradient(to bottom, ${isOnline ? "rgba(183, 255, 60, 0.12)" : "rgba(255, 106, 42, 0.12)"} 1px, transparent 1px);
        }
        .scanlines-overlay {
          background-image: linear-gradient(rgba(18,24,22,0) 95%, ${isOnline ? "rgba(183, 255, 60, 0.22)" : "rgba(255, 106, 42, 0.18)"} 95%);
        }
        @keyframes glitch-flicker {
          0% {
            text-shadow: -1.5px -0.5px 0 rgba(255,0,80,0.65), 1.5px 0.5px 0 rgba(0,255,255,0.65);
            transform: translate(1px, -0.5px);
          }
          20% {
            text-shadow: 2px -1px 0 rgba(255,0,80,0.65), -1.5px 1.5px 0 rgba(0,255,255,0.65);
            transform: translate(-1px, 0.5px);
          }
          40% {
            text-shadow: -1.5px 1.5px 0 rgba(255,0,80,0.65), 2px -0.5px 0 rgba(0,255,255,0.65);
            transform: translate(1px, 1px);
          }
          60% {
            text-shadow: 1.5px -0.5px 0 rgba(255,0,80,0.65), -2px 1px 0 rgba(0,255,255,0.65);
            transform: translate(-1px, -0.5px);
          }
          80% {
            text-shadow: -2px 1.5px 0 rgba(255,0,80,0.65), 1.5px -1.5px 0 rgba(0,255,255,0.65);
            transform: translate(1px, -0.5px);
          }
          100% {
            text-shadow: 0 0 10px ${isOnline ? "rgba(183, 255, 60, 0.6)" : "rgba(255, 106, 42, 0.6)"};
            transform: translate(0, 0);
          }
        }
        .cyber-item-glow {
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .group:hover .cyber-item-glow {
          color: #ffffff;
          text-shadow: 0 0 12px ${isOnline ? "rgba(183, 255, 60, 0.7)" : "rgba(255, 106, 42, 0.7)"};
        }
        .chromatic-glow {
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          text-shadow: -1px -0.5px 0 rgba(255, 60, 60, 0.25), 1px 0.5px 0 rgba(60, 255, 255, 0.25), 0 0 4px ${isOnline ? "rgba(183, 255, 60, 0.25)" : "rgba(255, 106, 42, 0.25)"};
        }
        .group:hover .chromatic-glow {
          text-shadow: 
            -2.5px -1.25px 0 rgba(255, 60, 60, 0.55), 
            2.5px 1.25px 0 rgba(60, 255, 255, 0.55), 
            0 0 16px ${isOnline ? "rgba(183, 255, 60, 0.85)" : "rgba(255, 106, 42, 0.85)"};
        }
      `}} />

      {/* Cybernetic HUD brackets at the edges */}
      <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-accent/20 group-hover:border-accent/80 transition-colors duration-500 pointer-events-none z-20" />
      <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-accent/20 group-hover:border-accent/80 transition-colors duration-500 pointer-events-none z-20" />
      <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-accent/20 group-hover:border-accent/80 transition-colors duration-500 pointer-events-none z-20" />
      <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-accent/20 group-hover:border-accent/80 transition-colors duration-500 pointer-events-none z-20" />

      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500 tech-grid bg-[size:24px_24px] z-10" />
      
      {/* Sci-fi scanning lines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] scanlines-overlay bg-[size:100%_4px] animate-[scanlines_24s_linear_infinite] z-10" />

      {/* Laser scan line sweeping horizontally */}
      <div className="absolute inset-y-0 w-[150px] bg-gradient-to-r from-transparent via-accent/8 to-transparent skew-x-12 pointer-events-none z-10 animate-[laser-sweep_8s_ease-in-out_infinite]" />

      {/* Gradient fade overlays for premium visual edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0d0c]/95 to-transparent pointer-events-none z-20" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0d0c]/95 to-transparent pointer-events-none z-20" />
      
      {/* Track containing clones */}
      <div 
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform font-mono text-xs sm:text-sm md:text-base lg:text-[17px] tracking-[0.14em] uppercase font-bold animate-[cyber-flicker_8s_infinite]"
        style={{
          transform: "translate3d(0px, 0px, 0px)"
        }}
      >
        {/* Clone 1 */}
        <div className="flex items-center gap-16 sm:gap-20 shrink-0 px-8">
          {children}
        </div>
        {/* Clone 2 */}
        <div className="flex items-center gap-16 sm:gap-20 shrink-0 px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
