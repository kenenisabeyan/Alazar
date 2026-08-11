'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { caseStudies, theme } from '@/utils/constants';

export const CaseStudyHighlight: React.FC = () => {
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
            Client Performance & ROI
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-charcoal"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Measurable Impact & <span className="italic font-light text-burgundy">Campaign ROI</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate font-light text-base"
          >
            High-end cinematography and video editing do more than look pretty — they drive real business growth, brand authority, and view counts.
          </motion.p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-canvas rounded-2xl p-8 border border-border shadow-card hover:shadow-burgundy-sm hover:border-burgundy-soft transition-all text-left flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest px-3 py-1 bg-burgundy-faint text-burgundy rounded-full font-bold inline-block mb-6">
                  {item.client}
                </span>

                {/* Big Metric Callout */}
                <div className="mb-6">
                  <span className="text-5xl font-bold text-burgundy block" style={{ fontFamily: theme.fonts.heading }}>
                    {item.metric}
                  </span>
                  <span className="text-xs text-slate font-semibold uppercase tracking-wider">{item.metricLabel}</span>
                </div>

                <h3 className="text-xl font-bold text-charcoal mb-2" style={{ fontFamily: theme.fonts.heading }}>
                  {item.project}
                </h3>
                <p className="text-xs text-burgundy font-semibold flex items-center gap-1.5 mb-6">
                  <TrendingUp size={14} /> {item.result}
                </p>

                <ul className="space-y-2 mb-8 pt-4 border-t border-border">
                  {item.deliverables.map((d, i) => (
                    <li key={i} className="flex items-center text-xs text-slate font-light">
                      <CheckCircle2 size={14} className="text-burgundy mr-2 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link 
                  href="/portfolio"
                  className="flex items-center text-xs font-bold uppercase tracking-widest text-burgundy hover:text-burgundy-hover transition-colors"
                >
                  <span>Explore Campaign</span>
                  <ArrowRight size={14} className="ml-1.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CaseStudyHighlight;
