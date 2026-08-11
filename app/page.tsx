'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroSection from '@/components/sections/HeroSection';
import AboutSnapshot from '@/components/sections/AboutSnapshot';
import ServiceSplitter from '@/components/sections/ServiceSplitter';
import SocialProof from '@/components/sections/SocialProof';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { portfolioProjects, theme } from '@/utils/constants';
import { Project } from '@/types/portfolio';
import { ArrowRight, Play, Eye } from 'lucide-react';

export default function HomePage() {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredProjects = portfolioProjects.slice(0, 3);

  const handleOpenProjectModal = (project: Project) => {
    setActiveModalProject(project);
    setIsModalOpen(true);
  };

  const handleOpenShowreel = () => {
    const showreelProject: Project = {
      id: 'showreel',
      title: 'Alazar Asdesach - 2025 Showreel',
      category: 'Showreel',
      client: 'Alazar Studio',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
      thumbnail: 'https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'A compiled high-octane visual showcase featuring commercial edits, kinetic typography, color grading transformations, and 3D motion graphics.',
      role: 'Director & Lead Editor',
      deliverables: ['Full 2025 Showreel', 'Commercial Edit Cut', 'Color Grade Master'],
      year: '2025'
    };
    setActiveModalProject(showreelProject);
    setIsModalOpen(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection onOpenShowreel={handleOpenShowreel} />
      
      <AboutSnapshot />
      
      <ServiceSplitter />

      {/* Featured Projects Grid */}
      <section className="py-28 bg-[#1E0A0D]">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs uppercase tracking-widest text-[#8B1E3F] font-semibold block mb-2">Curated Works</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#F5F0F1]" style={{ fontFamily: theme.fonts.heading }}>
                Featured <span className="italic font-light text-[#A89597]">Reels</span>
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Button 
                variant="outline" 
                icon={<ArrowRight size={16} />}
                href="/portfolio"
                data-cursor="pointer"
              >
                View Full Gallery
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onClick={() => handleOpenProjectModal(project)}
                data-cursor={project.category === 'video' ? 'play' : 'view'}
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-[#2E1216] aspect-[4/5] border border-white/5 hover:border-[#8B1E3F]/50 transition-all duration-500 shadow-xl"
              >
                <Image 
                  src={project.thumbnail} 
                  alt={project.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-108 transition-transform duration-700 ease-out" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E0A0D] via-[#1E0A0D]/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs uppercase tracking-widest px-3 py-1 bg-[#8B1E3F]/80 text-white rounded-full font-medium z-10">
                      {project.category}
                    </span>

                    <div className="w-10 h-10 rounded-full bg-[#1E0A0D]/80 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      {project.videoUrl ? <Play size={16} /> : <Eye size={16} />}
                    </div>
                  </div>

                  <div className="z-10">
                    <h3 className="text-2xl text-[#F5F0F1] mb-1 font-semibold" style={{ fontFamily: theme.fonts.heading }}>
                      {project.title}
                    </h3>
                    <p className="text-[#A89597] text-xs uppercase tracking-widest">{project.client}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <SocialProof />

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={activeModalProject}
      />
    </motion.div>
  );
}
