"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function useScreenTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 192;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.CanvasTexture(canvas);

    ctx.fillStyle = "#07130A";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#46E37B";
    ctx.font = "12px monospace";
    const lines = [
      "> boot --profile naeem",
      "  interface ....... ok",
      "  systems ......... ok",
      "  support desk .... ok",
      "> _",
    ];
    lines.forEach((line, i) => {
      ctx.fillText(line, 12, 30 + i * 20);
    });

    for (let y = 0; y < canvas.height; y += 3) {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, y, canvas.width, 1);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function Monitor() {
  const group = useRef<THREE.Group>(null);
  const baseRotation = useRef(0);
  const screenTexture = useScreenTexture();

  useFrame((state, delta) => {
    if (!group.current) return;
    baseRotation.current += delta * 0.12;
    group.current.rotation.y = baseRotation.current + state.pointer.x * 0.2;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.15,
      0.05
    );
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* base */}
      <mesh position={[0, -1.15, 0]}>
        <cylinderGeometry args={[0.55, 0.65, 0.18, 24]} />
        <meshStandardMaterial color="#C9BE9E" roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 0.4, 16]} />
        <meshStandardMaterial color="#B8AC88" roughness={0.7} />
      </mesh>

      {/* body */}
      <RoundedBox args={[1.9, 1.5, 1.2]} radius={0.12} smoothness={4}>
        <meshStandardMaterial color="#DED2AE" roughness={0.6} />
      </RoundedBox>

      {/* bezel */}
      <RoundedBox
        args={[1.55, 1.15, 0.05]}
        radius={0.06}
        position={[0, 0.08, 0.61]}
      >
        <meshStandardMaterial color="#2B2A22" roughness={0.5} />
      </RoundedBox>

      {/* screen */}
      <mesh position={[0, 0.08, 0.645]}>
        <planeGeometry args={[1.35, 0.95]} />
        <meshBasicMaterial map={screenTexture} toneMapped={false} />
      </mesh>

      {/* knobs */}
      <mesh position={[-0.55, -0.6, 0.62]}>
        <cylinderGeometry args={[0.05, 0.05, 0.04, 12]} />
        <meshStandardMaterial color="#8C816B" />
      </mesh>
      <mesh position={[-0.35, -0.6, 0.62]}>
        <cylinderGeometry args={[0.05, 0.05, 0.04, 12]} />
        <meshStandardMaterial color="#8C816B" />
      </mesh>
    </group>
  );
}

export function TerminalScene() {
  return (
    <Canvas
      camera={{ position: [1.6, 0.6, 2.6], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} />
      <directionalLight position={[-3, -1, -2]} intensity={0.3} color="#46E37B" />
      <Monitor />
    </Canvas>
  );
}
