import {
  portfolioProjects,
  testimonials as fallbackTestimonials,
  statistics as fallbackStats,
  faqs as fallbackFaqs,
  gearList as fallbackGear,
  awardsList as fallbackAwards,
  skillsMatrix as fallbackSkills,
  careerExperience as fallbackCareer,
  clientLogos as fallbackLogos,
  btsGallery as fallbackBts,
  colorGradingSamples as fallbackColorGrading,
  hiringGuarantees as fallbackGuarantees,
  caseStudies as fallbackCaseStudies,
  socialLinks as fallbackSocial,
  calculatorOptions as fallbackPricing,
} from '../constants';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/** Returns the stored admin JWT token */
const getToken = () => localStorage.getItem('alazar_admin_token');

/**
 * Universal fetch wrapper — throws on non-2xx responses
 * Automatically attaches Authorization header if token exists.
 */
async function request(endpoint, options = {}) {
  const token = getToken();
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };
  // Don't send Content-Type for FormData (multer needs to set boundary)
  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || `Request failed (${response.status})`);
    return data;
  } catch (error) {
    console.warn(`[API] ${endpoint}:`, error.message);
    throw error;
  }
}

const normalizeProject = (p) => {
  if (!p) return p;
  return {
    ...p,
    previewVideoUrl: p.previewVideoUrl || p.preview_video_url || null,
    videoUrl: p.videoUrl || p.video_url || null,
    subCategory: p.subCategory || p.sub_category || (p.category === 'video' ? 'Commercial Video' : 'Graphic Design'),
  };
};

export const api = {
  // ── Auth ──────────────────────────────────────────────────────────────────
  auth: {
    login: async (email, password) => request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
    me: async () => request('/auth/me'),
  },

  // ── Health ────────────────────────────────────────────────────────────────
  health: async () => {
    try { return await request('/health'); }
    catch { return { status: 'offline', database: 'Disconnected' }; }
  },

  // ── Settings ──────────────────────────────────────────────────────────────
  settings: {
    get: async () => {
      try {
        const res = await request('/settings');
        return res.data || {};
      } catch { return {}; }
    },
    update: async (settingsObj) =>
      request('/settings', { method: 'PUT', body: JSON.stringify(settingsObj) }),
  },

  // ── Projects ──────────────────────────────────────────────────────────────
  projects: {
    getAll: async (params = {}) => {
      try {
        const q = new URLSearchParams();
        if (params.category && params.category !== 'all') q.append('category', params.category);
        if (params.featured) q.append('featured', 'true');
        if (params.search)   q.append('search', params.search);
        const res = await request(`/projects${q.toString() ? `?${q}` : ''}`);
        return (res.data || []).map(normalizeProject);
      } catch {
        const items = params.category && params.category !== 'all'
          ? portfolioProjects.filter(p => p.category.toLowerCase() === params.category.toLowerCase())
          : portfolioProjects;
        return items.map(normalizeProject);
      }
    },
    getById: async (id) => {
      try {
        const res = await request(`/projects/${id}`);
        return normalizeProject(res.data);
      } catch {
        return normalizeProject(portfolioProjects.find(p => p.id === parseInt(id, 10)) || null);
      }
    },
    create: async (data) => request('/projects', { method: 'POST', body: JSON.stringify(data) }),
    update: async (id, data) => request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: async (id) => request(`/projects/${id}`, { method: 'DELETE' }),
  },

  // ── Inquiries ─────────────────────────────────────────────────────────────
  inquiries: {
    create: async (data) => request('/inquiries', { method: 'POST', body: JSON.stringify(data) }),
    getAll: async (status) => {
      const res = await request(`/inquiries${status ? `?status=${status}` : ''}`);
      return res.data;
    },
    updateStatus: async (id, status) =>
      request(`/inquiries/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    delete: async (id) => request(`/inquiries/${id}`, { method: 'DELETE' }),
  },

  // ── Quotes ────────────────────────────────────────────────────────────────
  quotes: {
    create: async (data) => request('/quotes', { method: 'POST', body: JSON.stringify(data) }),
    getAll: async () => { const res = await request('/quotes'); return res.data; },
  },

  // ── Testimonials ──────────────────────────────────────────────────────────
  testimonials: {
    getAll: async () => {
      try { const res = await request('/testimonials'); return res.data; }
      catch { return fallbackTestimonials; }
    },
    create: async (data) => request('/testimonials', { method: 'POST', body: JSON.stringify(data) }),
    update: async (id, data) => request(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: async (id) => request(`/testimonials/${id}`, { method: 'DELETE' }),
  },

  // ── Stats ─────────────────────────────────────────────────────────────────
  stats: {
    get: async () => {
      try { const res = await request('/stats'); return res.data; }
      catch { return { stats: fallbackStats, totalProjects: 13, totalInquiries: 0 }; }
    },
    update: async (key, value, label) =>
      request(`/stats/${key}`, { method: 'PUT', body: JSON.stringify({ value, label }) }),
  },

  // ── Blog ──────────────────────────────────────────────────────────────────
  blog: {
    getAll: async (params = {}) => {
      try {
        const q = new URLSearchParams();
        if (params.category) q.append('category', params.category);
        if (params.draft)    q.append('draft', 'true');
        const res = await request(`/blog${q.toString() ? `?${q}` : ''}`);
        return res.data || [];
      } catch { return []; }
    },
    getBySlug: async (slug) => {
      const res = await request(`/blog/${slug}`);
      return res.data;
    },
    create: async (data) => request('/blog', { method: 'POST', body: JSON.stringify(data) }),
    update: async (id, data) => request(`/blog/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: async (id) => request(`/blog/${id}`, { method: 'DELETE' }),
  },

  // ── Media ─────────────────────────────────────────────────────────────────
  media: {
    upload: async (file) => {
      const form = new FormData();
      form.append('file', file);
      return request('/media/upload', { method: 'POST', body: form });
    },
    list: async () => { const res = await request('/media'); return res.data || []; },
    delete: async (filename) => request(`/media/${filename}`, { method: 'DELETE' }),
  },

  // ── Content ───────────────────────────────────────────────────────────────
  content: {
    // FAQs
    getFaqs: async () => {
      try { const r = await request('/content/faqs'); return r.data; }
      catch { return fallbackFaqs.map((f, i) => ({ id: i + 1, question: f.q, answer: f.a })); }
    },
    createFaq:  (d) => request('/content/faqs', { method: 'POST', body: JSON.stringify(d) }),
    updateFaq:  (id, d) => request(`/content/faqs/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
    deleteFaq:  (id) => request(`/content/faqs/${id}`, { method: 'DELETE' }),

    // Gear
    getGear: async () => {
      try { const r = await request('/content/gear'); return r.data; }
      catch {
        return fallbackGear.flatMap(cat => cat.items.map((item, i) => ({
          id: `${cat.category}-${i}`, category: cat.category, name: item.name, description: item.desc
        })));
      }
    },
    createGear:  (d) => request('/content/gear', { method: 'POST', body: JSON.stringify(d) }),
    updateGear:  (id, d) => request(`/content/gear/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
    deleteGear:  (id) => request(`/content/gear/${id}`, { method: 'DELETE' }),

    // Awards
    getAwards: async () => {
      try { const r = await request('/content/awards'); return r.data; }
      catch { return fallbackAwards; }
    },
    createAward:  (d) => request('/content/awards', { method: 'POST', body: JSON.stringify(d) }),
    updateAward:  (id, d) => request(`/content/awards/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
    deleteAward:  (id) => request(`/content/awards/${id}`, { method: 'DELETE' }),

    // Skills
    getSkills: async () => {
      try { const r = await request('/content/skills'); return r.data; }
      catch {
        return fallbackSkills.flatMap(cat => cat.skills.map((s, i) => ({
          id: `${cat.category}-${i}`, category: cat.category, name: s.name, level: s.level, description: s.desc
        })));
      }
    },
    createSkill:  (d) => request('/content/skills', { method: 'POST', body: JSON.stringify(d) }),
    updateSkill:  (id, d) => request(`/content/skills/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
    deleteSkill:  (id) => request(`/content/skills/${id}`, { method: 'DELETE' }),

    // Career
    getCareer: async () => {
      try { const r = await request('/content/career'); return r.data; }
      catch { return fallbackCareer; }
    },
    createCareer:  (d) => request('/content/career', { method: 'POST', body: JSON.stringify(d) }),
    updateCareer:  (id, d) => request(`/content/career/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
    deleteCareer:  (id) => request(`/content/career/${id}`, { method: 'DELETE' }),

    // Client Logos
    getClientLogos: async () => {
      try { const r = await request('/content/client-logos'); return r.data; }
      catch { return fallbackLogos; }
    },
    createClientLogo:  (d) => request('/content/client-logos', { method: 'POST', body: JSON.stringify(d) }),
    updateClientLogo:  (id, d) => request(`/content/client-logos/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
    deleteClientLogo:  (id) => request(`/content/client-logos/${id}`, { method: 'DELETE' }),

    // BTS Gallery
    getBtsGallery: async () => {
      try { const r = await request('/content/bts-gallery'); return r.data; }
      catch { return fallbackBts; }
    },
    createBtsItem:  (d) => request('/content/bts-gallery', { method: 'POST', body: JSON.stringify(d) }),
    updateBtsItem:  (id, d) => request(`/content/bts-gallery/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
    deleteBtsItem:  (id) => request(`/content/bts-gallery/${id}`, { method: 'DELETE' }),

    // Color Grading
    getColorGrading: async () => {
      try { const r = await request('/content/color-grading'); return r.data; }
      catch { return fallbackColorGrading; }
    },
    createColorGrading:  (d) => request('/content/color-grading', { method: 'POST', body: JSON.stringify(d) }),
    updateColorGrading:  (id, d) => request(`/content/color-grading/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
    deleteColorGrading:  (id) => request(`/content/color-grading/${id}`, { method: 'DELETE' }),

    // Hiring Guarantees
    getGuarantees: async () => {
      try { const r = await request('/content/guarantees'); return r.data; }
      catch { return fallbackGuarantees; }
    },
    createGuarantee:  (d) => request('/content/guarantees', { method: 'POST', body: JSON.stringify(d) }),
    updateGuarantee:  (id, d) => request(`/content/guarantees/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
    deleteGuarantee:  (id) => request(`/content/guarantees/${id}`, { method: 'DELETE' }),

    // Pricing
    getPricing: async () => {
      try { const r = await request('/content/pricing'); return r.data; }
      catch { return []; }
    },
    createPricing:  (d) => request('/content/pricing', { method: 'POST', body: JSON.stringify(d) }),
    updatePricing:  (id, d) => request(`/content/pricing/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
    deletePricing:  (id) => request(`/content/pricing/${id}`, { method: 'DELETE' }),

    // Social Links
    getSocialLinks: async () => {
      try { const r = await request('/content/social-links'); return r.data; }
      catch { return fallbackSocial; }
    },
    createSocialLink:  (d) => request('/content/social-links', { method: 'POST', body: JSON.stringify(d) }),
    updateSocialLink:  (id, d) => request(`/content/social-links/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
    deleteSocialLink:  (id) => request(`/content/social-links/${id}`, { method: 'DELETE' }),

    // Page Sections
    getPageSections: async () => {
      try { const r = await request('/content/page-sections'); return r.data; }
      catch { return []; }
    },
    updatePageSection: (id, d) => request(`/content/page-sections/${id}`, { method: 'PUT', body: JSON.stringify(d) }),

    // Case Studies
    getCaseStudies: async () => {
      try { const r = await request('/content/case-studies'); return r.data; }
      catch { return fallbackCaseStudies; }
    },
    createCaseStudy:  (d) => request('/content/case-studies', { method: 'POST', body: JSON.stringify(d) }),
    updateCaseStudy:  (id, d) => request(`/content/case-studies/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
    deleteCaseStudy:  (id) => request(`/content/case-studies/${id}`, { method: 'DELETE' }),
  },
};

export default api;
