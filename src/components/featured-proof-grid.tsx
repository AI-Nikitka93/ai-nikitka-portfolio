"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Maximize2 } from "lucide-react";
import { Lightbox } from "@/components/lightbox";

const heroProofAssets = [
  {
    id: "kinomatik",
    src: "/proof-assets/sig-04-kinomatik.jpg",
    title: "КИНОМАТИК",
    label: "конкурс / 2026",
    href: "/portfolio/sig-04-kinomatik-laureate-neurovideo-competition",
    documentName: "Диплом лауреата",
    issuer: "КИНОМАТИК",
    date: "2026",
    desc: "Первое место и статус лауреата в престижном конкурсе нейросетевого видео. Работа проверена авторитетным жюри и подтверждена официальным дипломом.",
  },
  {
    id: "helix-film",
    src: "/proof-assets/sig-02-helix-film.png",
    title: "LabStory / Helix",
    label: "лучший фильм / 2025",
    href: "/portfolio/sig-02-labstory-helix-best-animated-film",
    documentName: "Диплом победителя",
    issuer: "LabStory / Helix",
    date: "2025",
    desc: "Победа в номинации «Лучший анимационный фильм». Генерация видеоматериалов, сборка сцен и финальный монтаж.",
  },
  {
    id: "35awards",
    src: "/proof-assets/sig-01-35awards-2026.jpg",
    title: "35AWARDS",
    label: "нейрофото / 2025-2026",
    href: "/portfolio/sig-01-35awards-ai-imaging-field-results",
    documentName: "Сертификат конкурса",
    issuer: "35AWARDS",
    date: "2025-2026",
    desc: "Международное признание в генеративных медиа. ТОП-35 в номинации «Нейрофото» и ТОП-10 лучших тематических фотографов.",
  },
] as const;

export function FeaturedProofGrid() {
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    src: string;
    alt: string;
    issuer: string;
    date: string;
  }>({
    isOpen: false,
    src: "",
    alt: "",
    issuer: "",
    date: "",
  });

  const openLightbox = (src: string, alt: string, issuer: string, date: string) => {
    setLightboxState({
      isOpen: true,
      src,
      alt,
      issuer,
      date,
    });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  // Extract assets for grid mapping
  const [kinomatik, helix, awards35] = heroProofAssets;

  return (
    <>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: КИНОМАТИК (Featured Laureate Case - Asymmetrical Span) */}
        <div className="group relative flex flex-col justify-between rounded-shell border border-border-subtle bg-[rgba(10,13,12,0.34)] p-4 transition-all duration-300 hover:border-accent/30 lg:col-span-2 md:col-span-2 md:p-5">
          <div className="grid gap-5 md:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)] items-stretch h-full">
            {/* Large readable preview with interactive lightbox trigger */}
            <div className="relative min-h-[200px] md:min-h-full overflow-hidden rounded-panel border border-border-subtle bg-panel/40 backdrop-blur-sm p-3 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,27,25,0.4)_0%,rgba(10,13,12,0.9)_100%)] z-0" />
              <Image
                src={kinomatik.src}
                alt={`${kinomatik.title}: диплом лауреата`}
                width={360}
                height={480}
                className="relative object-contain max-h-[220px] md:max-h-[240px] w-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] z-10"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,12,0.05)_0%,rgba(10,13,12,0.4)_100%)] z-20" />
              
              {/* Fullscreen Button Trigger */}
              <button
                type="button"
                onClick={() => openLightbox(kinomatik.src, kinomatik.title, kinomatik.issuer, kinomatik.date)}
                className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus-visible:opacity-100 z-30"
              >
                <div className="flex items-center gap-2 rounded-panel border border-accent bg-background/90 px-4 py-2 text-xs font-mono tracking-wider text-accent transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                  <Maximize2 size={12} />
                  <span>ПОЛНЫЙ ЭКРАН</span>
                </div>
              </button>
            </div>

            {/* Metadata content */}
            <div className="flex flex-col justify-between py-1">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-[4px]">
                    {kinomatik.label}
                  </span>
                  <span className="font-mono text-[10px] text-titanium">ID: SIG-04</span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold leading-tight text-foreground">
                  {kinomatik.title}
                </h3>
                <p className="text-sm leading-7 text-[rgba(214,207,191,0.76)]">
                  {kinomatik.desc}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
                <span className="font-mono text-[9px] text-titanium uppercase tracking-[0.18em]">
                  {kinomatik.documentName}
                </span>
                <Link
                  href={kinomatik.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline group-hover:text-accent"
                >
                  <span>Детали проекта</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: LabStory / Helix */}
        <div className="group flex flex-col justify-between rounded-shell border border-border-subtle bg-[rgba(10,13,12,0.34)] p-4 transition-all duration-300 hover:border-accent/30 md:p-5">
          <div className="space-y-4">
            {/* Readable preview with interactive lightbox trigger */}
            <div className="relative aspect-[1.58/1] overflow-hidden rounded-panel border border-border-subtle bg-panel/40 backdrop-blur-sm p-3 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,27,25,0.4)_0%,rgba(10,13,12,0.9)_100%)] z-0" />
              <Image
                src={helix.src}
                alt={`${helix.title}: диплом`}
                width={320}
                height={180}
                className="relative object-contain max-h-[140px] w-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] z-10"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,12,0.05)_0%,rgba(10,13,12,0.4)_100%)] z-20" />
              
              <button
                type="button"
                onClick={() => openLightbox(helix.src, helix.title, helix.issuer, helix.date)}
                className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus-visible:opacity-100 z-30"
              >
                <div className="flex items-center gap-2 rounded-panel border border-accent bg-background/90 px-4 py-2 text-xs font-mono tracking-wider text-accent transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                  <Maximize2 size={12} />
                  <span>ПОЛНЫЙ ЭКРАН</span>
                </div>
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-titanium">
                  {helix.label}
                </span>
                <span className="font-mono text-[10px] text-titanium">ID: SIG-02</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                {helix.title}
              </h3>
              <p className="text-xs leading-6 text-[rgba(214,207,191,0.7)]">
                {helix.desc}
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-3">
            <span className="font-mono text-[8px] text-titanium uppercase tracking-[0.16em]">
              {helix.documentName}
            </span>
            <Link
              href={helix.href}
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
            >
              <span>Подробнее</span>
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Card 3: 35AWARDS */}
        <div className="group flex flex-col justify-between rounded-shell border border-border-subtle bg-[rgba(10,13,12,0.34)] p-4 transition-all duration-300 hover:border-accent/30 md:p-5">
          <div className="space-y-4">
            {/* Readable preview with interactive lightbox trigger */}
            <div className="relative aspect-[1.58/1] overflow-hidden rounded-panel border border-border-subtle bg-panel/40 backdrop-blur-sm p-3 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,27,25,0.4)_0%,rgba(10,13,12,0.9)_100%)] z-0" />
              <Image
                src={awards35.src}
                alt={`${awards35.title}: сертификат`}
                width={320}
                height={240}
                className="relative object-contain max-h-[140px] w-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] z-10"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,12,0.05)_0%,rgba(10,13,12,0.4)_100%)] z-20" />
              
              <button
                type="button"
                onClick={() => openLightbox(awards35.src, awards35.title, awards35.issuer, awards35.date)}
                className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus-visible:opacity-100 z-30"
              >
                <div className="flex items-center gap-2 rounded-panel border border-accent bg-background/90 px-4 py-2 text-xs font-mono tracking-wider text-accent transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                  <Maximize2 size={12} />
                  <span>ПОЛНЫЙ ЭКРАН</span>
                </div>
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-titanium">
                  {awards35.label}
                </span>
                <span className="font-mono text-[10px] text-titanium">ID: SIG-01</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                {awards35.title}
              </h3>
              <p className="text-xs leading-6 text-[rgba(214,207,191,0.7)]">
                {awards35.desc}
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-3">
            <span className="font-mono text-[8px] text-titanium uppercase tracking-[0.16em]">
              {awards35.documentName}
            </span>
            <Link
              href={awards35.href}
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
            >
              <span>Подробнее</span>
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Shared Lightbox */}
      <Lightbox
        isOpen={lightboxState.isOpen}
        onClose={closeLightbox}
        src={lightboxState.src}
        alt={lightboxState.alt}
        issuer={lightboxState.issuer}
        date={lightboxState.date}
      />
    </>
  );
}
