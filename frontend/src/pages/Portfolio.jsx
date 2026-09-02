import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Film, Layout, Volume2, RefreshCw, Sparkles } from 'lucide-react';

import Modal from '../components/common/Modal';
import ExpertiseSection from '../components/sections/ExpertiseSection';
import CaseStudyHighlight from '../components/sections/CaseStudyHighlight';
import AvailabilityCTA from '../components/sections/AvailabilityCTA';
import { theme } from '../constants';
import api from '../api';
import alazarImg from '../assets/images/alazar.png';

export default function Portfolio() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await api.projects.getAll();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const filteredProjects = projects.filter(p =>
    filter === 'all' ? true : p.category === filter
  );

  const openModal = (project) => {
    setActiveModalProject(project);
    setIsModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAFAF9] pt-32 sm:pt-40 pb-0 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Floating portrait */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-0 w-[450px] md:w-[600px] opacity-[0.06] pointer-events-none z-0 mix-blend-luminosity"
      >
        <img src={alazarImg} alt="" className="w-full h-auto object-contain" />
      </motion.div>

      {/* ── Page header ────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 mb-14 sm:mb-20 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[#C59A9F]/40 rounded-full text-[11px] text-[#6B1D2F] font-black mb-6 shadow-sm shimmer-border">
          <Sparkles size={12} className="animate-pulse" />
          Curated Work Gallery
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-[#1C1917] mb-6 tracking-tight leading-[1.04]"
          style={{ fontFamily: theme.fonts.heading }}
        >
          Selected <span className="italic font-light text-gradient-burgundy">Works</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#78716C] max-w-2xl mx-auto font-light text-base sm:text-lg mb-10 leading-relaxed"
        >
          An archive of commercial video cuts, color-graded masters, brand identities, and 3D visual concepts — spanning video editing and senior graphic design.
        </motion.p>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center bg-white p-1.5 rounded-full border border-[#C59A9F] shadow-sm gap-1"
          >
            {[
              { id: 'all', label: `All (${projects.length})` },
              { id: 'video', label: `Video (${projects.filter(p => p.category === 'video').length})`, icon: <Film size={13} /> },
              { id: 'design', label: `Design (${projects.filter(p => p.category === 'design').length})`, icon: <Layout size={13} /> },
            ].map(cat => {
              const active = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`relative px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${active ? 'text-white' : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                >
                  {active && (
                    <motion.div
                      layoutId="portfolioFilterBg"
                      className="absolute inset-0 bg-[#6B1D2F] rounded-full -z-10 shadow-md shadow-[#6B1D2F]/25"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {cat.icon}
                  {cat.label}
                </button>
              );
            })}
          </motion.div>

          <button
            onClick={fetchProjects}
            title="Sync latest"
            className="p-3 rounded-full bg-white border border-[#C59A9F] text-[#78716C] hover:border-[#6B1D2F] hover:text-[#6B1D2F] transition-all shadow-sm"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin text-[#6B1D2F]' : ''} />
          </button>
        </div>
      </div>

      {/* ── Projects grid ────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl mb-20 sm:mb-28">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="rounded-[2rem] aspect-[4/5] bg-[#FAFAF9] animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map(project => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => openModal(project)}
                  className="group relative cursor-pointer rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#6B1D2F] via-[#521523] to-[#3B0E19] aspect-[4/5] border border-[#C59A9F]/30 hover:border-[#C59A9F]/60 hover:shadow-2xl hover:shadow-[#6B1D2F]/20 transition-all duration-500 shadow-xl"
                >
                  {project.previewVideoUrl ? (
                    <video
                      src={project.previewVideoUrl}
                      autoPlay muted loop playsInline
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  ) : (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#3B0E19]/95 via-[#6B1D2F]/25 to-transparent" />

                  {project.previewVideoUrl && (
                    <div className="absolute top-5 right-5 bg-[#1E0A0D]/80 backdrop-blur-md text-white text-[10px] uppercase font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 z-10 border border-white/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Reel
                    </div>
                  )}

                  <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] uppercase tracking-widest px-3.5 py-1.5 bg-[#6B1D2F] text-white rounded-full font-black shadow-md flex items-center gap-1.5">
                        {project.category === 'video' && <Film size={11} />}
                        {project.category}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 6 }}
                        className="w-11 h-11 rounded-full bg-white/95 text-[#6B1D2F] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
                      >
                        {project.videoUrl ? <Volume2 size={18} /> : <Eye size={18} />}
                      </motion.div>
                    </div>
                    <div>
                      <h3
                        className="text-xl sm:text-2xl text-white mb-1.5 font-black tracking-tight group-hover:text-[#FAFAF9] transition-colors"
                        style={{ fontFamily: theme.fonts.heading }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-white/55 text-[10px] uppercase tracking-widest font-bold">
                        {project.client} · {project.year || '2025'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* ── Specialist context ─────────────────────────────────────────── */}
      <ExpertiseSection />

      {/* ── Case studies ──────────────────────────────────────────────── */}
      <CaseStudyHighlight />

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <AvailabilityCTA />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={activeModalProject}
      />
    </motion.div>
  );
}
