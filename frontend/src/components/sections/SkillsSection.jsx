import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, CheckCircle2, Award, Zap } from 'lucide-react';
import { skillsMatrix, theme } from '../../utils/constants';

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="py-28 bg-[#FAFAF9] relative overflow-hidden" style={{ fontFamily: theme.fonts.body }}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold block flex items-center justify-center gap-1.5"
          >
            <Cpu size={14} className="text-[#6B1D2F]" />
            Technical Expertise
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#1C1917]"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Software & <span className="italic font-light text-[#6B1D2F]">Skills Matrix</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#78716C] font-light text-base"
          >
            Mastery of industry-standard tools, editing platforms, color suites, and motion design software.
          </motion.p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {skillsMatrix.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(idx)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeCategory === idx 
                  ? 'bg-[#6B1D2F] text-white shadow-sm' 
                  : 'bg-white text-[#78716C] border border-[#E5D9DB] hover:text-[#1C1917]'
              }`}
            >
              <Zap size={14} /> {cat.category}
            </button>
          ))}
        </div>

        {/* Active Skills Grid with Animated Bars */}
        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skillsMatrix[activeCategory].skills.map((skill, idx) => (
            <div 
              key={idx}
              className="bg-white p-7 rounded-2xl border border-[#E5D9DB] shadow-sm hover:border-[#C59A9F] transition-all text-center flex flex-col items-center justify-between space-y-4"
            >
              <div className="flex flex-col items-center w-full">
                <div className="w-12 h-12 rounded-xl bg-[#F5E8EA] border border-[#C59A9F]/40 flex items-center justify-center text-[#6B1D2F] mx-auto mb-3 shadow-sm">
                  <CheckCircle2 size={22} />
                </div>
                
                <h4 className="text-base font-bold text-[#1C1917] mb-1">{skill.name}</h4>
                
                <span className="text-xs font-bold text-[#6B1D2F] px-3 py-1 bg-[#F5E8EA] rounded-full mb-3 inline-block">
                  {skill.level}% Mastery
                </span>

                <p className="text-xs text-[#78716C] font-light leading-relaxed text-center">
                  {skill.desc}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#FAFAF9] rounded-full h-2.5 border border-[#E5D9DB] overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-[#6B1D2F] to-[#8B2440] rounded-full"
                />
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default SkillsSection;
