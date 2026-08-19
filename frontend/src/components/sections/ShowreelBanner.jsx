import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX, Sparkles, Film, Disc } from 'lucide-react';
import { theme } from '../../constants';

export const ShowreelBanner = ({ onOpenShowreel }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-24 bg-[#FAFAF9] text-[#1C1917] relative overflow-hidden" style={{ fontFamily: theme.fonts.body }}>
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C59A9F]/15 blur-[180px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold block mb-2 flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#6B1D2F]" />
              Featured Reel
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C1917]" style={{ fontFamily: theme.fonts.heading }}>
              2025 Video <span className="italic font-light text-[#6B1D2F]">Showreel</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Audio Toggle Button */}
            <button
              onClick={toggleSound}
              className="px-4 py-2 rounded-full bg-white border border-[#E5D9DB] text-xs font-semibold uppercase tracking-wider text-[#1C1917] hover:border-[#6B1D2F] hover:text-[#6B1D2F] transition-all flex items-center gap-2 shadow-sm"
            >
              {isMuted ? (
                <>
                  <VolumeX size={16} className="text-[#6B1D2F]" />
                  <span>Sound Muted</span>
                </>
              ) : (
                <>
                  <Volume2 size={16} className="text-emerald-600 animate-pulse" />
                  <span>Sound Active</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Widescreen Video Player Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={onOpenShowreel}
          className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden border border-[#E5D9DB] hover:border-[#C59A9F] shadow-[0_25px_60px_-15px_rgba(107,29,47,0.25)] bg-black cursor-pointer group select-none transition-all duration-500"
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

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/85 via-[#1C1917]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

          {/* Center Play Button Callout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center shadow-2xl border-2 border-white/80 ring-8 ring-[#6B1D2F]/30 group-hover:ring-[#6B1D2F]/60 group-hover:scale-110 transition-all duration-300 pointer-events-auto"
            >
              <Play size={32} className="ml-1" />
            </motion.div>
            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-white/90 bg-black/70 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 shadow-xl">
              Click to Watch Full Showreel (2m 14s)
            </p>
          </div>

          {/* Technical Specs Footer Strip inside Video */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-between items-center text-xs text-white/80 font-light pointer-events-none z-10">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-white font-medium">
                <Film size={14} className="text-[#C59A9F]" /> 8K Cinema Camera
              </span>
              <span className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-white font-medium hidden sm:flex">
                <Disc size={14} className="text-[#C59A9F]" /> DaVinci Color Grade
              </span>
            </div>

            <span className="bg-[#6B1D2F] text-white px-3 py-1 rounded-md font-bold uppercase tracking-widest text-[10px]">
              HD Video Master
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ShowreelBanner;
