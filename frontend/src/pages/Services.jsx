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
import heroBg from '../assets/images/hero-bg.png';
import api from '../api';

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
    <div className="space-y-4 max-w-[1550px] mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = open === idx;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.07 }}
            className={`rounded-3xl sm:rounded-[2rem] border-2 overflow-hidden transition-all duration-300 ${isOpen
                ? 'border-[#6B1D2F] bg-white shadow-xl shadow-[#6B1D2F]/08'
                : 'border-[#C59A9F]/50 bg-white hover:border-[#6B1D2F] shadow-sm hover:shadow-md'
              }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              className="w-full flex items-center justify-between gap-6 p-6 sm:p-8 sm:px-10 text-left group"
            >
              <h4
                className={`text-base sm:text-xl font-black leading-snug transition-colors ${isOpen ? 'text-[#6B1D2F]' : 'text-[#1C1917]'
                  }`}
                style={{ fontFamily: theme.fonts.heading }}
              >
                {faq.q}
              </h4>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen
                  ? 'bg-[#6B1D2F] text-white shadow-md shadow-[#6B1D2F]/25'
                  : 'bg-[#FAFAF9] border border-[#C59A9F]/40 text-[#6B1D2F] group-hover:bg-[#6B1D2F] group-hover:text-white'
                }`}>
                <ChevronDown
                  size={18}
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
                  <p className="px-6 sm:px-10 pb-7 sm:pb-8 text-sm sm:text-base text-[#292524] font-medium leading-relaxed border-t border-[#C59A9F]/30 pt-5">
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
  const [cards, setCards] = useState(serviceCards);

  React.useEffect(() => {
    async function loadServices() {
      try {
        const data = await api.services.getAll();
        if (data && data.length > 0) setCards(data);
      } catch (err) {
        console.warn('Using default service cards');
      }
    }
    loadServices();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAFAF9] mesh-bg pt-28 sm:pt-36 pb-0 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Motion Flow Background Image Layer 1: hero-bg.png */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          x: ['0%', '-2%', '0%'],
          y: ['0%', '-1.5%', '0%'],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 z-0 pointer-events-none opacity-25 mix-blend-multiply"
      >
        <img
          src={heroBg}
          alt="Hero Flow Texture"
          className="w-full h-full object-cover object-center filter blur-[1px]"
        />
      </motion.div>

      {/* Motion Flow Layer 2: Floating alazar.png visual element */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 1.5, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-10 right-0 sm:right-10 md:right-20 w-[380px] sm:w-[500px] md:w-[650px] opacity-10 sm:opacity-20 md:opacity-25 pointer-events-none z-0 mix-blend-multiply filter blur-[0.5px]"
      >
        <img
          src={alazarImg}
          alt="Alazar Motion Flow"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-[#6B1D2F]/18 via-[#8B1E3F]/12 to-[#C59A9F]/20 blur-[180px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-[#C59A9F]/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">

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
            <span className="text-gradient-burgundy font-black">Process</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#1C1917] font-medium text-base md:text-lg leading-relaxed max-w-2xl mx-auto bg-white/85 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-[#C59A9F]/40 shadow-sm"
          >
            Whether you need remote video editing or full on-set production — senior-level creative work, transparent pricing, and on-time delivery every time.
          </motion.p>
        </div>

        {/* ── Service cards ─────────────────────────────────────────────── */}
        <div id="services-list" className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1550px] mx-auto mb-0">
          {cards.map((svc, idx) => (
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
                <p className="text-[#292524] mb-8 font-normal leading-relaxed text-sm">
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
      <div id="why-hire-me">
        <WhyHireMe />
      </div>
      <div id="calculator">
        <ProjectCalculator />
      </div>
      <WorkflowVault />

      {/* ── FAQ accordion ─────────────────────────────────────────────── */}
      <div id="faq">
        <section
          className="py-28 sm:py-36 relative overflow-hidden"
          style={{ fontFamily: theme.fonts.body, background: '#FAFAF9' }}
        >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6B1D2F]/06 blur-[160px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">
          <div className="text-center mb-14 sm:mb-18 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C59A9F]/40 text-[11px] font-black text-[#6B1D2F] uppercase tracking-widest shadow-sm mb-5"
            >
              <HelpCircle size={12} /> Common Questions
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.06] tracking-tight"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Frequently Asked<br />
              <span className="text-gradient-burgundy font-black">Questions.</span>
            </motion.h2>
          </div>

          <FaqAccordion faqs={faqs} />
        </div>
      </section>
      </div>

      <AvailabilityCTA />
    </motion.div>
  );
}
