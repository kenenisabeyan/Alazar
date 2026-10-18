import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Clock, FileCheck, Music,
  MessageCircle, ArrowRight, CheckCircle2, Compass,
} from 'lucide-react';
import { hiringGuarantees, theme } from '../../constants';

const guaranteeIcons = [Clock, FileCheck, MessageCircle, Music];

const differentiators = [
  'Direct 1-on-1 communication, no agency middlemen',
  '8K RAW master delivery as standard',
  'Broadcast & streaming colour-space compliance',
  'Rapid prototyping: first rough cut in 48 hours',
  'Parallel video + design capability in one workflow',
  '100% on-time record across 140+ projects',
];

export const WhyHireMe = () => {
  const navigate = useNavigate();

  return (
    <section
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body, background: '#FAFAF9' }}
    >
      {/* Ambient */}
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-[#6B1D2F]/07 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.06] tracking-tight break-words"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Why Hire<br />
              <span className="text-gradient-burgundy font-black">Alazar?</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#1C1917] font-medium text-base max-w-sm leading-relaxed bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#C59A9F]/40 shadow-sm"
          >
            A dedicated senior specialist, not an agency. Faster, sharper, and fully invested in your project's success.
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

          {/* Left: Guarantee cards */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-2.5 sm:gap-5">
            {hiringGuarantees.map((item, idx) => {
              const Icon = guaranteeIcons[idx % guaranteeIcons.length];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-card-luxury p-3 sm:p-5 md:p-6 rounded-2xl flex flex-col items-center justify-center text-center"
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-none bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white flex items-center justify-center shadow-md shadow-[#6B1D2F]/25 flex-shrink-0 mb-2 sm:mb-3">
                    <Icon size={18} />
                  </div>
                  <h4
                    className="text-xs sm:text-base font-black text-[#1C1917] dark:text-[#F5F0F1] leading-tight mb-1 text-center break-words"
                    style={{ fontFamily: theme.fonts.heading }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-[#292524] dark:text-[#A89597] font-medium leading-relaxed mb-2 text-center line-clamp-3 sm:line-clamp-none">
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-[8.5px] sm:text-[10px] text-[#6B1D2F] dark:text-[#C59A9F] font-black uppercase tracking-wider text-center mt-auto">
                    <ShieldCheck size={11} className="flex-shrink-0" />
                    <span>Guaranteed</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: differentiators panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 bg-gradient-to-br from-[#6B1D2F] via-[#521523] to-[#3B0E19] rounded-2xl p-5 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-xl shadow-[#6B1D2F]/20 border border-[#C59A9F]/20"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-white/20 border border-white/20 text-[11px] font-black text-white uppercase tracking-widest mb-8">
                <Compass size={12} /> What Sets Me Apart
              </div>

              <h3
                className="text-2xl font-black text-white mb-8 leading-tight"
                style={{ fontFamily: theme.fonts.heading }}
              >
                The senior freelancer advantage: no agency overhead, full creative control.
              </h3>

              <ul className="space-y-4">
                {differentiators.map((d, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3 text-sm text-white/95 font-normal leading-relaxed"
                  >
                    <CheckCircle2 size={16} className="text-[#C59A9F] mt-0.5 flex-shrink-0" />
                    {d}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-8 border-t border-white/15 relative z-10">
              <button
                onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
                className="w-full py-4 rounded-xl bg-white text-[#6B1D2F] hover:bg-[#FAFAF9] text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 group shadow-lg"
              >
                Start a Project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 p-5 sm:p-8 bg-gradient-to-r from-[#6B1D2F] to-[#8B1E3F] rounded-2xl shadow-xl shadow-[#6B1D2F]/20"
        >
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-black text-white mb-1" style={{ fontFamily: theme.fonts.heading }}>
              Ready to Build Something Exceptional?
            </h3>
            <p className="text-white/90 text-xs font-medium">
              Get a free estimate within 24 hours. Currently accepting Q3/Q4 projects.
            </p>
          </div>
          <button
            onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
            className="flex-shrink-0 flex items-center gap-2.5 px-8 py-3.5 rounded-none bg-white text-[#6B1D2F] text-xs font-black uppercase tracking-widest hover:bg-[#FAFAF9] shadow-xl transition-all duration-300 group"
          >
            Get Free Estimate <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyHireMe;
