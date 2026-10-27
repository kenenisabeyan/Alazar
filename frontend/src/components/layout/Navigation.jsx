import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Download,
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
import { navigateToSection } from '../../utils/navigation';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > 25;
    }
    return false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);
  const hoverTimeoutRef = React.useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMouseEnter = (name) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredNav(name);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredNav(null);
    }, 160);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 25;
      setIsScrolled(scrolled);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (window.lenis && typeof window.lenis.on === 'function') {
      window.lenis.on('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (window.lenis && typeof window.lenis.off === 'function') {
        window.lenis.off('scroll', handleScroll);
      }
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedSection(null);
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

  /**
   * Complete list of site pages and their respective page sections
   * Displayed with expandable dropdowns in both Drawer menu and Desktop navbar
   */
  const navSections = [
    {
      name: 'Home',
      path: '/',
      subLinks: [
        { name: 'Home Overview', path: '/' },
        { name: 'Featured Film Showreel', path: '/#showreel' },
        { name: 'Color Grading Showcase', path: '/#colorgrading' },
        { name: 'Selected Works Spread', path: '/#projects' },
        { name: 'Director Profile Snapshot', path: '/#about-snapshot' },
        { name: 'Project Rate Calculator', path: '/#calculator' },
        { name: 'Client Testimonials', path: '/#testimonials' },
      ],
    },
    {
      name: 'Portfolio',
      path: '/portfolio',
      subLinks: [
        { name: 'All Featured Projects', path: '/portfolio' },
        { name: 'Commercial & Video Work', path: '/portfolio?cat=video#portfolio-grid' },
        { name: 'Brand Graphic Design & 3D', path: '/portfolio?cat=design#portfolio-grid' },
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
        { name: 'Interactive Cost Calculator', path: '/services#calculator' },
        { name: 'Frequently Asked Questions', path: '/services#faq' },
      ],
    },
    {
      name: 'About',
      path: '/about',
      subLinks: [
        { name: 'All About Alazar', path: '/about' },
        { name: 'Story & Background', path: '/about#story' },
        { name: 'Career Timeline', path: '/about#timeline' },
        { name: 'Studio Gear & Cameras', path: '/about#gear' },
        { name: 'Skills & Tech Stack', path: '/about#skills' },
        { name: 'Behind The Scenes', path: '/about#bts' },
      ],
    },
    {
      name: 'Behind The Scenes',
      path: '/about#bts',
    },
    {
      name: 'Contact',
      path: '/contact',
      subLinks: [
        { name: 'Contact Overview & Channels', path: '/contact' },
        { name: 'Send Project Inquiry Form', path: '/contact#contact-form' },
        { name: 'Direct Email & Phone Info', path: '/contact#contact-info' },
      ],
    },
  ];

  const isActive = (p) =>
    p === '/' ? location.pathname === '/' : location.pathname.startsWith(p);

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    navigateToSection(navigate, path);
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

  /* Clean icon button styling with background and subtle border */
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

          {/* ── Center Header Navigation Links ── */}
          <AnimatePresence>
            {isScrolled && (
              <motion.nav
                key="desktop-header-nav"
                initial={{ opacity: 0, y: -14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:flex items-center gap-2 lg:gap-5 p-0 bg-transparent border-none shadow-none select-none"
                aria-label="Main Navigation"
              >
                {navSections
                  .filter((item) => item.name !== 'Behind The Scenes')
                  .map((link) => {
                    const active = isActive(link.path);
                    const hasSubLinks = link.subLinks && link.subLinks.length > 0;
                    const isHovered = hoveredNav === link.name;
                    const displayName = link.name.replace(' Us', '');

                    return (
                      <div
                        key={link.name}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(link.name)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <button
                          type="button"
                          onClick={() => handleNavClick(link.path)}
                          className={`relative px-3 py-1.5 text-[11px] lg:text-xs font-black tracking-widest uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 select-none bg-transparent border-none shadow-none ${
                            active
                              ? 'text-[#6B1D2F] dark:text-[#E28D99]'
                              : 'text-[#44403C] dark:text-[#E7DFE1] hover:text-[#6B1D2F] dark:hover:text-[#E28D99]'
                          }`}
                        >
                          <span>{displayName}</span>
                          {hasSubLinks && (
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setHoveredNav((prev) => (prev === link.name ? null : link.name));
                              }}
                              className="p-0.5 transition-colors cursor-pointer"
                              title={`${displayName} sections`}
                            >
                              <ChevronDown
                                size={12}
                                className={`transition-transform duration-200 ${
                                  isHovered ? 'rotate-180 opacity-100' : 'opacity-60'
                                } ${active ? 'text-[#6B1D2F] dark:text-[#E28D99]' : 'text-[#6B1D2F] dark:text-[#C59A9F]'}`}
                              />
                            </span>
                          )}
                        </button>

                        {/* Dropdown Menu for Page Sections on Hover / Toggle */}
                        <AnimatePresence>
                          {hasSubLinks && isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.96 }}
                              transition={{ duration: 0.18, ease: 'easeOut' }}
                              className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 w-64 select-none pointer-events-auto"
                            >
                              <div className="bg-white dark:bg-[#1C0B0E] backdrop-blur-3xl border border-[#C59A9F]/35 dark:border-white/12 rounded-none p-2.5 shadow-[0_20px_50px_rgba(107,29,47,0.22)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
                                <div className="text-[10px] font-black uppercase tracking-widest text-[#6B1D2F] dark:text-[#E28D99] px-3 py-1.5 border-b border-[#C59A9F]/20 dark:border-white/10 flex items-center justify-between">
                                  <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-none bg-[#6B1D2F] dark:bg-[#E28D99]" />
                                    {displayName} Sections
                                  </span>
                                  <span className="text-[9px] font-bold text-[#A89597]">Jump to</span>
                                </div>
                                <div className="py-1 space-y-0.5">
                                  {link.subLinks.map((sub) => (
                                    <button
                                      key={sub.name}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setHoveredNav(null);
                                        handleNavClick(sub.path);
                                      }}
                                      className="w-full text-left px-3 py-2 rounded-none text-xs font-semibold text-[#1C1917] dark:text-[#F5F0F1] hover:bg-gradient-to-r hover:from-[#6B1D2F]/12 hover:to-transparent hover:text-[#6B1D2F] dark:hover:text-white transition-all flex items-center justify-between group cursor-pointer"
                                    >
                                      <span className="truncate pr-2">{sub.name}</span>
                                      <ArrowRight
                                        size={12}
                                        className="opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#6B1D2F] dark:text-[#E28D99] flex-shrink-0"
                                      />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
              </motion.nav>
            )}
          </AnimatePresence>

          {/* ── The Two Icons + Desktop CTA: Theme Toggle + Menu Hamburger Drawer Opener ─────────── */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Desktop Hire Me CTA visible when scrolled */}
            <AnimatePresence>
              {isScrolled && (
                <motion.button
                  key="header-hire-btn"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleNavClick('/contact')}
                  className="hidden xl:inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-none bg-gradient-to-r from-[#6B1D2F] via-[#7B1B32] to-[#8B1E3F] hover:from-[#7B1B32] hover:to-[#9B2247] text-white text-xs font-black tracking-widest uppercase shadow-[0_4px_18px_rgba(107,29,47,0.32)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Hire Me</span>
                  <ArrowUpRight size={13} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* 1. Theme toggle icon */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-none flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 ${iconBtn}`}
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
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-none flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 ${iconBtn}`}
              aria-label="Open navigation menu drawer"
              title="Open Navigation Menu"
            >
              <Menu size={18} className="text-[#1C1917] dark:text-[#F5F0F1] sm:scale-110" />
            </button>
          </div>

        </div>
      </header>

      {/* ── Right-Side Slide-Over Navigation Drawer ───────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop Dimmer & Blur (Soft light dim in bright mode, deep dim in dark mode) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/25 dark:bg-black/75 backdrop-blur-sm cursor-pointer"
              aria-label="Close navigation overlay"
            />

            {/* Slide-In Drawer Panel from Right Edge (Responsive Light & Dark Mode) */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-[68vw] min-w-[215px] max-w-[265px] sm:max-w-[320px] md:max-w-[360px] h-full bg-[#FAFAF9] dark:bg-[#141414] border-l border-[#C59A9F]/30 dark:border-white/[0.08] shadow-2xl flex flex-col overflow-y-auto z-10 select-none scrollbar-none"
              style={{ fontFamily: theme.fonts.body }}
            >
              {/* Clean Top Bar with Close Button at top right */}
              <div className="flex justify-end pt-7 pb-3 px-5 sm:px-6">
                <button
                  id="drawer-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#1C1917]/70 hover:text-[#6B1D2F] dark:text-white/70 dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              {/* Navigation Menu Links (All pages with dropdown section lists) */}
              <nav className="flex-1 px-5 sm:px-6 py-1">
                {navSections.map((item) => {
                  const isExpanded = expandedSection === item.name;
                  const active = isActive(item.path);

                  return (
                    <div key={item.name} className="border-b border-[#C59A9F]/20 dark:border-white/[0.08] py-3.5">
                      <div className="flex items-center justify-between">
                        {/* Title button: directly navigates to the exact page */}
                        <button
                          onClick={() => handleNavClick(item.path)}
                          className={`flex-1 text-left text-[15px] sm:text-base font-normal tracking-wide transition-colors cursor-pointer py-0.5 ${
                            active
                              ? 'text-[#6B1D2F] font-bold dark:text-white dark:font-medium'
                              : 'text-[#1C1917]/90 hover:text-[#6B1D2F] dark:text-[#E5E5E5]/85 dark:hover:text-white'
                          }`}
                        >
                          {item.name}
                        </button>

                        {/* Plus/Minus Toggle: Expands/collapses sections dropdown */}
                        {item.subLinks && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSection(item.name);
                            }}
                            className="p-1.5 text-[#1C1917]/50 hover:text-[#6B1D2F] dark:text-white/50 dark:hover:text-white transition-colors cursor-pointer ml-2 flex-shrink-0"
                            aria-label={`Toggle ${item.name} sub-menu`}
                          >
                            {isExpanded ? (
                              <Minus size={15} strokeWidth={1.5} />
                            ) : (
                              <Plus size={15} strokeWidth={1.5} />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Expandable sub-items (sections inside this page) */}
                      <AnimatePresence>
                        {item.subLinks && isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className="overflow-hidden pl-3 pt-2.5 space-y-2 border-l border-[#6B1D2F]/30 dark:border-white/15 ml-1 my-1.5"
                          >
                            {item.subLinks.map((sub) => (
                              <button
                                key={sub.name}
                                onClick={() => handleNavClick(sub.path)}
                                className="block w-full text-left text-[13px] text-[#44403C]/80 hover:text-[#6B1D2F] dark:text-white/60 dark:hover:text-white transition-colors py-1 font-normal tracking-wide flex items-center justify-between group cursor-pointer"
                              >
                                <span className="group-hover:translate-x-1 transition-transform">
                                  {sub.name}
                                </span>
                                <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 text-[#6B1D2F] dark:text-[#E28D99] transition-opacity" />
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
                    onClick={() => handleNavClick('/contact')}
                    className="w-full py-2.5 px-4 rounded-none bg-[#6B1D2F] hover:bg-[#8B1E3F] text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <span>Hire Me</span>
                    <ArrowUpRight size={13} />
                  </button>

                  <div className="flex items-center justify-between text-xs text-[#1C1917]/50 dark:text-white/50 pt-2 border-t border-[#C59A9F]/20 dark:border-white/[0.08]">
                    <button
                      onClick={handleDownloadCV}
                      className="flex items-center gap-1 text-[11px] text-[#1C1917]/70 hover:text-[#6B1D2F] dark:text-white/70 dark:hover:text-white tracking-wider uppercase font-medium transition-colors cursor-pointer"
                    >
                      <Download size={11} />
                      <span>CV Resume</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href="https://t.me/Onlygrace2"
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-[#1C1917]/60 hover:text-[#6B1D2F] dark:text-white/60 dark:hover:text-white transition-colors"
                        aria-label="Telegram"
                      >
                        <Send size={12} />
                      </a>
                      <a
                        href="https://www.facebook.com/share/169w6Q4Mqo4/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-[#1C1917]/60 hover:text-[#6B1D2F] dark:text-white/60 dark:hover:text-white transition-colors"
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
