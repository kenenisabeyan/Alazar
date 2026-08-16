import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Download, Sparkles } from 'lucide-react';
import Button from '../common/Button';
import { theme } from '../../utils/constants';

export const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Services', id: 'services' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
      isScrolled 
        ? 'py-3 px-4 md:px-8' 
        : 'py-6 px-6 md:px-12'
    }`}>
      <div className={`w-full max-w-7xl transition-all duration-500 flex justify-between items-center ${
        isScrolled 
          ? 'glass-nav-floating rounded-full px-6 py-3 shadow-2xl' 
          : 'bg-transparent py-2'
      }`}>
        
        {/* Brand Logo & Live Status */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleNavClick('home')} 
            className="text-xl md:text-2xl font-black tracking-widest text-[#1C1917] uppercase hover:opacity-90 transition-all text-left group flex items-center gap-1.5" 
            style={{ fontFamily: theme.fonts.heading }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#6B1D2F] group-hover:scale-125 transition-transform" />
            Alazar<span className="text-[#6B1D2F] group-hover:text-[#8B2440] transition-colors">.</span>
          </button>

          <span className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1 bg-white/80 backdrop-blur-md border border-[#C59A9F]/40 rounded-full text-[10px] uppercase font-bold text-[#6B1D2F] tracking-wider shadow-sm shimmer-border">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Available Q3/Q4
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.id)} 
                className={`relative px-4 py-2 text-xs tracking-widest uppercase font-bold transition-all duration-300 ${
                  isActive ? 'text-[#6B1D2F]' : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-[#F5E8EA] border border-[#C59A9F]/50 rounded-full -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {isActive && <Sparkles size={11} className="text-[#6B1D2F]" />}
                  {link.name}
                </span>
              </button>
            );
          })}

          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-[#E5D9DB]">
            <Button 
              variant="outline" 
              className="text-[11px] px-4 py-2 font-extrabold tracking-wider uppercase border-[#6B1D2F] text-[#6B1D2F] hover:bg-[#F5E8EA] rounded-full" 
              onClick={handleDownloadCV}
              icon={<Download size={13} />}
            >
              CV
            </Button>

            <Button 
              variant="primary" 
              className="text-[11px] px-5 py-2 shadow-lg hover:shadow-[#6B1D2F]/25 font-extrabold tracking-wider uppercase rounded-full" 
              onClick={() => handleNavClick('contact')}
              icon={<ArrowUpRight size={14} />}
            >
              Hire Me
            </Button>
          </div>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden text-[#1C1917] p-2 focus:outline-none bg-white/80 rounded-full border border-[#E5D9DB]" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-x-4 top-20 bg-[#FAFAF9]/95 backdrop-blur-2xl shadow-2xl rounded-3xl p-6 flex flex-col space-y-4 border border-[#C59A9F]/40 z-50"
          >
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.id)} 
                className={`text-left font-bold text-lg uppercase tracking-wider py-3 px-4 rounded-xl transition-all ${
                  currentPage === link.id 
                    ? 'bg-[#6B1D2F] text-white shadow-lg' 
                    : 'text-[#1C1917] hover:bg-[#F5E8EA]'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 border-t border-[#E5D9DB] flex flex-col gap-3">
              <Button 
                variant="outline" 
                className="w-full py-3 border-[#6B1D2F] text-[#6B1D2F] rounded-xl" 
                onClick={handleDownloadCV}
                icon={<Download size={16} />}
              >
                Download CV
              </Button>
              <Button 
                variant="primary" 
                className="w-full py-3 rounded-xl" 
                onClick={() => handleNavClick('contact')}
              >
                Contact Me
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;

