import React from 'react';
import { motion } from 'framer-motion';
import { Film, PenTool, Sparkles, Quote, ArrowRight, Layers } from 'lucide-react';
import Button from '../common/Button';
import { theme } from '../../utils/constants';

export const AboutSnapshot = ({ setCurrentPage }) => {
  return (
    <section className="py-28 bg-[#FAFAF9] relative overflow-hidden" style={{ fontFamily: theme.fonts.body }}>
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#6B1D2F]/10 via-[#8B2440]/05 to-[#C59A9F]/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10 text-center flex flex-col items-center">
        
        {/* Centered Section Header Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white border-2 border-[#6B1D2F]/30 text-xs tracking-widest text-[#6B1D2F] uppercase mb-8 shadow-md hover:border-[#6B1D2F] transition-all shimmer-border group"
        >
          <Sparkles size={14} className="text-[#6B1D2F] group-hover:rotate-12 transition-transform" />
          <span className="font-black tracking-wider">About Me</span>
        </motion.div>

        {/* High-Contrast Main Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-[#1C1917] tracking-tight max-w-4xl mx-auto mb-6 leading-[1.1]" 
          style={{ fontFamily: theme.fonts.heading }}
        >
          Video Director & <span className="italic font-light text-gradient-burgundy">Creative Designer</span>
        </motion.h2>

        {/* High-Contrast Centered Paragraph Copy */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[#1A1817] max-w-3xl mx-auto leading-relaxed font-medium mb-12"
        >
          I combine high-octane video editing and graphic design to help visionary brands share clear, engaging stories. With over 8 years of post-production mastery, color science, and brand design, I bring a focused, high-impact approach to every project.
        </motion.p>

        {/* Feature Cards Centered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl mb-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="bg-white p-8 rounded-3xl border border-[#C59A9F]/40 shadow-xl shadow-black/5 hover:border-[#6B1D2F] hover:shadow-2xl transition-all text-center flex flex-col items-center justify-between"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#F5E8EA] border border-[#C59A9F]/40 flex items-center justify-center text-[#6B1D2F] mb-6 shadow-md">
                <Film size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#1C1917] mb-2" style={{ fontFamily: theme.fonts.heading }}>
                Video Editing & Post-Production
              </h3>
              <p className="text-sm text-[#1A1817] font-medium leading-relaxed">
                Paced cutting, commercial video reels, music synchronization, sound design, and cinematic color grading.
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-[#E5D9DB] w-full flex items-center justify-center gap-1 text-xs uppercase tracking-widest text-[#6B1D2F] font-black">
              <span>Post-Production Mastery</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ y: -6 }}
            className="bg-white p-8 rounded-3xl border border-[#C59A9F]/40 shadow-xl shadow-black/5 hover:border-[#6B1D2F] hover:shadow-2xl transition-all text-center flex flex-col items-center justify-between"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#F5E8EA] border border-[#C59A9F]/40 flex items-center justify-center text-[#6B1D2F] mb-6 shadow-md">
                <PenTool size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#1C1917] mb-2" style={{ fontFamily: theme.fonts.heading }}>
                Graphic Design & Visual Systems
              </h3>
              <p className="text-sm text-[#1A1817] font-medium leading-relaxed">
                Brand identity guidelines, poster graphics, editorial print layouts, motion graphics, and digital asset suites.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5D9DB] w-full flex items-center justify-center gap-1 text-xs uppercase tracking-widest text-[#6B1D2F] font-black">
              <span>Brand Identity Science</span>
            </div>
          </motion.div>

        </div>

        {/* Centered Director's Creed Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-4xl bg-white p-8 rounded-3xl border border-[#C59A9F]/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center flex-shrink-0">
              <Quote size={22} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#6B1D2F] font-black mb-0.5">Director's Creed</p>
              <p className="text-sm text-[#1C1917] italic font-bold">"Clear storytelling and purposeful timing make every cut resonate."</p>
            </div>
          </div>

          <Button 
            variant="primary"
            icon={<ArrowRight size={16} />}
            onClick={() => {
              if (setCurrentPage) setCurrentPage('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 text-xs font-black uppercase tracking-wider rounded-full shadow-md"
          >
            Learn More About Me
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSnapshot;

