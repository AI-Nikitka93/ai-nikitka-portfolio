"use client";

import { useMemo } from "react";

export function WireframeBrain() {
  const nodes = useMemo(() => {
    const list: Array<{ x: number; y: number; z: number; r: number }> = [];
    const seedPoints = 42;
    for (let i = 0; i < seedPoints; i++) {
      // Deterministic pseudo-random generation using trigonometry to be pure
      const theta = (i * 2.39996) % (Math.PI * 2); // golden angle approximation
      const phi = Math.acos((i / seedPoints) * 2 - 1);
      
      // Shape sphere coordinates to mimic a human brain shape
      const r = 85 + ((i * 17) % 25);
      const xVal = r * Math.sin(phi) * Math.cos(theta);
      const yVal = r * Math.sin(phi) * Math.sin(theta) * 0.8;
      const zVal = r * Math.cos(phi) * 1.1;

      // Split hemispheres slightly
      const x = xVal > 0 ? xVal + 8 : xVal - 8;
      const y = yVal;
      const z = zVal;

      list.push({ x, y, z, r: 1.5 + ((i * 3) % 2) });
    }
    return list;
  }, []);

  return (
    <div className="relative w-full h-[280px] flex items-center justify-center overflow-hidden">
      {/* 1. Technical Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.06] crt-overlay mix-blend-overlay" />

      {/* 2. Cybernetic radar rings */}
      <div className="absolute w-[220px] h-[220px] rounded-full border border-accent/15 animate-[radar-pulse_6s_linear_infinite]" />
      <div className="absolute w-[140px] h-[140px] rounded-full border border-accent/5" />

      {/* 3. Wireframe 3D Brain Visual */}
      <div className="relative w-[280px] h-[240px] flex items-center justify-center animate-spin-brain">
        <svg
          viewBox="-160 -160 320 320"
          className="w-full h-full text-accent drop-shadow-[0_0_20px_rgba(183,255,60,0.36)]"
        >
          <g>
            {/* Draw brain connection paths */}
            {nodes.map((node1, idx1) => {
              return nodes.slice(idx1 + 1).map((node2, idx2) => {
                const dist = Math.hypot(node1.x - node2.x, node1.y - node2.y, node1.z - node2.z);
                // Connect nodes that are close to construct the mesh wireframe appearance
                if (dist < 64) {
                  return (
                    <line
                      key={`l-${idx1}-${idx2}`}
                      x1={node1.x}
                      y1={node1.y}
                      x2={node2.x}
                      y2={node2.y}
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeOpacity={0.25 - dist / 256}
                    />
                  );
                }
                return null;
              });
            })}

            {/* Render Nodes */}
            {nodes.map((node, idx) => (
              <circle
                key={`n-${idx}`}
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="currentColor"
                opacity={0.8}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* 4. Scanning scanner line overlay & HUD tags */}
      <div className="absolute inset-x-0 h-[2px] bg-[linear-gradient(90deg,transparent,var(--color-accent),transparent)] opacity-60 pointer-events-none z-10 animate-[proof-scan_4000ms_ease-in-out_infinite]" />
      
      <div className="absolute bottom-1 inset-x-0 flex items-center justify-center gap-1.5 pointer-events-none">
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-accent font-semibold">
          ➔ AI ENGINE ACTIVATED ➔
        </span>
      </div>

      <div className="absolute top-3 right-4 font-mono text-[8px] tracking-wider text-titanium/55 pointer-events-none">
        GRID_UNIT: [32-X]
      </div>
    </div>
  );
}
