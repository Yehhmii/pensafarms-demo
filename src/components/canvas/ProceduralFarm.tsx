'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TREE_POSITIONS, COW_POSITIONS, CHICKEN_POSITIONS } from '@/lib/constants';

// ─── Terrain ──────────────────────────────────────────────────────
function Terrain() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(100, 100, 80, 80);
    const pos = geo.attributes.position.array as Float32Array;
    const colors = new Float32Array(pos.length);

    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i];
      const y = pos[i + 1];

      // Rolling hill height function
      const h =
        Math.sin(x * 0.11) * Math.cos(y * 0.09) * 2.2 +
        Math.sin(x * 0.28 + 1.4) * Math.sin(y * 0.22 + 0.9) * 0.9 +
        Math.sin(x * 0.055 - y * 0.075 + 2.0) * 1.5 -
        1.8;

      pos[i + 2] = h;

      // Vertex colour — darker in valleys, brighter on hilltops
      const t = Math.min(Math.max((h + 2.5) / 4, 0), 1);
      colors[i]     = THREE.MathUtils.lerp(0.10, 0.28, t); // R
      colors[i + 1] = THREE.MathUtils.lerp(0.25, 0.52, t); // G
      colors[i + 2] = THREE.MathUtils.lerp(0.10, 0.20, t); // B
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      position={[0, -0.6, 0]}
    >
      <meshStandardMaterial vertexColors roughness={1} metalness={0} />
    </mesh>
  );
}

// ─── Instanced trees ──────────────────────────────────────────────
function Trees() {
  const count = TREE_POSITIONS.length;
  const trunkRef  = useRef<THREE.InstancedMesh>(null!);
  const canopy1Ref = useRef<THREE.InstancedMesh>(null!);
  const canopy2Ref = useRef<THREE.InstancedMesh>(null!);

  useEffect(() => {
    const dummy = new THREE.Object3D();
    const color  = new THREE.Color();

    TREE_POSITIONS.forEach(([x, , z], i) => {
      const scale = 0.75 + Math.abs(Math.sin(i * 7.31)) * 0.55;

      // Trunk
      dummy.position.set(x, 0.5 * scale - 0.6, z);
      dummy.scale.setScalar(scale);
      dummy.rotation.y = i * 1.13;
      dummy.updateMatrix();
      trunkRef.current.setMatrixAt(i, dummy.matrix);

      // Lower canopy
      dummy.position.set(x, 1.7 * scale - 0.6, z);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      canopy1Ref.current.setMatrixAt(i, dummy.matrix);
      // Slight hue variation on lower canopy
      color.setHSL(0.33 + (Math.sin(i * 3.7) * 0.03), 0.55 + Math.random() * 0.2, 0.22 + Math.random() * 0.1);
      canopy1Ref.current.setColorAt(i, color);

      // Upper canopy
      dummy.position.set(x, 2.45 * scale - 0.6, z);
      dummy.scale.set(scale * 0.72, scale * 0.72, scale * 0.72);
      dummy.updateMatrix();
      canopy2Ref.current.setMatrixAt(i, dummy.matrix);
      color.setHSL(0.35 + (Math.sin(i * 4.1) * 0.03), 0.6, 0.28 + Math.random() * 0.1);
      canopy2Ref.current.setColorAt(i, color);
    });

    trunkRef.current.instanceMatrix.needsUpdate = true;
    canopy1Ref.current.instanceMatrix.needsUpdate = true;
    canopy2Ref.current.instanceMatrix.needsUpdate = true;
    if (canopy1Ref.current.instanceColor) canopy1Ref.current.instanceColor.needsUpdate = true;
    if (canopy2Ref.current.instanceColor) canopy2Ref.current.instanceColor.needsUpdate = true;
  }, []);

  const trunkGeo  = useMemo(() => new THREE.CylinderGeometry(0.12, 0.20, 1.4, 6), []);
  const canopy1Geo = useMemo(() => new THREE.ConeGeometry(1.1, 1.8, 7), []);
  const canopy2Geo = useMemo(() => new THREE.ConeGeometry(0.75, 1.3, 7), []);
  const trunkMat  = useMemo(() => new THREE.MeshStandardMaterial({ color: '#5c3d1e', roughness: 0.95 }), []);
  const canopyMat = useMemo(() => new THREE.MeshStandardMaterial({ roughness: 0.85, vertexColors: false }), []);

  return (
    <>
      <instancedMesh ref={trunkRef}   args={[trunkGeo,   trunkMat,  count]} castShadow />
      <instancedMesh ref={canopy1Ref} args={[canopy1Geo, canopyMat, count]} castShadow />
      <instancedMesh ref={canopy2Ref} args={[canopy2Geo, canopyMat, count]} castShadow />
    </>
  );
}

// ─── Barn ─────────────────────────────────────────────────────────
function Barn() {
  return (
    <group position={[-4.5, 0, -3.5]}>
      {/* Main body */}
      <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 3.2, 5.5]} />
        <meshStandardMaterial color="#7a2020" roughness={0.9} />
      </mesh>
      {/* Roof ridge */}
      <mesh position={[0, 3.8, 0]} castShadow>
        <coneGeometry args={[3.5, 2.2, 4, 1]} />
        <meshStandardMaterial color="#4d1010" roughness={0.9} />
      </mesh>
      {/* Front wall facing camera — cream boards */}
      <mesh position={[0, 1.6, 2.76]}>
        <planeGeometry args={[4.5, 3.2]} />
        <meshStandardMaterial color="#f0e8d5" roughness={0.9} side={THREE.FrontSide} />
      </mesh>
      {/* Big barn door */}
      <mesh position={[0, 0.9, 2.77]} castShadow>
        <boxGeometry args={[1.6, 1.8, 0.05]} />
        <meshStandardMaterial color="#3a1a00" roughness={0.95} />
      </mesh>
      {/* Left window */}
      <mesh position={[-1.4, 2.0, 2.77]}>
        <boxGeometry args={[0.7, 0.7, 0.04]} />
        <meshStandardMaterial color="#88bbdd" roughness={0.2} metalness={0.1} transparent opacity={0.7} />
      </mesh>
      {/* Right window */}
      <mesh position={[1.4, 2.0, 2.77]}>
        <boxGeometry args={[0.7, 0.7, 0.04]} />
        <meshStandardMaterial color="#88bbdd" roughness={0.2} metalness={0.1} transparent opacity={0.7} />
      </mesh>
      {/* Warm barn light (point light inside) */}
      <pointLight position={[0, 2, 0]} intensity={1.2} color="#ff9944" distance={8} />
    </group>
  );
}

// ─── Silo ─────────────────────────────────────────────────────────
function Silo() {
  return (
    <group position={[-7.2, 0, -3]}>
      {/* Body */}
      <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.85, 0.85, 4.4, 12]} />
        <meshStandardMaterial color="#c8b89a" roughness={0.85} />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 4.6, 0]} castShadow>
        <coneGeometry args={[1.0, 1.2, 12]} />
        <meshStandardMaterial color="#8a6040" roughness={0.9} />
      </mesh>
    </group>
  );
}

// ─── Cows ─────────────────────────────────────────────────────────
function Cow({ position, rotY = 0 }: { position: [number, number, number]; rotY?: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const phaseRef = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    // Subtle idle head bob
    const t = state.clock.elapsedTime + phaseRef.current;
    if (groupRef.current) {
      groupRef.current.rotation.y = rotY + Math.sin(t * 0.3) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, rotY, 0]}>
      {/* Body */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[1.7, 0.95, 0.85]} />
        <meshStandardMaterial color="#e2d8c8" roughness={0.9} />
      </mesh>
      {/* Head */}
      <mesh position={[0.95, 1.05, 0]} castShadow>
        <boxGeometry args={[0.6, 0.5, 0.52]} />
        <meshStandardMaterial color="#e2d8c8" roughness={0.9} />
      </mesh>
      {/* Snout */}
      <mesh position={[1.27, 0.95, 0]} castShadow>
        <boxGeometry args={[0.18, 0.22, 0.38]} />
        <meshStandardMaterial color="#e0b090" roughness={0.9} />
      </mesh>
      {/* Brown patch */}
      <mesh position={[-0.2, 1.0, 0.43]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.45, 0.35]} />
        <meshStandardMaterial color="#4a2a10" roughness={0.9} side={THREE.FrontSide} />
      </mesh>
      {/* Legs */}
      {([ [-0.55, -0.35], [-0.55, 0.35], [0.55, -0.35], [0.55, 0.35] ] as [number, number][]).map(([lx, lz], i) => (
        <mesh key={i} position={[lx, 0.22, lz]} castShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.68, 6]} />
          <meshStandardMaterial color="#ccc0b0" roughness={0.9} />
        </mesh>
      ))}
      {/* Tail */}
      <mesh position={[-0.9, 0.85, 0]} rotation={[0, 0, 0.4]} castShadow>
        <cylinderGeometry args={[0.03, 0.01, 0.55, 5]} />
        <meshStandardMaterial color="#ccc0b0" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Cows() {
  const rotations = [0.3, -0.5, 1.1, -0.2, 0.8, -1.0];
  return (
    <>
      {COW_POSITIONS.map((pos, i) => (
        <Cow key={i} position={pos} rotY={rotations[i] ?? 0} />
      ))}
    </>
  );
}

// ─── Chickens ─────────────────────────────────────────────────────
function Chicken({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!);
  const phaseRef = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 2.5 + phaseRef.current;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.abs(Math.sin(t)) * 0.04;
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <sphereGeometry args={[0.2, 8, 7]} />
        <meshStandardMaterial color="#f5e2b0" roughness={0.9} />
      </mesh>
      {/* Head */}
      <mesh position={[0.2, 0.42, 0]} castShadow>
        <sphereGeometry args={[0.13, 8, 7]} />
        <meshStandardMaterial color="#f5e2b0" roughness={0.9} />
      </mesh>
      {/* Beak */}
      <mesh position={[0.34, 0.40, 0]} rotation={[0, 0, -0.3]} castShadow>
        <coneGeometry args={[0.03, 0.1, 5]} />
        <meshStandardMaterial color="#e8a020" roughness={0.8} />
      </mesh>
      {/* Comb */}
      <mesh position={[0.2, 0.57, 0]} castShadow>
        <boxGeometry args={[0.06, 0.1, 0.14]} />
        <meshStandardMaterial color="#e02020" roughness={0.8} />
      </mesh>
      {/* Legs */}
      {([-0.06, 0.06] as number[]).map((lz, i) => (
        <mesh key={i} position={[0, 0.04, lz]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.16, 4]} />
          <meshStandardMaterial color="#e8a020" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Chickens() {
  return (
    <>
      {CHICKEN_POSITIONS.map((pos, i) => (
        <Chicken key={i} position={pos} />
      ))}
    </>
  );
}

// ─── Fence ────────────────────────────────────────────────────────
function Fence() {
  const railMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#8c6a3a', roughness: 0.95 }), []);
  const postMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#6b4a22', roughness: 0.95 }), []);

  const postGeo = useMemo(() => new THREE.BoxGeometry(0.09, 1.3, 0.09), []);
  const railGeo = useMemo(() => new THREE.BoxGeometry(0.07, 0.055, 0.055), []);

  const POST_COUNT = 18;
  const FENCE_LENGTH = 16;

  const postRef = useRef<THREE.InstancedMesh>(null!);
  const railTopRef = useRef<THREE.InstancedMesh>(null!);
  const railBotRef = useRef<THREE.InstancedMesh>(null!);

  useEffect(() => {
    const dummy = new THREE.Object3D();
    for (let i = 0; i < POST_COUNT; i++) {
      const x = -FENCE_LENGTH / 2 + (i / (POST_COUNT - 1)) * FENCE_LENGTH;
      dummy.position.set(x, 0.65 - 0.6, 4.5);
      dummy.scale.setScalar(1);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      postRef.current?.setMatrixAt(i, dummy.matrix);

      // Top rail segment
      const segLen = FENCE_LENGTH / (POST_COUNT - 1);
      dummy.position.set(x + segLen / 2, 1.1 - 0.6, 4.5);
      dummy.scale.set(segLen, 1, 1);
      dummy.updateMatrix();
      railTopRef.current?.setMatrixAt(i, dummy.matrix);

      // Bottom rail segment
      dummy.position.set(x + segLen / 2, 0.5 - 0.6, 4.5);
      dummy.updateMatrix();
      railBotRef.current?.setMatrixAt(i, dummy.matrix);
    }
    postRef.current.instanceMatrix.needsUpdate = true;
    railTopRef.current.instanceMatrix.needsUpdate = true;
    railBotRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <>
      <instancedMesh ref={postRef}    args={[postGeo, postMat, POST_COUNT]} castShadow />
      <instancedMesh ref={railTopRef} args={[railGeo, railMat, POST_COUNT]} castShadow />
      <instancedMesh ref={railBotRef} args={[railGeo, railMat, POST_COUNT]} castShadow />
    </>
  );
}

// ─── Hay bales ────────────────────────────────────────────────────
function HayBales() {
  const hayMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d4a828', roughness: 0.95 }), []);
  const baleGeo = useMemo(() => new THREE.CylinderGeometry(0.55, 0.55, 0.75, 12), []);
  const positions: [number, number, number][] = [
    [2, -0.22, -1], [2.9, -0.22, -1.5], [1.5, -0.22, -2],
  ];

  return (
    <>
      {positions.map(([x, y, z], i) => (
        <mesh key={i} args={[baleGeo, hayMat]} position={[x, y, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.55, 0.55, 0.75, 12]} />
          <meshStandardMaterial color="#d4a828" roughness={0.95} />
        </mesh>
      ))}
    </>
  );
}

// ─── Atmospheric particles (pollen / fireflies) ───────────────────
function AtmosphereParticles() {
  const count = 300;
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = Math.random() * 12 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      ph[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, phases: ph };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, [positions]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] = positions[i * 3 + 1] + Math.sin(t * 0.4 + phases[i]) * 0.35;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        size={0.04}
        color="#ffd060"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Full scene export ────────────────────────────────────────────
export default function ProceduralFarm() {
  return (
    <group>
      {/* Lighting */}
      <hemisphereLight args={['#b8d8f0', '#1a3d20', 0.65]} />
      <ambientLight intensity={0.3} color="#fff8ee" />
      <directionalLight
        position={[12, 18, 10]}
        intensity={2.0}
        color="#fff5d8"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-camera-far={80}
        shadow-bias={-0.001}
      />

      {/* Scene fog */}
      <fog attach="fog" args={['#071a0d', 20, 60]} />

      {/* Environment */}
      <Terrain />
      <Trees />
      <Fence />

      {/* Farm structures */}
      <Barn />
      <Silo />
      <HayBales />

      {/* Animals */}
      <Cows />
      <Chickens />

      {/* Atmosphere */}
      <AtmosphereParticles />
    </group>
  );
}
