export type ProjectCategory = 'all' | 'video' | 'design';

export interface Project {
  id: number | string;
  title: string;
  category: 'video' | 'design' | 'Showreel';
  client: string;
  thumbnail: string;
  videoUrl?: string | null;
  previewVideoUrl?: string | null;
  description: string;
  role?: string;
  deliverables?: string[];
  year?: string;
}

export interface Statistic {
  value: string;
  label: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface ServiceOffering {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  type: 'remote' | 'in-person';
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  projectType: string;
  budget: string;
  details: string;
}

export interface ThemeConfig {
  colors: {
    background: string;
    cardBg: string;
    accent: string;
    text: string;
    textMuted: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}
