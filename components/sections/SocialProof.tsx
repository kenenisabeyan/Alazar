'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials, theme } from '@/utils/constants';

export const SocialProof: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section className="py-28 bg-[#1E0A0D] border-t border-white/5 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
        
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest text-[#8B1E3F] font-semibold block mb-4"
        >
          Client Feedback & Reviews
        </motion.span>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-normal text-[#F5F0F1] mb-12" 
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
          className="bg-[#2E1216]/60 border border-white/5 p-8 md:p-14 rounded-3xl relative shadow-2xl backdrop-blur-md overflow-hidden min-h-[340px] flex flex-col justify-center"
        >
          <Quote size={48} className="text-[#8B1E3F]/30 mx-auto mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <p className="text-lg md:text-xl text-[#F5F0F1] font-light italic leading-relaxed max-w-2xl mx-auto">
                "{current.quote}"
              </p>

              <div className="flex flex-col items-center">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#8B1E3F] mb-3 shadow-md">
                  <Image 
                    src={current.avatar} 
                    alt={current.author}
                    fill
                    sizes="56px"
                    className="object-cover" 
                  />
                </div>
                <h4 className="text-base text-[#F5F0F1] font-semibold">{current.author}</h4>
                <p className="text-xs text-[#A89597] uppercase tracking-wider">{current.title} • <span className="text-[#8B1E3F]">{current.company}</span></p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="flex justify-between items-center absolute inset-y-1/2 -translate-y-1/2 left-4 right-4 pointer-events-none">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-[#1E0A0D]/90 border border-white/10 flex items-center justify-center text-[#A89597] hover:text-white hover:border-[#8B1E3F] transition-colors pointer-events-auto shadow-lg"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#1E0A0D]/90 border border-white/10 flex items-center justify-center text-[#A89597] hover:text-white hover:border-[#8B1E3F] transition-colors pointer-events-auto shadow-lg"
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
