import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down'); // 'down' | 'up'
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight > 0) {
        const currentProgress = (currentScrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);

        // Show floating button when scrolled past 250px
        setShowScrollBtn(currentScrollY > 250);

        // Detect scroll direction with threshold
        if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
          if (currentScrollY > lastScrollY.current) {
            setScrollDirection('down');
          } else {
            setScrollDirection('up');
          }
          lastScrollY.current = currentScrollY;
        }

        // Force arrow UP if near bottom of page (>90%)
        if (currentProgress > 90) {
          setScrollDirection('down'); // Point UP to go to top
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollClick = () => {
    const targetTop = (scrollDirection === 'down' || scrollProgress > 90) ? 0 : document.documentElement.scrollHeight;
    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(targetTop, { duration: 0.9 });
    } else {
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    }
  };

  const isPointingUp = scrollDirection === 'down' || scrollProgress > 90;

  return (
    <>
      {/* Top Hairline Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[10000] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#6B1D2F] via-[#C59A9F] to-[#8B1E3F] transition-all duration-150 ease-out shadow-sm shadow-[#6B1D2F]/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Dynamic Directional Floating Button */}
      <AnimatePresence>
        {showScrollBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={handleScrollClick}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9000] p-3.5 sm:p-4 rounded-full bg-gradient-to-tr from-[#6B1D2F] to-[#8B1E3F] text-white shadow-2xl shadow-[#6B1D2F]/40 border border-white/20 hover:scale-110 active:scale-95 transition-all group flex items-center justify-center cursor-pointer select-none"
            aria-label={isPointingUp ? 'Scroll to Top' : 'Scroll to Bottom'}
            title={isPointingUp ? 'Scroll to Top' : 'Scroll to Bottom'}
          >
            {/* Animated Rotating Arrow */}
            <motion.div
              animate={{ rotate: isPointingUp ? 0 : 180 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="flex items-center justify-center"
            >
              <ArrowUp size={18} className="group-hover:scale-110 transition-transform duration-300" />
            </motion.div>

            {/* Subtle percentage badge on hover */}
            <span className="absolute -top-8 bg-black/80 backdrop-blur-md text-[#FAFAF9] border border-white/20 text-[9px] font-mono font-black px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              {Math.round(scrollProgress)}%
            </span>

            {/* Soft pulsing glow ring */}
            <span className="absolute inset-0 rounded-full bg-[#6B1D2F] opacity-0 group-hover:opacity-40 animate-ping -z-10" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollProgress;
