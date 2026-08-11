'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Film, Monitor, Zap, CheckCircle2 } from 'lucide-react';
import { gearList, theme } from '@/utils/constants';

export const GearSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const icons = [Camera, Film, Monitor, Zap];

  return (
    <section className="py-28 bg-surface border-t border-border relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-burgundy font-semibold block"
          >
            Cinema Gear & Post Rig
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-charcoal"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Production & <span className="italic font-light text-burgundy">Editing Rig</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate font-light text-base"
          >
            We operate with industry-standard 8K cinema cameras, anamorphic optics, calibrated color mastering suites, and heavy cinema gimbals.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {gearList.map((cat, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(idx)}
                className={`px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeCategory === idx 
                    ? 'bg-burgundy text-white shadow-burgundy-sm' 
                    : 'bg-surface text-slate border border-border hover:text-charcoal'
                }`}
              >
                <IconComponent size={16} /> {cat.category}
              </button>
            );
          })}
        </div>

        {/* Active Gear Grid */}
        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {gearList[activeCategory].items.map((item, idx) => (
            <div 
              key={idx}
              className="bg-surface p-7 rounded-2xl border border-border shadow-card hover:border-burgundy-soft hover:shadow-burgundy-sm transition-all text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-burgundy-faint text-burgundy flex items-center justify-center mb-4">
                  <CheckCircle2 size={20} />
                </div>
                <h4 className="text-xl font-bold text-charcoal mb-2" style={{ fontFamily: theme.fonts.heading }}>
                  {item.name}
                </h4>
                <p className="text-xs text-slate font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-burgundy font-semibold uppercase tracking-widest">
                <span>Production Standard</span>
                <span className="w-2 h-2 rounded-full bg-burgundy"></span>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default GearSection;
