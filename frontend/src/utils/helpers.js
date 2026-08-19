import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes safely (clsx + tailwind-merge)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Scroll to the top of the page smoothly
 */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Map a project category slug to a readable label
 */
export function formatCategory(cat) {
  switch (cat) {
    case 'video': return 'Video Editing & Motion';
    case 'design': return 'Graphic & Brand Design';
    default: return 'All Works';
  }
}

/**
 * Format a number as USD currency string
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
