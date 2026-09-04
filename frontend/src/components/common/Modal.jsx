import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import Button from './Button';
import ProjectImage from './ProjectImage';

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
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Animated Dark Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#1E0A0D]/75 backdrop-blur-2xl transition-opacity"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative w-full max-w-6xl max-h-[92vh] bg-white border border-[#C59A9F]/40 rounded-3xl shadow-2xl overflow-y-auto overflow-x-hidden z-10 flex flex-col my-auto border-t-2 border-t-[#6B1D2F]"
        >

          {/* Sticky Header Bar */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-[#C59A9F]/30 px-6 sm:px-8 py-4 flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.2em] px-3.5 py-1 bg-[#6B1D2F] text-white rounded-full font-black shadow-sm">
                {project.category}
              </span>
              <span className="text-xs text-[#78716C] font-semibold">{project.client} • {project.year || '2025'}</span>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#FAFAF9] border border-[#C59A9F] flex items-center justify-center text-[#78716C] hover:text-[#6B1D2F] hover:border-[#6B1D2F] hover:bg-[#FAFAF9] transition-all shadow-sm"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-8">

            {/* Media Player Container */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-[#1E0A0D] border border-[#C59A9F]/40 shadow-2xl">
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
                <ProjectImage
                  src={project.thumbnail}
                  title={project.title}
                  category={project.category}
                  subCategory={project.subCategory || project.category}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-7 lg:col-span-8 space-y-4">
                <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#6B1D2F]">
                  {project.subCategory || project.category} Showcase
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-[#1C1917] tracking-tight font-serif">
                  {project.title}
                </h2>
                <p className="text-[#78716C] font-light leading-relaxed text-base sm:text-lg">
                  {project.description}
                </p>
              </div>

              <div className="md:col-span-5 lg:col-span-4 bg-gradient-to-br from-[#FAFAF9] to-white p-6 sm:p-7 rounded-3xl border border-[#C59A9F]/40 shadow-lg space-y-5">
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#6B1D2F] font-black mb-1.5 flex items-center gap-1.5">
                    <Sparkles size={13} /> Role & Responsibility
                  </h4>
                  <p className="text-[#1C1917] text-sm sm:text-base font-black">{project.role || 'Lead Creative Director'}</p>
                </div>

                <div className="pt-4 border-t border-[#C59A9F]/30">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#6B1D2F] font-black mb-3 flex items-center gap-1.5">
                    <Sparkles size={13} /> Deliverables & Specs
                  </h4>
                  <ul className="space-y-2.5">
                    {(project.deliverables || ["Cinematic Edit Cut", "Color Grading Master", "Social Media Crops"]).map((item, idx) => (
                      <li key={idx} className="flex items-center text-xs sm:text-sm text-[#1C1917] font-medium">
                        <CheckCircle2 size={15} className="text-[#6B1D2F] mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="bg-[#FAFAF9] px-8 py-5 border-t border-[#C59A9F]/30 flex justify-end">
            <Button variant="secondary" className="text-xs py-3 px-8 rounded-full font-black uppercase tracking-widest" onClick={onClose}>
              Close Window
            </Button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;

