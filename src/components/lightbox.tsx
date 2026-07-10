"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, X, ZoomIn, ZoomOut } from "lucide-react";

type LightboxProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  issuer?: string;
  date?: string;
  pdfUrl?: string;
};

export function Lightbox({ isOpen, onClose, src, alt, issuer, date, pdfUrl }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [zoomLevel, setZoomLevel] = useState<"fit" | "expanded">("fit");

  // Manage body scroll lock and focus restore
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isOpen) {
      // Keep track of the element that had focus before opening the lightbox
      triggerRef.current = document.activeElement as HTMLElement;
      
      // Lock scroll
      document.body.style.overflow = "hidden";
      
      // Focus close button on mount
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      // Restore scroll
      document.body.style.overflow = "";
      
      // Restore focus
      triggerRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle keyboard events (Escape and Tab trapping)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && overlayRef.current) {
        const focusableElements = overlayRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => (prev === "fit" ? "expanded" : "fit"));
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Просмотр документа: ${alt}`}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-background/95 backdrop-blur-md p-4 animate-[fade-in_200ms_ease-out]"
      onClick={handleBackdropClick}
    >
      {/* Header controls bar */}
      <div className="w-full max-w-[1440px] flex items-center justify-between gap-4 py-2 border-b border-border-subtle z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
            верифицированный документ
          </p>
          <h4 className="text-sm font-semibold text-foreground mt-1">
            {alt} {issuer ? `(${issuer})` : ""}
          </h4>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            type="button"
            onClick={toggleZoom}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-panel border border-border-subtle bg-surface-muted/60 px-3 text-xs font-mono text-[rgba(214,207,191,0.8)] hover:border-accent hover:text-foreground transition-colors"
            title={zoomLevel === "fit" ? "Увеличить" : "Сбросить масштаб"}
          >
            {zoomLevel === "fit" ? (
              <>
                <ZoomIn size={14} />
                <span className="hidden sm:inline">100% МАСШТАБ</span>
              </>
            ) : (
              <>
                <ZoomOut size={14} />
                <span className="hidden sm:inline">ВПИСАТЬ</span>
              </>
            )}
          </button>

          <a
            href={pdfUrl || src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 sm:w-auto sm:px-3 items-center justify-center gap-2 rounded-panel border border-border-subtle bg-surface-muted/60 text-xs font-mono text-[rgba(214,207,191,0.8)] hover:border-accent hover:text-foreground transition-colors"
            title={pdfUrl ? "Открыть исходный файл PDF" : "Открыть исходный файл изображения"}
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">{pdfUrl ? "PDF" : "ФАЙЛ"}</span>
          </a>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Закрыть окно просмотра"
            className="inline-flex h-9 w-9 items-center justify-center rounded-panel border border-accent bg-accent/10 text-accent hover:bg-accent hover:text-background transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div 
        className="flex-1 w-full flex items-center justify-center my-4 overflow-auto cursor-zoom-out"
        onClick={onClose}
      >
        <div 
          className={`relative transition-all duration-300 ease-out ${
            zoomLevel === "expanded" 
              ? "h-[140vh] w-[95vw] sm:w-[85vw] max-w-[1200px]" 
              : "h-full w-full max-h-[78vh] max-w-[90vw]"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            className="object-contain transition-all duration-300 ease-in-out cursor-zoom-in"
            onClick={toggleZoom}
            priority
          />
        </div>
      </div>

      {/* Footer Info Metadata */}
      <div className="w-full max-w-[1440px] flex flex-wrap items-center justify-between gap-3 py-3 border-t border-border-subtle text-xs text-[rgba(214,207,191,0.66)] z-10 pointer-events-none">
        <div>
          {date && (
            <p>
              <span className="font-mono text-titanium uppercase tracking-widest mr-2">Дата выпуска:</span>
              <span className="text-foreground">{date}</span>
            </p>
          )}
        </div>
        <p className="font-mono text-[9px] uppercase tracking-wider text-titanium">
          НАЖМИТЕ ESC ДЛЯ ЗАКРЫТИЯ ИЛИ КЛИКНИТЕ НА ФОН
        </p>
      </div>
    </div>
  );
}
