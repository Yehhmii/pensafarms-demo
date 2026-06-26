'use client';

import { useProgress } from '@react-three/drei';
import { useEffect, useRef } from 'react';

export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef     = useRef<HTMLDivElement>(null);
  const numRef     = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.width = `${progress}%`;
    }
    if (numRef.current) {
      numRef.current.textContent = `${Math.round(progress)}`;
    }
  }, [progress]);

  useEffect(() => {
    if (!active && overlayRef.current) {
      // Fade out once loading is done
      overlayRef.current.style.transition = 'opacity 0.9s ease, visibility 0.9s ease';
      overlayRef.current.style.opacity    = '0';
      overlayRef.current.style.visibility = 'hidden';
    }
  }, [active]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-forest-deep"
      style={{ opacity: 1, visibility: 'visible' }}
    >
      {/* Brand mark */}
      <div className="mb-12 text-center">
        <p className="font-nunito text-grass-light text-xs tracking-[0.35em] uppercase mb-4">
          Welcome to
        </p>
        <h1 className="font-fraunces font-bold text-5xl text-cream italic">
          PensaFarms
        </h1>
        <p className="font-nunito text-cream/40 text-sm mt-2 tracking-widest uppercase">
          From Our Pastures to Your Table
        </p>
      </div>

      {/* Leaf decoration */}
      <div className="text-4xl mb-10 animate-float">🌿</div>

      {/* Progress bar */}
      <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden mb-3">
        <div
          ref={barRef}
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: '0%',
            background: 'linear-gradient(90deg, #3a7d44, #5ab54c, #f4a800)',
          }}
        />
      </div>

      <p className="font-nunito text-cream/30 text-xs tracking-widest">
        <span ref={numRef}>0</span>%
      </p>
    </div>
  );
}
