"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

interface ColumnData {
  x: number;
  z: number;
  baseHeight: number;
  speed: number;
  phase: number;
  artistIndex: number;
}

// Procedural texture generator for cardboard/concrete scratch effect
function createNoiseTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  
  // Base concrete/cardboard color
  ctx.fillStyle = "#1e1e21";
  ctx.fillRect(0, 0, 512, 512);

  // Add noise
  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 12;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
    data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  // Draw scratches/wear
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 15; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 512, Math.random() * 512);
    ctx.lineTo(Math.random() * 512, Math.random() * 512);
    ctx.stroke();
  }
  
  // Draw vertical thin slots representing light windows
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(250 + i * 4, 0, 2, 512);
  }

  return new THREE.CanvasTexture(canvas);
}

const ARTIST_COLORS = [
  new THREE.Color("#e84f3d"), // Nikitka AI - Red
  new THREE.Color("#246bfe"), // Nikita Kizevich - Blue
  new THREE.Color("#0c8f69"), // NIKITAAL - Emerald
  new THREE.Color("#b91646"), // Niko Xian - Crimson
  new THREE.Color("#e00078"), // NKVIS - Pink
  new THREE.Color("#00ff66"), // Kezevix - Green
  new THREE.Color("#ff5722"), // Niquiano - Orange
  new THREE.Color("#cdaa54"), // Nita Kizevich - Gold
];

function Columns({ hoveredArtistIndex }: { hoveredArtistIndex: number | null }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  const gridX = 24;
  const gridZ = 12;
  const count = gridX * gridZ;

  const texture = useMemo(() => createNoiseTexture(), []);

  // Set up instance properties
  const columns = useMemo<ColumnData[]>(() => {
    const list: ColumnData[] = [];
    for (let x = 0; x < gridX; x++) {
      for (let z = 0; z < gridZ; z++) {
        // Calculate which artist section this column belongs to (0 to 7)
        // Grouping columns horizontally into 8 columns lanes
        const artistIndex = Math.floor((x / gridX) * 8);
        list.push({
          x: (x - gridX / 2) * 1.8,
          z: (z - gridZ / 2) * 2.2 - 10,
          baseHeight: Math.random() * 8 + 4,
          speed: Math.random() * 1.2 + 0.6,
          phase: Math.random() * Math.PI * 2,
          artistIndex,
        });
      }
    }
    return list;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    columns.forEach((col, i) => {
      const isHoveredSection = hoveredArtistIndex === col.artistIndex;
      
      // Dynamic height calculation (equalizer effect)
      let scaleY = col.baseHeight + Math.sin(time * col.speed + col.phase) * 3;
      
      // Boost scale and speed if its section is hovered
      if (isHoveredSection) {
        scaleY *= 1.4;
        scaleY += Math.sin(time * 6 + col.phase) * 2.5; // faster jitter
      }

      // Smooth camera breathing affect
      dummy.position.set(col.x, scaleY / 2 - 10, col.z);
      dummy.scale.set(1, scaleY, 1);
      dummy.rotation.y = Math.sin(time * 0.05 + col.phase * 0.1) * 0.05;
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      // Color setting
      let colColor = new THREE.Color("#2a2a2e"); // default dim color
      if (hoveredArtistIndex !== null) {
        if (isHoveredSection) {
          colColor.copy(ARTIST_COLORS[col.artistIndex]).multiplyScalar(1.5);
        } else {
          colColor.multiplyScalar(0.2); // dim others more when hovered
        }
      } else {
        // Subtle color drift in passive state
        colColor.lerp(ARTIST_COLORS[col.artistIndex], 0.15);
      }
      meshRef.current!.setColorAt(i, colColor);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        roughness={0.8}
        metalness={0.4}
        map={texture}
        bumpMap={texture}
        bumpScale={0.03}
      />
    </instancedMesh>
  );
}

function Scene({ hoveredArtistIndex }: { hoveredArtistIndex: number | null }) {
  const { camera } = useThree();

  // Camera breathing / idle movement
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.2) * 1.5;
    camera.position.y = 5 + Math.cos(t * 0.3) * 0.8;
    camera.lookAt(0, 0, -10);
  });

  return (
    <>
      <color attach="background" args={["#09090b"]} />
      
      {/* Volumetric Fog */}
      <fogExp2 attach="fog" args={["#09090b", 0.035]} />

      <ambientLight intensity={0.15} />

      {/* Point lights for spotlight volumetric feel */}
      <pointLight position={[0, 20, -5]} intensity={1.5} color="#ffffff" castShadow />
      <directionalLight position={[10, 20, 10]} intensity={0.5} />

      {/* Floating dust particles */}
      <Particles count={250} />

      <Columns hoveredArtistIndex={hoveredArtistIndex} />

      {/* Floor reflection simulation plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10.1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#050507" roughness={0.3} metalness={0.8} />
      </mesh>
    </>
  );
}

function Particles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 50;
      pos[i+1] = Math.random() * 20 - 10;
      pos[i+2] = (Math.random() - 0.5) * 40 - 10;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.015;
    pointsRef.current.position.y = Math.sin(t * 0.1) * 0.5;
  });

  return (
    <points ref={pointsRef} geometry={particlesGeo}>
      <pointsMaterial
        size={0.06}
        color="#8899aa"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function AmbientMixer({ hoveredArtistIndex }: { hoveredArtistIndex: number | null }) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <Canvas
        shadows
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 5, 20], fov: 60 }}
      >
        <Scene hoveredArtistIndex={hoveredArtistIndex} />
        <EffectComposer>
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.85}
            luminanceSmoothing={0.1}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
