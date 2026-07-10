"use client";

import React, { useMemo } from "react";

const techTags = [
  "NEXT.JS 16",
  "DEEPSEEK R1",
  "LLAMA 3.3",
  "PROMPT ENGINEERING",
  "MULTI-AGENT WORKFLOWS",
  "STABLE DIFFUSION",
  "COMFYUI",
  "TAILWIND CSS v4",
  "PYTHON",
  "FASTAPI",
  "LANGCHAIN",
  "AGENTOPS",
  "THREE.JS",
  "WEB AUDIO API",
  "GLSL SHADERS",
  "ROCM GPU COMPUTE"
];

export function MarqueeTicker() {
  const duplicatedTags = useMemo(() => {
    // Duplicate multiple times to ensure smooth loop coverage across wide screens
    return [...techTags, ...techTags, ...techTags, ...techTags];
  }, []);

  return (
    <div className="relative w-full overflow-hidden border-y border-border-subtle bg-[rgba(18,24,22,0.32)] py-4 mask-horizontal-fade">
      <div className="flex gap-16 whitespace-nowrap animate-marquee">
        {duplicatedTags.map((tag, idx) => (
          <div key={`${tag}-${idx}`} className="flex items-center gap-6">
            <span className="font-mono text-[11px] font-bold tracking-[0.24em] text-[rgba(214,207,191,0.85)]">
              {tag}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent opacity-50" />
          </div>
        ))}
      </div>
    </div>
  );
}
