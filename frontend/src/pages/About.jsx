import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, PenTool, Camera, Sparkles, Layers } from 'lucide-react';

import Button from '../components/common/Button';
import SkillsSection from '../components/sections/SkillsSection';
import CareerTimeline from '../components/sections/CareerTimeline';
import GearSection from '../components/sections/GearSection';
import BehindTheScenes from '../components/sections/BehindTheScenes';
import ExpertiseSection from '../components/sections/ExpertiseSection';
import AvailabilityCTA from '../components/sections/AvailabilityCTA';
import { theme } from '../constants';
import alazarImg from '../assets/images/alazar.png';

const philosophyCards = [
  {
    icon: Film,
    title: 'Paced Editing',
    desc: 'Cutting footage to match musical cadence, emotional beat, and narrative flow.',
  },
  {
    icon: Layers,
    title: 'Color Science',
    desc: 'Transforming flat camera log profiles into rich, cinematic color gamuts.',
  },
  {
    icon: Camera,
    title: 'Camera & Lens',
    desc: 'Capturing ultra-sharp 8K raw frames with prime lenses and controlled lighting.',
  },
  {
    icon: PenTool,
    title: 'Brand Identity',
    desc: 'Building cohesive poster art, motion graphics, and graphic design systems.',
  },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAFAF9] pt-32 sm:pt-40 pb-0 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Floating background portrait */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-0 w-[450px] md:w-[600px] opacity-[0.06] pointer-events-none z-0 mix-blend-luminosity"
      >
        <img src={alazarImg} alt="" className="w-full h-auto object-contain" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">

        {/* ── Hero header ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 sm:mb-24">

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#C59A9F]/50 text-[11px] tracking-widest text-[#6B1D2F] uppercase font-black shadow-sm shimmer-border">
              <Sparkles size={13} className="animate-pulse" />
              Video Director & Senior Graphic Designer
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.08] tracking-tight"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Alazar Asdesach.<br />
              <span className="italic font-light text-[#6B1D2F]">Director & Visual Artist.</span>
            </h1>

            <p className="text-[#78716C] font-light text-base md:text-lg leading-relaxed max-w-lg">
              With over 8 years of experience in video production, cinematic color science, and senior-level brand design — crafting visual assets that communicate identity with precision.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Film, title: 'Video Production', sub: 'DaVinci & RED 8K' },
                { icon: PenTool, title: 'Brand & Graphic', sub: 'Identity Systems' },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-[#C59A9F]/30 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-[#FAFAF9] text-[#6B1D2F] flex items-center justify-center flex-shrink-0">
                    <Icon size={17} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#1C1917]">{title}</p>
                    <p className="text-[10px] text-[#78716C] font-bold uppercase tracking-wider">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                variant="primary"
                className="px-9 py-4 rounded-full font-black uppercase text-xs tracking-widest shadow-xl"
                onClick={() => { navigate('/portfolio'); window.scrollTo(0, 0); }}
              >
                View Portfolio
              </Button>
              <Button
                variant="secondary"
                className="px-9 py-4 rounded-full font-black uppercase text-xs tracking-widest"
                onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>

          {/* Photo stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center py-8"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[460px] h-[460px] bg-gradient-to-tr from-[#6B1D2F]/25 via-[#8B1E3F]/12 to-[#C59A9F]/20 blur-[120px] rounded-full" />
            </div>

            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] group cursor-pointer">
              {/* Back left */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border-2 border-[#C59A9F]/40 shadow-xl
                -rotate-6 -translate-x-5 -translate-y-3 scale-95 opacity-75
                group-hover:-rotate-12 group-hover:-translate-x-12 group-hover:-translate-y-6
                transition-all duration-500 ease-out z-0
                bg-gradient-to-br from-[#6B1D2F] via-[#2E1216] to-[#1C1917]">
                <img src={alazarImg} alt="" className="w-full h-full object-cover object-top mix-blend-luminosity filter contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-[#6B1D2F]/30 mix-blend-multiply" />
              </div>
              {/* Back right */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border-2 border-[#C59A9F]/50 shadow-xl
                rotate-6 translate-x-5 -translate-y-1 scale-95 opacity-80
                group-hover:rotate-12 group-hover:translate-x-12 group-hover:-translate-y-4
                transition-all duration-500 ease-out z-10
                bg-gradient-to-br from-[#8B1E3F] via-[#1C1917] to-[#6B1D2F]">
                <img src={alazarImg} alt="" className="w-full h-full object-cover object-top filter saturate-150 brightness-95" />
                <div className="absolute inset-0 bg-[#8B1E3F]/20 mix-blend-color-burn" />
              </div>
              {/* Front main */}
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/80 shadow-2xl shadow-[#6B1D2F]/25 group-hover:scale-[1.03] transition-all duration-500 ease-out z-20">
                <img
                  src={alazarImg}
                  alt="Alazar Asdesach"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/50 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Core philosophy cards ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20 sm:mb-28">
          {philosophyCards.map(({ icon: Icon, title, desc }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.09 }}
              whileHover={{ y: -6 }}
              className="glass-card-luxury p-7 rounded-[2rem] text-left flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white flex items-center justify-center shadow-lg shadow-[#6B1D2F]/20">
                <Icon size={22} />
              </div>
              <div>
                <h3
                  className="text-lg font-black text-[#1C1917] mb-1.5"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  {title}
                </h3>
                <p className="text-xs text-[#78716C] font-light leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Specialist context section ──────────────────────────────────── */}
      <ExpertiseSection />

      {/* ── Deep sections ────────────────────────────────────────────────── */}
      <SkillsSection />
      <CareerTimeline />
      <GearSection />
      <BehindTheScenes />
      <AvailabilityCTA />
    </motion.div>
  );
}
