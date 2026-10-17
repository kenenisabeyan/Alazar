import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, Layers, Film, Download,
  ShieldCheck, ArrowRight, CheckCircle2,
} from 'lucide-react';
import { theme } from '../../constants';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Creative Brief',
    subtitle: 'Alignment & Vision',
    desc: 'Deep-dive discovery session to align on your creative goals, target audience, style references, technical requirements, and delivery timeline.',
    details: ['Project goals & KPIs defined', 'Style references & mood board review', 'Technical specs & delivery formats agreed', 'Timeline & milestone schedule set'],
    duration: '1 Day',
    color: '#6B1D2F',
  },
  {
    number: '02',
    icon: Layers,
    title: 'Draft & Review',
    subtitle: 'Collaborative Iteration',
    desc: 'Review annotated video drafts and design concepts online with timecoded feedback instead of email chains. Direct, frame-accurate collaboration.',
    details: ['Frame.io timecoded review link provided', 'Unlimited annotation comments', '2 structured revision rounds included', 'Screen-share sessions available on demand'],
    duration: '2–4 Days',
    color: '#8B1E3F',
  },
  {
    number: '03',
    icon: Film,
    title: 'Polish & Grade',
    subtitle: 'Precision Finishing',
    desc: 'Final color grade, Fairlight audio polish, sound FX layering, motion graphics rendering, and export quality control across all formats.',
    details: ['DaVinci Resolve professional color grade', 'Broadcast-compliant audio master', 'Motion graphics & title card finalization', 'All formats: 4K, 1080p, vertical & square'],
    duration: '1–2 Days',
    color: '#6B1D2F',
  },
  {
    number: '04',
    icon: Download,
    title: 'Final Delivery',
    subtitle: 'Master Archive Package',
    desc: 'Secure cloud delivery of all finished assets including master files, social cuts, project sources, and audio stems, fully organized and archived.',
    details: ['ProRes 422 HQ 4K/8K master files', 'All social media format cuts included', 'Source project files & RAW footage', 'Permanent secure archive link'],
    duration: '1 Day',
    color: '#6B1D2F',
  },
];

export const WorkflowVault = () => {
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[activeStep];
  const Icon = step.icon;

  return (
    <section
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body, background: '#FAFAF9' }}
    >
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C59A9F]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#6B1D2F] font-black mb-4 block"
            >
              <ShieldCheck size={13} /> Client Process
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.06] tracking-tight break-words"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Simple & Transparent<br />
              <span className="text-gradient-burgundy font-black">Production Workflow.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#1C1917] font-medium text-sm sm:text-base max-w-xs leading-relaxed bg-white/85 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#C59A9F]/40 shadow-sm"
          >
            Four clear phases from initial brief to final delivery with zero confusion and full transparency.
          </motion.p>
        </div>

        {/* Step selector + detail panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Left: step selectors */}
          <div className="lg:col-span-5 grid grid-cols-2 lg:flex lg:flex-col gap-2.5 sm:gap-3">
            {steps.map((s, idx) => {
              const StepIcon = s.icon;
              const isActive = idx === activeStep;
              return (
                <motion.button
                  key={s.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-center lg:text-left flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 p-3 sm:p-5 rounded-2xl border-2 transition-all duration-300 group ${isActive
                      ? 'bg-[#6B1D2F] border-[#6B1D2F] text-white shadow-xl shadow-[#6B1D2F]/25'
                      : 'bg-white border-[#C59A9F]/50 text-[#1C1917] hover:border-[#6B1D2F]'
                    }`}
                >
                  {/* Number badge */}
                  <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mx-auto lg:mx-0 flex-shrink-0 font-black text-xs sm:text-sm transition-all ${isActive
                      ? 'bg-white/20 text-white shadow-md'
                      : 'bg-[#FAFAF9] text-[#6B1D2F] group-hover:bg-[#6B1D2F] group-hover:text-white'
                    }`}>
                    {s.number}
                  </div>

                  <div className="flex-1 min-w-0 w-full">
                    <p className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-0.5 ${isActive ? 'text-[#FAFAF9]/80' : 'text-[#292524]'}`}>
                      {s.subtitle}
                    </p>
                    <h4 className={`text-xs sm:text-sm font-black leading-tight break-normal whitespace-normal ${isActive ? 'text-white' : 'text-[#1C1917]'}`}
                      style={{ fontFamily: theme.fonts.heading }}>
                      {s.title}
                    </h4>
                  </div>

                  <div className={`text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full mt-1 lg:mt-0 flex-shrink-0 ${isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#FAFAF9] text-[#6B1D2F]'
                    }`}>
                    {s.duration}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: detail card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-white rounded-[2rem] border border-[#C59A9F] shadow-xl p-5 sm:p-8 md:p-10 flex flex-col"
              >
                {/* Icon + step */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white flex items-center justify-center shadow-xl shadow-[#6B1D2F]/25 flex-shrink-0">
                      <Icon size={22} className="sm:scale-125" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#6B1D2F] mb-0.5">
                        Step {step.number} / {steps.length}
                      </p>
                      <h3
                        className="text-2xl font-black text-[#1C1917]"
                        style={{ fontFamily: theme.fonts.heading }}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[11px] font-black text-[#6B1D2F] bg-[#FAFAF9] border border-[#C59A9F]/50 px-3 py-1.5 rounded-full flex-shrink-0">
                    {step.duration}
                  </span>
                </div>

                <p className="text-[#292524] font-medium leading-relaxed mb-8 text-sm sm:text-base flex-grow">
                  {step.desc}
                </p>

                <div className="pt-6 border-t border-[#C59A9F]">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#6B1D2F] mb-4">
                    What's Included
                  </p>
                  <ul className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {step.details.map((d, i) => (
                      <li key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-2.5 text-xs text-[#1C1917] font-medium p-2.5 sm:p-0 rounded-xl bg-[#FAFAF9] sm:bg-transparent border border-[#C59A9F]/20 sm:border-0">
                        <CheckCircle2 size={13} className="text-[#6B1D2F] flex-shrink-0 mx-auto sm:mx-0" />
                        <span className="break-normal whitespace-normal">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step nav */}
                <div className="flex items-center gap-3 mt-8">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(s => s - 1)}
                    className="w-9 h-9 rounded-full border border-[#C59A9F] flex items-center justify-center text-[#292524] hover:border-[#6B1D2F] hover:text-[#6B1D2F] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ArrowRight size={14} className="rotate-180" />
                  </button>
                  <div className="flex gap-1.5 flex-1 justify-center">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`h-1.5 rounded-full transition-all ${i === activeStep ? 'w-8 bg-[#6B1D2F]' : 'w-1.5 bg-[#C59A9F]/50'
                          }`}
                      />
                    ))}
                  </div>
                  <button
                    disabled={activeStep === steps.length - 1}
                    onClick={() => setActiveStep(s => s + 1)}
                    className="w-9 h-9 rounded-full border border-[#C59A9F] flex items-center justify-center text-[#292524] hover:border-[#6B1D2F] hover:text-[#6B1D2F] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowVault;
