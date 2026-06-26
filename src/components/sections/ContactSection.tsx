'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BRAND } from '@/lib/constants';
import { MailOpen, Sprout, MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [status, setStatus]   = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise((res) => setTimeout(res, 1500));
    setStatus('sent');
  };

  return (
    <section
      id="contact"
      className="section-base flex flex-col items-center justify-center px-6 md:px-16 py-24"
    >
      <motion.div 
        className="w-full max-w-3xl flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-14 max-w-xl">
          <p className="font-nunito text-grass-light text-xs font-700 tracking-[0.35em] uppercase mb-4 flex items-center justify-center gap-2">
            <MailOpen size={16} className="text-gold" />
            Get in Touch
          </p>
          <h2
            className="font-fraunces font-black text-cream leading-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
          >
            Let&apos;s Talk{' '}
            <em className="text-gradient-green not-italic">Farm Business.</em>
          </h2>
          <p className="font-nunito text-cream/55 text-base">
            Whether you need one crate of eggs or a full livestock contract —
            we&apos;re ready to work with you.
          </p>
        </motion.div>

        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* Form */}
          <motion.div variants={itemVariants} className="glass-premium p-8 relative overflow-hidden group">
            {/* Subtle glow effect behind form */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-grass-light/5 rounded-full blur-3xl" />
            
            {status === 'sent' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-8 relative z-10"
              >
                <Sprout size={48} className="text-gold mb-5" strokeWidth={1.5} />
                <h3 className="font-fraunces font-700 text-cream text-2xl mb-3">
                  Message received!
                </h3>
                <p className="font-nunito text-cream/55 text-sm">
                  Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }}
                  className="mt-6 font-nunito text-sm text-grass-light hover:text-gold transition-colors flex items-center gap-2"
                >
                  Send another <ArrowRight size={14} />
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
                <div>
                  <label className="font-nunito text-cream/50 text-xs uppercase tracking-widest block mb-2">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Emeka Okafor"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="farm-input"
                  />
                </div>

                <div>
                  <label className="font-nunito text-cream/50 text-xs uppercase tracking-widest block mb-2">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="farm-input"
                  />
                </div>

                <div>
                  <label className="font-nunito text-cream/50 text-xs uppercase tracking-widest block mb-2">
                    What do you need?
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your order, event, or enquiry…"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="farm-input resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-glow flex justify-center items-center gap-2 w-full font-nunito font-800 bg-gold hover:bg-gold-light disabled:opacity-60 text-forest-deep py-3.5 rounded-full transition-colors duration-200 text-base mt-2 group/btn"
                >
                  {status === 'sending' ? 'Sending…' : (
                    <>
                      Send Message
                      <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                    </>
                  )}
                </motion.button>

                <p className="font-nunito text-cream/25 text-xs text-center">
                  We reply within 24 hours, Mon–Sat.
                </p>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            {/* Info card */}
            <div className="glass-premium p-7 flex-1">
              <h3 className="font-fraunces font-700 text-cream text-lg mb-6">
                Find Us
              </h3>
              <div className="flex flex-col gap-5">
                <div className="flex gap-4 items-start group cursor-default">
                  <div className="p-2 rounded-full bg-grass-dark/20 text-gold group-hover:bg-gold group-hover:text-forest-deep transition-colors">
                    <MapPin size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-nunito font-600 text-cream/80 text-sm">Address</p>
                    <p className="font-nunito text-cream/50 text-sm leading-relaxed mt-0.5 group-hover:text-cream/70 transition-colors">
                      {BRAND.address}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group cursor-pointer">
                  <div className="p-2 rounded-full bg-grass-dark/20 text-gold group-hover:bg-gold group-hover:text-forest-deep transition-colors">
                    <Phone size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-nunito font-600 text-cream/80 text-sm">Phone</p>
                    <a
                      href={`tel:${BRAND.phone}`}
                      className="font-nunito text-grass-light text-sm hover:text-gold transition-colors mt-0.5 block"
                    >
                      {BRAND.phone}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 items-start group cursor-pointer">
                  <div className="p-2 rounded-full bg-grass-dark/20 text-gold group-hover:bg-gold group-hover:text-forest-deep transition-colors">
                    <Mail size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-nunito font-600 text-cream/80 text-sm">Email</p>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="font-nunito text-grass-light text-sm hover:text-gold transition-colors mt-0.5 block"
                    >
                      {BRAND.email}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 items-start group cursor-default">
                  <div className="p-2 rounded-full bg-grass-dark/20 text-gold group-hover:bg-gold group-hover:text-forest-deep transition-colors">
                    <Clock size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-nunito font-600 text-cream/80 text-sm">Hours</p>
                    <p className="font-nunito text-cream/50 text-sm mt-0.5 group-hover:text-cream/70 transition-colors">
                      Mon – Sat, 7am – 6pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp quick action */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              href="https://wa.me/2348000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-premium p-5 flex items-center gap-4 no-underline group"
            >
              <div className="p-2.5 rounded-full bg-green-500/20 text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <MessageCircle size={22} strokeWidth={2} />
              </div>
              <div>
                <p className="font-fraunces font-700 text-cream text-base group-hover:text-gold transition-colors">
                  Chat on WhatsApp
                </p>
                <p className="font-nunito text-cream/45 text-xs mt-0.5">
                  Fastest way to place an order
                </p>
              </div>
              <ArrowRight size={18} className="ml-auto text-grass-light group-hover:text-gold transition-colors" />
            </motion.a>
          </motion.div>
        </div>

        {/* Footer strip */}
        <motion.div variants={itemVariants} className="mt-20 w-full border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sprout size={18} className="text-gold" />
            <p className="font-fraunces font-700 text-cream/80 italic text-lg text-glow">
              PensaFarms
            </p>
          </div>
          <p className="font-nunito text-cream/25 text-xs text-center">
            © {new Date().getFullYear()} PensaFarms. All rights reserved. &nbsp;·&nbsp; Made with <span className="text-grass-light">♥</span> in Nigeria
          </p>
          <div className="flex gap-5">
          {['Instagram', 'Twitter', 'Facebook'].map((s) => (
            <a
              key={s}
              href="#"
              className="font-nunito text-cream/30 hover:text-cream/70 text-xs transition-colors"
            >
              {s}
            </a>
          ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
