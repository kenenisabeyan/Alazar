import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, PenTool, Camera, Layers } from 'lucide-react';

import Button from '../components/common/Button';
import SkillsSection from '../components/sections/SkillsSection';
import CareerTimeline from '../components/sections/CareerTimeline';
import GearSection from '../components/sections/GearSection';
import BehindTheScenes from '../components/sections/BehindTheScenes';
import ExpertiseSection from '../components/sections/ExpertiseSection';
import AvailabilityCTA from '../components/sections/AvailabilityCTA';
import { theme } from '../constants';
import alazarImg from '../assets/images/alazar.png';
import heroBg from '../assets/images/hero-bg.png';
import api from '../api';

const defaultPhilosophyCards = [
  { icon: Film, title: 'Paced Editing', desc: 'Cutting footage to match musical cadence, emotional beat, and narrative flow.' },
  { icon: Layers, title: 'Color Science', desc: 'Transforming flat camera log profiles into rich, cinematic color gamuts.' },
  { icon: Camera, title: 'Camera & Lens', desc: 'Capturing ultra-sharp 8K raw frames with prime lenses and controlled lighting.' },
  { icon: PenTool, title: 'Brand Identity', desc: 'Building cohesive poster art, motion graphics, and graphic design system.' },
];

const iconMap = {
  Film, Layers, Camera, PenTool
};

export default function About() {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.about.getPublicData();
        if (data) {
          setAboutData(data);
        }
      } catch (err) {
        console.warn('Using fallback local state for About page');
      }
    }
    loadData();
  }, []);

  const profile = aboutData?.profile || {
    fullName: 'Alazar Asdesach',
    professionalTitle: 'Video Director & Senior Graphic Designer',
    headline: 'Director & Visual Artist.',
    shortDescription: 'With over 8 years of experience in video production, cinematic color science, and senior-level brand design, crafting visual assets that communicate identity with precision.',
    profileImage: alazarImg,
  };

  const capabilities = aboutData?.capabilities?.length ? aboutData.capabilities : defaultPhilosophyCards;
  const sections = aboutData?.sections || [];
  const isSectionVisible = (key) => {
    if (!sections.length) return true;
    const sec = sections.find(s => s.sectionKey === key);
    return sec ? sec.isVisible : true;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAFAF9] mesh-bg pt-32 sm:pt-40 pb-0 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Motion Flow Background Image Layer 1: hero-bg.png */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          x: ['0%', '-2%', '0%'],
          y: ['0%', '-1.5%', '0%'],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 z-0 pointer-events-none opacity-25 mix-blend-multiply"
      >
        <img
          src={heroBg}
          alt="Hero Flow Texture"
          className="w-full h-full object-cover object-center filter blur-[1px]"
        />
      </motion.div>

      {/* Motion Flow Layer 2: Floating alazar.png visual element */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 1.5, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-10 right-0 sm:right-10 md:right-20 w-[260px] xs:w-[340px] sm:w-[500px] md:w-[650px] opacity-10 sm:opacity-20 md:opacity-25 pointer-events-none z-0 mix-blend-multiply filter blur-[0.5px]"
      >
        <img
          src={profile.profileImage || alazarImg}
          alt="Alazar Motion Flow"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-[#6B1D2F]/18 via-[#8B1E3F]/12 to-[#C59A9F]/20 blur-[180px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-[#C59A9F]/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">

        {/* ── Hero header ──────────────────────────────────────────────────── */}
        {isSectionVisible('ABOUT_HERO') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 sm:mb-24">

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <h1
                className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.08] tracking-tight break-words"
                style={{ fontFamily: theme.fonts.heading }}
              >
                {profile.fullName || 'Alazar Asdesach'}.<br />
                <span className="text-[#6B1D2F] font-black">{profile.headline || 'Director & Visual Artist.'}</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-[#1C1917] font-medium leading-relaxed max-w-lg bg-white/85 backdrop-blur-md px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border border-[#C59A9F]/40 shadow-sm inline-block max-w-full break-words">
                {profile.shortDescription}
              </p>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {[
                  { icon: Film, title: 'Video Production', sub: 'DaVinci & RED 8K' },
                  { icon: PenTool, title: 'Brand & Graphic', sub: 'Identity Systems' },
                ].map(({ icon: Icon, title, sub }) => (
                  <div key={title} className="flex flex-col items-center justify-center text-center p-3 sm:p-3.5 rounded-2xl bg-white border border-[#C59A9F]/30 shadow-sm">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FAFAF9] text-[#6B1D2F] flex items-center justify-center flex-shrink-0 mb-1.5 shadow-sm">
                      <Icon size={16} />
                    </div>
                    <div className="w-full">
                      <p className="text-xs font-black text-[#1C1917] leading-tight mb-0.5 text-center break-words">{title}</p>
                      <p className="text-[10px] text-[#292524] font-bold uppercase tracking-wider text-center">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-row gap-2.5 sm:gap-3 pt-2 w-full max-w-md">
                <Button
                  variant="primary"
                  className="flex-1 min-w-0 px-3 sm:px-9 py-3.5 sm:py-4 rounded-full font-black uppercase text-[10.5px] sm:text-xs tracking-wider sm:tracking-widest shadow-xl"
                  onClick={() => { navigate('/portfolio'); window.scrollTo(0, 0); }}
                >
                  View Portfolio
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1 min-w-0 px-3 sm:px-9 py-3.5 sm:py-4 rounded-full font-black uppercase text-[10.5px] sm:text-xs tracking-wider sm:tracking-widest"
                  onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
                >
                  Get In Touch
                </Button>
              </div>
            </motion.div>

            {/* Photo stack */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative flex items-center justify-center py-8"
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[460px] h-[460px] bg-gradient-to-tr from-[#6B1D2F]/25 via-[#8B1E3F]/12 to-[#C59A9F]/20 blur-[120px] rounded-full" />
              </div>

              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] group cursor-pointer">
                {/* Back left */}
                <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border-2 border-[#C59A9F]/40 shadow-xl
                  -rotate-6 -translate-x-5 -translate-y-3 scale-95 opacity-75
                  group-hover:-rotate-12 group-hover:-translate-x-12 group-hover:-translate-y-6
                  transition-all duration-500 ease-out z-0
                  bg-gradient-to-br from-[#6B1D2F] via-[#2E1216] to-[#1C1917]">
                  <img src={profile.profileImage || alazarImg} alt="" className="w-full h-full object-cover object-top mix-blend-luminosity filter contrast-125 brightness-90" />
                  <div className="absolute inset-0 bg-[#6B1D2F]/30 mix-blend-multiply" />
                </div>
                {/* Back right */}
                <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border-2 border-[#C59A9F]/50 shadow-xl
                  rotate-6 translate-x-5 -translate-y-1 scale-95 opacity-80
                  group-hover:rotate-12 group-hover:translate-x-12 group-hover:-translate-y-4
                  transition-all duration-500 ease-out z-10
                  bg-gradient-to-br from-[#8B1E3F] via-[#1C1917] to-[#6B1D2F]">
                  <img src={profile.profileImage || alazarImg} alt="" className="w-full h-full object-cover object-top filter saturate-150 brightness-95" />
                  <div className="absolute inset-0 bg-[#8B1E3F]/20 mix-blend-color-burn" />
                </div>
                {/* Front main */}
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/80 shadow-2xl shadow-[#6B1D2F]/25 group-hover:scale-[1.03] transition-all duration-500 ease-out z-20">
                  <img
                    src={profile.profileImage || alazarImg}
                    alt={profile.fullName || "Alazar Asdesach"}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/50 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ── Core philosophy cards ─────────────────────────────────────── */}
        {isSectionVisible('CREATIVE_CAPABILITIES') && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 mb-20 sm:mb-28">
            {capabilities.map((item, idx) => {
              const IconComp = iconMap[item.iconName] || item.icon || Film;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.09 }}
                  whileHover={{ y: -6 }}
                  className="glass-card-luxury p-3.5 sm:p-6 rounded-2xl sm:rounded-[2rem] flex flex-col items-center justify-center text-center"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white flex items-center justify-center flex-shrink-0 shadow-md sm:shadow-lg shadow-[#6B1D2F]/20 mb-2 sm:mb-3">
                    <IconComp size={20} className="sm:hidden" />
                    <IconComp size={24} className="hidden sm:inline" />
                  </div>
                  <div className="w-full">
                    <h3
                      className="text-xs sm:text-lg font-black text-[#1C1917] dark:text-[#F5F0F1] mb-1 leading-snug text-center break-words"
                      style={{ fontFamily: theme.fonts.heading }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-[#292524] dark:text-[#A89597] font-normal leading-relaxed text-center line-clamp-3 sm:line-clamp-none">
                      {item.description || item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Dynamic Sub-Sections ────────────────────────────────────────── */}
      <div id="story" />
      {isSectionVisible('CREATIVE_DISCIPLINE') && <ExpertiseSection data={aboutData?.disciplines} statistics={aboutData?.statistics} />}
      {isSectionVisible('TECHNICAL_EXPERTISE') && (
        <div id="skills">
          <SkillsSection data={aboutData?.skillCategories} />
        </div>
      )}
      {isSectionVisible('WORK_HISTORY') && (
        <div id="timeline">
          <CareerTimeline data={aboutData?.workExperience} awards={aboutData?.awards} />
        </div>
      )}
      {isSectionVisible('PRODUCTION_GEAR') && (
        <div id="gear">
          <GearSection data={aboutData?.gearCategories} />
        </div>
      )}
      {isSectionVisible('BEHIND_THE_SCENES') && (
        <div id="bts">
          <BehindTheScenes data={aboutData?.behindTheScenes} />
        </div>
      )}
      {isSectionVisible('AVAILABILITY_CTA') && <AvailabilityCTA cta={aboutData?.cta} contact={aboutData?.contact} />}
    </motion.div>
  );
}
