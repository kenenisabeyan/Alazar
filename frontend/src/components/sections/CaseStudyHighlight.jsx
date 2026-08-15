import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { caseStudies, theme } from '../../utils/constants';

export const CaseStudyHighlight = ({ setCurrentPage }) => {
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
            Results & Impact
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#1C1917]"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Real Results for <span className="italic font-light text-[#6B1D2F]">Clients</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#78716C] font-light text-base"
          >
            Great video editing and clear design help brands get more views, engage audiences, and grow.
          </motion.p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {caseStudies.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-[#FAFAF9] rounded-2xl p-8 border border-[#E5D9DB] shadow-sm hover:shadow-md hover:border-[#C59A9F] transition-all text-left flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest px-3 py-1 bg-[#F5E8EA] text-[#6B1D2F] rounded-full font-bold inline-block mb-6">
                  {item.client}
                </span>

                {/* Big Metric Callout */}
                <div className="mb-6">
                  <span className="text-5xl font-bold text-[#6B1D2F] block" style={{ fontFamily: theme.fonts.heading }}>
                    {item.metric}
                  </span>
                  <span className="text-xs text-[#78716C] font-semibold uppercase tracking-wider">{item.metricLabel}</span>
                </div>

                <h3 className="text-xl font-bold text-[#1C1917] mb-2" style={{ fontFamily: theme.fonts.heading }}>
                  {item.project}
                </h3>
                <p className="text-xs text-[#6B1D2F] font-semibold flex items-center gap-1.5 mb-6">
                  <TrendingUp size={14} /> {item.result}
                </p>

                <ul className="space-y-2 mb-8 pt-4 border-t border-[#E5D9DB]">
                  {item.deliverables.map((d, i) => (
                    <li key={i} className="flex items-center text-xs text-[#78716C] font-light">
                      <CheckCircle2 size={14} className="text-[#6B1D2F] mr-2 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button 
                  onClick={() => {
                    if (setCurrentPage) setCurrentPage('portfolio');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center text-xs font-bold uppercase tracking-widest text-[#6B1D2F] hover:text-[#8B2440] transition-colors"
                >
                  <span>View Projects</span>
                  <ArrowRight size={14} className="ml-1.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CaseStudyHighlight;
