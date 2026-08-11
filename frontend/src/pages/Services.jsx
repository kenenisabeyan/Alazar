import React from 'react';
import { motion } from 'framer-motion';
import { Film, MapPin, CheckCircle2, HelpCircle } from 'lucide-react';
import Button from '../components/common/Button';
import { theme, faqs } from '../utils/constants';

export const Services = ({ setCurrentPage }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#1E0A0D] pt-36 pb-24"
    >
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-widest text-[#8B1E3F] font-semibold block mb-3"
          >
            Service Capabilities
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-[#F5F0F1] mb-6" 
            style={{ fontFamily: theme.fonts.heading }}
          >
            Offerings & <span className="italic font-light text-[#A89597]">Process</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#A89597] font-light text-base md:text-lg"
          >
            Whether you need remote post-production support or on-set video direction, my workflow is tailored to elevate your vision to high-end standards.
          </motion.p>
        </div>

        {/* Core Services Split Cards */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
          
          {/* Remote Services Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#2E1216] border border-white/5 p-10 rounded-2xl relative overflow-hidden shadow-2xl flex flex-col justify-between hover:border-[#8B1E3F]/40 transition-all"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Film size={140} />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B1E3F]/20 text-[#8B1E3F] border border-[#8B1E3F]/30 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                Global Operations
              </div>
              <h2 className="text-3xl text-[#F5F0F1] mb-4" style={{ fontFamily: theme.fonts.heading }}>
                Freelance & Remote Post-Production
              </h2>
              <p className="text-[#A89597] mb-8 font-light leading-relaxed text-sm md:text-base">
                High-end video editing, color grading, sound mixes, and bespoke design assets delivered securely to clients worldwide.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  'Cinematic Color Grading (DaVinci Resolve)',
                  'Commercial & Documentary Video Editing',
                  'Full Brand Identity & Guideline Systems',
                  'Social Media Motion Graphics & Teasers',
                  'Audio Mixing, Foley & Sound Design'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-[#F5F0F1] font-light text-sm">
                    <CheckCircle2 size={18} className="text-[#8B1E3F] mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Button variant="outline" className="w-full py-3.5" onClick={() => setCurrentPage('contact')} data-cursor="pointer">
                Request Remote Quote
              </Button>
            </div>
          </motion.div>

          {/* In-Person Services Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-[#2E1216] border border-[#8B1E3F]/40 p-10 rounded-2xl relative overflow-hidden shadow-2xl flex flex-col justify-between hover:border-[#8B1E3F] transition-all"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <MapPin size={140} />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B1E3F] text-white rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                On-Set & Studio
              </div>
              <h2 className="text-3xl text-[#F5F0F1] mb-4" style={{ fontFamily: theme.fonts.heading }}>
                In-Person Shoots & Consultations
              </h2>
              <p className="text-[#A89597] mb-8 font-light leading-relaxed text-sm md:text-base">
                Hands-on camera direction, lighting setup, live event videography, and direct creative strategy workshops.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  'On-Set Videography & Camera Operation',
                  'Studio Strategy Sessions & Art Direction',
                  'Live Event & Music Festival Coverage',
                  'Brand Photoshoots & Editorial Direction',
                  'Dedicated Production Consultation'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-[#F5F0F1] font-light text-sm">
                    <CheckCircle2 size={18} className="text-[#8B1E3F] mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Button variant="primary" className="w-full py-3.5" onClick={() => setCurrentPage('contact')} data-cursor="pointer">
                Book Consultation
              </Button>
            </div>
          </motion.div>

        </div>

        {/* Process Section */}
        <div className="max-w-5xl mx-auto py-16 border-t border-white/5 mb-24">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#8B1E3F] font-semibold block mb-2">Workflow</span>
            <h2 className="text-3xl md:text-4xl font-normal text-[#F5F0F1]" style={{ fontFamily: theme.fonts.heading }}>
              The Creative Process
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery & Brief', desc: 'Aligning on goals, creative moodboards, target audience, and narrative pacing.' },
              { step: '02', title: 'Assembly & Draft', desc: 'Crafting the initial cut or visual identity concepts matching audio benchmarks.' },
              { step: '03', title: 'Grade & Polish', desc: 'Fine-tuning color palette, sound mixing, typography details.' },
              { step: '04', title: 'Master Delivery', desc: 'Exporting optimized high-res masters for web, broadcast, and print.' }
            ].map((p, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-[#2E1216]/50 p-6 rounded-xl border border-white/5 text-left"
              >
                <span className="text-3xl font-bold text-[#8B1E3F] block mb-3" style={{ fontFamily: theme.fonts.heading }}>{p.step}</span>
                <h4 className="text-lg font-semibold text-[#F5F0F1] mb-2">{p.title}</h4>
                <p className="text-xs text-[#A89597] font-light leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto pt-16 border-t border-white/5">
          <div className="text-center mb-12">
            <HelpCircle size={36} className="text-[#8B1E3F] mx-auto mb-3" />
            <h2 className="text-3xl font-normal text-[#F5F0F1]" style={{ fontFamily: theme.fonts.heading }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#2E1216] p-6 rounded-xl border border-white/5"
              >
                <h4 className="text-base text-[#F5F0F1] font-semibold mb-2">{faq.q}</h4>
                <p className="text-sm text-[#A89597] font-light leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Services;
