import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function scrollToTop(): void {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

export function formatCategory(cat: string): string {
  switch (cat) {
    case 'video':
      return 'Video Editing & Motion';
    case 'design':
      return 'Graphic & Brand Design';
    default:
      return 'All Works';
  }
}
