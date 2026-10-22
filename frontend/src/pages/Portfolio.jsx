import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Film, Layout, Volume2, RefreshCw, Grid, Layers, ArrowUpRight, Search, X } from 'lucide-react';

import Modal from '../components/common/Modal';
import ProjectImage from '../components/common/ProjectImage';
import ProjectCardMedia from '../components/common/ProjectCardMedia';
import PortfolioPresentationBoard from '../components/sections/PortfolioPresentationBoard';
import ExpertiseSection from '../components/sections/ExpertiseSection';
import CaseStudyHighlight from '../components/sections/CaseStudyHighlight';
import AvailabilityCTA from '../components/sections/AvailabilityCTA';
import { theme, portfolioProjects } from '../constants';
import api from '../api';
import alazarImg from '../assets/images/alazar.png';
import heroBg from '../assets/images/hero-bg.png';

export default function Portfolio() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const catFromUrl = searchParams.get('cat') || searchParams.get('category') || 'all';
  const [filter, setFilter] = useState(catFromUrl);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('spread'); // 'spread' | 'grid'
  
  // Instant rendering: Seed immediately from cache or constants
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      const cached = localStorage.getItem('alazar_cached_portfolio_data');
      if (cached) return JSON.parse(cached);
    } catch {}
    return null;
  });
  
  const [projects, setProjects] = useState(() => {
    try {
      const cached = localStorage.getItem('alazar_cached_portfolio');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return portfolioProjects;
  });
  
  const [loading, setLoading] = useState(false); // Render immediately without skeleton delay!
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProjects = async (manualRefresh = false) => {
    if (manualRefresh) setIsRefreshing(true);
    try {
      const publicData = await api.portfolio.getPublicData();
      if (publicData && publicData.projects && publicData.projects.length) {
        setPortfolioData(publicData);
        setProjects(publicData.projects);
        try {
          localStorage.setItem('alazar_cached_portfolio', JSON.stringify(publicData.projects));
          localStorage.setItem('alazar_cached_portfolio_data', JSON.stringify(publicData));
        } catch {}
      } else {
        const data = await api.projects.getAll();
        if (data && data.length) {
          setProjects(data);
          try {
            localStorage.setItem('alazar_cached_portfolio', JSON.stringify(data));
          } catch {}
        }
      }

      // Check if direct project query string exists
      const directProjectId = searchParams.get('project');
      if (directProjectId) {
        const foundList = publicData?.projects || projects;
        const found = foundList.find(p => p.id === directProjectId || String(p.id) === directProjectId);
        if (found) {
          setActiveModalProject(found);
          setIsModalOpen(true);
        }
      }
    } catch (err) {
      console.warn('Portfolio rendered from instant fallback/cache:', err);
    } finally {
      if (manualRefresh) setIsRefreshing(false);
      // Synchronize smooth scroll bounds after dynamic content paint
      if (window.lenis) window.lenis.resize();
    }
  };

  useEffect(() => {
    fetchProjects();
    const c = searchParams.get('cat') || searchParams.get('category');
    if (c) {
      setFilter(c);
    } else {
      setFilter('all');
    }
  }, [searchParams]);

  const filteredProjects = projects.filter(p => {
    const matchesCategory = filter === 'all' ? true : p.category === filter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.client && p.client.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
    return matchesCategory && matchesSearch;
  });

  const openModal = (project) => {
    setActiveModalProject(project);
    setIsModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen bg-[#FAFAF9] dark:bg-[#1E0A0D] mesh-bg pt-24 xs:pt-28 sm:pt-40 pb-0 relative overflow-hidden transition-colors duration-300"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Motion Flow Background Image Layer 1: hero-bg.png */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          x: ['0%', '-2%', '0%'],
          y: ['0%', '-1.5%', '0%'],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 z-0 pointer-events-none opacity-25 mix-blend-multiply"
      >
        <img
          src={heroBg}
          alt="Hero Flow Texture"
          className="w-full h-full object-cover object-center filter blur-[1px]"
        />
      </motion.div>

      {/* Motion Flow Layer 2: Floating alazar.png visual element */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 1.5, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-10 right-0 sm:right-10 md:right-20 w-[260px] xs:w-[340px] sm:w-[500px] md:w-[650px] opacity-10 sm:opacity-20 md:opacity-25 pointer-events-none z-0 mix-blend-multiply filter blur-[0.5px]"
      >
        <img
          src={alazarImg}
          alt="Alazar Motion Flow"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-[#6B1D2F]/18 via-[#8B1E3F]/12 to-[#C59A9F]/20 blur-[180px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-[#C59A9F]/20 blur-[150px] rounded-full pointer-events-none" />

      {/* ── Page header ────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 mb-10 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#1C1917] dark:text-[#F5F0F1] mb-6 tracking-tight leading-[1.04] sm:leading-[0.96] break-words"
          style={{ fontFamily: theme.fonts.heading }}
        >
          Selected <span className="text-gradient-burgundy font-black">Works</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#44403C] dark:text-[#E7E5E4] max-w-2xl mx-auto font-medium text-sm sm:text-base md:text-lg mb-8 leading-relaxed px-2"
        >
          An editorial archive of commercial video cuts, color-graded masters, brand identities, book covers, packaging, and digital imaging spreads.
        </motion.p>

        {/* Search & Filter Unified Luxury Capsule Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-white/85 dark:bg-[#1E0A0D]/85 backdrop-blur-xl border border-[#C59A9F]/35 dark:border-white/10 shadow-xl shadow-black/5 max-w-4xl mx-auto">
          {/* Keyword Search Input */}
          <div className="relative w-full sm:w-60">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78716C] dark:text-[#A89597]" />
            <input
              type="text"
              placeholder="Search works..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-[#FAFAF9] dark:bg-[#2E1216] border border-[#C59A9F]/35 dark:border-white/10 rounded-full text-xs font-semibold text-[#1C1917] dark:text-[#F5F0F1] focus:outline-none focus:border-[#6B1D2F] dark:focus:border-[#E28D99] shadow-inner transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#6B1D2F]"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center bg-black/[0.04] dark:bg-white/[0.06] p-1 rounded-full gap-1"
          >
            {[
              { id: 'all', label: `All (${projects.length})` },
              { id: 'video', label: `Video (${projects.filter(p => p.category === 'video').length})`, icon: <Film size={12} /> },
              { id: 'design', label: `Design (${projects.filter(p => p.category === 'design').length})`, icon: <Layout size={12} /> },
            ].map(cat => {
              const active = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`relative px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    active ? 'text-white' : 'text-[#57534E] dark:text-[#D6D3D1] hover:text-[#6B1D2F] dark:hover:text-[#F5F0F1]'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="portfolioFilterBg"
                      className="absolute inset-0 bg-gradient-to-r from-[#6B1D2F] to-[#8B1E3F] rounded-full -z-10 shadow-md shadow-[#6B1D2F]/25"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {cat.icon}
                  {cat.label}
                </button>
              );
            })}
          </motion.div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-black/[0.04] dark:bg-white/[0.06] p-1 rounded-full gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                viewMode === 'grid' ? 'bg-[#6B1D2F] text-white shadow-sm' : 'text-[#57534E] dark:text-[#D6D3D1] hover:text-[#6B1D2F]'
              }`}
            >
              <Grid size={12} /> Grid
            </button>
            <button
              onClick={() => setViewMode('spread')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                viewMode === 'spread' ? 'bg-[#6B1D2F] text-white shadow-sm' : 'text-[#57534E] dark:text-[#D6D3D1] hover:text-[#6B1D2F]'
              }`}
            >
              <Layers size={12} /> Spread
            </button>
          </div>

          <button
            onClick={() => fetchProjects(true)}
            title="Sync latest"
            className="w-9 h-9 rounded-full bg-[#FAFAF9] dark:bg-[#2E1216] border border-[#C59A9F]/40 dark:border-white/10 text-[#57534E] dark:text-[#D6D3D1] hover:border-[#6B1D2F] hover:text-[#6B1D2F] flex items-center justify-center transition-all shadow-sm flex-shrink-0"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin text-[#6B1D2F]' : ''} />
          </button>
        </div>
      </div>

      {/* ── Projects Gallery ────────────────────────────────────────────────── */}
      <div id="portfolio-grid" className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] mb-20 sm:mb-28 relative z-10 scroll-mt-28">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="rounded-2xl aspect-[4/5] bg-[#FAFAF9] dark:bg-[#1E0A0D] border border-[#C59A9F]/30 animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-[#2E1216] rounded-2xl border border-[#C59A9F]/30 dark:border-white/10 shadow-lg max-w-xl mx-auto space-y-4 px-6">
            <div className="w-16 h-16 rounded-full bg-[#6B1D2F]/10 border border-[#6B1D2F]/20 text-[#6B1D2F] flex items-center justify-center mx-auto">
              <Search size={28} />
            </div>
            <h3 className="text-2xl font-black text-[#1C1917] dark:text-[#F5F0F1]" style={{ fontFamily: theme.fonts.heading }}>
              No matching projects found
            </h3>
            <p className="text-[#57534E] dark:text-[#A89597] text-sm font-normal max-w-md mx-auto">
              We couldn't find any projects matching "{searchQuery}". Try searching for different keywords or reset your filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setFilter('all'); }}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#6B1D2F] to-[#8B1E3F] text-white font-black text-xs uppercase tracking-widest hover:opacity-95 transition-all shadow-lg shadow-[#6B1D2F]/25"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'spread' ? (
          /* 🎨 Presentation Master Board View (Exact layout matching Image 2 reference) */
          <PortfolioPresentationBoard
            projects={projects}
            filter={filter}
            presentationSettings={portfolioData?.settings?.presentation}
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
                  className="group relative cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br from-[#240A0F] via-[#3B111A] to-[#160508] aspect-[4/5] border border-white/15 hover:border-[#C59A9F]/50 hover:shadow-2xl hover:shadow-[#6B1D2F]/25 transition-all duration-500 shadow-xl"
                >
                  <ProjectCardMedia project={project} />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#160508]/95 via-[#240A0F]/40 to-black/20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-400 ease-out pointer-events-none">
                    <div className="flex justify-between items-start sm:-translate-y-2 sm:group-hover:translate-y-0 transition-transform duration-400">
                      <span className="text-[9.5px] uppercase tracking-[0.2em] px-3.5 py-1.5 bg-black/60 backdrop-blur-md text-[#FAFAF9] rounded-full font-black shadow-lg flex items-center gap-1.5 border border-white/15">
                        {project.category === 'video' ? <Film size={11} className="text-[#C59A9F]" /> : <Layout size={11} className="text-[#C59A9F]" />}
                        {project.subCategory || project.category}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 6 }}
                        className="w-10 h-10 rounded-full bg-white/95 text-[#6B1D2F] flex items-center justify-center shadow-xl pointer-events-auto"
                      >
                        {project.videoUrl || project.previewVideoUrl ? <Volume2 size={16} /> : <Eye size={16} />}
                      </motion.div>
                    </div>
                    <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
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
        onPrev={() => {
          if (!activeModalProject || filteredProjects.length === 0) return;
          const idx = filteredProjects.findIndex(p => p.id === activeModalProject.id);
          const prevIdx = (idx - 1 + filteredProjects.length) % filteredProjects.length;
          setActiveModalProject(filteredProjects[prevIdx]);
        }}
        onNext={() => {
          if (!activeModalProject || filteredProjects.length === 0) return;
          const idx = filteredProjects.findIndex(p => p.id === activeModalProject.id);
          const nextIdx = (idx + 1) % filteredProjects.length;
          setActiveModalProject(filteredProjects[nextIdx]);
        }}
      />
    </motion.div>
  );
}
