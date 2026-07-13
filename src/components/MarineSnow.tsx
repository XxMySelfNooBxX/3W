"use client";

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function MarineSnow({ count = 2000 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 20 - 5; 
      const speed = 0.01 + Math.random() * 0.03;
      const scale = 0.02 + Math.random() * 0.08;
      
      // Distribute colors for bioluminescence
      let color = new THREE.Color('#ffffff');
      if (Math.random() > 0.8) {
        color = new THREE.Color(Math.random() > 0.5 ? '#00FFFF' : '#00FF7F');
      }

      temp.push({ x, y, z, speed, scale, color });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.scale.set(particle.scale, particle.scale, particle.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
      mesh.current!.setColorAt(i, particle.color);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, [particles, dummy]);

  useFrame(() => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      particle.y -= particle.speed;
      if (particle.y < -25) {
        particle.y = 25; // reset to top
      }
      
      // Slight horizontal drift
      particle.x += Math.sin(particle.y * 0.5) * 0.01;

      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.scale.set(particle.scale, particle.scale, particle.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined as any, undefined as any, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial 
        transparent 
        opacity={0.7} 
        vertexColors 
      />
    </instancedMesh>
  );
}
