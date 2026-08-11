'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { theme } from '@/utils/constants';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-surface-alt text-charcoal pt-24 pb-12 border-t border-border relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-6 lg:col-span-5 pr-0 md:pr-10">
            <Link 
              href="/" 
              className="text-3xl font-bold tracking-widest text-charcoal uppercase block mb-6 text-left hover:opacity-90 transition-opacity" 
              style={{ fontFamily: theme.fonts.heading }}
            >
              Alazar<span className="text-burgundy">.</span>
            </Link>
            <p className="text-slate max-w-md mb-8 leading-relaxed font-light text-sm md:text-base">
              Premium cinematic video editing, color grading, and bespoke graphic design services for ambitious brands demanding creative distinction.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-slate hover:bg-burgundy hover:text-white hover:border-burgundy transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-slate hover:bg-burgundy hover:text-white hover:border-burgundy transition-all"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-slate hover:bg-burgundy hover:text-white hover:border-burgundy transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="mailto:hello@alazar.com" 
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-slate hover:bg-burgundy hover:text-white hover:border-burgundy transition-all"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-wrap gap-12 md:gap-16 md:justify-end">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-burgundy mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-slate font-light">
                <li><Link href="/" className="hover:text-charcoal transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-charcoal transition-colors">About</Link></li>
                <li><Link href="/portfolio" className="hover:text-charcoal transition-colors">Portfolio</Link></li>
                <li><Link href="/services" className="hover:text-charcoal transition-colors">Services</Link></li>
                <li><Link href="/contact" className="hover:text-charcoal transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-burgundy mb-6">Services</h4>
              <ul className="space-y-4 text-sm text-slate font-light">
                <li><span className="hover:text-charcoal transition-colors cursor-default">Commercial Editing</span></li>
                <li><span className="hover:text-charcoal transition-colors cursor-default">Color Grading</span></li>
                <li><span className="hover:text-charcoal transition-colors cursor-default">Brand Identity</span></li>
                <li><span className="hover:text-charcoal transition-colors cursor-default">Motion Design</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-burgundy mb-6">Location</h4>
              <p className="text-sm text-slate font-light leading-relaxed">
                Available Globally (Remote)<br />
                In-Person Consultancy Available
              </p>
            </div>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate tracking-wider uppercase font-light">
          <p>&copy; {new Date().getFullYear()} Alazar Asdesach. All rights reserved.</p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-charcoal transition-colors py-1"
          >
            <span>Back to top</span>
            <ArrowUp size={14} className="text-burgundy" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
