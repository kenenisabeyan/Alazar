import {
  portfolioProjects,
  testimonials as fallbackTestimonials,
  statistics as fallbackStats,
} from '../constants';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Universal fetch wrapper — throws on non-2xx responses
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Request failed (${response.status})`);
    }
    return data;
  } catch (error) {
    console.warn(`[API] ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  // ── Health ───────────────────────────────────────────────────────────────
  health: async () => {
    try {
      return await request('/health');
    } catch {
      return { status: 'offline', database: 'Disconnected' };
    }
  },

  // ── Projects ─────────────────────────────────────────────────────────────
  projects: {
    getAll: async (params = {}) => {
      try {
        const q = new URLSearchParams();
        if (params.category && params.category !== 'all') q.append('category', params.category);
        if (params.featured) q.append('featured', 'true');
        if (params.search)   q.append('search', params.search);
        const res = await request(`/projects${q.toString() ? `?${q}` : ''}`);
        return res.data;
      } catch {
        const items = params.category && params.category !== 'all'
          ? portfolioProjects.filter((p) => p.category.toLowerCase() === params.category.toLowerCase())
          : portfolioProjects;
        return items;
      }
    },

    getById: async (id) => {
      try {
        const res = await request(`/projects/${id}`);
        return res.data;
      } catch {
        return portfolioProjects.find((p) => p.id === parseInt(id, 10)) || null;
      }
    },

    create: async (data) =>
      request('/projects', { method: 'POST', body: JSON.stringify(data) }),

    update: async (id, data) =>
      request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

    delete: async (id) =>
      request(`/projects/${id}`, { method: 'DELETE' }),
  },

  // ── Inquiries ─────────────────────────────────────────────────────────────
  inquiries: {
    create: async (data) =>
      request('/inquiries', { method: 'POST', body: JSON.stringify(data) }),

    getAll: async (status) => {
      const res = await request(`/inquiries${status ? `?status=${status}` : ''}`);
      return res.data;
    },

    updateStatus: async (id, status) =>
      request(`/inquiries/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

    delete: async (id) =>
      request(`/inquiries/${id}`, { method: 'DELETE' }),
  },

  // ── Quotes ────────────────────────────────────────────────────────────────
  quotes: {
    create: async (data) =>
      request('/quotes', { method: 'POST', body: JSON.stringify(data) }),

    getAll: async () => {
      const res = await request('/quotes');
      return res.data;
    },
  },

  // ── Testimonials ──────────────────────────────────────────────────────────
  testimonials: {
    getAll: async () => {
      try {
        const res = await request('/testimonials');
        return res.data;
      } catch {
        return fallbackTestimonials;
      }
    },
  },

  // ── Stats ─────────────────────────────────────────────────────────────────
  stats: {
    get: async () => {
      try {
        const res = await request('/stats');
        return res.data;
      } catch {
        return { stats: fallbackStats, totalProjects: 6, totalInquiries: 0 };
      }
    },
  },
};

export default api;
