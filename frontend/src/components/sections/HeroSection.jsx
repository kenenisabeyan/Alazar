import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Award } from 'lucide-react';
import Button from '../common/Button';
import { theme, statistics } from '../../constants';
import heroBg from '../../assets/images/hero-bg.png';
import alazarImg from '../../assets/images/alazar.png';
import { navigateToSection } from '../../utils/navigation';

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
      id="hero"
      ref={containerRef}
      className="relative min-h-[88vh] sm:min-h-[95vh] flex flex-col justify-start sm:justify-center pt-24 xs:pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-[#FAFAF9] dark:bg-[#1E0A0D] mesh-bg transition-colors duration-300"
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
        className="absolute -top-4 -right-10 xs:-right-4 sm:-top-10 sm:right-10 md:right-20 w-[210px] xs:w-[280px] sm:w-[500px] md:w-[650px] opacity-15 sm:opacity-20 md:opacity-25 pointer-events-none z-0 mix-blend-luminosity filter blur-[0.5px]"
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
        className="container mx-auto px-3.5 sm:px-6 md:px-12 relative z-10 text-center flex flex-col items-center max-w-full"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full max-w-5xl"
        >
          {/* Headline & Subtitle Text with subtle ambient backdrop */}
          <div className="max-w-6xl mx-auto space-y-3.5 sm:space-y-6 mb-7 sm:mb-12 w-full px-1 sm:px-0 relative flex flex-col items-center">
            {/* Luminous soft backdrop for headline legibility */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[320px] xs:w-[440px] sm:w-[650px] md:w-[850px] h-[180px] sm:h-[260px] bg-white/60 dark:bg-[#1E0A0D]/60 blur-3xl pointer-events-none -z-10 rounded-full" />

            {/* Top Eyebrow Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-none bg-white/85 dark:bg-white/[0.08] border border-[#C59A9F]/40 dark:border-white/15 backdrop-blur-md shadow-sm mb-1 sm:mb-2 select-none"
            >
              <span className="w-2 h-2 rounded-none bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.18em] text-[#6B1D2F] dark:text-[#C59A9F]">
                Director & Lead Designer
              </span>
              <span className="text-[#C59A9F] dark:text-white/20">·</span>
              <span className="text-[9.5px] sm:text-[11px] font-bold tracking-wider text-[#78716C] dark:text-[#A89597]">
                Available Worldwide
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-[clamp(2.15rem,8.5vw,3.25rem)] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[1.05] sm:leading-[0.95] tracking-tight text-[#1C1917] dark:text-[#F5F0F1] max-w-full"
              style={{ fontFamily: theme.fonts.heading }}
            >
              <span className="block whitespace-nowrap sm:whitespace-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]">
                Cinematic Videos.
              </span>
              <span className="block text-gradient-burgundy font-black filter drop-shadow-[0_2px_12px_rgba(107,29,47,0.18)] dark:drop-shadow-[0_2px_16px_rgba(245,172,182,0.25)]">
                Clear Design.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-xl text-[#44403C] dark:text-[#E7E5E4] font-medium max-w-2xl mx-auto leading-relaxed px-2"
            >
              Crafting high-octane commercial edits, master-level color grading, and striking graphic design systems for visionary global brands.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pt-3 sm:pt-6 w-full max-w-md mx-auto sm:w-auto px-2 sm:px-0"
            >
              <Button
                variant="primary"
                icon={<ArrowRight size={17} />}
                onClick={() => navigateToSection(navigate, '/portfolio#portfolio-grid')}
                className="w-full sm:w-auto flex-1 sm:flex-initial min-w-0 rounded-none shadow-xl shadow-[#6B1D2F]/25 hover:shadow-2xl hover:shadow-[#6B1D2F]/40 px-8 sm:px-10 py-4 sm:py-4.5 text-xs sm:text-sm tracking-widest uppercase font-black"
              >
                Explore Work
              </Button>

              <Button
                variant="secondary"
                icon={<Play size={16} className="fill-[#6B1D2F] text-[#6B1D2F]" />}
                onClick={onOpenShowreel}
                className="w-full sm:w-auto flex-1 sm:flex-initial min-w-0 rounded-none bg-white/95 dark:bg-[#1E0A0D]/90 backdrop-blur-md border-2 border-[#6B1D2F]/70 dark:border-[#C59A9F]/60 text-[#6B1D2F] dark:text-[#F5F0F1] hover:border-[#6B1D2F] px-8 sm:px-10 py-4 sm:py-4.5 text-xs sm:text-sm tracking-widest uppercase font-black shadow-md hover:shadow-xl"
              >
                Watch Reel
              </Button>
            </motion.div>
          </div>

          {/* Luxury Glass Stats Cards */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-8 sm:pt-14 border-t border-[#C59A9F]/30 dark:border-white/10"
          >
            {statistics.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card-luxury text-center p-4 sm:p-7 rounded-none border border-[#C59A9F]/30 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#6B1D2F]/40 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <span className="text-2xl sm:text-3xl md:text-5xl font-black text-[#6B1D2F] dark:text-[#F5F0F1] tracking-tight" style={{ fontFamily: theme.fonts.heading }}>
                    {stat.value}
                  </span>
                  <Award size={16} className="text-[#C59A9F] dark:text-[#E28D99]" />
                </div>
                <p className="text-[10px] sm:text-xs text-[#57534E] dark:text-[#A89597] uppercase tracking-wider sm:tracking-widest font-bold leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

