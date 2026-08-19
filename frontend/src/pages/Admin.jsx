import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Database, Plus, Trash2, RefreshCw, Mail, Calculator,
  Film, Layout, CheckCircle, Shield,
} from 'lucide-react';
import { theme } from '../constants';
import api from '../api';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('projects');
  const [health, setHealth] = useState({ status: 'checking', database: 'Checking...' });
  const [projects, setProjects] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const [newProject, setNewProject] = useState({
    title: '',
    category: 'video',
    client: '',
    thumbnail: 'https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: '',
    videoUrl: '',
    description: '',
    role: 'Lead Director & Editor',
    deliverables: 'Commercial Cut, Social Edits, Sound Mix',
    year: '2025',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [h, pList, iList, qList] = await Promise.all([
        api.health(),
        api.projects.getAll(),
        api.inquiries.getAll(),
        api.quotes.getAll(),
      ]);
      setHealth(h);
      setProjects(pList);
      setInquiries(iList);
      setQuotes(qList);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const showNotification = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 4000);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.client || !newProject.description) {
      alert('Please fill out title, client, and description.');
      return;
    }
    try {
      const created = await api.projects.create({
        title: newProject.title,
        category: newProject.category,
        client: newProject.client,
        thumbnail: newProject.thumbnail,
        preview_video_url: newProject.previewVideoUrl || null,
        video_url: newProject.videoUrl || null,
        description: newProject.description,
        role: newProject.role,
        deliverables: newProject.deliverables.split(',').map((s) => s.trim()),
        year: newProject.year,
        featured: true,
      });
      setProjects((prev) => [created.data || created, ...prev]);
      setIsCreatingProject(false);
      setNewProject({
        title: '', category: 'video', client: '',
        thumbnail: 'https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        previewVideoUrl: '', videoUrl: '', description: '',
        role: 'Lead Director & Editor',
        deliverables: 'Commercial Cut, Social Edits, Sound Mix', year: '2025',
      });
      showNotification(`Project "${newProject.title}" added to PostgreSQL!`);
    } catch (err) {
      alert(`Error creating project: ${err.message}`);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Delete this project from the database?')) return;
    try {
      await api.projects.delete(id);
      setProjects((prev) => prev.filter((p) => String(p.id) !== String(id)));
      showNotification('Project deleted from PostgreSQL.');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await api.inquiries.delete(id);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      showNotification('Inquiry removed from database.');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const inputCls = 'w-full bg-[#FAFAF9] border border-[#E5D9DB] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#6B1D2F] transition-colors text-[#1C1917]';
  const labelCls = 'text-xs font-bold uppercase tracking-wider text-[#78716C] block mb-1';

  const tabs = [
    { id: 'projects',  label: 'Projects',    icon: <Film size={14} />,      count: projects.length },
    { id: 'inquiries', label: 'Inquiries',   icon: <Mail size={14} />,      count: inquiries.length },
    { id: 'quotes',    label: 'Rate Quotes', icon: <Calculator size={14} />,count: quotes.length },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9] pt-36 pb-24 text-[#1C1917]" style={{ fontFamily: theme.fonts.body }}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-8 border-b border-[#E5D9DB]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6B1D2F]/10 border border-[#6B1D2F]/20 rounded-full text-xs text-[#6B1D2F] font-medium mb-3">
              <Shield size={14} className="animate-pulse" /> PERN Admin Panel
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1C1917]" style={{ fontFamily: theme.fonts.heading }}>
              Project & Database <span className="italic font-light text-[#6B1D2F]">Manager</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#E5D9DB] shadow-sm">
            <div className="flex items-center gap-2 text-xs">
              <span className={`w-2.5 h-2.5 rounded-full ${health.status === 'healthy' ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
              <span className="font-semibold uppercase tracking-wider">PERN API</span>
            </div>
            <div className="h-4 w-px bg-[#E5D9DB]" />
            <span className="text-xs text-[#78716C] font-medium">{health.database}</span>
            <button onClick={loadData} className="p-1.5 rounded-lg bg-[#FAFAF9] hover:bg-[#E5D9DB] transition-colors text-[#78716C] hover:text-[#1C1917]">
              <RefreshCw size={14} className={loading ? 'animate-spin text-[#6B1D2F]' : ''} />
            </button>
          </div>
        </div>

        {/* Notification */}
        {actionMessage && (
          <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl flex items-center gap-2 shadow-sm">
            <CheckCircle size={18} className="text-emerald-600" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="inline-flex bg-white p-1.5 rounded-full border border-[#E5D9DB] shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-[#6B1D2F] text-white shadow-md'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                {tab.icon} {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {activeTab === 'projects' && (
            <button
              onClick={() => setIsCreatingProject(!isCreatingProject)}
              className="px-5 py-2.5 rounded-full bg-[#6B1D2F] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#8B2440] transition-all flex items-center gap-2 shadow-md"
            >
              <Plus size={16} /> {isCreatingProject ? 'Cancel' : 'Add New Project'}
            </button>
          )}
        </div>

        {/* Create Project Form */}
        {isCreatingProject && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleCreateProject}
            className="mb-12 bg-white p-8 rounded-2xl border-2 border-[#6B1D2F] shadow-md space-y-6"
          >
            <h3 className="text-xl font-bold text-[#1C1917] border-b border-[#E5D9DB] pb-3">
              Add New Project to PostgreSQL
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelCls}>Project Title</label>
                <input type="text" required placeholder="e.g. Cinema Commercial 2025" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Client Name</label>
                <input type="text" required placeholder="e.g. Acme Productions" value={newProject.client} onChange={(e) => setNewProject({ ...newProject, client: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Category</label>
                <select value={newProject.category} onChange={(e) => setNewProject({ ...newProject, category: e.target.value })} className={inputCls}>
                  <option value="video">Video Editing & Production</option>
                  <option value="design">Brand Identity & Design</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Thumbnail Image URL</label>
                <input type="url" required value={newProject.thumbnail} onChange={(e) => setNewProject({ ...newProject, thumbnail: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Video URL (Optional)</label>
                <input type="text" placeholder="https://..." value={newProject.videoUrl} onChange={(e) => setNewProject({ ...newProject, videoUrl: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Year</label>
                <input type="text" value={newProject.year} onChange={(e) => setNewProject({ ...newProject, year: e.target.value })} className={inputCls} />
              </div>
            </div>

            <div>
              <label className={labelCls}>Role / Position</label>
              <input type="text" value={newProject.role} onChange={(e) => setNewProject({ ...newProject, role: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Deliverables (comma-separated)</label>
              <input type="text" value={newProject.deliverables} onChange={(e) => setNewProject({ ...newProject, deliverables: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Description</label>
              <textarea rows={3} required placeholder="Project description..." value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} className={inputCls} />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsCreatingProject(false)} className="px-5 py-2.5 rounded-lg border border-[#E5D9DB] text-xs uppercase font-semibold text-[#78716C] hover:text-[#1C1917] transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2.5 rounded-lg bg-[#6B1D2F] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#8B2440] transition-colors shadow-md">
                Save to PostgreSQL
              </button>
            </div>
          </motion.form>
        )}

        {/* Projects Table */}
        {activeTab === 'projects' && (
          <div className="bg-white rounded-2xl border border-[#E5D9DB] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#E5D9DB] flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#1C1917]">PostgreSQL Projects Table</h2>
              <span className="text-xs text-[#78716C] font-medium">{projects.length} Records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#FAFAF9] border-b border-[#E5D9DB] text-xs uppercase tracking-wider text-[#78716C]">
                    <th className="py-4 px-6 font-semibold">ID</th>
                    <th className="py-4 px-6 font-semibold">Title</th>
                    <th className="py-4 px-6 font-semibold">Category</th>
                    <th className="py-4 px-6 font-semibold">Client</th>
                    <th className="py-4 px-6 font-semibold">Year</th>
                    <th className="py-4 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5D9DB] text-sm">
                  {loading ? (
                    [...Array(4)].map((_, i) => (
                      <tr key={i}><td colSpan={6} className="py-4 px-6"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td></tr>
                    ))
                  ) : projects.length === 0 ? (
                    <tr><td colSpan={6} className="py-12 text-center text-[#78716C] text-sm">No projects found.</td></tr>
                  ) : (
                    projects.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAFAF9] transition-colors">
                        <td className="py-4 px-6 font-mono text-xs text-[#78716C]">#{p.id}</td>
                        <td className="py-4 px-6 font-semibold text-[#1C1917]">{p.title}</td>
                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#6B1D2F]/10 text-[#6B1D2F] border border-[#6B1D2F]/20 flex items-center gap-1 w-fit">
                            {p.category === 'video' ? <Film size={10} /> : <Layout size={10} />}
                            {p.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-[#78716C]">{p.client}</td>
                        <td className="py-4 px-6 text-[#78716C]">{p.year || '2025'}</td>
                        <td className="py-4 px-6 text-right">
                          <button onClick={() => handleDeleteProject(p.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Inquiries Table */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-2xl border border-[#E5D9DB] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#E5D9DB] flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#1C1917]">Client Inquiries</h2>
              <span className="text-xs text-[#78716C] font-medium">{inquiries.length} Submissions</span>
            </div>
            {inquiries.length === 0 ? (
              <div className="p-12 text-center text-[#78716C] text-sm">
                No inquiries yet. Submit one on the <strong>Contact</strong> page to see it here.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#FAFAF9] border-b border-[#E5D9DB] text-xs uppercase tracking-wider text-[#78716C]">
                      <th className="py-4 px-6 font-semibold">ID</th>
                      <th className="py-4 px-6 font-semibold">Name</th>
                      <th className="py-4 px-6 font-semibold">Email</th>
                      <th className="py-4 px-6 font-semibold">Project Type</th>
                      <th className="py-4 px-6 font-semibold">Budget</th>
                      <th className="py-4 px-6 font-semibold">Details</th>
                      <th className="py-4 px-6 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5D9DB] text-sm">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-[#FAFAF9] transition-colors">
                        <td className="py-4 px-6 font-mono text-xs text-[#78716C]">#{inq.id}</td>
                        <td className="py-4 px-6 font-semibold text-[#1C1917]">
                          {inq.first_name || inq.firstName} {inq.last_name || inq.lastName}
                        </td>
                        <td className="py-4 px-6 text-[#78716C]">{inq.email}</td>
                        <td className="py-4 px-6 text-[#78716C]">{inq.project_type || inq.projectType}</td>
                        <td className="py-4 px-6 font-semibold text-[#6B1D2F]">{inq.budget}</td>
                        <td className="py-4 px-6 text-[#78716C] max-w-xs truncate">{inq.details}</td>
                        <td className="py-4 px-6 text-right">
                          <button onClick={() => handleDeleteInquiry(inq.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Quotes Table */}
        {activeTab === 'quotes' && (
          <div className="bg-white rounded-2xl border border-[#E5D9DB] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#E5D9DB] flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#1C1917]">Saved Rate Quotes</h2>
              <span className="text-xs text-[#78716C] font-medium">{quotes.length} Quotes</span>
            </div>
            {quotes.length === 0 ? (
              <div className="p-12 text-center text-[#78716C] text-sm">
                No quotes yet. Use the calculator on the <strong>Services</strong> page.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#FAFAF9] border-b border-[#E5D9DB] text-xs uppercase tracking-wider text-[#78716C]">
                      <th className="py-4 px-6 font-semibold">ID</th>
                      <th className="py-4 px-6 font-semibold">Project Type</th>
                      <th className="py-4 px-6 font-semibold">Scope</th>
                      <th className="py-4 px-6 font-semibold">Total Price</th>
                      <th className="py-4 px-6 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5D9DB] text-sm">
                    {quotes.map((q) => (
                      <tr key={q.id} className="hover:bg-[#FAFAF9] transition-colors">
                        <td className="py-4 px-6 font-mono text-xs text-[#78716C]">#{q.id}</td>
                        <td className="py-4 px-6 font-semibold text-[#1C1917]">{q.project_type}</td>
                        <td className="py-4 px-6 text-[#78716C]">{q.scope}</td>
                        <td className="py-4 px-6 font-bold text-[#6B1D2F]">${Number(q.total_price).toLocaleString()} USD</td>
                        <td className="py-4 px-6 text-[#78716C]">{q.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
