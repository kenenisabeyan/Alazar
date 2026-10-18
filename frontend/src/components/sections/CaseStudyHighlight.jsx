import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, CheckCircle2, ArrowRight, ArrowUpRight, Film, PenTool } from 'lucide-react';
import { caseStudies, theme } from '../../constants';

const catIcon = (client) => {
  if (['Vanguard Apparel', 'Apex Motors', 'Oak & Iron Media'].includes(client)) return Film;
  return PenTool;
};

export const CaseStudyHighlight = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const current = caseStudies[active];
  const Icon = catIcon(current.client);

  return (
    <section
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body, background: '#FAFAF9' }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#6B1D2F]/06 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.06] tracking-tight break-words"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Real Results for<br />
              <span className="text-gradient-burgundy font-black">Real Clients.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {caseStudies.map((cs, idx) => (
              <button
                key={cs.id}
                onClick={() => setActive(idx)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-all ${active === idx
                    ? 'bg-[#6B1D2F] text-white shadow-lg shadow-[#6B1D2F]/25'
                    : 'bg-white border border-[#C59A9F] text-[#292524] hover:border-[#6B1D2F] hover:text-[#6B1D2F]'
                  }`}
              >
                {cs.client}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Featured case + sidebar grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Featured panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-7 relative rounded-[2rem] overflow-hidden min-h-[340px] sm:min-h-[420px] bg-gradient-to-br from-[#6B1D2F] via-[#521523] to-[#3B0E19] shadow-2xl shadow-[#6B1D2F]/25 flex flex-col justify-end border border-[#C59A9F]/30"
            >
              {/* Background image */}
              <img
                src={current.image}
                alt={current.project}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B0E19] via-[#6B1D2F]/60 to-transparent" />

              {/* Ambient glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#6B1D2F]/30 blur-[80px] rounded-full pointer-events-none" />

              <div className="relative z-10 p-5 sm:p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6B1D2F] text-[10px] font-black text-white uppercase tracking-widest">
                    <Icon size={11} /> {current.client}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black text-white/80 uppercase tracking-widest">
                    <TrendingUp size={11} /> {current.result}
                  </span>
                </div>

                <h3
                  className="text-2xl sm:text-4xl font-black text-white mb-3 leading-tight"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  {current.project}
                </h3>

                {/* Giant metric */}
                <div className="flex items-end gap-3 mb-6">
                  <span
                    className="text-6xl sm:text-7xl font-black text-[#C59A9F] leading-none"
                    style={{ fontFamily: theme.fonts.heading }}
                  >
                    {current.metric}
                  </span>
                  <span className="text-xs font-bold text-white/50 uppercase tracking-widest pb-2">
                    {current.metricLabel}
                  </span>
                </div>

                {/* Deliverables */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {current.deliverables.map((d) => (
                    <span
                      key={d}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold text-white/80"
                    >
                      <CheckCircle2 size={10} className="text-[#C59A9F]" /> {d}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => { navigate('/portfolio'); window.scrollTo(0, 0); }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#6B1D2F] text-[11px] font-black uppercase tracking-widest hover:bg-[#FAFAF9] transition-all group shadow-xl"
                >
                  View Full Project <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Sidebar — other case study cards */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {caseStudies.map((cs, idx) => {
              const CsIcon = catIcon(cs.client);
              const isActive = idx === active;
              return (
                <motion.div
                  key={cs.id}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setActive(idx)}
                  className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 flex items-center gap-5 ${isActive
                      ? 'bg-[#6B1D2F] border-[#6B1D2F] shadow-xl shadow-[#6B1D2F]/20'
                      : 'bg-white border-[#C59A9F] hover:border-[#C59A9F] hover:shadow-md'
                    }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-[#FAFAF9] text-[#6B1D2F]'
                    }`}>
                    <CsIcon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isActive ? 'text-white/60' : 'text-[#292524]'}`}>
                      {cs.client}
                    </p>
                    <h4 className={`text-sm font-black truncate ${isActive ? 'text-white' : 'text-[#1C1917]'}`}
                      style={{ fontFamily: theme.fonts.heading }}>
                      {cs.project}
                    </h4>
                    <p className={`text-xs font-semibold mt-1 flex items-center gap-1 ${isActive ? 'text-[#FAFAF9]' : 'text-[#6B1D2F]'}`}>
                      <TrendingUp size={11} /> {cs.result}
                    </p>
                  </div>
                  <div className={`text-2xl font-black flex-shrink-0 ${isActive ? 'text-white' : 'text-[#6B1D2F]'}`}
                    style={{ fontFamily: theme.fonts.heading }}>
                    {cs.metric}
                  </div>
                </motion.div>
              );
            })}

            {/* Bottom prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-auto pt-4"
            >
              <button
                onClick={() => { navigate('/portfolio'); window.scrollTo(0, 0); }}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-[#C59A9F]/60 text-[#6B1D2F] text-[11px] font-black uppercase tracking-widest hover:border-[#6B1D2F] hover:bg-[#FAFAF9]/50 transition-all group"
              >
                View All Projects <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHighlight;
