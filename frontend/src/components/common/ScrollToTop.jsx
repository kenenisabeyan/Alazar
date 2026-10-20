import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTarget } from '../../utils/navigation';

export default function ScrollToTop() {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace(/^#/, '');

      let attempts = 0;
      const maxAttempts = 15;
      let timer = null;

      const tryScroll = () => {
        const success = scrollToTarget(targetId);
        if (!success && attempts < maxAttempts) {
          attempts += 1;
          const delay = attempts < 4 ? 30 : 60;
          timer = setTimeout(tryScroll, delay);
        }
      };

      // Quick tick to allow DOM elements to mount
      timer = setTimeout(tryScroll, 20);

      return () => {
        if (timer) clearTimeout(timer);
      };
    } else {
      // Instant reset to top on route change without sluggish animation
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(0, { immediate: true });
        window.lenis.resize();
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash, search]);

  return null;
}
