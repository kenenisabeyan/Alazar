import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Film, Layout, User, Send, Download, Moon, Sun, Calculator, Command, X, ArrowRight, Sliders, Camera, Clapperboard, HelpCircle } from 'lucide-react';
import { navigateToSection } from '../../utils/navigation';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const commandItems = [
    {
      id: 'nav-home',
      label: 'Go to Home Page',
      category: 'Navigation',
      icon: User,
      action: () => navigateToSection(navigate, '/'),
    },
    {
      id: 'nav-about',
      label: 'Go to About & Biography',
      category: 'Navigation',
      icon: User,
      action: () => navigateToSection(navigate, '/about'),
    },
    {
      id: 'nav-portfolio',
      label: 'Browse Portfolio Archive',
      category: 'Navigation',
      icon: Film,
      action: () => navigateToSection(navigate, '/portfolio'),
    },
    {
      id: 'nav-services',
      label: 'Services & Offerings',
      category: 'Navigation',
      icon: Layout,
      action: () => navigateToSection(navigate, '/services'),
    },
    {
      id: 'nav-contact',
      label: 'Hire Me / Contact Form',
      category: 'Navigation',
      icon: Send,
      action: () => navigateToSection(navigate, '/contact'),
    },
    {
      id: 'sec-colorgrading',
      label: 'Color Grading Showcase & Sliders',
      category: 'Sections',
      icon: Sliders,
      action: () => navigateToSection(navigate, '/#colorgrading'),
    },
    {
      id: 'sec-showreel',
      label: 'Watch Cinematic Showreel',
      category: 'Sections',
      icon: Clapperboard,
      action: () => navigateToSection(navigate, '/#showreel'),
    },
    {
      id: 'sec-gear',
      label: 'Studio Gear & Cameras',
      category: 'Sections',
      icon: Camera,
      action: () => navigateToSection(navigate, '/about#gear'),
    },
    {
      id: 'sec-bts',
      label: 'Behind The Scenes Reel',
      category: 'Sections',
      icon: Film,
      action: () => navigateToSection(navigate, '/about#bts'),
    },
    {
      id: 'sec-faq',
      label: 'Frequently Asked Questions (FAQ)',
      category: 'Sections',
      icon: HelpCircle,
      action: () => navigateToSection(navigate, '/services#faq'),
    },
    {
      id: 'filter-video',
      label: 'Filter Works: Video Editing & Grading',
      category: 'Portfolio',
      icon: Film,
      action: () => navigateToSection(navigate, '/portfolio?cat=video#portfolio-grid'),
    },
    {
      id: 'filter-design',
      label: 'Filter Works: Graphic Design & Branding',
      category: 'Portfolio',
      icon: Layout,
      action: () => navigateToSection(navigate, '/portfolio?cat=design#portfolio-grid'),
    },
    {
      id: 'action-calculator',
      label: 'Interactive Project Budget Calculator',
      category: 'Actions',
      icon: Calculator,
      action: () => navigateToSection(navigate, '/services#calculator'),
    },
    {
      id: 'proj-kenenisa',
      label: 'Kenenisa Media Group · Brand Showcase',
      keywords: 'kenenisa beyan addis ababa commercial video production',
      category: 'Projects',
      icon: Film,
      action: () => navigateToSection(navigate, '/portfolio#portfolio-grid'),
    },
    {
      id: 'case-kenenisa',
      label: 'Case Study: Kenenisa Media Group (4.8M+ Views)',
      keywords: 'kenenisa beyan case study addis ababa metrics engagement',
      category: 'Case Studies',
      icon: Clapperboard,
      action: () => navigateToSection(navigate, '/#casestudies'),
    },
    {
      id: 'test-kenenisa',
      label: 'Client Testimonial: Kenenisa Beyan (Creative Director)',
      keywords: 'kenenisa beyan testimonial review addis ababa client quote',
      category: 'Testimonials',
      icon: HelpCircle,
      action: () => navigateToSection(navigate, '/#testimonials'),
    },
    {
      id: 'action-download-cv',
      label: 'Download Resume (CV)',
      category: 'Actions',
      icon: Download,
      action: () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Alazar_Asdesach_Resume.pdf';
        link.click();
      },
    },
  ];

  const filteredItems = commandItems.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.label.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.keywords && item.keywords.toLowerCase().includes(q))
    );
  });

  const handleSelect = (item) => {
    item.action();
    setIsOpen(false);
    setQuery('');
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleArrowKeys = (e) => {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-20 sm:pt-28 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#1E0A0D]/75 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        />

        {/* Command Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="relative w-full max-w-2xl bg-white border border-[#C59A9F]/40 rounded-3xl shadow-2xl overflow-hidden z-10 border-t-4 border-t-[#6B1D2F]"
          onKeyDown={handleArrowKeys}
        >
          {/* Header Search Input */}
          <div className="flex items-center px-6 py-4 border-b border-[#C59A9F]/30 bg-[#FAFAF9]">
            <Search size={18} className="text-[#6B1D2F] mr-3 flex-shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command or search (e.g. Kenenisa, Portfolio, Video, Contact)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-[#1C1917] placeholder-[#292524]/60 font-semibold text-sm focus:outline-none"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white border border-[#C59A9F]/40 text-[#292524] hover:text-[#6B1D2F] flex items-center justify-center ml-2 shadow-sm transition-all"
            >
              <X size={14} />
            </button>
          </div>

          {/* Items List */}
          <div className="max-h-[380px] overflow-y-auto p-3 space-y-1">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-[#292524] text-sm font-semibold">
                No matching commands found for "{query}"
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full px-4 py-3 rounded-xl text-left transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#6B1D2F] to-[#8B1E3F] text-white shadow-md'
                        : 'text-[#1C1917] hover:bg-[#FAFAF9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#FAFAF9] text-[#6B1D2F] border border-[#C59A9F]/30'
                      }`}>
                        <Icon size={15} />
                      </div>
                      <div>
                        <p className="text-xs font-black tracking-tight">{item.label}</p>
                        <p className={`text-[10px] font-semibold ${isSelected ? 'text-white/90' : 'text-[#292524]'}`}>
                          {item.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-white' : 'opacity-0 group-hover:opacity-100 text-[#6B1D2F]'}`}>
                        Select
                      </span>
                      <ArrowRight size={14} className={isSelected ? 'text-white' : 'text-[#6B1D2F] opacity-0 group-hover:opacity-100'} />
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-6 py-3 bg-[#FAFAF9] border-t border-[#C59A9F]/30 flex items-center justify-between text-[10px] text-[#292524] font-black uppercase tracking-wider">
            <div className="flex items-center gap-3">
              <span>↑↓ to navigate</span>
              <span>↵ to select</span>
              <span>ESC to exit</span>
            </div>
            <div className="flex items-center gap-1 text-[#6B1D2F]">
              <Command size={11} />
              <span>Command Palette</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
