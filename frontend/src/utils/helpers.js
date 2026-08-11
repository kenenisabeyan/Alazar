import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines CSS classnames safely using clsx and tailwind-merge
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Scroll to top of the page smoothly
 */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

/**
 * Format project category names nicely
 */
export function formatCategory(cat) {
  switch (cat) {
    case 'video':
      return 'Video Editing & Motion';
    case 'design':
      return 'Graphic & Brand Design';
    default:
      return 'All Works';
  }
}
