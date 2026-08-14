'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Database } from 'lucide-react';
import { testimonials as fallbackTestimonials, theme } from '@/utils/constants';
import { Testimonial } from '@/types/portfolio';
import api from '@/utils/api';

export const SocialProof: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>(fallbackTestimonials);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await api.testimonials.getAll();
        if (data && data.length > 0) {
          setItems(data);
        }
      } catch (err) {
        console.error('Error fetching PERN testimonials:', err);
      }
    }
    loadTestimonials();
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const current = items[activeIndex] || fallbackTestimonials[0];

  return (
    <section className="py-28 bg-canvas border-t border-border relative">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl text-center">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-burgundy/10 border border-burgundy/20 rounded-full text-xs text-burgundy font-medium mb-4">
          <Database size={13} /> PERN Testimonials Sync
        </div>

        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest text-burgundy font-semibold block mb-4"
        >
          Client Feedback & Reviews
        </motion.span>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-charcoal mb-12" 
          style={{ fontFamily: theme.fonts.heading }}
        >
          Trusted By Visionary Directors
        </motion.h2>

        {/* Carousel Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-surface border border-border p-8 md:p-14 rounded-3xl relative shadow-card overflow-hidden min-h-[340px] flex flex-col justify-center"
        >
          <Quote size={48} className="text-burgundy-soft/50 mx-auto mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <p className="text-lg md:text-xl text-charcoal font-light italic leading-relaxed max-w-2xl mx-auto">
                &quot;{current.quote}&quot;
              </p>

              <div className="flex flex-col items-center">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-burgundy-soft mb-3 shadow-burgundy-sm">
                  <Image 
                    src={current.avatar} 
                    alt={current.author}
                    fill
                    sizes="56px"
                    className="object-cover" 
                  />
                </div>
                <h4 className="text-base text-charcoal font-semibold">{current.author}</h4>
                <p className="text-xs text-slate uppercase tracking-wider">{current.title} • <span className="text-burgundy">{current.company}</span></p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="flex justify-between items-center absolute inset-y-1/2 -translate-y-1/2 left-4 right-4 pointer-events-none">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-canvas border border-border flex items-center justify-center text-slate hover:text-burgundy hover:border-burgundy-soft transition-colors pointer-events-auto shadow-card"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-canvas border border-border flex items-center justify-center text-slate hover:text-burgundy hover:border-burgundy-soft transition-colors pointer-events-auto shadow-card"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default SocialProof;
