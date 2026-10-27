import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Phone, MapPin, Award, BookOpen, Layers, CheckCircle2, Film, Eye, Play, Paintbrush } from 'lucide-react';
import alazarImg from '../../assets/images/alazar.png';
import ProjectCardMedia from '../common/ProjectCardMedia';

export const PortfolioPresentationBoard = ({ projects = [], filter = 'all', presentationSettings, onSelectProject }) => {
  const ps = presentationSettings || {};
  const profileName = ps.profileName || 'Alazar Asdesach';
  const profileTitle = ps.profileTitle || 'Senior Video Editor & Lead Designer';
  const profileDescription = ps.profileDescription || 'Passionate visual storyteller with 5+ years of expertise in commercial video editing, brand profile books, 3D product visuals, and custom editorial typography.';
  const location = ps.location || 'Addis Ababa';
  const availability = ps.availability || 'Available';
  const edition = ps.edition || '2025 EDITION';

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

        {/* ── TOP HERO HEADER SPREAD (Advanced Executive Editorial Design) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Left Hero Card (Large "PORTFOLIO" Master Spread Card) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="lg:col-span-8 bg-gradient-to-br from-[#1E060B] via-[#360F19] to-[#591626] rounded-3xl p-6 sm:p-10 md:p-12 text-white relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(107,29,47,0.35)] border border-[#C59A9F]/30 flex flex-col justify-between min-h-0 sm:min-h-[460px]"
          >
            {/* Ambient Lighting & Geometric Grid Lines */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C59A9F_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#8B1E3F]/35 blur-[90px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#6B1D2F]/40 blur-[100px] rounded-full pointer-events-none" />

            {/* Top Bar Header */}
            <div className="relative z-10 flex flex-wrap justify-between items-center gap-2.5 sm:gap-3">
              <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-md shimmer-border max-w-full">
                <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#FAFAF9] truncate">
                  CREATIVE DIRECTION & EDITORIAL DESIGN
                </span>
              </div>
              <span className="text-[9.5px] sm:text-[11px] font-mono font-black uppercase tracking-widest text-[#E8B4BE] bg-black/60 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/15 shadow-sm">
                01 / MASTER SPREAD
              </span>
            </div>

            {/* Middle Section: Two-Column Layout (Text on Left, Portrait Arch on Right) */}
            <div className="relative z-10 my-auto py-5 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              
              {/* Left Text Column */}
              <div className="md:col-span-7 space-y-4 sm:space-y-6 text-left">
                <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-tight leading-[0.9] font-serif text-[#FAFAF9] drop-shadow-2xl break-words">
                  Portfolio
                </h1>
                
                <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-black tracking-[0.16em] sm:tracking-[0.22em] uppercase text-[#FAFAF9] flex-wrap pt-1">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm">
                    <Paintbrush size={11} className="text-[#C59A9F]" />
                    <span>ILLUSTRATOR</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm">
                    <Layers size={11} className="text-[#C59A9F]" />
                    <span>GRAPHIC DESIGNER</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm">
                    <Film size={11} className="text-[#C59A9F]" />
                    <span>VIDEO EDITOR</span>
                  </div>
                </div>
              </div>

              {/* Right Photo Column (Standalone Portrait Arch Frame) */}
              <div className="md:col-span-5 flex justify-center md:justify-end items-center">
                <div className="relative w-44 sm:w-56 md:w-64 lg:w-72 aspect-[3/4] rounded-t-full rounded-b-3xl bg-gradient-to-t from-[#1E060B] via-[#6B1D2F]/50 to-transparent border-2 border-[#C59A9F]/50 shadow-2xl overflow-hidden flex items-end justify-center group">
                  <div className="absolute inset-0 bg-radial-gradient from-[#8B1E3F]/30 via-transparent to-transparent pointer-events-none z-10" />
                  
                  <img
                    src={alazarImg}
                    alt="Alazar Asdesach"
                    className="w-full h-full object-cover object-top filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute bottom-3 inset-x-3 py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-center text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#FAFAF9] shadow-xl z-20">
                    {profileName.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="relative z-10 flex flex-wrap justify-between items-center border-t border-white/20 pt-4 sm:pt-5 gap-3">
              <div className="flex items-center gap-2 text-[9.5px] sm:text-xs font-black tracking-[0.16em] sm:tracking-[0.22em] text-[#FAFAF9] uppercase">
                <span>VISUAL ARCHIVE</span>
                <span className="text-white/30">•</span>
                <span className="text-[#C59A9F]">SELECTED WORKS</span>
              </div>
              <div className="text-[9.5px] sm:text-[10px] font-black uppercase tracking-widest text-[#FAFAF9] bg-gradient-to-r from-[#6B1D2F] to-[#8B1E3F] px-4 py-1.5 rounded-full border border-white/20 shadow-lg">
                {edition}
              </div>
            </div>
          </motion.div>

          {/* Right Column Stack (Introduction & Content Index) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Top Right Card: INTRODUCTION */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-[#240A0F] via-[#1E060B] to-[#140407] rounded-3xl p-6 sm:p-7 text-white border border-[#C59A9F]/30 shadow-2xl flex-1 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#6B1D2F]/25 blur-3xl rounded-full pointer-events-none" />

              <div className="flex justify-between items-center border-b border-white/15 pb-3.5 mb-4">
                <h3 className="text-sm sm:text-lg font-black uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#FAFAF9] font-serif flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C59A9F] shadow-sm shadow-[#C59A9F]" />
                  INTRODUCTION
                </h3>
                <span className="text-[9px] sm:text-[9.5px] font-black uppercase tracking-widest text-[#FAFAF9] bg-white/10 px-3 py-1 sm:py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                  PROFILE
                </span>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="relative flex-shrink-0">
                  <img src={alazarImg} alt={profileName} className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 border-[#C59A9F] object-cover shadow-lg" />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-500 border-2 border-[#140407] shadow-sm" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base sm:text-lg font-black text-[#FAFAF9] tracking-tight truncate">{profileName}</h4>
                  <p className="text-xs text-[#C59A9F] font-bold tracking-wide truncate">{profileTitle}</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/85 leading-relaxed mb-4 font-normal">
                {profileDescription}
              </p>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-[10px] sm:text-[11px] uppercase font-black text-white/95 border-t border-white/15 pt-4">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white/10 px-3 py-2 sm:py-2.5 rounded-xl border border-white/15 backdrop-blur-md shadow-sm min-w-0 text-center">
                  <MapPin size={13} className="text-[#C59A9F] flex-shrink-0" />
                  <span className="truncate">{location}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-emerald-950/60 text-emerald-300 px-3 py-2 sm:py-2.5 rounded-xl border border-emerald-500/30 shadow-sm min-w-0 text-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  <span className="truncate">{availability}</span>
                </div>
              </div>
            </motion.div>

            {/* Bottom Right Card: CONTENT INDEX */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-[#1A060A] via-[#280A11] to-[#1E060B] rounded-3xl p-6 sm:p-7 text-white border border-[#C59A9F]/30 shadow-2xl flex-1 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="flex justify-between items-center border-b border-white/15 pb-3.5 mb-3.5">
                <h3 className="text-base sm:text-lg font-black uppercase tracking-[0.2em] text-[#FAFAF9] font-serif flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6B1D2F] shadow-sm shadow-[#6B1D2F]" />
                  CONTENT INDEX
                </h3>
                <span className="text-[9.5px] font-black uppercase tracking-widest text-[#E8B4BE] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                  CHAPTERS
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center my-3">
                <div className="bg-gradient-to-b from-white/15 to-white/5 border border-white/20 p-3.5 rounded-2xl shadow-md">
                  <span className="text-2xl font-black text-[#FAFAF9] block leading-none">{projects.length}</span>
                  <span className="text-[9px] font-black text-[#C59A9F] tracking-[0.2em] block uppercase mt-1.5">TOTAL</span>
                </div>
                <div className="bg-gradient-to-b from-[#6B1D2F]/60 to-[#3B0E19]/40 border border-[#C59A9F]/40 p-3.5 rounded-2xl shadow-md">
                  <span className="text-2xl font-black text-[#FAFAF9] block leading-none">{videoCount}</span>
                  <span className="text-[9px] font-black text-[#C59A9F] tracking-[0.2em] block uppercase mt-1.5">VIDEO</span>
                </div>
                <div className="bg-gradient-to-b from-[#8B1E3F]/60 to-[#521523]/40 border border-[#C59A9F]/40 p-3.5 rounded-2xl shadow-md">
                  <span className="text-2xl font-black text-[#FAFAF9] block leading-none">{designCount}</span>
                  <span className="text-[9px] font-black text-[#C59A9F] tracking-[0.2em] block uppercase mt-1.5">DESIGN</span>
                </div>
              </div>

              <div className="text-[10.5px] font-black text-white/80 tracking-[0.22em] text-center uppercase border-t border-white/15 pt-3.5">
                CURRENT VIEW: <span className="text-[#FAFAF9] bg-gradient-to-r from-[#6B1D2F] to-[#8B1E3F] px-3.5 py-1 rounded-full font-mono border border-white/20 shadow-sm">{filter.toUpperCase()} ({displayProjects.length})</span>
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
              className="bg-gradient-to-br from-[#240A0F] to-[#160508] rounded-none p-5 sm:p-6 text-white border border-white/15 shadow-xl hover:shadow-2xl hover:border-[#C59A9F]/50 transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Header inside Card */}
              <div className="flex justify-between items-center mb-3.5">
                <span className="text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-[#FAFAF9] font-serif flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-none bg-[#C59A9F]" />
                  {idx < 9 ? `0${idx + 1}` : idx + 1}. {project.subCategory || project.category}
                </span>
                <div className="w-8 h-8 rounded-none bg-white/10 group-hover:bg-[#6B1D2F] flex items-center justify-center transition-colors border border-white/15">
                  <ArrowUpRight size={15} className="text-[#C59A9F] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>

              {/* Artwork / Video Media Showcase Window */}
              <div className="aspect-[4/3] bg-[#120407] rounded-none border border-white/15 overflow-hidden relative shadow-inner">
                <ProjectCardMedia project={project} />

                {/* Subtle hover vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#160508]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Presentation Card Footer */}
              <div className="mt-4 pt-3.5 border-t border-white/10 flex justify-between items-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 transition-all duration-400 ease-out">
                <div>
                  <h4 className="text-sm sm:text-base font-black text-white group-hover:text-[#FAFAF9] transition-colors">{project.title}</h4>
                  <p className="text-[10px] sm:text-[11px] text-[#C59A9F] uppercase tracking-wider font-bold">{project.client}</p>
                </div>
                <span className="text-[9.5px] uppercase font-black px-3 py-1 rounded-none bg-white/10 text-[#FAFAF9] border border-white/15 font-mono">
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



