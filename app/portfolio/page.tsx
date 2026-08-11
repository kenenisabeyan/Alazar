'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioProjects, theme } from '@/utils/constants';
import { Project, ProjectCategory } from '@/types/portfolio';
import Modal from '@/components/common/Modal';
import { Play, Eye, Film, Layout } from 'lucide-react';

export default function PortfolioPage() {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = portfolioProjects.filter(project => 
    filter === 'all' ? true : project.category === filter
  );

  const handleOpenProjectModal = (project: Project) => {
    setActiveModalProject(project);
    setIsModalOpen(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#1E0A0D] pt-36 pb-24"
    >
      {/* Header Banner */}
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-widest text-[#8B1E3F] font-semibold block mb-3"
        >
          Portfolio Archives
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-[#F5F0F1] mb-6" 
          style={{ fontFamily: theme.fonts.heading }}
        >
          Selected <span className="italic font-light text-[#A89597]">Works</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#A89597] max-w-xl mx-auto font-light text-base mb-10"
        >
          A showcase of cinematic commercials, documentary edits, brand identities, and high-impact design projects.
        </motion.p>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex bg-[#2E1216] p-1.5 rounded-full border border-white/10 shadow-lg"
        >
          <button 
            onClick={() => setFilter('all')} 
            className={`px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              filter === 'all' ? 'bg-[#8B1E3F] text-white shadow-md' : 'text-[#A89597] hover:text-white'
            }`}
          >
            All ({portfolioProjects.length})
          </button>
          
          <button 
            onClick={() => setFilter('video')} 
            className={`px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              filter === 'video' ? 'bg-[#8B1E3F] text-white shadow-md' : 'text-[#A89597] hover:text-white'
            }`}
          >
            <Film size={14} /> Video ({portfolioProjects.filter(p => p.category === 'video').length})
          </button>
          
          <button 
            onClick={() => setFilter('design')} 
            className={`px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              filter === 'design' ? 'bg-[#8B1E3F] text-white shadow-md' : 'text-[#A89597] hover:text-white'
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
                onClick={() => handleOpenProjectModal(project)}
                data-cursor={project.category === 'video' ? 'play' : 'view'}
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-[#2E1216] aspect-[4/5] border border-white/5 hover:border-[#8B1E3F]/60 transition-all duration-500 shadow-xl"
              >
                <Image 
                  src={project.thumbnail} 
                  alt={project.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-108 transition-transform duration-700 ease-out" 
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E0A0D] via-[#1E0A0D]/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>
                
                {/* Card Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  
                  <div className="flex justify-between items-start z-10">
                    <span className="text-xs uppercase tracking-widest px-3 py-1 bg-[#8B1E3F]/80 text-white rounded-full font-medium">
                      {project.category}
                    </span>

                    <div className="w-10 h-10 rounded-full bg-[#1E0A0D]/80 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.videoUrl ? <Play size={16} /> : <Eye size={16} />}
                    </div>
                  </div>

                  <div className="z-10">
                    <h3 className="text-2xl text-[#F5F0F1] mb-1 font-semibold" style={{ fontFamily: theme.fonts.heading }}>
                      {project.title}
                    </h3>
                    <p className="text-[#A89597] text-xs uppercase tracking-widest">{project.client} • {project.year || '2025'}</p>
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={activeModalProject}
      />
    </motion.div>
  );
}
