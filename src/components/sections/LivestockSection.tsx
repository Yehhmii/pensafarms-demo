'use client';

import { motion } from 'framer-motion';
import { LIVESTOCK } from '@/lib/constants';
import { Beef, Milk, Bird, Egg } from 'lucide-react';

const getLivestockIcon = (name: string) => {
  if (name.includes('Beef')) return <Beef size={32} className="text-gold mb-3" strokeWidth={1.5} />;
  if (name.includes('Dairy')) return <Milk size={32} className="text-gold mb-3" strokeWidth={1.5} />;
  if (name.includes('Broiler')) return <Bird size={32} className="text-gold mb-3" strokeWidth={1.5} />;
  if (name.includes('Layer')) return <Egg size={32} className="text-gold mb-3" strokeWidth={1.5} />;
  return <Beef size={32} className="text-gold mb-3" strokeWidth={1.5} />;
};

export default function LivestockSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 15 } }
  };

  return (
    <section
      id="livestock"
      className="section-base flex items-center justify-end px-6 md:px-16 lg:px-24 py-20"
    >
      <motion.div 
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-10">
          <p className="font-nunito text-grass-light text-xs font-700 tracking-[0.35em] uppercase mb-4 flex items-center gap-2">
            <Beef size={16} className="text-gold" />
            Our Animals
          </p>
          <h2
            className="font-fraunces font-black text-cream leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
          >
            Raised Right,<br />
            <em className="text-gradient-green not-italic">From Day One.</em>
          </h2>
          <p className="font-nunito text-cream/55 text-base leading-relaxed">
            Every animal on PensaFarms has space, clean water, and the
            best natural feed. No hormones. No shortcuts.
          </p>
        </motion.div>

        {/* Livestock cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
          {LIVESTOCK.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-premium p-5 cursor-default group"
            >
              <motion.div 
                transition={{ type: "spring", stiffness: 300 }}
                className="group-hover:scale-110 origin-left inline-block"
              >
                {getLivestockIcon(item.name)}
              </motion.div>
              <p className="font-fraunces font-700 text-cream text-lg leading-tight group-hover:text-gold transition-colors">
                {item.name}
              </p>
              <p className="font-nunito mt-1">
                <span className="text-gold font-800 text-xl">{item.count}</span>
                <span className="text-cream/40 text-xs ml-1">{item.label}</span>
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p variants={itemVariants} className="font-nunito text-cream/35 text-xs mt-5 text-center">
          ✓ Fully vaccinated &nbsp;·&nbsp; ✓ Vet-certified &nbsp;·&nbsp; ✓ Ethically raised
        </motion.p>
      </motion.div>
    </section>
  );
}
