'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, CheckCircle2 } from 'lucide-react';
import Button from './Button';
import { Project } from '@/types/portfolio';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, project }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#150709]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#2E1216] border border-[#8B1E3F]/30 rounded-2xl shadow-2xl overflow-y-auto overflow-x-hidden z-10 flex flex-col my-auto">
        
        {/* Header Bar */}
        <div className="sticky top-0 bg-[#2E1216]/95 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest px-3 py-1 bg-[#8B1E3F]/20 text-[#8B1E3F] border border-[#8B1E3F]/30 rounded-full font-semibold">
              {project.category}
            </span>
            <span className="text-xs text-[#A89597]">{project.client} • {project.year || '2025'}</span>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1E0A0D] border border-white/10 flex items-center justify-center text-[#A89597] hover:text-white hover:border-[#8B1E3F] transition-all"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Media Player / Thumbnail Preview */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-[#1E0A0D] border border-white/5 group shadow-xl">
            {project.videoUrl ? (
              <iframe
                src={project.videoUrl}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full">
                <Image 
                  src={project.thumbnail} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E0A0D] via-transparent to-transparent"></div>
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-4">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#F5F0F1]" style={{ fontFamily: "'Cinzel', serif" }}>
                {project.title}
              </h2>
              <p className="text-[#A89597] font-light leading-relaxed text-base">
                {project.description}
              </p>
            </div>

            <div className="md:col-span-4 bg-[#1E0A0D] p-6 rounded-xl border border-white/5 space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#8B1E3F] font-semibold mb-1">Role</h4>
                <p className="text-[#F5F0F1] text-sm font-medium">{project.role || 'Lead Creative'}</p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#8B1E3F] font-semibold mb-2">Deliverables</h4>
                <ul className="space-y-2">
                  {(project.deliverables || ["Cinematic Edit", "Color Grading", "Social Assets"]).map((item, idx) => (
                    <li key={idx} className="flex items-center text-xs text-[#A89597]">
                      <CheckCircle2 size={14} className="text-[#8B1E3F] mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#150709] px-6 py-4 border-t border-white/5 flex justify-end gap-3">
          <Button variant="secondary" className="text-xs py-2 px-5" onClick={onClose}>
            Close Preview
          </Button>
        </div>

      </div>
    </div>
  );
};

export default Modal;
