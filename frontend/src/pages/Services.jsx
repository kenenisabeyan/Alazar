import React from 'react';
import { motion } from 'framer-motion';
import { Film, MapPin, CheckCircle2, HelpCircle } from 'lucide-react';
import Button from '../components/common/Button';
import ProjectCalculator from '../components/sections/ProjectCalculator';
import WorkflowVault from '../components/sections/WorkflowVault';
import { theme, faqs } from '../utils/constants';

export const Services = ({ setCurrentPage }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAFAF9] pt-36 pb-24"
      style={{ fontFamily: theme.fonts.body }}
    >
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold block mb-3"
          >
            Service Capabilities
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-[#1C1917] mb-6" 
            style={{ fontFamily: theme.fonts.heading }}
          >
            Offerings & <span className="italic font-light text-[#6B1D2F]">Process</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#78716C] font-light text-base md:text-lg"
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
            className="bg-white border border-[#E5D9DB] p-10 rounded-2xl relative overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#C59A9F] hover:shadow-md transition-all"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-[#6B1D2F]">
              <Film size={140} />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5E8EA] text-[#6B1D2F] border border-[#C59A9F]/40 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                Global Operations
              </div>
              <h2 className="text-3xl text-[#1C1917] font-bold mb-4" style={{ fontFamily: theme.fonts.heading }}>
                Freelance & Remote Post-Production
              </h2>
              <p className="text-[#78716C] mb-8 font-light leading-relaxed text-sm md:text-base">
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
                  <li key={i} className="flex items-center text-[#1C1917] font-light text-sm">
                    <CheckCircle2 size={18} className="text-[#6B1D2F] mr-3 flex-shrink-0" />
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
            className="bg-white border border-[#C59A9F]/50 p-10 rounded-2xl relative overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#6B1D2F] hover:shadow-md transition-all"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-[#6B1D2F]">
              <MapPin size={140} />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6B1D2F] text-white rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                On-Set & Studio
              </div>
              <h2 className="text-3xl text-[#1C1917] font-bold mb-4" style={{ fontFamily: theme.fonts.heading }}>
                In-Person Shoots & Consultations
              </h2>
              <p className="text-[#78716C] mb-8 font-light leading-relaxed text-sm md:text-base">
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
                  <li key={i} className="flex items-center text-[#1C1917] font-light text-sm">
                    <CheckCircle2 size={18} className="text-[#6B1D2F] mr-3 flex-shrink-0" />
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

      </div>

      {/* Embedded Interactive Rate & Package Estimator */}
      <ProjectCalculator setCurrentPage={setCurrentPage} />

      {/* Embedded Deliverable & Frame.io Workflow */}
      <WorkflowVault />

      {/* FAQs */}
      <div className="container mx-auto px-6 md:px-12 max-w-4xl pt-16 border-t border-[#E5D9DB]">
        <div className="text-center mb-12">
          <HelpCircle size={36} className="text-[#6B1D2F] mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-[#1C1917]" style={{ fontFamily: theme.fonts.heading }}>
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
              className="bg-white p-6 rounded-xl border border-[#E5D9DB] shadow-sm hover:border-[#C59A9F] transition-colors text-left"
            >
              <h4 className="text-base text-[#1C1917] font-semibold mb-2">{faq.q}</h4>
              <p className="text-sm text-[#78716C] font-light leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};

export default Services;
