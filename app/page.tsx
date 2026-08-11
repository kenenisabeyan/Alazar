'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import HeroSection from '@/components/sections/HeroSection';
import ClientLogos from '@/components/sections/ClientLogos';
import AboutSnapshot from '@/components/sections/AboutSnapshot';
import ColorGradingShowcase from '@/components/sections/ColorGradingShowcase';
import ServiceSplitter from '@/components/sections/ServiceSplitter';
import GearSection from '@/components/sections/GearSection';
import BehindTheScenes from '@/components/sections/BehindTheScenes';
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
      {/* 1. Hero Section */}
      <HeroSection onOpenShowreel={handleOpenShowreel} />
      
      {/* 2. Client Brands & Awards Bar */}
      <ClientLogos />

      {/* 3. About Director Overview */}
      <AboutSnapshot />

      {/* 4. Interactive RAW vs. Graded Master Color Slider */}
      <ColorGradingShowcase />
      
      {/* 5. Featured Projects Grid */}
      <section className="py-28 bg-canvas">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs uppercase tracking-widest text-burgundy font-semibold block mb-2">Curated Works</span>
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal" style={{ fontFamily: theme.fonts.heading }}>
                Featured <span className="italic font-light text-burgundy">Reels</span>
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
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-surface aspect-[4/5] border border-border hover:border-burgundy-soft hover:shadow-burgundy-md transition-all duration-500 shadow-card"
              >
                <Image 
                  src={project.thumbnail} 
                  alt={project.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-75 group-hover:opacity-85 transition-opacity"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs uppercase tracking-widest px-3 py-1 bg-burgundy text-white rounded-full font-medium z-10">
                      {project.category}
                    </span>

                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-burgundy opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm">
                      {project.videoUrl ? <Play size={16} /> : <Eye size={16} />}
                    </div>
                  </div>

                  <div className="z-10">
                    <h3 className="text-2xl text-white mb-1 font-semibold" style={{ fontFamily: theme.fonts.heading }}>
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-xs uppercase tracking-widest">{project.client}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Service Splitter */}
      <ServiceSplitter />

      {/* 7. Cinema Gear Systems & Editing Specs */}
      <GearSection />

      {/* 8. Behind The Scenes On Set */}
      <BehindTheScenes />

      {/* 9. Testimonials & Client Feedback */}
      <SocialProof />

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={activeModalProject}
      />
    </motion.div>
  );
}
