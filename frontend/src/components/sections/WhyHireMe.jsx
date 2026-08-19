import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, FileCheck, Music, MessageCircle, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import { hiringGuarantees, theme } from '../../constants';

export const WhyHireMe = () => {
  const navigate = useNavigate();
  const guaranteeIcons = [Clock, FileCheck, MessageCircle, Music];

  return (
    <section className="py-28 bg-[#FAFAF9] relative" style={{ fontFamily: theme.fonts.body }}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold block flex items-center justify-center gap-1.5"
          >
            <ShieldCheck size={14} className="text-[#6B1D2F]" />
            Client Assurance
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#1C1917]"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Why Hire <span className="italic font-light text-[#6B1D2F]">Me?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#78716C] font-light text-base"
          >
            Working with a dedicated professional means high quality, reliable delivery, and zero friction.
          </motion.p>
        </div>

        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {hiringGuarantees.map((item, idx) => {
            const IconComponent = guaranteeIcons[idx % guaranteeIcons.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-2xl border border-[#E5D9DB] shadow-sm hover:border-[#C59A9F] transition-all text-center flex flex-col items-center justify-between"
              >
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#F5E8EA] border border-[#C59A9F]/30 text-[#6B1D2F] flex items-center justify-center mb-6 mx-auto shadow-sm">
                    <IconComponent size={26} />
                  </div>
                  <h4 className="text-lg font-bold text-[#1C1917] mb-2" style={{ fontFamily: theme.fonts.heading }}>
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#78716C] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="w-full mt-6 pt-4 border-t border-[#E5D9DB]/60 flex items-center justify-center gap-1.5 text-[11px] text-[#6B1D2F] font-semibold uppercase tracking-wider">
                  <ShieldCheck size={14} /> Service Standard
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action Bar */}
        <div className="bg-white p-8 md:p-10 rounded-2xl border border-[#E5D9DB] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div>
            <h3 className="text-2xl font-bold text-[#1C1917] mb-1" style={{ fontFamily: theme.fonts.heading }}>
              Ready to Start Your Video or Design Project?
            </h3>
            <p className="text-xs text-[#78716C] font-light">
              Get in touch today to check current availability and receive a custom project estimate.
            </p>
          </div>

          <Button
            variant="primary"
            icon={<ArrowRight size={16} />}
            onClick={() => { navigate('/contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            Start Project Inquiry
          </Button>
        </div>

      </div>
    </section>
  );
};

export default WhyHireMe;
