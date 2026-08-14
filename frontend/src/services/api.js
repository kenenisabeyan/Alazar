import { portfolioProjects, testimonials as fallbackTestimonials, statistics as fallbackStats } from '../utils/constants';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Universal fetch wrapper with error handling and fallback
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }
    return data;
  } catch (error) {
    console.warn(`[API] Error on ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  // Health & Server Status
  health: async () => {
    try {
      return await request('/health');
    } catch {
      return { status: 'offline', database: 'Disconnected' };
    }
  },

  // Projects API
  projects: {
    getAll: async (params = {}) => {
      try {
        const queryParams = new URLSearchParams();
        if (params.category && params.category !== 'all') queryParams.append('category', params.category);
        if (params.featured) queryParams.append('featured', 'true');
        if (params.search) queryParams.append('search', params.search);

        const qs = queryParams.toString() ? `?${queryParams.toString()}` : '';
        const res = await request(`/projects${qs}`);
        return res.data;
      } catch (err) {
        console.warn('[API Projects Fallback] Using local constants.');
        if (params.category && params.category !== 'all') {
          return portfolioProjects.filter((p) => p.category.toLowerCase() === params.category.toLowerCase());
        }
        return portfolioProjects;
      }
    },

    getById: async (id) => {
      try {
        const res = await request(`/projects/${id}`);
        return res.data;
      } catch (err) {
        return portfolioProjects.find((p) => p.id === parseInt(id, 10)) || null;
      }
    },

    create: async (projectData) => {
      return await request('/projects', {
        method: 'POST',
        body: JSON.stringify(projectData),
      });
    },

    update: async (id, projectData) => {
      return await request(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(projectData),
      });
    },

    delete: async (id) => {
      return await request(`/projects/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Inquiries / Contact API
  inquiries: {
    create: async (inquiryData) => {
      return await request('/inquiries', {
        method: 'POST',
        body: JSON.stringify(inquiryData),
      });
    },

    getAll: async (status) => {
      const qs = status ? `?status=${status}` : '';
      const res = await request(`/inquiries${qs}`);
      return res.data;
    },

    updateStatus: async (id, status) => {
      return await request(`/inquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },

    delete: async (id) => {
      return await request(`/inquiries/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Quotes / Rate Calculator API
  quotes: {
    create: async (quoteData) => {
      return await request('/quotes', {
        method: 'POST',
        body: JSON.stringify(quoteData),
      });
    },

    getAll: async () => {
      const res = await request('/quotes');
      return res.data;
    },
  },

  // Testimonials API
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

  // Dynamic Stats API
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
