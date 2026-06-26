'use client';

import { motion } from 'framer-motion';
import { PRODUCTS } from '@/lib/constants';
import { Egg, Drumstick, Beef, Milk, Bird, Package, ArrowRight, Wheat } from 'lucide-react';

const getProductIcon = (id: string) => {
  switch (id) {
    case 'eggs': return <Egg size={28} className="text-gold mb-3" strokeWidth={1.5} />;
    case 'broiler': return <Drumstick size={28} className="text-gold mb-3" strokeWidth={1.5} />;
    case 'beef': return <Beef size={28} className="text-gold mb-3" strokeWidth={1.5} />;
    case 'dairy': return <Milk size={28} className="text-gold mb-3" strokeWidth={1.5} />;
    case 'live': return <Bird size={28} className="text-gold mb-3" strokeWidth={1.5} />;
    case 'bulk': return <Package size={28} className="text-gold mb-3" strokeWidth={1.5} />;
    default: return <Wheat size={28} className="text-gold mb-3" strokeWidth={1.5} />;
  }
};

export default function ProductsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 70, damping: 15 } }
  };

  return (
    <section
      id="products"
      className="section-base flex items-center justify-start px-6 md:px-16 lg:px-24 py-20"
    >
      <motion.div 
        className="w-full max-w-lg"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-10">
          <p className="font-nunito text-grass-light text-xs font-700 tracking-[0.35em] uppercase mb-4 flex items-center gap-2">
            <Wheat size={16} className="text-gold" />
            Farm Fresh
          </p>
          <h2
            className="font-fraunces font-black text-cream leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
          >
            Pure, Honest{' '}
            <em className="text-gradient-gold not-italic">Produce.</em>
          </h2>
          <p className="font-nunito text-cream/55 text-base leading-relaxed">
            Everything we sell comes directly from our farm — no middlemen,
            no mystery. Just real food from real land.
          </p>
        </motion.div>

        {/* Products grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-premium p-5 relative group cursor-default"
            >
              {/* Tag badge */}
              {product.tag && (
                <span className="absolute top-3 right-3 font-nunito text-[10px] font-700 bg-gold/20 text-gold px-2 py-0.5 rounded-full border border-gold/30">
                  {product.tag}
                </span>
              )}
              
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="origin-left inline-block"
              >
                {getProductIcon(product.id)}
              </motion.div>
              
              <p className="font-fraunces font-700 text-cream text-base leading-snug mb-1.5 group-hover:text-gold transition-colors">
                {product.name}
              </p>
              <p className="font-nunito text-cream/45 text-xs leading-relaxed">
                {product.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="mt-8">
          <motion.a
            whileHover={{ scale: 1.02 }}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex font-nunito font-700 text-sm text-grass-light hover:text-gold items-center gap-2 transition-colors group bg-grass-dark/20 px-6 py-3 rounded-full border border-grass-light/20"
          >
            Enquire about bulk pricing
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
