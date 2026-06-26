'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sprout, ArrowRight, Mouse } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Fade out content on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 15 }
    }
  };

  return (
    <motion.section
      id="hero"
      ref={sectionRef}
      style={{ opacity, minHeight: '100vh' }}
      className="section-base flex flex-col justify-end pb-16 px-6 md:px-16 lg:px-24"
    >
      <motion.div 
        className="max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Eyebrow */}
        <motion.p
          variants={itemVariants}
          className="font-nunito text-grass-light text-xs font-700 tracking-[0.35em] uppercase mb-5 flex items-center gap-3"
        >
          <Sprout size={16} className="text-gold" />
          Premium Farm Produce · Est. 2012
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-fraunces font-black text-cream leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
        >
          Where the Land{' '}
          <em className="text-gradient-green not-italic">Feeds</em>
          <br />
          the World.
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={itemVariants}
          className="font-nunito text-cream/65 text-lg leading-relaxed mb-10 max-w-lg"
        >
          Premium livestock and fresh farm produce, raised with heart on our
          sprawling pastures — chickens, beef cattle, dairy, eggs and beyond.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#livestock"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#livestock')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-glow inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-forest-deep font-nunito font-800 px-7 py-3.5 rounded-full transition-colors duration-200 text-base group"
          >
            Explore Our Farm
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 border border-grass-light/30 hover:border-grass-light text-cream font-nunito font-600 px-7 py-3.5 rounded-full transition-colors duration-200 text-base"
          >
            Get a Quote
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="scroll-indicator absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2"
      >
        <p className="font-nunito text-cream/30 text-[10px] tracking-[0.3em] uppercase rotate-90 mb-6 origin-center">
          Scroll
        </p>
        <Mouse size={16} className="text-grass-light/60 mb-2 animate-bounce" />
        <div className="w-[1px] h-10 bg-gradient-to-b from-grass-light/60 to-transparent" />
      </motion.div>
    </motion.section>
  );
}
