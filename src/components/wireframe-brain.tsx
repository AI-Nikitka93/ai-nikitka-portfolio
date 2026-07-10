"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  type: "cortex" | "cerebellum" | "stem" | "core";
  r: number;
}

export function WireframeBrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interaction states
  const [isHovered, setIsHovered] = useState(false);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  // 3D Rotation angles (in radians)
  const rotationX = useRef(0.2);
  const rotationY = useRef(0.5);

  // Target rotation speeds for smooth damping
  const targetRotationSpeedX = useRef(0);
  const targetRotationSpeedY = useRef(0.006); // Slow idle spin

  // Generate brain particles mathematically
  const particles: Point3D[] = useMemo(() => {
    const list: Point3D[] = [];

    // 1. Cerebral Cortex Hemispheres (Left & Right Lobes)
    const cortexCount = 450;
    for (let i = 0; i < cortexCount; i++) {
      // Golden spiral distribution on a sphere
      const phi = Math.acos(-1 + (2 * i) / cortexCount);
      const theta = Math.sqrt(cortexCount * Math.PI) * phi;

      // Base shape proportions (elongated along Y-axis, slightly wider on sides, rounded)
      const baseR = 58;
      const x0 = Math.sin(phi) * Math.cos(theta) * 1.15;
      const y0 = Math.sin(phi) * Math.sin(theta) * 0.95;
      const z0 = Math.cos(phi) * 0.95;

      // Create realistic cortical folds (sulci/gyri) using high-frequency sine modulations
      const foldScale = 6;
      const foldFreq = 0.15;
      const folds =
        foldScale *
        Math.sin(x0 * baseR * foldFreq) *
        Math.cos(y0 * baseR * foldFreq) *
        Math.sin(z0 * baseR * foldFreq);

      const r = baseR + folds;
      let x = x0 * r;
      let y = y0 * r;
      const z = z0 * r;

      // Flatten bottom slightly
      if (y < -15) {
        y *= 0.85;
      }

      // Split hemispheres slightly along longitudinal fissure (X-axis gap)
      const hemisphereSign = i % 2 === 0 ? 1 : -1;
      x += hemisphereSign * 3.5;

      list.push({ x, y, z, type: "cortex", r: 1.2 + ((i * 3) % 1.5) });
    }

    // 2. Cerebellum (Dense small folds in lower back posterior-inferior region)
    const cerebellumCount = 120;
    for (let i = 0; i < cerebellumCount; i++) {
      const phi = Math.acos(-0.95 + (0.5 * i) / cerebellumCount); // Limit to bottom/back quadrant
      const theta = Math.sqrt(cerebellumCount * Math.PI) * phi * 1.5;

      const r = 32 + (i % 6);
      // Position at lower back (negative Y, negative Z)
      const x = Math.sin(phi) * Math.cos(theta) * r * 0.8;
      const y = -28 + Math.sin(phi) * Math.sin(theta) * 14;
      const z = -32 + Math.cos(phi) * 15;

      list.push({ x, y, z, type: "cerebellum", r: 0.9 + (i % 2) * 0.5 });
    }

    // 3. Brain Stem (Extends downwards from the center-bottom)
    const stemCount = 60;
    for (let i = 0; i < stemCount; i++) {
      const t = i / stemCount;
      const y = -22 - t * 45; // Extend down
      const radius = 10 * (1 - t * 0.4); // Taper slightly

      // Spiral distribution along stem cylinder
      const angle = t * Math.PI * 10;
      const x = Math.cos(angle) * radius * (1 + 0.1 * Math.sin(t * 20));
      const z = Math.sin(angle) * radius * (1 + 0.1 * Math.cos(t * 20)) - 6; // slightly back

      list.push({ x, y, z, type: "stem", r: 1.0 + (i % 2) * 0.4 });
    }

    // 4. Central Processor Core Rings (Surrounding the central text)
    const coreCount = 40;
    for (let i = 0; i < coreCount; i++) {
      const angle = (i / coreCount) * Math.PI * 2;
      const radius = 24;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.3; // Flat disk
      const z = 0;

      list.push({ x, y, z, type: "core", r: 1.5 });
    }

    return list;
  }, []);

  // Main rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    // Resize handler to match container dimensions
    const handleResize = () => {
      if (canvas && containerRef.current) {
        width = containerRef.current.clientWidth;
        height = containerRef.current.clientHeight || 280;
        canvas.width = width;
        canvas.height = height;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Render loop
    const render = () => {
      // Clear canvas with trace transparency for slight motion blur effect
      ctx.fillStyle = "rgba(10, 13, 12, 0.9)";
      ctx.fillRect(0, 0, width, height);

      // Render matrix HUD grids behind the brain
      ctx.strokeStyle = "rgba(183, 255, 60, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Smooth damping of rotation speed
      if (!isDragging.current) {
        const speedMultiplier = isHovered ? 2.5 : 1.0;
        targetRotationSpeedY.current = 0.005 * speedMultiplier;
        rotationX.current += targetRotationSpeedX.current;
        rotationY.current += targetRotationSpeedY.current;
      }

      const cosX = Math.cos(rotationX.current);
      const sinX = Math.sin(rotationX.current);
      const cosY = Math.cos(rotationY.current);
      const sinY = Math.sin(rotationY.current);

      // Projection parameters
      const centerX = width / 2;
      const centerY = height / 2 - 5;
      const fov = 350; // Camera focal length

      // Project all 3D points to 2D
      const projected = particles.map((p) => {
        // 1. Rotate Y-axis (spin)
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;

        // 2. Rotate X-axis (tilt)
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // 3. Perspective Projection
        const depthScale = fov / (fov + z2);
        const px = centerX + x1 * depthScale;
        const py = centerY - y2 * depthScale; // Invert Y for screen space

        return {
          px,
          py,
          depth: z2,
          type: p.type,
          r: p.r * depthScale,
        };
      });

      // Sort by depth (back to front) for correct painter's algorithm rendering
      projected.sort((a, b) => b.depth - a.depth);

      // Draw wireframe connections (cortex mesh paths)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.type !== "cortex" && p1.type !== "cerebellum") continue;

        // Connect only to nearest neighbors in screen space to construct mesh
        let connections = 0;
        const maxConnections = p1.type === "cerebellum" ? 2 : 3;

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          if (p2.type !== p1.type) continue;

          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.hypot(dx, dy);

          if (dist < 26) {
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            
            // Fade lines based on depth (fog effect)
            const alpha = Math.max(0.02, Math.min(0.24, 1.0 - (p1.depth + 100) / 200));
            ctx.strokeStyle = `rgba(183, 255, 60, ${alpha * (isHovered ? 1.4 : 1.0)})`;
            ctx.stroke();

            connections++;
            if (connections >= maxConnections) break;
          }
        }
      }

      // Draw particles
      projected.forEach((p) => {
        // Draw the point
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.r, 0, Math.PI * 2);
        
        // Depth shading color
        const depthOpacity = Math.max(0.12, Math.min(1.0, 1.0 - (p.depth + 100) / 200));
        
        if (p.type === "core") {
          ctx.fillStyle = `rgba(183, 255, 60, ${depthOpacity * 0.9})`;
        } else if (p.type === "stem") {
          ctx.fillStyle = `rgba(183, 255, 60, ${depthOpacity * 0.45})`;
        } else if (p.type === "cerebellum") {
          ctx.fillStyle = `rgba(183, 255, 60, ${depthOpacity * 0.6})`;
        } else {
          // Cortex
          ctx.fillStyle = `rgba(183, 255, 60, ${depthOpacity * 0.8})`;
        }
        
        ctx.fill();

        // Draw a tiny ambient glow behind front particles
        if (p.depth < -40 && p.type === "cortex" && Math.random() < 0.05) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.r * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(183, 255, 60, 0.06)";
          ctx.fill();
        }
      });

      // 5. Draw Glowing CENTRAL HOLOGRAPHIC CORE: "AI + Nikitka"
      ctx.save();
      
      // Calculate pulsating core transparency
      const pulseSpeed = Date.now() * 0.0035;
      const corePulse = 0.85 + 0.15 * Math.sin(pulseSpeed);

      // Core Background Glow
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 48);
      coreGrad.addColorStop(0, `rgba(183, 255, 60, ${0.15 * corePulse})`);
      coreGrad.addColorStop(1, "rgba(10, 13, 12, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 48, 0, Math.PI * 2);
      ctx.fill();

      // Render Central Text label projected in 3D
      ctx.font = "bold 9px var(--font-mono, monospace)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "2px";

      // Outer drop shadow glow for text
      ctx.shadowColor = "rgba(183, 255, 60, 0.95)";
      ctx.shadowBlur = 10;
      
      // Dual text render for matrix aberration effect
      ctx.fillStyle = `rgba(183, 255, 60, ${corePulse})`;
      ctx.fillText("AI + NIKITKA", centerX, centerY);

      // Extra chromatic sub-layer
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
      ctx.fillText("AI + NIKITKA", centerX - 0.5, centerY - 0.5);

      ctx.restore();

      // 6. Draw HUD Laser Sweeper Scanline
      const scanY = (Date.now() * 0.06) % height;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      const scanGrad = ctx.createLinearGradient(0, scanY - 3, 0, scanY + 1);
      scanGrad.addColorStop(0, "rgba(183, 255, 60, 0)");
      scanGrad.addColorStop(0.5, "rgba(183, 255, 60, 0.18)");
      scanGrad.addColorStop(1, "rgba(183, 255, 60, 0)");
      ctx.strokeStyle = scanGrad;
      ctx.lineWidth = 3;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [particles, isHovered]);

  // Handle Drag Interactivity to rotate the 3D space manually
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    previousMousePosition.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    // Adjust rotation based on drag speed
    rotationY.current += deltaX * 0.007;
    rotationX.current += deltaY * 0.007;

    previousMousePosition.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // Touch support for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      previousMousePosition.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging.current || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

    rotationY.current += deltaX * 0.009;
    rotationX.current += deltaY * 0.009;

    previousMousePosition.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseUpOrLeave();
      }}
      className="relative w-full h-[280px] flex flex-col items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none group"
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUpOrLeave}
        className="w-full h-full block"
      />

      {/* Cybernetic HUD elements layered above canvas */}
      <div className="absolute inset-x-0 bottom-1 flex items-center justify-center gap-1.5 pointer-events-none select-none">
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-accent font-semibold drop-shadow-[0_0_8px_rgba(183,255,60,0.4)]">
          ➔ AI ENGINE ACTIVATED ➔
        </span>
      </div>

      <div className="absolute top-3 right-4 font-mono text-[8px] tracking-wider text-titanium/45 pointer-events-none select-none">
        GRID_UNIT: [3D-CORE-V2]
      </div>
      
      <div className="absolute top-3 left-4 font-mono text-[8px] tracking-wider text-accent/40 pointer-events-none select-none group-hover:text-accent/80 transition-colors">
        DRAG TO ROTATE
      </div>
    </div>
  );
}
