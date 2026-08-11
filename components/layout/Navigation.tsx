'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Button from '../common/Button';
import { theme } from '@/utils/constants';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-nav py-4 shadow-sm' 
        : 'bg-transparent py-7'
    }`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="text-2xl font-bold tracking-widest text-charcoal uppercase hover:opacity-90 transition-opacity text-left group" 
          style={{ fontFamily: theme.fonts.heading }}
        >
          Alazar<span className="text-burgundy group-hover:text-burgundy-light transition-colors">.</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`${
                  isActive ? 'text-charcoal font-semibold' : 'text-slate'
                } font-medium text-xs tracking-widest uppercase hover:text-charcoal transition-colors relative group py-1`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-burgundy transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            );
          })}

          <Button 
            variant="primary" 
            className="text-xs px-6 py-2.5 shadow-burgundy-sm" 
            href="/contact"
            icon={<ArrowUpRight size={15} />}
            data-cursor="pointer"
          >
            Book Now
          </Button>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden text-charcoal p-2 focus:outline-none" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-canvas/98 backdrop-blur-xl shadow-md py-8 px-8 flex flex-col space-y-6 border-b border-border animate-fade-up">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left font-medium text-xl uppercase tracking-wider py-2 transition-colors ${
                  isActive ? 'text-burgundy font-bold border-l-2 border-burgundy pl-3' : 'text-charcoal hover:text-burgundy'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-border">
            <Button 
              variant="primary" 
              className="w-full py-3.5" 
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
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
