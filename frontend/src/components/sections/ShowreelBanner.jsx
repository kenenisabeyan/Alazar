import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Play, Volume2, VolumeX, Sparkles,
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
      className="py-20 sm:py-28 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body, background: '#FAFAF9' }}
    >
      {/* Ambient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#6B1D2F]/07 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

        {/* ── Header row ─────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C59A9F]/40 text-[11px] font-black text-[#6B1D2F] uppercase tracking-widest shadow-sm mb-4 shimmer-border"
            >
              <Sparkles size={12} className="animate-pulse" /> Featured 2025 Reel
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.06] tracking-tight"
              style={{ fontFamily: theme.fonts.heading }}
            >
              2025 Video<br />
              <span className="italic font-light text-gradient-burgundy">Showreel.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-3"
          >
            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-[11px] font-black uppercase tracking-wider transition-all ${isMuted
                  ? 'bg-white border-[#C59A9F] text-[#78716C] hover:border-[#6B1D2F] hover:text-[#6B1D2F]'
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
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#6B1D2F] text-white text-[11px] font-black uppercase tracking-wider hover:bg-[#8B1E3F] transition-all shadow-lg shadow-[#6B1D2F]/25 group"
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
            className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden bg-[#1E0A0D] shadow-2xl shadow-[#1E0A0D]/50 border border-[#C59A9F]/20 cursor-pointer group select-none"
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

            {/* Top-left — title overlay */}
            <div className="absolute top-6 left-7 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E0A0D]/80 backdrop-blur-md border border-white/15 text-[10px] font-black text-white uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Live Preview
              </div>
              <h3
                className="text-xl sm:text-2xl font-black text-white leading-tight hidden sm:block"
                style={{ fontFamily: theme.fonts.heading }}
              >
                Alazar Asdesach<br />
                <span className="text-[#C59A9F] italic font-light">2025 Showreel</span>
              </h3>
            </div>

            {/* Top-right — duration badge */}
            <div className="absolute top-6 right-7 z-10">
              <div className="px-3 py-1.5 rounded-full bg-[#6B1D2F] text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                2m 14s
              </div>
            </div>

            {/* Center play button */}
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
            >
              <div className="w-20 h-20 rounded-full bg-white/95 text-[#6B1D2F] flex items-center justify-center shadow-2xl shadow-[#1E0A0D]/40 border border-white/80 ring-8 ring-white/15 group-hover:ring-white/30 transition-all duration-300">
                <Play size={30} className="ml-1 fill-[#6B1D2F]" />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/90 bg-[#1E0A0D]/85 backdrop-blur-md px-5 py-2 rounded-full border border-white/15 shadow-xl">
                Click to Watch Full Showreel
              </p>
            </motion.div>

            {/* Bottom-left — meta chips */}
            <div className="absolute bottom-6 left-7 z-10 flex flex-wrap gap-2">
              {[
                { icon: Film, text: '8K Cinema' },
                { icon: Sliders, text: 'DaVinci Grade' },
                { icon: Disc, text: 'Fairlight Audio' },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="hidden sm:flex items-center gap-1.5 bg-[#1E0A0D]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-bold text-white/80"
                >
                  <Icon size={12} className="text-[#C59A9F]" />
                  {text}
                </div>
              ))}
            </div>

            {/* Bottom-right — format badge */}
            <div className="absolute bottom-6 right-7 z-10">
              <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#6B1D2F] text-[10px] font-black uppercase tracking-widest shadow-lg border border-white/60">
                HD Master
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {techMeta.map(({ icon: Icon, label, value }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + idx * 0.07 }}
              whileHover={{ y: -4 }}
              className="glass-card-luxury rounded-2xl p-5 flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#6B1D2F]/20">
                <Icon size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] text-[#78716C] uppercase font-black tracking-wider mb-0.5 truncate">
                  {label}
                </p>
                <p className="text-sm text-[#1C1917] font-black truncate">{value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ShowreelBanner;
