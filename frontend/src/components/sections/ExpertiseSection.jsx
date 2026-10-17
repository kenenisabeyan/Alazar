import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Film, PenTool, Sliders, Layers, Monitor, Camera,
  CheckCircle2, ArrowRight, Zap, Award, Star,
} from 'lucide-react';
import { theme } from '../../constants';

// Icon lookup for dynamic discipline data
const iconMap = { Film, PenTool, Sliders, Layers, Monitor, Camera, Zap, Award, Star, CheckCircle2 };
const getIcon = (name) => iconMap[name] || Film;

// ─── Specialist tag pill ────────────────────────────────────────────────────
const Tag = ({ label }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAF9] border border-[#C59A9F]/50 text-[10px] font-black text-[#6B1D2F] uppercase tracking-widest">
    <CheckCircle2 size={10} className="text-[#6B1D2F]" />
    {label}
  </span>
);

// ─── Default static data ─────────────────────────────────────────────────────
const defaultVideoCard = {
  badge: 'Video Production',
  experienceLabel: '8+ Yrs Experience',
  headline: 'Senior Video Editor',
  headlineAccent: '& Colorist',
  description: 'Mastery in cinematic editing, rhythm-perfect cuts, high-dynamic-range color grading from RAW log to broadcast master, and professional sound design on RED 8K and Sony cinema cameras.',
  competencies: [
    { icon: 'Sliders', label: 'Color Grading', sub: 'DaVinci Resolve Studio' },
    { icon: 'Film',    label: 'Commercial Edit', sub: 'Premiere Pro / Resolve' },
    { icon: 'Monitor', label: 'Sound Design',   sub: 'Fairlight & Pro Tools' },
    { icon: 'Camera',  label: '8K Cinema Raw',  sub: 'RED V-Raptor / FX6' },
  ],
  tags: ['Music Video Cuts', 'Documentary', 'Brand Reel', '3D Motion', 'Social Reels', 'Film Grading'],
  awardText: 'Telly Gold • Vimeo Staff Pick',
  buttonText: 'View Edits',
  buttonLink: '/portfolio',
};

const defaultDesignCard = {
  badge: 'Graphic Design',
  experienceLabel: 'Senior Level',
  headline: 'Senior Graphics',
  headlineAccent: 'Designer & Director',
  description: 'Comprehensive brand identity systems, editorial poster design, 3D visual concepts, motion graphics, and digital UI kits, built to last and scale across every brand touchpoint.',
  competencies: [
    { icon: 'PenTool', label: 'Brand Identity',   sub: 'Illustrator / Figma' },
    { icon: 'Layers',  label: 'Motion Graphics',  sub: 'After Effects / C4D' },
    { icon: 'Monitor', label: 'Print & Editorial', sub: 'InDesign / Photoshop' },
    { icon: 'Zap',     label: '3D Art Direction',  sub: 'Blender / Octane' },
  ],
  tags: ['Logo Systems', 'Brand Guide', 'Poster Art', 'UI Kits', 'Typography', 'Key Art'],
  awardText: 'Awwwards Site of the Day',
  buttonText: 'View Design Work',
  buttonLink: '/portfolio',
};

const defaultStats = [
  { value: '140+', label: 'Projects Delivered',   iconName: 'Film' },
  { value: '8+',   label: 'Years of Mastery',      iconName: 'Award' },
  { value: '98%',  label: 'Client Satisfaction',   iconName: 'Star' },
  { value: '12',   label: 'Industry Awards Won',   iconName: 'Zap' },
];

const defaultMarquee = [
  'Video Editing', 'Color Grading', 'Sound Design', 'Brand Identity',
  'Motion Graphics', '3D Art Direction', 'Commercial Reels', 'Typography',
  'Poster Design', 'Documentary Editing', 'UI Kit Design', 'Cinematic Cuts',
];

// ─── Video discipline card (dark) ────────────────────────────────────────────
const VideoCard = ({ navigate, cardData }) => {
  const d = cardData || defaultVideoCard;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="relative group flex flex-col bg-gradient-to-br from-[#6B1D2F] via-[#521523] to-[#3B0E19] text-white rounded-[2rem] overflow-hidden border border-[#C59A9F]/30 shadow-2xl shadow-[#6B1D2F]/20"
    >
      {/* Dark noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')] pointer-events-none z-10" />

      {/* Ambient glow blob */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-48 h-48 bg-white/05 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-20 p-5 sm:p-8 md:p-10 flex flex-col h-full">
        {/* Top badge row */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-[11px] font-black text-white uppercase tracking-widest shadow-lg">
            <Film size={12} />
            {d.badge}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-black text-white/80 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {d.experienceLabel}
          </div>
        </div>

        {/* Discipline title */}
        <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-3" style={{ fontFamily: theme.fonts.heading }}>
          {d.headline}<br />
          <span className="text-[#C59A9F] font-black">{d.headlineAccent}</span>
        </h3>

        <p className="text-white/95 text-xs sm:text-sm font-normal leading-relaxed mb-8 max-w-md">
          {d.description}
        </p>

        {/* Core competencies grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-8">
          {(d.competencies || defaultVideoCard.competencies).map(({ icon, label, sub }) => {
            const Icon = getIcon(icon);
            return (
              <div key={label} className="flex flex-col items-center justify-center text-center bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl p-2.5 sm:p-3 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-white/20 text-white flex items-center justify-center mb-1.5 flex-shrink-0">
                  <Icon size={16} />
                </div>
                <div className="w-full">
                  <p className="text-[11px] sm:text-xs font-black text-white leading-tight mb-0.5 text-center break-words">{label}</p>
                  <p className="text-[9.5px] sm:text-[10px] text-white/70 font-medium text-center">{sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Specialty tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(d.tags || defaultVideoCard.tags).map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-[10px] font-bold text-white uppercase tracking-wider">
              {t}
            </span>
          ))}
        </div>

        {/* Award strip */}
        <div className="mt-auto pt-6 border-t border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-white/80">
            <Award size={14} className="text-[#C59A9F]" />
            <span>{d.awardText}</span>
          </div>
          <button
            onClick={() => { navigate(d.buttonLink || '/portfolio'); window.scrollTo(0, 0); }}
            className="flex items-center gap-1.5 text-[11px] font-black text-white hover:text-[#C59A9F] uppercase tracking-widest group/btn transition-colors"
          >
            {d.buttonText || 'View Edits'} <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Design discipline card (light) ──────────────────────────────────────────
const DesignCard = ({ navigate, cardData }) => {
  const d = cardData || defaultDesignCard;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-[#C59A9F] shadow-xl shadow-black/5"
    >
      {/* Top accent stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#6B1D2F] via-[#8B1E3F] to-[#C59A9F]" />

      <div className="relative p-5 sm:p-8 md:p-10 flex flex-col h-full">
        {/* Top badge row */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAFAF9] border border-[#C59A9F]/50 text-[11px] font-black text-[#6B1D2F] uppercase tracking-widest shadow-sm">
            <PenTool size={12} />
            {d.badge}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-black text-[#292524] uppercase tracking-widest">
            <Star size={11} className="text-[#6B1D2F] fill-[#6B1D2F]" />
            {d.experienceLabel}
          </div>
        </div>

        {/* Discipline title */}
        <h3 className="text-2xl sm:text-4xl font-black text-[#1C1917] leading-tight mb-3" style={{ fontFamily: theme.fonts.heading }}>
          {d.headline}<br />
          <span className="text-[#6B1D2F] font-black">{d.headlineAccent}</span>
        </h3>

        <p className="text-[#292524] text-xs sm:text-sm font-normal leading-relaxed mb-8 max-w-md">
          {d.description}
        </p>

        {/* Core competencies grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-8">
          {(d.competencies || defaultDesignCard.competencies).map(({ icon, label, sub }) => {
            const Icon = getIcon(icon);
            return (
              <div key={label} className="flex flex-col items-center justify-center text-center bg-[#FAFAF9] hover:bg-[#FAFAF9]/50 border border-[#C59A9F] rounded-xl p-2.5 sm:p-3 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#FAFAF9] text-[#6B1D2F] flex items-center justify-center mb-1.5 flex-shrink-0 shadow-sm">
                  <Icon size={16} />
                </div>
                <div className="w-full">
                  <p className="text-[11px] sm:text-xs font-black text-[#1C1917] leading-tight mb-0.5 text-center break-words">{label}</p>
                  <p className="text-[9.5px] sm:text-[10px] text-[#292524] font-semibold text-center">{sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Specialty tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(d.tags || defaultDesignCard.tags).map(t => (
            <Tag key={t} label={t} />
          ))}
        </div>

        {/* Award strip */}
        <div className="mt-auto pt-6 border-t border-[#C59A9F] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#292524] font-medium">
            <Award size={14} className="text-[#6B1D2F]" />
            <span>{d.awardText}</span>
          </div>
          <button
            onClick={() => { navigate(d.buttonLink || '/portfolio'); window.scrollTo(0, 0); }}
            className="flex items-center gap-1.5 text-[11px] font-black text-[#6B1D2F] hover:text-[#8B1E3F] uppercase tracking-widest group/btn transition-colors"
          >
            {d.buttonText || 'View Design Work'} <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Export ─────────────────────────────────────────────────────────────
export const ExpertiseSection = ({ data, statistics }) => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const marqX = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  // Map API disciplines data to card format
  // The API returns an array of disciplines; index 0 = video (dark card), index 1 = design (light card)
  let videoData = null;
  let designData = null;
  if (data && data.length >= 1) {
    const mapDiscipline = (disc) => ({
      badge: disc.badge || disc.title,
      experienceLabel: disc.experienceLabel || 'Expert',
      headline: (disc.headline || disc.title || '').split('\n')[0] || disc.title,
      headlineAccent: (disc.headline || '').split('\n')[1] || '',
      description: disc.description,
      competencies: (disc.expertise || []).map(e => ({
        icon: e.icon || 'Film',
        label: e.title,
        sub: e.subtitle || e.software || '',
      })),
      tags: (disc.tags || []).map(t => t.name || t),
      awardText: disc.awardText || '',
      buttonText: disc.buttonText || 'View Work',
      buttonLink: disc.buttonLink || '/portfolio',
    });
    videoData = mapDiscipline(data[0]);
    if (data.length >= 2) {
      designData = mapDiscipline(data[1]);
    }
  }

  // Use dynamic statistics if provided, otherwise defaults
  const stats = (statistics && statistics.length)
    ? statistics.map(s => ({
        value: `${s.value}${s.suffix || ''}`,
        label: s.label,
        icon: getIcon(s.icon || s.iconName),
      }))
    : defaultStats.map(s => ({ ...s, icon: getIcon(s.iconName) }));

  const marqueeItems = defaultMarquee;

  return (
    <section
      ref={sectionRef}
      className="py-28 sm:py-36 bg-[#FAFAF9] relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#6B1D2F]/08 to-transparent blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#C59A9F]/12 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">

        {/* ── Section header ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#C59A9F]/50 text-[11px] font-black text-[#6B1D2F] uppercase tracking-widest shadow-sm shimmer-border mb-6"
            >
              <Zap size={13} className="text-[#6B1D2F]" />
              Dual Creative Disciplines
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.06] tracking-tight break-words"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Expert in Two<br />
              <span className="text-gradient-burgundy font-black">Creative Fields.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="text-[#1C1917] font-medium text-base lg:text-lg max-w-sm leading-relaxed lg:text-right bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#C59A9F]/40 shadow-sm"
          >
            Where cinematic video production meets senior-level graphic design, two disciplines mastered under one creative vision.
          </motion.p>
        </div>

        {/* ── Dual discipline cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <VideoCard navigate={navigate} cardData={videoData} />
          <DesignCard navigate={navigate} cardData={designData} />
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-12 sm:mb-16"
        >
          {stats.map(({ value, label, icon: Icon }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card-luxury rounded-2xl p-3.5 sm:p-6 flex flex-col items-center justify-center text-center"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white flex items-center justify-center mx-auto mb-2 sm:mb-2.5 shadow-md shadow-[#6B1D2F]/20">
                <Icon size={18} />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#6B1D2F] dark:text-[#F5F0F1] mb-1 leading-none text-center" style={{ fontFamily: theme.fonts.heading }}>
                {value}
              </p>
              <p className="text-[10px] sm:text-[11px] text-[#292524] dark:text-[#A89597] font-black uppercase tracking-wider text-center leading-tight">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Scrolling marquee strip ── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#6B1D2F] via-[#8B1E3F] to-[#6B1D2F] py-5 px-0 select-none shadow-lg shadow-[#6B1D2F]/20">
          <motion.div style={{ x: marqX }} className="flex items-center gap-0 w-max">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/90 whitespace-nowrap px-6">
                  {item}
                </span>
                <span className="text-white text-xs flex-shrink-0">✦</span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ExpertiseSection;
