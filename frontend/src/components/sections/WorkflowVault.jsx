import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MessageSquare, Film, Download, Layers } from 'lucide-react';
import { theme } from '../../utils/constants';

export const WorkflowVault = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "1. Creative Brief & Moodboard",
      desc: "We align on narrative pacing, color palettes, sound references, and editorial tone before shooting or cutting."
    },
    {
      icon: Layers,
      title: "2. Frame.io Rough Cut Review",
      desc: "Receive password-protected Frame.io timecoded links to leave precise frame-accurate comments directly on video drafts."
    },
    {
      icon: Film,
      title: "3. Color Grade & Fairlight Mix",
      desc: "DaVinci Resolve node grading, sound design layering, dialogue cleaning, and optical flow speed ramps."
    },
    {
      icon: Download,
      title: "4. Master Deliverable Vault",
      desc: "Instant download of ProRes 422 HQ, H.264 web MP4, vertical 9:16 social reels, and full raw archival stems."
    }
  ];

  return (
    <section className="py-28 bg-[#FAFAF9] border-t border-[#E5D9DB] relative" style={{ fontFamily: theme.fonts.body }}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold block"
          >
            Frictionless Client Journey
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#1C1917]"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Seamless <span className="italic font-light text-[#6B1D2F]">Client Collaboration</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#78716C] font-light text-base"
          >
            Working with us is structured, transparent, and hassle-free. From timecoded feedback to 4K ProRes master handovers.
          </motion.p>
        </div>

        {/* Workflow Steps Grid */}
        <div className="grid md:grid-cols-4 gap-6">
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
                className="bg-white p-7 rounded-2xl border border-[#E5D9DB] shadow-sm hover:border-[#C59A9F] transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center mb-6">
                    <IconComponent size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-[#1C1917] mb-2" style={{ fontFamily: theme.fonts.heading }}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#78716C] font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5D9DB]/60 flex items-center gap-1.5 text-[11px] text-[#6B1D2F] font-semibold uppercase tracking-wider">
                  <ShieldCheck size={14} /> Guaranteed Standard
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
