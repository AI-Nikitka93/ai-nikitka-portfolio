"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { Lightbox } from "@/components/lightbox";

type DetailDocumentViewerProps = {
  src: string;
  alt: string;
  orientation?: "portrait" | "landscape";
  issuer?: string;
  date?: string;
};

export function DetailDocumentViewer({ src, alt, orientation, issuer, date }: DetailDocumentViewerProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const isPortrait = orientation === "portrait";

  return (
    <>
      <div 
        className={`group relative overflow-hidden rounded-shell border border-border-subtle bg-panel/45 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 hover:border-accent/30 ${
          isPortrait ? "aspect-[3/4] max-h-[70vh] w-full mx-auto" : "aspect-[1.58/1] w-full"
        }`}
      >
        {/* Dark ambient gradient backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,27,25,0.4)_0%,rgba(10,13,12,0.9)_100%)] z-0" />
        
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={isPortrait ? 1600 : 800}
          className="relative object-contain h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] z-10"
          priority
        />
        
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,12,0.05)_0%,rgba(10,13,12,0.4)_100%)] z-20" />
        
        {/* Fullscreen Zoom Trigger Overlay */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus-visible:opacity-100 z-30"
          aria-label="Открыть документ во весь экран"
        >
          <div className="rounded-panel border border-accent bg-background/90 px-4 py-2 text-xs font-mono tracking-wider text-accent transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
            <Maximize2 size={12} />
            <span>ПОЛНЫЙ ЭКРАН</span>
          </div>
        </button>
      </div>

      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={src}
        alt={alt}
        issuer={issuer}
        date={date}
      />
    </>
  );
}
