import React from 'react';
import { motion } from 'framer-motion';
import { Film, Layout, ArrowRight, CheckCircle2 } from 'lucide-react';
import { theme } from '../../utils/constants';

export const ServiceSplitter = ({ setCurrentPage }) => {
  return (
    <section className="py-28 bg-[#2E1216] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center max-w-5xl">
        
        {/* Header Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 space-y-4"
        >
          <span className="text-xs uppercase tracking-widest text-[#8B1E3F] font-semibold">Dual Expertise</span>
          <h2 className="text-4xl md:text-5xl font-normal text-[#F5F0F1]" style={{ fontFamily: theme.fonts.heading }}>
            Two Disciplines.<br />
            <span className="italic text-[#A89597]">One Vision.</span>
          </h2>
          <p className="text-[#A89597] max-w-xl mx-auto font-light text-sm md:text-base">
            Select a core service area to explore our dedicated capabilities, deliverables, and past work.
          </p>
        </motion.div>

        {/* Split Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Card 1: Video Editing */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            whileHover={{ y: -8 }}
            data-cursor="play"
            onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}
            className="cursor-pointer group text-left p-8 md:p-10 bg-[#1E0A0D] border border-white/5 rounded-2xl hover:border-[#8B1E3F]/60 transition-all duration-500 shadow-xl relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Film size={140} />
            </div>

            <div>
              <div className="w-14 h-14 rounded-xl bg-[#2E1216] border border-[#8B1E3F]/40 flex items-center justify-center text-[#8B1E3F] mb-8 group-hover:bg-[#8B1E3F] group-hover:text-white transition-all shadow-lg">
                <Film size={28} />
              </div>
              <h3 className="text-2xl text-[#F5F0F1] mb-3" style={{ fontFamily: theme.fonts.heading }}>
                Video Editing & Motion
              </h3>
              <p className="text-[#A89597] font-light text-sm mb-6 leading-relaxed">
                Cinematic storytelling, commercial edits, rhythmic music cutting, sound mixing, and high-contrast color grading.
              </p>

              <ul className="space-y-2.5 mb-8">
                {['Commercial Reels & Documentaries', 'Color Grading (DaVinci Resolve)', 'Sound Design & Mixing', 'Social Media Motion Cuts'].map((item, idx) => (
                  <li key={idx} className="flex items-center text-xs text-[#F5F0F1]/80 font-light">
                    <CheckCircle2 size={14} className="text-[#8B1E3F] mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center text-xs text-[#8B1E3F] font-semibold uppercase tracking-widest group-hover:text-white transition-colors">
              <span>View Video Projects</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.div>

          {/* Card 2: Graphic Design */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ y: -8 }}
            data-cursor="view"
            onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}
            className="cursor-pointer group text-left p-8 md:p-10 bg-[#1E0A0D] border border-white/5 rounded-2xl hover:border-[#8B1E3F]/60 transition-all duration-500 shadow-xl relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Layout size={140} />
            </div>

            <div>
              <div className="w-14 h-14 rounded-xl bg-[#2E1216] border border-[#8B1E3F]/40 flex items-center justify-center text-[#8B1E3F] mb-8 group-hover:bg-[#8B1E3F] group-hover:text-white transition-all shadow-lg">
                <Layout size={28} />
              </div>
              <h3 className="text-2xl text-[#F5F0F1] mb-3" style={{ fontFamily: theme.fonts.heading }}>
                Graphic Design & Identity
              </h3>
              <p className="text-[#A89597] font-light text-sm mb-6 leading-relaxed">
                Brand identities, editorial layouts, poster art, typographic systems, and high-impact digital assets.
              </p>

              <ul className="space-y-2.5 mb-8">
                {['Brand Identity & Guidelines', '3D & Event Poster Art', 'Editorial Spread Layouts', 'Digital Design Kits'].map((item, idx) => (
                  <li key={idx} className="flex items-center text-xs text-[#F5F0F1]/80 font-light">
                    <CheckCircle2 size={14} className="text-[#8B1E3F] mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center text-xs text-[#8B1E3F] font-semibold uppercase tracking-widest group-hover:text-white transition-colors">
              <span>View Design Projects</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ServiceSplitter;
