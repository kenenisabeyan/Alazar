import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Camera, Disc, Eye, Sparkles } from 'lucide-react';
import { colorGradingSamples, theme } from '../../utils/constants';

export const ColorGradingShowcase = () => {
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const currentSample = colorGradingSamples[activeSampleIndex];

  const handleMove = (clientX, rect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  return (
    <section className="py-28 bg-[#FAFAF9] relative overflow-hidden" style={{ fontFamily: theme.fonts.body }}>
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#6B1D2F]/10 via-[#8B2440]/05 to-[#C59A9F]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C59A9F]/40 text-xs uppercase tracking-widest text-[#6B1D2F] font-extrabold shadow-sm"
          >
            <Sparkles size={12} /> Color Grading Suite
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-[#1C1917] tracking-tight"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Raw Log vs <span className="italic font-light text-gradient-burgundy">Graded Master</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#78716C] font-light text-base md:text-lg"
          >
            Interactive split-slider demonstrating high-dynamic-range color science, skin tone preservation, and cinematic mood curves.
          </motion.p>
        </div>

        {/* Sample Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {colorGradingSamples.map((sample, idx) => {
            const isActive = activeSampleIndex === idx;
            return (
              <button
                key={sample.id}
                onClick={() => { setActiveSampleIndex(idx); setSliderPosition(50); }}
                className={`relative px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  isActive ? 'text-white' : 'text-[#78716C] bg-white border border-[#E5D9DB] hover:text-[#1C1917]'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeColorTab"
                    className="absolute inset-0 bg-[#6B1D2F] rounded-full shadow-lg shadow-[#6B1D2F]/25 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Sliders size={13} /> {sample.title.split('—')[0]}
              </button>
            );
          })}
        </div>

        {/* Interactive Before/After Slider Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/3] sm:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-[#C59A9F]/40 bg-black select-none cursor-ew-resize group"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Graded Layer (Base Image) */}
          <img 
            src={currentSample.gradedImage} 
            alt="Final Graded Master" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <span className="absolute bottom-5 right-5 bg-[#6B1D2F] text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full font-black shadow-xl z-10 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Final Color Grade
          </span>

          {/* RAW Log Layer (Clipped Left) */}
          <div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src={currentSample.logImage} 
              alt="RAW Log Flat Footage" 
              className="absolute inset-0 h-full object-cover max-w-none"
              style={{ width: '100%', minWidth: '100%' }}
            />
            <span className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md text-[#1C1917] border border-[#E5D9DB] text-xs uppercase tracking-widest px-4 py-2 rounded-full font-black shadow-xl z-10">
              Camera RAW Log
            </span>
          </div>

          {/* Vertical Slider Handle Line */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-2xl z-20 pointer-events-none"
            style={{ left: `calc(${sliderPosition}% - 1px)` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-12 h-12 rounded-full bg-white text-[#6B1D2F] shadow-2xl border-2 border-[#6B1D2F] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sliders size={20} />
            </div>
          </div>
        </motion.div>

        {/* Technical Spec Metadata Strip */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6 glass-card-luxury rounded-3xl text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center flex-shrink-0">
              <Camera size={19} />
            </div>
            <div>
              <p className="text-[10px] text-[#78716C] uppercase font-bold tracking-wider">Camera Sensor</p>
              <p className="text-sm text-[#1C1917] font-extrabold">{currentSample.camera}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center flex-shrink-0">
              <Disc size={19} />
            </div>
            <div>
              <p className="text-[10px] text-[#78716C] uppercase font-bold tracking-wider">Color LUT Preset</p>
              <p className="text-sm text-[#1C1917] font-extrabold">{currentSample.lut}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center flex-shrink-0">
              <Eye size={19} />
            </div>
            <div>
              <p className="text-[10px] text-[#78716C] uppercase font-bold tracking-wider">Target Gamut</p>
              <p className="text-sm text-[#1C1917] font-extrabold">Rec.709 / DCI-P3</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center flex-shrink-0">
              <Sliders size={19} />
            </div>
            <div>
              <p className="text-[10px] text-[#78716C] uppercase font-bold tracking-wider">Base ISO</p>
              <p className="text-sm text-[#1C1917] font-extrabold">{currentSample.iso}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ColorGradingShowcase;

