"use client";

import { useEffect, useState, useRef } from "react";
import { Clock, Globe, ChevronDown, Check } from "lucide-react";
import { usePathname } from "next/navigation";

export type AvailabilityStatusId = "active" | "focused" | "selective" | "scanning";

export interface StatusInfo {
  id: AvailabilityStatusId;
  labelRu: string;
  labelEn: string;
  descRu: string;
  descEn: string;
  dotColorClass: string;
  textColorClass: string;
  bgColorClass: string;
  borderColorClass: string;
}

export const STATUSES: Record<AvailabilityStatusId, StatusInfo> = {
  active: {
    id: "active",
    labelRu: "Активен",
    labelEn: "Active",
    descRu: "Свободен для новых проектов, контрактов и коммерческих предложений.",
    descEn: "Available for new projects, contracts, and business inquiries.",
    dotColorClass: "bg-[#B7FF3C] shadow-[0_0_8px_#B7FF3C]",
    textColorClass: "text-[#B7FF3C]",
    bgColorClass: "bg-[#B7FF3C]/10",
    borderColorClass: "border-[#B7FF3C]/30",
  },
  focused: {
    id: "focused",
    labelRu: "Сфокусирован",
    labelEn: "Focused",
    descRu: "Глубокая работа над текущим проектом. Доступность ограничена.",
    descEn: "Committed to ongoing delivery. Availability is limited.",
    dotColorClass: "bg-[#98CFE3] shadow-[0_0_8px_#98CFE3]",
    textColorClass: "text-[#98CFE3]",
    bgColorClass: "bg-[#98CFE3]/10",
    borderColorClass: "border-[#98CFE3]/30",
  },
  selective: {
    id: "selective",
    labelRu: "Выборочно",
    labelEn: "Selective",
    descRu: "Рассматриваю только исключительные R&D-задачи и архитектурный консалтинг.",
    descEn: "Evaluating high-impact R&D, advanced workflows, or unique projects only.",
    dotColorClass: "bg-[#FF6A2A] shadow-[0_0_8px_#FF6A2A]",
    textColorClass: "text-[#FF6A2A]",
    bgColorClass: "bg-[#FF6A2A]/10",
    borderColorClass: "border-[#FF6A2A]/30",
  },
  scanning: {
    id: "scanning",
    labelRu: "R&D / Анализ",
    labelEn: "Scanning / R&D",
    descRu: "Изучение новых фреймворков, проведение тестов и внутренних исследований.",
    descEn: "Testing emerging systems, running local agent diagnostics, and writing code.",
    dotColorClass: "bg-[#8E968C] shadow-[0_0_8px_#8E968C]",
    textColorClass: "text-[#8E968C]",
    bgColorClass: "bg-[#8E968C]/10",
    borderColorClass: "border-[#8E968C]/20",
  },
};

interface LiveAvailabilityProps {
  initialStatus?: AvailabilityStatusId;
}

export function LiveAvailability({
  initialStatus = "selective",
}: LiveAvailabilityProps) {
  const pathname = usePathname();
  const isEnglish = pathname === "/en" || pathname?.startsWith("/en/");

  const [mounted, setMounted] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentStatus = STATUSES[initialStatus];

  // Client-side time updater to avoid SSR hydration mismatches
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    const updateMinskTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Minsk",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setTimeString(formatter.format(new Date()));
      } catch {
        // Fallback calculation in case the timezone name is not supported (unlikely in modern browsers)
        const date = new Date();
        const utc = date.getTime() + date.getTimezoneOffset() * 60000;
        const minskOffset = 3; // UTC+3
        const minskDate = new Date(utc + 3600000 * minskOffset);
        const pad = (num: number) => String(num).padStart(2, "0");
        setTimeString(
          `${pad(minskDate.getHours())}:${pad(minskDate.getMinutes())}:${pad(minskDate.getSeconds())}`
        );
      }
    };

    updateMinskTime();
    const interval = setInterval(updateMinskTime, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="relative z-20 inline-block text-left font-sans"
      aria-label={isEnglish ? "Nikita's Live Availability" : "Текущий статус занятости Никиты"}
    >
      {/* Visual trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`group inline-flex min-h-[38px] items-center gap-3 rounded-panel border px-4 py-2 text-sm font-medium transition-all duration-200 hover:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent ${
          isOpen
            ? "border-accent bg-[rgba(18,24,22,0.95)]"
            : "border-border-subtle bg-[rgba(18,24,22,0.64)]"
        }`}
      >
        {/* Status pulsating indicator */}
        <span className="relative flex h-2 w-2">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 duration-1000 ${
              currentStatus.dotColorClass.split(" ")[0]
            }`}
          />
          <span className={`relative inline-flex h-2 w-2 rounded-full ${currentStatus.dotColorClass}`} />
        </span>

        {/* Status label */}
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-titanium group-hover:text-foreground transition-colors">
          {isEnglish ? "STATUS:" : "СТАТУС:"}{" "}
          <span className={`font-semibold ${currentStatus.textColorClass}`}>
            {isEnglish ? currentStatus.labelEn : currentStatus.labelRu}
          </span>
        </span>

        {/* Clock display */}
        <span
          className="border-l border-border-subtle pl-3 font-mono text-[10px] uppercase tracking-[0.16em] text-titanium flex items-center gap-1.5"
          aria-live="polite"
        >
          <Clock size={11} className="text-titanium/80 group-hover:text-accent transition-colors" />
          <span>{mounted ? timeString : "--:--:--"}</span>
          <span className="text-[9px] opacity-60">MSK</span>
        </span>

        <ChevronDown
          size={12}
          className={`text-titanium transition-transform duration-200 ${
            isOpen ? "rotate-180 text-accent" : ""
          }`}
        />
      </button>

      {/* Screen Reader status announcement */}
      <span className="sr-only">
        {isEnglish
          ? `Current status is ${currentStatus.labelEn}. Location time is ${mounted ? timeString : "loading"}.`
          : `Текущий статус: ${currentStatus.labelRu}. Время в Минске: ${mounted ? timeString : "загрузка"}.`}
      </span>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-80 rounded-panel border border-border-subtle bg-[rgba(22,27,25,0.98)] p-4 shadow-xl backdrop-blur-md animate-fade-in focus:outline-none md:left-auto md:right-0">
          <div className="space-y-3">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-border-subtle pb-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-titanium">
                <Globe size={12} className="text-accent" />
                <span>Minsk, Belarus (UTC+3)</span>
              </div>
              <span className="font-mono text-[10px] text-accent">
                {mounted ? timeString : "--:--:--"}
              </span>
            </div>

            {/* Explanatory text */}
            <p className="text-[11px] leading-5 text-[rgba(214,207,191,0.7)]">
              {isEnglish
                ? "Nikita's current work status. Updated manually based on workload and active contracts."
                : "Текущая загрузка Никиты. Обновляется вручную в зависимости от открытых контрактов."}
            </p>

            {/* Status list */}
            <div className="space-y-2 pt-1" role="list">
              {(Object.keys(STATUSES) as AvailabilityStatusId[]).map((key) => {
                const info = STATUSES[key];
                const isActive = key === initialStatus;

                return (
                  <div
                    key={key}
                    className={`rounded-panel border p-2.5 transition-all duration-200 ${
                      isActive
                        ? `${info.borderColorClass} ${info.bgColorClass}`
                        : "border-transparent hover:bg-white/[0.02]"
                    }`}
                    role="listitem"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`inline-block h-2 w-2 rounded-full ${info.dotColorClass}`} />
                        <span className={`font-mono text-[11px] uppercase tracking-wider font-semibold ${info.textColorClass}`}>
                          {isEnglish ? info.labelEn : info.labelRu}
                        </span>
                      </div>
                      {isActive && <Check size={12} className={info.textColorClass} />}
                    </div>
                    <p className="mt-1 text-[10px] leading-4 text-[rgba(214,207,191,0.8)]">
                      {isEnglish ? info.descEn : info.descRu}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
