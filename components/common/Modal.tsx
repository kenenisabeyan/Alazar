'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, CheckCircle2 } from 'lucide-react';
import Button from './Button';
import { Project } from '@/types/portfolio';
import { theme } from '@/utils/constants';

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
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 animate-fade-up">
      {/* Backdrop covering entire page & header */}
      <div 
        className="fixed inset-0 bg-charcoal/85 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-surface border border-border rounded-2xl shadow-burgundy-lg overflow-y-auto overflow-x-hidden z-10 flex flex-col my-auto">
        
        {/* Header Bar */}
        <div className="sticky top-0 bg-surface/95 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest px-3 py-1 bg-burgundy-faint text-burgundy border border-burgundy-soft/40 rounded-full font-semibold">
              {project.category}
            </span>
            <span className="text-xs text-slate">{project.client} • {project.year || '2025'}</span>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-canvas border border-border flex items-center justify-center text-slate hover:text-burgundy hover:border-burgundy-soft transition-all"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Media Player / Full Video Preview */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-border group shadow-card">
            {project.videoUrl ? (
              project.videoUrl.includes('.mp4') ? (
                <video
                  src={project.videoUrl}
                  autoPlay
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <iframe
                  src={project.videoUrl}
                  title={project.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )
            ) : (
              <div className="relative w-full h-full">
                <Image 
                  src={project.thumbnail} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover" 
                />
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal" style={{ fontFamily: theme.fonts.heading }}>
                {project.title}
              </h2>
              <p className="text-slate font-light leading-relaxed text-base">
                {project.description}
              </p>
            </div>

            <div className="md:col-span-4 bg-surface-alt p-6 rounded-xl border border-border space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-burgundy font-semibold mb-1">Role</h4>
                <p className="text-charcoal text-sm font-medium">{project.role || 'Lead Creative'}</p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-burgundy font-semibold mb-2">Deliverables</h4>
                <ul className="space-y-2">
                  {(project.deliverables || ["Cinematic Edit", "Color Grading", "Social Assets"]).map((item, idx) => (
                    <li key={idx} className="flex items-center text-xs text-slate">
                      <CheckCircle2 size={14} className="text-burgundy mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-surface-alt px-6 py-4 border-t border-border flex justify-end gap-3">
          <Button variant="secondary" className="text-xs py-2 px-5" onClick={onClose}>
            Close Preview
          </Button>
        </div>

      </div>
    </div>
  );
};

export default Modal;
