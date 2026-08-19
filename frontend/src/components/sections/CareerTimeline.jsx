import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Download, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';
import { careerExperience, theme } from '../../constants';

export const CareerTimeline = () => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Alazar_Asdesach_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-28 bg-[#F4F0EF] relative" style={{ fontFamily: theme.fonts.body }}>
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#6B1D2F] font-bold block mb-2 flex items-center gap-1.5">
              <Briefcase size={14} className="text-[#6B1D2F]" />
              Work History
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1C1917]" style={{ fontFamily: theme.fonts.heading }}>
              Career <span className="italic font-light text-gradient-burgundy">Experience</span>
            </h2>
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              variant="primary"
              icon={<Download size={16} />}
              onClick={handleDownloadCV}
            >
              Download Full Resume
            </Button>
          </motion.div>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-[#E5D9DB] ml-2 sm:ml-4 md:ml-8 space-y-8 sm:space-y-12 pl-4 sm:pl-6 md:pl-10 text-left">
          {careerExperience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Bullet Dot */}
              <div className="absolute -left-[23px] sm:-left-[31px] md:-left-[47px] top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#6B1D2F] border-4 border-white shadow-md group-hover:scale-125 transition-transform" />

              <div className="bg-[#FAFAF9] p-5 sm:p-8 rounded-2xl border border-[#E5D9DB] shadow-sm hover:border-[#C59A9F] transition-all space-y-4">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-[#1C1917]" style={{ fontFamily: theme.fonts.heading }}>
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-[#6B1D2F]">{exp.company}</p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#78716C]">
                    <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-[#E5D9DB]">
                      <Calendar size={12} className="text-[#6B1D2F]" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-[#E5D9DB]">
                      <MapPin size={12} className="text-[#6B1D2F]" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#78716C] font-light leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Achievements */}
                <div className="pt-3 border-t border-[#E5D9DB]">
                  <p className="text-[11px] uppercase tracking-wider text-[#6B1D2F] font-bold mb-2">Key Achievements:</p>
                  <ul className="space-y-1.5">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-center text-xs text-[#1C1917] font-light">
                        <CheckCircle2 size={13} className="text-[#6B1D2F] mr-2 flex-shrink-0" />
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CareerTimeline;
