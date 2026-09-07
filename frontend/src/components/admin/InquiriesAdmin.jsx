import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Phone, Clock, Search, Filter, CheckCircle, Trash2, Edit2, Check,
  Sparkles, RefreshCw, X, ShieldCheck, Tag, ArrowUpRight, Copy, MessageSquare, AlertCircle,
  Download, LayoutGrid, List, Settings, Save, Eye
} from 'lucide-react';
import api from '../../api';

const STATUS_BADGES = {
  new: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
  reviewing: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
  contacted: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
  qualified: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
  won: 'bg-emerald-600 text-white border-emerald-600',
  lost: 'bg-rose-500/10 text-rose-600 border-rose-500/30',
};

const KANBAN_STAGES = [
  { id: 'new', label: 'New Leads', color: 'border-emerald-500' },
  { id: 'reviewing', label: 'Reviewing', color: 'border-blue-500' },
  { id: 'contacted', label: 'Contacted', color: 'border-amber-500' },
  { id: 'qualified', label: 'Qualified', color: 'border-purple-500' },
  { id: 'won', label: 'Won Projects', color: 'border-emerald-600' },
  { id: 'lost', label: 'Lost / Closed', color: 'border-rose-500' },
];

export default function InquiriesAdmin() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // View Mode: 'table' | 'kanban' | 'settings'
  const [viewMode, setViewMode] = useState('table');

  // Lead Details Modal
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  // Contact Page Settings CMS
  const [contactSettings, setContactSettings] = useState({
    hero: {
      eyebrow: "Direct PostgreSQL Sync",
      title: "Let's Build Something Great.",
      description: "Ready to start your next video or design project? Fill out the brief below — your inquiry goes straight into the PERN backend."
    },
    availability: {
      statusText: "Accepting Q3 / Q4 Projects Worldwide",
      isAvailable: true
    },
    metaItems: [
      { id: 1, label: 'Email', value: 'a.asdesach1@gmail.com' },
      { id: 2, label: 'Phone / WhatsApp', value: '+1 (555) 123-4567' },
      { id: 3, label: 'Response Time', value: 'Within 24 hours' }
    ]
  });
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    fetchInquiries();
    fetchContactSettings();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await api.inquiries.getAll();
      setInquiries(data || []);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchContactSettings = async () => {
    try {
      const res = await api.inquiries.getSettings();
      if (res) {
        setContactSettings(prev => ({ ...prev, ...res }));
      }
    } catch (err) {
      console.error('Error fetching contact settings:', err);
    }
  };

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3500);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.inquiries.updateStatus(id, newStatus);
      notify('Inquiry status updated!');
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      notify('Error updating status: ' + err.message);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await api.inquiries.delete(id);
      notify('Inquiry deleted successfully!');
      setInquiries(prev => prev.filter(i => i.id !== id));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
    } catch (err) {
      notify('Error deleting inquiry: ' + err.message);
    }
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await api.inquiries.updateSettings(contactSettings);
      notify('Contact page CMS settings saved!');
    } catch (err) {
      notify('Failed to save settings: ' + err.message);
    } finally {
      setSavingSettings(false);
    }
  };

  const exportToCSV = () => {
    if (inquiries.length === 0) {
      notify('No leads available to export.');
      return;
    }

    const headers = ['Reference Number', 'First Name', 'Last Name', 'Email', 'Project Type', 'Budget', 'Status', 'Submitted Date'];
    const rows = inquiries.map(i => [
      i.reference_number || `INQ-2026-${i.id}`,
      `"${i.first_name || i.firstName || ''}"`,
      `"${i.last_name || i.lastName || ''}"`,
      `"${i.email || ''}"`,
      `"${i.project_type || i.projectType || ''}"`,
      `"${i.budget || ''}"`,
      `"${i.status || 'new'}"`,
      `"${i.created_at ? new Date(i.created_at).toLocaleDateString() : ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `alazar_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify('Leads exported to CSV successfully!');
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-[#78716C]">
        <RefreshCw size={28} className="animate-spin mx-auto mb-3 text-[#6B1D2F]" />
        <p className="font-bold text-sm uppercase tracking-widest">Loading Client Inquiry CRM...</p>
      </div>
    );
  }

  const filteredInquiries = inquiries.filter(i => {
    const matchesStatus = filterStatus === 'all' ? true : i.status === filterStatus;
    const matchesPriority = filterPriority === 'all' ? true : (i.priority || 'medium') === filterPriority;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      (i.first_name && i.first_name.toLowerCase().includes(q)) ||
      (i.last_name && i.last_name.toLowerCase().includes(q)) ||
      (i.email && i.email.toLowerCase().includes(q)) ||
      (i.details && i.details.toLowerCase().includes(q)) ||
      (i.reference_number && i.reference_number.toLowerCase().includes(q))
    );
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const totalCount = inquiries.length;
  const newCount = inquiries.filter(i => i.status === 'new').length;
  const contactedCount = inquiries.filter(i => i.status === 'contacted' || i.status === 'reviewing').length;
  const wonCount = inquiries.filter(i => i.status === 'won').length;

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
            <Sparkles size={11} className="text-[#E8B4BE]" />
            Client Inquiry Pipeline & CRM
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Client Leads & Inquiries</h1>
          <p className="text-xs text-[#C59A9F] mt-1 font-light max-w-xl">
            Track incoming project briefs, lead statuses, reference codes, quote estimations, and communication activity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={exportToCSV}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center gap-2 border border-white/20"
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={fetchInquiries}
            className="px-5 py-2.5 rounded-full bg-[#6B1D2F] hover:bg-[#8B1E3F] text-white font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Inquiries', value: totalCount, sub: 'All recorded leads', color: 'text-[#1C1917]' },
          { label: 'New Leads', value: newCount, sub: 'Requires initial review', color: 'text-emerald-600' },
          { label: 'In Progress', value: contactedCount, sub: 'Contacted / Reviewing', color: 'text-amber-600' },
          { label: 'Won Projects', value: wonCount, sub: 'Converted clients', color: 'text-[#6B1D2F]' }
        ].map((kpi, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white border border-[#C59A9F]/30 shadow-sm flex flex-col justify-between">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#78716C] mb-1">{kpi.label}</p>
            <p className={`text-3xl font-black ${kpi.color}`}>{kpi.value}</p>
            <p className="text-[10px] text-[#78716C] mt-2 font-medium">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* View Mode Switcher & Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-[#C59A9F]/30 shadow-sm">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
              viewMode === 'table' ? 'bg-[#6B1D2F] text-white shadow-md' : 'bg-[#FAFAF9] text-[#78716C] border border-[#C59A9F]/40'
            }`}
          >
            <List size={14} /> Table View
          </button>

          <button
            onClick={() => setViewMode('kanban')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
              viewMode === 'kanban' ? 'bg-[#6B1D2F] text-white shadow-md' : 'bg-[#FAFAF9] text-[#78716C] border border-[#C59A9F]/40'
            }`}
          >
            <LayoutGrid size={14} /> Kanban Board
          </button>

          <button
            onClick={() => setViewMode('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
              viewMode === 'settings' ? 'bg-[#6B1D2F] text-white shadow-md' : 'bg-[#FAFAF9] text-[#78716C] border border-[#C59A9F]/40'
            }`}
          >
            <Settings size={14} /> Contact Page CMS
          </button>
        </div>

        {viewMode !== 'settings' && (
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78716C]" />
              <input
                type="text"
                placeholder="Search by client, email, ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#FAFAF9] border border-[#C59A9F]/40 rounded-xl text-xs font-semibold text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-[#FAFAF9] text-[#1C1917] border border-[#C59A9F]/40"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="reviewing">Reviewing</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        )}
      </div>

      {/* ── MODE 1: TABLE VIEW ────────────────────────────────────────── */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl border border-[#C59A9F]/30 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFAF9] border-b border-[#C59A9F]/20 text-[10px] font-black uppercase tracking-widest text-[#78716C]">
                <th className="py-4 px-6">Reference</th>
                <th className="py-4 px-4">Client Name</th>
                <th className="py-4 px-4">Project Type</th>
                <th className="py-4 px-4">Budget Range</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Submitted</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C59A9F]/15 text-xs font-medium text-[#1C1917]">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#78716C] font-light">
                    No client inquiries match your criteria.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-[#FAFAF9]/80 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-[#6B1D2F]">
                      {inq.reference_number || `INQ-2026-${String(inq.id).padStart(6, '0')}`}
                    </td>

                    <td className="py-4 px-4">
                      <div>
                        <p className="font-black text-[#1C1917] text-sm">
                          {inq.first_name || inq.firstName} {inq.last_name || inq.lastName}
                        </p>
                        <p className="text-[10px] text-[#78716C] font-semibold">{inq.email}</p>
                      </div>
                    </td>

                    <td className="py-4 px-4 uppercase font-bold text-[11px] text-[#78716C]">
                      {inq.project_type || inq.projectType || 'freelance-video'}
                    </td>

                    <td className="py-4 px-4 font-mono font-bold text-[#1C1917]">
                      {inq.budget || '$3k - $5k'}
                    </td>

                    <td className="py-4 px-4">
                      <select
                        value={inq.status || 'new'}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all ${
                          STATUS_BADGES[inq.status] || STATUS_BADGES.new
                        }`}
                      >
                        <option value="new">NEW</option>
                        <option value="reviewing">REVIEWING</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="qualified">QUALIFIED</option>
                        <option value="won">WON</option>
                        <option value="lost">LOST</option>
                      </select>
                    </td>

                    <td className="py-4 px-4 text-[#78716C] text-[11px]">
                      {inq.created_at ? new Date(inq.created_at).toLocaleDateString() : 'Recent'}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="px-3 py-1.5 rounded-xl bg-white border border-[#C59A9F]/40 text-[#1C1917] hover:border-[#6B1D2F] hover:text-[#6B1D2F] font-bold text-[10px] uppercase tracking-wider transition-all shadow-sm flex items-center gap-1"
                        >
                          <Eye size={12} /> View Brief
                        </button>
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-2 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 transition-all shadow-sm"
                          title="Delete Lead"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── MODE 2: KANBAN BOARD ────────────────────────────────────────── */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-6">
          {KANBAN_STAGES.map((stage) => {
            const stageInquiries = filteredInquiries.filter(i => (i.status || 'new') === stage.id);
            return (
              <div key={stage.id} className="bg-[#FAFAF9] border border-[#C59A9F]/30 rounded-2xl p-4 min-w-[260px] flex flex-col justify-between">
                <div>
                  <div className={`border-l-4 ${stage.color} pl-2 mb-4 flex items-center justify-between`}>
                    <h3 className="font-black text-xs uppercase tracking-wider text-[#1C1917]">{stage.label}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#78716C] border">
                      {stageInquiries.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {stageInquiries.length === 0 ? (
                      <p className="text-[11px] text-[#78716C] font-light text-center py-6">No leads in stage</p>
                    ) : (
                      stageInquiries.map((inq) => (
                        <div
                          key={inq.id}
                          onClick={() => setSelectedInquiry(inq)}
                          className="p-4 rounded-xl bg-white border border-[#C59A9F]/40 shadow-sm hover:border-[#6B1D2F] transition-all cursor-pointer space-y-2"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-mono font-bold text-[#6B1D2F]">
                              {inq.reference_number || `INQ-${inq.id}`}
                            </span>
                            <span className="text-[10px] font-bold text-[#78716C]">{inq.budget}</span>
                          </div>

                          <p className="font-black text-xs text-[#1C1917] leading-tight">
                            {inq.first_name || inq.firstName} {inq.last_name || inq.lastName}
                          </p>

                          <p className="text-[10px] text-[#78716C] uppercase font-bold truncate">
                            {inq.project_type || inq.projectType}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── MODE 3: CONTACT PAGE CMS SETTINGS ───────────────────────────── */}
      {viewMode === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-8 border border-[#C59A9F]/30 shadow-sm space-y-6 max-w-3xl">
          <div className="border-b border-[#C59A9F]/20 pb-4">
            <h2 className="text-xl font-black text-[#1C1917]">Contact Page Content & Hero CMS</h2>
            <p className="text-xs text-[#78716C] mt-1">Manage public contact hero, eyebrow, availability status text, and contact information without editing source code.</p>
          </div>

          {/* Hero settings */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#6B1D2F]">Hero Section Settings</h3>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#78716C] mb-1">Eyebrow Text</label>
              <input
                type="text"
                value={contactSettings.hero?.eyebrow || ''}
                onChange={(e) => setContactSettings(p => ({ ...p, hero: { ...p.hero, eyebrow: e.target.value } }))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-xs font-semibold text-[#1C1917]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#78716C] mb-1">Hero Title</label>
              <input
                type="text"
                value={contactSettings.hero?.title || ''}
                onChange={(e) => setContactSettings(p => ({ ...p, hero: { ...p.hero, title: e.target.value } }))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-xs font-semibold text-[#1C1917]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#78716C] mb-1">Hero Description</label>
              <textarea
                rows={3}
                value={contactSettings.hero?.description || ''}
                onChange={(e) => setContactSettings(p => ({ ...p, hero: { ...p.hero, description: e.target.value } }))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-xs font-semibold text-[#1C1917]"
              />
            </div>
          </div>

          {/* Availability settings */}
          <div className="space-y-4 pt-4 border-t border-[#C59A9F]/20">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#6B1D2F]">Availability Status Badge</h3>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#78716C] mb-1">Current Status Text</label>
              <input
                type="text"
                value={contactSettings.availability?.statusText || ''}
                onChange={(e) => setContactSettings(p => ({ ...p, availability: { ...p.availability, statusText: e.target.value } }))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-xs font-semibold text-[#1C1917]"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={savingSettings}
              className="px-8 py-3 rounded-full bg-[#6B1D2F] hover:bg-[#8B1E3F] text-white font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
            >
              <Save size={14} /> {savingSettings ? 'Saving Settings...' : 'Save CMS Settings'}
            </button>
          </div>
        </form>
      )}

      {/* Inquiry Detail Drawer / Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-[#C59A9F]/40 max-h-[90vh] overflow-y-auto space-y-6"
          >
            <div className="flex justify-between items-center border-b border-[#C59A9F]/20 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6B1D2F]">
                  {selectedInquiry.reference_number || `INQ-2026-${String(selectedInquiry.id).padStart(6, '0')}`}
                </span>
                <h3 className="text-xl font-black text-[#1C1917]">
                  {selectedInquiry.first_name || selectedInquiry.firstName} {selectedInquiry.last_name || selectedInquiry.lastName}
                </h3>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="text-[#78716C] hover:text-[#6B1D2F]">
                <X size={20} />
              </button>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FAFAF9] border border-[#C59A9F]/30 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#78716C] block">Client Email</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <a href={`mailto:${selectedInquiry.email}`} className="font-bold text-[#1C1917] hover:underline">
                    {selectedInquiry.email}
                  </a>
                  <button
                    onClick={() => copyToClipboard(selectedInquiry.email, 'email')}
                    className="p-1 text-[9px] bg-white border rounded text-[#6B1D2F]"
                  >
                    {copiedField === 'email' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#78716C] block">Budget Target</span>
                <p className="font-bold text-[#1C1917] mt-0.5">{selectedInquiry.budget || '$3k - $5k'}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#78716C] block">Service Type</span>
                <p className="font-bold text-[#6B1D2F] uppercase mt-0.5">{selectedInquiry.project_type || selectedInquiry.projectType}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#78716C] block">Submission Date</span>
                <p className="font-bold text-[#1C1917] mt-0.5">
                  {selectedInquiry.created_at ? new Date(selectedInquiry.created_at).toLocaleString() : 'Recent'}
                </p>
              </div>
            </div>

            {/* Project Details Brief */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#78716C]">Project Brief & Goals</h4>
              <div className="p-5 rounded-2xl bg-[#FAFAF9] border border-[#C59A9F]/30 text-sm text-[#1C1917] font-normal leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.details}
              </div>
            </div>

            {/* Actions & Status */}
            <div className="flex flex-wrap justify-between items-center pt-4 border-t border-[#C59A9F]/20 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#78716C]">Change Status:</span>
                <select
                  value={selectedInquiry.status || 'new'}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                  className="px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-[#FAFAF9] border border-[#C59A9F]/40"
                >
                  <option value="new">NEW</option>
                  <option value="reviewing">REVIEWING</option>
                  <option value="contacted">CONTACTED</option>
                  <option value="qualified">QUALIFIED</option>
                  <option value="won">WON</option>
                  <option value="lost">LOST</option>
                </select>
              </div>

              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re:%20Project%20Inquiry%20(${selectedInquiry.reference_number || 'ALAZAR'})`}
                  className="px-6 py-2.5 rounded-full bg-[#6B1D2F] text-white font-black text-xs uppercase tracking-widest hover:bg-[#8B1E3F] transition-all shadow-md flex items-center gap-2"
                >
                  <Mail size={14} /> Reply via Email
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
