import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Download } from 'lucide-react';
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-nav py-4 shadow-2xl border-b-2 border-[#6B1D2F]/35' 
        : 'bg-transparent py-7 border-b border-transparent'
    }`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Brand Logo & Live Status */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleNavClick('home')} 
            className="text-2xl font-bold tracking-widest text-[#1C1917] uppercase hover:opacity-90 transition-opacity text-left group flex items-center gap-1" 
            style={{ fontFamily: theme.fonts.heading }}
          >
            Alazar<span className="text-[#6B1D2F] group-hover:text-[#8B2440] transition-colors">.</span>
          </button>

          <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 border border-[#E5D9DB] rounded-full text-[10px] uppercase font-bold text-[#6B1D2F] tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Available Q3/Q4
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.id)} 
              className={`${
                currentPage === link.id ? 'text-[#6B1D2F] font-bold' : 'text-[#78716C]'
              } font-medium text-xs tracking-widest uppercase hover:text-[#6B1D2F] transition-colors relative group py-1 flex items-center gap-1.5`}
            >
              {currentPage === link.id && <span className="w-1.5 h-1.5 rounded-full bg-[#6B1D2F]" />}
              {link.name}
              <span className={`absolute bottom-0 left-0 h-[2px] bg-[#6B1D2F] transition-all duration-300 ${
                currentPage === link.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          ))}

          <div className="flex items-center gap-3 ml-4">
            <Button 
              variant="outline" 
              className="text-xs px-5 py-2.5 font-bold tracking-wider uppercase border-[#6B1D2F] text-[#6B1D2F] hover:bg-[#F5E8EA]" 
              onClick={handleDownloadCV}
              icon={<Download size={15} />}
            >
              Download CV
            </Button>

            <Button 
              variant="primary" 
              className="text-xs px-6 py-2.5 shadow-md hover:shadow-[#6B1D2F]/20 font-bold tracking-wider uppercase" 
              onClick={() => handleNavClick('contact')}
              icon={<ArrowUpRight size={15} />}
            >
              Contact Me
            </Button>
          </div>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden text-[#1C1917] p-2 focus:outline-none" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FAFAF9]/98 backdrop-blur-xl shadow-md py-8 px-8 flex flex-col space-y-6 border-b border-[#E5D9DB] animate-fade-in">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.id)} 
              className={`text-left font-medium text-xl uppercase tracking-wider py-2 transition-colors ${
                currentPage === link.id ? 'text-[#6B1D2F] font-bold border-l-2 border-[#6B1D2F] pl-3' : 'text-[#1C1917] hover:text-[#6B1D2F]'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 border-t border-[#E5D9DB] flex flex-col gap-3">
            <Button 
              variant="outline" 
              className="w-full py-3.5 border-[#6B1D2F] text-[#6B1D2F]" 
              onClick={handleDownloadCV}
              icon={<Download size={16} />}
            >
              Download CV
            </Button>
            <Button 
              variant="primary" 
              className="w-full py-3.5" 
              onClick={() => handleNavClick('contact')}
            >
              Contact Me
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
