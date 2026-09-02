import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Download, Sparkles, Moon, Sun } from 'lucide-react';
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
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${isScrolled ? 'py-3 px-4 md:px-8' : 'py-6 px-6 md:px-12'
        }`}
    >
      <div
        className={`w-full max-w-7xl transition-all duration-500 flex justify-between items-center ${isScrolled
          ? 'glass-nav-floating rounded-full px-6 py-3 shadow-2xl'
          : 'bg-transparent py-2'
          }`}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-[#1C1917] dark:text-[#F5F0F1] uppercase hover:opacity-95 transition-all text-left group cursor-pointer focus:outline-none"
          style={{ fontFamily: theme.fonts.heading }}
          aria-label="Navigate to Home"
        >
          <div className="relative group-hover:scale-105 transition-transform duration-300">
            <img
              src={alazarImg}
              alt="Alazar Profile Icon"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover object-top cursor-pointer"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#FAFAF9] dark:ring-[#1E0A0D]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-base sm:text-lg font-black tracking-widest leading-none">ALAZAR</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-2 bg-[#FAFAF9]/75 dark:bg-[#1E0A0D]/75 backdrop-blur-xl rounded-full px-4 py-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 text-xs tracking-widest uppercase font-black transition-all duration-300 ${active
                  ? 'text-[#6B1D2F] dark:text-[#8B1E3F]'
                  : 'text-[#1C1917] dark:text-[#F5F0F1] hover:text-[#6B1D2F]'
                  }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-[#6B1D2F]/10 dark:bg-[#8B1E3F]/30 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {active && <Sparkles size={11} className="text-[#6B1D2F] dark:text-[#8B1E3F]" />}
                  {link.name}
                </span>
              </Link>
            );
          })}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-transparent text-[#6B1D2F] dark:text-[#F5F0F1] hover:bg-[#6B1D2F]/10 dark:hover:bg-white/10 hover:scale-110 transition-all ml-1"
            title={isDarkMode ? 'Switch to Light Canvas' : 'Switch to Dark Burgundy'}
          >
            {isDarkMode ? (
              <Sun size={14} className="text-amber-400" />
            ) : (
              <Moon size={14} className="text-[#6B1D2F]" />
            )}
          </button>

          <div className="flex items-center gap-3 ml-2 pl-1">
            <Button
              variant="ghost"
              className="text-[11px] px-4 py-2 font-black tracking-wider uppercase text-[#6B1D2F] dark:text-[#F5F0F1] hover:bg-[#6B1D2F]/10 dark:hover:bg-white/10 rounded-full transition-all"
              onClick={handleDownloadCV}
              icon={<Download size={13} />}
            >
              CV
            </Button>

            <Button
              variant="primary"
              className="text-[11px] px-5 py-2 shadow-lg hover:shadow-[#6B1D2F]/30 font-black tracking-wider uppercase rounded-full bg-[#6B1D2F] dark:bg-[#8B1E3F] text-white"
              onClick={() => navigate('/contact')}
              icon={<ArrowUpRight size={14} />}
            >
              Hire Me
            </Button>
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#1C1917] dark:text-[#F5F0F1] p-2 focus:outline-none bg-[#FAFAF9]/80 dark:bg-[#1E0A0D]/80 rounded-full"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-x-4 top-20 bg-[#FAFAF9]/95 dark:bg-[#1E0A0D]/95 backdrop-blur-2xl shadow-2xl rounded-3xl p-6 flex flex-col space-y-4 border border-[#C59A9F]/20 dark:border-white/10 z-50"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-left font-bold text-lg uppercase tracking-wider py-3 px-4 rounded-xl transition-all block ${isActive(link.path)
                  ? 'bg-[#6B1D2F] text-white shadow-lg'
                  : 'text-[#1C1917] dark:text-[#F5F0F1] hover:bg-[#6B1D2F]/10 dark:hover:bg-white/10'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#C59A9F]/30 flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full py-3 border-[#6B1D2F] dark:border-[#8B1E3F] text-[#6B1D2F] dark:text-[#F5F0F1] rounded-xl"
                onClick={handleDownloadCV}
                icon={<Download size={16} />}
              >
                Download CV
              </Button>
              <Button
                variant="primary"
                className="w-full py-3 rounded-xl"
                onClick={() => navigate('/contact')}
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
