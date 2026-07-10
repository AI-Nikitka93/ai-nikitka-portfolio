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
    let height = container.clientHeight || 280;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Ambient and Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xb7ff3c, 1.8);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const blueLight = new THREE.DirectionalLight(0x00ffff, 1.0);
    blueLight.position.set(-5, -5, -5);
    scene.add(blueLight);

    const greenPointLight = new THREE.PointLight(0xb7ff3c, 2.5, 10);
    greenPointLight.position.set(0, 0, 0); // Core glow
    scene.add(greenPointLight);

    // 5. Brain Mesh & Particle Group
    const brainGroup = new THREE.Group();
    scene.add(brainGroup);

    // 6. Interaction Variables
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationSpeedY = 0.004; // Auto-rotation speed
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
        const scale = 2.6 / maxDim;
        gltf.scene.scale.set(scale, scale, scale);

        // Traverse model meshes and replace materials with glowing high-tech styles
        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            
            // Premium wireframe material
            mesh.material = new THREE.MeshStandardMaterial({
              color: 0xb7ff3c,
              wireframe: true,
              transparent: true,
              opacity: 0.18,
              roughness: 0.1,
              metalness: 0.9,
              emissive: 0xb7ff3c,
              emissiveIntensity: 0.2,
            });

            // Add particle point vertices overlay for high fidelity
            const pointsGeometry = mesh.geometry.clone();
            const pointsMaterial = new THREE.PointsMaterial({
              color: 0xb7ff3c,
              size: 0.038,
              transparent: true,
              opacity: 0.75,
              sizeAttenuation: true,
            });
            const vertexParticles = new THREE.Points(pointsGeometry, pointsMaterial);
            vertexParticles.scale.copy(mesh.scale);
            vertexParticles.position.copy(mesh.position);
            vertexParticles.rotation.copy(mesh.rotation);
            brainGroup.add(vertexParticles);
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

    // 7. Mouse/Touch Interaction Listeners
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

      brainGroup.rotation.y += deltaX * 0.008;
      brainGroup.rotation.x += deltaY * 0.008;

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

      brainGroup.rotation.y += deltaX * 0.01;
      brainGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUpOrLeave);
    
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onMouseUpOrLeave);

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

      // Smooth rotate when not dragging
      if (!isDragging) {
        const targetSpeed = isHovered ? 0.016 : 0.004;
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
      height = container.clientHeight || 280;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUpOrLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onMouseUpOrLeave);
      
      // Dispose materials and geometry to prevent memory leaks
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280px] flex flex-col items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none group"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />

      {/* 3D Central Holographic Core Label (HTML Overlay) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Glowing central core circle */}
          <div className="w-24 h-24 rounded-full bg-accent/[0.04] border border-accent/10 flex items-center justify-center backdrop-blur-[1px] animate-pulse">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-accent font-bold drop-shadow-[0_0_8px_rgba(183,255,60,0.6)]">
              AI + NIKITKA
            </span>
          </div>
        </div>
      </div>

      {/* Cybernetic HUD elements layered above canvas */}
      <div className="absolute inset-x-0 bottom-1 flex items-center justify-center gap-1.5 pointer-events-none select-none">
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-accent font-semibold drop-shadow-[0_0_8px_rgba(183,255,60,0.4)]">
          ➔ AI ENGINE ACTIVATED ➔
        </span>
      </div>

      <div className="absolute top-3 right-4 font-mono text-[8px] tracking-wider text-titanium/45 pointer-events-none select-none">
        GRID_UNIT: [3D-GLTF-V2]
      </div>
      
      <div className="absolute top-3 left-4 font-mono text-[8px] tracking-wider text-accent/40 pointer-events-none select-none group-hover:text-accent/80 transition-colors">
        {loading ? "LOAD MODEL..." : error ? "CORE FALLBACK" : "DRAG TO ROTATE"}
      </div>
    </div>
  );
}
