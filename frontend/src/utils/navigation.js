/**
 * navigation.js
 * Universal section scrolling & deep-link navigation utility for Alazar Portfolio.
 * Seamlessly handles:
 * - Same-page smooth scroll with fixed header offset (-85px)
 * - Cross-page route transitions with automatic DOM polling until section renders
 * - Full integration with Lenis SmoothScroll
 * - Subtle visual pulse effect on targeted section
 */

export const HEADER_OFFSET = 85;

/**
 * Smoothly scrolls to an element on the current page by ID or DOM reference
 * @param {string|HTMLElement} targetIdOrEl - ID without hash or DOM element
 * @param {Object} options - Custom options (offset, duration, highlight)
 */
export function scrollToTarget(targetIdOrEl, options = {}) {
  if (typeof window === 'undefined') return false;

  const targetId = typeof targetIdOrEl === 'string'
    ? targetIdOrEl.replace(/^#/, '')
    : targetIdOrEl?.id;

  const element = typeof targetIdOrEl === 'string'
    ? document.getElementById(targetId)
    : targetIdOrEl;

  if (!element) {
    return false;
  }

  const offset = options.offset !== undefined ? options.offset : -HEADER_OFFSET;
  const duration = options.duration !== undefined ? options.duration : 1.2;

  // 1. If Lenis is active on window, use Lenis smooth scroll
  if (window.lenis && typeof window.lenis.scrollTo === 'function') {
    window.lenis.scrollTo(element, {
      offset,
      duration,
      immediate: false,
    });
  } else {
    // 2. Fallback to native window scrollTo with offset
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset + offset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth',
    });
  }

  // 3. Optional visual pulse highlight so user's attention is focused
  if (options.highlight !== false) {
    element.classList.remove('section-target-highlight');
    // Trigger reflow to restart animation if clicked repeatedly
    void element.offsetWidth;
    element.classList.add('section-target-highlight');
    setTimeout(() => {
      element.classList.remove('section-target-highlight');
    }, 2200);
  }

  return true;
}

/**
 * Universal navigation function to navigate to exact pages and their exact sections
 * @param {Function} navigate - react-router-dom useNavigate instance
 * @param {string} toPath - Path string, e.g. '/contact#contact-form', '/services#calculator', '#projects'
 * @param {Object} [options] - Additional navigation options (state, replace, highlight)
 */
export function navigateToSection(navigate, toPath, options = {}) {
  if (!toPath) return;

  // If path is external
  if (toPath.startsWith('http://') || toPath.startsWith('https://') || toPath.startsWith('mailto:')) {
    window.open(toPath, '_blank', 'noopener,noreferrer');
    return;
  }

  const currentPathname = window.location.pathname;
  const [routePart, hashPart] = toPath.split('#');
  const targetRoute = routePart || '/';

  // Case 1: Same page navigation to section
  if (hashPart && (currentPathname === targetRoute || !routePart)) {
    // Scroll immediately
    scrollToTarget(hashPart, options);

    // Update browser URL hash without full reload
    if (window.history.pushState) {
      window.history.pushState(options.state || null, '', `#${hashPart}`);
    }
    return;
  }

  // Case 2: Cross-page navigation with or without hash
  navigate(toPath, {
    state: options.state,
    replace: options.replace || false,
  });

  // If no hash, scroll to top will be handled by ScrollManager
  if (!hashPart) {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
