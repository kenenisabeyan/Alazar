import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowUpRight,
  Download,
  Sparkles,
  Moon,
  Sun,
  Plus,
  Minus,
  Send,
  Facebook,
  Mail,
  ChevronRight,
} from 'lucide-react';
import { theme } from '../../constants';
import alazarImg from '../../assets/images/alazar.png';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedSection(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  };

  const toggleSection = (name) => {
    setExpandedSection((prev) => (prev === name ? null : name));
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const drawerLinks = [
    {
      name: 'About',
      path: '/about',
      subLinks: [
        { name: 'Story & Background', path: '/about#story' },
        { name: 'Career Timeline', path: '/about#timeline' },
        { name: 'Studio Gear & Cameras', path: '/about#gear' },
        { name: 'Skills & Tech Stack', path: '/about#skills' },
        { name: 'Behind The Scenes', path: '/about#bts' },
      ],
    },
    {
      name: 'Portfolio',
      path: '/portfolio',
      subLinks: [
        { name: 'All Featured Projects', path: '/portfolio' },
        { name: 'Commercial & Video', path: '/portfolio?cat=video' },
        { name: 'Graphic Design & 3D', path: '/portfolio?cat=design' },
        { name: 'Color Grading Showcase', path: '/#colorgrading' },
      ],
    },
    {
      name: 'Services',
      path: '/services',
      subLinks: [
        { name: 'All Services & Packages', path: '/services' },
        { name: 'Video Editing & Directing', path: '/services#services-list' },
        { name: 'Why Hire Me & Guarantees', path: '/services#why-hire-me' },
        { name: 'Interactive Cost Calculator', path: '/#calculator' },
        { name: 'Frequently Asked Questions', path: '/services#faq' },
      ],
    },
    {
      name: 'Behind The Scenes',
      path: '/about#bts',
    },
    {
      name: 'Contact Us',
      path: '/contact',
    },
  ];

  const isActive = (p) =>
    p === '/' ? location.pathname === '/' : location.pathname.startsWith(p);

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);

    if (path.includes('?')) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      const targetRoute = route || '/';

      const scrollToTarget = () => {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 180);
      };

      if (location.pathname !== targetRoute) {
        navigate(targetRoute);
        setTimeout(scrollToTarget, 280);
      } else {
        scrollToTarget();
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    const a = document.createElement('a');
    a.href = '/resume.pdf';
    a.download = 'Alazar_Asdesach_Resume.pdf';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  /* ─────────────────────────────────────────────────────────────────────────
     NAV APPEARANCE STATES
     • Completely transparent header — no floating div box containers or dark pills
  ───────────────────────────────────────────────────────────────────────── */
  const headerCls = isScrolled
    ? 'bg-[#FAFAF9]/85 dark:bg-[#1E0A0D]/85 backdrop-blur-md border-b border-[#C59A9F]/20 dark:border-white/10 shadow-sm'
    : 'bg-transparent border-transparent';

  /* Clean round icon button styling without dark container background */
  const iconBtn =
    'bg-white/80 dark:bg-white/[0.08] hover:bg-white dark:hover:bg-white/[0.15] border border-[#C59A9F]/40 dark:border-white/15 text-[#1C1917] dark:text-[#F5F0F1] shadow-sm hover:shadow transition-all';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 pointer-events-none ${headerCls}`}>
        <div className="w-full max-w-[1550px] mx-auto px-3.5 sm:px-8 md:px-12 py-3 sm:py-5 flex items-center justify-between pointer-events-auto">

          {/* ── Brand mark: Alazar Photo & Logo (no box container) ─────────── */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none select-none flex-shrink-0"
            aria-label="Home"
            style={{ fontFamily: theme.fonts.heading }}
          >
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#6B1D2F] to-[#C59A9F] shadow-md shadow-[#6B1D2F]/20">
                <img
                  src={alazarImg}
                  alt="Alazar"
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#1E0A0D] animate-pulse" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base sm:text-xl font-black tracking-[0.16em] sm:tracking-[0.22em] text-[#1C1917] dark:text-[#F5F0F1]">
                ALAZAR
              </span>
              <span className="hidden sm:block text-[9.5px] font-black uppercase tracking-[0.2em] text-[#6B1D2F] dark:text-[#C59A9F] mt-0.5">
                DIRECTOR & DESIGNER
              </span>
            </div>
          </Link>

          {/* ── The Two Icons: Theme Toggle + Menu Drawer Opener ─────────── */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* 1. Theme toggle icon */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 ${iconBtn}`}
              aria-label="Toggle theme"
              title="Toggle dark/light mode"
            >
              {isDarkMode ? (
                <Sun size={16} className="text-amber-400" />
              ) : (
                <Moon size={16} className="text-[#6B1D2F] dark:text-[#C59A9F]" />
              )}
            </button>

            {/* 2. Menu Hamburger icon (triggers slide-over drawer) */}
            <button
              id="menu-hamburger-btn"
              onClick={() => setMobileMenuOpen(true)}
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 ${iconBtn}`}
              aria-label="Open menu drawer"
              title="Open Navigation Menu"
            >
              <Menu size={18} className="text-[#1C1917] dark:text-[#F5F0F1] sm:scale-110" />
            </button>
          </div>

        </div>
      </header>

      {/* ── Right-Side Slide-Over Navigation Drawer (Iceaddis Style) ───────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop Dimmer & Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
              aria-label="Close navigation overlay"
            />

            {/* Slide-In Drawer Panel from Right Edge (matches Iceaddis Image 2 proportion ~68vw on mobile) */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-[68vw] min-w-[215px] max-w-[265px] sm:max-w-[320px] md:max-w-[360px] h-full bg-[#181818] dark:bg-[#141414] border-l border-white/[0.08] shadow-2xl flex flex-col overflow-y-auto z-10 select-none scrollbar-none"
              style={{ fontFamily: theme.fonts.body }}
            >
              {/* Clean Top Bar with ONLY the bare 'X' Close Button at top right (exact match to Image 2) */}
              <div className="flex justify-end pt-7 pb-3 px-5 sm:px-6">
                <button
                  id="drawer-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              {/* Navigation Menu Links (Vertical stack with clean borders matching Image 2) */}
              <nav className="flex-1 px-5 sm:px-6 py-1">
                {/* Home link */}
                <div className="border-b border-white/[0.08] py-3.5">
                  <button
                    onClick={() => handleNavClick('/')}
                    className={`w-full text-left text-[15px] sm:text-base font-normal tracking-wide transition-colors ${
                      location.pathname === '/' ? 'text-white font-medium' : 'text-[#E5E5E5]/85 hover:text-white'
                    }`}
                  >
                    Home
                  </button>
                </div>

                {/* Structured Links (About +, Portfolio +, Services +, etc.) */}
                {drawerLinks.map((item) => {
                  const isExpanded = expandedSection === item.name;
                  const active = isActive(item.path);

                  return (
                    <div key={item.name} className="border-b border-white/[0.08] py-3.5">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => {
                            if (item.subLinks) {
                              toggleSection(item.name);
                            } else {
                              handleNavClick(item.path);
                            }
                          }}
                          className={`text-left text-[15px] sm:text-base font-normal tracking-wide transition-colors ${
                            active ? 'text-white font-medium' : 'text-[#E5E5E5]/85 hover:text-white'
                          }`}
                        >
                          {item.name}
                        </button>

                        {/* Bare subtle '+' / '−' Icon (exact match to Image 2, no circles) */}
                        {item.subLinks && (
                          <button
                            onClick={() => toggleSection(item.name)}
                            className="p-1 text-white/45 hover:text-white transition-colors cursor-pointer"
                            aria-label={`Toggle ${item.name} sub-menu`}
                          >
                            {isExpanded ? (
                              <Minus size={14} strokeWidth={1.5} />
                            ) : (
                              <Plus size={14} strokeWidth={1.5} />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Expandable sub-items */}
                      <AnimatePresence>
                        {item.subLinks && isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className="overflow-hidden pl-3 pt-2.5 space-y-2 border-l border-white/15 ml-1 my-1.5"
                          >
                            {item.subLinks.map((sub) => (
                              <button
                                key={sub.name}
                                onClick={() => handleNavClick(sub.path)}
                                className="block w-full text-left text-[13px] text-white/60 hover:text-white transition-colors py-1 font-normal tracking-wide flex items-center justify-between group"
                              >
                                <span className="group-hover:translate-x-1 transition-transform">
                                  {sub.name}
                                </span>
                                <ChevronRight size={11} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Additional Quick Actions in the menu stream (Hire Me & CV) */}
                <div className="pt-6 pb-8 space-y-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/contact');
                    }}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#6B1D2F] hover:bg-[#8B1E3F] text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Hire Me</span>
                    <ArrowUpRight size={13} />
                  </button>

                  <div className="flex items-center justify-between text-xs text-white/50 pt-2 border-t border-white/[0.08]">
                    <button
                      onClick={handleDownloadCV}
                      className="flex items-center gap-1 text-[11px] text-white/70 hover:text-white tracking-wider uppercase font-medium transition-colors"
                    >
                      <Download size={11} />
                      <span>CV Resume</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href="https://t.me/Onlygrace2"
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-white/60 hover:text-white transition-colors"
                        aria-label="Telegram"
                      >
                        <Send size={12} />
                      </a>
                      <a
                        href="https://www.facebook.com/share/169w6Q4Mqo4/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-white/60 hover:text-white transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </nav>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
