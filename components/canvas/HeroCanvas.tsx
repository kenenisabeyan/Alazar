'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import FluidOrb from './FluidOrb';
import ParticleField from './ParticleField';

export const HeroCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        
        {/* Cinematic Crimson Studio Lights */}
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#8B1E3F" />
        <directionalLight position={[-5, -5, -2]} intensity={0.8} color="#a3234a" />
        <pointLight position={[0, 0, 3]} intensity={1.5} color="#8B1E3F" />

        <Suspense fallback={null}>
          <FluidOrb />
          <ParticleField count={1000} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
