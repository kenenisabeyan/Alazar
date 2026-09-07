import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Film, Layout, User, Send, Download, Moon, Sun, Calculator, Command, X, ArrowRight, Sparkles } from 'lucide-react';

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
      label: 'Go to Home',
      category: 'Navigation',
      icon: User,
      action: () => navigate('/'),
    },
    {
      id: 'nav-about',
      label: 'Go to About & Philosophy',
      category: 'Navigation',
      icon: User,
      action: () => navigate('/about'),
    },
    {
      id: 'nav-portfolio',
      label: 'Browse Portfolio Archive',
      category: 'Navigation',
      icon: Film,
      action: () => navigate('/portfolio'),
    },
    {
      id: 'nav-services',
      label: 'Services & Pricing',
      category: 'Navigation',
      icon: Layout,
      action: () => navigate('/services'),
    },
    {
      id: 'nav-contact',
      label: 'Hire Me / Contact Brief',
      category: 'Navigation',
      icon: Send,
      action: () => navigate('/contact'),
    },
    {
      id: 'filter-video',
      label: 'Filter Works: Video Editing & Grading',
      category: 'Portfolio',
      icon: Film,
      action: () => navigate('/portfolio?category=video'),
    },
    {
      id: 'filter-design',
      label: 'Filter Works: Graphic Design & Branding',
      category: 'Portfolio',
      icon: Layout,
      action: () => navigate('/portfolio?category=design'),
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
    {
      id: 'action-[#calculator]',
      label: 'Project Budget Estimator',
      category: 'Actions',
      icon: Calculator,
      action: () => {
        navigate('/services');
        setTimeout(() => {
          const el = document.getElementById('project-calculator');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      },
    },
  ];

  const filteredItems = commandItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

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
              placeholder="Type a command or search (e.g. Portfolio, Resume, Video)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-[#1C1917] placeholder-[#78716C] font-semibold text-sm focus:outline-none"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white border border-[#C59A9F]/40 text-[#78716C] hover:text-[#6B1D2F] flex items-center justify-center ml-2"
            >
              <X size={14} />
            </button>
          </div>

          {/* Items List */}
          <div className="max-h-[380px] overflow-y-auto p-3 space-y-1">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-[#78716C] text-sm font-medium">
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
                    className={`w-full px-4 py-3 rounded-2xl text-left transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#6B1D2F] to-[#8B1E3F] text-white shadow-md'
                        : 'text-[#1C1917] hover:bg-[#FAFAF9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#FAFAF9] text-[#6B1D2F] border border-[#C59A9F]/30'
                      }`}>
                        <Icon size={15} />
                      </div>
                      <div>
                        <p className="text-xs font-black tracking-tight">{item.label}</p>
                        <p className={`text-[10px] font-medium ${isSelected ? 'text-white/80' : 'text-[#78716C]'}`}>
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
          <div className="px-6 py-3 bg-[#FAFAF9] border-t border-[#C59A9F]/30 flex items-center justify-between text-[10px] text-[#78716C] font-bold uppercase tracking-wider">
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
