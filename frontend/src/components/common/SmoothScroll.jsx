import React, { useEffect } from 'react';
import Lenis from 'lenis';

export const SmoothScroll = ({ children }) => {
  useEffect(() => {
    // Add lenis classes to html for correct CSS isolation
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    // Initialize ultra-responsive, high-performance Lenis instance
    const lenis = new Lenis({
      duration: 0.9, // Snappy & responsive (eliminates sluggish lag)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential physics
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      smoothTouch: false, // Native momentum scrolling for zero-lag mobile touch
      autoResize: true,
    });

    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Watch dynamic height changes (accordions, filters, async items) to keep Lenis synchronized
    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
          lenis.resize();
        })
      : null;

    if (resizeObserver && document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
