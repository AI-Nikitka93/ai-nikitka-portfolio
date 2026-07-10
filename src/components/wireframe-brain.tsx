"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function WireframeBrain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight || 380;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 8.5;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Ambient and Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xb7ff3c, 2.0);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const blueLight = new THREE.DirectionalLight(0x00ffff, 1.2);
    blueLight.position.set(-5, -5, -5);
    scene.add(blueLight);

    const greenPointLight = new THREE.PointLight(0xb7ff3c, 3.0, 12);
    greenPointLight.position.set(0, 0, 0); // Core glow
    scene.add(greenPointLight);

    // 5. Brain Mesh & Particle Group
    const brainGroup = new THREE.Group();
    scene.add(brainGroup);

    // 6. Interaction Variables
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationSpeedY = 0.003; // Auto-rotation speed
    let isHovered = false;

    // Load 3D model
    const loader = new GLTFLoader();
    loader.load(
      "/models/brain.glb",
      (gltf) => {
        setLoading(false);

        // Center and scale the loaded model automatically
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Reset positions inside the local group
        gltf.scene.position.x += (gltf.scene.position.x - center.x);
        gltf.scene.position.y += (gltf.scene.position.y - center.y);
        gltf.scene.position.z += (gltf.scene.position.z - center.z);

        // Scale to a comfortable unit size
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.2 / maxDim; // Adjusted scale for beautiful fit inside the reticle
        gltf.scene.scale.set(scale, scale, scale);

        // Traverse model meshes and replace materials with glowing high-tech styles
        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            
            // Premium wireframe material with intense glow and specular shine
            mesh.material = new THREE.MeshStandardMaterial({
              color: 0xb7ff3c,
              wireframe: true,
              transparent: true,
              opacity: 0.32,
              roughness: 0.05,
              metalness: 0.95,
              emissive: 0xb7ff3c,
              emissiveIntensity: 1.8,
              blending: THREE.AdditiveBlending,
              side: THREE.DoubleSide,
            });

            // Add particle point vertices overlay for high fidelity
            const pointsGeometry = mesh.geometry.clone();
            const pointsMaterial = new THREE.PointsMaterial({
              color: 0xb7ff3c,
              size: 0.024,
              transparent: true,
              opacity: 0.85,
              sizeAttenuation: true,
              blending: THREE.AdditiveBlending,
            });
            const vertexParticles = new THREE.Points(pointsGeometry, pointsMaterial);
            mesh.add(vertexParticles);
          }
        });

        // Add 3D model to brainGroup
        brainGroup.add(gltf.scene);
      },
      undefined,
      (err) => {
        console.error("Failed to load brain 3D model, using fallback visual.", err);
        setError(true);
        setLoading(false);
      }
    );

    // 7. Mouse/Touch Interaction Listeners on the container to feel very responsive
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      brainGroup.rotation.y += deltaX * 0.006;
      brainGroup.rotation.x += deltaY * 0.006;

      previousMousePosition = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const onMouseUpOrLeave = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      brainGroup.rotation.y += deltaX * 0.008;
      brainGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUpOrLeave);
    
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUpOrLeave);

    // Hover speed-up listeners
    const onMouseEnter = () => {
      isHovered = true;
    };
    const onMouseLeave = () => {
      isHovered = false;
      isDragging = false;
    };
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    // 8. Animation loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth rotate and floating when not dragging
      if (!isDragging) {
        const targetSpeed = isHovered ? 0.015 : 0.003;
        rotationSpeedY += (targetSpeed - rotationSpeedY) * 0.05;
        brainGroup.rotation.y += rotationSpeedY;
        
        // Soft floating sinusoidal wave motion
        brainGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;
      }

      // Render scene
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight || 380;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // Clean up resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUpOrLeave);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUpOrLeave);
      
      // Dispose materials and geometry to prevent memory leaks
      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh;
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) => material.dispose());
          } else {
            mesh.material.dispose();
          }
        }
        if ((object as THREE.Points).isPoints) {
          const points = object as THREE.Points;
          points.geometry.dispose();
          if (Array.isArray(points.material)) {
            points.material.forEach((material) => material.dispose());
          } else {
            points.material.dispose();
          }
        }
      });
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] md:h-[400px] flex flex-col items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none group rounded-shell border border-border-subtle bg-[rgba(10,14,12,0.6)]"
      style={{
        boxShadow: "inset 0 0 30px rgba(0,0,0,0.8)"
      }}
    >
      {/* CSS Keyframe Animations for SVG HUD Elements */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hud-rotate-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes hud-rotate-counter {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes hud-pulse-glow {
          0%, 100% { opacity: 0.15; filter: drop-shadow(0 0 2px rgba(183, 255, 60, 0.3)); }
          50% { opacity: 0.35; filter: drop-shadow(0 0 8px rgba(183, 255, 60, 0.8)); }
        }
        .animate-rotate-cw {
          transform-origin: 200px 200px;
          animation: hud-rotate-clockwise 25s linear infinite;
        }
        .animate-rotate-ccw {
          transform-origin: 200px 200px;
          animation: hud-rotate-counter 30s linear infinite;
        }
        .animate-glow-pulse {
          animation: hud-pulse-glow 4s ease-in-out infinite;
        }
      `}} />

      {/* Background Tech Grid & Coordinate Lines */}
      <div 
        className="absolute inset-0 pointer-events-none select-none opacity-[0.14] z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle, #b7ff3c 1px, transparent 1px),
            linear-gradient(to right, rgba(183, 255, 60, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(183, 255, 60, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px, 48px 48px, 48px 48px",
          backgroundPosition: "center center",
        }}
      />

      {/* Diagnostic Coordinate Indicators */}
      <div className="absolute top-3 left-4 font-mono text-[7px] tracking-widest text-accent/40 pointer-events-none select-none group-hover:text-accent/80 transition-colors">
        SYS.STATE: {loading ? "LOADING_MODEL" : error ? "CORE_FALLBACK" : "ONLINE"}
      </div>
      <div className="absolute top-3 right-4 font-mono text-[7px] tracking-widest text-titanium/40 pointer-events-none select-none">
        COORD_REF: [3D.BRAIN.v4.0]
      </div>

      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute w-full h-full block z-10"
      />

      {/* SVG HUD Overlay Layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-20"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* SVG filter for premium glow */}
          <filter id="hud-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Behind-brain crosshairs */}
        <line x1="200" y1="30" x2="200" y2="370" stroke="rgba(183, 255, 60, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="30" y1="200" x2="370" y2="200" stroke="rgba(183, 255, 60, 0.08)" strokeWidth="1" strokeDasharray="3 3" />

        {/* 2. Rotating HUD Orbit Rings (Opposite directions) */}
        {/* Inner HUD Ring */}
        <g className="animate-rotate-cw">
          <circle
            cx="200"
            cy="200"
            r="80"
            fill="none"
            stroke="#b7ff3c"
            strokeWidth="1"
            strokeDasharray="15 30 5 10 25 15"
            className="opacity-35"
          />
          <circle cx="200" cy="120" r="1.5" fill="#b7ff3c" className="opacity-80" />
          <circle cx="200" cy="280" r="1.5" fill="#b7ff3c" className="opacity-80" />
        </g>

        {/* Outer HUD Ring */}
        <g className="animate-rotate-ccw">
          <circle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke="#b7ff3c"
            strokeWidth="1.5"
            strokeDasharray="40 25 10 25 70 30"
            className="opacity-25"
          />
          {/* Ticks on outer ring */}
          <path d="M 197 80 L 203 80 M 197 320 L 203 320 M 80 200 L 80 206 M 320 200 L 320 206" stroke="#b7ff3c" strokeWidth="1" className="opacity-40" />
        </g>

        {/* Third Faint outer ring with coordinates */}
        <g className="animate-rotate-cw" style={{ animationDuration: '60s' }}>
          <circle
            cx="200"
            cy="200"
            r="145"
            fill="none"
            stroke="#b7ff3c"
            strokeWidth="0.75"
            strokeDasharray="2 8"
            className="opacity-15"
          />
          <text x="200" y="47" textAnchor="middle" className="font-mono text-[5px] fill-accent/40">000°</text>
          <text x="352" y="202" textAnchor="start" className="font-mono text-[5px] fill-accent/40">090°</text>
          <text x="200" y="352" textAnchor="middle" className="font-mono text-[5px] fill-accent/40">180°</text>
          <text x="48" y="202" textAnchor="end" className="font-mono text-[5px] fill-accent/40">270°</text>
        </g>

        {/* 3. Central Glowing Circle & Title enclosing text "AI + NIKITKA" */}
        <circle
          cx="200"
          cy="200"
          r="42"
          fill="rgba(10, 14, 12, 0.88)"
          stroke="#b7ff3c"
          strokeWidth="1.5"
          filter="url(#hud-glow)"
          className="animate-glow-pulse"
        />
        {/* Fine internal sub-ring */}
        <circle
          cx="200"
          cy="200"
          r="38"
          fill="none"
          stroke="#b7ff3c"
          strokeWidth="0.5"
          strokeDasharray="4 4"
          className="opacity-50"
        />
        <text
          x="200"
          y="201"
          textAnchor="middle"
          dominantBaseline="central"
          className="font-mono text-[9px] font-extrabold tracking-[0.14em] fill-accent"
          style={{ filter: "drop-shadow(0 0 5px rgba(183, 255, 60, 0.85))" }}
        >
          AI + NIKITKA
        </text>

        {/* 4. Dash-lines pointing to corner labels */}
        {/* Top-Left: RESEARCH */}
        <g>
          <path
            d="M 170 170 L 75 75 L 30 75"
            fill="none"
            stroke="#b7ff3c"
            strokeWidth="1"
            strokeDasharray="3 3"
            className="opacity-60"
          />
          <circle cx="75" cy="75" r="2" fill="#b7ff3c" />
          <text
            x="30"
            y="66"
            textAnchor="start"
            className="font-mono text-[9px] font-extrabold tracking-widest fill-accent"
            style={{ filter: "drop-shadow(0 0 3px rgba(183, 255, 60, 0.7))" }}
          >
            RESEARCH
          </text>
          <text
            x="30"
            y="87"
            textAnchor="start"
            className="font-mono text-[7px] tracking-wider fill-foreground/50 font-medium"
          >
            SYS.ANALYTICS // OK
          </text>
        </g>

        {/* Top-Right: ARCHITECTURE */}
        <g>
          <path
            d="M 230 170 L 325 75 L 370 75"
            fill="none"
            stroke="#b7ff3c"
            strokeWidth="1"
            strokeDasharray="3 3"
            className="opacity-60"
          />
          <circle cx="325" cy="75" r="2" fill="#b7ff3c" />
          <text
            x="370"
            y="66"
            textAnchor="end"
            className="font-mono text-[9px] font-extrabold tracking-widest fill-accent"
            style={{ filter: "drop-shadow(0 0 3px rgba(183, 255, 60, 0.7))" }}
          >
            ARCHITECTURE
          </text>
          <text
            x="370"
            y="87"
            textAnchor="end"
            className="font-mono text-[7px] tracking-wider fill-foreground/50 font-medium"
          >
            MODEL.INFRA // ACTIVE
          </text>
        </g>

        {/* Bottom-Left: EXPERIMENTS */}
        <g>
          <path
            d="M 170 230 L 75 325 L 30 325"
            fill="none"
            stroke="#b7ff3c"
            strokeWidth="1"
            strokeDasharray="3 3"
            className="opacity-60"
          />
          <circle cx="75" cy="325" r="2" fill="#b7ff3c" />
          <text
            x="30"
            y="316"
            textAnchor="start"
            className="font-mono text-[9px] font-extrabold tracking-widest fill-accent"
            style={{ filter: "drop-shadow(0 0 3px rgba(183, 255, 60, 0.7))" }}
          >
            EXPERIMENTS
          </text>
          <text
            x="30"
            y="337"
            textAnchor="start"
            className="font-mono text-[7px] tracking-wider fill-foreground/50 font-medium"
          >
            NEURAL.SIM.v4.2
          </text>
        </g>

        {/* Bottom-Right: DEPLOYMENT */}
        <g>
          <path
            d="M 230 230 L 325 325 L 370 325"
            fill="none"
            stroke="#b7ff3c"
            strokeWidth="1"
            strokeDasharray="3 3"
            className="opacity-60"
          />
          <circle cx="325" cy="325" r="2" fill="#b7ff3c" />
          <text
            x="370"
            y="316"
            textAnchor="end"
            className="font-mono text-[9px] font-extrabold tracking-widest fill-accent"
            style={{ filter: "drop-shadow(0 0 3px rgba(183, 255, 60, 0.7))" }}
          >
            DEPLOYMENT
          </text>
          <text
            x="370"
            y="337"
            textAnchor="end"
            className="font-mono text-[7px] tracking-wider fill-foreground/50 font-medium"
          >
            EDGE.NODE.01 // LIVE
          </text>
        </g>
      </svg>

      {/* Underneath Text bar: Glowing Monospaced lime */}
      <div className="absolute inset-x-0 bottom-3 flex items-center justify-center pointer-events-none select-none z-20">
        <div 
          className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent font-bold"
          style={{
            textShadow: "0 0 8px rgba(183, 255, 60, 0.75)"
          }}
        >
          ➔ AI ENGINE ACTIVATED ➔
        </div>
      </div>
    </div>
  );
}
