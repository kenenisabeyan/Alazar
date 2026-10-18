import React, { useState } from 'react';
import { Film, Layout, BookOpen, Package, Layers, Smartphone, Shapes, Type, Image as ImageIcon, CheckCircle2, ShieldCheck } from 'lucide-react';

const categoryThemes = {
  design: {
    gradient: 'from-[#2A0E14] via-[#4A1020] to-[#1A060A]',
    accent: '#C59A9F',
    subAccent: '#E8D4D6',
    border: 'border-[#C59A9F]/30',
    tag: 'EDITORIAL DESIGN'
  },
  video: {
    gradient: 'from-[#1A060A] via-[#2E1216] to-[#120407]',
    accent: '#E06D85',
    subAccent: '#F5C6D0',
    border: 'border-red-500/30',
    tag: 'CINEMATIC MOTION'
  },
  illustration: {
    gradient: 'from-[#3A0F1D] via-[#6B1D2F] to-[#1E0A0D]',
    accent: '#F3B4BE',
    subAccent: '#FFFFFF',
    border: 'border-[#F3B4BE]/30',
    tag: 'VECTOR & ART'
  },
  branding: {
    gradient: 'from-[#240A10] via-[#521523] to-[#180508]',
    accent: '#C59A9F',
    subAccent: '#E5D0D3',
    border: 'border-[#C59A9F]/35',
    tag: 'BRAND IDENTITY'
  },
};

export const ProjectImage = ({
  src,
  alt,
  title = 'Design Project',
  category = 'design',
  subCategory = '',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || hasError) {
    const themeData = categoryThemes[category] || categoryThemes.design;
    const sub = (subCategory || category || '').toLowerCase();

    // Determine icon based on discipline
    let IconComponent = Palette;
    let disciplineLabel = 'GRAPHIC DESIGN';
    let deliverableSpec = 'VECTOR SCALABLE • 300 DPI';

    if (category === 'video' || sub.includes('video') || sub.includes('commercial') || sub.includes('doc')) {
      IconComponent = Film;
      disciplineLabel = 'MOTION & EDIT';
      deliverableSpec = '8K DCI PRORES 422 HQ';
    } else if (sub.includes('book') || sub.includes('cover') || sub.includes('editorial') || sub.includes('publication')) {
      IconComponent = BookOpen;
      disciplineLabel = 'EDITORIAL PUBLICATION';
      deliverableSpec = 'HARDCOVER MOCKUP • CMYK PRINT';
    } else if (sub.includes('package') || sub.includes('label') || sub.includes('jar')) {
      IconComponent = Package;
      disciplineLabel = 'PACKAGING & DIE-CUT';
      deliverableSpec = 'FOIL STAMP MASTER • 3D RENDER';
    } else if (sub.includes('feed') || sub.includes('ui') || sub.includes('app') || sub.includes('mobile')) {
      IconComponent = Smartphone;
      disciplineLabel = 'UI & DIGITAL MEDIA';
      deliverableSpec = 'FIGMA KIT • 9-GRID SYSTEM';
    } else if (sub.includes('typography') || sub.includes('lettering') || sub.includes('font')) {
      IconComponent = Type;
      disciplineLabel = 'CUSTOM TYPOGRAPHY';
      deliverableSpec = 'OTF / TTF GLYPH SUITE';
    } else if (sub.includes('3d') || sub.includes('poster') || sub.includes('aura') || sub.includes('promo')) {
      IconComponent = Layers;
      disciplineLabel = '3D KEY ART & POSTER';
      deliverableSpec = 'OCTANE 8K • COLOR GRADED';
    }

    return (
      <div
        className={`w-full h-full relative overflow-hidden bg-gradient-to-br ${themeData.gradient} flex flex-col justify-between p-4 sm:p-5 text-white select-none ${className}`}
      >
        {/* Subtle Background Geometry & Grid Lines */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Ambient Corner Radial Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#6B1D2F]/50 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#8B1E3F]/30 blur-3xl rounded-full pointer-events-none" />

        {/* Top Header Strip: Discipline Pill & Studio Spec */}
        <div className="relative z-10 flex justify-between items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-black uppercase tracking-[0.18em] text-[#FAFAF9] shadow-sm">
            <IconComponent size={10} className="text-[#C59A9F]" />
            <span>{subCategory || disciplineLabel}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[8.5px] font-black uppercase tracking-[0.2em] text-[#C59A9F]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            <span>ARCHIVE 2025</span>
          </div>
        </div>

        {/* Center Editorial Showcase Card */}
        <div className="relative z-10 my-auto py-2 flex flex-col items-center justify-center text-center">
          
          {/* Glowing Icon Frame */}
          <div className="relative mb-2.5 group-hover:scale-110 transition-transform duration-500">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg border border-white/30 flex items-center justify-center shadow-2xl shadow-black/50 ring-1 ring-white/20">
              <IconComponent size={22} className="text-[#FAFAF9] drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]" />
            </div>
            <div className="absolute -inset-1 rounded-xl bg-[#C59A9F]/20 blur-sm -z-10" />
          </div>

          {/* Project Title with Luxury Typography */}
          <h4 className="text-base sm:text-lg font-black tracking-tight text-[#FAFAF9] line-clamp-1 max-w-[90%] font-serif leading-snug drop-shadow-md">
            {title}
          </h4>

          {/* Editorial Subtitle Pill */}
          <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded bg-black/30 border border-white/10 text-[8.5px] uppercase font-bold text-[#C59A9F] tracking-[0.2em]">
            <span>{disciplineLabel}</span>
          </div>

          {/* Subtle Color Swatch Indicator */}
          <div className="flex items-center gap-1.5 mt-2 opacity-70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FAFAF9]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59A9F]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B1D2F]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E0A0D]" />
          </div>
        </div>

        {/* Bottom Technical Spec Strip */}
        <div className="relative z-10 flex justify-between items-center border-t border-white/15 pt-2 text-[8.5px] uppercase tracking-[0.18em] text-white/70 font-bold">
          <div className="flex items-center gap-1">
            <span className="text-[#FAFAF9]/90">{deliverableSpec}</span>
          </div>
          <span className="text-[#C59A9F] bg-white/10 px-1.5 py-0.5 rounded text-[8px] font-mono">
            ALAZAR STUDIO
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#2E1216] animate-pulse flex items-center justify-center z-10">
          <div className="w-5 h-5 rounded-full border-2 border-[#C59A9F]/30 border-t-[#C59A9F] animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt || title}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
      />
      {/* Subtle In-Image Editorial Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E0A0D]/70 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default ProjectImage;

