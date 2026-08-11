import React from 'react';
import { motion } from 'framer-motion';
import { Film, PenTool, Award, Camera, CheckCircle2, Sparkles } from 'lucide-react';
import Button from '../components/common/Button';
import GearSection from '../components/sections/GearSection';
import ClientLogos from '../components/sections/ClientLogos';
import BehindTheScenes from '../components/sections/BehindTheScenes';
import { theme, awardsList } from '../utils/constants';

export const About = ({ setCurrentPage }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAFAF9] pt-36 pb-24"
      style={{ fontFamily: theme.fonts.body }}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header Hero */}
        <div className="grid md:grid-cols-12 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-6 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5E8EA] border border-[#C59A9F]/40 text-xs tracking-widest text-[#6B1D2F] uppercase font-semibold">
              <Sparkles size={14} /> Director & Lead Editor
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-[#1C1917] leading-tight" style={{ fontFamily: theme.fonts.heading }}>
              Alazar Asdesach.<br />
              <span className="italic font-light text-[#6B1D2F]">Master of Motion & Tone.</span>
            </h1>

            <p className="text-[#78716C] font-light text-base md:text-lg leading-relaxed">
              With over 8 years behind camera viewfinders and DaVinci Resolve suites, I direct, edit, and color grade high-impact visual stories for global fashion labels, luxury brands, and music artists.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="primary" onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>
                Explore Filmography
              </Button>
              <Button variant="outline" onClick={() => { setCurrentPage('contact'); window.scrollTo(0,0); }}>
                Initiate Collaboration
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#E5D9DB] shadow-lg bg-white">
              <img 
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Alazar Asdesach Portrait" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/70 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E5D9DB] shadow-md text-left">
                <p className="text-xs uppercase tracking-widest text-[#6B1D2F] font-bold mb-1">Directorial Creed</p>
                <p className="text-xs text-[#1C1917] italic">"Every cut should serve the emotion; every frame must feel intentional."</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Philosophy Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-8 rounded-2xl border border-[#E5D9DB] shadow-sm text-left">
            <div className="w-12 h-12 rounded-xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center mb-6">
              <Film size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#1C1917] mb-3" style={{ fontFamily: theme.fonts.heading }}>
              Kinetic Pacing
            </h3>
            <p className="text-xs text-[#78716C] font-light leading-relaxed">
              Matching rhythmic cuts, speed-ramping, and audio transients so video content holds audience attention seamlessly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#E5D9DB] shadow-sm text-left">
            <div className="w-12 h-12 rounded-xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center mb-6">
              <Camera size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#1C1917] mb-3" style={{ fontFamily: theme.fonts.heading }}>
              Anamorphic Optics
            </h3>
            <p className="text-xs text-[#78716C] font-light leading-relaxed">
              Crafting wide 2.39:1 widescreen cinema aspect ratios with organic lens flares and rich depth of field.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#E5D9DB] shadow-sm text-left">
            <div className="w-12 h-12 rounded-xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center mb-6">
              <PenTool size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#1C1917] mb-3" style={{ fontFamily: theme.fonts.heading }}>
              Color Science
            </h3>
            <p className="text-xs text-[#78716C] font-light leading-relaxed">
              Executing Kodak film print emulations and Rec.709/DCI-P3 mastering in DaVinci Resolve Studio 19.
            </p>
          </div>
        </div>

      </div>

      {/* Embedded Gear Section */}
      <GearSection />

      {/* Embedded Client Logos & Recognition */}
      <ClientLogos />

      {/* Embedded Behind The Scenes */}
      <BehindTheScenes />

    </motion.div>
  );
};

export default About;
