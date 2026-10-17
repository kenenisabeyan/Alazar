import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const SiteSettingsContext = createContext({});

// Comprehensive default settings (mirrors constants/index.js values)
const DEFAULT_SETTINGS = {
  // Profile
  'profile.name':          'Alazar Asdesach',
  'profile.title':         'Video Director & Senior Graphic Designer',
  'profile.tagline':       'Cinematic Videos. Clear Design.',
  'profile.bio':           'Senior video director and graphic designer with 8+ years crafting cinematic edits, bold brand identities, and award-winning visual work for global clients.',
  'profile.avatar':        '',
  'profile.email':         'a.asdesach1@gmail.com',
  'profile.location':      'Global / Remote',
  'profile.availability':  'Available for new projects',
  // Hero
  'hero.headline':         'Cinematic Videos.',
  'hero.headline2':        'Clear Design.',
  'hero.subtext':          'Senior Video Director & Graphic Designer, crafting award-winning visuals for global brands.',
  'hero.cta_primary':      'View My Work',
  'hero.cta_secondary':    'Get in Touch',
  'hero.showreel_url':     '',
  // SEO — Home
  'seo.home.title':        'Alazar Asdesach | Video Director & Senior Graphic Designer',
  'seo.home.description':  'Award-winning video director and senior graphic designer. Cinematic editing, color grading, brand identity, and motion graphics for global brands.',
  'seo.home.og_image':     '',
  // SEO — Portfolio
  'seo.portfolio.title':   'Portfolio | Alazar Asdesach',
  'seo.portfolio.description': 'Explore cinematic video edits, brand identity, illustrations, and design work by Alazar Asdesach.',
  // SEO — About
  'seo.about.title':       'About | Alazar Asdesach',
  'seo.about.description': '8+ years of cinematic video production and senior-level graphic design. Based globally, available remotely.',
  // SEO — Services
  'seo.services.title':    'Services | Alazar Asdesach',
  'seo.services.description': 'Video editing, color grading, brand design, and motion graphics. Remote and on-set available globally.',
  // SEO — Blog
  'seo.blog.title':        'Blog | Alazar Asdesach',
  'seo.blog.description':  'Insights on cinematic video, color grading, graphic design, and the creative process.',
  // Footer
  'footer.tagline':        'Cinematic Videos. Clear Design.',
  'footer.copyright':      '© 2025 Alazar Asdesach. All rights reserved.',
  // Contact
  'contact.email':         'a.asdesach1@gmail.com',
  'contact.response_time': 'Response within 24 hours',
  'contact.whatsapp':      '',
};

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded]  = useState(false);

  useEffect(() => {
    api.settings.get()
      .then(data => {
        if (data && typeof data === 'object') {
          setSettings(prev => ({ ...prev, ...data }));
        }
      })
      .catch(() => { /* use defaults silently */ })
      .finally(() => setIsLoaded(true));
  }, []);

  // Helper: get a setting by key with fallback
  const get = (key, fallback = '') => settings[key] ?? fallback;

  return (
    <SiteSettingsContext.Provider value={{ settings, get, setSettings, isLoaded }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export const useSiteSettings = () => useContext(SiteSettingsContext);
