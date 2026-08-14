import { portfolioProjects, testimonials as fallbackTestimonials, statistics as fallbackStats } from './constants';
import { Project, Testimonial, Statistic } from '@/types/portfolio';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Universal fetch wrapper for PERN Express API
 */
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `API error (${response.status})`);
  }

  return data;
}

export interface InquiryItem {
  id?: number;
  first_name?: string;
  firstName?: string;
  last_name?: string;
  lastName?: string;
  email: string;
  project_type?: string;
  projectType?: string;
  budget: string;
  details: string;
  status?: string;
  created_at?: string;
}

export interface QuoteItem {
  id?: number;
  client_name?: string;
  client_email?: string;
  project_type?: string;
  scope?: string;
  addons?: string[];
  total_price?: number;
  notes?: string;
  status?: string;
  created_at?: string;
}

// Map PostgreSQL backend project record (snake_case) to Frontend Project type (camelCase)
function mapBackendProject(p: any): Project {
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    client: p.client,
    thumbnail: p.thumbnail,
    previewVideoUrl: p.preview_video_url || p.previewVideoUrl || null,
    videoUrl: p.video_url || p.videoUrl || null,
    description: p.description,
    role: p.role,
    deliverables: Array.isArray(p.deliverables) ? p.deliverables : [],
    year: p.year || '2025'
  };
}

export const api = {
  // Health & PERN Server Status
  health: async () => {
    try {
      return await request<{ status: string; service: string; database: string }>('/health');
    } catch {
      return { status: 'offline', service: 'Alazar Portfolio PERN Backend', database: 'Disconnected' };
    }
  },

  // Projects API (PERN Database CRUD)
  projects: {
    getAll: async (params?: { category?: string; featured?: boolean; search?: string }): Promise<Project[]> => {
      try {
        const queryParams = new URLSearchParams();
        if (params?.category && params.category !== 'all') queryParams.append('category', params.category);
        if (params?.featured) queryParams.append('featured', 'true');
        if (params?.search) queryParams.append('search', params.search);

        const qs = queryParams.toString() ? `?${queryParams.toString()}` : '';
        const res = await request<{ success: boolean; data: any[] }>(`/projects${qs}`);
        return res.data.map(mapBackendProject);
      } catch (err) {
        console.warn('[PERN API Projects Fallback] Serving memory cache:', err);
        let items = portfolioProjects;
        if (params?.category && params.category !== 'all') {
          items = items.filter((p) => p.category.toLowerCase() === params.category!.toLowerCase());
        }
        return items;
      }
    },

    getById: async (id: number | string): Promise<Project | null> => {
      try {
        const res = await request<{ success: boolean; data: any }>(`/projects/${id}`);
        return mapBackendProject(res.data);
      } catch (err) {
        return portfolioProjects.find((p) => String(p.id) === String(id)) || null;
      }
    },

    create: async (projectData: Partial<Project>): Promise<Project> => {
      const payload = {
        title: projectData.title,
        category: projectData.category,
        client: projectData.client,
        thumbnail: projectData.thumbnail,
        preview_video_url: projectData.previewVideoUrl || null,
        video_url: projectData.videoUrl || null,
        description: projectData.description,
        role: projectData.role,
        deliverables: projectData.deliverables || [],
        year: projectData.year || '2025',
        featured: true
      };
      const res = await request<{ success: boolean; data: any }>('/projects', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      return mapBackendProject(res.data);
    },

    update: async (id: number | string, projectData: Partial<Project>): Promise<Project> => {
      const payload = {
        title: projectData.title,
        category: projectData.category,
        client: projectData.client,
        thumbnail: projectData.thumbnail,
        preview_video_url: projectData.previewVideoUrl,
        video_url: projectData.videoUrl,
        description: projectData.description,
        role: projectData.role,
        deliverables: projectData.deliverables,
        year: projectData.year
      };
      const res = await request<{ success: boolean; data: any }>(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      return mapBackendProject(res.data);
    },

    delete: async (id: number | string): Promise<boolean> => {
      const res = await request<{ success: boolean }>(`/projects/${id}`, {
        method: 'DELETE'
      });
      return res.success;
    }
  },

  // Inquiries / Contact Form API
  inquiries: {
    create: async (inquiryData: any) => {
      const payload = {
        first_name: inquiryData.firstName || inquiryData.first_name,
        last_name: inquiryData.lastName || inquiryData.last_name || '',
        email: inquiryData.email,
        project_type: inquiryData.projectType || inquiryData.project_type,
        budget: inquiryData.budget,
        details: inquiryData.details
      };
      return await request<{ success: boolean; message: string; data: any }>('/inquiries', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    },

    getAll: async (status?: string): Promise<InquiryItem[]> => {
      try {
        const qs = status ? `?status=${status}` : '';
        const res = await request<{ success: boolean; data: InquiryItem[] }>(`/inquiries${qs}`);
        return res.data;
      } catch {
        return [];
      }
    },

    updateStatus: async (id: number, status: string) => {
      return await request<{ success: boolean }>(`/inquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
    },

    delete: async (id: number) => {
      return await request<{ success: boolean }>(`/inquiries/${id}`, {
        method: 'DELETE'
      });
    }
  },

  // Quotes / Rate Calculator API
  quotes: {
    create: async (quoteData: any) => {
      return await request<{ success: boolean; message: string; data: any }>('/quotes', {
        method: 'POST',
        body: JSON.stringify(quoteData)
      });
    },

    getAll: async (): Promise<QuoteItem[]> => {
      try {
        const res = await request<{ success: boolean; data: QuoteItem[] }>('/quotes');
        return res.data;
      } catch {
        return [];
      }
    }
  },

  // Testimonials API
  testimonials: {
    getAll: async (): Promise<Testimonial[]> => {
      try {
        const res = await request<{ success: boolean; data: Testimonial[] }>('/testimonials');
        return res.data;
      } catch {
        return fallbackTestimonials;
      }
    }
  },

  // Dynamic Portfolio Statistics API
  stats: {
    get: async () => {
      try {
        const res = await request<{ success: boolean; data: { stats: Statistic[]; totalProjects: number; totalInquiries: number } }>('/stats');
        return res.data;
      } catch {
        return { stats: fallbackStats, totalProjects: 6, totalInquiries: 0 };
      }
    }
  }
};

export default api;
