'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { btsGallery, theme } from '@/utils/constants';
import { MapPin } from 'lucide-react';

export const BehindTheScenes: React.FC = () => {
  return (
    <section className="py-28 bg-canvas border-t border-border relative">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-burgundy font-semibold block"
          >
            Production Field Notes
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-charcoal"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Behind The <span className="italic font-light text-burgundy">Lens & Suite</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate font-light text-base"
          >
            A look inside our live production shoots, camera rigs, location scouts, and post-production color suites.
          </motion.p>
        </div>

        {/* BTS Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {btsGallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-surface rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-burgundy-sm transition-all group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-charcoal flex items-center gap-1.5 shadow-card">
                  <MapPin size={12} className="text-burgundy" />
                  {item.location}
                </div>
              </div>

              <div className="p-6 text-left">
                <h4 className="text-lg font-bold text-charcoal mb-2" style={{ fontFamily: theme.fonts.heading }}>
                  {item.title}
                </h4>
                <p className="text-xs text-slate font-light leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BehindTheScenes;
