import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Mail, ArrowUp, Sparkles } from 'lucide-react';
import { theme } from '../../constants';

export const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socialBtn =
    'w-11 h-11 rounded-full bg-white/80 border border-[#E5D9DB] flex items-center justify-center text-[#78716C] hover:bg-[#6B1D2F] hover:text-white hover:border-[#6B1D2F] hover:shadow-lg hover:shadow-[#6B1D2F]/20 transition-all duration-300';

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer
      className="bg-[#FAFAF9] text-[#1C1917] pt-16 pb-12 relative overflow-hidden border-t border-[#E5D9DB]/60"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Watermark */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none select-none text-[160px] md:text-[240px] font-black text-[#6B1D2F]/[0.03] uppercase leading-none tracking-tighter"
        style={{ fontFamily: theme.fonts.heading }}
      >
        Alazar
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

          {/* Brand Info */}
          <div className="md:col-span-6 lg:col-span-5 pr-0 md:pr-10">
            <Link
              to="/"
              className="text-3xl font-black tracking-widest text-[#1C1917] uppercase mb-6 hover:opacity-90 transition-opacity flex items-center gap-2 w-fit"
              style={{ fontFamily: theme.fonts.heading }}
              onClick={scrollToTop}
            >
              <span className="w-3 h-3 rounded-full bg-[#6B1D2F]" />
              Alazar<span className="text-[#6B1D2F]">.</span>
            </Link>
            <p className="text-[#78716C] max-w-md mb-8 mt-4 leading-relaxed font-light text-sm md:text-base">
              Crafting clean, cinematic video edits, color grading, and high-impact graphic design
              solutions for ambitious creators and global brands.
            </p>
            <div className="flex gap-3">
              <motion.a whileHover={{ y: -4 }} href="https://instagram.com" target="_blank" rel="noreferrer" className={socialBtn} aria-label="Instagram">
                <Instagram size={18} />
              </motion.a>
              <motion.a whileHover={{ y: -4 }} href="https://twitter.com" target="_blank" rel="noreferrer" className={socialBtn} aria-label="Twitter">
                <Twitter size={18} />
              </motion.a>
              <motion.a whileHover={{ y: -4 }} href="https://linkedin.com" target="_blank" rel="noreferrer" className={socialBtn} aria-label="LinkedIn">
                <Linkedin size={18} />
              </motion.a>
              <motion.a whileHover={{ y: -4 }} href="mailto:hello@alazar.com" className={socialBtn} aria-label="Email">
                <Mail size={18} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-wrap gap-12 md:gap-16 md:justify-end">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#6B1D2F] mb-6 flex items-center gap-2">
                <Sparkles size={12} /> Navigation
              </h4>
              <ul className="space-y-3.5 text-sm text-[#78716C] font-medium">
                {navLinks.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      onClick={scrollToTop}
                      className="hover:text-[#6B1D2F] transition-colors capitalize tracking-wide flex items-center gap-1.5 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6B1D2F] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#6B1D2F] mb-6 flex items-center gap-2">
                <Sparkles size={12} /> Expertise
              </h4>
              <ul className="space-y-3.5 text-sm text-[#78716C] font-light">
                <li>Commercial Editing</li>
                <li>Cinematic Color Grading</li>
                <li>Visual Identity & Motion</li>
                <li>3D Product Visuals</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#6B1D2F] mb-6 flex items-center gap-2">
                <Sparkles size={12} /> Availability
              </h4>
              <p className="text-sm text-[#78716C] font-light leading-relaxed mb-4">
                Available Globally (Remote)<br />
                In-Person Consultancy Available
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[11px] font-bold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Accepting Q3 Projects
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#E5D9DB] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#78716C] tracking-wider uppercase font-semibold">
          <p>&copy; {new Date().getFullYear()} Alazar Asdesach. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2.5 px-5 py-2.5 bg-white border border-[#E5D9DB] hover:border-[#6B1D2F] rounded-full text-[#1C1917] hover:text-[#6B1D2F] shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <span>Back to top</span>
            <ArrowUp size={14} className="text-[#6B1D2F] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
