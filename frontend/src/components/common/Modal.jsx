import React, { useEffect } from 'react';
import { X, Play, Film, CheckCircle2, ExternalLink } from 'lucide-react';
import Button from './Button';

export const Modal = ({ isOpen, onClose, project }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
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
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 animate-fade-in">
      {/* Backdrop covering entire page & header */}
      <div 
        className="fixed inset-0 bg-[#1C1917]/85 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#FFFFFF] border border-[#6B1D2F]/30 rounded-2xl shadow-2xl overflow-y-auto overflow-x-hidden z-10 flex flex-col my-auto">
        
        {/* Header Bar */}
        <div className="sticky top-0 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5D9DB] px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest px-3 py-1 bg-[#F5E8EA] text-[#6B1D2F] border border-[#C59A9F]/40 rounded-full font-semibold">
              {project.category}
            </span>
            <span className="text-xs text-[#78716C]">{project.client} • {project.year || '2025'}</span>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FAFAF9] border border-[#E5D9DB] flex items-center justify-center text-[#78716C] hover:text-[#6B1D2F] hover:border-[#C59A9F] transition-all"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Media Player / Full Video Preview */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-[#E5D9DB] group shadow-xl">
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
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1C1917]" style={{ fontFamily: "'Roboto', sans-serif" }}>
                {project.title}
              </h2>
              <p className="text-[#78716C] font-light leading-relaxed text-base">
                {project.description}
              </p>
            </div>

            <div className="md:col-span-4 bg-[#FAFAF9] p-6 rounded-xl border border-[#E5D9DB] space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold mb-1">Role</h4>
                <p className="text-[#1C1917] text-sm font-medium">{project.role || 'Lead Creative'}</p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold mb-2">Deliverables</h4>
                <ul className="space-y-2">
                  {(project.deliverables || ["Cinematic Edit", "Color Grading", "Social Assets"]).map((item, idx) => (
                    <li key={idx} className="flex items-center text-xs text-[#78716C]">
                      <CheckCircle2 size={14} className="text-[#6B1D2F] mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#F4F0EF] px-6 py-4 border-t border-[#E5D9DB] flex justify-end gap-3">
          <Button variant="secondary" className="text-xs py-2 px-5" onClick={onClose}>
            Close Preview
          </Button>
        </div>

      </div>
    </div>
  );
};

export default Modal;
