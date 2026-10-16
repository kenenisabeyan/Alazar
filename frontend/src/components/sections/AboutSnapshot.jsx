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
import { navigateToSection } from '../../utils/navigation';

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
      id="about-snapshot"
      className="py-28 sm:py-36 relative overflow-hidden scroll-mt-20"
      style={{ fontFamily: theme.fonts.body, background: '#FAFAF9' }}
    >
      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-[#6B1D2F]/10 via-[#C59A9F]/08 to-transparent blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C59A9F]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Bio column ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8 text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#C59A9F]/50 text-[11px] tracking-widest text-[#6B1D2F] uppercase font-black shadow-sm shimmer-border">
              <Sparkles size={13} className="text-[#6B1D2F] animate-pulse" />
              About Alazar Asdesach
            </div>

            {/* Headline */}
            <h2
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] tracking-tight leading-[1.04] break-words"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Expert Video Director<br />
              <span className="text-gradient-burgundy font-black">& Graphic Designer.</span>
            </h2>

            {/* Body copy */}
            <p className="text-sm sm:text-lg text-[#1C1917] font-medium leading-relaxed max-w-xl bg-white/80 backdrop-blur-md px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border border-[#C59A9F]/40 shadow-sm inline-block max-w-full break-words">
              I combine cinematic video editing, DaVinci color science, and senior-level graphic design for global brands and creative directors who refuse to compromise on quality.
            </p>

            {/* Discipline cards */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              {disciplines.map(({ icon: Icon, label, tags, dark }) => (
                <div
                  key={label}
                  className={`relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 overflow-hidden border transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center text-center ${dark
                      ? 'bg-gradient-to-br from-[#6B1D2F] via-[#521523] to-[#3B0E19] border-[#C59A9F]/30 shadow-xl shadow-[#6B1D2F]/20'
                      : 'bg-white border-[#C59A9F] shadow-md hover:border-[#6B1D2F]'
                    }`}
                >
                  {dark && <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 blur-[40px] rounded-full pointer-events-none" />}
                  <div className="relative z-10 w-full flex flex-col items-center">
                    <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3.5 ${dark ? 'bg-white/20 text-white shadow-md' : 'bg-[#FAFAF9] text-[#6B1D2F]'
                      }`}>
                      <Icon size={18} />
                    </div>
                    <h4
                      className={`text-xs sm:text-base font-black mb-1.5 sm:mb-2.5 leading-tight text-center break-words ${dark ? 'text-white' : 'text-[#1C1917]'}`}
                      style={{ fontFamily: theme.fonts.heading }}
                    >
                      {label}
                    </h4>
                    <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
                      {tags.map(t => (
                        <span key={t} className={`text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full ${dark ? 'bg-white/20 text-white' : 'bg-[#FAFAF9] text-[#6B1D2F]'
                          }`}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Director's creed */}
            <div className="flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-[#C59A9F]/40 shadow-sm">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#6B1D2F]/25">
                <Quote size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#6B1D2F] font-black mb-0.5">
                  Director's Creed
                </p>
                <p className="text-xs sm:text-base text-[#1C1917] italic font-bold leading-snug break-words">
                  "Paced storytelling, vivid color science, and purposeful design."
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
              {statistics.map(({ value, label }) => (
                <div key={label} className="text-center p-3 sm:p-3.5 rounded-2xl bg-white border border-[#C59A9F] shadow-sm flex flex-col items-center justify-center">
                  <p
                    className="text-xl sm:text-2xl font-black text-[#6B1D2F] leading-none mb-1 text-center"
                    style={{ fontFamily: theme.fonts.heading }}
                  >
                    {value}
                  </p>
                  <p className="text-[9px] sm:text-[9.5px] text-[#292524] font-black uppercase tracking-wider leading-tight text-center">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="primary"
                icon={<ArrowRight size={16} />}
                onClick={() => navigateToSection(navigate, '/about#story')}
                className="w-full sm:flex-1 min-w-0 px-4 py-3.5 sm:py-4 text-xs font-black uppercase tracking-widest rounded-full shadow-xl"
              >
                Full Story
              </Button>
              <Button
                variant="outline"
                icon={<Camera size={16} />}
                onClick={() => navigateToSection(navigate, '/portfolio#portfolio-grid')}
                className="w-full sm:flex-1 min-w-0 px-4 py-3.5 sm:py-4 text-xs font-black uppercase tracking-widest rounded-full border-[#6B1D2F] text-[#6B1D2F]"
              >
                See My Work
              </Button>
            </div>
          </motion.div>

          {/* ── RIGHT: Photo stack (Expanded Width) ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center py-6 px-1 sm:px-6"
          >
            {/* Glow disk */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[500px] h-[500px] bg-gradient-to-tr from-[#6B1D2F]/20 via-[#8B1E3F]/12 to-[#C59A9F]/25 blur-[120px] rounded-full" />
            </div>

            {/* Floating discipline tag — top left */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-3 left-1 sm:-left-4 z-30 bg-white border border-[#C59A9F]/50 rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-xl flex items-center gap-2 sm:gap-2.5"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white flex items-center justify-center shadow-md">
                <Film size={14} />
              </div>
              <div>
                <p className="text-[9.5px] sm:text-[10px] font-black text-[#6B1D2F] uppercase tracking-wider">Video Editor</p>
                <p className="text-[8.5px] sm:text-[9px] text-[#292524] font-bold">8K · DaVinci</p>
              </div>
            </motion.div>

            {/* Floating award tag — bottom right */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 right-1 sm:-right-4 z-30 bg-[#6B1D2F] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-xl flex items-center gap-2 sm:gap-2.5 border border-white/20 text-white"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/20 text-white flex items-center justify-center shadow-md">
                <Award size={14} />
              </div>
              <div>
                <p className="text-[9.5px] sm:text-[10px] font-black text-white uppercase tracking-wider">Telly Gold</p>
                <p className="text-[8.5px] sm:text-[9px] text-white/70 font-semibold">Industry Award</p>
              </div>
            </motion.div>

            {/* Floating design tag — bottom left */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="hidden xs:flex absolute -bottom-4 left-1 sm:-left-4 z-30 bg-white border border-[#C59A9F]/50 rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-xl items-center gap-2 sm:gap-2.5"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#FAFAF9] text-[#6B1D2F] flex items-center justify-center shadow-sm">
                <PenTool size={14} />
              </div>
              <div>
                <p className="text-[9.5px] sm:text-[10px] font-black text-[#6B1D2F] uppercase tracking-wider">Sr. Designer</p>
                <p className="text-[8.5px] sm:text-[9px] text-[#292524] font-bold">Brand · 3D · Motion</p>
              </div>
            </motion.div>

            {/* Availability pulse — top right */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-3 right-1 sm:-right-2 z-30 flex items-center gap-1.5 sm:gap-2 bg-white border border-[#C59A9F] rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
              <span className="text-[9.5px] font-black text-[#1C1917] uppercase tracking-wider">Available Now</span>
            </motion.div>

            {/* Photo stack (Expanded to 540px width) */}
            <div className="relative w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[540px] aspect-[4/5] group cursor-pointer my-6">
              {/* Back left */}
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden border-2 border-[#C59A9F]/40 shadow-xl
                -rotate-4 -translate-x-4 -translate-y-2 scale-95 opacity-75
                group-hover:-rotate-8 group-hover:-translate-x-8 group-hover:-translate-y-4 group-hover:opacity-90
                transition-all duration-500 ease-out z-0 bg-gradient-to-br from-[#6B1D2F] via-[#2E1216] to-[#1C1917]">
                <img src={alazarImg} alt="" className="w-full h-full object-cover object-top mix-blend-luminosity filter contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-[#6B1D2F]/30 mix-blend-multiply" />
              </div>
              {/* Back right */}
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden border-2 border-[#C59A9F]/50 shadow-xl
                rotate-4 translate-x-4 -translate-y-1 scale-95 opacity-80
                group-hover:rotate-8 group-hover:translate-x-8 group-hover:-translate-y-3 group-hover:opacity-95
                transition-all duration-500 ease-out z-10 bg-gradient-to-br from-[#8B1E3F] via-[#1C1917] to-[#6B1D2F]">
                <img src={alazarImg} alt="" className="w-full h-full object-cover object-top filter saturate-150 brightness-95" />
                <div className="absolute inset-0 bg-[#8B1E3F]/20 mix-blend-color-burn" />
              </div>
              {/* Front main */}
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border-2 border-white/80 shadow-2xl shadow-[#6B1D2F]/25
                group-hover:scale-[1.02] transition-all duration-500 ease-out z-20">
                <img
                  src={alazarImg}
                  alt="Alazar Asdesach — Video Director & Senior Graphic Designer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/70 via-transparent to-transparent" />
                
                {/* Clean Name Plate at Bottom of Photo */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="bg-black/75 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/20 shadow-2xl text-center">
                    <p className="text-sm font-black text-white uppercase tracking-wider font-serif">Alazar Asdesach</p>
                    <p className="text-[10px] text-[#C59A9F] font-bold uppercase tracking-[0.2em] mt-0.5">Video Director · Senior Designer</p>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnapshot;
