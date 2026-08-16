import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import ShowreelBanner from '../components/sections/ShowreelBanner';
import AboutSnapshot from '../components/sections/AboutSnapshot';
import ColorGradingShowcase from '../components/sections/ColorGradingShowcase';
import ServiceSplitter from '../components/sections/ServiceSplitter';
import ProjectCalculator from '../components/sections/ProjectCalculator';
import SocialProof from '../components/sections/SocialProof';
import AvailabilityCTA from '../components/sections/AvailabilityCTA';
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

      {/* 2. 2025 Widescreen Cinema Showreel Banner */}
      <ShowreelBanner onOpenShowreel={onOpenShowreel} />

      {/* 3. About Director Overview */}
      <AboutSnapshot setCurrentPage={setCurrentPage} />
      
      {/* 4. Interactive RAW vs. Graded Master Color Slider */}
      <ColorGradingShowcase />

      {/* 5. Featured Projects Grid */}
      <section className="py-28 bg-[#FAFAF9] relative" style={{ fontFamily: theme.fonts.body }}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs uppercase tracking-widest text-[#6B1D2F] font-bold block mb-2">Selected Works</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#1C1917]" style={{ fontFamily: theme.fonts.heading }}>
                Featured <span className="italic font-light text-gradient-burgundy">Projects</span>
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
                className="rounded-full px-6 py-3 border-[#6B1D2F] text-[#6B1D2F] font-bold text-xs uppercase tracking-wider hover:bg-[#F5E8EA]"
              >
                View All Projects
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.15 }}
                whileHover={{ y: -8 }}
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

                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-xs uppercase tracking-widest px-3.5 py-1.5 bg-[#6B1D2F] text-white rounded-full font-bold shadow-md">
                      {project.category}
                    </span>

                    <div className="w-11 h-11 rounded-full bg-white/95 text-[#6B1D2F] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                      {project.videoUrl ? <Play size={18} className="fill-[#6B1D2F] text-[#6B1D2F]" /> : <Eye size={18} />}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl text-white mb-1.5 font-bold tracking-tight group-hover:text-[#F5E8EA] transition-colors" style={{ fontFamily: theme.fonts.heading }}>
                      {project.title}
                    </h3>
                    <p className="text-white/75 text-xs uppercase tracking-widest font-semibold">{project.client}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Service Disciplines Splitter */}
      <ServiceSplitter setCurrentPage={setCurrentPage} />

      {/* 7. Interactive Scope & Price Calculator */}
      <ProjectCalculator setCurrentPage={setCurrentPage} />

      {/* 8. Testimonials & Client Reviews */}
      <SocialProof />

      {/* 9. Live Availability & Conversion Banner */}
      <AvailabilityCTA setCurrentPage={setCurrentPage} />
    </motion.div>
  );
};

export default Home;


