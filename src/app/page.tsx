'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/ui/Navbar';
import LoadingScreen from '@/components/ui/LoadingScreen';
import HeroSection from '@/components/sections/HeroSection';
import LivestockSection from '@/components/sections/LivestockSection';
import ProductsSection from '@/components/sections/ProductsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import SustainabilitySection from '@/components/sections/SustainabilitySection';
import ContactSection from '@/components/sections/ContactSection';
import { scrollState } from '@/lib/scroll';

// Dynamic import prevents SSR crash — Three.js needs window/browser
const FarmScene = dynamic(() => import('@/components/canvas/FarmScene'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  useEffect(() => {
    // Dynamically import Lenis + GSAP to avoid SSR issues
    const boot = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.3,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      // Feed lenis scroll progress to our global scroll state
      // (CameraRig inside R3F reads this on every frame)
      lenis.on('scroll', (e: { progress: number; scroll: number }) => {
        scrollState.progress = e.progress;
        scrollState.y        = e.scroll;
        ScrollTrigger.update();
      });

      // Drive Lenis via GSAP ticker for perfect sync
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      return () => {
        lenis.destroy();
        gsap.ticker.remove(() => {});
      };
    };

    const cleanup = boot();
    return () => { cleanup.then((fn) => fn && fn()); };
  }, []);

  return (
    <>
      {/* ── Loading overlay (manages itself via useProgress hook) ── */}
      <LoadingScreen />

      {/* ── Fixed 3D canvas — always behind everything ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <FarmScene />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ── Sticky Navbar ── */}
      <Navbar />

      {/* ── Scrollable content overlay ── */}
      <main className="relative z-10">
        {/*
          Each section is min-h-screen.
          Total scroll distance ≈ 6 × 100vh.
          The CameraRig maps 0–100% scroll to 6 camera waypoints.
        */}
        <HeroSection />
        <LivestockSection />
        <ProductsSection />
        <ProcessSection />
        <SustainabilitySection />
        <ContactSection />
      </main>
    </>
  );
}
