import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioProjects, theme } from '../utils/constants';
import { Play, Eye, Film, Layout } from 'lucide-react';

export const Portfolio = ({ onOpenProjectModal }) => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = portfolioProjects.filter(project => 
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
          A showcase of cinematic commercials, documentary edits, brand identities, and high-impact design projects.
        </motion.p>

        {/* Category Filters */}
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
            All ({portfolioProjects.length})
          </button>
          
          <button 
            onClick={() => setFilter('video')} 
            className={`px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              filter === 'video' ? 'bg-[#6B1D2F] text-white shadow-sm' : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <Film size={14} /> Video ({portfolioProjects.filter(p => p.category === 'video').length})
          </button>
          
          <button 
            onClick={() => setFilter('design')} 
            className={`px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              filter === 'design' ? 'bg-[#6B1D2F] text-white shadow-sm' : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <Layout size={14} /> Design ({portfolioProjects.filter(p => p.category === 'design').length})
          </button>
        </motion.div>
      </div>

      {/* Animated Projects Grid */}
      <div className="container mx-auto px-6 md:px-12">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                key={project.id} 
                onClick={() => onOpenProjectModal(project)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-white aspect-[4/5] border border-[#E5D9DB] hover:border-[#C59A9F] hover:shadow-lg transition-all duration-500 shadow-sm"
              >
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                
                {/* Dark Gradient Overlay over Image for High-Contrast Text Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/85 via-[#1C1917]/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                {/* Card Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-xs uppercase tracking-widest px-3 py-1 bg-[#6B1D2F] text-white rounded-full font-medium shadow-sm">
                      {project.category}
                    </span>

                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-[#6B1D2F] opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                      {project.videoUrl ? <Play size={16} /> : <Eye size={16} />}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl text-white mb-1 font-bold tracking-wide" style={{ fontFamily: theme.fonts.heading }}>
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-xs uppercase tracking-widest">{project.client} • {project.year || '2025'}</p>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default Portfolio;
