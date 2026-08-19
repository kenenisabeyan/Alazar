import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, PenTool, Sparkles, Quote, ArrowRight, Layers, CheckCircle2, Award } from 'lucide-react';
import Button from '../common/Button';
import { theme } from '../../constants';
import alazarImg from '../../assets/images/alazar.png';

export const AboutSnapshot = () => {
  const navigate = useNavigate();
  return (
    <section className="py-28 sm:py-36 bg-[#FAFAF9] relative overflow-hidden mesh-bg" style={{ fontFamily: theme.fonts.body }}>
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-[#6B1D2F]/12 via-[#8B2440]/08 to-[#C59A9F]/15 blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Bio & Core Services */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Section Header Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#C59A9F]/50 text-xs tracking-widest text-[#6B1D2F] uppercase font-black shadow-sm shimmer-border">
              <Sparkles size={14} className="text-[#6B1D2F] animate-pulse" />
              <span>About Alazar Asdesach</span>
            </div>

            {/* Headline */}
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] tracking-tight leading-[1.1]"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Expert Video Director & <span className="italic font-light text-gradient-burgundy">Graphic Designer</span>
            </h2>

            {/* Paragraph Copy */}
            <p className="text-base sm:text-lg text-[#1C1917] font-medium leading-relaxed">
              I combine high-octane video editing, cinematic color science, and striking graphic design systems for global brands. With over 8 years of post-production mastery, I bring visual precision and storytelling impact to every cut.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="glass-card-luxury p-5 rounded-2xl border border-[#C59A9F]/40 flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center mb-3 shadow-sm font-black">
                  <Film size={20} />
                </div>
                <h4 className="text-base font-black text-[#1C1917] mb-1" style={{ fontFamily: theme.fonts.heading }}>
                  Video Post-Production
                </h4>
                <p className="text-xs text-[#78716C] font-semibold leading-relaxed">
                  Commercial reels, music sync, 8K color grading & sound FX.
                </p>
              </div>

              <div className="glass-card-luxury p-5 rounded-2xl border border-[#C59A9F]/40 flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center mb-3 shadow-sm font-black">
                  <PenTool size={20} />
                </div>
                <h4 className="text-base font-black text-[#1C1917] mb-1" style={{ fontFamily: theme.fonts.heading }}>
                  Graphic & Motion Systems
                </h4>
                <p className="text-xs text-[#78716C] font-semibold leading-relaxed">
                  Brand strategy, key art posters, typography & 3D graphics.
                </p>
              </div>
            </div>

            {/* Director's Creed Quote Pill */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#C59A9F]/40 shadow-sm flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#6B1D2F] text-white flex items-center justify-center flex-shrink-0">
                <Quote size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#6B1D2F] font-black">Director's Creed</p>
                <p className="text-xs sm:text-sm text-[#1C1917] italic font-bold">
                  "Paced storytelling, vivid color science, and purposeful design."
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Button
                variant="primary"
                icon={<ArrowRight size={18} />}
                onClick={() => { navigate('/about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-9 py-5 text-xs sm:text-sm font-black uppercase tracking-widest rounded-full shadow-xl"
              >
                Learn More About Me
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Clean 3-Photo Overlapping Profile Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center pt-6 pb-8"
          >
            {/* Ambient Glow Disk */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-gradient-to-tr from-[#6B1D2F]/20 via-[#8B2440]/15 to-[#C59A9F]/25 blur-[120px] rounded-full pointer-events-none" />

            {/* Pure 3-Photo Overlapping Stack Container */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] flex items-center justify-center group cursor-pointer">

              {/* PHOTO STACK LAYER 1: Back Left Card */}
              <div className="absolute inset-0 w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-[#C59A9F]/40 shadow-xl bg-gradient-to-br from-[#6B1D2F] via-[#2E1216] to-[#1C1917] -rotate-6 -translate-x-5 -translate-y-3 scale-95 opacity-80 group-hover:-rotate-12 group-hover:-translate-x-12 group-hover:-translate-y-6 group-hover:opacity-95 group-hover:scale-95 transition-all duration-500 ease-out z-0">
                <img
                  src={alazarImg}
                  alt="Alazar Asdesach Portrait Layer 1"
                  className="w-full h-full object-cover object-top filter contrast-125 brightness-90 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-[#6B1D2F]/30 mix-blend-multiply" />
              </div>

              {/* PHOTO STACK LAYER 2: Back Right Card */}
              <div className="absolute inset-0 w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-[#C59A9F]/50 shadow-xl bg-gradient-to-br from-[#8B2440] via-[#1C1917] to-[#6B1D2F] rotate-6 translate-x-5 -translate-y-1 scale-95 opacity-85 group-hover:rotate-12 group-hover:translate-x-12 group-hover:-translate-y-4 group-hover:opacity-95 group-hover:scale-95 transition-all duration-500 ease-out z-10">
                <img
                  src={alazarImg}
                  alt="Alazar Asdesach Portrait Layer 2"
                  className="w-full h-full object-cover object-top filter saturate-150 brightness-95"
                />
                <div className="absolute inset-0 bg-[#8B2440]/20 mix-blend-color-burn" />
              </div>

              {/* PHOTO STACK LAYER 3: Main Center Front Card */}
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/80 shadow-2xl shadow-[#6B1D2F]/30 bg-gradient-to-br from-[#1C1917] via-[#2E1216] to-[#6B1D2F] group-hover:scale-105 transition-all duration-500 ease-out z-20">
                <img
                  src={alazarImg}
                  alt="Alazar Asdesach — Video Director & Graphic Designer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/50 via-transparent to-transparent opacity-80" />
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AboutSnapshot;

