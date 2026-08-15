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
      className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-[#FAFAF9] mesh-bg"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Dynamic Floating Ambient Glows */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[950px] h-[550px] bg-gradient-to-r from-[#6B1D2F]/15 via-[#8B2440]/10 to-[#C59A9F]/15 blur-[170px] rounded-full pointer-events-none animate-pulse-glow"
      />
      <motion.div 
        style={{ y: bgY }}
        className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#C59A9F]/15 blur-[140px] rounded-full pointer-events-none"
      />

      <motion.div 
        style={{ y: textY, opacity: opacityFade }}
        className="container mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Subtitle Pill with Live Pulse Dot */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#C59A9F]/40 text-xs tracking-widest text-[#6B1D2F] uppercase mb-8 shadow-sm hover:border-[#6B1D2F] transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Sparkles size={14} className="text-[#6B1D2F]" />
            <span className="font-semibold">Video Director & Graphic Designer</span>
          </motion.div>

          {/* Headline */}
          <div className="max-w-6xl mx-auto space-y-6 mb-12">
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight sm:leading-none text-[#1C1917] tracking-tight" 
              style={{ fontFamily: theme.fonts.heading }}
            >
              Cinematic Videos.<br />
              <span className="italic font-light text-gradient-burgundy">Clear Design.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-[#78716C] max-w-3xl mx-auto leading-relaxed font-light"
            >
              Creating clean, engaging video edits, color work, and graphic designs that help your brand stand out clearly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 pt-6 w-full sm:w-auto"
            >
              <Button 
                variant="primary" 
                icon={<ArrowRight size={18} />} 
                onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}
                className="w-full sm:w-auto shadow-lg hover:shadow-[#6B1D2F]/20 px-8 py-4 text-xs sm:text-sm tracking-wider uppercase font-bold"
              >
                View Work
              </Button>
              
              <Button 
                variant="secondary" 
                icon={<Play size={18} />}
                onClick={onOpenShowreel}
                className="w-full sm:w-auto bg-white/90 backdrop-blur-md border border-[#E5D9DB] hover:border-[#6B1D2F] px-8 py-4 text-xs sm:text-sm tracking-wider uppercase font-bold shadow-sm"
              >
                Watch Reel
              </Button>
            </motion.div>
          </div>

          {/* Elevated Glass Stats Cards */}
          <motion.div 
            variants={itemVariants}
            className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-12 sm:pt-16 border-t border-[#E5D9DB]/80"
          >
            {statistics.map((stat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                className="text-center p-4 sm:p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-[#E5D9DB] shadow-sm hover:border-[#C59A9F] hover:shadow-xl hover:shadow-[#6B1D2F]/10 transition-all duration-300"
              >
                <p className="text-3xl md:text-4xl font-extrabold text-[#6B1D2F] mb-1 tracking-tight" style={{ fontFamily: theme.fonts.heading }}>
                  {stat.value}
                </p>
                <p className="text-xs text-[#78716C] uppercase tracking-widest font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
