'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import HeroSection from '@/components/sections/HeroSection';
import ClientLogos from '@/components/sections/ClientLogos';
import ShowreelBanner from '@/components/sections/ShowreelBanner';
import AboutSnapshot from '@/components/sections/AboutSnapshot';
import ColorGradingShowcase from '@/components/sections/ColorGradingShowcase';
import ServiceSplitter from '@/components/sections/ServiceSplitter';
import CaseStudyHighlight from '@/components/sections/CaseStudyHighlight';
import ProjectCalculator from '@/components/sections/ProjectCalculator';
import WorkflowVault from '@/components/sections/WorkflowVault';
import GearSection from '@/components/sections/GearSection';
import BehindTheScenes from '@/components/sections/BehindTheScenes';
import SocialProof from '@/components/sections/SocialProof';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { theme } from '@/utils/constants';
import { Project } from '@/types/portfolio';
import { ArrowRight, Play, Eye, Database } from 'lucide-react';
import api from '@/utils/api';

export default function HomePage() {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadFeatured() {
      setIsLoading(true);
      try {
        const data = await api.projects.getAll({ featured: true });
        setFeaturedProjects(data.slice(0, 3));
      } catch (err) {
        console.error('Error fetching featured projects:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadFeatured();
  }, []);

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
      videoUrl: '/assets/sample-showreel.mp4',
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

      {/* 3. Widescreen Directorial Showreel Banner */}
      <ShowreelBanner onOpenShowreel={handleOpenShowreel} />

      {/* 4. About Director Overview */}
      <AboutSnapshot />

      {/* 5. Interactive RAW vs. Graded Master Color Slider */}
      <ColorGradingShowcase />
      
      {/* 6. Featured Projects Grid (Powered by PERN Backend) */}
      <section className="py-28 bg-canvas">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-burgundy font-semibold mb-2">
                <Database size={13} /> PERN Featured Works
              </div>
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

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="rounded-2xl aspect-[4/5] bg-slate-200 animate-pulse border border-border" />
              ))}
            </div>
          ) : (
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
                    <Image 
                      src={project.thumbnail} 
                      alt={project.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-75 group-hover:opacity-85 transition-opacity"></div>
                  
                  {project.previewVideoUrl && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 z-10 border border-white/10 opacity-75 group-hover:opacity-100 transition-opacity">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Live Preview</span>
                    </div>
                  )}

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
          )}

        </div>
      </section>

      {/* 7. Case Studies & Client Performance ROI */}
      <CaseStudyHighlight />

      {/* 8. Service Splitter */}
      <ServiceSplitter />

      {/* 9. Interactive Package Rate Calculator */}
      <ProjectCalculator />

      {/* 10. Seamless Workflow Vault */}
      <WorkflowVault />

      {/* 11. Cinema Gear Systems & Editing Specs */}
      <GearSection />

      {/* 12. Behind The Scenes On Set */}
      <BehindTheScenes />

      {/* 13. Testimonials & Client Feedback */}
      <SocialProof />

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={activeModalProject}
      />
    </motion.div>
  );
}
