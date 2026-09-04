import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Mail, Phone, MapPin, Award, BookOpen, Layers, CheckCircle2, Film, Eye, Play } from 'lucide-react';
import alazarImg from '../../assets/images/alazar.png';
import ProjectCardMedia from '../common/ProjectCardMedia';

export const PortfolioPresentationBoard = ({ projects = [], filter = 'all', onSelectProject }) => {
  // Dynamic project filtering for Video, Design, and All
  const displayProjects = projects.filter(p => {
    if (filter === 'video') return p.category === 'video';
    if (filter === 'design') return p.category === 'design';
    return true;
  });

  const videoCount = projects.filter(p => p.category === 'video').length;
  const designCount = projects.filter(p => p.category === 'design').length;

  return (
    <div className="w-full relative font-sans">
      {/* Outer Container */}
      <div className="w-full max-w-[1550px] mx-auto space-y-8 relative z-10">

        {/* ── TOP HERO HEADER SPREAD ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Left Hero Card (Large "PORTFOLIO" Master Spread Card) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="lg:col-span-8 bg-gradient-to-br from-[#1A060A] via-[#331018] to-[#541624] rounded-3xl p-6 sm:p-10 md:p-12 text-white relative overflow-hidden shadow-2xl border border-white/15 flex flex-col justify-between min-h-[440px]"
          >
            {/* Background Mesh Grid Pattern */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C59A9F_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

            {/* Top Bar Header */}
            <div className="relative z-10 flex flex-wrap justify-between items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59A9F] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-[#FAFAF9]">
                  CREATIVE DIRECTION & EDITORIAL DESIGN
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-widest text-[#C59A9F]/90 bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10">
                01 / MASTER SPREAD
              </span>
            </div>

            {/* Middle Section: Clear Two-Column Layout (Text on Left, Photo on Right) */}
            <div className="relative z-10 my-auto py-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Text Column (Spacious and wide) */}
              <div className="md:col-span-7 space-y-5">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight uppercase leading-[0.92] font-serif text-[#FAFAF9] drop-shadow-2xl">
                  PORT<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5A8B2] to-[#C59A9F] italic font-light">FOLIO</span>
                </h1>
                
                <div className="flex items-center gap-2 sm:gap-2.5 text-[10px] sm:text-xs font-black tracking-[0.22em] uppercase text-[#C59A9F] flex-wrap pt-1">
                  <span className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 backdrop-blur-sm">ILLUSTRATOR</span>
                  <span className="text-white/30">•</span>
                  <span className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 backdrop-blur-sm">GRAPHIC DESIGNER</span>
                  <span className="text-white/30">•</span>
                  <span className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 backdrop-blur-sm">VIDEO EDITOR</span>
                </div>
              </div>

              {/* Right Photo Column (Wider Standalone Portrait Arch Frame with NO overlapping text) */}
              <div className="md:col-span-5 flex justify-center md:justify-end items-center">
                <div className="relative w-48 sm:w-56 md:w-64 lg:w-72 aspect-[3/4] rounded-t-full rounded-b-2xl bg-gradient-to-t from-[#1A060A] to-[#6B1D2F]/40 p-2.5 border-2 border-[#C59A9F]/40 shadow-2xl overflow-hidden flex items-end justify-center group">
                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 bg-radial-gradient from-[#8B1E3F]/30 via-transparent to-transparent pointer-events-none" />
                  
                  <img
                    src={alazarImg}
                    alt="Alazar Asdesach"
                    className="w-full h-full object-contain object-bottom filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute bottom-2.5 inset-x-2.5 py-1.5 px-2 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-center text-[9px] font-mono font-black uppercase tracking-widest text-[#FAFAF9]">
                    ALAZAR ASDESACH
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="relative z-10 flex flex-wrap justify-between items-center border-t border-white/15 pt-5 gap-3">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black tracking-[0.22em] text-white/80 uppercase">
                <Sparkles size={14} className="text-[#C59A9F] animate-pulse" />
                <span>VISUAL ARCHIVE</span>
                <span className="text-white/30">•</span>
                <span className="text-[#C59A9F]">SELECTED WORKS</span>
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#FAFAF9] bg-gradient-to-r from-[#6B1D2F] to-[#8B1E3F] px-4 py-1.5 rounded-full border border-white/20 shadow-md">
                2025 EDITION
              </div>
            </div>
          </motion.div>

          {/* Right Column Stack (Introduction & Content Index) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Top Right Card: INTRODUCTION */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-gradient-to-br from-[#240A0F] to-[#1A060A] rounded-3xl p-6 sm:p-7 text-white border border-white/15 shadow-2xl flex-1 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#6B1D2F]/20 blur-2xl rounded-full pointer-events-none" />

              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                <h3 className="text-base sm:text-lg font-black uppercase tracking-[0.2em] text-[#FAFAF9] font-serif flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C59A9F]" />
                  INTRODUCTION
                </h3>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#FAFAF9] bg-white/10 px-3 py-1 rounded-full border border-white/15">
                  PROFILE
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img src={alazarImg} alt="Alazar" className="w-14 h-14 rounded-2xl border-2 border-[#C59A9F] object-cover shadow-lg" />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#1A060A]" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-white tracking-tight">Alazar Asdesach</h4>
                  <p className="text-xs text-[#C59A9F] font-semibold tracking-wide">Senior Video Editor & Lead Designer</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-4 font-normal">
                Passionate visual storyteller with 5+ years of expertise in commercial video editing, brand profile books, 3D product visuals, and custom editorial typography.
              </p>

              <div className="grid grid-cols-2 gap-2.5 text-[10px] sm:text-[11px] uppercase font-black text-white/90 border-t border-white/10 pt-3.5">
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                  <MapPin size={13} className="text-[#C59A9F]" /> Addis Ababa
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-950/40 text-emerald-300 px-3 py-2 rounded-xl border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available
                </div>
              </div>
            </motion.div>

            {/* Bottom Right Card: CONTENT INDEX */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-gradient-to-br from-[#1A060A] to-[#240A0F] rounded-3xl p-6 sm:p-7 text-white border border-white/15 shadow-2xl flex-1 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-3">
                <h3 className="text-base sm:text-lg font-black uppercase tracking-[0.2em] text-[#FAFAF9] font-serif flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#6B1D2F]" />
                  CONTENT INDEX
                </h3>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#C59A9F] bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                  CHAPTERS
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center my-2.5">
                <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/15 p-3 rounded-2xl shadow-inner">
                  <span className="text-xl font-black text-[#FAFAF9] block leading-none">{projects.length}</span>
                  <span className="text-[9px] font-black text-[#C59A9F] tracking-[0.18em] block uppercase mt-1.5">TOTAL</span>
                </div>
                <div className="bg-gradient-to-b from-[#6B1D2F]/40 to-[#6B1D2F]/20 border border-[#C59A9F]/30 p-3 rounded-2xl shadow-inner">
                  <span className="text-xl font-black text-[#FAFAF9] block leading-none">{videoCount}</span>
                  <span className="text-[9px] font-black text-[#C59A9F] tracking-[0.18em] block uppercase mt-1.5">VIDEO</span>
                </div>
                <div className="bg-gradient-to-b from-[#8B1E3F]/40 to-[#8B1E3F]/20 border border-[#C59A9F]/30 p-3 rounded-2xl shadow-inner">
                  <span className="text-xl font-black text-[#FAFAF9] block leading-none">{designCount}</span>
                  <span className="text-[9px] font-black text-[#C59A9F] tracking-[0.18em] block uppercase mt-1.5">DESIGN</span>
                </div>
              </div>

              <div className="text-[10px] font-black text-white/70 tracking-[0.2em] text-center uppercase border-t border-white/10 pt-3">
                CURRENT VIEW: <span className="text-[#FAFAF9] bg-[#6B1D2F] px-2.5 py-1 rounded font-mono">{filter.toUpperCase()} ({displayProjects.length})</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── PRESENTATION SPREADS GRID (Filtered Video & Design Items) ──────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => onSelectProject && onSelectProject(project.id)}
              className="bg-gradient-to-br from-[#240A0F] to-[#160508] rounded-3xl p-5 sm:p-6 text-white border border-white/15 shadow-xl hover:shadow-2xl hover:border-[#C59A9F]/50 transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Header inside Card */}
              <div className="flex justify-between items-center mb-3.5">
                <span className="text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-[#FAFAF9] font-serif flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C59A9F]" />
                  {idx < 9 ? `0${idx + 1}` : idx + 1}. {project.subCategory || project.category}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#6B1D2F] flex items-center justify-center transition-colors">
                  <ArrowUpRight size={15} className="text-[#C59A9F] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>

              {/* Artwork / Video Media Showcase Window */}
              <div className="aspect-[4/3] bg-[#120407] rounded-2xl border border-white/15 overflow-hidden relative shadow-inner">
                <ProjectCardMedia project={project} />
              </div>

              {/* Presentation Card Footer */}
              <div className="mt-4 pt-3.5 border-t border-white/10 flex justify-between items-center">
                <div>
                  <h4 className="text-sm sm:text-base font-black text-white group-hover:text-[#FAFAF9] transition-colors">{project.title}</h4>
                  <p className="text-[10px] sm:text-[11px] text-[#C59A9F] uppercase tracking-wider font-bold">{project.client}</p>
                </div>
                <span className="text-[9.5px] uppercase font-black px-3 py-1 rounded-full bg-white/10 text-[#FAFAF9] border border-white/15 font-mono">
                  {project.year || '2025'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PortfolioPresentationBoard;



