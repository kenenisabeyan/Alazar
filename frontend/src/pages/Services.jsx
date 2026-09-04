import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, HelpCircle, ChevronDown } from 'lucide-react';

import Button from '../components/common/Button';
import ExpertiseSection from '../components/sections/ExpertiseSection';
import ProjectCalculator from '../components/sections/ProjectCalculator';
import WorkflowVault from '../components/sections/WorkflowVault';
import WhyHireMe from '../components/sections/WhyHireMe';
import AvailabilityCTA from '../components/sections/AvailabilityCTA';
import { theme, faqs } from '../constants';
import alazarImg from '../assets/images/alazar.png';

const serviceCards = [
  {
    badge: 'Remote Post-Production',
    badgeDark: false,
    title: 'Video Editing & Post-Production',
    desc: 'High-quality video editing, color grading, sound mixing, and graphic design delivered globally — no travel required.',
    items: ['Cinematic Color Grading', 'Commercial & Documentary Editing', 'Brand Identity & Logo Design', 'Social Media Motion Edits', 'Audio Mixing & Sound Design'],
    cta: 'Request Remote Quote',
    ctaVariant: 'outline',
  },
  {
    badge: 'On-Location Filming',
    badgeDark: true,
    title: 'On-Set Filming & Directing',
    desc: 'On-set camera operation, lighting, live event videography, and full creative direction — available globally.',
    items: ['On-Set Filming & Camera Operation', 'Creative Strategy & Art Direction', 'Live Event & Music Coverage', 'Brand Photoshoots & Video Direction', 'Video Production Consulting'],
    cta: 'Contact for On-Site',
    ctaVariant: 'primary',
  },
];

// ── Upgraded FAQ accordion ────────────────────────────────────────────────────
function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = open === idx;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.07 }}
            className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${isOpen
                ? 'border-[#6B1D2F] bg-white shadow-lg shadow-[#6B1D2F]/08'
                : 'border-[#C59A9F] bg-white hover:border-[#C59A9F] shadow-sm'
              }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              className="w-full flex items-center justify-between gap-4 p-6 text-left group"
            >
              <h4
                className={`text-sm font-black leading-snug transition-colors ${isOpen ? 'text-[#6B1D2F]' : 'text-[#1C1917]'
                  }`}
                style={{ fontFamily: theme.fonts.heading }}
              >
                {faq.q}
              </h4>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen
                  ? 'bg-[#6B1D2F] text-white'
                  : 'bg-[#FAFAF9] text-[#6B1D2F] group-hover:bg-[#6B1D2F] group-hover:text-white'
                }`}>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm text-[#78716C] font-light leading-relaxed border-t border-[#C59A9F] pt-4">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Services() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAFAF9] pt-28 sm:pt-36 pb-0 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Floating portrait */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-0 w-[450px] md:w-[600px] opacity-[0.06] pointer-events-none z-0 mix-blend-luminosity"
      >
        <img src={alazarImg} alt="" className="w-full h-auto object-contain" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">

        {/* ── Page header ──────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#6B1D2F] font-black mb-4 block justify-center"
          >
            <span className="w-8 h-px bg-[#6B1D2F] inline-block" />
            My Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black text-[#1C1917] mb-5 tracking-tight leading-[1.04]"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Services &{' '}
            <span className="italic font-light text-gradient-burgundy">Process</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#78716C] font-light text-base md:text-lg leading-relaxed"
          >
            Whether you need remote video editing or full on-set production — senior-level creative work, transparent pricing, and on-time delivery every time.
          </motion.p>
        </div>

        {/* ── Service cards ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1550px] mx-auto mb-0">
          {serviceCards.map((svc, idx) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className="bg-white border-2 border-[#C59A9F] rounded-[2rem] overflow-hidden shadow-sm hover:border-[#C59A9F] hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* Top accent bar */}
              <div className="h-1 bg-gradient-to-r from-[#6B1D2F] via-[#8B1E3F] to-[#C59A9F]" />

              <div className="p-8 sm:p-10 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-6">
                  <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest ${svc.badgeDark
                      ? 'bg-[#6B1D2F] text-white shadow-md shadow-[#6B1D2F]/25'
                      : 'bg-[#FAFAF9] text-[#6B1D2F] border border-[#C59A9F]/50'
                    }`}>
                    {svc.badge}
                  </span>
                </div>

                <h2
                  className="text-2xl sm:text-3xl font-black text-[#1C1917] mb-4 leading-tight"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  {svc.title}
                </h2>
                <p className="text-[#78716C] mb-8 font-light leading-relaxed text-sm">
                  {svc.desc}
                </p>

                <ul className="space-y-3 mb-10 flex-grow">
                  {svc.items.map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#1C1917] font-medium">
                      <div className="w-6 h-6 rounded-lg bg-[#FAFAF9] text-[#6B1D2F] flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={svc.ctaVariant}
                  className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest"
                  onClick={() => navigate('/contact')}
                >
                  {svc.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Specialist context ─────────────────────────────────────────── */}
      <ExpertiseSection />

      {/* ── Deep content ─────────────────────────────────────────────── */}
      <WhyHireMe />
      <ProjectCalculator />
      <WorkflowVault />

      {/* ── FAQ accordion ─────────────────────────────────────────────── */}
      <section
        className="py-28 sm:py-36 relative overflow-hidden"
        style={{ fontFamily: theme.fonts.body, background: '#FAFAF9' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6B1D2F]/06 blur-[140px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl relative z-10">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C59A9F]/40 text-[11px] font-black text-[#6B1D2F] uppercase tracking-widest shadow-sm mb-5"
            >
              <HelpCircle size={12} /> Common Questions
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl sm:text-5xl font-black text-[#1C1917] leading-[1.06] tracking-tight"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Frequently Asked<br />
              <span className="italic font-light text-gradient-burgundy">Questions.</span>
            </motion.h2>
          </div>

          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <AvailabilityCTA />
    </motion.div>
  );
}
