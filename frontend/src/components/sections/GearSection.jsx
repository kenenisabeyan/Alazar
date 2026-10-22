import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Film, Monitor, SunMedium, Tv, CheckCircle2, ArrowRight } from 'lucide-react';
import { gearList, theme } from '../../constants';
import heroBg from '../../assets/images/hero-bg.png';
import alazarImg from '../../assets/images/alazar.png';

const catIcons = [Camera, Film, Monitor, SunMedium];

export const GearSection = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  // Map dynamic or static categories, preserving rich image previews
  const categories = (data && data.length) ? data.map((cat, catIdx) => ({
    category: cat.name,
    items: (cat.items || []).map((i, iIdx) => {
      const fallbackItem = gearList[catIdx]?.items?.[iIdx] || gearList[0]?.items?.[0];
      return {
        name: i.name,
        desc: i.description || i.badge || fallbackItem?.desc || 'Pro Standard Equipment',
        badge: i.badge || fallbackItem?.badge || 'Pro Standard',
        image: i.imageUrl || i.image || fallbackItem?.image || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      };
    })
  })) : gearList;

  return (
    <section
      className="py-28 sm:py-36 relative overflow-hidden bg-[#FAFAF9] mesh-bg"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* ── Motion Flow Background Image Layer 1: hero-bg.png (Hero Section Style) ── */}
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

      {/* ── Motion Flow Layer 2: Floating alazar.png visual element (Hero Section Style) ── */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 1.5, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-10 right-0 sm:right-10 md:right-20 w-[260px] xs:w-[340px] sm:w-[500px] md:w-[650px] opacity-10 sm:opacity-15 md:opacity-20 pointer-events-none z-0 mix-blend-multiply filter blur-[0.5px]"
      >
        <img
          src={alazarImg}
          alt="Alazar Motion Flow"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* ── Dynamic Ambient Glow Orbs ── */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-[#6B1D2F]/18 via-[#8B1E3F]/12 to-[#C59A9F]/20 blur-[180px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-[#C59A9F]/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16 items-end">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#6B1D2F] font-black mb-4 block"
            >
              <Camera size={13} /> Production Gear
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.06] tracking-tight break-words"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Professional-Grade<br />
              <span className="text-gradient-burgundy font-black">Filming & Editing Kit.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-5 flex flex-col justify-end space-y-3"
          >
            <p className="text-[#44403C] font-medium text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              Industry-standard cinema cameras, precision lenses, professional lighting, and a fast dedicated post-production suite, providing everything needed to deliver 8K master quality.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── Left: Category nav ── */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:flex lg:flex-col gap-2.5 sm:gap-3">
            {categories.map((cat, idx) => {
              const Icon = catIcons[idx % catIcons.length];
              const isActive = idx === activeCategory;
              return (
                <motion.button
                  key={cat.category}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07 }}
                  onClick={() => setActiveCategory(idx)}
                  className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start text-center lg:text-left gap-2 sm:gap-3.5 p-3 sm:px-5 sm:py-4 rounded-2xl border transition-all duration-300 w-full group ${isActive
                      ? 'bg-gradient-to-r from-[#6B1D2F] to-[#8B1E3F] border-[#6B1D2F] text-white shadow-xl shadow-[#6B1D2F]/25 ring-2 ring-[#6B1D2F]/30'
                      : 'bg-white/90 backdrop-blur-md border-[#C59A9F]/40 text-[#1C1917] hover:border-[#6B1D2F]/60 hover:bg-white shadow-sm'
                    }`}
                >
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mx-auto lg:mx-0 flex-shrink-0 transition-all ${isActive
                      ? 'bg-white/20 text-white shadow-md'
                      : 'bg-[#FAFAF9] text-[#6B1D2F] group-hover:bg-[#6B1D2F] group-hover:text-white'
                    }`}>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 w-full">
                    <p className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-0.5 ${isActive ? 'text-[#FAFAF9]/80' : 'text-[#292524]'}`}>
                      {idx + 1} of {categories.length}
                    </p>
                    <h4 className={`text-xs sm:text-sm font-black leading-tight break-normal whitespace-normal ${isActive ? 'text-white' : 'text-[#1C1917]'}`}
                      style={{ fontFamily: theme.fonts.heading }}>
                      {cat.category}
                    </h4>
                  </div>
                  <ArrowRight
                    size={14}
                    className={`hidden lg:block ml-auto flex-shrink-0 transition-all ${isActive ? 'text-white' : 'text-[#C59A9F]/40 group-hover:text-[#6B1D2F] group-hover:translate-x-1'}`}
                  />
                </motion.button>
              );
            })}

            {/* Spec badge */}
            <div className="hidden lg:flex mt-4 p-4 bg-white/90 backdrop-blur-md border border-[#C59A9F]/40 rounded-2xl items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FAFAF9] to-[#F5F0F1] text-[#6B1D2F] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#C59A9F]/30">
                <Tv size={16} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#6B1D2F] mb-0.5">Output Standard</p>
                <p className="text-xs font-bold text-[#1C1917]">8K Cinema RAW Master</p>
              </div>
            </div>
          </div>

          {/* ── Right: Gear cards with High-Def Photography ── */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {((categories[activeCategory] || categories[0])?.items || []).map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.07 }}
                    whileHover={{ y: -6 }}
                    className="group bg-white/95 backdrop-blur-md rounded-2xl border border-[#C59A9F]/40 shadow-md hover:border-[#6B1D2F] hover:shadow-2xl transition-all duration-400 overflow-hidden flex flex-col"
                  >
                    {/* Top colour band */}
                    <div className="h-1 bg-gradient-to-r from-[#6B1D2F] to-[#C59A9F]" />

                    {/* ── Gear Photo Thumbnail ── */}
                    <div className="relative h-44 w-full overflow-hidden bg-[#1C1917]/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <span className="absolute bottom-2.5 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-black tracking-widest uppercase text-white/95 border border-white/20 shadow-sm">
                        {item.badge}
                      </span>
                    </div>

                    <div className="p-5 flex flex-col gap-3.5 flex-grow">
                      {/* Icon + name */}
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white flex items-center justify-center shadow-md shadow-[#6B1D2F]/20 flex-shrink-0">
                          <CheckCircle2 size={16} />
                        </div>
                        <h4
                          className="text-sm font-black text-[#1C1917] leading-tight pt-0.5 group-hover:text-[#6B1D2F] transition-colors"
                          style={{ fontFamily: theme.fonts.heading }}
                        >
                          {item.name}
                        </h4>
                      </div>

                      <p className="text-xs text-[#292524] font-medium leading-relaxed flex-grow">
                        {item.desc}
                      </p>

                      <div className="pt-3 border-t border-[#C59A9F]/40 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#6B1D2F]">
                          Pro Standard
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Active Rig</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GearSection;
