"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type Pulse = {
  segmentIndex: number;
  progress: number;
  speed: number;
  direction: number;
};

interface PulseSystem {
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  pulses: Pulse[];
  segments: { start: THREE.Vector3; end: THREE.Vector3 }[];
  positionsArray: Float32Array;
}

export function WireframeBrain() {
  const pathname = usePathname();
  const isEnglishRoute = pathname === "/en" || pathname?.startsWith("/en/");

  const t = {
    sysState: isEnglishRoute ? "SYS.STATUS" : "СТАТУС",
    coordRef: isEnglishRoute ? "COORD_REF [3D]" : "КООРДИНАТЫ [3D]",
    loading: isEnglishRoute ? "LOADING_MODEL" : "ЗАГРУЗКА_МОДЕЛИ",
    error: isEnglishRoute ? "CORE_FALLBACK" : "АВАРИЙНЫЙ_РЕЖИМ",
    online: isEnglishRoute ? "ACTIVE // OK" : "В СЕТИ // ВСЁ РАБОТАЕТ",
    research: isEnglishRoute ? "RESEARCH" : "ИССЛЕДОВАНИЯ",
    researchSub: isEnglishRoute ? "DATA ANALYTICS // OK" : "АНАЛИЗ ДАННЫХ // В НОРМЕ",
    architecture: isEnglishRoute ? "ARCHITECTURE" : "АРХИТЕКТУРА",
    architectureSub: isEnglishRoute ? "AI AGENTS // ACTIVE" : "ИИ-АГЕНТЫ // РАБОТАЮТ",
    experiments: isEnglishRoute ? "EXPERIMENTS" : "ЭКСПЕРИМЕНТЫ",
    experimentsSub: isEnglishRoute ? "NEURAL NETS // v4.2" : "НЕЙРОСЕТИ // v4.2",
    deployment: isEnglishRoute ? "DEPLOYMENT" : "ЗАПУСК И СИСТЕМЫ",
    deploymentSub: isEnglishRoute ? "EDGE SERVER // LIVE" : "СЕРВЕР // В СЕТИ",
    centerText: isEnglishRoute ? "AI + NIKITKA" : "ИИ + НИКИТА",
    engineActivated: isEnglishRoute ? "➔ INTERACTIVE NEURAL CORE ➔" : "➔ ИНТЕРАКТИВНОЕ ЯДРО ЛАБОРАТОРИИ ➔"
  };

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.02);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xb7ff3c, 0.7);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const blueLight = new THREE.DirectionalLight(0x00ffff, 0.5);
    blueLight.position.set(-5, -5, -5);
    scene.add(blueLight);

    const greenPointLight = new THREE.PointLight(0xb7ff3c, 0.8, 8);
    greenPointLight.position.set(0, 0, 0); // Core glow inside the translucent brain
    scene.add(greenPointLight);

    // 5. Brain Mesh & Particle Group
    const brainGroup = new THREE.Group();
    scene.add(brainGroup);

    // List to hold active pulse systems for updating inside animation loop
    const activePulseSystems: PulseSystem[] = [];

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
            
            // Translucent core material that blocks backfaces (depth occlusion) and catches light highlights
            mesh.material = new THREE.MeshStandardMaterial({
              color: 0x050806, // extremely dark green-black base
              transparent: true,
              opacity: 0.65, // semi-transparent core to block back-facing edges
              roughness: 0.15,
              metalness: 0.9,
              emissive: 0x050c07, // very subtle base self-glow
              emissiveIntensity: 0.1,
              side: THREE.FrontSide, // FrontSide only for depth occlusion of back wireframe
              depthWrite: true,
            });

            // Create a clean, non-triangulated wireframe from mesh edges (creases)
            const edgesGeometry = new THREE.EdgesGeometry(mesh.geometry, 15); // 15 degrees threshold
            const lineMaterial = new THREE.LineBasicMaterial({
              color: 0xb7ff3c,
              transparent: true,
              opacity: 0.35, // visible, high-tech lines
              blending: THREE.AdditiveBlending,
              depthWrite: false, // let lines render cleanly on top of the mesh
            });
            const lineSegments = new THREE.LineSegments(edgesGeometry, lineMaterial);
            mesh.add(lineSegments);

            // Extract edge vertex positions array for pulse particles
            const edgePosAttr = edgesGeometry.attributes.position;
            if (edgePosAttr && edgePosAttr.count > 0) {
              const segments: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
              const count = edgePosAttr.count;
              for (let i = 0; i < count; i += 2) {
                segments.push({
                  start: new THREE.Vector3(edgePosAttr.getX(i), edgePosAttr.getY(i), edgePosAttr.getZ(i)),
                  end: new THREE.Vector3(edgePosAttr.getX(i + 1), edgePosAttr.getY(i + 1), edgePosAttr.getZ(i + 1)),
                });
              }

              if (segments.length > 0) {
                const pulseCount = 150;
                const pulsePositions = new Float32Array(pulseCount * 3);
                const pulses: Pulse[] = [];

                for (let i = 0; i < pulseCount; i++) {
                  const segmentIndex = Math.floor(Math.random() * segments.length);
                  const progress = Math.random();
                  const speed = 0.004 + Math.random() * 0.008; // dynamic particle speed
                  const direction = Math.random() > 0.5 ? 1 : 0;

                  pulses.push({
                    segmentIndex,
                    progress,
                    speed,
                    direction,
                  });

                  const segment = segments[segmentIndex];
                  const start = direction === 0 ? segment.start : segment.end;
                  const end = direction === 0 ? segment.end : segment.start;

                  pulsePositions[i * 3] = start.x + (end.x - start.x) * progress;
                  pulsePositions[i * 3 + 1] = start.y + (end.y - start.y) * progress;
                  pulsePositions[i * 3 + 2] = start.z + (end.z - start.z) * progress;
                }

                const pulseGeometry = new THREE.BufferGeometry();
                pulseGeometry.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3));

                const pulseMaterial = new THREE.PointsMaterial({
                  color: 0xffffff,
                  size: 0.05,
                  transparent: true,
                  opacity: 0.95,
                  blending: THREE.AdditiveBlending,
                  depthWrite: false,
                  sizeAttenuation: true,
                });

                const pulsePoints = new THREE.Points(pulseGeometry, pulseMaterial);
                mesh.add(pulsePoints);

                activePulseSystems.push({
                  geometry: pulseGeometry,
                  material: pulseMaterial,
                  pulses,
                  segments,
                  positionsArray: pulsePositions,
                });
              }
            }

            // Sparse particle cloud (neural synapses)
            const positionAttr = mesh.geometry.attributes.position;
            if (positionAttr) {
              const count = positionAttr.count;
              const positions = [];
              const step = 45; // Sparse sampling to show clear gaps and prevent blob rendering
              for (let v = 0; v < count; v += step) {
                positions.push(positionAttr.getX(v), positionAttr.getY(v), positionAttr.getZ(v));
              }
              const sparseGeo = new THREE.BufferGeometry();
              sparseGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
              
              const pointsMaterial = new THREE.PointsMaterial({
                color: 0xb7ff3c,
                size: 0.025, // delicate but visible points
                transparent: true,
                opacity: 0.7,
                sizeAttenuation: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
              });
              const vertexParticles = new THREE.Points(sparseGeo, pointsMaterial);
              mesh.add(vertexParticles);
            }
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

      // Soft breathing core glow representing neural activity
      if (greenPointLight) {
        greenPointLight.intensity = 0.5 + Math.sin(elapsed * 2.0) * 0.3;
      }

      // Update electrical signal pulses running along the neural connections
      for (const sys of activePulseSystems) {
        const { pulses, segments, positionsArray, geometry } = sys;
        for (let i = 0; i < pulses.length; i++) {
          const pulse = pulses[i];
          pulse.progress += pulse.speed;

          if (pulse.progress >= 1.0) {
            pulse.progress = 0.0;
            // Pick a new random edge segment
            pulse.segmentIndex = Math.floor(Math.random() * segments.length);
            pulse.speed = 0.004 + Math.random() * 0.008; // dynamic particle speed
            pulse.direction = Math.random() > 0.5 ? 1 : 0;
          }

          const segment = segments[pulse.segmentIndex];
          if (segment) {
            const start = pulse.direction === 0 ? segment.start : segment.end;
            const end = pulse.direction === 0 ? segment.end : segment.start;

            const x = start.x + (end.x - start.x) * pulse.progress;
            const y = start.y + (end.y - start.y) * pulse.progress;
            const z = start.z + (end.z - start.z) * pulse.progress;

            positionsArray[i * 3] = x;
            positionsArray[i * 3 + 1] = y;
            positionsArray[i * 3 + 2] = z;
          }
        }
        (geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
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

      // Dispose active pulse systems
      activePulseSystems.forEach((sys) => {
        sys.geometry.dispose();
        sys.material.dispose();
      });
      activePulseSystems.length = 0;
      
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
        if ((object as THREE.Line).isLine) {
          const line = object as THREE.Line;
          line.geometry.dispose();
          if (Array.isArray(line.material)) {
            line.material.forEach((material) => material.dispose());
          } else {
            line.material.dispose();
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
      className="relative w-full h-[380px] md:h-[400px] lg:h-full flex flex-col items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none group rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.76)]"
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
        {t.sysState}: {loading ? t.loading : error ? t.error : t.online}
      </div>
      <div className="absolute top-3 right-4 font-mono text-[7px] tracking-widest text-titanium/40 pointer-events-none select-none">
        {t.coordRef}: [3D.BRAIN.v4.0]
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
          {t.centerText}
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
            {t.research}
          </text>
          <text
            x="30"
            y="87"
            textAnchor="start"
            className="font-mono text-[7px] tracking-wider fill-foreground/50 font-medium"
          >
            {t.researchSub}
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
            {t.architecture}
          </text>
          <text
            x="370"
            y="87"
            textAnchor="end"
            className="font-mono text-[7px] tracking-wider fill-foreground/50 font-medium"
          >
            {t.architectureSub}
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
            {t.experiments}
          </text>
          <text
            x="30"
            y="337"
            textAnchor="start"
            className="font-mono text-[7px] tracking-wider fill-foreground/50 font-medium"
          >
            {t.experimentsSub}
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
            {t.deployment}
          </text>
          <text
            x="370"
            y="337"
            textAnchor="end"
            className="font-mono text-[7px] tracking-wider fill-foreground/50 font-medium"
          >
            {t.deploymentSub}
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
          {t.engineActivated}
        </div>
      </div>
    </div>
  );
}
