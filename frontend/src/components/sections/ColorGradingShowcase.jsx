import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Camera, Disc, Eye, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { colorGradingSamples, theme } from '../../constants';

export const ColorGradingShowcase = () => {
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(48);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const currentSample = colorGradingSamples[activeSampleIndex];

  const updateSlider = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(4, Math.min(96, ((clientX - rect.left) / rect.width) * 100));
    setSliderPosition(pct);
  };

  const metaItems = [
    { icon: Camera, label: 'Camera Sensor', value: currentSample.camera },
    { icon: Disc, label: 'Color LUT', value: currentSample.lut },
    { icon: Eye, label: 'Target Gamut', value: 'Rec.709 / DCI-P3' },
    { icon: Sliders, label: 'Base ISO', value: currentSample.iso },
  ];

  return (
    <section
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body, background: '#FAFAF9' }}
    >
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#6B1D2F]/06 blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C59A9F]/40 text-[11px] font-black text-[#6B1D2F] uppercase tracking-widest shadow-sm mb-5"
            >
              <Sparkles size={12} className="animate-pulse" /> Color Grading Suite
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.06] tracking-tight"
              style={{ fontFamily: theme.fonts.heading }}
            >
              RAW Log vs<br />
              <span className="italic font-light text-gradient-burgundy">Graded Master.</span>
            </motion.h2>
          </div>

          {/* Sample switcher */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-2"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-[#78716C] mb-1">Select Sample</p>
            <div className="inline-flex bg-white border border-[#C59A9F] rounded-full p-1.5 gap-1 shadow-sm">
              {colorGradingSamples.map((sample, idx) => (
                <button
                  key={sample.id}
                  onClick={() => { setActiveSampleIndex(idx); setSliderPosition(48); }}
                  className={`relative px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${idx === activeSampleIndex ? 'text-white' : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                >
                  {idx === activeSampleIndex && (
                    <motion.div
                      layoutId="colorTabBg"
                      className="absolute inset-0 bg-[#6B1D2F] rounded-full -z-10 shadow-md"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Sliders size={12} />
                  {sample.title.split('—')[0].trim().split(' ').slice(0, 2).join(' ')}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Before / After slider ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <div
            ref={containerRef}
            className="relative aspect-[4/3] sm:aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-[#C59A9F]/30 bg-[#1E0A0D] select-none cursor-ew-resize group"
            onMouseDown={(e) => { setIsDragging(true); updateSlider(e.clientX); }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={(e) => { if (isDragging || e.buttons === 1) updateSlider(e.clientX); }}
            onTouchMove={(e) => updateSlider(e.touches[0].clientX)}
          >
            {/* Graded (full) */}
            <img
              src={currentSample.gradedImage}
              alt="Graded Master"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* RAW (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={currentSample.logImage}
                alt="Camera RAW Log"
                className="absolute inset-0 h-full object-cover"
                style={{ width: `${10000 / sliderPosition}%`, maxWidth: 'none' }}
              />
            </div>

            {/* Gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E0A0D]/80 via-transparent to-transparent pointer-events-none" />

            {/* RAW label */}
            <div className="absolute bottom-6 left-5 flex items-center gap-2 pointer-events-none z-10">
              <span className="bg-white/95 backdrop-blur-md text-[#1C1917] border border-[#C59A9F] text-[10px] uppercase tracking-widest px-3.5 py-2 rounded-full font-black shadow-xl">
                Camera RAW Log
              </span>
            </div>

            {/* Graded label */}
            <div className="absolute bottom-6 right-5 flex items-center gap-2 pointer-events-none z-10">
              <span className="bg-[#6B1D2F] text-white text-[10px] uppercase tracking-widest px-3.5 py-2 rounded-full font-black shadow-xl flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Final Color Grade
              </span>
            </div>

            {/* Drag handle */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none"
              style={{ left: `calc(${sliderPosition}% - 1px)` }}
            >
              <div className="w-0.5 h-full bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-[#6B1D2F] shadow-2xl flex items-center justify-center gap-0.5 group-hover:scale-110 transition-transform">
                <ArrowLeft size={12} className="text-[#6B1D2F]" />
                <ArrowRight size={12} className="text-[#6B1D2F]" />
              </div>
            </div>

            {/* Drag hint */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            >
              <div className="bg-[#1E0A0D]/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full border border-white/20 flex items-center gap-2">
                <Sliders size={14} /> Drag to compare
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Metadata strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {metaItems.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="glass-card-luxury rounded-2xl p-5 flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FAFAF9] text-[#6B1D2F] flex items-center justify-center flex-shrink-0">
                <Icon size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] text-[#78716C] uppercase font-black tracking-wider mb-0.5">
                  {label}
                </p>
                <p className="text-sm text-[#1C1917] font-black truncate">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ColorGradingShowcase;
