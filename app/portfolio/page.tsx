'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@/utils/constants';
import { Project, ProjectCategory } from '@/types/portfolio';
import Modal from '@/components/common/Modal';
import { Play, Eye, Film, Layout, Database, Plus, RefreshCw } from 'lucide-react';
import api from '@/utils/api';

export default function PortfolioPage() {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dbStatus, setDbStatus] = useState<{ status: string; database: string }>({ status: 'checking', database: 'Checking...' });
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const data = await api.projects.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHealth = async () => {
    const health = await api.health();
    setDbStatus({ status: health.status, database: health.database });
  };

  useEffect(() => {
    fetchProjects();
    fetchHealth();
  }, []);

  const filteredProjects = projects.filter(project => 
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
      className="min-h-screen bg-canvas pt-36 pb-24"
    >
      {/* Header Banner */}
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-burgundy/10 border border-burgundy/20 rounded-full text-xs text-burgundy font-medium mb-4">
          <Database size={13} className="animate-pulse" />
          <span>PERN Stack Powered • Database: {dbStatus.database}</span>
        </div>

        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-widest text-burgundy font-semibold block mb-3"
        >
          Portfolio Archives
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-charcoal mb-6" 
          style={{ fontFamily: theme.fonts.heading }}
        >
          Selected <span className="italic font-light text-burgundy">Works</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate max-w-xl mx-auto font-light text-base mb-8"
        >
          A showcase of cinematic commercials, documentary edits, brand identities, and high-impact design projects stored dynamically in PostgreSQL.
        </motion.p>

        {/* Category Filters & Admin Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex bg-surface p-1.5 rounded-full border border-border shadow-card"
          >
            <button 
              onClick={() => setFilter('all')} 
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === 'all' ? 'bg-burgundy text-white shadow-burgundy-sm' : 'text-slate hover:text-charcoal'
              }`}
            >
              All ({projects.length})
            </button>
            
            <button 
              onClick={() => setFilter('video')} 
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                filter === 'video' ? 'bg-burgundy text-white shadow-burgundy-sm' : 'text-slate hover:text-charcoal'
              }`}
            >
              <Film size={14} /> Video ({projects.filter(p => p.category === 'video').length})
            </button>
            
            <button 
              onClick={() => setFilter('design')} 
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                filter === 'design' ? 'bg-burgundy text-white shadow-burgundy-sm' : 'text-slate hover:text-charcoal'
              }`}
            >
              <Layout size={14} /> Design ({projects.filter(p => p.category === 'design').length})
            </button>
          </motion.div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchProjects}
              title="Refresh from PostgreSQL Database"
              className="p-2.5 rounded-full bg-surface border border-border text-slate hover:text-charcoal hover:border-burgundy transition-all"
            >
              <RefreshCw size={14} className={isLoading ? "animate-spin text-burgundy" : ""} />
            </button>
            <Link
              href="/admin"
              className="px-4 py-2.5 rounded-full bg-burgundy text-white text-xs font-medium uppercase tracking-wider shadow-burgundy-sm hover:bg-burgundy-soft transition-all flex items-center gap-1.5"
            >
              <Plus size={14} /> Manage PERN Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Animated Projects Grid */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="rounded-2xl aspect-[4/5] bg-slate-200 animate-pulse border border-border" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-2xl border border-border">
            <p className="text-slate text-lg mb-4">No projects found in category &quot;{filter}&quot;.</p>
            <button 
              onClick={() => setFilter('all')}
              className="px-6 py-2.5 bg-burgundy text-white rounded-full text-xs uppercase font-semibold tracking-wider"
            >
              Show All Projects
            </button>
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
                  onClick={() => handleOpenProjectModal(project)}
                  data-cursor={project.category === 'video' ? 'play' : 'view'}
                  className="group relative cursor-pointer rounded-2xl overflow-hidden bg-surface aspect-[4/5] border border-border hover:border-burgundy-soft hover:shadow-burgundy-md transition-all duration-500 shadow-card"
                >
                  <Image 
                    src={project.thumbnail} 
                    alt={project.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  {/* Card Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <motion.span 
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="text-xs uppercase tracking-widest px-3 py-1 bg-burgundy text-white rounded-full font-medium shadow-burgundy-sm flex items-center gap-1.5"
                      >
                        {project.category === 'video' && <Film size={12} />}
                        {project.category}
                      </motion.span>

                      <motion.div 
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-full bg-white/95 text-burgundy flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                      >
                        {project.videoUrl ? <Play size={20} className="ml-0.5" /> : <Eye size={20} />}
                      </motion.div>
                    </div>

                    <div>
                      <h3 className="text-2xl text-white mb-1 font-semibold" style={{ fontFamily: theme.fonts.heading }}>
                        {project.title}
                      </h3>
                      <p className="text-white/70 text-xs uppercase tracking-widest">{project.client} • {project.year || '2025'}</p>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={activeModalProject}
      />
    </motion.div>
  );
}
