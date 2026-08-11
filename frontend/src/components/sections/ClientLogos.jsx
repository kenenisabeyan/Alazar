import React from 'react';
import { motion } from 'framer-motion';
import { clientLogos, awardsList, theme } from '../../utils/constants';
import { Award, Star } from 'lucide-react';

export const ClientLogos = () => {
  return (
    <section className="py-20 bg-white border-t border-[#E5D9DB] relative" style={{ fontFamily: theme.fonts.body }}>
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        {/* Subtitle */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold">
            Trusted By Visionary Brands & Directors Worldwide
          </span>
        </div>

        {/* Logo Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center mb-16 opacity-75 hover:opacity-100 transition-opacity">
          {clientLogos.map((client, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.08, color: '#6B1D2F' }}
              className="px-4 py-3 border border-[#E5D9DB] rounded-xl text-center w-full bg-[#FAFAF9] text-[#1C1917] font-bold text-xs tracking-widest uppercase shadow-sm cursor-default"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {client.text}
            </motion.div>
          ))}
        </div>

        {/* Awards Counter Bar */}
        <div className="bg-[#F5E8EA] border border-[#C59A9F]/40 rounded-2xl p-8 grid md:grid-cols-4 gap-6 text-center">
          {awardsList.map((award, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center space-y-1">
              <div className="flex items-center gap-1.5 text-[#6B1D2F] font-bold text-sm">
                <Award size={16} />
                <span>{award.title}</span>
              </div>
              <p className="text-xs text-[#1C1917] font-semibold">{award.project}</p>
              <span className="text-[10px] uppercase text-[#78716C] tracking-wider">{award.year} Honor</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ClientLogos;
