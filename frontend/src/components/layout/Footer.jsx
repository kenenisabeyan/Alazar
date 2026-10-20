import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Send, ArrowUp, ArrowUpRight } from 'lucide-react';
import { theme } from '../../constants';
import { navigateToSection } from '../../utils/navigation';

export const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(0, { duration: 0.9 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLink = (path) => {
    navigateToSection(navigate, path);
  };

  const socialBtn =
    'w-11 h-11 rounded-full bg-white/80 border border-[#C59A9F] flex items-center justify-center text-[#292524] hover:bg-[#6B1D2F] hover:text-white hover:border-[#6B1D2F] hover:shadow-lg hover:shadow-[#6B1D2F]/20 transition-all duration-300';

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ];

  const expertiseLinks = [
    { label: 'Commercial Editing', path: '/portfolio?cat=video#portfolio-grid' },
    { label: 'Cinematic Color Grading', path: '/#colorgrading' },
    { label: 'Visual Identity & Motion', path: '/services#services-list' },
    { label: '3D Product Visuals', path: '/portfolio?cat=design#portfolio-grid' },
  ];

  return (
    <footer
      className="bg-[#FAFAF9] text-[#1C1917] pt-16 pb-12 relative overflow-hidden border-t border-[#C59A9F]/60"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Watermark */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none select-none text-[160px] md:text-[240px] font-black text-[#6B1D2F]/[0.03] uppercase leading-none tracking-tighter"
        style={{ fontFamily: theme.fonts.heading }}
      >
        Alazar
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 mb-12 sm:mb-20">

          {/* Brand Info */}
          <div className="md:col-span-6 lg:col-span-5 pr-0 md:pr-10">
            <button
              onClick={() => handleLink('/')}
              className="text-3xl font-black tracking-widest text-[#1C1917] uppercase mb-6 hover:opacity-90 transition-opacity flex items-center gap-2 w-fit cursor-pointer"
              style={{ fontFamily: theme.fonts.heading }}
            >
              <span className="w-3 h-3 rounded-full bg-[#6B1D2F]" />
              Alazar<span className="text-[#6B1D2F]">.</span>
            </button>
            <p className="text-[#292524] max-w-md mb-8 mt-4 leading-relaxed font-normal text-sm md:text-base">
              Crafting clean, cinematic video edits, color grading, and high-impact graphic design
              solutions for ambitious creators and global brands.
            </p>
            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ y: -4 }}
                href="https://t.me/Onlygrace2"
                target="_blank"
                rel="noreferrer"
                className={socialBtn}
                title="Telegram @Onlygrace2"
                aria-label="Telegram"
              >
                <Send size={18} className="translate-x-[-1px]" />
              </motion.a>
              <motion.a
                whileHover={{ y: -4 }}
                href="https://www.facebook.com/share/169w6Q4Mqo4/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                className={socialBtn}
                title="Facebook Profile"
                aria-label="Facebook Profile"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                whileHover={{ y: -4 }}
                href="https://www.facebook.com/share/1CMuAk9pQM/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                className={socialBtn}
                title="Facebook Page"
                aria-label="Facebook Page"
              >
                <Facebook size={18} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-wrap gap-12 md:gap-16 md:justify-end">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#6B1D2F] mb-6">
                Navigation
              </h4>
              <ul className="space-y-3.5 text-sm text-[#292524] font-semibold">
                {navLinks.map(({ label, path }) => (
                  <li key={path}>
                    <button
                      onClick={() => handleLink(path)}
                      className="hover:text-[#6B1D2F] transition-colors capitalize tracking-wide flex items-center gap-1.5 group cursor-pointer text-left"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6B1D2F] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#6B1D2F] mb-6">
                Expertise
              </h4>
              <ul className="space-y-3.5 text-sm text-[#292524] font-medium">
                {expertiseLinks.map(({ label, path }) => (
                  <li key={label}>
                    <button
                      onClick={() => handleLink(path)}
                      className="hover:text-[#6B1D2F] transition-colors text-left cursor-pointer group flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6B1D2F] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#6B1D2F] mb-6">
                Availability
              </h4>
              <p className="text-sm text-[#292524] font-medium leading-relaxed mb-4">
                Available Globally (Remote)<br />
                In-Person Consultancy Available
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[11px] font-bold text-emerald-800 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Accepting Q3 Projects
              </div>
              <div>
                <button
                  onClick={() => handleLink('/contact')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#6B1D2F] hover:bg-[#8B1E3F] text-white text-xs font-bold tracking-wider uppercase shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Book Project</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#C59A9F] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#292524] tracking-wider uppercase font-bold">
          <p>&copy; {new Date().getFullYear()} Alazar Asdesach. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2.5 px-5 py-2.5 bg-white border border-[#C59A9F] hover:border-[#6B1D2F] rounded-full text-[#1C1917] hover:text-[#6B1D2F] shadow-sm hover:shadow-md transition-all duration-300 group"
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
