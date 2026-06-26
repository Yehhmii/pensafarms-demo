'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { STATS } from '@/lib/constants';
import { Globe, Recycle, Droplet, Leaf, Sun, Bird } from 'lucide-react';

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(0, target, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (value) => {
          if (nodeRef.current) {
            nodeRef.current.textContent = `${Math.round(value)}${suffix}`;
          }
        }
      });
      return controls.stop;
    }
  }, [isInView, target, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

const getPillarIcon = (pillStr: string) => {
  if (pillStr.includes('♻️')) return <Recycle size={14} className="text-grass-light" />;
  if (pillStr.includes('💧')) return <Droplet size={14} className="text-grass-light" />;
  if (pillStr.includes('🌱')) return <Leaf size={14} className="text-grass-light" />;
  if (pillStr.includes('🌞')) return <Sun size={14} className="text-grass-light" />;
  if (pillStr.includes('🐦')) return <Bird size={14} className="text-grass-light" />;
  return <Leaf size={14} className="text-grass-light" />;
};

export default function SustainabilitySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 15 } }
  };

  const pillars = [
    '♻️ Zero chemical runoff',
    '💧 Rainwater harvesting',
    '🌱 Organic feed supplements',
    '🌞 Solar-powered facilities',
    '🐦 Wildlife corridors maintained',
  ];

  return (
    <section
      id="sustainability"
      className="section-base flex flex-col items-center justify-center px-6 md:px-16 py-24 text-center"
    >
      <motion.div 
        className="w-full max-w-3xl flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-16 max-w-2xl">
          <p className="font-nunito text-grass-light text-xs font-700 tracking-[0.35em] uppercase mb-4 flex items-center justify-center gap-2">
            <Globe size={16} className="text-gold" />
            Our Impact
          </p>
          <h2
            className="font-fraunces font-black text-cream leading-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Growing the{' '}
            <em className="text-gradient-green not-italic">Right Way.</em>
          </h2>
          <p className="font-nunito text-cream/55 text-base leading-relaxed max-w-lg mx-auto">
            We believe farming should leave the land better than we found it.
            Every decision on PensaFarms is made with the next generation in mind.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -8, scale: 1.05 }}
              className="glass-premium p-6 text-center shadow-lg transition-colors group"
            >
              <p
                className="font-fraunces font-black text-gold counter-number leading-none mb-2 text-glow transition-all duration-300 group-hover:text-gold-light"
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-nunito text-cream/55 text-xs font-600 uppercase tracking-wider group-hover:text-cream/80 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Sustainability pillars */}
        <motion.div variants={itemVariants} className="mt-12 flex flex-wrap justify-center gap-3 max-w-2xl">
          {pillars.map((pill) => (
            <motion.span
              key={pill}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(90,181,76,0.1)' }}
              className="font-nunito text-xs text-cream/70 border border-grass-dark/40 px-4 py-2 rounded-full flex items-center gap-2 cursor-default transition-colors duration-300 hover:border-grass-light/60 hover:text-cream"
            >
              {getPillarIcon(pill)}
              {pill.substring(3)}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
