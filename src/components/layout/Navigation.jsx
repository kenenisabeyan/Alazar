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
        ? 'bg-[#1E0A0D]/90 backdrop-blur-md py-4 border-b border-white/5 shadow-2xl' 
        : 'bg-transparent py-7'
    }`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="text-2xl font-bold tracking-widest text-[#F5F0F1] uppercase hover:opacity-90 transition-opacity text-left group" 
          style={{ fontFamily: theme.fonts.heading }}
        >
          Alazar<span className="text-[#8B1E3F] group-hover:text-red-500 transition-colors">.</span>
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.id)} 
              className={`${
                currentPage === link.id ? 'text-[#F5F0F1] font-semibold' : 'text-[#A89597]'
              } font-medium text-xs tracking-widest uppercase hover:text-[#F5F0F1] transition-colors relative group py-1`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 h-[2px] bg-[#8B1E3F] transition-all duration-300 ${
                currentPage === link.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          ))}

          <Button 
            variant="primary" 
            className="text-xs px-6 py-2.5 shadow-md" 
            onClick={() => handleNavClick('contact')}
            icon={<ArrowUpRight size={15} />}
          >
            Contact Me
          </Button>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden text-[#F5F0F1] p-2 focus:outline-none" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1E0A0D]/95 backdrop-blur-xl shadow-2xl py-8 px-8 flex flex-col space-y-6 border-b border-white/10 animate-fade-in">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.id)} 
              className={`text-left font-medium text-xl uppercase tracking-wider py-2 transition-colors ${
                currentPage === link.id ? 'text-[#8B1E3F] font-bold border-l-2 border-[#8B1E3F] pl-3' : 'text-[#F5F0F1] hover:text-[#8B1E3F]'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 border-t border-white/10">
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
