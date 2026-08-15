import React from 'react';
import { motion } from 'framer-motion';
import { Film, MapPin, CheckCircle2, HelpCircle } from 'lucide-react';
import Button from '../components/common/Button';
import ProjectCalculator from '../components/sections/ProjectCalculator';
import WorkflowVault from '../components/sections/WorkflowVault';
import SkillsSection from '../components/sections/SkillsSection';
import WhyHireMe from '../components/sections/WhyHireMe';
import AvailabilityCTA from '../components/sections/AvailabilityCTA';
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
            My Services
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-[#1C1917] mb-6" 
            style={{ fontFamily: theme.fonts.heading }}
          >
            Services & <span className="italic font-light text-[#6B1D2F]">Process</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#78716C] font-light text-base md:text-lg"
          >
            Whether you need remote video editing or on-set filming, I provide clear, reliable service from start to finish.
          </motion.p>
        </div>

        {/* Core Services Split Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto mb-24">
          
          {/* Remote Services Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white border border-[#E5D9DB] p-10 rounded-2xl relative overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#C59A9F] hover:shadow-md transition-all text-left"
          >
            <div className="w-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F5E8EA] text-[#6B1D2F] border border-[#C59A9F]/40 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                Remote Services
              </div>
              <h2 className="text-3xl text-[#1C1917] font-bold mb-4 text-left" style={{ fontFamily: theme.fonts.heading }}>
                Remote Video Editing & Post-Production
              </h2>
              <p className="text-[#78716C] mb-8 font-light leading-relaxed text-sm md:text-base text-left">
                High-quality video editing, color grading, sound mixing, and graphic design delivered to clients anywhere.
              </p>

              <ul className="space-y-4 mb-10 text-left">
                {[
                  'Cinematic Color Grading',
                  'Commercial & Documentary Video Editing',
                  'Brand Identity & Logo Design',
                  'Social Media Motion Edits',
                  'Audio Mixing & Sound Design'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-[#1C1917] font-light text-sm">
                    <CheckCircle2 size={18} className="text-[#6B1D2F] mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
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
            className="bg-white border border-[#C59A9F]/50 p-10 rounded-2xl relative overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#6B1D2F] hover:shadow-md transition-all text-left"
          >
            <div className="w-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6B1D2F] text-white rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                On-Location Filming
              </div>
              <h2 className="text-3xl text-[#1C1917] font-bold mb-4 text-left" style={{ fontFamily: theme.fonts.heading }}>
                On-Set Filming & Directing
              </h2>
              <p className="text-[#78716C] mb-8 font-light leading-relaxed text-sm md:text-base text-left">
                On-set camera operation, lighting setup, live event videography, and creative direction for your shoot.
              </p>

              <ul className="space-y-4 mb-10 text-left">
                {[
                  'On-Set Filming & Camera Operation',
                  'Creative Strategy & Art Direction',
                  'Live Event & Music Coverage',
                  'Brand Photoshoots & Video Direction',
                  'Video Production Consulting'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-[#1C1917] font-light text-sm">
                    <CheckCircle2 size={18} className="text-[#6B1D2F] mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <Button variant="primary" className="w-full py-3.5" onClick={() => setCurrentPage('contact')} data-cursor="pointer">
                Contact Me
              </Button>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Why Hire Me — Client Assurances & Guarantees */}
      <WhyHireMe setCurrentPage={setCurrentPage} />

      {/* Software & Technical Capabilities */}
      <SkillsSection />

      {/* Embedded Interactive Rate & Package Estimator */}
      <ProjectCalculator setCurrentPage={setCurrentPage} />

      {/* Embedded Deliverable & Frame.io Workflow */}
      <WorkflowVault />

      {/* FAQs */}
      <div className="container mx-auto px-6 md:px-12 max-w-6xl pt-16 mb-20">
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

      {/* Conversion Hiring Banner */}
      <AvailabilityCTA setCurrentPage={setCurrentPage} />

    </motion.div>
  );
};

export default Services;

