import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Share2, Check, ArrowRight, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import ProjectImage from './ProjectImage';

export const Modal = ({ isOpen, onClose, project, onPrev, onNext }) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  const handleCopyShare = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.origin + `/portfolio?project=${project.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInquire = () => {
    onClose();
    navigate('/contact', { state: { selectedProject: project.title } });
  };

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] overflow-y-auto overflow-x-hidden flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6">
        {/* Animated Dark Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#1E0A0D]/85 backdrop-blur-xl transition-opacity"
          onClick={onClose}
        />

        {/* Modal Container: Adaptively constrained for all devices and zoom levels */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative w-full max-w-5xl lg:max-w-6xl max-h-[calc(100dvh-1.25rem)] sm:max-h-[calc(100dvh-2.5rem)] bg-white dark:bg-[#180A0D] border border-[#C59A9F]/40 dark:border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl overflow-y-auto overflow-x-hidden z-10 flex flex-col my-auto border-t-4 border-t-[#6B1D2F]"
        >

          {/* Sticky Header Bar */}
          <div className="sticky top-0 bg-white/95 dark:bg-[#180A0D]/95 backdrop-blur-xl border-b border-[#C59A9F]/30 dark:border-white/10 px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 flex items-center justify-between z-20 gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] px-2.5 sm:px-3.5 py-1 bg-[#6B1D2F] text-white rounded-full font-black shadow-sm flex-shrink-0">
                {project.category}
              </span>
              <span className="text-xs text-[#292524] dark:text-[#E7DFE1] font-bold truncate">
                {project.client} • {project.year || '2025'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Share/Copy link button */}
              <button
                onClick={handleCopyShare}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#FAFAF9] dark:bg-white/10 border border-[#C59A9F]/50 dark:border-white/15 text-[10px] font-black uppercase tracking-wider text-[#6B1D2F] dark:text-[#E28D99] hover:bg-[#6B1D2F] hover:text-white transition-all shadow-sm cursor-pointer"
                title="Copy share link"
              >
                {copied ? <Check size={12} className="text-emerald-500" /> : <Share2 size={12} />}
                <span className="hidden xs:inline">{copied ? 'Copied!' : 'Share'}</span>
              </button>

              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FAFAF9] dark:bg-white/10 border border-[#C59A9F] dark:border-white/20 flex items-center justify-center text-[#292524] dark:text-[#F5F0F1] hover:text-[#6B1D2F] dark:hover:text-[#E28D99] hover:border-[#6B1D2F] transition-all shadow-sm cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Content Body: Adaptive spacing and scale */}
          <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-7">

            {/* Media Player Container: Height-constrained so it never overflows screen height */}
            <div className="group relative w-full aspect-video max-h-[46vh] sm:max-h-[54vh] md:max-h-[60vh] rounded-xl sm:rounded-2xl overflow-hidden bg-[#0D0507] border border-[#C59A9F]/40 dark:border-white/15 shadow-2xl flex items-center justify-center mx-auto">
              {onPrev && (
                <button
                  onClick={(e) => { e.stopPropagation(); onPrev(); }}
                  className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[#6B1D2F] backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100 shadow-xl cursor-pointer"
                  title="Previous project (←)"
                >
                  <ChevronLeft size={18} />
                </button>
              )}

              {onNext && (
                <button
                  onClick={(e) => { e.stopPropagation(); onNext(); }}
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[#6B1D2F] backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100 shadow-xl cursor-pointer"
                  title="Next project (→)"
                >
                  <ChevronRight size={18} />
                </button>
              )}

              {project.videoUrl ? (
                project.videoUrl.includes('.mp4') ? (
                  <video
                    src={project.videoUrl}
                    autoPlay
                    controls
                    className="w-full h-full object-contain bg-black"
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
                  className="w-full h-full object-contain sm:object-cover"
                />
              )}
            </div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 items-start">
              <div className="md:col-span-7 lg:col-span-8 space-y-3 sm:space-y-4">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-[#6B1D2F] dark:text-[#E28D99]">
                  {project.subCategory || project.category} Showcase
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1C1917] dark:text-[#F5F0F1] tracking-tight font-serif leading-tight">
                  {project.title}
                </h2>
                <p className="text-[#292524] dark:text-[#E7DFE1]/90 font-medium leading-relaxed text-sm sm:text-base md:text-lg">
                  {project.description}
                </p>
              </div>

              <div className="md:col-span-5 lg:col-span-4 bg-gradient-to-br from-[#FAFAF9] to-white dark:from-[#200A0E] dark:to-[#180A0D] p-4 sm:p-6 rounded-2xl border border-[#C59A9F]/40 dark:border-white/10 shadow-lg space-y-4 sm:space-y-5">
                <div>
                  <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#6B1D2F] dark:text-[#E28D99] font-black mb-1.5">
                    Role & Responsibility
                  </h4>
                  <p className="text-[#1C1917] dark:text-[#F5F0F1] text-sm sm:text-base font-black">
                    {project.role || 'Lead Creative Director'}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-[#C59A9F]/30 dark:border-white/10">
                  <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#6B1D2F] dark:text-[#E28D99] font-black mb-2.5">
                    Deliverables & Specs
                  </h4>
                  <ul className="space-y-2">
                    {(project.deliverables || ["Cinematic Edit Cut", "Color Grading Master", "Social Media Crops"]).map((item, idx) => (
                      <li key={idx} className="flex items-center text-xs sm:text-sm text-[#1C1917] dark:text-[#F5F0F1] font-medium">
                        <CheckCircle2 size={14} className="text-[#6B1D2F] dark:text-[#E28D99] mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleInquire}
                  className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#6B1D2F] to-[#8B1E3F] text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#6B1D2F]/20 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
                >
                  <MessageSquare size={14} />
                  <span>Inquire Similar Project</span>
                </button>
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="bg-[#FAFAF9] dark:bg-[#14080A] px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 border-t border-[#C59A9F]/30 dark:border-white/10 flex justify-between items-center">
            <span className="text-[9px] sm:text-[10px] text-[#292524] dark:text-[#E7DFE1]/70 uppercase font-black tracking-wider hidden sm:inline-block">
              Use ← / → keys to navigate • Esc to exit
            </span>
            <Button variant="secondary" className="text-xs py-2 px-5 sm:px-7 rounded-full font-black uppercase tracking-widest cursor-pointer ml-auto sm:ml-0" onClick={onClose}>
              Close Window
            </Button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;

