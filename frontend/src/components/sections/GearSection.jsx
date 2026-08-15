import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Film, Monitor, Zap, CheckCircle2 } from 'lucide-react';
import { gearList, theme } from '../../utils/constants';

export const GearSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const icons = [Camera, Film, Monitor, Zap];

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
            Production Gear
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#1C1917]"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Filming & <span className="italic font-light text-[#6B1D2F]">Editing Gear</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#78716C] font-light text-base"
          >
            I use professional 8K cinema cameras, sharp lenses, and fast editing setups to deliver high-quality results.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {gearList.map((cat, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(idx)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeCategory === idx 
                    ? 'bg-[#6B1D2F] text-white shadow-sm' 
                    : 'bg-white text-[#78716C] border border-[#E5D9DB] hover:text-[#1C1917]'
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {gearList[activeCategory].items.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white p-7 rounded-2xl border border-[#E5D9DB] shadow-sm hover:border-[#C59A9F] hover:shadow-md transition-all text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#F5E8EA] text-[#6B1D2F] flex items-center justify-center mb-4">
                  <CheckCircle2 size={20} />
                </div>
                <h4 className="text-xl font-bold text-[#1C1917] mb-2" style={{ fontFamily: theme.fonts.heading }}>
                  {item.name}
                </h4>
                <p className="text-xs text-[#78716C] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E5D9DB]/60 flex items-center justify-between text-xs text-[#6B1D2F] font-semibold uppercase tracking-widest">
                <span>Production Standard</span>
                <span className="w-2 h-2 rounded-full bg-[#6B1D2F]"></span>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default GearSection;
