'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Film, MapPin, CheckCircle2, HelpCircle } from 'lucide-react';
import Button from '@/components/common/Button';
import ProjectCalculator from '@/components/sections/ProjectCalculator';
import WorkflowVault from '@/components/sections/WorkflowVault';
import { theme, faqs } from '@/utils/constants';

export default function ServicesPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-canvas pt-36 pb-24"
    >
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-widest text-burgundy font-semibold block mb-3"
          >
            Service Capabilities
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-charcoal mb-6" 
            style={{ fontFamily: theme.fonts.heading }}
          >
            Offerings & <span className="italic font-light text-burgundy">Process</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate font-light text-base md:text-lg"
          >
            Whether you need remote post-production support or on-set video direction, my workflow is tailored to elevate your vision to high-end standards.
          </motion.p>
        </div>

        {/* Core Services Split Cards */}
        <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto mb-24">
          
          {/* Remote Services Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-surface border border-border p-10 rounded-2xl relative overflow-hidden shadow-card flex flex-col justify-between hover:border-burgundy-soft hover:shadow-burgundy-md transition-all"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-burgundy">
              <Film size={140} />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-burgundy-faint text-burgundy border border-burgundy-soft/40 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                Global Operations
              </div>
              <h2 className="text-3xl text-charcoal mb-4" style={{ fontFamily: theme.fonts.heading }}>
                Freelance & Remote Post-Production
              </h2>
              <p className="text-slate mb-8 font-light leading-relaxed text-sm md:text-base">
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
                  <li key={i} className="flex items-center text-charcoal font-light text-sm">
                    <CheckCircle2 size={18} className="text-burgundy mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Button variant="outline" className="w-full py-3.5" href="/contact" data-cursor="pointer">
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
            className="bg-surface border border-burgundy-soft/50 p-10 rounded-2xl relative overflow-hidden shadow-burgundy-sm flex flex-col justify-between hover:border-burgundy hover:shadow-burgundy-md transition-all"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-burgundy">
              <MapPin size={140} />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-burgundy text-white rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                On-Set & Studio
              </div>
              <h2 className="text-3xl text-charcoal mb-4" style={{ fontFamily: theme.fonts.heading }}>
                In-Person Shoots & Consultations
              </h2>
              <p className="text-slate mb-8 font-light leading-relaxed text-sm md:text-base">
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
                  <li key={i} className="flex items-center text-charcoal font-light text-sm">
                    <CheckCircle2 size={18} className="text-burgundy mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Button variant="primary" className="w-full py-3.5" href="/contact" data-cursor="pointer">
                Book Consultation
              </Button>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Embedded Interactive Rate & Package Estimator */}
      <ProjectCalculator />

      {/* Embedded Deliverable & Frame.io Workflow */}
      <WorkflowVault />

      {/* FAQs */}
      <div className="container mx-auto px-6 md:px-12 max-w-6xl pt-16 border-t border-border">
        <div className="text-center mb-12">
          <HelpCircle size={36} className="text-burgundy mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-charcoal" style={{ fontFamily: theme.fonts.heading }}>
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
              className="bg-surface p-6 rounded-xl border border-border shadow-card hover:border-burgundy-soft transition-colors text-left"
            >
              <h4 className="text-base text-charcoal font-semibold mb-2">{faq.q}</h4>
              <p className="text-sm text-slate font-light leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}
