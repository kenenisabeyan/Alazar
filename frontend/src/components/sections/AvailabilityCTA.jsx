import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Mail, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import { theme } from '../../utils/constants';

export const AvailabilityCTA = ({ setCurrentPage }) => {
  return (
    <section className="py-20 bg-[#6B1D2F] text-white relative overflow-hidden" style={{ fontFamily: theme.fonts.body }}>
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-white/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10 text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs tracking-widest text-white uppercase font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Q3 / Q4 Contracts & Projects</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight" style={{ fontFamily: theme.fonts.heading }}>
            Have a Video or Design Project in Mind?
          </h2>

          <p className="text-white/80 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Let's create high-impact video edits, color grading, and graphic design that help your brand stand out. Fast turnaround and guaranteed quality.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
            <Button 
              variant="inverted" 
              className="w-full sm:w-auto font-black py-4 px-9 text-xs sm:text-sm tracking-widest uppercase shadow-xl"
              icon={<ArrowRight size={18} />}
              onClick={() => {
                if (setCurrentPage) setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Hire Me Now
            </Button>

            <a 
              href="mailto:hello@alazar.com" 
              className="relative overflow-hidden group w-full sm:w-auto inline-flex justify-center items-center gap-2.5 px-8 py-4 rounded-full border-2 border-white/50 hover:border-white bg-white/10 backdrop-blur-md hover:bg-white hover:text-[#6B1D2F] text-white font-black text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
              <Mail size={18} className="relative z-10" />
              <span className="relative z-10">Email Directly: hello@alazar.com</span>
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default AvailabilityCTA;
