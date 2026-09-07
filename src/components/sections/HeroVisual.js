"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

function MetalPlate() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh rotation={[0.3, 0.5, 0]}>
        <boxGeometry args={[2.5, 0.08, 1.8]} />
        <MeshDistortMaterial
          color="#2a2a2a"
          metalness={0.9}
          roughness={0.2}
          distort={0.1}
          speed={2}
        />
      </mesh>
      <mesh position={[0, 0.06, 0]} rotation={[0.3, 0.5, 0]}>
        <boxGeometry args={[2.3, 0.02, 1.6]} />
        <meshStandardMaterial color="#c8102e" metalness={0.8} roughness={0.3} />
      </mesh>
    </Float>
  );
}

export default function HeroVisual() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, 2, 2]} color="#c8102e" intensity={0.5} />
      <MetalPlate />
    </Canvas>
  );
}
