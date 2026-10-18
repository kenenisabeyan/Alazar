import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Play, Volume2, VolumeX,
  Film, Disc, Camera, Sliders, ArrowRight,
} from 'lucide-react';
import { theme } from '../../constants';

const techMeta = [
  { icon: Camera, label: 'Camera', value: 'RED V-Raptor 8K' },
  { icon: Sliders, label: 'Color Grade', value: 'DaVinci Resolve' },
  { icon: Disc, label: 'Audio', value: 'Fairlight Studio' },
  { icon: Film, label: 'Master Format', value: 'ProRes 422 HQ' },
];

export const ShowreelBanner = ({ onOpenShowreel }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(prev => !prev);
    }
  };

  return (
    <section
      id="showreel"
      className="py-20 sm:py-28 relative overflow-hidden scroll-mt-20"
      style={{ fontFamily: theme.fonts.body, background: '#FAFAF9' }}
    >
      {/* Ambient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#6B1D2F]/07 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">

        {/* ── Header row ─────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.06] tracking-tight break-words"
              style={{ fontFamily: theme.fonts.heading }}
            >
              2025 Video<br />
              <span className="text-gradient-burgundy font-black">Showreel.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3"
          >
            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-none border text-[11px] font-black uppercase tracking-wider transition-all ${isMuted
                  ? 'bg-white border-[#C59A9F] text-[#292524] hover:border-[#6B1D2F] hover:text-[#6B1D2F]'
                  : 'bg-[#6B1D2F] border-[#6B1D2F] text-white'
                }`}
            >
              {isMuted
                ? <><VolumeX size={14} className="text-[#6B1D2F]" /> Muted</>
                : <><Volume2 size={14} className="text-emerald-400 animate-pulse" /> Sound On</>
              }
            </button>

            {/* Watch full */}
            <button
              onClick={onOpenShowreel}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-[#6B1D2F] text-white text-[11px] font-black uppercase tracking-wider hover:bg-[#8B1E3F] transition-all shadow-lg shadow-[#6B1D2F]/25 group"
            >
              Watch Full Reel
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* ── Widescreen video frame ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="relative mb-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            onClick={onOpenShowreel}
            className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden bg-[#1E0A0D] shadow-2xl shadow-[#1E0A0D]/50 border border-[#C59A9F]/20 cursor-pointer group select-none"
          >
            {/* Video */}
            <video
              ref={videoRef}
              src="/assets/sample-showreel.mp4"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E0A0D]/85 via-[#1E0A0D]/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E0A0D]/40 via-transparent to-transparent" />

            {/* Ambient inner glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#6B1D2F]/30 blur-[80px] rounded-full pointer-events-none" />

            {/* Viewfinder Corners */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/40 pointer-events-none" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/40 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/40 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/40 pointer-events-none" />

            {/* Top-left — title overlay */}
            <div className="absolute top-3 left-3 sm:top-6 sm:left-7 z-10 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-none bg-black/60 backdrop-blur-md border border-red-500/30 text-[8.5px] sm:text-[9.5px] font-black text-white uppercase tracking-[0.16em] sm:tracking-[0.2em] mb-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-400 font-mono">REC</span>
                <span className="text-white/30">|</span>
                <span>8K DCI CINEMA</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-black text-white leading-tight hidden sm:block font-serif drop-shadow-lg"
                style={{ fontFamily: theme.fonts.heading }}
              >
                Alazar Asdesach<br />
                <span className="text-[#C59A9F] font-black">2025 Showreel</span>
              </h3>
            </div>

            {/* Top-right — duration badge (desktop only to prevent center collision on mobile) */}
            <div className="hidden sm:block absolute top-6 right-7 z-10 pointer-events-none">
              <div className="px-3.5 py-1.5 rounded-none bg-black/60 backdrop-blur-md border border-white/20 text-[#FAFAF9] text-[10px] font-mono font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                <span className="text-emerald-400">00:02:14:00</span>
                <span className="text-white/30">|</span>
                <span className="text-[#C59A9F]">24.00 FPS</span>
              </div>
            </div>

            {/* Center play button */}
            <motion.div
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4"
            >
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/95 text-[#6B1D2F] flex items-center justify-center shadow-2xl shadow-[#1E0A0D]/60 border border-white/80 ring-4 sm:ring-8 ring-white/15 group-hover:ring-white/30 transition-all duration-300">
                <Play size={22} className="sm:hidden ml-0.5 fill-[#6B1D2F]" />
                <Play size={28} className="hidden sm:inline ml-1 fill-[#6B1D2F]" />
              </div>
              <p className="mt-2.5 sm:mt-4 text-[9.5px] sm:text-[11px] font-black uppercase tracking-[0.14em] sm:tracking-[0.2em] text-white/95 bg-black/70 backdrop-blur-md px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/20 shadow-xl max-w-[90%] text-center">
                Click to Watch Full Showreel
              </p>
            </motion.div>

            {/* Bottom-left — meta chips */}
            <div className="absolute bottom-6 left-7 z-10 flex flex-wrap gap-2 pointer-events-none">
              {[
                { icon: Film, text: 'RED V-Raptor 8K' },
                { icon: Sliders, text: 'DaVinci Resolve Color' },
                { icon: Disc, text: 'Fairlight 5.1 Mix' },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="hidden sm:flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-[9.5px] font-black uppercase tracking-wider text-white/90 shadow-md"
                >
                  <Icon size={12} className="text-[#C59A9F]" />
                  {text}
                </div>
              ))}
            </div>

            {/* Bottom-right — format badge (desktop only to prevent collision with center text on mobile) */}
            <div className="hidden sm:block absolute bottom-6 right-7 z-10 pointer-events-none">
              <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#6B1D2F] to-[#8B1E3F] text-white text-[9.5px] font-black uppercase tracking-[0.2em] shadow-lg border border-white/20">
                PRORES 422 HQ
              </div>
            </div>
          </div>

          {/* Side glow */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-[#6B1D2F]/20 blur-[40px] rounded-full pointer-events-none" />
        </motion.div>

        {/* ── Technical spec strip ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4"
        >
          {techMeta.map(({ icon: Icon, label, value }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + idx * 0.07 }}
              whileHover={{ y: -4 }}
              className="glass-card-luxury rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#6B1D2F]/20 mb-2 sm:mb-2.5">
                <Icon size={18} />
              </div>
              <div className="w-full">
                <p className="text-[9px] sm:text-[10px] text-[#292524] dark:text-[#A89597] uppercase font-black tracking-wider mb-1 leading-tight text-center break-normal">
                  {label}
                </p>
                <p className="text-xs sm:text-sm text-[#1C1917] dark:text-[#F5F0F1] font-black leading-tight text-center break-normal whitespace-normal">
                  {value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ShowreelBanner;
