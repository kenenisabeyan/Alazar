import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, CheckCircle2, Zap, Film, PenTool, Camera } from 'lucide-react';
import { skillsMatrix, theme } from '../../constants';

const catIcons = [Film, PenTool, Camera];

export const SkillsSection = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const matrix = (data && data.length) ? data.map(cat => ({
    category: cat.name,
    tagline: cat.description,
    skills: (cat.skills || []).map(s => ({
      name: s.name,
      level: s.percentage,
      desc: s.description
    }))
  })) : skillsMatrix;

  return (
    <section
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{
        fontFamily: theme.fonts.body,
        background: 'linear-gradient(160deg,#FAFAF91A 0%,#FAFAF9 35%,#FAFAF9 100%)',
      }}
    >
      {/* Ambient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6B1D2F]/06 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#C59A9F]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#6B1D2F] font-black mb-4 block"
            >
              <Cpu size={13} /> Technical Expertise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.06] tracking-tight"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Software &<br />
              <span className="text-gradient-burgundy font-black">Skills Matrix.</span>
            </motion.h2>
          </div>

          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="inline-flex bg-white border border-[#C59A9F] rounded-full p-1.5 shadow-sm gap-1"
          >
            {matrix.map((cat, idx) => {
              const Icon = catIcons[idx % catIcons.length];
              const isActive = idx === activeCategory;
              return (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategory(idx)}
                  className={`relative px-4 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${isActive ? 'text-white' : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="skillTab"
                      className="absolute inset-0 bg-[#6B1D2F] rounded-full -z-10 shadow-md shadow-[#6B1D2F]/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon size={12} />
                  <span className="hidden sm:inline">{cat.category.split(' ')[0]}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ── Active category label ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {/* Category headline */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-[#FAFAF9] text-[#6B1D2F] flex items-center justify-center">
                {React.createElement(catIcons[activeCategory % catIcons.length], { size: 18 })}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#6B1D2F]">
                  Discipline
                </p>
                <h3
                  className="text-lg font-black text-[#1C1917]"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  {(matrix[activeCategory] || matrix[0])?.category}
                </h3>
              </div>
              <div className="ml-auto text-[11px] text-[#78716C] font-medium">
                {(matrix[activeCategory] || matrix[0])?.skills.length || 0} skills
              </div>
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {((matrix[activeCategory] || matrix[0])?.skills || []).map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  className="glass-card-luxury rounded-2xl p-6 sm:p-7 flex flex-col gap-4"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white flex items-center justify-center shadow-lg shadow-[#6B1D2F]/20 flex-shrink-0">
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <h4
                          className="text-sm font-black text-[#1C1917] leading-tight"
                          style={{ fontFamily: theme.fonts.heading }}
                        >
                          {skill.name}
                        </h4>
                        <p className="text-[10px] text-[#78716C] font-medium mt-0.5">{skill.desc}</p>
                      </div>
                    </div>
                    {/* Mastery badge */}
                    <span className="flex-shrink-0 text-xs font-black text-[#6B1D2F] bg-[#FAFAF9] border border-[#C59A9F]/40 px-3 py-1 rounded-full">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="w-full bg-[#FAFAF9] rounded-full h-2 overflow-hidden border border-[#C59A9F]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: idx * 0.08, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-[#6B1D2F] via-[#8B1E3F] to-[#C59A9F]"
                      />
                    </div>
                    <div className="flex justify-between text-[9px] font-bold text-[#C59A9F] uppercase tracking-widest">
                      <span>Beginner</span>
                      <span className="flex items-center gap-1">
                        <Zap size={9} /> Expert Level
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom software logos strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-14 p-6 bg-gradient-to-r from-[#6B1D2F] via-[#8B1E3F] to-[#6B1D2F] rounded-2xl flex flex-wrap items-center justify-center gap-4 sm:gap-8 shadow-lg shadow-[#6B1D2F]/20"
        >
          {[
            'DaVinci Resolve', 'Adobe Premiere', 'After Effects',
            'Photoshop', 'Illustrator', 'Figma', 'Blender 3D',
          ].map((tool) => (
            <span
              key={tool}
              className="text-[11px] font-black uppercase tracking-widest text-white/80 hover:text-white transition-colors cursor-default"
            >
              {tool}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default SkillsSection;
