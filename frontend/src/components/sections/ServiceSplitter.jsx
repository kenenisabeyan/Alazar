import React from 'react';
import { motion } from 'framer-motion';
import { Film, Layout, ArrowRight, CheckCircle2 } from 'lucide-react';
import { theme } from '../../utils/constants';

export const ServiceSplitter = ({ setCurrentPage }) => {
  const cardClass = "cursor-pointer group text-left p-8 md:p-10 bg-[#FAFAF9] border border-[#E5D9DB] rounded-2xl hover:border-[#C59A9F] hover:shadow-lg transition-all duration-500 shadow-sm relative overflow-hidden flex flex-col justify-between";
  const iconBoxClass = "w-14 h-14 rounded-xl bg-[#F5E8EA] border border-[#C59A9F]/40 flex items-center justify-center text-[#6B1D2F] mb-8 group-hover:bg-[#6B1D2F] group-hover:text-white group-hover:border-[#6B1D2F] transition-all shadow-sm";

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
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 text-[#6B1D2F] transition-opacity">
        {icon === 'film' ? <Film size={140} /> : <Layout size={140} />}
      </div>

      <div>
        <div className={iconBoxClass}>
          {icon === 'film' ? <Film size={28} /> : <Layout size={28} />}
        </div>
        <h3 className="text-2xl text-[#1C1917] mb-3 font-bold" style={{ fontFamily: theme.fonts.heading }}>{title}</h3>
        <p className="text-[#78716C] font-light text-sm mb-6 leading-relaxed">{desc}</p>

        <ul className="space-y-2.5 mb-8">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center text-xs text-[#1C1917] font-light">
              <CheckCircle2 size={14} className="text-[#6B1D2F] mr-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center text-xs text-[#6B1D2F] font-semibold uppercase tracking-widest group-hover:text-[#4A1020] transition-colors">
        <span>{icon === 'film' ? 'View Video Projects' : 'View Design Projects'}</span>
        <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
      </div>
    </motion.div>
  );

  return (
    <section className="py-28 bg-white border-t border-[#E5D9DB] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center max-w-5xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 space-y-4"
        >
          <span className="text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold">Dual Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C1917]" style={{ fontFamily: theme.fonts.heading }}>
            Two Disciplines.<br />
            <span className="italic font-light text-[#6B1D2F]">One Vision.</span>
          </h2>
          <p className="text-[#78716C] max-w-xl mx-auto font-light text-sm md:text-base">
            Select a core service area to explore our dedicated capabilities, deliverables, and past work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {renderCard('film', 'Video Editing & Motion',
            'Cinematic storytelling, commercial edits, rhythmic music cutting, sound mixing, and high-contrast color grading.',
            ['Commercial Reels & Documentaries', 'Color Grading (DaVinci Resolve)', 'Sound Design & Mixing', 'Social Media Motion Cuts'],
            0.1
          )}
          {renderCard('layout', 'Graphic Design & Identity',
            'Brand identities, editorial layouts, poster art, typographic systems, and high-impact digital assets.',
            ['Brand Identity & Guidelines', '3D & Event Poster Art', 'Editorial Spread Layouts', 'Digital Design Kits'],
            0.2
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceSplitter;
