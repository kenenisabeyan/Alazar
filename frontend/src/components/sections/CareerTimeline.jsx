import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, Download, Calendar, MapPin,
  CheckCircle2, ArrowRight, Award,
} from 'lucide-react';
import Button from '../common/Button';
import { careerExperience, awardsList, theme } from '../../constants';

export const CareerTimeline = () => {
  const [expanded, setExpanded] = useState(0);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Alazar_Asdesach_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body, background: '#FAFAF9' }}
    >
      {/* Ambient */}
      <div className="absolute -top-20 right-0 w-[450px] h-[450px] bg-[#6B1D2F]/06 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#6B1D2F] font-black mb-4 block"
            >
              <Briefcase size={13} /> Work History
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.06] tracking-tight"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Career<br />
              <span className="text-gradient-burgundy font-black">Experience.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <Button variant="primary" icon={<Download size={15} />} onClick={handleDownloadCV}>
              Download Full Resume
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── Left: accordion timeline ── */}
          <div className="lg:col-span-7 space-y-4">
            {careerExperience.map((exp, idx) => {
              const isOpen = expanded === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`rounded-2xl border-2 overflow-hidden transition-all duration-400 ${isOpen
                      ? 'border-[#6B1D2F] shadow-xl shadow-[#6B1D2F]/10 bg-white'
                      : 'border-[#C59A9F] bg-white hover:border-[#C59A9F] shadow-sm'
                    }`}
                >
                  {/* Clickable header */}
                  <button
                    onClick={() => setExpanded(isOpen ? -1 : idx)}
                    className="w-full flex items-center gap-4 p-6 text-left group"
                  >
                    {/* Index dot */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm transition-all ${isOpen
                        ? 'bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white shadow-lg shadow-[#6B1D2F]/25'
                        : 'bg-[#FAFAF9] text-[#6B1D2F] group-hover:bg-[#6B1D2F] group-hover:text-white'
                      }`}>
                      0{idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-base font-black leading-tight mb-1 ${isOpen ? 'text-[#6B1D2F]' : 'text-[#1C1917]'}`}
                        style={{ fontFamily: theme.fonts.heading }}
                      >
                        {exp.role}
                      </h3>
                      <p className="text-xs font-semibold text-[#78716C]">{exp.company}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[#78716C] bg-[#FAFAF9] px-2.5 py-1 rounded-full">
                        <Calendar size={10} className="text-[#6B1D2F]" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[#78716C] bg-[#FAFAF9] px-2.5 py-1 rounded-full">
                        <MapPin size={10} className="text-[#6B1D2F]" />
                        {exp.location}
                      </span>
                    </div>

                    <ArrowRight
                      size={16}
                      className={`flex-shrink-0 transition-all duration-300 text-[#C59A9F] ${isOpen ? 'rotate-90' : 'group-hover:translate-x-1'}`}
                    />
                  </button>

                  {/* Expandable body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-7 pt-0 space-y-5 border-t border-[#C59A9F]">
                          <p className="text-sm text-[#78716C] font-light leading-relaxed pt-5">
                            {exp.description}
                          </p>

                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#6B1D2F] mb-3">
                              Key Achievements
                            </p>
                            <ul className="space-y-2">
                              {exp.achievements.map((ach, aIdx) => (
                                <li key={aIdx} className="flex items-start gap-2.5 text-xs text-[#1C1917] font-medium leading-relaxed">
                                  <CheckCircle2 size={14} className="text-[#6B1D2F] mt-0.5 flex-shrink-0" />
                                  {ach}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* ── Right: Awards panel ── */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#6B1D2F] via-[#521523] to-[#3B0E19] text-white rounded-2xl p-7 sm:p-8 relative overflow-hidden shadow-xl shadow-[#6B1D2F]/20 border border-[#C59A9F]/30"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 blur-[60px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-[11px] font-black text-white uppercase tracking-widest mb-8">
                  <Award size={12} /> Industry Recognition
                </div>

                <h3
                  className="text-xl font-black text-white mb-6"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  Awards &<br />Recognitions
                </h3>

                <div className="space-y-4">
                  {awardsList.map((award, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex items-center gap-4 p-4 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/20 text-white flex items-center justify-center flex-shrink-0">
                        <Award size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-white leading-tight truncate">
                          {award.title}
                        </p>
                        <p className="text-[10px] text-white/70 font-medium mt-0.5 truncate">
                          {award.project}
                        </p>
                      </div>
                      <span className="text-[10px] font-black text-white bg-white/20 px-2 py-1 rounded-lg flex-shrink-0">
                        {award.year}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-[#C59A9F] rounded-2xl p-7 flex items-center gap-5"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FAFAF9] text-[#6B1D2F] flex items-center justify-center flex-shrink-0">
                <Briefcase size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#6B1D2F] mb-1">
                  Current Status
                </p>
                <p className="text-sm font-black text-[#1C1917]">
                  Accepting Q3 / Q4 Projects
                </p>
                <p className="text-xs text-[#78716C] font-light mt-0.5">
                  Available Globally — Remote & On-Site
                </p>
              </div>
              <div className="ml-auto flex-shrink-0 w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/40" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
