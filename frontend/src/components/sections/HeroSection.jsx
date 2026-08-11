import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import Button from '../common/Button';
import { theme, statistics } from '../../utils/constants';

export const HeroSection = ({ setCurrentPage, onOpenShowreel }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-[#FAFAF9]"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Soft Ambient Glow */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#C59A9F]/15 blur-[160px] rounded-full pointer-events-none"
      />
      <motion.div 
        style={{ y: bgY }}
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C59A9F]/10 blur-[130px] rounded-full pointer-events-none"
      />

      <motion.div 
        style={{ y: textY, opacity: opacityFade }}
        className="container mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Subtitle Pill */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5E8EA] border border-[#C59A9F]/40 text-xs tracking-widest text-[#6B1D2F] uppercase mb-8 shadow-sm"
          >
            <Sparkles size={14} className="text-[#6B1D2F]" />
            <span>Visual Storyteller & Lead Editor</span>
          </motion.div>

          {/* Headline */}
          <div className="max-w-6xl mx-auto space-y-6 mb-12">
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none text-[#1C1917] tracking-tight" 
              style={{ fontFamily: theme.fonts.heading }}
            >
              Cinematic Vision.<br />
              <span className="italic font-light text-[#6B1D2F]">Premium Design.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-[#78716C] max-w-3xl mx-auto leading-relaxed font-light"
            >
              Crafting compelling narratives through high-end video editing, color grading, and striking graphic design for visionary brands.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
            >
              <Button 
                variant="primary" 
                icon={<ArrowRight size={18} />} 
                onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}
              >
                Explore Work
              </Button>
              
              <Button 
                variant="secondary" 
                icon={<Play size={18} />}
                onClick={onOpenShowreel}
              >
                Watch Showreel
              </Button>
            </motion.div>
          </div>

          {/* Stats Strip */}
          <motion.div 
            variants={itemVariants}
            className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 border-t border-[#E5D9DB]"
          >
            {statistics.map((stat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5, boxShadow: '0 6px 24px rgba(107,29,47,0.12)' }}
                className="text-center p-5 bg-white rounded-2xl border border-[#E5D9DB] shadow-sm transition-all duration-300"
              >
                <p className="text-3xl md:text-4xl font-bold text-[#6B1D2F] mb-1" style={{ fontFamily: theme.fonts.heading }}>
                  {stat.value}
                </p>
                <p className="text-xs text-[#78716C] uppercase tracking-widest font-light">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
