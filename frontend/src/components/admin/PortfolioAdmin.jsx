import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Film, Layout, Plus, Trash2, Edit2, Check, Save, Layers,
  Search, Eye, Star, ExternalLink, RefreshCw, X, ShieldCheck, Video, Image as ImageIcon
} from 'lucide-react';
import api from '../../api';

export default function PortfolioAdmin() {
  const [activeTab, setActiveTab] = useState('projects');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Modal State
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'video',
    client: '',
    thumbnail: '',
    preview_video_url: '',
    video_url: '',
    description: '',
    role: '',
    deliverables: '',
    year: '2025',
    featured: false
  });

  useEffect(() => {
    fetchPortfolioAdminData();
  }, []);

  const fetchPortfolioAdminData = async () => {
    setLoading(true);
    try {
      const res = await api.portfolio.getAdminFull();
      if (res && res.success) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Failed to load portfolio admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3500);
  };

  const handleOpenProjectModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title || '',
        category: project.category || 'video',
        client: project.client || '',
        thumbnail: project.thumbnail || '',
        preview_video_url: project.preview_video_url || project.previewVideoUrl || '',
        video_url: project.video_url || project.videoUrl || '',
        description: project.description || '',
        role: project.role || '',
        deliverables: Array.isArray(project.deliverables) ? project.deliverables.join(', ') : (project.deliverables || ''),
        year: project.year || '2025',
        featured: !!project.featured
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        category: 'video',
        client: '',
        thumbnail: '/assets/projects/urban-echoes.svg',
        preview_video_url: '',
        video_url: '',
        description: '',
        role: 'Director & Lead Editor',
        deliverables: 'Commercial Reel, Sound Design Mix',
        year: '2025',
        featured: false
      });
    }
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        deliverables: typeof formData.deliverables === 'string'
          ? formData.deliverables.split(',').map(s => s.trim()).filter(Boolean)
          : formData.deliverables
      };

      if (editingProject) {
        const res = await api.portfolio.updateProject(editingProject.id, payload);
        if (res.success) {
          notify('Project updated successfully!');
          setData(prev => ({
            ...prev,
            projects: prev.projects.map(p => p.id === editingProject.id ? res.data : p)
          }));
        }
      } else {
        const res = await api.portfolio.createProject(payload);
        if (res.success) {
          notify('Project created successfully!');
          setData(prev => ({
            ...prev,
            projects: [res.data, ...prev.projects]
          }));
        }
      }
      setProjectModalOpen(false);
    } catch (err) {
      notify('Error saving project: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await api.portfolio.deleteProject(id);
      if (res.success) {
        notify('Project deleted successfully!');
        setData(prev => ({
          ...prev,
          projects: prev.projects.filter(p => p.id !== id)
        }));
      }
    } catch (err) {
      notify('Error deleting project: ' + err.message);
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const res = await api.portfolio.toggleFeatured(id);
      if (res.success) {
        notify('Featured status updated!');
        setData(prev => ({
          ...prev,
          projects: prev.projects.map(p => p.id === id ? res.data : p)
        }));
      }
    } catch (err) {
      notify('Error toggling featured: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-[#292524]">
        <RefreshCw size={28} className="animate-spin mx-auto mb-3 text-[#6B1D2F]" />
        <p className="font-bold text-sm uppercase tracking-widest">Loading Portfolio CMS Dashboard...</p>
      </div>
    );
  }

  const projects = data?.projects || [];
  const filteredProjects = projects.filter(p => {
    const matchesCat = filterCategory === 'all' ? true : (p.category || '').toLowerCase() === filterCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.client && p.client.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Toast Notification */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-[#6B1D2F] text-white text-xs font-black uppercase tracking-wider shadow-lg flex items-center justify-between"
        >
          <span>{message}</span>
          <Check size={16} />
        </motion.div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1E060B] via-[#360F19] to-[#591626] rounded-[2rem] p-8 text-white border border-[#C59A9F]/30 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6B1D2F]/20 blur-3xl rounded-full pointer-events-none" />
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-widest text-[#FAFAF9] mb-3">
            Master Portfolio CMS
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Portfolio Manager</h1>
          <p className="text-xs text-[#E8B4BE] mt-1 font-medium max-w-xl">
            Control all portfolio projects, categories, client case studies, editorial presentation boards, and featured showreels.
          </p>
        </div>

        <button
          onClick={() => handleOpenProjectModal()}
          className="px-6 py-3 rounded-full bg-[#6B1D2F] hover:bg-[#8B1E3F] text-white font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 border border-white/20"
        >
          <Plus size={16} /> Add New Project
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#C59A9F]/30 pb-3">
        {[
          { id: 'projects', label: `Projects (${projects.length})`, icon: Film },
          { id: 'categories', label: 'Categories & Roles', icon: Layers },
          { id: 'presentation', label: 'Presentation Board', icon: Layout },
          { id: 'settings', label: 'Hero & Settings', icon: ShieldCheck }
        ].map(tab => {
          const IconComp = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                active
                  ? 'bg-[#6B1D2F] text-white shadow-md shadow-[#6B1D2F]/25'
                  : 'bg-white text-[#292524] border border-[#C59A9F]/30 hover:text-[#1C1917]'
              }`}
            >
              <IconComp size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Projects Table */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-[#C59A9F]/30 shadow-sm">
            <div className="relative w-full sm:w-80">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#292524]" />
              <input
                type="text"
                placeholder="Search projects (e.g. Kenenisa, Addis Commercial, Habesha)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#FAFAF9] border border-[#C59A9F]/40 rounded-xl text-xs font-semibold text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  filterCategory === 'all' ? 'bg-[#6B1D2F] text-white' : 'bg-[#FAFAF9] text-[#292524] border border-[#C59A9F]/40'
                }`}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => setFilterCategory('video')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  filterCategory === 'video' ? 'bg-[#6B1D2F] text-white' : 'bg-[#FAFAF9] text-[#292524] border border-[#C59A9F]/40'
                }`}
              >
                Video ({projects.filter(p => p.category === 'video').length})
              </button>
              <button
                onClick={() => setFilterCategory('design')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  filterCategory === 'design' ? 'bg-[#6B1D2F] text-white' : 'bg-[#FAFAF9] text-[#292524] border border-[#C59A9F]/40'
                }`}
              >
                Design ({projects.filter(p => p.category === 'design').length})
              </button>
            </div>
          </div>

          {/* Projects Table */}
          <div className="bg-white rounded-3xl border border-[#C59A9F]/30 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAFAF9] border-b border-[#C59A9F]/20 text-[10px] font-black uppercase tracking-widest text-[#292524]">
                  <th className="py-4 px-6">Project</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Client</th>
                  <th className="py-4 px-4">Year</th>
                  <th className="py-4 px-4 text-center">Featured</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C59A9F]/15 text-xs font-medium text-[#1C1917]">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAFAF9]/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#1E060B] overflow-hidden border border-[#C59A9F]/40 flex-shrink-0 flex items-center justify-center text-white">
                          {p.thumbnail ? (
                            <img src={p.thumbnail} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Film size={18} className="text-[#C59A9F]" />
                          )}
                        </div>
                        <div>
                          <p className="font-black text-[#1C1917] text-sm">{p.title}</p>
                          <p className="text-[10px] text-[#292524] font-semibold">{p.role}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        p.category === 'video' ? 'bg-[#6B1D2F]/10 text-[#6B1D2F]' : 'bg-[#1C1917]/10 text-[#1C1917]'
                      }`}>
                        {p.category === 'video' ? <Film size={10} /> : <Layout size={10} />}
                        {p.category}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-bold text-[#292524]">
                      {p.client}
                    </td>

                    <td className="py-4 px-4 font-mono font-bold text-[#1C1917]">
                      {p.year || '2025'}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(p.id)}
                        className={`p-2 rounded-xl border transition-all ${
                          p.featured
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-600'
                            : 'bg-[#FAFAF9] border-[#C59A9F]/30 text-[#292524]'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star size={16} className={p.featured ? 'fill-amber-500' : ''} />
                      </button>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenProjectModal(p)}
                          className="p-2 rounded-xl bg-white border border-[#C59A9F]/40 text-[#1C1917] hover:border-[#6B1D2F] hover:text-[#6B1D2F] transition-all shadow-sm"
                          title="Edit Project"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-2 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 transition-all shadow-sm"
                          title="Delete Project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-[#C59A9F]/40 max-h-[90vh] overflow-y-auto space-y-6"
          >
            <div className="flex justify-between items-center border-b border-[#C59A9F]/20 pb-4">
              <h3 className="text-xl font-black text-[#1C1917]">
                {editingProject ? 'Edit Portfolio Project' : 'Create New Portfolio Project'}
              </h3>
              <button onClick={() => setProjectModalOpen(false)} className="text-[#292524] hover:text-[#6B1D2F]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1C1917] uppercase font-black tracking-wider text-[10px] mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kenenisa Media Brand Film"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>

                <div>
                  <label className="block text-[#1C1917] uppercase font-black tracking-wider text-[10px] mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
                  >
                    <option value="video">Video</option>
                    <option value="design">Design</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1C1917] uppercase font-black tracking-wider text-[10px] mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kenenisa Media Group · Addis Ababa"
                    value={formData.client}
                    onChange={e => setFormData({ ...formData, client: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>

                <div>
                  <label className="block text-[#1C1917] uppercase font-black tracking-wider text-[10px] mb-1">Year</label>
                  <input
                    type="text"
                    placeholder="e.g. 2026"
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#1C1917] uppercase font-black tracking-wider text-[10px] mb-1">Role</label>
                <input
                  type="text"
                  placeholder="e.g. Lead Director & Colorist"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              <div>
                <label className="block text-[#1C1917] uppercase font-black tracking-wider text-[10px] mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Cinematic brand narrative shot in Addis Ababa capturing high-energy urban storytelling..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              <div>
                <label className="block text-[#1C1917] uppercase font-black tracking-wider text-[10px] mb-1">Deliverables (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. 4K Master, Social Cuts, Color Grading LUT"
                  value={formData.deliverables}
                  onChange={e => setFormData({ ...formData, deliverables: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1C1917] uppercase font-black tracking-wider text-[10px] mb-1">Thumbnail Image URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={formData.thumbnail}
                    onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>

                <div>
                  <label className="block text-[#1C1917] uppercase font-black tracking-wider text-[10px] mb-1">Video URL (mp4 / showreel)</label>
                  <input
                    type="text"
                    placeholder="https://...mp4"
                    value={formData.video_url}
                    onChange={e => setFormData({ ...formData, video_url: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={formData.featured}
                  onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded text-[#6B1D2F] focus:ring-[#6B1D2F]"
                />
                <label htmlFor="featuredCheck" className="text-xs font-bold text-[#1C1917]">Feature this project on main grid</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#C59A9F]/20">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#FAFAF9] border border-[#C59A9F]/40 text-[#292524] font-black text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full bg-[#6B1D2F] text-white font-black text-xs uppercase tracking-widest hover:bg-[#8B1E3F] transition-all shadow-md"
                >
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
