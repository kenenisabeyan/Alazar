import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Quote, Star,
  Film, Shapes, ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { testimonials, clientLogos, theme } from '../../constants';

// ── discipline badge ──────────────────────────────────────────────────────────
const disciplineOf = (company) => {
  const vid = ['Vanguard Apparel', 'Oak & Iron Media', 'Apex Motors', 'Kenenisa Media Group'];
  return vid.includes(company)
    ? { label: 'Video Production', icon: Film }
    : { label: 'Graphic Design',   icon: Shapes };
};

export const SocialProof = () => {
  const navigate = useNavigate();
  const [[page, dir], setPage] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const total = testimonials.length;
  const idx   = ((page % total) + total) % total;
  const cur   = testimonials[idx];
  const disc  = disciplineOf(cur.company);
  const DiscIcon = disc.icon;

  const paginate = useCallback((d) => setPage(([p]) => [p + d, d]), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => paginate(1), 6500);
    return () => clearInterval(t);
  }, [page, paused, paginate]);

  const variants = {
    enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.96, filter: 'blur(4px)' }),
    center:      ({  x: 0,                  opacity: 1, scale: 1,    filter: 'blur(0px)' }),
    exit:  (d) => ({ x: d < 0 ? 80 : -80, opacity: 0, scale: 0.96, filter: 'blur(4px)' }),
  };

  return (
    <section
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body, background: '#FAFAF9' }}
    >
      {/* Ambient blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#6B1D2F]/10 via-[#C59A9F]/14 to-transparent blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute -top-24 right-10 w-80 h-80 bg-[#6B1D2F]/06 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">

        {/* ── Header ── */}
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
              What Clients<br />
              <span className="text-gradient-burgundy font-black">Say.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#44403C] dark:text-[#E7E5E4] font-medium text-sm sm:text-base max-w-xs leading-relaxed"
          >
            Feedback from creative directors, brand leads, and agency partners across video and design projects.
          </motion.p>
        </div>

        {/* ── Main layout: featured card + sidebar list ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Featured testimonial card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 relative bg-gradient-to-br from-[#6B1D2F] via-[#521523] to-[#3B0E19] rounded-3xl overflow-hidden shadow-2xl shadow-[#6B1D2F]/20 flex flex-col min-h-[340px] sm:min-h-[440px] border border-[#C59A9F]/30"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#6B1D2F]/40 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 right-0 w-48 h-48 bg-[#8B1E3F]/25 blur-[60px] rounded-full pointer-events-none" />

            <div className="relative z-10 p-6 sm:p-8 md:p-12 flex flex-col justify-between h-full flex-grow">

              {/* Top row */}
              <div className="flex items-start justify-between mb-6 sm:mb-8">
                {/* Quote icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white flex items-center justify-center shadow-xl shadow-[#6B1D2F]/30 border border-white/10">
                  <Quote size={20} className="sm:scale-125 fill-white/20" />
                </div>

                {/* Discipline badge */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black text-white/90 uppercase tracking-widest backdrop-blur-md">
                  <DiscIcon size={11} /> {disc.label}
                </div>
              </div>

              {/* Animated testimonial body */}
              <div className="flex-grow flex flex-col justify-center">
                <AnimatePresence initial={false} custom={dir} mode="wait">
                  <motion.div
                    key={page}
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ x: { type: 'spring', stiffness: 320, damping: 28 }, opacity: { duration: 0.3 } }}
                    className="space-y-6 sm:space-y-8"
                  >
                    {/* 5 stars */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.06 }}
                        >
                          <Star size={15} className="fill-[#C59A9F] text-[#C59A9F]" />
                        </motion.div>
                      ))}
                    </div>

                    <blockquote className="text-base sm:text-xl md:text-2xl text-white font-medium italic leading-relaxed">
                      "{cur.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-0.5 bg-gradient-to-tr from-[#6B1D2F] to-[#C59A9F] rounded-none shadow-lg flex-shrink-0">
                        <img
                          src={cur.avatar}
                          alt={cur.author}
                          className="w-10 h-10 sm:w-14 sm:h-14 rounded-none object-cover border-2 border-[#1C1917]"
                        />
                      </div>
                      <div>
                        <h4
                          className="text-base font-black text-white"
                          style={{ fontFamily: theme.fonts.heading }}
                        >
                          {cur.author}
                        </h4>
                        <p className="text-[11px] text-white/50 font-bold uppercase tracking-widest mt-0.5">
                          {cur.title} · <span className="text-[#C59A9F]">{cur.company}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-8">
                {/* Dot indicators */}
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage([i, i > idx ? 1 : -1])}
                      className={`h-1.5 rounded-none transition-all duration-300 ${
                        i === idx ? 'w-8 bg-[#C59A9F]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                {/* Prev / Next */}
                <div className="flex gap-2">
                  <button
                    onClick={() => paginate(-1)}
                    className="w-10 h-10 rounded-none bg-white/10 hover:bg-[#6B1D2F] border border-white/15 hover:border-[#6B1D2F] flex items-center justify-center text-white/70 hover:text-white transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    className="w-10 h-10 rounded-none bg-white/10 hover:bg-[#6B1D2F] border border-white/15 hover:border-[#6B1D2F] flex items-center justify-center text-white/70 hover:text-white transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/10 h-0.5 rounded-none overflow-hidden mt-4">
                <motion.div
                  key={page}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 6.5, ease: 'linear' }}
                  className="bg-[#C59A9F] h-full rounded-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Right sidebar — stacked mini cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {testimonials.map((t, i) => {
              const d = disciplineOf(t.company);
              const DIcon = d.icon;
              const isActive = i === idx;
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  onClick={() => setPage([i, i > idx ? 1 : -1])}
                  className={`cursor-pointer rounded-none p-5 border-2 transition-all duration-300 flex items-start gap-4 group ${
                    isActive
                      ? 'bg-[#6B1D2F] border-[#6B1D2F] shadow-xl shadow-[#6B1D2F]/20'
                      : 'bg-white border-[#C59A9F] hover:border-[#C59A9F] hover:shadow-md'
                  }`}
                >
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className={`w-12 h-12 rounded-none object-cover flex-shrink-0 border-2 ${isActive ? 'border-white/30' : 'border-[#C59A9F]'}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className={`text-sm font-black truncate ${isActive ? 'text-white' : 'text-[#1C1917]'}`}
                          style={{ fontFamily: theme.fonts.heading }}>
                        {t.author}
                      </h4>
                      <span className={`flex-shrink-0 inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-none ${
                        isActive ? 'bg-white/20 text-white/80' : 'bg-[#FAFAF9] text-[#6B1D2F]'
                      }`}>
                        <DIcon size={9} /> {d.label.split(' ')[0]}
                      </span>
                    </div>
                    <p className={`text-[10px] font-bold mb-2 ${isActive ? 'text-white/80' : 'text-[#292524]'}`}>
                      {t.title} · {t.company}
                    </p>
                    <p className={`text-xs font-normal line-clamp-2 leading-relaxed ${isActive ? 'text-white/90' : 'text-[#1C1917]'}`}>
                      "{t.quote}"
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Bottom CTA */}
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
              className="mt-2 w-full flex items-center justify-center gap-2 py-4 rounded-none border-2 border-dashed border-[#C59A9F]/50 text-[#6B1D2F] text-[11px] font-black uppercase tracking-widest hover:border-[#6B1D2F] hover:bg-[#FAFAF9]/50 transition-all group"
            >
              Work With Alazar
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* ── Client logo strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-14 pt-10 border-t border-[#C59A9F]"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-[#292524] text-center mb-7">
            Trusted by Brands &amp; Creators Worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {clientLogos.map((logo) => (
              <span
                key={logo.name}
                className="text-[11px] font-black uppercase tracking-widest text-[#C59A9F] hover:text-[#6B1D2F] transition-colors cursor-default"
              >
                {logo.text}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SocialProof;
