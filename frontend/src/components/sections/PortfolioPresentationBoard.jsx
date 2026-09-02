import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Mail, Phone, MapPin, Award, BookOpen, Layers, CheckCircle2, Film } from 'lucide-react';
import alazarImg from '../../assets/images/alazar.png';
import { theme } from '../../constants';

export const PortfolioPresentationBoard = ({ onSelectProject }) => {
  return (
    <div className="w-full relative font-sans">

      {/* Outer Container Matching Image 2 */}
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">

        {/* ── TOP HERO HEADER SPREAD (Image 2 Top Row) ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Left Hero Card (Large "PORTFOLIO" Card) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="lg:col-span-8 bg-gradient-to-br from-[#1E0A0D] via-[#3A121A] to-[#6B1D2F] rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-between min-h-[380px]"
          >
            {/* Background Mesh */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C59A9F_1px,transparent_1px)] [background-size:24px_24px]" />
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#C59A9F] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
                  CREATIVE DIRECTION & EDITORIAL DESIGN
                </span>
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-white/40">
                01 / MASTER SPREAD
              </span>
            </div>

            {/* Center Main Title */}
            <div className="relative z-10 my-auto py-6">
              <h1 className="text-6xl sm:text-8xl font-black tracking-tighter uppercase leading-none font-serif text-[#FAFAF9] drop-shadow-lg">
                PORT<span className="text-[#C59A9F] italic font-light">FOLIO</span>
              </h1>
              <div className="flex items-center gap-4 mt-3 text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-[#C59A9F]">
                <span>ILLUSTRATOR</span>
                <span>•</span>
                <span>GRAPHIC DESIGNER</span>
                <span>•</span>
                <span>VIDEO EDITOR</span>
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="relative z-10 flex justify-between items-end border-t border-white/15 pt-4">
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/70 uppercase">
                <Sparkles size={14} className="text-[#C59A9F]" /> ALAZAR ASDESACH • VISUAL ARCHIVE
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#C59A9F] bg-[#6B1D2F]/80 px-3 py-1 rounded border border-white/10">
                2025 EDITION
              </div>
            </div>

            {/* Right Character Graphic Illustration Placeholder */}
            <div className="absolute right-4 bottom-0 w-48 sm:w-64 h-full pointer-events-none opacity-40 lg:opacity-75 flex items-end justify-end">
              <div className="w-full h-[85%] rounded-t-full bg-gradient-to-t from-[#6B1D2F] to-transparent border-t border-x border-[#C59A9F]/40 flex items-center justify-center p-4">
                <img src={alazarImg} alt="Alazar Avatar" className="h-full object-contain filter drop-shadow-2xl" />
              </div>
            </div>
          </motion.div>

          {/* Right Column Stack (Introduction & Content) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Top Right Card: INTRODUCTION */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-[#2E1216] rounded-2xl p-6 text-white border border-[#C59A9F]/30 shadow-xl flex-1 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-3">
                <h3 className="text-lg font-black uppercase tracking-wider text-[#FAFAF9] font-serif">
                  INTRODUCTION
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C59A9F] bg-white/10 px-2.5 py-0.5 rounded">
                  PROFILE
                </span>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <img src={alazarImg} alt="Alazar" className="w-12 h-12 rounded-full border-2 border-[#C59A9F] object-cover" />
                <div>
                  <h4 className="text-sm font-black text-white">Alazar Asdesach</h4>
                  <p className="text-[11px] text-[#C59A9F] font-medium">Senior Video Editor & Lead Designer</p>
                </div>
              </div>

              <p className="text-xs text-white/70 leading-relaxed line-clamp-3 mb-3">
                Passionate visual storyteller with 5+ years of expertise in commercial video editing, brand profile books, 3D product visuals, and custom editorial typography.
              </p>

              <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold text-white/80 border-t border-white/10 pt-3">
                <div className="flex items-center gap-1.5"><MapPin size={11} className="text-[#C59A9F]" /> Addis Ababa</div>
                <div className="flex items-center gap-1.5"><Mail size={11} className="text-[#C59A9F]" /> Available</div>
              </div>
            </motion.div>

            {/* Bottom Right Card: CONTENT (Table of Contents) */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-[#1E0A0D] rounded-2xl p-6 text-white border border-[#C59A9F]/30 shadow-xl flex-1 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-3">
                <h3 className="text-lg font-black uppercase tracking-wider text-[#FAFAF9] font-serif">
                  CONTENT INDEX
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C59A9F]">
                  CHAPTERS
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2 text-center my-2">
                {[
                  { num: '01', label: 'ILLUST' },
                  { num: '02', label: 'TYPO' },
                  { num: '03', label: 'COVER' },
                  { num: '04', label: 'IMAGING' },
                  { num: '05', label: 'MORE' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#6B1D2F]/60 border border-[#C59A9F]/30 p-2 rounded-xl">
                    <span className="text-sm font-black text-[#FAFAF9] block">{item.num}</span>
                    <span className="text-[8px] font-bold text-[#C59A9F] tracking-wider block">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="text-[10px] font-bold text-white/60 tracking-widest text-center uppercase border-t border-white/10 pt-2">
                13 SELECTED COMMERCIAL & EDITORIAL MASTERS
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── 12 EDITORIAL PRESENTATION SPREADS GRID (Image 2 Main Grid) ──────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* 01. ILLUSTRATION SPREAD CARD */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => onSelectProject && onSelectProject(4)}
            className="bg-[#2E1216] rounded-2xl p-5 text-white border border-white/10 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#C59A9F] font-serif">
                01. ILLUSTRATION
              </span>
              <ArrowUpRight size={16} className="text-[#C59A9F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <div className="aspect-[4/3] bg-[#1E0A0D] rounded-xl border border-white/15 overflow-hidden p-3 relative flex items-center justify-center">
              <img src="/assets/projects/peace-illustration.svg" alt="Illustration" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
              <h4 className="text-sm font-black text-white">Peace & Character Art</h4>
              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-[#C59A9F]">8-Grid Suite</span>
            </div>
          </motion.div>

          {/* 02. TYPOGRAPHY SPREAD CARD */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => onSelectProject && onSelectProject(5)}
            className="bg-[#2E1216] rounded-2xl p-5 text-white border border-white/10 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#C59A9F] font-serif">
                02. TIPOGRAFI / LETTERING
              </span>
              <ArrowUpRight size={16} className="text-[#C59A9F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <div className="aspect-[4/3] bg-[#1E0A0D] rounded-xl border border-white/15 overflow-hidden p-3 relative flex items-center justify-center">
              <img src="/assets/projects/typography.svg" alt="Typography" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
              <h4 className="text-sm font-black text-white">Custom Typecraft Lab</h4>
              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-[#C59A9F]">Hand-Lettering</span>
            </div>
          </motion.div>

          {/* 03. BOOK COVER SPREAD CARD */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => onSelectProject && onSelectProject(6)}
            className="bg-[#2E1216] rounded-2xl p-5 text-white border border-white/10 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#C59A9F] font-serif">
                03. BOOK COVER DESIGN
              </span>
              <ArrowUpRight size={16} className="text-[#C59A9F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <div className="aspect-[4/3] bg-[#1E0A0D] rounded-xl border border-white/15 overflow-hidden p-3 relative flex items-center justify-center">
              <img src="/assets/projects/book-cover.svg" alt="Book Cover" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
              <h4 className="text-sm font-black text-white">Novelist Hardcover Renders</h4>
              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-[#C59A9F]">3D Mockups</span>
            </div>
          </motion.div>

          {/* 04. DIGITAL IMAGING CARD */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => onSelectProject && onSelectProject(7)}
            className="bg-[#2E1216] rounded-2xl p-5 text-white border border-white/10 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#C59A9F] font-serif">
                04. DIGITAL IMAGING
              </span>
              <ArrowUpRight size={16} className="text-[#C59A9F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <div className="aspect-[4/3] bg-[#1E0A0D] rounded-xl border border-white/15 overflow-hidden p-3 relative flex items-center justify-center">
              <img src="/assets/projects/digital-imaging.svg" alt="Digital Imaging" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
              <h4 className="text-sm font-black text-white">Surreal Photo Composites</h4>
              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-[#C59A9F]">Key Art</span>
            </div>
          </motion.div>

          {/* 05. MERCHANDISE / OTHER PROJECTS CARD */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => onSelectProject && onSelectProject(10)}
            className="bg-[#2E1216] rounded-2xl p-5 text-white border border-white/10 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#C59A9F] font-serif">
                05. MERCHANDISE & KIOSK
              </span>
              <ArrowUpRight size={16} className="text-[#C59A9F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <div className="aspect-[4/3] bg-[#1E0A0D] rounded-xl border border-white/15 overflow-hidden p-3 relative flex items-center justify-center">
              <img src="/assets/projects/promotional-3d.svg" alt="Merchandise" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
              <h4 className="text-sm font-black text-white">3D Display Pedestal & Mugs</h4>
              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-[#C59A9F]">Display Kiosk</span>
            </div>
          </motion.div>

          {/* 06. JAR LABEL DESIGN CARD */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => onSelectProject && onSelectProject(8)}
            className="bg-[#2E1216] rounded-2xl p-5 text-white border border-white/10 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#C59A9F] font-serif">
                06. JAR LABEL DESIGN
              </span>
              <ArrowUpRight size={16} className="text-[#C59A9F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <div className="aspect-[4/3] bg-[#1E0A0D] rounded-xl border border-white/15 overflow-hidden p-3 relative flex items-center justify-center">
              <img src="/assets/projects/jar-label.svg" alt="Jar Label" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
              <h4 className="text-sm font-black text-white">Rudeku Artisanal Jar Labels</h4>
              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-[#C59A9F]">Die-Cut Foil</span>
            </div>
          </motion.div>

          {/* 07. BRAND PROFILE BOOK DESIGN */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => onSelectProject && onSelectProject(2)}
            className="bg-[#2E1216] rounded-2xl p-5 text-white border border-white/10 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#C59A9F] font-serif">
                07. BRAND PROFILE BOOK
              </span>
              <ArrowUpRight size={16} className="text-[#C59A9F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <div className="aspect-[4/3] bg-[#1E0A0D] rounded-xl border border-white/15 overflow-hidden p-3 relative flex items-center justify-center">
              <img src="/assets/projects/lumina-brand.svg" alt="Brand Book" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
              <h4 className="text-sm font-black text-white">Lumina Identity Manual</h4>
              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-[#C59A9F]">Brand Guidelines</span>
            </div>
          </motion.div>

          {/* 08. FEED DESIGN & INTERNSHIP */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => onSelectProject && onSelectProject(9)}
            className="bg-[#2E1216] rounded-2xl p-5 text-white border border-white/10 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#C59A9F] font-serif">
                08. FEED DESIGN & MOBILE UI
              </span>
              <ArrowUpRight size={16} className="text-[#C59A9F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <div className="aspect-[4/3] bg-[#1E0A0D] rounded-xl border border-white/15 overflow-hidden p-3 relative flex items-center justify-center">
              <img src="/assets/projects/social-feed.svg" alt="Social Feed" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
              <h4 className="text-sm font-black text-white">Sunlocal 9-Grid Mobile Feed</h4>
              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-[#C59A9F]">App UI Kit</span>
            </div>
          </motion.div>

          {/* 09. VECTOR ART SPREAD */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => onSelectProject && onSelectProject(11)}
            className="bg-[#2E1216] rounded-2xl p-5 text-white border border-white/10 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#C59A9F] font-serif">
                09. VECTOR ART & NEON
              </span>
              <ArrowUpRight size={16} className="text-[#C59A9F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <div className="aspect-[4/3] bg-[#1E0A0D] rounded-xl border border-white/15 overflow-hidden p-3 relative flex items-center justify-center">
              <img src="/assets/projects/aura-poster.svg" alt="Vector Art" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
              <h4 className="text-sm font-black text-white">Cyberpunk Helmet & Art</h4>
              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-[#C59A9F]">Neon Suite</span>
            </div>
          </motion.div>

          {/* 10. PROMOTIONAL CONTENT DESIGN */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => onSelectProject && onSelectProject(10)}
            className="bg-[#2E1216] rounded-2xl p-5 text-white border border-white/10 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#C59A9F] font-serif">
                10. PROMOTIONAL CONTENT
              </span>
              <ArrowUpRight size={16} className="text-[#C59A9F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <div className="aspect-[4/3] bg-[#1E0A0D] rounded-xl border border-white/15 overflow-hidden p-3 relative flex items-center justify-center">
              <img src="/assets/projects/promotional-3d.svg" alt="Promotional 3D" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
              <h4 className="text-sm font-black text-white">Apex 3D Gear Ad Banners</h4>
              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-[#C59A9F]">Spotlight 3D</span>
            </div>
          </motion.div>

          {/* 11. URBAN ECHOES COMMERCIAL VIDEO */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => onSelectProject && onSelectProject(1)}
            className="bg-[#2E1216] rounded-2xl p-5 text-white border border-white/10 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#C59A9F] font-serif flex items-center gap-1.5">
                <Film size={12} /> 11. COMMERCIAL VIDEO
              </span>
              <ArrowUpRight size={16} className="text-[#C59A9F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <div className="aspect-[4/3] bg-[#1E0A0D] rounded-xl border border-white/15 overflow-hidden p-3 relative flex items-center justify-center">
              <img src="/assets/projects/urban-echoes.svg" alt="Commercial Reel" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
              <h4 className="text-sm font-black text-white">Urban Echoes Lookbook Spot</h4>
              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300">Live Video Reel</span>
            </div>
          </motion.div>

          {/* 12. NOIR EDITORIAL MAGAZINE SPREADS */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => onSelectProject && onSelectProject(13)}
            className="bg-[#2E1216] rounded-2xl p-5 text-white border border-white/10 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#C59A9F] font-serif">
                12. NOIR EDITORIAL SPREADS
              </span>
              <ArrowUpRight size={16} className="text-[#C59A9F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <div className="aspect-[4/3] bg-[#1E0A0D] rounded-xl border border-white/15 overflow-hidden p-3 relative flex items-center justify-center">
              <img src="/assets/projects/noir-editorial.svg" alt="Noir Editorial" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
              <h4 className="text-sm font-black text-white">Noir Fashion Press Spreads</h4>
              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-[#C59A9F]">16-Page Print</span>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default PortfolioPresentationBoard;
