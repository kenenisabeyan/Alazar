import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MessageSquare, Film, Download, Layers } from 'lucide-react';
import { theme } from '../../utils/constants';

export const WorkflowVault = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "1. Creative Brief",
      desc: "I discuss your goals, target audience, style references, and project timeline."
    },
    {
      icon: Layers,
      title: "2. Online Draft Review",
      desc: "Review video drafts online and leave clear notes directly on specific frames."
    },
    {
      icon: Film,
      title: "3. Color & Audio Polish",
      desc: "Fine-tuning video colors, audio levels, sound effects, and smooth cuts."
    },
    {
      icon: Download,
      title: "4. Final Delivery",
      desc: "Download your finished high-resolution videos, social media clips, and project files."
    }
  ];

  return (
    <section className="py-28 bg-[#FAFAF9] relative" style={{ fontFamily: theme.fonts.body }}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold block"
          >
            How I Work
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#1C1917]"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Simple & Clear <span className="italic font-light text-[#6B1D2F]">Client Process</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#78716C] font-light text-base"
          >
            Working together is easy, organized, and transparent at every step.
          </motion.p>
        </div>

        {/* Workflow Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-7 rounded-2xl border border-[#E5D9DB] shadow-sm hover:border-[#C59A9F] transition-all text-center flex flex-col items-center justify-between"
              >
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#F5E8EA] border border-[#C59A9F]/30 text-[#6B1D2F] flex items-center justify-center mb-6 mx-auto shadow-sm">
                    <IconComponent size={26} />
                  </div>
                  <h4 className="text-lg font-bold text-[#1C1917] mb-2" style={{ fontFamily: theme.fonts.heading }}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#78716C] font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="w-full mt-6 pt-4 border-t border-[#E5D9DB]/60 flex items-center justify-center gap-1.5 text-[11px] text-[#6B1D2F] font-semibold uppercase tracking-wider">
                  <ShieldCheck size={14} /> Quality Guaranteed
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WorkflowVault;
