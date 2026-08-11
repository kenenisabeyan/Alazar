'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Film, PenTool } from 'lucide-react';
import { theme } from '@/utils/constants';

export const AboutSnapshot: React.FC = () => {
  return (
    <section className="py-28 bg-surface-alt border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Visual Showcase Card */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 relative"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-burgundy-soft/30 shadow-burgundy-md bg-surface group"
              data-cursor="view"
            >
              <Image 
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Alazar Editing Suite" 
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Subtle darkening for the quote card at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-xl border border-border shadow-card">
                <p className="text-xs uppercase tracking-widest text-burgundy font-semibold mb-1">Director's Note</p>
                <p className="text-xs text-charcoal italic font-light">"Pacing and tone dictate every edit; precision rules every frame."</p>
              </div>
            </motion.div>

            {/* Ambient Soft Glow */}
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-burgundy-soft/20 rounded-full blur-3xl pointer-events-none"></div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 space-y-6"
          >
            <span className="text-xs uppercase tracking-widest text-burgundy font-semibold">About Alazar</span>
            
            <h2 className="text-3xl md:text-5xl font-bold text-charcoal leading-tight" style={{ fontFamily: theme.fonts.heading }}>
              Visual Storyteller &<br />
              <span className="italic font-light text-burgundy">Architect of Aesthetics</span>
            </h2>

            <p className="text-slate font-light text-base md:text-lg leading-relaxed">
              I bridge the gap between motion picture storytelling and static design perfection. Grounded in years of refining post-production workflows, I bring deep mastery of narrative pacing, cinematic color grading, and typography hierarchy to every project.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <motion.div 
                whileHover={{ y: -3 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border hover:border-burgundy-soft hover:shadow-burgundy-sm transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-burgundy-faint border border-burgundy-soft/40 flex items-center justify-center text-burgundy flex-shrink-0 mt-0.5">
                  <Film size={18} />
                </div>
                <div>
                  <h4 className="text-sm text-charcoal font-semibold">Cinematic Editing</h4>
                  <p className="text-xs text-slate">Rhythmic cuts, speed ramps & color grading.</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border hover:border-burgundy-soft hover:shadow-burgundy-sm transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-burgundy-faint border border-burgundy-soft/40 flex items-center justify-center text-burgundy flex-shrink-0 mt-0.5">
                  <PenTool size={18} />
                </div>
                <div>
                  <h4 className="text-sm text-charcoal font-semibold">Brand Design</h4>
                  <p className="text-xs text-slate">Bespoke identities & poster art.</p>
                </div>
              </motion.div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSnapshot;
