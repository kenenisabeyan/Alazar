import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Download, Sparkles, Moon, Sun } from 'lucide-react';
import { theme } from '../../constants';
import alazarImg from '../../assets/images/alazar.png';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (p) =>
    p === '/' ? location.pathname === '/' : location.pathname.startsWith(p);

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
     • High-contrast frosted dark pill dock — crystal clear text visibility at all times
  ───────────────────────────────────────────────────────────────────────── */
  const navWrapCls = isScrolled
    ? 'bg-[#1E0A0D]/85 backdrop-blur-2xl border border-white/[0.12] shadow-2xl shadow-[#1E0A0D]/60 rounded-full py-2.5 sm:py-3'
    : 'bg-[#1E0A0D]/75 backdrop-blur-xl border border-white/10 shadow-lg shadow-[#1E0A0D]/25 rounded-full py-3';

  /* Link text color — crisp high-contrast off-white over dark pill dock */
  const linkBase = 'text-[#F5F0F1]/80 hover:text-white transition-all duration-200 font-extrabold';
  const linkActive = 'text-white font-extrabold';

  /* Icon button base — subtle frosted pill button */
  const iconBtn = isScrolled
    ? 'bg-white/[0.08] border border-white/[0.15] hover:bg-white/[0.14] text-[#F5F0F1]'
    : 'bg-white/[0.05] border border-white/15 hover:bg-white/[0.10] text-[#F5F0F1]';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-3 sm:py-4 px-3 sm:px-6 md:px-10 transition-all duration-500">

      <div className={`w-full max-w-[1550px] flex items-center justify-between gap-4 px-5 sm:px-7 transition-all duration-500 ${navWrapCls}`}>

        {/* ── Brand mark ────────────────────────────────────────────────── */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none select-none flex-shrink-0"
          aria-label="Home"
          style={{ fontFamily: theme.fonts.heading }}
        >
          <div className="relative group-hover:scale-105 transition-transform duration-300">
            <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#6B1D2F] to-[#C59A9F] shadow-lg shadow-[#6B1D2F]/30">
              <img
                src={alazarImg}
                alt="Alazar"
                className="w-full h-full rounded-full object-cover object-top"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#1E0A0D] animate-pulse" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base sm:text-lg font-black tracking-[0.22em] text-[#F5F0F1]">
              ALAZAR
            </span>
            <span className="hidden lg:block text-[9.5px] font-black uppercase tracking-[0.2em] text-[#C59A9F] mt-0.5">
              DIRECTOR & DESIGNER
            </span>
          </div>
        </Link>

        {/* ── Desktop nav pill ──────────────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-0.5 bg-white/[0.07] backdrop-blur-xl rounded-full px-2 py-1.5 border border-white/[0.10]">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 text-[11px] tracking-[0.2em] uppercase font-black rounded-full flex items-center gap-1.5 select-none transition-all duration-250 ${active ? linkActive : linkBase
                  }`}
              >
                {active && (
                  <motion.div
                    layoutId="navActivePill"
                    className="absolute inset-0 bg-[#6B1D2F] rounded-full -z-10 shadow-md shadow-[#6B1D2F]/40"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                {active && <Sparkles size={10} className="text-[#C59A9F] animate-pulse flex-shrink-0" />}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* ── Desktop right actions ─────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${iconBtn}`}
            aria-label="Toggle theme"
          >
            {isDarkMode
              ? <Sun size={14} className="text-amber-400" />
              : <Moon size={14} className="text-[#C59A9F]" />}
          </button>

          {/* CV download */}
          <button
            onClick={handleDownloadCV}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10.5px] font-black uppercase tracking-wider transition-all ${iconBtn}`}
          >
            <Download size={13} className="text-[#C59A9F]" />
            CV
          </button>

          {/* Hire Me CTA */}
          <button
            onClick={() => navigate('/contact')}
            className="relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#6B1D2F] hover:bg-[#8B1E3F] text-[#F5F0F1] text-[11px] font-black uppercase tracking-[0.18em] shadow-lg shadow-[#6B1D2F]/35 hover:shadow-xl hover:shadow-[#6B1D2F]/50 hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden group border border-white/15"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              HIRE ME
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
            {/* Shimmer sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </button>
        </div>

        {/* ── Mobile controls ───────────────────────────────────────────── */}
        <div className="flex md:hidden items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-full flex items-center justify-center ${iconBtn}`}
          >
            {isDarkMode ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-[#C59A9F]" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBtn}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} className="text-[#F5F0F1]" /> : <Menu size={20} className="text-[#F5F0F1]" />}
          </button>
        </div>

      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="md:hidden fixed inset-x-3 top-20 bg-[#1E0A0D]/96 backdrop-blur-2xl rounded-3xl p-5 flex flex-col gap-2 border border-white/[0.09] shadow-2xl z-50 max-h-[82vh] overflow-y-auto"
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center justify-between py-3.5 px-5 rounded-2xl text-sm font-black uppercase tracking-[0.18em] transition-all ${active
                      ? 'bg-[#6B1D2F] text-[#F5F0F1] shadow-lg shadow-[#6B1D2F]/30'
                      : 'text-[#F5F0F1]/65 hover:text-[#F5F0F1] hover:bg-white/[0.06]'
                    }`}
                >
                  {link.name}
                  {active
                    ? <Sparkles size={14} className="text-[#C59A9F]" />
                    : <ArrowUpRight size={13} className="opacity-40" />}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-white/[0.08] flex flex-col gap-3">
              <button
                onClick={handleDownloadCV}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-[#6B1D2F] text-[#C59A9F] text-[11px] font-black uppercase tracking-widest hover:bg-[#6B1D2F]/20 transition-all"
              >
                <Download size={15} /> Download CV
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#6B1D2F] text-[#F5F0F1] text-[11px] font-black uppercase tracking-widest hover:bg-[#8B1E3F] shadow-lg shadow-[#6B1D2F]/30 transition-all"
              >
                Hire Me <ArrowUpRight size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
