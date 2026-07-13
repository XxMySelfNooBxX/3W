"use client";

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleData {
  x: number; y: number; z: number;
  speed: number; scale: number;
  color: THREE.Color;
  wobble: number;
  wobbleSpeed: number;
}

export default function MarineSnow({ count = 1800 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const time = useRef(0);

  const particles = useMemo<ParticleData[]>(() => {
    const temp: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 25 - 8;
      const speed = 0.003 + Math.random() * 0.015;
      const scale = 0.015 + Math.random() * 0.06;
      const wobble = Math.random() * Math.PI * 2;
      const wobbleSpeed = 0.3 + Math.random() * 0.7;

      // Most white, 20% bioluminescent
      let color = new THREE.Color('#e8f4f8');
      const r = Math.random();
      if (r > 0.9) color = new THREE.Color('#00FFFF');
      else if (r > 0.8) color = new THREE.Color('#00FF7F');
      else if (r > 0.7) color = new THREE.Color('#c8e8f0');

      temp.push({ x, y, z, speed, scale, color, wobble, wobbleSpeed });
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
    if (!mesh.current) return;
    time.current += delta;
    particles.forEach((p, i) => {
      p.y -= p.speed;
      if (p.y < -30) p.y = 30;

      // Organic horizontal drift using sin wave
      const drift = Math.sin(time.current * p.wobbleSpeed + p.wobble) * 0.008;
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
      <meshBasicMaterial transparent opacity={0.45} vertexColors />
    </instancedMesh>
  );
}
