'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Plus, Trash2, Edit, RefreshCw, Mail, Calculator, Film, Layout, CheckCircle, AlertCircle } from 'lucide-react';
import { Project } from '@/types/portfolio';
import { theme } from '@/utils/constants';
import api, { InquiryItem, QuoteItem } from '@/utils/api';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries' | 'quotes'>('projects');
  const [health, setHealth] = useState<any>({ status: 'checking', database: 'Checking...' });
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // New Project Form State
  const [isCreatingProject, setIsCreatingProject] = useState<boolean>(false);
  const [newProject, setNewProject] = useState<{
    title: string;
    category: 'video' | 'design';
    client: string;
    thumbnail: string;
    previewVideoUrl: string;
    videoUrl: string;
    description: string;
    role: string;
    deliverables: string;
    year: string;
  }>({
    title: '',
    category: 'video',
    client: '',
    thumbnail: 'https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: '',
    videoUrl: '',
    description: '',
    role: 'Lead Director & Editor',
    deliverables: 'Commercial Cut, Social Edits, Sound Mix',
    year: '2025'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const h = await api.health();
      setHealth(h);

      const pList = await api.projects.getAll();
      setProjects(pList);

      const iList = await api.inquiries.getAll();
      setInquiries(iList);

      const qList = await api.quotes.getAll();
      setQuotes(qList);
    } catch (err) {
      console.error('Error loading PERN admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotification = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 4000);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
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
        previewVideoUrl: newProject.previewVideoUrl || null,
        videoUrl: newProject.videoUrl || null,
        description: newProject.description,
        role: newProject.role,
        deliverables: newProject.deliverables.split(',').map((s) => s.trim()),
        year: newProject.year
      });

      setProjects((prev) => [created, ...prev]);
      setIsCreatingProject(false);
      setNewProject({
        title: '',
        category: 'video',
        client: '',
        thumbnail: 'https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        previewVideoUrl: '',
        videoUrl: '',
        description: '',
        role: 'Lead Director & Editor',
        deliverables: 'Commercial Cut, Social Edits, Sound Mix',
        year: '2025'
      });
      showNotification(`Project "${created.title}" successfully added to PostgreSQL!`);
    } catch (err: any) {
      alert(`Error creating project: ${err.message}`);
    }
  };

  const handleDeleteProject = async (id: number | string) => {
    if (!confirm('Are you sure you want to delete this project from PostgreSQL database?')) return;
    try {
      await api.projects.delete(id);
      setProjects((prev) => prev.filter((p) => String(p.id) !== String(id)));
      showNotification('Project deleted from PostgreSQL database.');
    } catch (err: any) {
      alert(`Error deleting project: ${err.message}`);
    }
  };

  const handleDeleteInquiry = async (id: number) => {
    try {
      await api.inquiries.delete(id);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      showNotification('Inquiry removed from database.');
    } catch (err: any) {
      alert(`Error deleting inquiry: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-canvas pt-36 pb-24 text-charcoal">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header & PERN DB Health Status */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-8 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-burgundy/10 border border-burgundy/20 rounded-full text-xs text-burgundy font-medium mb-3">
              <Database size={14} className="animate-pulse" />
              <span>PERN Stack Control Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal" style={{ fontFamily: theme.fonts.heading }}>
              Project & Database <span className="italic font-light text-burgundy">Manager</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-surface p-4 rounded-xl border border-border shadow-card">
            <div className="flex items-center gap-2 text-xs">
              <span className={`w-2.5 h-2.5 rounded-full ${health.status === 'healthy' ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
              <span className="font-semibold uppercase tracking-wider">{health.service || 'PERN API'}</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="text-xs text-slate font-medium">{health.database}</span>
            <button
              onClick={loadData}
              title="Refresh DB"
              className="p-1.5 rounded-lg bg-canvas hover:bg-border transition-colors text-slate hover:text-charcoal"
            >
              <RefreshCw size={14} className={loading ? "animate-spin text-burgundy" : ""} />
            </button>
          </div>
        </div>

        {actionMessage && (
          <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-emerald-600" />
              <span>{actionMessage}</span>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="inline-flex bg-surface p-1.5 rounded-full border border-border shadow-card">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'projects' ? 'bg-burgundy text-white shadow-burgundy-sm' : 'text-slate hover:text-charcoal'
              }`}
            >
              <Film size={14} /> Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'inquiries' ? 'bg-burgundy text-white shadow-burgundy-sm' : 'text-slate hover:text-charcoal'
              }`}
            >
              <Mail size={14} /> Inquiries ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'quotes' ? 'bg-burgundy text-white shadow-burgundy-sm' : 'text-slate hover:text-charcoal'
              }`}
            >
              <Calculator size={14} /> Rate Quotes ({quotes.length})
            </button>
          </div>

          {activeTab === 'projects' && (
            <button
              onClick={() => setIsCreatingProject(!isCreatingProject)}
              className="px-5 py-2.5 rounded-full bg-burgundy text-white text-xs font-semibold uppercase tracking-wider hover:bg-burgundy-soft transition-all flex items-center gap-2 shadow-burgundy-sm"
            >
              <Plus size={16} /> {isCreatingProject ? 'Cancel' : 'Add New Project'}
            </button>
          )}
        </div>

        {/* Create Project Modal / Inline Panel */}
        {isCreatingProject && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleCreateProject}
            className="mb-12 bg-surface p-8 rounded-2xl border-2 border-burgundy shadow-burgundy-sm space-y-6"
          >
            <h3 className="text-xl font-bold text-charcoal border-b border-border pb-3">Create New Project in PostgreSQL</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate block mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cinema Commercial 2025"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full bg-canvas border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-burgundy"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate block mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Productions"
                  value={newProject.client}
                  onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                  className="w-full bg-canvas border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-burgundy"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate block mb-1">Category</label>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                  className="w-full bg-canvas border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-burgundy"
                >
                  <option value="video">Video Editing & Production</option>
                  <option value="design">Brand Identity & Design</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate block mb-1">Thumbnail Image URL</label>
                <input
                  type="url"
                  required
                  value={newProject.thumbnail}
                  onChange={(e) => setNewProject({ ...newProject, thumbnail: e.target.value })}
                  className="w-full bg-canvas border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-burgundy"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate block mb-1">Video Stream / Embed URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://assets.mixkit.co/..."
                  value={newProject.videoUrl}
                  onChange={(e) => setNewProject({ ...newProject, videoUrl: e.target.value })}
                  className="w-full bg-canvas border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-burgundy"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate block mb-1">Year</label>
                <input
                  type="text"
                  value={newProject.year}
                  onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                  className="w-full bg-canvas border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-burgundy"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate block mb-1">Role / Position</label>
              <input
                type="text"
                value={newProject.role}
                onChange={(e) => setNewProject({ ...newProject, role: e.target.value })}
                className="w-full bg-canvas border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-burgundy"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate block mb-1">Deliverables (Comma separated)</label>
              <input
                type="text"
                value={newProject.deliverables}
                onChange={(e) => setNewProject({ ...newProject, deliverables: e.target.value })}
                className="w-full bg-canvas border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-burgundy"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate block mb-1">Description</label>
              <textarea
                rows={3}
                required
                placeholder="Comprehensive description of the project..."
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full bg-canvas border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-burgundy"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreatingProject(false)}
                className="px-5 py-2.5 rounded-lg border border-border text-xs uppercase font-semibold text-slate hover:text-charcoal"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-burgundy text-white text-xs font-bold uppercase tracking-wider shadow-burgundy-sm hover:bg-burgundy-soft"
              >
                Save Project to PostgreSQL
              </button>
            </div>
          </motion.form>
        )}

        {/* Tab 1: Projects Table */}
        {activeTab === 'projects' && (
          <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold text-charcoal">PostgreSQL Projects Table</h2>
              <span className="text-xs text-slate font-medium">{projects.length} Total Records</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-canvas/50 border-b border-border text-xs uppercase tracking-wider text-slate">
                    <th className="py-4 px-6 font-semibold">ID</th>
                    <th className="py-4 px-6 font-semibold">Title</th>
                    <th className="py-4 px-6 font-semibold">Category</th>
                    <th className="py-4 px-6 font-semibold">Client</th>
                    <th className="py-4 px-6 font-semibold">Year</th>
                    <th className="py-4 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-canvas/40 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs text-slate">#{p.id}</td>
                      <td className="py-4 px-6 font-semibold text-charcoal">{p.title}</td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-burgundy/10 text-burgundy border border-burgundy/20">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate">{p.client}</td>
                      <td className="py-4 px-6 text-slate">{p.year || '2025'}</td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete from Database"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Inquiries Table */}
        {activeTab === 'inquiries' && (
          <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold text-charcoal">Submitted Client Inquiries</h2>
              <span className="text-xs text-slate font-medium">{inquiries.length} Total Submissions</span>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-12 text-center text-slate text-sm">
                No inquiries submitted yet. Submit a message on the Contact page to see it here in real-time.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-canvas/50 border-b border-border text-xs uppercase tracking-wider text-slate">
                      <th className="py-4 px-6 font-semibold">ID</th>
                      <th className="py-4 px-6 font-semibold">Name</th>
                      <th className="py-4 px-6 font-semibold">Email</th>
                      <th className="py-4 px-6 font-semibold">Project Type</th>
                      <th className="py-4 px-6 font-semibold">Budget</th>
                      <th className="py-4 px-6 font-semibold">Details</th>
                      <th className="py-4 px-6 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-canvas/40 transition-colors">
                        <td className="py-4 px-6 font-mono text-xs text-slate">#{inq.id}</td>
                        <td className="py-4 px-6 font-semibold text-charcoal">
                          {inq.first_name || inq.firstName} {inq.last_name || inq.lastName}
                        </td>
                        <td className="py-4 px-6 text-slate">{inq.email}</td>
                        <td className="py-4 px-6 text-slate">{inq.project_type || inq.projectType}</td>
                        <td className="py-4 px-6 font-semibold text-burgundy">{inq.budget}</td>
                        <td className="py-4 px-6 text-slate max-w-xs truncate">{inq.details}</td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleDeleteInquiry(inq.id!)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Inquiry"
                          >
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

        {/* Tab 3: Quotes Table */}
        {activeTab === 'quotes' && (
          <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold text-charcoal">Saved Production Rate Quotes</h2>
              <span className="text-xs text-slate font-medium">{quotes.length} Saved Quotes</span>
            </div>

            {quotes.length === 0 ? (
              <div className="p-12 text-center text-slate text-sm">
                No rate quotes logged yet. Calculate a quote on the Services page to see it recorded here.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-canvas/50 border-b border-border text-xs uppercase tracking-wider text-slate">
                      <th className="py-4 px-6 font-semibold">ID</th>
                      <th className="py-4 px-6 font-semibold">Project Type</th>
                      <th className="py-4 px-6 font-semibold">Scope</th>
                      <th className="py-4 px-6 font-semibold">Total Price</th>
                      <th className="py-4 px-6 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm">
                    {quotes.map((q) => (
                      <tr key={q.id} className="hover:bg-canvas/40 transition-colors">
                        <td className="py-4 px-6 font-mono text-xs text-slate">#{q.id}</td>
                        <td className="py-4 px-6 font-semibold text-charcoal">{q.project_type}</td>
                        <td className="py-4 px-6 text-slate">{q.scope}</td>
                        <td className="py-4 px-6 font-bold text-burgundy">${Number(q.total_price).toLocaleString()} USD</td>
                        <td className="py-4 px-6 text-slate">{q.notes}</td>
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
