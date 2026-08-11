'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sliders, Camera, Disc, Eye } from 'lucide-react';
import { colorGradingSamples, theme } from '@/utils/constants';

export const ColorGradingShowcase: React.FC = () => {
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const currentSample = colorGradingSamples[activeSampleIndex];

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  return (
    <section className="py-28 bg-canvas border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-burgundy font-semibold block"
          >
            Color Grading Suite
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-charcoal"
            style={{ fontFamily: theme.fonts.heading }}
          >
            RAW Log vs. <span className="italic font-light text-burgundy">Color Master</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate font-light text-base"
          >
            Drag the slider to reveal the DaVinci Resolve color transformation from un-graded RAW Log footage to the final commercial color grade.
          </motion.p>
        </div>

        {/* Sample Switcher Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {colorGradingSamples.map((sample, idx) => (
            <button
              key={sample.id}
              onClick={() => { setActiveSampleIndex(idx); setSliderPosition(50); }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeSampleIndex === idx 
                  ? 'bg-burgundy text-white shadow-burgundy-sm' 
                  : 'bg-surface text-slate border border-border hover:text-charcoal'
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
          className="relative aspect-video rounded-2xl overflow-hidden shadow-card border border-border bg-black select-none cursor-ew-resize group"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Graded Layer */}
          <Image 
            src={currentSample.gradedImage} 
            alt="Final Graded Master" 
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover pointer-events-none"
          />
          <span className="absolute bottom-4 right-4 bg-burgundy text-white text-xs uppercase tracking-widest px-3 py-1.5 rounded-full font-bold shadow-burgundy-sm z-10">
            Graded Color Master
          </span>

          {/* RAW Log Layer (Clipped Left) */}
          <div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="relative w-full h-full min-w-[600px] md:min-w-[1100px]">
              <Image 
                src={currentSample.logImage} 
                alt="RAW Log Flat Footage" 
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
            <span className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-md text-charcoal border border-border text-xs uppercase tracking-widest px-3 py-1.5 rounded-full font-bold shadow-card z-10">
              RAW S-Log3 / Flat
            </span>
          </div>

          {/* Vertical Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
            style={{ left: `calc(${sliderPosition}% - 2px)` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-10 h-10 rounded-full bg-white text-burgundy shadow-burgundy-md border-2 border-burgundy flex items-center justify-center">
              <Sliders size={18} />
            </div>
          </div>
        </motion.div>

        {/* Metadata Specs Strip */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-surface rounded-2xl border border-border shadow-card text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-burgundy-faint text-burgundy flex items-center justify-center flex-shrink-0">
              <Camera size={18} />
            </div>
            <div>
              <p className="text-xs text-slate uppercase font-semibold">Camera Body</p>
              <p className="text-sm text-charcoal font-bold">{currentSample.camera}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-burgundy-faint text-burgundy flex items-center justify-center flex-shrink-0">
              <Disc size={18} />
            </div>
            <div>
              <p className="text-xs text-slate uppercase font-semibold">Color Profile / LUT</p>
              <p className="text-sm text-charcoal font-bold">{currentSample.lut}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-burgundy-faint text-burgundy flex items-center justify-center flex-shrink-0">
              <Eye size={18} />
            </div>
            <div>
              <p className="text-xs text-slate uppercase font-semibold">Target Gamut</p>
              <p className="text-sm text-charcoal font-bold">Rec.709 / DCI-P3</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-burgundy-faint text-burgundy flex items-center justify-center flex-shrink-0">
              <Sliders size={18} />
            </div>
            <div>
              <p className="text-xs text-slate uppercase font-semibold">Sensor Sensitivity</p>
              <p className="text-sm text-charcoal font-bold">{currentSample.iso}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ColorGradingShowcase;
