import React, { useState } from 'react';
import { Sparkles, Film, Layout, BookOpen, Package, Layers, Smartphone, PenTool, Image as ImageIcon } from 'lucide-react';

const categoryGradients = {
  design: 'from-[#6B1D2F] via-[#4A1020] to-[#2E1216]',
  video: 'from-[#2E1216] via-[#3A161C] to-[#1E0A0D]',
  illustration: 'from-[#8B1E3F] via-[#6B1D2F] to-[#2E1216]',
  branding: 'from-[#6B1D2F] via-[#521523] to-[#3B0E19]',
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
    const gradient = categoryGradients[category] || categoryGradients.design;

    return (
      <div
        className={`w-full h-full relative overflow-hidden bg-gradient-to-br ${gradient} flex flex-col justify-between p-6 text-white select-none ${className}`}
      >
        {/* Decorative Grid Pattern Background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Top Discipline Tag */}
        <div className="relative z-10 flex justify-between items-start">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest text-[#FAFAF9]">
            {category === 'video' ? <Film size={11} /> : <Layout size={11} />}
            {subCategory || (category === 'video' ? 'Video Production' : 'Graphic Design')}
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
            Alazar Studio
          </span>
        </div>

        {/* Center Graphic Design Art Mockup Symbol */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center p-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center mb-3 shadow-2xl shadow-black/40 ring-4 ring-white/10">
            {category === 'video' ? (
              <Film size={28} className="text-[#C59A9F]" />
            ) : subCategory?.toLowerCase().includes('book') ? (
              <BookOpen size={28} className="text-[#C59A9F]" />
            ) : subCategory?.toLowerCase().includes('package') || subCategory?.toLowerCase().includes('label') ? (
              <Package size={28} className="text-[#C59A9F]" />
            ) : subCategory?.toLowerCase().includes('feed') || subCategory?.toLowerCase().includes('ui') ? (
              <Smartphone size={28} className="text-[#C59A9F]" />
            ) : (
              <PenTool size={28} className="text-[#C59A9F]" />
            )}
          </div>
          <h4 className="text-lg font-black tracking-tight text-white line-clamp-1 max-w-[85%]">
            {title}
          </h4>
          <p className="text-[10px] uppercase font-bold text-[#C59A9F] tracking-widest mt-1">
            Visual Presentation Showcase
          </p>
        </div>

        {/* Bottom Graphic Frame Trim */}
        <div className="relative z-10 flex justify-between items-end border-t border-white/15 pt-3">
          <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-white/60 font-bold">
            <Sparkles size={10} className="text-[#C59A9F]" /> 8K Master Deliverable
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#2E1216] animate-pulse flex items-center justify-center">
          <Sparkles size={20} className="text-[#C59A9F] animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt || title}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};

export default ProjectImage;
