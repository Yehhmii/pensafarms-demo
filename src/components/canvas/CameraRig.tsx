'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CAMERA_WAYPOINTS } from '@/lib/constants';
import { scrollState } from '@/lib/scroll';

export default function CameraRig() {
  const { camera } = useThree();

  // Keep lerped values in refs so we never cause React re-renders
  const lerpedPos    = useRef(new THREE.Vector3(0, 5, 16));
  const lerpedTarget = useRef(new THREE.Vector3(0, 0, 0));
  const targetPos    = useRef(new THREE.Vector3());
  const targetLook   = useRef(new THREE.Vector3());

  useFrame(() => {
    const p     = Math.min(Math.max(scrollState.progress, 0), 1);
    const total = CAMERA_WAYPOINTS.length - 1;

    const raw = p * total;
    const idx = Math.min(Math.floor(raw), total - 1);
    const t   = raw - idx; // 0 → 1 within this segment

    // Ease-in-out quad so camera doesn't snap between waypoints
    const eased = t < 0.5
      ? 2 * t * t
      : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const from = CAMERA_WAYPOINTS[idx];
    const to   = CAMERA_WAYPOINTS[Math.min(idx + 1, total)];

    targetPos.current.set(
      THREE.MathUtils.lerp(from.position[0], to.position[0], eased),
      THREE.MathUtils.lerp(from.position[1], to.position[1], eased),
      THREE.MathUtils.lerp(from.position[2], to.position[2], eased),
    );

    targetLook.current.set(
      THREE.MathUtils.lerp(from.target[0], to.target[0], eased),
      THREE.MathUtils.lerp(from.target[1], to.target[1], eased),
      THREE.MathUtils.lerp(from.target[2], to.target[2], eased),
    );

    // 0.04 damping — silky lag behind scroll, not jittery
    lerpedPos.current.lerp(targetPos.current, 0.04);
    lerpedTarget.current.lerp(targetLook.current, 0.04);

    camera.position.copy(lerpedPos.current);
    camera.lookAt(lerpedTarget.current);
  });

  return null;
}
