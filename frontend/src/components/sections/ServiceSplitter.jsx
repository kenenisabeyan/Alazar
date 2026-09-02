import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Film, PenTool, ArrowRight, CheckCircle2,
  Sliders, Monitor, Layers, Zap,
} from 'lucide-react';
import { theme } from '../../constants';

const services = [
  {
    icon: Film,
    accent: '#6B1D2F',
    accentLight: '#FAFAF9',
    label: 'Post-Production',
    title: 'Video Editing & Motion',
    desc: 'High-octane commercial reels, music video cuts, cinematic color grading, and broadcast-ready sound design — all delivered in 8K master exports.',
    items: [
      { icon: Film, text: 'Commercial & Documentary Editing' },
      { icon: Sliders, text: 'Cinematic Color Grading (RAW → Master)' },
      { icon: Monitor, text: 'Sound Design & Professional Audio Mix' },
      { icon: Zap, text: 'Social Media Vertical & Square Cuts' },
    ],
    cta: 'View Video Projects',
    path: '/portfolio',
    dark: true,
  },
  {
    icon: PenTool,
    accent: '#6B1D2F',
    accentLight: '#FAFAF9',
    label: 'Brand & Identity',
    title: 'Graphic Design & Identity',
    desc: 'Comprehensive logo systems, brand strategy guides, editorial poster art, 3D visual concepts, and scalable digital design assets.',
    items: [
      { icon: PenTool, text: 'Brand Identity & Logo Systems' },
      { icon: Layers, text: 'Poster Art & 3D Motion Graphics' },
      { icon: Monitor, text: 'Magazine & Editorial Print Layouts' },
      { icon: Zap, text: 'Digital UI Kits & Design Systems' },
    ],
    cta: 'View Design Projects',
    path: '/portfolio',
    dark: false,
  },
];

export const ServiceSplitter = () => {
  const navigate = useNavigate();

  return (
    <section
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body, background: 'linear-gradient(170deg, #FAFAF922 0%, #FAFAF9 40%, #FAFAF9 100%)' }}
    >
      {/* Ambient orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#6B1D2F]/06 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C59A9F]/12 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#6B1D2F] font-black mb-4 block"
            >
              <span className="w-8 h-px bg-[#6B1D2F] inline-block" />
              Core Disciplines
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.06] tracking-tight"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Two Disciplines.<br />
              <span className="italic font-light text-gradient-burgundy">One Vision.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#78716C] font-light text-base max-w-xs leading-relaxed"
          >
            Every project benefits from both cinematic video mastery and senior-level graphic design thinking.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {services.map((svc, idx) => {
            const MainIcon = svc.icon;
            return (
              <motion.div
                key={svc.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                onClick={() => { navigate(svc.path); window.scrollTo(0, 0); }}
                className={`group cursor-pointer rounded-[2rem] overflow-hidden border transition-all duration-500 flex flex-col ${svc.dark
                    ? 'bg-gradient-to-br from-[#6B1D2F] via-[#521523] to-[#3B0E19] border-[#C59A9F]/30 shadow-xl shadow-[#6B1D2F]/25 hover:border-[#C59A9F]/60'
                    : 'bg-white border-[#C59A9F]/60 shadow-xl shadow-black/05 hover:border-[#6B1D2F]'
                  }`}
              >
                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-[#6B1D2F] via-[#8B1E3F] to-[#C59A9F]" />

                <div className="p-8 sm:p-10 flex flex-col h-full">
                  {/* Label pill + icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest ${svc.dark
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-[#FAFAF9] text-[#6B1D2F] border border-[#C59A9F]/50'
                      }`}>
                      <MainIcon size={12} /> {svc.label}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${svc.dark ? 'bg-white/20 text-white' : 'bg-[#FAFAF9] text-[#6B1D2F]'
                      }`}>
                      <MainIcon size={22} />
                    </div>
                  </div>

                  {/* Title & desc */}
                  <h3
                    className={`text-2xl sm:text-3xl font-black leading-tight mb-4 ${svc.dark ? 'text-white' : 'text-[#1C1917]'}`}
                    style={{ fontFamily: theme.fonts.heading }}
                  >
                    {svc.title}
                  </h3>
                  <p className={`text-sm font-light leading-relaxed mb-8 ${svc.dark ? 'text-white/80' : 'text-[#78716C]'}`}>
                    {svc.desc}
                  </p>

                  {/* Items list */}
                  <ul className="space-y-3 mb-10 flex-grow">
                    {svc.items.map(({ icon: ItemIcon, text }) => (
                      <li key={text} className={`flex items-center gap-3 text-sm font-medium ${svc.dark ? 'text-white/90' : 'text-[#1C1917]'}`}>
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${svc.dark ? 'bg-white/20 text-white' : 'bg-[#FAFAF9] text-[#6B1D2F]'
                          }`}>
                          <ItemIcon size={13} />
                        </div>
                        {text}
                      </li>
                    ))}
                  </ul>

                  {/* CTA row */}
                  <div className={`pt-6 border-t flex items-center justify-between ${svc.dark ? 'border-white/20' : 'border-[#C59A9F]/50'}`}>
                    <span className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all ${svc.dark ? 'text-white' : 'text-[#6B1D2F]'
                      }`}>
                      {svc.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${svc.dark
                        ? 'bg-white text-[#6B1D2F]'
                        : 'bg-[#FAFAF9] text-[#6B1D2F] group-hover:bg-[#6B1D2F] group-hover:text-white'
                      }`}>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceSplitter;
