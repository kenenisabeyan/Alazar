import React from 'react';
import { motion } from 'framer-motion';
import { Film, Layout, ArrowRight, CheckCircle2 } from 'lucide-react';
import { theme } from '../../utils/constants';

export const ServiceSplitter = ({ setCurrentPage }) => {
  const cardClass = "cursor-pointer group text-left p-8 md:p-10 bg-[#FAFAF9] border border-[#E5D9DB] rounded-2xl hover:border-[#C59A9F] hover:shadow-lg transition-all duration-500 shadow-sm relative overflow-hidden flex flex-col justify-between";

  const renderCard = (icon, title, desc, items, delay) => (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      whileHover={{ y: -8 }}
      onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}
      className={cardClass}
    >
      <div className="w-full">
        <h3 className="text-2xl text-[#1C1917] mb-3 font-bold text-left" style={{ fontFamily: theme.fonts.heading }}>{title}</h3>
        <p className="text-[#78716C] font-light text-sm mb-6 leading-relaxed text-left">{desc}</p>

        <ul className="space-y-2.5 mb-8">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center text-xs text-[#1C1917] font-light text-left">
              <CheckCircle2 size={15} className="text-[#6B1D2F] mr-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center text-xs text-[#6B1D2F] font-semibold uppercase tracking-widest group-hover:text-[#4A1020] transition-colors text-left">
        <span>{icon === 'film' ? 'View Video Projects' : 'View Design Projects'}</span>
        <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
      </div>
    </motion.div>
  );

  return (
    <section className="py-28 bg-[#F5E8EA]/50 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center max-w-7xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 space-y-4"
        >
          <span className="text-xs uppercase tracking-widest text-[#6B1D2F] font-bold">Services</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1C1917]" style={{ fontFamily: theme.fonts.heading }}>
            Two Disciplines.<br />
            <span className="italic font-light text-gradient-burgundy">One Vision.</span>
          </h2>
          <p className="text-[#78716C] max-w-xl mx-auto font-light text-sm md:text-base">
            Choose a service below to view video editing or graphic design work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {renderCard('film', 'Video Editing & Motion',
            'High-quality video editing, commercial clips, music cutting, sound mixing, and color work.',
            ['Commercial Videos & Documentaries', 'Color Grading', 'Sound Design & Audio Mix', 'Social Media Edits'],
            0.1
          )}
          {renderCard('layout', 'Graphic Design & Identity',
            'Logo design, brand identity systems, poster graphics, magazine layouts, and digital assets.',
            ['Brand Identity & Guidelines', 'Poster Art & Graphics', 'Magazine & Print Layouts', 'Digital Design Assets'],
            0.2
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceSplitter;
