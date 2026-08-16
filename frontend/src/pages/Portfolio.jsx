import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../utils/constants';
import { Eye, Film, Layout, Volume2, Database, RefreshCw, Sparkles } from 'lucide-react';
import api from '../services/api';
import SkillsSection from '../components/sections/SkillsSection';
import CaseStudyHighlight from '../components/sections/CaseStudyHighlight';
import CareerTimeline from '../components/sections/CareerTimeline';
import AvailabilityCTA from '../components/sections/AvailabilityCTA';
import heroBg from '../assets/images/hero-bg.png';
import alazarImg from '../assets/images/alazar.png';

export const Portfolio = ({ onOpenProjectModal, setCurrentPage }) => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => 
    filter === 'all' ? true : project.category === filter
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAFAF9] pt-32 sm:pt-40 pb-0 mesh-bg relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Motion Flow Background Image Layer 1: hero-bg.png */}
      <motion.div 
        animate={{ 
          scale: [1, 1.06, 1],
          x: ['0%', '-2%', '0%'],
          y: ['0%', '-1.5%', '0%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 right-0 h-[650px] z-0 pointer-events-none opacity-20 mix-blend-multiply"
      >
        <img src={heroBg} alt="Background Flow" className="w-full h-full object-cover filter blur-[1px]" />
      </motion.div>

      {/* Motion Flow Layer 2: Floating alazar.png */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-0 w-[450px] md:w-[600px] opacity-15 pointer-events-none z-0 mix-blend-luminosity filter blur-[0.5px]"
      >
        <img src={alazarImg} alt="Alazar Visual" className="w-full h-auto object-contain" />
      </motion.div>

      
      {/* Header Banner */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 mb-14 sm:mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[#C59A9F]/40 rounded-full text-xs text-[#6B1D2F] font-extrabold mb-6 shadow-sm shimmer-border">
          <Sparkles size={13} className="animate-pulse" />
          <span>Curated Work Gallery</span>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#1C1917] mb-6 tracking-tight" 
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
          An archive of commercial video cuts, color-graded masters, brand identities, and 3D visual concepts.
        </motion.p>

        {/* Category Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center bg-white p-2 rounded-full border border-[#E5D9DB] shadow-sm max-w-full gap-1"
          >
            {[
              { id: 'all', label: `All (${projects.length})`, icon: null },
              { id: 'video', label: `Video (${projects.filter(p => p.category === 'video').length})`, icon: <Film size={13} /> },
              { id: 'design', label: `Design (${projects.filter(p => p.category === 'design').length})`, icon: <Layout size={13} /> }
            ].map((cat) => {
              const isActive = filter === cat.id;
              return (
                <button 
                  key={cat.id}
                  onClick={() => setFilter(cat.id)} 
                  className={`relative px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 ${
                    isActive ? 'text-white' : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activePortfolioFilter"
                      className="absolute inset-0 bg-[#6B1D2F] rounded-full shadow-md shadow-[#6B1D2F]/20 -z-10"
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
            className="p-3 rounded-full bg-white border border-[#E5D9DB] text-[#78716C] hover:text-[#1C1917] hover:border-[#6B1D2F] transition-all shadow-sm"
            title="Sync Latest Works"
          >
            <RefreshCw size={15} className={loading ? "animate-spin text-[#6B1D2F]" : ""} />
          </button>
        </div>
      </div>

      {/* Animated Projects Grid */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl mb-20 sm:mb-28">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="rounded-3xl aspect-[4/5] bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  key={project.id} 
                  onClick={() => onOpenProjectModal(project)}
                  className="group relative cursor-pointer rounded-3xl overflow-hidden bg-white aspect-[4/5] border border-[#C59A9F]/35 hover:border-[#6B1D2F] hover:shadow-2xl hover:shadow-[#6B1D2F]/15 transition-all duration-500 shadow-md"
                >
                  {project.previewVideoUrl ? (
                    <video 
                      src={project.previewVideoUrl} 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <img 
                      src={project.thumbnail} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/90 via-[#1C1917]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  
                  {project.previewVideoUrl && (
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 z-10 border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Reel</span>
                    </div>
                  )}

                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <span className="text-xs uppercase tracking-widest px-3.5 py-1.5 bg-[#6B1D2F] text-white rounded-full font-bold shadow-md flex items-center gap-1.5">
                        {project.category === 'video' && <Film size={12} />}
                        {project.category}
                      </span>

                      <motion.div 
                        whileHover={{ scale: 1.15, rotate: 6 }}
                        className="w-12 h-12 rounded-full bg-white/95 text-[#6B1D2F] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
                      >
                        {project.videoUrl ? <Volume2 size={19} /> : <Eye size={19} />}
                      </motion.div>
                    </div>

                    <div>
                      <h3 className="text-2xl text-white mb-1.5 font-bold tracking-tight group-hover:text-[#F5E8EA] transition-colors" style={{ fontFamily: theme.fonts.heading }}>
                        {project.title}
                      </h3>
                      <p className="text-white/75 text-xs uppercase tracking-widest font-semibold">
                        {project.client} • {project.year || '2025'}
                      </p>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Case Studies & Client ROI Metrics */}
      <CaseStudyHighlight setCurrentPage={setCurrentPage} />

      {/* Availability Hiring Banner */}
      <AvailabilityCTA setCurrentPage={setCurrentPage} />

    </motion.div>
  );
};

export default Portfolio;



