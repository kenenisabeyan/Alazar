import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Eye } from 'lucide-react';

import HeroSection from '../components/sections/HeroSection';
import ShowreelBanner from '../components/sections/ShowreelBanner';
import AboutSnapshot from '../components/sections/AboutSnapshot';
import ExpertiseSection from '../components/sections/ExpertiseSection';
import ColorGradingShowcase from '../components/sections/ColorGradingShowcase';
import ServiceSplitter from '../components/sections/ServiceSplitter';
import ProjectCalculator from '../components/sections/ProjectCalculator';
import SocialProof from '../components/sections/SocialProof';
import AvailabilityCTA from '../components/sections/AvailabilityCTA';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import { theme, portfolioProjects } from '../constants';
import api from '../api';

import ProjectImage from '../components/common/ProjectImage';
import ProjectCardMedia from '../components/common/ProjectCardMedia';

export default function Home() {
  const navigate = useNavigate();
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Instant rendering: Seed featured projects immediately from cache or constants
  const [featuredProjects, setFeaturedProjects] = useState(() => {
    try {
      const cached = localStorage.getItem('alazar_cached_portfolio');
      if (cached) {
        const parsed = JSON.parse(cached);
        const feat = parsed.filter(p => p.featured);
        if (feat.length > 0) return feat.slice(0, 3);
        if (parsed.length > 0) return parsed.slice(0, 3);
      }
    } catch {}
    const feat = portfolioProjects.filter(p => p.featured);
    return (feat.length ? feat : portfolioProjects).slice(0, 3);
  });
  
  const [isLoading, setIsLoading] = useState(false); // Instant rendering without loading skeletons!

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await api.projects.getAll({ featured: true });
        if (data && data.length) {
          setFeaturedProjects(data.slice(0, 3));
        }
      } catch (err) {
        // Fallback already rendered instantly
      } finally {
        if (window.lenis) window.lenis.resize();
      }
    }
    loadFeatured();
  }, []);

  const handleOpenProjectModal = (project) => {
    setActiveModalProject(project);
    setIsModalOpen(true);
  };

  const handleOpenShowreel = () => {
    handleOpenProjectModal({
      id: 'showreel',
      title: 'Alazar Asdesach: 2025 Showreel',
      category: 'Showreel',
      client: 'Alazar Studio',
      videoUrl: '/assets/sample-showreel.mp4',
      description: 'A compilation of video edits, color grading work, graphic design, and 3D motion graphics.',
      role: 'Director & Lead Editor',
      deliverables: ['Full 2025 Showreel', 'Commercial Edit Cut', 'Color Grade Master'],
      year: '2025',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* 1 ── Hero */}
      <HeroSection onOpenShowreel={handleOpenShowreel} />

      {/* 2 ── Showreel banner */}
      <ShowreelBanner onOpenShowreel={handleOpenShowreel} />

      {/* 3 ── About snapshot */}
      <AboutSnapshot />

      {/* 4 ── Specialist context — Video Editor + Senior Graphic Designer */}
      <ExpertiseSection />

      {/* 5 ── Color grading showcase */}
      <div id="colorgrading">
        <ColorGradingShowcase />
      </div>

      {/* 6 ── Featured projects */}
      <div id="projects">
        <section
          className="py-16 sm:py-28 relative overflow-hidden bg-[#FAFAF9] dark:bg-[#1E0A0D] transition-colors duration-300"
          style={{ fontFamily: theme.fonts.body }}
        >
          {/* Ambient */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6B1D2F]/06 blur-[160px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">
            {/* Section header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 gap-5 sm:gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] dark:text-[#F5F0F1] leading-[1.06] tracking-tight break-words"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  Featured <span className="text-gradient-burgundy font-black">Projects</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  icon={<ArrowRight size={15} />}
                  onClick={() => { navigate('/portfolio'); window.scrollTo(0, 0); }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-none border-2 border-[#6B1D2F] text-[#6B1D2F] dark:border-[#C59A9F] dark:text-[#F5F0F1] font-black text-[11px] uppercase tracking-wider hover:bg-[#6B1D2F] hover:text-white dark:hover:bg-[#8B1E3F] transition-all"
                >
                  View All Projects
                </Button>
              </motion.div>
            </div>

            {/* Project cards */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="rounded-none aspect-[4/5] bg-[#FAFAF9] dark:bg-[#1E0A0D] animate-pulse border border-[#C59A9F]/30" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: idx * 0.12 }}
                    whileHover={{ y: -8 }}
                    onClick={() => handleOpenProjectModal(project)}
                    className="group relative cursor-pointer rounded-none overflow-hidden bg-gradient-to-br from-[#6B1D2F] via-[#521523] to-[#3B0E19] aspect-[4/5] border border-[#C59A9F]/30 hover:border-[#C59A9F]/60 hover:shadow-2xl hover:shadow-[#6B1D2F]/25 transition-all duration-500 shadow-xl"
                  >
                    {/* Media */}
                    <ProjectCardMedia project={project} />

                    {/* Gradient - Fades in on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3B0E19]/95 via-[#6B1D2F]/40 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Live badge - Visible only on hover */}
                    {project.previewVideoUrl && (
                      <div className="absolute top-5 right-5 bg-[#1E0A0D]/85 backdrop-blur-md text-white text-[10px] uppercase font-black px-3.5 py-1.5 rounded-none flex items-center gap-1.5 z-10 border border-white/20 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-400 ease-out pointer-events-none">
                        <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse" />
                        Live Reel
                      </div>
                    )}

                    {/* Content - Fades & slides on hover */}
                    <div className="absolute inset-0 p-7 flex flex-col justify-between z-10 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out pointer-events-none">
                      <div className="flex justify-between items-start -translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                        <span className="text-[10px] uppercase tracking-widest px-3.5 py-1.5 bg-[#6B1D2F] text-white rounded-none font-black shadow-md">
                          {project.category}
                        </span>
                        <div className="w-11 h-11 rounded-none bg-white/95 text-[#6B1D2F] flex items-center justify-center shadow-xl pointer-events-auto">
                          {project.videoUrl
                            ? <Play size={18} className="fill-[#6B1D2F] text-[#6B1D2F] ml-0.5" />
                            : <Eye size={18} />}
                        </div>
                      </div>
                      <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
                        <h3
                          className="text-2xl text-white mb-1.5 font-black tracking-tight group-hover:text-[#FAFAF9] transition-colors"
                          style={{ fontFamily: theme.fonts.heading }}
                        >
                          {project.title}
                        </h3>
                        <p className="text-white/80 text-[11px] uppercase tracking-widest font-bold">{project.client}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* 7 ── Services splitter */}
      <ServiceSplitter />

      {/* 8 ── Rate calculator */}
      <div id="calculator">
        <ProjectCalculator />
      </div>

      {/* 9 ── Testimonials */}
      <div id="testimonials">
        <SocialProof />
      </div>

      {/* 10 ── Availability CTA */}
      <AvailabilityCTA />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={activeModalProject}
      />
    </motion.div>
  );
}
