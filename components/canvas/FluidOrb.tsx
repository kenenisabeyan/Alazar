'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const FluidOrb: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Slow continuous rotation
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;

    // Interactive mouse parallax lerp
    const targetX = (state.pointer.x * Math.PI) / 6;
    const targetY = (state.pointer.y * Math.PI) / 6;

    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.05;
  });

  return (
    <mesh ref={meshRef} scale={2.2} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1, 64]} />
      <MeshDistortMaterial
        color="#8B1E3F"
        emissive="#3a0c1a"
        roughness={0.2}
        metalness={0.8}
        distort={0.45}
        speed={2.5}
        wireframe={false}
      />
    </mesh>
  );
};

export default FluidOrb;
