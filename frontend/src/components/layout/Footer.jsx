import React from 'react';
import { Instagram, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { theme } from '../../utils/constants';

export const Footer = ({ setCurrentPage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id) => {
    setCurrentPage(id);
    scrollToTop();
  };

  const socialBtn = "w-10 h-10 rounded-full border border-[#E5D9DB] flex items-center justify-center text-[#78716C] hover:bg-[#6B1D2F] hover:text-white hover:border-[#6B1D2F] transition-all";

  return (
    <footer className="bg-[#FAFAF9] text-[#1C1917] pt-24 pb-12 relative" style={{ fontFamily: theme.fonts.body }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-6 lg:col-span-5 pr-0 md:pr-10">
            <button 
              onClick={() => handleNavClick('home')} 
              className="text-3xl font-bold tracking-widest text-[#1C1917] uppercase block mb-6 text-left hover:opacity-90 transition-opacity" 
              style={{ fontFamily: theme.fonts.heading }}
            >
              Alazar<span className="text-[#6B1D2F]">.</span>
            </button>
            <p className="text-[#78716C] max-w-md mb-8 leading-relaxed font-light text-sm md:text-base">
              Professional video editing, color grading, and graphic design services for brands and creative teams.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={socialBtn} aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className={socialBtn} aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={socialBtn} aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="mailto:hello@alazar.com" className={socialBtn} aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-wrap gap-12 md:gap-16 md:justify-end">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#6B1D2F] mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-[#78716C] font-light">
                <li><button onClick={() => handleNavClick('home')} className="hover:text-[#1C1917] transition-colors">Home</button></li>
                <li><button onClick={() => handleNavClick('about')} className="hover:text-[#1C1917] transition-colors">About</button></li>
                <li><button onClick={() => handleNavClick('portfolio')} className="hover:text-[#1C1917] transition-colors">Portfolio</button></li>
                <li><button onClick={() => handleNavClick('services')} className="hover:text-[#1C1917] transition-colors">Services</button></li>
                <li><button onClick={() => handleNavClick('contact')} className="hover:text-[#1C1917] transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#6B1D2F] mb-6">Services</h4>
              <ul className="space-y-4 text-sm text-[#78716C] font-light">
                <li><span className="cursor-default">Commercial Editing</span></li>
                <li><span className="cursor-default">Color Grading</span></li>
                <li><span className="cursor-default">Brand Identity</span></li>
                <li><span className="cursor-default">Motion Design</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#6B1D2F] mb-6">Location</h4>
              <p className="text-sm text-[#78716C] font-light leading-relaxed">
                Available Globally (Remote)<br />
                In-Person Consultancy Available
              </p>
            </div>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-[#E5D9DB] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#78716C] tracking-wider uppercase font-light">
          <p>&copy; {new Date().getFullYear()} Alazar Asdesach. All rights reserved.</p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#1C1917] transition-colors py-1"
          >
            <span>Back to top</span>
            <ArrowUp size={14} className="text-[#6B1D2F]" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
