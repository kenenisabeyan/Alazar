import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, ArrowRight, Film, PenTool, Zap, X } from 'lucide-react';
import { btsGallery, theme } from '../../constants';

// Grid layout config: first item is large (spans 2 rows), rest are regular
const layoutConfig = [
  { colSpan: 'md:col-span-4', rowSpan: 'md:row-span-2', aspect: 'aspect-[4/5] md:aspect-auto' },
  { colSpan: 'md:col-span-4', rowSpan: '', aspect: 'aspect-[4/3]' },
  { colSpan: 'md:col-span-4', rowSpan: '', aspect: 'aspect-[4/3]' },
  { colSpan: 'md:col-span-4', rowSpan: '', aspect: 'aspect-[4/3]' },
  { colSpan: 'md:col-span-4', rowSpan: '', aspect: 'aspect-[4/3]' },
];

const disciplineTags = [
  { icon: Film, text: 'On-Set Filming' },
  { icon: PenTool, text: 'Color Suite' },
  { icon: Camera, text: 'Aerial Filming' },
  { icon: Zap, text: 'Lighting Setup' },
];

export const BehindTheScenes = ({ data }) => {
  const [lightboxItem, setLightboxItem] = useState(null);
  const btsItems = (data && data.length) ? data.flatMap(cat => cat.media || []).filter(Boolean) : btsGallery;

  return (
    <section
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body, background: '#FAFAF9' }}
    >
      {/* Ambient */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C59A9F]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#6B1D2F]/06 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.06] tracking-tight break-words"
              style={{ fontFamily: theme.fonts.heading }}
            >
              On Set &<br />
              <span className="text-gradient-burgundy font-black">In the Studio.</span>
            </motion.h2>
          </div>

          {/* Discipline tag pills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {disciplineTags.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#C59A9F] text-[10px] font-black text-[#292524] uppercase tracking-wider shadow-sm hover:border-[#6B1D2F] hover:text-[#6B1D2F] transition-colors"
              >
                <Icon size={11} className="text-[#6B1D2F]" /> {text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Masonry-style grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-5 mb-10"
          style={{ minHeight: 'clamp(400px, 70vh, 700px)' }}>
          {(btsItems.length ? btsItems : btsGallery).map((item, idx) => {
            const layout = layoutConfig[idx] ?? layoutConfig[layoutConfig.length - 1];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => setLightboxItem(item)}
                className={`group relative overflow-hidden rounded-[2rem] cursor-pointer ${layout.colSpan} ${layout.rowSpan} ${layout.aspect} bg-gradient-to-br from-[#6B1D2F] via-[#521523] to-[#3B0E19] shadow-xl shadow-[#6B1D2F]/15 border border-[#C59A9F]/20 hover:border-[#C59A9F]/60 hover:shadow-2xl hover:shadow-[#6B1D2F]/25 transition-all duration-500`}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B0E19]/95 via-[#6B1D2F]/40 to-black/20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top tags */}
                <div className="absolute top-5 left-5 right-5 z-10 flex items-start justify-between opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:-translate-y-2 sm:group-hover:translate-y-0 transition-all duration-400 ease-out pointer-events-none">
                  <div className="flex items-center gap-1.5 bg-[#1E0A0D]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-[10px] font-bold text-white shadow-lg">
                    <MapPin size={11} className="text-[#C59A9F]" />
                    {item.location}
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-xl">
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-4 sm:group-hover:translate-y-0 transition-all duration-400 ease-out pointer-events-none">
                  <h4
                    className="text-lg sm:text-xl font-black text-white mb-1.5 leading-tight"
                    style={{ fontFamily: theme.fonts.heading }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/95 font-normal leading-relaxed line-clamp-2 max-w-xs">
                    {item.caption}
                  </p>
                  {/* Expand hint */}
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-black text-[#C59A9F] uppercase tracking-widest">
                    <Camera size={11} /> Click to expand
                  </div>
                </div>

                {/* Large index overlay */}
                <div
                  className="absolute top-4 right-4 text-[80px] font-black text-white/[0.04] group-hover:text-white/[0.12] leading-none pointer-events-none select-none transition-colors duration-500"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  0{idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Process stat strip ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4"
        >
          {[
            { icon: Film, value: '140+', label: 'Projects Shot' },
            { icon: Zap, value: '8K', label: 'Max Resolution' },
            { icon: Camera, value: '3', label: 'Cinema Cameras' },
            { icon: MapPin, value: '4', label: 'Continents Filmed' },
          ].map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="glass-card-luxury rounded-2xl p-3.5 sm:p-5 flex flex-col items-center justify-center text-center"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#6B1D2F]/20 mb-2">
                <Icon size={16} />
              </div>
              <p
                className="text-2xl sm:text-3xl font-black text-[#6B1D2F] dark:text-[#F5F0F1] mb-1 leading-none text-center"
                style={{ fontFamily: theme.fonts.heading }}
              >
                {value}
              </p>
              <p className="text-[9.5px] sm:text-[10px] text-[#292524] dark:text-[#A89597] font-black uppercase tracking-wider sm:tracking-widest text-center leading-tight">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 bg-[#1E0A0D]/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4 sm:p-6 cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-[#1E0A0D]/60 border border-white/15 cursor-default bg-[#2E1216]"
            >
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="w-full max-h-[75vh] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E0A0D]/95 via-[#1E0A0D]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={13} className="text-[#C59A9F]" />
                  <span className="text-[11px] font-black text-white/70 uppercase tracking-widest">
                    {lightboxItem.location}
                  </span>
                </div>
                <h3
                  className="text-2xl font-black text-white mb-2"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  {lightboxItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/95 font-normal leading-relaxed max-w-xl">
                  {lightboxItem.caption}
                </p>
              </div>

              {/* Prev / Next controls */}
              <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const idx = btsGallery.findIndex(i => i.id === lightboxItem.id);
                    const prevIdx = (idx - 1 + btsGallery.length) % btsGallery.length;
                    setLightboxItem(btsGallery[prevIdx]);
                  }}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all shadow-lg"
                  aria-label="Previous photo"
                >
                  <ArrowRight size={18} className="rotate-180" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const idx = btsGallery.findIndex(i => i.id === lightboxItem.id);
                    const nextIdx = (idx + 1) % btsGallery.length;
                    setLightboxItem(btsGallery[nextIdx]);
                  }}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all shadow-lg"
                  aria-label="Next photo"
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all z-10"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BehindTheScenes;
