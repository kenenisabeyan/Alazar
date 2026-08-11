import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-nav py-4 shadow-sm' 
        : 'bg-transparent py-7'
    }`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="text-2xl font-bold tracking-widest text-[#1C1917] uppercase hover:opacity-90 transition-opacity text-left group" 
          style={{ fontFamily: theme.fonts.heading }}
        >
          Alazar<span className="text-[#6B1D2F] group-hover:text-[#8B2440] transition-colors">.</span>
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.id)} 
              className={`${
                currentPage === link.id ? 'text-[#1C1917] font-semibold' : 'text-[#78716C]'
              } font-medium text-xs tracking-widest uppercase hover:text-[#1C1917] transition-colors relative group py-1`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 h-[2px] bg-[#6B1D2F] transition-all duration-300 ${
                currentPage === link.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          ))}

          <Button 
            variant="primary" 
            className="text-xs px-6 py-2.5" 
            onClick={() => handleNavClick('contact')}
            icon={<ArrowUpRight size={15} />}
          >
            Book Now
          </Button>
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
          <div className="pt-4 border-t border-[#E5D9DB]">
            <Button 
              variant="primary" 
              className="w-full py-3.5" 
              onClick={() => handleNavClick('contact')}
            >
              Book Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
