import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Camera, Disc, Eye } from 'lucide-react';
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
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold block"
          >
            Color Suite
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#1C1917]"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Before & After <span className="italic font-light text-[#6B1D2F]">Color</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#78716C] font-light text-base"
          >
            Drag the slider to see how raw camera footage transforms into a finished, polished video.
          </motion.p>
        </div>

        {/* Sample Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {colorGradingSamples.map((sample, idx) => (
            <button
              key={sample.id}
              onClick={() => { setActiveSampleIndex(idx); setSliderPosition(50); }}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeSampleIndex === idx 
                  ? 'bg-[#6B1D2F] text-white shadow-sm' 
                  : 'bg-white text-[#78716C] border border-[#E5D9DB] hover:text-[#1C1917]'
              }`}
            >
              <Sliders size={14} /> {sample.title.split('—')[0]}
            </button>
          ))}
        </div>

        {/* Interactive Before/After Slider Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden shadow-lg border border-[#E5D9DB] bg-black select-none cursor-ew-resize group"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Graded Layer (Base Image - Full Right) */}
          <img 
            src={currentSample.gradedImage} 
            alt="Final Graded Master" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <span className="absolute bottom-4 right-4 bg-[#6B1D2F] text-white text-xs uppercase tracking-widest px-3 py-1.5 rounded-full font-bold shadow-md z-10">
            Final Color
          </span>

          {/* RAW Log Layer (Clipped Left) */}
          <div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src={currentSample.logImage} 
              alt="RAW Log Flat Footage" 
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: '100%', height: '100%' }}
            />
            <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-[#1C1917] border border-[#E5D9DB] text-xs uppercase tracking-widest px-3 py-1.5 rounded-full font-bold shadow-md z-10">
              Raw Footage
            </span>
          </div>

          {/* Vertical Slider Handle Line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
            style={{ left: `calc(${sliderPosition}% - 2px)` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-10 h-10 rounded-full bg-white text-[#6B1D2F] shadow-2xl border-2 border-[#6B1D2F] flex items-center justify-center">
              <Sliders size={18} />
            </div>
          </div>
        </motion.div>

        {/* Technical Spec Metadata Strip */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-[#E5D9DB] shadow-sm text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center flex-shrink-0">
              <Camera size={18} />
            </div>
            <div>
              <p className="text-xs text-[#78716C] uppercase font-semibold">Camera Body</p>
              <p className="text-sm text-[#1C1917] font-bold">{currentSample.camera}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center flex-shrink-0">
              <Disc size={18} />
            </div>
            <div>
              <p className="text-xs text-[#78716C] uppercase font-semibold">Color Profile / LUT</p>
              <p className="text-sm text-[#1C1917] font-bold">{currentSample.lut}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center flex-shrink-0">
              <Eye size={18} />
            </div>
            <div>
              <p className="text-xs text-[#78716C] uppercase font-semibold">Target Gamut</p>
              <p className="text-sm text-[#1C1917] font-bold">Rec.709 / DCI-P3</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center flex-shrink-0">
              <Sliders size={18} />
            </div>
            <div>
              <p className="text-xs text-[#78716C] uppercase font-semibold">Sensor Sensitivity</p>
              <p className="text-sm text-[#1C1917] font-bold">{currentSample.iso}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ColorGradingShowcase;
