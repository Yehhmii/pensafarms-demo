'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import CameraRig from './CameraRig';
import ProceduralFarm from './ProceduralFarm';

export default function FarmScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}                         // cap at 1.5x — keeps mobile fast
      camera={{ position: [0, 5, 16], fov: 48 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      performance={{ min: 0.5 }}              // R3F auto-degrades on slow devices
    >
      <Suspense fallback={null}>
        {/* Subtle sunset environment for warm reflections */}
        <Environment preset="sunset" />

        {/* All farm geometry */}
        <ProceduralFarm />

        {/* Scroll-driven camera */}
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}
