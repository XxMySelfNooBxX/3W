"use client";

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleData {
  x: number; y: number; z: number;
  baseSpeed: number; scale: number;
  color: THREE.Color;
  wobble: number;
  wobbleSpeed: number;
}

export default function MarineSnow({ count = 1800, zoneIndex = 0 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const time = useRef(0);
  const currentSpeedMult = useRef(1);
  const currentOpacity = useRef(0.45);
  const currentWobbleMult = useRef(1);

  const particles = useMemo<ParticleData[]>(() => {
    const temp: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 25 - 8;
      const baseSpeed = 0.003 + Math.random() * 0.015;
      const scale = 0.015 + Math.random() * 0.06;
      const wobble = Math.random() * Math.PI * 2;
      const wobbleSpeed = 0.3 + Math.random() * 0.7;

      // Most white, 20% bioluminescent
      let color = new THREE.Color('#e8f4f8');
      const r = Math.random();
      if (r > 0.9) color = new THREE.Color('#00FFFF');
      else if (r > 0.8) color = new THREE.Color('#00FF7F');
      else if (r > 0.7) color = new THREE.Color('#c8e8f0');

      temp.push({ x, y, z, baseSpeed, scale, color, wobble, wobbleSpeed });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!mesh.current) return;
    particles.forEach((p, i) => {
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
      mesh.current!.setColorAt(i, p.color);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, [particles, dummy]);

  useFrame((_, delta) => {
    if (!mesh.current || !materialRef.current) return;
    time.current += delta;
    
    // Determine target multipliers based on depth zone
    let targetSpeed = 1;
    let targetOpacity = 0.45;
    let targetWobbleMult = 1;
    
    if (zoneIndex === 1) { // Twilight (Plunge)
      targetSpeed = 1.8;
      targetOpacity = 0.45;
      targetWobbleMult = 3.0; // High turbulence
    } else if (zoneIndex === 2) { // Midnight (Bioluminescence)
      targetSpeed = 0.6;
      targetOpacity = 0.8; 
      targetWobbleMult = 0.5; // Calmer
    } else if (zoneIndex === 3) { // Abyss (Suspended)
      targetSpeed = 0.2;
      targetOpacity = 0.2;
      targetWobbleMult = 0.1; // Almost still
    }

    // Smoothly lerp towards targets
    currentSpeedMult.current = THREE.MathUtils.lerp(currentSpeedMult.current, targetSpeed, 0.02);
    currentOpacity.current = THREE.MathUtils.lerp(currentOpacity.current, targetOpacity, 0.02);
    currentWobbleMult.current = THREE.MathUtils.lerp(currentWobbleMult.current, targetWobbleMult, 0.02);
    
    materialRef.current.opacity = currentOpacity.current;

    particles.forEach((p, i) => {
      p.y -= (p.baseSpeed * currentSpeedMult.current);
      if (p.y < -30) p.y = 30;

      // Organic horizontal drift using sin wave with dynamic turbulence
      p.wobble += (p.wobbleSpeed * currentSpeedMult.current * 0.05);
      const drift = Math.sin(p.wobble) * (0.008 * currentWobbleMult.current);
      p.x += drift;

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined as any, undefined as any, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial ref={materialRef} transparent opacity={0.45} vertexColors />
    </instancedMesh>
  );
}
