import React from 'react';
import { motion } from 'framer-motion';
import { Film, PenTool, Camera, Sparkles, Layers } from 'lucide-react';
import Button from '../components/common/Button';
import GearSection from '../components/sections/GearSection';
import BehindTheScenes from '../components/sections/BehindTheScenes';
import SkillsSection from '../components/sections/SkillsSection';
import CareerTimeline from '../components/sections/CareerTimeline';
import AvailabilityCTA from '../components/sections/AvailabilityCTA';
import { theme } from '../utils/constants';
import alazarImg from '../assets/images/alazar.png';

export const About = ({ setCurrentPage }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAFAF9] pt-32 sm:pt-40 pb-0 mesh-bg relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Motion Flow Background Image: alazar.png ONLY */}
      <motion.div 
        animate={{ y: [0, -18, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-0 w-[450px] md:w-[600px] opacity-15 pointer-events-none z-0 mix-blend-luminosity filter blur-[0.5px]"
      >
        <img src={alazarImg} alt="Alazar Visual" className="w-full h-auto object-contain" />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 sm:mb-24">
          
          {/* Left Column: Bio & Title */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6 text-left relative z-10"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#C59A9F]/50 text-xs tracking-widest text-[#6B1D2F] uppercase font-black shadow-sm shimmer-border">
              <Sparkles size={14} className="text-[#6B1D2F] animate-pulse" />
              <span>Video Director & Graphic Designer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.08] tracking-tight" style={{ fontFamily: theme.fonts.heading }}>
              Alazar Asdesach.<br />
              <span className="italic font-light text-gradient-burgundy">Director & Visual Artist.</span>
            </h1>

            <p className="text-[#1C1917] font-medium text-base md:text-lg leading-relaxed">
              With over 8 years of experience in video production, cinematic color science, and brand design, I craft clean, visual assets that communicate brand identity with precision.
            </p>

            {/* Quick Skill Highlights Badges */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-[#C59A9F]/30 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center font-bold">
                  <Film size={16} />
                </div>
                <div>
                  <p className="text-xs font-black text-[#1C1917]">Video Production</p>
                  <p className="text-[10px] text-[#78716C] font-semibold uppercase">DaVinci & RED 8K</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-[#C59A9F]/30 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center font-bold">
                  <PenTool size={16} />
                </div>
                <div>
                  <p className="text-xs font-black text-[#1C1917]">Brand & Graphic</p>
                  <p className="text-[10px] text-[#78716C] font-semibold uppercase">Identity Systems</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
              <Button 
                variant="primary" 
                className="w-full sm:w-auto px-9 py-4.5 rounded-full font-black uppercase text-xs sm:text-sm tracking-widest shadow-xl" 
                onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}
              >
                View Portfolio
              </Button>
              <Button 
                variant="secondary" 
                className="w-full sm:w-auto px-9 py-4.5 rounded-full font-black uppercase text-xs sm:text-sm tracking-widest" 
                onClick={() => { setCurrentPage('contact'); window.scrollTo(0,0); }}
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Clean 3-Photo Overlapping Profile Showcase */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center pt-6 pb-8"
          >
            {/* Ambient Background Glow Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#6B1D2F]/25 via-[#8B2440]/15 to-[#C59A9F]/30 blur-[130px] rounded-full pointer-events-none" />

            {/* Pure 3-Photo Overlapping Stack Container */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] flex items-center justify-center group cursor-pointer">
              
              {/* PHOTO STACK LAYER 1: Back Left Card */}
              <div className="absolute inset-0 w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-[#C59A9F]/40 shadow-xl bg-gradient-to-br from-[#6B1D2F] via-[#2E1216] to-[#1C1917] -rotate-6 -translate-x-5 -translate-y-3 scale-95 opacity-80 group-hover:-rotate-12 group-hover:-translate-x-12 group-hover:-translate-y-6 group-hover:opacity-95 group-hover:scale-95 transition-all duration-500 ease-out z-0">
                <img 
                  src={alazarImg} 
                  alt="Alazar Asdesach Portrait Layer 1" 
                  className="w-full h-full object-cover object-top filter contrast-125 brightness-90 mix-blend-luminosity" 
                />
                <div className="absolute inset-0 bg-[#6B1D2F]/30 mix-blend-multiply" />
              </div>

              {/* PHOTO STACK LAYER 2: Back Right Card */}
              <div className="absolute inset-0 w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-[#C59A9F]/50 shadow-xl bg-gradient-to-br from-[#8B2440] via-[#1C1917] to-[#6B1D2F] rotate-6 translate-x-5 -translate-y-1 scale-95 opacity-85 group-hover:rotate-12 group-hover:translate-x-12 group-hover:-translate-y-4 group-hover:opacity-95 group-hover:scale-95 transition-all duration-500 ease-out z-10">
                <img 
                  src={alazarImg} 
                  alt="Alazar Asdesach Portrait Layer 2" 
                  className="w-full h-full object-cover object-top filter saturate-150 brightness-95" 
                />
                <div className="absolute inset-0 bg-[#8B2440]/20 mix-blend-color-burn" />
              </div>

              {/* PHOTO STACK LAYER 3: Main Center Front Card */}
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/80 shadow-2xl shadow-[#6B1D2F]/30 bg-gradient-to-br from-[#1C1917] via-[#2E1216] to-[#6B1D2F] group-hover:scale-105 transition-all duration-500 ease-out z-20">
                <img 
                  src={alazarImg} 
                  alt="Alazar Asdesach — Lead Director & Graphic Designer" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/50 via-transparent to-transparent opacity-80" />
              </div>

            </div>

          </motion.div>

        </div>

        {/* Core Philosophy Grid (4 Unique Pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 sm:mb-28">
          <div className="glass-card-luxury p-7 rounded-3xl text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center mb-6 shadow-sm">
                <Film size={22} />
              </div>
              <h3 className="text-xl font-bold text-[#1C1917] mb-2" style={{ fontFamily: theme.fonts.heading }}>
                Paced Editing
              </h3>
              <p className="text-xs text-[#78716C] font-light leading-relaxed">
                Cutting footage to match musical cadence, emotional beat, and narrative flow.
              </p>
            </div>
          </div>

          <div className="glass-card-luxury p-7 rounded-3xl text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center mb-6 shadow-sm">
                <Layers size={22} />
              </div>
              <h3 className="text-xl font-bold text-[#1C1917] mb-2" style={{ fontFamily: theme.fonts.heading }}>
                Color Science
              </h3>
              <p className="text-xs text-[#78716C] font-light leading-relaxed">
                Transforming flat camera log profiles into rich, cinematic color gamuts.
              </p>
            </div>
          </div>

          <div className="glass-card-luxury p-7 rounded-3xl text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center mb-6 shadow-sm">
                <Camera size={22} />
              </div>
              <h3 className="text-xl font-bold text-[#1C1917] mb-2" style={{ fontFamily: theme.fonts.heading }}>
                Camera & Lens
              </h3>
              <p className="text-xs text-[#78716C] font-light leading-relaxed">
                Capturing ultra-sharp 8K raw frames with prime lenses and controlled lighting.
              </p>
            </div>
          </div>

          <div className="glass-card-luxury p-7 rounded-3xl text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center mb-6 shadow-sm">
                <PenTool size={22} />
              </div>
              <h3 className="text-xl font-bold text-[#1C1917] mb-2" style={{ fontFamily: theme.fonts.heading }}>
                Brand Identity
              </h3>
              <p className="text-xs text-[#78716C] font-light leading-relaxed">
                Building cohesive poster art, motion graphics, and graphic design systems.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Software & Skills Proficiency Matrix */}
      <SkillsSection />

      {/* Career Work History & Download Resume */}
      <CareerTimeline setCurrentPage={setCurrentPage} />

      {/* Embedded Gear Section */}
      <GearSection />

      {/* Embedded Behind The Scenes */}
      <BehindTheScenes />

      {/* Live Availability Hiring Banner */}
      <AvailabilityCTA setCurrentPage={setCurrentPage} />

    </motion.div>
  );
};

export default About;


