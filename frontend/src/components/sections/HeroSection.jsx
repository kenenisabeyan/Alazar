import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Award } from 'lucide-react';
import Button from '../common/Button';
import { theme, statistics } from '../../constants';
import heroBg from '../../assets/images/hero-bg.png';
import alazarImg from '../../assets/images/alazar.png';

export const HeroSection = ({ onOpenShowreel }) => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacityFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] flex flex-col justify-center pt-36 pb-24 overflow-hidden bg-[#FAFAF9] mesh-bg"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Motion Flow Background Image Layer 1: hero-bg.png */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          x: ['0%', '-2%', '0%'],
          y: ['0%', '-1.5%', '0%'],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0 pointer-events-none opacity-25 mix-blend-multiply"
      >
        <img
          src={heroBg}
          alt="Hero Flow Texture"
          className="w-full h-full object-cover object-center filter blur-[1px]"
        />
      </motion.div>

      {/* Motion Flow Layer 2: Floating alazar.png visual element */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 1.5, 0],
          scale: [1, 1.02, 1]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 right-0 sm:right-10 md:right-20 w-[380px] sm:w-[500px] md:w-[650px] opacity-20 md:opacity-25 pointer-events-none z-0 mix-blend-luminosity filter blur-[0.5px]"
      >
        <img
          src={alazarImg}
          alt="Alazar Motion Flow"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Dynamic Ambient Glow Orbs */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-[#6B1D2F]/18 via-[#8B1E3F]/12 to-[#C59A9F]/20 blur-[180px] rounded-full pointer-events-none animate-pulse-glow"
      />
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-[#C59A9F]/20 blur-[150px] rounded-full pointer-events-none"
      />

      <motion.div
        style={{ y: textY, opacity: opacityFade }}
        className="container mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full max-w-5xl"
        >
          {/* Shimmer Subtitle Pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[#C59A9F]/50 text-xs tracking-widest text-[#6B1D2F] uppercase mb-10 shadow-sm hover:border-[#6B1D2F] transition-all shimmer-border group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <Sparkles size={14} className="text-[#6B1D2F] group-hover:rotate-12 transition-transform" />
            <span className="font-extrabold tracking-wider">Video Director & Graphic Designer</span>
          </motion.div>

          {/* Headline & Subtitle Text (Clean spacious design without bulky box) */}
          <div className="max-w-6xl mx-auto space-y-6 mb-12">
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.08] sm:leading-none text-[#1C1917] tracking-tight"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Cinematic Videos.<br />
              <span className="text-gradient-burgundy font-black">Clear Design.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-[#1C1917] font-bold max-w-3xl mx-auto leading-relaxed bg-white/85 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-[#C59A9F]/40 shadow-md inline-block"
            >
              Crafting high-octane commercial edits, master-level color grading, and striking graphic design systems for visionary global brands.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 w-full sm:w-auto"
            >
              <Button
                variant="primary"
                icon={<ArrowRight size={18} />}
                onClick={() => { navigate('/portfolio'); window.scrollTo(0, 0); }}
                className="w-full sm:w-auto shadow-xl shadow-[#6B1D2F]/20 hover:shadow-[#6B1D2F]/35 px-9 py-4 text-xs sm:text-sm tracking-widest uppercase font-extrabold rounded-full"
              >
                Explore Selected Work
              </Button>

              <Button
                variant="secondary"
                icon={<Play size={18} className="fill-[#6B1D2F] text-[#6B1D2F]" />}
                onClick={onOpenShowreel}
                className="w-full sm:w-auto bg-white/90 backdrop-blur-md border border-[#C59A9F] hover:border-[#6B1D2F] px-9 py-4 text-xs sm:text-sm tracking-widest uppercase font-extrabold shadow-sm rounded-full"
              >
                Watch 2025 Reel
              </Button>
            </motion.div>
          </div>

          {/* Luxury Glass Stats Cards */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-14 border-t border-[#C59A9F]/80"
          >
            {statistics.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card-luxury text-center p-6 sm:p-7 rounded-3xl"
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-3xl md:text-5xl font-black text-[#6B1D2F] tracking-tight" style={{ fontFamily: theme.fonts.heading }}>
                    {stat.value}
                  </span>
                  <Award size={16} className="text-[#C59A9F]" />
                </div>
                <p className="text-[11px] text-[#78716C] uppercase tracking-widest font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

