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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6 text-left relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C59A9F]/40 text-xs tracking-widest text-[#6B1D2F] uppercase font-extrabold shadow-sm shimmer-border">
              <Sparkles size={14} /> Video Director & Designer
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-tight" style={{ fontFamily: theme.fonts.heading }}>
              Alazar Asdesach.<br />
              <span className="italic font-light text-gradient-burgundy">Director & Visual Artist.</span>
            </h1>

            <p className="text-[#78716C] font-light text-base md:text-lg leading-relaxed">
              With over 8 years of experience in video production, cinematic color science, and brand design, I craft clean, visual assets that communicate brand identity with precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto px-8 py-4 rounded-full font-bold uppercase text-xs" onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>
                View Portfolio
              </Button>
              <Button variant="outline" className="w-full sm:w-auto px-8 py-4 rounded-full font-bold uppercase text-xs border-[#6B1D2F] text-[#6B1D2F]" onClick={() => { setCurrentPage('contact'); window.scrollTo(0,0); }}>
                Get In Touch
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#C59A9F]/40 shadow-2xl bg-white">
              <img 
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Alazar Asdesach Portrait" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/75 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 glass-card-luxury rounded-2xl text-left">
                <p className="text-xs uppercase tracking-widest text-[#6B1D2F] font-black mb-1">Director's Creed</p>
                <p className="text-xs text-[#1C1917] italic font-medium">"Paced storytelling, vivid color science, and purposeful design."</p>
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


