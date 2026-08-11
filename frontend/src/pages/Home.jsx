import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import ClientLogos from '../components/sections/ClientLogos';
import ShowreelBanner from '../components/sections/ShowreelBanner';
import AboutSnapshot from '../components/sections/AboutSnapshot';
import ColorGradingShowcase from '../components/sections/ColorGradingShowcase';
import ServiceSplitter from '../components/sections/ServiceSplitter';
import CaseStudyHighlight from '../components/sections/CaseStudyHighlight';
import ProjectCalculator from '../components/sections/ProjectCalculator';
import WorkflowVault from '../components/sections/WorkflowVault';
import GearSection from '../components/sections/GearSection';
import BehindTheScenes from '../components/sections/BehindTheScenes';
import SocialProof from '../components/sections/SocialProof';
import { portfolioProjects, theme } from '../utils/constants';
import Button from '../components/common/Button';
import { ArrowRight, Play, Eye } from 'lucide-react';

export const Home = ({ setCurrentPage, onOpenProjectModal, onOpenShowreel }) => {
  const featuredProjects = portfolioProjects.slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 1. Hero Section */}
      <HeroSection setCurrentPage={setCurrentPage} onOpenShowreel={onOpenShowreel} />
      
      {/* 2. Client Brands & Awards Bar */}
      <ClientLogos />

      {/* 3. 2025 Widescreen Cinema Showreel Banner with Interactive Audio Toggle */}
      <ShowreelBanner onOpenShowreel={onOpenShowreel} />

      {/* 4. About Director Overview */}
      <AboutSnapshot setCurrentPage={setCurrentPage} />
      
      {/* 5. Interactive RAW vs. Graded Master Color Slider */}
      <ColorGradingShowcase />

      {/* 6. Featured Projects Grid */}
      <section className="py-28 bg-[#FAFAF9]" style={{ fontFamily: theme.fonts.body }}>
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold block mb-2">Curated Works</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1C1917]" style={{ fontFamily: theme.fonts.heading }}>
                Featured <span className="italic font-light text-[#6B1D2F]">Reels</span>
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
                onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}
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
                onClick={() => onOpenProjectModal(project)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-white aspect-[4/5] border border-[#E5D9DB] hover:border-[#C59A9F] hover:shadow-lg transition-all duration-500 shadow-sm"
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
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/80 via-[#1C1917]/20 to-transparent opacity-75 group-hover:opacity-85 transition-opacity"></div>
                
                {project.previewVideoUrl && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 z-10 border border-white/10 opacity-75 group-hover:opacity-100 transition-opacity">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Live Preview</span>
                  </div>
                )}

                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-xs uppercase tracking-widest px-3 py-1 bg-[#6B1D2F] text-white rounded-full font-medium">
                      {project.category}
                    </span>

                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-[#6B1D2F] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                      {project.videoUrl ? <Play size={16} /> : <Eye size={16} />}
                    </div>
                  </div>

                  <div>
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

      {/* 7. Case Studies & Client ROI Metrics */}
      <CaseStudyHighlight setCurrentPage={setCurrentPage} />

      {/* 8. Service Splitter */}
      <ServiceSplitter setCurrentPage={setCurrentPage} />

      {/* 9. Interactive Project & Budget Calculator */}
      <ProjectCalculator setCurrentPage={setCurrentPage} />

      {/* 10. Frictionless Client Collaboration Process */}
      <WorkflowVault />

      {/* 11. Cinema Gear & Editing Rig Specs */}
      <GearSection />

      {/* 12. Behind The Scenes On Set */}
      <BehindTheScenes />

      {/* 13. Testimonials & Client Reviews */}
      <SocialProof />
    </motion.div>
  );
};

export default Home;
