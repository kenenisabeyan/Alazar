import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTarget } from '../../utils/navigation';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

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
          // Exponential backoff / stepped interval for smooth page mounting
          const delay = attempts < 5 ? 60 : 120;
          timer = setTimeout(tryScroll, delay);
        }
      };

      // Slight initial tick to allow React component mounting
      timer = setTimeout(tryScroll, 30);

      return () => {
        if (timer) clearTimeout(timer);
      };
    } else {
      // No hash: scroll to top
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(0, { immediate: false });
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    }
  }, [pathname, hash]);

  return null;
}
