'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Menu, X, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Livestock', href: '#livestock' },
  { label: 'Products',  href: '#products'  },
  { label: 'Our Story', href: '#process'   },
  { label: 'Contact',   href: '#contact'   },
];

export default function Navbar() {
  const navRef    = useRef<HTMLElement>(null);
  const [open, setOpen]       = useState(false);
  const [hidden, setHidden]   = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      // Hide nav when scrolling down, show when scrolling up
      if (current > lastScrollY.current + 10 && current > 120) {
        setHidden(true);
      } else if (current < lastScrollY.current - 10) {
        setHidden(false);
      }
      lastScrollY.current = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 transition-transform duration-500 glass-nav"
      style={{ transform: hidden ? 'translateY(-100%)' : 'translateY(0)' }}
    >

      <nav className="relative flex items-center justify-between px-6 md:px-12 py-5">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
          aria-label="PensaFarms home"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="text-gold"
          >
            <Sprout size={28} strokeWidth={2.5} />
          </motion.div>
          <span className="font-fraunces font-bold text-xl text-cream italic tracking-wide text-glow">
            PensaFarms
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.li 
              key={link.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <button
                onClick={() => scrollTo(link.href)}
                className="nav-link font-nunito text-sm font-600 text-cream/75 hover:text-cream transition-colors duration-200"
              >
                {link.label}
              </button>
            </motion.li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <motion.a
          href="mailto:hello@pensafarms.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:inline-flex items-center gap-2 font-nunito text-sm font-700 bg-gold text-forest-deep px-5 py-2.5 rounded-full transition-colors duration-200 hover:bg-gold-light group"
        >
          Order Now
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </motion.a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center p-2 text-cream"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={28} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={28} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="glass-premium mx-4 mb-4 px-6 py-5 flex flex-col gap-4">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollTo(link.href)}
                  className="font-nunito text-base font-600 text-cream/80 hover:text-cream text-left transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.a
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: NAV_LINKS.length * 0.1 }}
                href="mailto:hello@pensafarms.com"
                className="mt-2 flex justify-center items-center gap-2 font-nunito font-700 bg-gold text-forest-deep px-5 py-3 rounded-full text-sm group"
              >
                Order Now <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
