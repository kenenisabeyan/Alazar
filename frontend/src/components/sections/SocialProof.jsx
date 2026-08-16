import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, Sparkles } from 'lucide-react';
import { testimonials, theme } from '../../utils/constants';

export const SocialProof = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  const activeIndex = (page % testimonials.length + testimonials.length) % testimonials.length;
  const current = testimonials[activeIndex];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const jumpTo = (index) => {
    const dir = index > activeIndex ? 1 : -1;
    setPage([index, dir]);
  };

  // Autoplay timer with pause on hover
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(interval);
  }, [page, isHovered]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.94,
      filter: 'blur(6px)',
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.94,
      filter: 'blur(6px)',
    })
  };

  return (
    <section className="py-28 sm:py-36 bg-[#F4F0EF] relative overflow-hidden mesh-bg" style={{ fontFamily: theme.fonts.body }}>
      {/* Dynamic Ambient Blur Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-[#6B1D2F]/12 via-[#C59A9F]/20 to-transparent blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute -top-20 right-10 w-96 h-96 bg-[#6B1D2F]/08 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl text-center relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#C59A9F]/40 text-xs uppercase tracking-widest text-[#6B1D2F] font-extrabold shadow-sm">
            <Sparkles size={13} className="text-[#6B1D2F] animate-pulse" /> Client Endorsements
          </div>

          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1C1917] tracking-tight" 
            style={{ fontFamily: theme.fonts.heading }}
          >
            What Clients <span className="italic font-light text-gradient-burgundy">Say</span>
          </h2>

          <p className="text-[#78716C] font-light text-base md:text-lg max-w-xl mx-auto">
            Feedback from creative leaders, directors, and agency partners.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card-luxury p-8 sm:p-12 md:p-16 rounded-3xl sm:rounded-[2.5rem] relative shadow-2xl overflow-hidden min-h-[380px] sm:min-h-[420px] flex flex-col justify-between border border-[#C59A9F]/40 group"
          >
            {/* Top Glowing Quote Icon Pill */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6B1D2F] via-[#7D2237] to-[#8B2440] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#6B1D2F]/25 mb-8 border border-white/20 group-hover:scale-110 transition-transform duration-500">
              <Quote size={26} className="text-white fill-white/20" />
            </div>

            {/* 5-Star Social Proof Rating */}
            <div className="flex items-center justify-center gap-1.5 mb-6">
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 + 0.2 }}
                >
                  <Star size={16} className="fill-[#C59A9F] text-[#6B1D2F]" />
                </motion.div>
              ))}
            </div>

            {/* Testimonial Quote & Author Animated Content */}
            <div className="relative min-h-[160px] sm:min-h-[180px] flex items-center justify-center">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 350, damping: 30 },
                    opacity: { duration: 0.35 },
                    scale: { duration: 0.35 },
                    filter: { duration: 0.35 }
                  }}
                  className="w-full space-y-8"
                >
                  <blockquote className="text-lg sm:text-xl md:text-2xl text-[#1C1917] font-medium italic leading-relaxed max-w-2xl mx-auto px-2 sm:px-6">
                    "{current.quote}"
                  </blockquote>

                  <div className="flex flex-col items-center">
                    <div className="p-1 bg-gradient-to-tr from-[#6B1D2F] via-[#8B2440] to-[#C59A9F] rounded-full shadow-lg mb-3.5 group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={current.avatar} 
                        alt={current.author}
                        className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover border-2 border-white" 
                      />
                    </div>
                    <h4 className="text-lg text-[#1C1917] font-black tracking-tight" style={{ fontFamily: theme.fonts.heading }}>
                      {current.author}
                    </h4>
                    <p className="text-xs text-[#78716C] uppercase tracking-widest font-extrabold mt-0.5">
                      {current.title} • <span className="text-[#6B1D2F] font-black">{current.company}</span>
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full bg-[#E5D9DB]/50 h-1 rounded-full overflow-hidden mt-8">
              <motion.div 
                key={page}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
                className="bg-gradient-to-r from-[#6B1D2F] to-[#8B2440] h-full rounded-full"
              />
            </div>
          </motion.div>

          {/* Nav Controls Left & Right Buttons */}
          <div className="flex justify-between items-center absolute inset-y-1/2 -translate-y-1/2 -left-4 -right-4 sm:-left-6 sm:-right-6 pointer-events-none z-20">
            <motion.button 
              whileHover={{ scale: 1.12, x: -3 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => paginate(-1)}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 backdrop-blur-md border border-[#C59A9F]/50 flex items-center justify-center text-[#6B1D2F] hover:bg-[#6B1D2F] hover:text-white hover:border-[#6B1D2F] transition-all duration-300 pointer-events-auto shadow-xl shadow-black/10 cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft size={22} />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.12, x: 3 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => paginate(1)}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 backdrop-blur-md border border-[#C59A9F]/50 flex items-center justify-center text-[#6B1D2F] hover:bg-[#6B1D2F] hover:text-white hover:border-[#6B1D2F] transition-all duration-300 pointer-events-auto shadow-xl shadow-black/10 cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight size={22} />
            </motion.button>
          </div>

          {/* Interactive Pagination Dots */}
          <div className="flex justify-center items-center gap-2.5 mt-8">
            {testimonials.map((_, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  onClick={() => jumpTo(idx)}
                  className={`h-2.5 rounded-full transition-all duration-400 cursor-pointer ${
                    isActive 
                      ? 'w-9 bg-[#6B1D2F] shadow-md shadow-[#6B1D2F]/30' 
                      : 'w-2.5 bg-[#C59A9F]/50 hover:bg-[#6B1D2F]/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default SocialProof;
