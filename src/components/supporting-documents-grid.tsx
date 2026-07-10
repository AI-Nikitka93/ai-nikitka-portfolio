"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { supportingProofHighlights } from "@/lib/proof-lab";
import { Lightbox } from "@/components/lightbox";

export function SupportingDocumentsGrid() {
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    src: string;
    alt: string;
    issuer: string;
    date: string;
    pdfUrl?: string;
  }>({
    isOpen: false,
    src: "",
    alt: "",
    issuer: "",
    date: "",
    pdfUrl: undefined,
  });

  const openLightbox = (src: string, alt: string, issuer: string, date: string, pdfUrl?: string) => {
    setLightboxState({
      isOpen: true,
      src,
      alt,
      issuer,
      date,
      pdfUrl,
    });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <div className="grid gap-5 xl:grid-cols-3">
        {supportingProofHighlights.map((item) => (
          <article 
            key={item.id} 
            className="group signal-frame rounded-shell p-4 md:p-5 transition-all duration-300 hover:border-accent/30"
          >
            <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)] items-stretch">
              {/* Premium image container with interactive zoom trigger */}
              <div className="relative min-h-[148px] md:min-h-full overflow-hidden rounded-panel border border-border-subtle bg-panel/40 backdrop-blur-sm p-2 flex items-center justify-center">
                {/* Ambient dark gradient background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,27,25,0.4)_0%,rgba(10,13,12,0.9)_100%)] z-0" />
                
                <Image
                  src={item.image}
                  alt={`${item.title}: превью документа`}
                  width={240}
                  height={180}
                  className="relative object-contain max-h-[130px] w-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] z-10"
                />
                
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,12,0.05)_0%,rgba(10,13,12,0.4)_100%)] z-20" />
                
                {/* Fullscreen Trigger Overlay */}
                <button
                  type="button"
                  onClick={() => openLightbox(item.image, item.title, item.issuer, item.date, item.pdfUrl)}
                  className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus-visible:opacity-100 z-30"
                  aria-label="Открыть документ в полный экран"
                >
                  <div className="flex items-center gap-2 rounded-panel border border-accent bg-background/90 px-4 py-2 text-xs font-mono tracking-wider text-accent transition-transform duration-300 translate-y-1 group-hover:translate-y-0">
                    <Maximize2 size={12} />
                    <span>ПОЛНЫЙ ЭКРАН</span>
                  </div>
                </button>
              </div>

              <div className="min-w-0 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {item.status}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-normal text-foreground">
                    {item.title}
                  </h3>
                  <div className="mt-4 grid gap-2 text-sm text-[rgba(214,207,191,0.76)]">
                    <p>
                      <span className="text-titanium font-mono text-[10px] uppercase tracking-wider mr-1.5">Источник:</span>
                      <span className="text-foreground">{item.issuer}</span>
                    </p>
                    <p>
                      <span className="text-titanium font-mono text-[10px] uppercase tracking-wider mr-1.5">Дата:</span>
                      <span className="text-foreground">{item.date}</span>
                    </p>
                    <p>
                      <span className="text-titanium font-mono text-[10px] uppercase tracking-wider mr-1.5">Метрика:</span>
                      <span className="text-accent">{item.metric}</span>
                    </p>
                    {item.pdfUrl && (
                      <p>
                        <span className="text-titanium font-mono text-[10px] uppercase tracking-wider mr-1.5">Документ:</span>
                        <a
                          href={item.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline inline-flex items-center gap-1 font-medium transition-colors"
                        >
                          Открыть PDF →
                        </a>
                      </p>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-xs leading-6 text-[rgba(214,207,191,0.74)] border-t border-border-subtle pt-3">
                  {item.note}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Shared Lightbox */}
      <Lightbox
        isOpen={lightboxState.isOpen}
        onClose={closeLightbox}
        src={lightboxState.src}
        alt={lightboxState.alt}
        issuer={lightboxState.issuer}
        date={lightboxState.date}
        pdfUrl={lightboxState.pdfUrl}
      />
    </>
  );
}
