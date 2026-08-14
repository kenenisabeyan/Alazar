import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../utils/constants';
import { Eye, Film, Layout, Volume2, Database, RefreshCw } from 'lucide-react';
import api from '../services/api';

export const Portfolio = ({ onOpenProjectModal }) => {
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
      className="min-h-screen bg-[#FAFAF9] pt-36 pb-24"
      style={{ fontFamily: theme.fonts.body }}
    >
      
      {/* Header Banner */}
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6B1D2F]/10 border border-[#6B1D2F]/20 rounded-full text-xs text-[#6B1D2F] font-medium mb-4">
          <Database size={13} className="animate-pulse" />
          <span>PERN Stack Powered</span>
        </div>

        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold block mb-3"
        >
          Portfolio Archives
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-[#1C1917] mb-6" 
          style={{ fontFamily: theme.fonts.heading }}
        >
          Selected <span className="italic font-light text-[#6B1D2F]">Works</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#78716C] max-w-xl mx-auto font-light text-base mb-10"
        >
          A showcase of cinematic commercials, documentary edits, brand identities, and high-impact design projects stored dynamically in PostgreSQL.
        </motion.p>

        {/* Category Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex bg-white p-1.5 rounded-full border border-[#E5D9DB] shadow-sm"
          >
            <button 
              onClick={() => setFilter('all')} 
              className={`px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === 'all' ? 'bg-[#6B1D2F] text-white shadow-sm' : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              All ({projects.length})
            </button>
            
            <button 
              onClick={() => setFilter('video')} 
              className={`px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                filter === 'video' ? 'bg-[#6B1D2F] text-white shadow-sm' : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <Film size={14} /> Video ({projects.filter(p => p.category === 'video').length})
            </button>
            
            <button 
              onClick={() => setFilter('design')} 
              className={`px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                filter === 'design' ? 'bg-[#6B1D2F] text-white shadow-sm' : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <Layout size={14} /> Design ({projects.filter(p => p.category === 'design').length})
            </button>
          </motion.div>

          <button
            onClick={fetchProjects}
            className="p-2.5 rounded-full bg-white border border-[#E5D9DB] text-[#78716C] hover:text-[#1C1917] transition-all"
            title="Refresh from Express & PostgreSQL API"
          >
            <RefreshCw size={14} className={loading ? "animate-spin text-[#6B1D2F]" : ""} />
          </button>
        </div>
      </div>

      {/* Animated Projects Grid */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="rounded-2xl aspect-[4/5] bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  key={project.id} 
                  onClick={() => onOpenProjectModal(project)}
                  className="group relative cursor-pointer rounded-2xl overflow-hidden bg-white aspect-[4/5] border border-[#E5D9DB] hover:border-[#C59A9F] hover:shadow-xl transition-all duration-500 shadow-sm"
                >
                  {project.previewVideoUrl ? (
                    <video 
                      src={project.previewVideoUrl} 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <img 
                      src={project.thumbnail} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-108 transition-transform duration-700 ease-out" 
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/85 via-[#1C1917]/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  {project.previewVideoUrl && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 z-10 border border-white/10 opacity-75 group-hover:opacity-100 transition-opacity">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Live Preview</span>
                    </div>
                  )}

                  <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <motion.span 
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="text-xs uppercase tracking-widest px-3 py-1 bg-[#6B1D2F] text-white rounded-full font-medium shadow-sm flex items-center gap-1.5"
                      >
                        {project.category === 'video' && <Film size={12} />}
                        {project.category}
                      </motion.span>

                      <motion.div 
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-full bg-white/95 text-[#6B1D2F] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                      >
                        {project.videoUrl ? <Volume2 size={20} /> : <Eye size={20} />}
                      </motion.div>
                    </div>

                    <div className="transform group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl text-white mb-1 font-bold tracking-wide group-hover:text-[#F5E8EA] transition-colors" style={{ fontFamily: theme.fonts.heading }}>
                        {project.title}
                      </h3>
                      <p className="text-white/70 text-xs uppercase tracking-widest">
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

    </motion.div>
  );
};

export default Portfolio;
