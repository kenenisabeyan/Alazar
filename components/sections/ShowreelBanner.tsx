'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX, Sparkles, Film, Disc } from 'lucide-react';
import { theme } from '@/utils/constants';

export interface ShowreelBannerProps {
  onOpenShowreel?: () => void;
}

export const ShowreelBanner: React.FC<ShowreelBannerProps> = ({ onOpenShowreel }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-24 bg-canvas text-charcoal relative overflow-hidden border-t border-border">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-burgundy-soft/15 blur-[180px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-burgundy font-semibold block mb-2 flex items-center gap-1.5">
              <Sparkles size={14} className="text-burgundy" />
              Signature Cinema Reel
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal" style={{ fontFamily: theme.fonts.heading }}>
              2025 Directorial <span className="italic font-light text-burgundy">Showreel</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Audio Toggle Button */}
            <button
              onClick={toggleSound}
              className="px-4 py-2 rounded-full bg-surface border border-border text-xs font-semibold uppercase tracking-wider text-charcoal hover:border-burgundy hover:text-burgundy transition-all flex items-center gap-2 shadow-card"
            >
              {isMuted ? (
                <>
                  <VolumeX size={16} className="text-burgundy" />
                  <span>Sound Muted (Click to Unmute)</span>
                </>
              ) : (
                <>
                  <Volume2 size={16} className="text-emerald-600 animate-pulse" />
                  <span>Cinematic Audio Active</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Cinematic Widescreen Video Player Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={onOpenShowreel}
          className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-border hover:border-burgundy-soft shadow-burgundy-lg bg-black cursor-pointer group select-none transition-all duration-500"
        >
          {/* Autoplay Video Loop */}
          <video
            ref={videoRef}
            src="/assets/sample-showreel.mp4"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Anamorphic Dark Letterbox Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

          {/* Center Play Button Callout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.div 
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-burgundy text-white flex items-center justify-center shadow-burgundy-md border-2 border-white/60 group-hover:scale-110 transition-transform duration-300 pointer-events-auto"
            >
              <Play size={32} className="ml-1" />
            </motion.div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-white/90 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-card">
              Click to Watch Full 2025 Showreel (2m 14s)
            </p>
          </div>

          {/* Technical Specs Footer Strip inside Video */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-between items-center text-xs text-white/80 font-light pointer-events-none z-10">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-white font-medium">
                <Film size={14} className="text-burgundy-soft" /> 8K RAW RED V-Raptor
              </span>
              <span className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-white font-medium hidden sm:flex">
                <Disc size={14} className="text-burgundy-soft" /> DaVinci 19 Rec.709
              </span>
            </div>

            <span className="bg-burgundy text-white px-3 py-1 rounded-md font-bold uppercase tracking-widest text-[10px]">
              24 FPS Cinema Master
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ShowreelBanner;
