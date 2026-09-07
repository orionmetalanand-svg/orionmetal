"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const HEAD_TRAVEL = 1.75;
const headX = (t) => Math.sin(t * 0.5) * HEAD_TRAVEL;
const headZ = (t) => Math.cos(t * 0.22) * 0.85;

/* Perforated sheet-metal plate */
function Plate() {
  const holeGeometry = useMemo(
    () => new THREE.CylinderGeometry(0.075, 0.075, 0.14, 14),
    []
  );
  const holeMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#040406", roughness: 1 }),
    []
  );

  const holes = useMemo(() => {
    const positions = [];
    for (let x = -1.75; x <= 1.75; x += 0.5) {
      for (let z = -0.9; z <= 0.9; z += 0.6) {
        positions.push([x, 0, z]);
      }
    }
    return positions;
  }, []);

  return (
    <group>
      <mesh receiveShadow castShadow>
        <boxGeometry args={[4.4, 0.1, 2.6]} />
        <meshStandardMaterial color="#1a1a20" metalness={0.95} roughness={0.32} />
      </mesh>

      {/* Red edge accent strips */}
      <mesh position={[0, 0.052, 1.24]}>
        <boxGeometry args={[4.4, 0.012, 0.06]} />
        <meshStandardMaterial
          color="#e11d2e"
          emissive="#ff3348"
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0.052, -1.24]}>
        <boxGeometry args={[4.4, 0.012, 0.06]} />
        <meshStandardMaterial
          color="#e11d2e"
          emissive="#ff3348"
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>

      {holes.map((pos, i) => (
        <mesh key={i} position={pos} geometry={holeGeometry} material={holeMaterial} />
      ))}
    </group>
  );
}

/* Laser head + beam */
function LaserAssembly() {
  const headRef = useRef(null);
  const beamRef = useRef(null);
  const impactRef = useRef(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const x = headX(t);
    const z = headZ(t);

    if (headRef.current) headRef.current.position.set(x, 1.15, z);
    if (beamRef.current) {
      beamRef.current.position.set(x, 0.6, z);
      const flicker = 0.55 + Math.sin(t * 26) * 0.14;
      beamRef.current.material.opacity = flicker;
    }
    if (impactRef.current) {
      impactRef.current.position.set(x, 0.08, z);
      const s = 1 + Math.sin(t * 18) * 0.28;
      impactRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <group ref={headRef}>
        <mesh>
          <cylinderGeometry args={[0.13, 0.05, 0.42, 18]} />
          <meshStandardMaterial color="#26262e" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.34, 0.2, 0.34]} />
          <meshStandardMaterial color="#14141a" metalness={0.85} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.24, 0]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial
            color="#ff3348"
            emissive="#ff3348"
            emissiveIntensity={4}
            toneMapped={false}
          />
        </mesh>
      </group>

      <mesh ref={beamRef}>
        <cylinderGeometry args={[0.016, 0.05, 0.95, 12, 1, true]} />
        <meshBasicMaterial
          color="#ff3348"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={impactRef} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.14, 24]} />
        <meshBasicMaterial
          color="#ff5a45"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* Spark particles at the cut point */
function Sparks({ count = 70 }) {
  const pointsRef = useRef(null);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) {
      seeds[i * 4] = Math.random() * Math.PI * 2;
      seeds[i * 4 + 1] = 0.5 + Math.random() * 1.4;
      seeds[i * 4 + 2] = Math.random();
      seeds[i * 4 + 3] = 0.45 + Math.random() * 0.55;
    }
    return { positions, seeds };
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const originX = headX(t);
    const originZ = headZ(t);
    const arr = pointsRef.current?.geometry.attributes.position.array;
    if (!arr) return;

    for (let i = 0; i < count; i++) {
      const angle = seeds[i * 4];
      const speed = seeds[i * 4 + 1];
      const offset = seeds[i * 4 + 2];
      const spread = seeds[i * 4 + 3];

      const life = (t * speed + offset * 3) % 1;
      const radius = life * spread * 0.9;

      arr[i * 3] = originX + Math.cos(angle) * radius;
      arr[i * 3 + 1] = 0.08 + life * 0.55 - life * life * 0.75;
      arr[i * 3 + 2] = originZ + Math.sin(angle) * radius * 0.65;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#ff6a3d"
        transparent
        opacity={0.95}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

/* Slowly rotating rig */
function Rig({ children }) {
  const groupRef = useRef(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = -0.5 + Math.sin(t * 0.13) * 0.32;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.06;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.42, -0.5, 0]}>
      {children}
    </group>
  );
}

export default function HeroVisual() {
  return (
    <Canvas
      camera={{ position: [0, 2.4, 5.2], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 7, 4]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-3.5, 2, 2.5]} intensity={18} color="#e11d2e" distance={12} />
      <pointLight position={[3, 1.4, -2.5]} intensity={9} color="#ffffff" distance={12} />

      <Rig>
        <Plate />
        <LaserAssembly />
        <Sparks />
      </Rig>

      <gridHelper
        args={[24, 24, "#22222a", "#141418"]}
        position={[0, -1.6, 0]}
      />
      <fog attach="fog" args={["#08080a", 6, 15]} />
    </Canvas>
  );
}
