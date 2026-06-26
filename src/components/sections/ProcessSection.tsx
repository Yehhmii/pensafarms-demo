'use client';

import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '@/lib/constants';
import { Settings, Leaf, Scale, Tractor } from 'lucide-react';

const getProcessIcon = (iconStr: string) => {
  if (iconStr.includes('🌱')) return <Leaf size={20} className="text-grass-light" strokeWidth={2} />;
  if (iconStr.includes('⚖️')) return <Scale size={20} className="text-grass-light" strokeWidth={2} />;
  if (iconStr.includes('🚜')) return <Tractor size={20} className="text-grass-light" strokeWidth={2} />;
  return <Leaf size={20} className="text-grass-light" strokeWidth={2} />;
};

export default function ProcessSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 50, damping: 15 } }
  };

  return (
    <section
      id="process"
      className="section-base flex items-center justify-center px-6 md:px-16 lg:px-24 py-24"
    >
      <motion.div 
        className="w-full max-w-xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="font-nunito text-grass-light text-xs font-700 tracking-[0.35em] uppercase mb-4 flex items-center justify-center gap-2">
            <Settings size={16} className="text-gold animate-spin-slow" />
            How We Work
          </p>
          <h2
            className="font-fraunces font-black text-cream leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
          >
            Three Simple{' '}
            <em className="text-gradient-green not-italic">Promises.</em>
          </h2>
        </motion.div>

        {/* Steps with vertical timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[22px] top-3 bottom-3 w-[2px] bg-grass-dark/40 rounded-full">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              className="absolute inset-0 rounded-full origin-top"
              style={{
                background: 'linear-gradient(180deg, #5ab54c, #f4a800)'
              }}
            />
          </div>

          <div className="flex flex-col gap-10">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="flex gap-6 items-start group"
              >
                {/* Node */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative z-10 flex-shrink-0 w-11 h-11 rounded-full border-2 border-grass-light bg-forest-deep flex items-center justify-center shadow-[0_0_15px_rgba(90,181,76,0.2)]"
                >
                  {getProcessIcon(step.icon)}
                </motion.div>

                {/* Content */}
                <div className="glass-premium p-6 flex-1 transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-nunito text-grass-light/50 text-xs font-700 tracking-widest">
                      {step.number}
                    </span>
                    <h3 className="font-fraunces font-700 text-cream text-xl group-hover:text-grass-light transition-colors">
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-nunito text-cream/55 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
