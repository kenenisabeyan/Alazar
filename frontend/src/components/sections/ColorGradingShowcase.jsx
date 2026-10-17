import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Camera, Disc, Eye, ArrowLeft, ArrowRight } from 'lucide-react';
import { colorGradingSamples, theme } from '../../constants';

export const ColorGradingShowcase = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const sample = colorGradingSamples[0];

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const updateFromClient = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSliderPos(clamp(((clientX - rect.left) / rect.width) * 100, 2, 98));
  }, []);

  const metaItems = [
    { icon: Camera, label: 'Camera', value: sample.camera },
    { icon: Disc, label: 'Color LUT', value: sample.lut },
    { icon: Eye, label: 'Output Gamut', value: 'Rec.709 / DCI-P3' },
    { icon: Sliders, label: 'Log Profile', value: sample.colorSpace },
  ];

  return (
    <section
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body, background: '#FAFAF9' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#6B1D2F]/[0.07] blur-[160px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">

        {/* ── Section header — NO white pill bg ──────────────────────────── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 sm:mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-black uppercase tracking-[0.28em] text-[#6B1D2F] mb-4"
            >
              Color Grading Suite
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.06] tracking-tight break-words"
              style={{ fontFamily: theme.fonts.heading }}
            >
              RAW Log vs<br />
              <span className="text-gradient-burgundy">Graded Master.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#1C1917] font-medium text-sm sm:text-base max-w-xs leading-relaxed bg-white/85 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#C59A9F]/40 shadow-sm"
          >
            Drag the handle to reveal the difference between a flat camera log recording and a fully graded cinematic master.
          </motion.p>
        </div>

        {/* ── Before / After comparison ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <div
            ref={containerRef}
            /* ── Full-width, tall, rounded exactly like the screenshot ── */
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#1E0A0D] select-none cursor-ew-resize group shadow-2xl shadow-[#1E0A0D]/40 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/7.5]"
            onMouseDown={(e) => { setIsDragging(true); updateFromClient(e.clientX); }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={(e) => { if (isDragging || e.buttons === 1) updateFromClient(e.clientX); }}
            onTouchStart={(e) => { e.preventDefault(); updateFromClient(e.touches[0].clientX); }}
            onTouchMove={(e) => { e.preventDefault(); updateFromClient(e.touches[0].clientX); }}
          >

            {/* ── RIGHT side: GRADED MASTER (vivid, full color) ── */}
            <img
              src={sample.gradedImage}
              alt="Final Color Grade: Cinematic Master"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* ── LEFT side: RAW LOG (flat, desaturated) — clipped by slider ── */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              {/*
                Same image with heavy CSS desaturation + low contrast to
                simulate a flat S-Log / RAW log recording accurately.
                The user sees the same scene before/after grading.
              */}
              <img
                src={sample.logImage}
                alt="Camera RAW Log: Flat S-Log"
                className="absolute inset-0 h-full object-cover"
                style={{
                  width: containerRef.current
                    ? `${containerRef.current.offsetWidth}px`
                    : '1400px',
                  maxWidth: 'none',
                  filter: 'saturate(0.12) contrast(0.72) brightness(0.82) sepia(0.18)',
                }}
                draggable={false}
              />
            </div>

            {/* ── Subtle top vignette ── */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#1E0A0D]/40 to-transparent pointer-events-none" />

            {/* ── Bottom fade for labels ── */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1E0A0D]/85 to-transparent pointer-events-none" />

            {/* ── LEFT label — Camera RAW LOG ── */}
            <div className="absolute bottom-5 left-5 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md text-[#F5F0F1] border border-white/20 text-[9px] sm:text-[10px] uppercase tracking-[0.22em] px-3.5 py-2 rounded-full font-black font-mono shadow-lg">
                CAMERA RAW LOG
              </span>
            </div>

            {/* ── RIGHT label — Final Color Grade ── */}
            <div className="absolute bottom-5 right-5 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-2 bg-[#6B1D2F] text-[#F5F0F1] border border-white/20 text-[9px] sm:text-[10px] uppercase tracking-[0.22em] px-3.5 py-2 rounded-full font-black font-mono shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                FINAL COLOR GRADE
              </span>
            </div>

            {/* ── Drag divider line ── */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
              {/* Line */}
              <div className="w-[2px] h-full bg-white/90 shadow-[0_0_16px_rgba(255,255,255,0.55)]" />

              {/* Handle knob — exactly like screenshot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border-2 border-[#6B1D2F] shadow-2xl flex items-center justify-center gap-0.5 group-hover:scale-110 transition-transform duration-200">
                <ArrowLeft size={13} className="text-[#6B1D2F]" />
                <ArrowRight size={13} className="text-[#6B1D2F]" />
              </div>
            </div>

            {/* ── Initial drag hint (fades out) ── */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 2.2, duration: 0.9 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
              <div className="flex items-center gap-2 bg-[#1E0A0D]/80 backdrop-blur-md text-[#F5F0F1] text-[11px] font-black uppercase tracking-widest px-6 py-3 rounded-full border border-white/20 shadow-xl">
                <ArrowLeft size={14} />
                <Sliders size={13} className="text-[#C59A9F]" />
                Drag to Compare
                <ArrowRight size={14} />
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* ── Technical metadata strip ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4"
        >
          {metaItems.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="glass-card-luxury rounded-2xl p-3 sm:p-5 flex flex-col sm:flex-row items-center justify-center sm:justify-start text-center sm:text-left gap-2 sm:gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FAFAF9] dark:bg-[#1E0A0D] text-[#6B1D2F] dark:text-[#F5F0F1] flex items-center justify-center flex-shrink-0 border border-[#C59A9F]/40 mx-auto sm:mx-0">
                <Icon size={16} />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-[9px] text-[#292524] dark:text-[#A89597] uppercase font-black tracking-[0.18em] mb-0.5 truncate">
                  {label}
                </p>
                <p className="text-xs sm:text-sm text-[#1C1917] dark:text-[#F5F0F1] font-black truncate">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ColorGradingShowcase;
