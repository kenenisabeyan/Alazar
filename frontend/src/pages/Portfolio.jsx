import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Film, Layout, Volume2, RefreshCw, Sparkles, Grid, Layers, ArrowUpRight } from 'lucide-react';

import Modal from '../components/common/Modal';
import ProjectImage from '../components/common/ProjectImage';
import ProjectCardMedia from '../components/common/ProjectCardMedia';
import PortfolioPresentationBoard from '../components/sections/PortfolioPresentationBoard';
import ExpertiseSection from '../components/sections/ExpertiseSection';
import CaseStudyHighlight from '../components/sections/CaseStudyHighlight';
import AvailabilityCTA from '../components/sections/AvailabilityCTA';
import { theme } from '../constants';
import api from '../api';
import alazarImg from '../assets/images/alazar.png';

export default function Portfolio() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('spread'); // 'spread' | 'grid'
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
      <div className="container mx-auto px-4 sm:px-6 md:px-12 mb-10 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[#C59A9F]/40 rounded-full text-[11px] text-[#6B1D2F] font-black mb-6 shadow-sm shimmer-border">
          <Sparkles size={12} className="animate-pulse" />
          Graphic Design & Video Portfolio Presentation
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
          className="text-[#78716C] max-w-2xl mx-auto font-light text-base sm:text-lg mb-8 leading-relaxed"
        >
          An editorial archive of commercial video cuts, color-graded masters, brand identities, book covers, packaging, and digital imaging spreads.
        </motion.p>

        {/* Filter bar & View Mode Switcher */}
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

          {/* Presentation View Toggle */}
          <div className="flex items-center bg-white p-1.5 rounded-full border border-[#C59A9F] shadow-sm gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3.5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                viewMode === 'grid' ? 'bg-[#6B1D2F] text-white shadow-sm' : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <Grid size={13} /> Grid
            </button>
            <button
              onClick={() => setViewMode('spread')}
              className={`px-3.5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                viewMode === 'spread' ? 'bg-[#6B1D2F] text-white shadow-sm' : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <Layers size={13} /> Presentation Sheet
            </button>
          </div>

          <button
            onClick={fetchProjects}
            title="Sync latest"
            className="p-3 rounded-full bg-white border border-[#C59A9F] text-[#78716C] hover:border-[#6B1D2F] hover:text-[#6B1D2F] transition-all shadow-sm"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin text-[#6B1D2F]' : ''} />
          </button>
        </div>
      </div>

      {/* ── Projects Gallery ────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] mb-20 sm:mb-28 relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="rounded-[2rem] aspect-[4/5] bg-[#FAFAF9] border border-[#C59A9F]/40 animate-pulse" />
            ))}
          </div>
        ) : viewMode === 'spread' ? (
          /* 🎨 Presentation Master Board View (Exact layout matching Image 2 reference) */
          <PortfolioPresentationBoard
            projects={projects}
            filter={filter}
            onSelectProject={(id) => {
              const target = projects.find(p => p.id === id) || projects[0];
              if (target) openModal(target);
            }}
          />
        ) : (
          /* 📱 Interactive Grid View */
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
                  className="group relative cursor-pointer rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#240A0F] via-[#3B111A] to-[#160508] aspect-[4/5] border border-white/15 hover:border-[#C59A9F]/50 hover:shadow-2xl hover:shadow-[#6B1D2F]/25 transition-all duration-500 shadow-xl"
                >
                  <ProjectCardMedia project={project} />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#160508]/95 via-[#240A0F]/30 to-transparent pointer-events-none" />

                  <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between z-10 pointer-events-none">
                    <div className="flex justify-between items-start">
                      <span className="text-[9.5px] uppercase tracking-[0.2em] px-3.5 py-1.5 bg-black/60 backdrop-blur-md text-[#FAFAF9] rounded-full font-black shadow-lg flex items-center gap-1.5 border border-white/15">
                        {project.category === 'video' ? <Film size={11} className="text-[#C59A9F]" /> : <Layout size={11} className="text-[#C59A9F]" />}
                        {project.subCategory || project.category}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 6 }}
                        className="w-10 h-10 rounded-full bg-white/95 text-[#6B1D2F] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl pointer-events-auto"
                      >
                        {project.videoUrl || project.previewVideoUrl ? <Volume2 size={16} /> : <Eye size={16} />}
                      </motion.div>
                    </div>
                    <div>
                      <h3
                        className="text-xl sm:text-2xl text-white mb-1.5 font-black tracking-tight group-hover:text-[#FAFAF9] transition-colors font-serif"
                        style={{ fontFamily: theme.fonts.heading }}
                      >
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[#C59A9F] text-[10px] uppercase tracking-[0.2em] font-bold">
                        <span>{project.client}</span>
                        <span className="text-white/30">•</span>
                        <span>{project.year || '2025'}</span>
                      </div>
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
