import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Download, Sparkles, Moon, Sun, Briefcase, Search } from 'lucide-react';
import Button from '../common/Button';
import { theme } from '../../constants';
import alazarImg from '../../assets/images/alazar.png';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 25);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center py-4 sm:py-5 px-3 sm:px-6 md:px-10">
      <div
        className={`w-full max-w-[1550px] transition-all duration-500 flex justify-between items-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border shadow-xl ${
          isScrolled
            ? 'bg-white/85 dark:bg-[#1E0A0D]/85 backdrop-blur-2xl border-white/80 dark:border-white/10 shadow-2xl shadow-black/[0.08] dark:shadow-black/50'
            : 'bg-white/90 dark:bg-[#1E0A0D]/90 backdrop-blur-xl border-[#C59A9F]/30 dark:border-white/10 shadow-lg'
        }`}
      >
        {/* Brand Logo & Profile Identity */}
        <Link
          to="/"
          className="flex items-center gap-3 text-[#1C1917] dark:text-[#F5F0F1] hover:opacity-95 transition-all text-left group cursor-pointer focus:outline-none select-none"
          style={{ fontFamily: theme.fonts.heading }}
          aria-label="Navigate to Home"
        >
          <div className="relative group-hover:scale-105 transition-transform duration-300">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#6B1D2F] to-[#C59A9F] shadow-md">
              <img
                src={alazarImg}
                alt="Alazar Asdesach"
                className="w-full h-full rounded-full object-cover object-top bg-[#1E0A0D]"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#1E0A0D] shadow-sm animate-pulse" />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black tracking-[0.2em] leading-none text-[#1C1917] dark:text-[#F5F0F1]">
                ALAZAR
              </span>
              <span className="hidden lg:inline-block w-1.5 h-1.5 rounded-full bg-[#6B1D2F] dark:bg-[#8B1E3F]" />
            </div>
            <span className="hidden lg:block text-[9px] font-black uppercase tracking-[0.22em] text-[#78716C] dark:text-[#A89597] mt-0.5">
              DIRECTOR & DESIGNER
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Pill Bar */}
        <nav className="hidden md:flex items-center space-x-1 bg-[#FAFAF9]/90 dark:bg-[#120407]/90 backdrop-blur-2xl rounded-full p-1 border border-[#C59A9F]/25 dark:border-white/10 shadow-inner">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 text-[11px] tracking-[0.2em] uppercase font-black transition-all duration-300 rounded-full flex items-center gap-1.5 select-none ${
                  active
                    ? 'text-white'
                    : 'text-[#78716C] dark:text-[#A89597] hover:text-[#1C1917] dark:hover:text-white'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-gradient-to-r from-[#6B1D2F] via-[#7B1E34] to-[#8B1E3F] rounded-full -z-10 shadow-md shadow-[#6B1D2F]/25"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                {active && <Sparkles size={11} className="text-[#FAFAF9] animate-pulse" />}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Desktop Actions & Quick Utilities */}
        <div className="hidden md:flex items-center gap-2">
          {/* Quick Search / Command Palette Button */}
          <button
            onClick={() => {
              const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true });
              window.dispatchEvent(event);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAFAF9] dark:bg-white/10 border border-[#C59A9F]/40 text-[10px] font-black text-[#78716C] dark:text-[#A89597] hover:text-[#6B1D2F] hover:border-[#6B1D2F] transition-all shadow-sm"
            title="Search & Commands (Ctrl + K)"
          >
            <Search size={12} className="text-[#6B1D2F] dark:text-[#C59A9F]" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-black/40 border border-[#C59A9F]/30 text-[9px] font-mono text-[#6B1D2F] dark:text-[#C59A9F]">⌘K</kbd>
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-[#FAFAF9] dark:bg-white/10 border border-[#C59A9F]/40 dark:border-white/15 text-[#6B1D2F] dark:text-[#F5F0F1] hover:bg-white dark:hover:bg-white/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-sm"
            title={isDarkMode ? 'Switch to Light Canvas' : 'Switch to Dark Mode'}
            aria-label="Toggle visual theme"
          >
            {isDarkMode ? (
              <Sun size={15} className="text-amber-400 animate-spin-slow" />
            ) : (
              <Moon size={15} className="text-[#6B1D2F]" />
            )}
          </button>

          {/* CV Resume Download Button */}
          <button
            onClick={handleDownloadCV}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAFAF9] dark:bg-white/10 border border-[#C59A9F]/40 dark:border-white/15 text-[10.5px] font-black uppercase tracking-wider text-[#1C1917] dark:text-white hover:border-[#6B1D2F] hover:text-[#6B1D2F] hover:bg-white transition-all shadow-sm group"
          >
            <Download size={13} className="text-[#6B1D2F] dark:text-[#C59A9F] group-hover:translate-y-0.5 transition-transform" />
            <span>CV</span>
          </button>

          {/* Luxury Hire Me CTA Button */}
          <button
            onClick={() => navigate('/contact')}
            className="relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6B1D2F] via-[#7B1E34] to-[#8B1E3F] text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#6B1D2F]/25 hover:shadow-xl hover:shadow-[#6B1D2F]/40 hover:scale-[1.02] active:scale-98 transition-all overflow-hidden group border border-white/20"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>HIRE ME</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform ease-out" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-[#FAFAF9] dark:bg-white/10 border border-[#C59A9F]/40 text-[#6B1D2F] dark:text-white flex items-center justify-center shadow-sm"
          >
            {isDarkMode ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} />}
          </button>

          <button
            className="w-10 h-10 rounded-full bg-white dark:bg-white/10 border border-[#C59A9F]/40 dark:border-white/15 text-[#1C1917] dark:text-[#F5F0F1] flex items-center justify-center focus:outline-none shadow-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="md:hidden fixed inset-x-4 top-20 bg-white/95 dark:bg-[#1E0A0D]/95 backdrop-blur-2xl shadow-2xl rounded-3xl p-6 flex flex-col space-y-3 border border-[#C59A9F]/30 dark:border-white/15 z-50"
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-left font-black text-sm uppercase tracking-[0.2em] py-3.5 px-5 rounded-2xl transition-all flex items-center justify-between ${
                    active
                      ? 'bg-gradient-to-r from-[#6B1D2F] to-[#8B1E3F] text-white shadow-lg shadow-[#6B1D2F]/25'
                      : 'text-[#1C1917] dark:text-[#F5F0F1] hover:bg-[#FAFAF9] dark:hover:bg-white/10'
                  }`}
                >
                  <span>{link.name}</span>
                  {active ? <Sparkles size={14} className="text-white" /> : <ArrowUpRight size={14} className="opacity-40" />}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-[#C59A9F]/30 flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full py-3.5 border-[#6B1D2F] dark:border-[#8B1E3F] text-[#6B1D2F] dark:text-[#F5F0F1] rounded-2xl text-xs font-black uppercase tracking-widest"
                onClick={handleDownloadCV}
                icon={<Download size={15} />}
              >
                Download Resume (CV)
              </Button>
              <Button
                variant="primary"
                className="w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest bg-gradient-to-r from-[#6B1D2F] to-[#8B1E3F] text-white shadow-xl shadow-[#6B1D2F]/25"
                onClick={() => navigate('/contact')}
                icon={<ArrowUpRight size={15} />}
              >
                Hire Me / Contact
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;

