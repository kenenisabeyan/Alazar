import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Film, PenTool, Sparkles, Quote, ArrowRight,
  Layers, CheckCircle2, Award, Camera, Zap,
} from 'lucide-react';
import Button from '../common/Button';
import { theme, statistics } from '../../constants';
import alazarImg from '../../assets/images/alazar.png';

const disciplines = [
  {
    icon: Film,
    label: 'Video Post-Production',
    tags: ['Color Grading', 'Sound Design', '8K RAW', 'Commercial Edit'],
    bg: '#1C1917',
    dark: true,
  },
  {
    icon: PenTool,
    label: 'Senior Graphic Designer',
    tags: ['Brand Identity', '3D Motion', 'Print & Editorial', 'UI Systems'],
    bg: '#FFFFFF',
    dark: false,
  },
];

export const AboutSnapshot = () => {
  const navigate = useNavigate();

  return (
    <section
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body, background: '#FAFAF9' }}
    >
      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-[#6B1D2F]/10 via-[#C59A9F]/08 to-transparent blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C59A9F]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Bio column ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-7 text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#C59A9F]/50 text-[11px] tracking-widest text-[#6B1D2F] uppercase font-black shadow-sm shimmer-border">
              <Sparkles size={13} className="text-[#6B1D2F] animate-pulse" />
              About Alazar Asdesach
            </div>

            {/* Headline */}
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] tracking-tight leading-[1.06]"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Expert Video Director<br />
              <span className="italic font-light text-gradient-burgundy">& Graphic Designer.</span>
            </h2>

            {/* Body copy */}
            <p className="text-base sm:text-lg text-[#78716C] font-light leading-relaxed max-w-lg">
              I combine cinematic video editing, DaVinci color science, and senior-level graphic design for global brands and creative directors who refuse to compromise on quality.
            </p>

            {/* Discipline cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {disciplines.map(({ icon: Icon, label, tags, dark }) => (
                <div
                  key={label}
                  className={`relative rounded-2xl p-5 overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${dark
                      ? 'bg-gradient-to-br from-[#6B1D2F] via-[#521523] to-[#3B0E19] border-[#C59A9F]/30 shadow-xl shadow-[#6B1D2F]/20'
                      : 'bg-white border-[#C59A9F] shadow-md hover:border-[#C59A9F]'
                    }`}
                >
                  {dark && <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 blur-[40px] rounded-full pointer-events-none" />}
                  <div className="relative z-10">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${dark ? 'bg-white/20 text-white shadow-md' : 'bg-[#FAFAF9] text-[#6B1D2F]'
                      }`}>
                      <Icon size={17} />
                    </div>
                    <h4
                      className={`text-sm font-black mb-2.5 leading-tight ${dark ? 'text-white' : 'text-[#1C1917]'}`}
                      style={{ fontFamily: theme.fonts.heading }}
                    >
                      {label}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map(t => (
                        <span key={t} className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${dark ? 'bg-white/20 text-white' : 'bg-[#FAFAF9] text-[#6B1D2F]'
                          }`}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Director's creed */}
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#C59A9F]/40 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#6B1D2F]/25">
                <Quote size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#6B1D2F] font-black mb-0.5">
                  Director's Creed
                </p>
                <p className="text-xs sm:text-sm text-[#1C1917] italic font-bold leading-snug">
                  "Paced storytelling, vivid color science, and purposeful design."
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {statistics.map(({ value, label }) => (
                <div key={label} className="text-center p-3 rounded-xl bg-white border border-[#C59A9F] shadow-sm">
                  <p
                    className="text-xl font-black text-[#6B1D2F] leading-none mb-1"
                    style={{ fontFamily: theme.fonts.heading }}
                  >
                    {value}
                  </p>
                  <p className="text-[9px] text-[#78716C] font-bold uppercase tracking-wider leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                variant="primary"
                icon={<ArrowRight size={16} />}
                onClick={() => { navigate('/about'); window.scrollTo(0, 0); }}
                className="px-8 py-4 text-xs font-black uppercase tracking-widest rounded-full shadow-xl"
              >
                Full Story
              </Button>
              <Button
                variant="outline"
                icon={<Camera size={16} />}
                onClick={() => { navigate('/portfolio'); window.scrollTo(0, 0); }}
                className="px-8 py-4 text-xs font-black uppercase tracking-widest rounded-full border-[#6B1D2F] text-[#6B1D2F]"
              >
                See My Work
              </Button>
            </div>
          </motion.div>

          {/* ── RIGHT: Photo stack ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center py-8"
          >
            {/* Glow disk */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[420px] h-[420px] bg-gradient-to-tr from-[#6B1D2F]/20 via-[#8B1E3F]/12 to-[#C59A9F]/25 blur-[110px] rounded-full" />
            </div>

            {/* Floating discipline tag — top left */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-8 -left-2 z-30 bg-white border border-[#C59A9F]/50 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white flex items-center justify-center shadow-md">
                <Film size={15} />
              </div>
              <div>
                <p className="text-[10px] font-black text-[#6B1D2F] uppercase tracking-wider">Video Editor</p>
                <p className="text-[9px] text-[#78716C] font-semibold">8K · DaVinci</p>
              </div>
            </motion.div>

            {/* Floating award tag — bottom right */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-6 -right-2 z-30 bg-[#6B1D2F] rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2.5 border border-white/20"
            >
              <div className="w-8 h-8 rounded-lg bg-[#6B1D2F] text-white flex items-center justify-center shadow-md">
                <Award size={15} />
              </div>
              <div>
                <p className="text-[10px] font-black text-white uppercase tracking-wider">Telly Gold</p>
                <p className="text-[9px] text-white/50 font-semibold">Industry Award</p>
              </div>
            </motion.div>

            {/* Floating design tag — bottom left */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-16 -left-4 z-30 bg-white border border-[#C59A9F]/50 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-[#FAFAF9] text-[#6B1D2F] flex items-center justify-center shadow-sm">
                <PenTool size={15} />
              </div>
              <div>
                <p className="text-[10px] font-black text-[#6B1D2F] uppercase tracking-wider">Sr. Designer</p>
                <p className="text-[9px] text-[#78716C] font-semibold">Brand · 3D · Motion</p>
              </div>
            </motion.div>

            {/* Availability pulse — top right */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-12 right-4 z-30 flex items-center gap-2 bg-white border border-[#C59A9F] rounded-full px-3 py-1.5 shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
              <span className="text-[9px] font-black text-[#1C1917] uppercase tracking-wider">Available Now</span>
            </motion.div>

            {/* Photo stack */}
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] aspect-[4/5] group cursor-pointer">
              {/* Back left */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border-2 border-[#C59A9F]/40 shadow-xl
                -rotate-6 -translate-x-5 -translate-y-3 scale-95 opacity-75
                group-hover:-rotate-12 group-hover:-translate-x-12 group-hover:-translate-y-6 group-hover:opacity-90
                transition-all duration-500 ease-out z-0 bg-gradient-to-br from-[#6B1D2F] via-[#2E1216] to-[#1C1917]">
                <img src={alazarImg} alt="" className="w-full h-full object-cover object-top mix-blend-luminosity filter contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-[#6B1D2F]/30 mix-blend-multiply" />
              </div>
              {/* Back right */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border-2 border-[#C59A9F]/50 shadow-xl
                rotate-6 translate-x-5 -translate-y-1 scale-95 opacity-80
                group-hover:rotate-12 group-hover:translate-x-12 group-hover:-translate-y-4 group-hover:opacity-95
                transition-all duration-500 ease-out z-10 bg-gradient-to-br from-[#8B1E3F] via-[#1C1917] to-[#6B1D2F]">
                <img src={alazarImg} alt="" className="w-full h-full object-cover object-top filter saturate-150 brightness-95" />
                <div className="absolute inset-0 bg-[#8B1E3F]/20 mix-blend-color-burn" />
              </div>
              {/* Front main */}
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/80 shadow-2xl shadow-[#6B1D2F]/25
                group-hover:scale-[1.03] transition-all duration-500 ease-out z-20">
                <img
                  src={alazarImg}
                  alt="Alazar Asdesach — Video Director & Senior Graphic Designer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/55 via-transparent to-transparent" />
                {/* Name plate */}
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <div className="bg-white/90 backdrop-blur-md rounded-xl px-4 py-3 border border-white/60 shadow-xl">
                    <p className="text-xs font-black text-[#1C1917] uppercase tracking-wider">Alazar Asdesach</p>
                    <p className="text-[10px] text-[#6B1D2F] font-bold uppercase tracking-widest">Video Director · Senior Designer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skill orbit chips */}
            {[
              { label: 'DaVinci Resolve', r: '50%', t: '78%', delay: 0 },
              { label: 'After Effects', r: '55%', t: '18%', delay: 0.2 },
              { label: 'Blender 3D', r: '-8%', t: '48%', delay: 0.4 },
            ].map(({ label, r, t, delay }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + delay }}
                className="absolute hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#C59A9F] shadow-md z-30"
                style={{ right: r, top: t }}
              >
                <Zap size={10} className="text-[#6B1D2F]" />
                <span className="text-[9px] font-black text-[#1C1917] uppercase tracking-wider">{label}</span>
              </motion.div>
            ))}

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnapshot;
