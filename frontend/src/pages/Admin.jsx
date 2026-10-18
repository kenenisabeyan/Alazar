import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  LayoutDashboard, Film, PenSquare, MessageSquare, BarChart2, Briefcase,
  HelpCircle, Wrench, Trophy, Sparkles, Clock, DollarSign, ImageIcon,
  Play, User, Link2, Globe, Navigation, Layers, Palette, Camera,
  Mail, Calculator, LogOut, Menu, X, RefreshCw, Plus, Trash2,
  Edit3, Save, CheckCircle, Shield, ChevronRight, Eye, EyeOff,
  Upload, Star, GripVertical, Minus, ExternalLink,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import AboutAdmin from '../components/admin/AboutAdmin';
import PortfolioAdmin from '../components/admin/PortfolioAdmin';
import ServicesAdmin from '../components/admin/ServicesAdmin';
import InquiriesAdmin from '../components/admin/InquiriesAdmin';

// ── Mini UI helpers ───────────────────────────────────────────────────────────
const cls = (...args) => args.filter(Boolean).join(' ');

const inputCls = 'w-full bg-[#1E0A0D] border border-[rgba(139,30,63,0.3)] rounded-xl px-4 py-3 text-sm text-[#F5F0F1] placeholder-[#78716C] focus:outline-none focus:border-[#8B1E3F] focus:ring-1 focus:ring-[#8B1E3F] transition-all';
const labelCls = 'block text-xs font-bold uppercase tracking-widest text-[#A89597] mb-1.5';
const cardCls  = 'bg-[#2E1216] border border-[rgba(139,30,63,0.2)] rounded-2xl p-6';
const btnPrimary = 'px-5 py-2.5 rounded-xl bg-[#6B1D2F] hover:bg-[#8B1E3F] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[rgba(107,29,47,0.3)]';
const btnSecondary = 'px-4 py-2.5 rounded-xl border border-[rgba(139,30,63,0.3)] text-[#A89597] hover:text-[#F5F0F1] hover:border-[#8B1E3F] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2';
const btnDanger = 'p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors';

// ── Sidebar nav items ─────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'dashboard',     label: 'Dashboard',       icon: LayoutDashboard, group: 'Overview'  },
  { id: 'about-cms',     label: 'About Page CMS',  icon: User,            group: 'Overview'  },
  { id: 'portfolio-cms', label: 'Portfolio CMS',   icon: Layers,          group: 'Overview'  },
  { id: 'services-cms',  label: 'Services CMS',    icon: Wrench,          group: 'Overview'  },
  { id: 'contact-cms',   label: 'Contact CRM',     icon: Mail,            group: 'Overview'  },
  { id: 'projects',     label: 'Projects',        icon: Film,            group: 'Content'   },
  { id: 'blog',         label: 'Blog & News',     icon: PenSquare,       group: 'Content'   },
  { id: 'testimonials', label: 'Testimonials',    icon: MessageSquare,   group: 'Content'   },
  { id: 'case-studies', label: 'Case Studies',    icon: Briefcase,       group: 'Content'   },
  { id: 'stats',        label: 'Statistics',      icon: BarChart2,       group: 'Content'   },
  { id: 'faqs',         label: 'FAQs',            icon: HelpCircle,      group: 'Content'   },
  { id: 'gear',         label: 'Gear List',       icon: Wrench,          group: 'Content'   },
  { id: 'awards',       label: 'Awards',          icon: Trophy,          group: 'Content'   },
  { id: 'skills',       label: 'Skills',          icon: Sparkles,        group: 'Content'   },
  { id: 'career',       label: 'Experience',      icon: Clock,           group: 'Content'   },
  { id: 'pricing',      label: 'Pricing',         icon: DollarSign,      group: 'Content'   },
  { id: 'media',        label: 'Media Library',   icon: ImageIcon,       group: 'Content'   },
  { id: 'color-grading',label: 'Color Grading',   icon: Palette,         group: 'Content'   },
  { id: 'bts',          label: 'BTS Gallery',     icon: Camera,          group: 'Content'   },
  { id: 'guarantees',   label: 'Guarantees',      icon: CheckCircle,     group: 'Content'   },
  { id: 'client-logos', label: 'Client Logos',    icon: Star,            group: 'Content'   },
  { id: 'inquiries',    label: 'Inquiries',        icon: Mail,            group: 'Leads'     },
  { id: 'quotes',       label: 'Quotes',           icon: Calculator,      group: 'Leads'     },
  { id: 'profile',      label: 'Profile & Bio',   icon: User,            group: 'Settings'  },
  { id: 'social',       label: 'Social Links',    icon: Link2,           group: 'Settings'  },
  { id: 'seo',          label: 'SEO',             icon: Globe,           group: 'Settings'  },
  { id: 'sections',     label: 'Page Sections',   icon: Layers,          group: 'Settings'  },
  { id: 'showreel',     label: 'Showreel',        icon: Play,            group: 'Settings'  },
];

const GROUPS = ['Overview', 'Content', 'Leads', 'Settings'];

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION PANELS
// ═══════════════════════════════════════════════════════════════════════════════

// ── Dashboard Panel ───────────────────────────────────────────────────────────
function DashboardPanel({ data }) {
  const { projects, inquiries, quotes, health } = data;
  const kpis = [
    { label: 'Total Projects',  value: projects.length,  icon: Film,          color: '#8B1E3F' },
    { label: 'Inquiries',       value: inquiries.length, icon: Mail,          color: '#d97706' },
    { label: 'Quotes Saved',    value: quotes.length,    icon: Calculator,    color: '#10b981' },
    { label: 'DB Status',       value: health.database?.includes('PostgreSQL') ? 'Online' : 'Fallback', icon: Shield, color: health.database?.includes('PostgreSQL') ? '#10b981' : '#f59e0b' },
  ];
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-[#F5F0F1] mb-1">Dashboard</h2>
        <p className="text-[#A89597] text-sm">Welcome back, Alazar. Here's your portfolio at a glance.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => (
          <div key={k.label} className={cardCls}>
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg" style={{ background: `${k.color}20` }}>
                <k.icon size={18} style={{ color: k.color }} />
              </div>
            </div>
            <div className="text-3xl font-black text-[#F5F0F1]">{k.value}</div>
            <div className="text-xs text-[#A89597] font-medium mt-1 uppercase tracking-wider">{k.label}</div>
          </div>
        ))}
      </div>
      <div className={cardCls}>
        <h3 className="text-sm font-bold text-[#F5F0F1] mb-4 uppercase tracking-wider">Recent Inquiries</h3>
        {inquiries.length === 0 ? (
          <p className="text-[#A89597] text-sm">No inquiries yet.</p>
        ) : (
          <div className="space-y-3">
            {inquiries.slice(0, 5).map(inq => (
              <div key={inq.id} className="flex items-center justify-between py-2 border-b border-[rgba(139,30,63,0.15)]">
                <div>
                  <div className="text-sm font-semibold text-[#F5F0F1]">{inq.first_name} {inq.last_name}</div>
                  <div className="text-xs text-[#A89597]">{inq.email} · {inq.project_type}</div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-[#8B1E3F]/20 text-[#8B1E3F] font-medium">{inq.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Generic simple list panel ─────────────────────────────────────────────────
function SimpleListPanel({ title, items, fields, onCreate, onUpdate, onDelete, loading }) {
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const startEdit = (item) => { setForm(item); setEditId(item.id); setShowForm(true); };
  const startCreate = () => { setForm({}); setEditId(null); setShowForm(true); };
  const cancel = () => { setShowForm(false); setForm({}); setEditId(null); };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editId) { await onUpdate(editId, form); toast.success('Updated!'); }
      else        { await onCreate(form); toast.success('Created!'); }
      cancel();
    } catch (err) { toast.error(err.message); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[#F5F0F1]">{title}</h2>
        <button onClick={startCreate} className={btnPrimary}><Plus size={14} /> Add New</button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            onSubmit={submit} className={`${cardCls} border-[#8B1E3F]/50 space-y-4`}>
            <h3 className="font-bold text-[#F5F0F1] text-sm uppercase tracking-wider">{editId ? 'Edit' : 'New'} {title.replace(/s$/, '')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map(f => (
                <div key={f.key} className={f.full ? 'md:col-span-2' : ''}>
                  <label className={labelCls}>{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea rows={3} value={form[f.key] || ''} onChange={e => setForm({...form, [f.key]: e.target.value})}
                      placeholder={f.placeholder || ''} className={inputCls} />
                  ) : f.type === 'select' ? (
                    <select value={form[f.key] || ''} onChange={e => setForm({...form, [f.key]: e.target.value})} className={inputCls}>
                      {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  ) : (
                    <input type={f.type || 'text'} value={form[f.key] || ''} onChange={e => setForm({...form, [f.key]: e.target.value})}
                      placeholder={f.placeholder || ''} className={inputCls} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button type="button" onClick={cancel} className={btnSecondary}>Cancel</button>
              <button type="submit" className={btnPrimary}><Save size={14} /> Save</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className={cardCls}>
        {loading ? (
          <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-[#1E0A0D] rounded-lg animate-pulse" />)}</div>
        ) : items.length === 0 ? (
          <p className="text-[#A89597] text-sm">No items yet. Add your first one above.</p>
        ) : (
          <div className="space-y-2">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-[#1E0A0D] transition-colors group">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-[#F5F0F1] truncate">{item[fields[0].key]}</div>
                  {fields[1] && <div className="text-xs text-[#A89597] truncate mt-0.5">{item[fields[1].key]}</div>}
                </div>
                <div className="flex items-center gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEdit(item)} className="p-2 text-[#A89597] hover:text-[#F5F0F1] hover:bg-[#8B1E3F]/20 rounded-lg transition-colors">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => { if(confirm('Delete this item?')) onDelete(item.id).then(() => toast.success('Deleted')).catch(e => toast.error(e.message)); }}
                    className={btnDanger}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Projects Panel ────────────────────────────────────────────────────────────
function ProjectsPanel({ projects, onRefresh }) {
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title:'', category:'video', client:'', thumbnail:'', description:'', role:'', year:'2025', featured:false });

  const startCreate = () => { setForm({ title:'', category:'video', client:'', thumbnail:'', description:'', role:'', year:'2025', featured:false }); setEditItem(null); setShowForm(true); };
  const startEdit = (p) => { setForm({...p, deliverables: Array.isArray(p.deliverables) ? p.deliverables.join(', ') : p.deliverables}); setEditItem(p.id); setShowForm(true); };

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, deliverables: typeof form.deliverables === 'string' ? form.deliverables.split(',').map(s => s.trim()) : form.deliverables };
    try {
      if (editItem) { await api.projects.update(editItem, payload); toast.success('Project updated!'); }
      else          { await api.projects.create(payload); toast.success('Project created!'); }
      setShowForm(false); onRefresh();
    } catch (err) { toast.error(err.message); }
  };

  const inputField = (key, label, type = 'text', placeholder = '') => (
    <div key={key}>
      <label className={labelCls}>{label}</label>
      <input type={type} value={form[key] || ''} onChange={e => setForm({...form, [key]: e.target.value})} placeholder={placeholder} className={inputCls} />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[#F5F0F1]">Projects</h2>
        <div className="flex gap-3">
          <button onClick={onRefresh} className={btnSecondary}><RefreshCw size={14} /></button>
          <button onClick={startCreate} className={btnPrimary}><Plus size={14} /> Add Project</button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            onSubmit={submit} className={`${cardCls} border-[#8B1E3F]/50 space-y-4`}>
            <h3 className="font-bold text-[#F5F0F1] text-sm uppercase tracking-wider">{editItem ? 'Edit' : 'New'} Project</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inputField('title', 'Title', 'text', 'e.g. Urban Echoes Commercial')}
              {inputField('client', 'Client', 'text', 'e.g. Vanguard Apparel')}
              <div>
                <label className={labelCls}>Category</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={inputCls}>
                  <option value="video">Video Production</option>
                  <option value="design">Graphic Design</option>
                </select>
              </div>
              {inputField('year', 'Year', 'text', '2025')}
              {inputField('role', 'Role', 'text', 'Lead Editor & Colorist')}
              {inputField('thumbnail', 'Thumbnail URL', 'url', 'https://...')}
              {inputField('video_url', 'Video URL', 'url', 'https://...')}
              {inputField('deliverables', 'Deliverables (comma-separated)', 'text', '60s Reel, Sound Mix')}
              <div className="md:col-span-2">
                <label className={labelCls}>Description</label>
                <textarea rows={3} value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} className={inputCls} />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="featured" checked={!!form.featured} onChange={e => setForm({...form, featured: e.target.checked})}
                  className="w-4 h-4 accent-[#8B1E3F]" />
                <label htmlFor="featured" className="text-sm text-[#A89597]">Featured project</label>
              </div>
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button type="button" onClick={() => setShowForm(false)} className={btnSecondary}>Cancel</button>
              <button type="submit" className={btnPrimary}><Save size={14} /> Save Project</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className={cardCls}>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[rgba(139,30,63,0.2)] text-xs uppercase tracking-wider text-[#A89597]">
              <th className="pb-3 pr-4">Title</th>
              <th className="pb-3 pr-4">Category</th>
              <th className="pb-3 pr-4">Client</th>
              <th className="pb-3 pr-4">Year</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(139,30,63,0.1)]">
            {projects.map(p => (
              <tr key={p.id} className="hover:bg-[#1E0A0D] transition-colors group">
                <td className="py-3 pr-4">
                  <div className="text-sm font-semibold text-[#F5F0F1]">{p.title}</div>
                  {p.featured && <span className="text-[10px] text-[#8B1E3F] font-bold">FEATURED</span>}
                </td>
                <td className="py-3 pr-4">
                  <span className="text-[10px] uppercase font-bold px-2 py-1 rounded-full bg-[#8B1E3F]/20 text-[#8B1E3F]">{p.category}</span>
                </td>
                <td className="py-3 pr-4 text-sm text-[#A89597]">{p.client}</td>
                <td className="py-3 pr-4 text-sm text-[#A89597]">{p.year}</td>
                <td className="py-3 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(p)} className="p-2 text-[#A89597] hover:text-[#F5F0F1] hover:bg-[#8B1E3F]/20 rounded-lg transition-colors"><Edit3 size={14} /></button>
                    <button onClick={() => { if(confirm('Delete project?')) api.projects.delete(p.id).then(() => { toast.success('Deleted'); onRefresh(); }).catch(e => toast.error(e.message)); }} className={btnDanger}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Stats Panel ───────────────────────────────────────────────────────────────
function StatsPanel({ stats }) {
  const [localStats, setLocalStats] = useState(stats);
  useEffect(() => setLocalStats(stats), [stats]);

  const handleSave = async (stat) => {
    try {
      await api.stats.update(stat.key_name, stat.value, stat.label);
      toast.success(`"${stat.label}" updated!`);
    } catch (err) { toast.error(err.message); }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-[#F5F0F1]">Statistics</h2>
      <p className="text-[#A89597] text-sm -mt-4">These numbers appear in the hero, about, and CTA sections.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {localStats.map((stat, i) => (
          <div key={stat.key_name || i} className={cardCls}>
            <div className="text-xs text-[#8B1E3F] font-bold uppercase tracking-widest mb-3">{stat.key_name}</div>
            <div className="space-y-3">
              <div>
                <label className={labelCls}>Value</label>
                <input type="text" value={stat.value} onChange={e => setLocalStats(prev => prev.map((s, j) => j === i ? {...s, value: e.target.value} : s))} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Label</label>
                <input type="text" value={stat.label} onChange={e => setLocalStats(prev => prev.map((s, j) => j === i ? {...s, label: e.target.value} : s))} className={inputCls} />
              </div>
              <button onClick={() => handleSave(localStats[i])} className={btnPrimary}><Save size={14} /> Save</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Settings Panel (Profile, SEO, Showreel) ───────────────────────────────────
function SettingsPanel({ sectionId }) {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const FIELD_GROUPS = {
    profile: {
      title: 'Profile & Bio',
      desc: 'Your public profile information shown across the site.',
      fields: [
        { key: 'profile.name',         label: 'Full Name',        placeholder: 'Alazar Asdesach' },
        { key: 'profile.title',        label: 'Professional Title', placeholder: 'Video Director & Senior Graphic Designer' },
        { key: 'profile.tagline',      label: 'Brand Tagline',    placeholder: 'Cinematic Videos. Clear Design.' },
        { key: 'profile.email',        label: 'Contact Email',    placeholder: 'a.asdesach1@gmail.com' },
        { key: 'profile.location',     label: 'Location',         placeholder: 'Global / Remote' },
        { key: 'profile.availability', label: 'Availability Status', placeholder: 'Available for new projects' },
        { key: 'profile.avatar',       label: 'Avatar Image URL', placeholder: 'https://...' },
        { key: 'profile.bio',          label: 'Bio / About Text', type: 'textarea', full: true },
      ]
    },
    seo: {
      title: 'SEO Settings',
      desc: 'Meta titles and descriptions for each page. Keep descriptions under 160 chars.',
      fields: [
        { key: 'seo.home.title',           label: 'Home: Title Tag' },
        { key: 'seo.home.description',     label: 'Home: Meta Description', type: 'textarea' },
        { key: 'seo.portfolio.title',      label: 'Portfolio: Title Tag' },
        { key: 'seo.portfolio.description',label: 'Portfolio: Meta Description', type: 'textarea' },
        { key: 'seo.about.title',          label: 'About: Title Tag' },
        { key: 'seo.about.description',    label: 'About: Meta Description', type: 'textarea' },
        { key: 'seo.services.title',       label: 'Services: Title Tag' },
        { key: 'seo.services.description', label: 'Services: Meta Description', type: 'textarea' },
        { key: 'seo.blog.title',           label: 'Blog: Title Tag' },
        { key: 'seo.blog.description',     label: 'Blog: Meta Description', type: 'textarea' },
        { key: 'seo.home.og_image',        label: 'OG Image URL (shared preview)' },
      ]
    },
    showreel: {
      title: 'Showreel Banner',
      desc: 'Configure the showreel banner section on the homepage.',
      fields: [
        { key: 'hero.showreel_url',   label: 'Showreel Video URL', placeholder: 'https://youtube.com/watch?v=...' },
        { key: 'hero.headline',       label: 'Hero Headline Line 1', placeholder: 'Cinematic Videos.' },
        { key: 'hero.headline2',      label: 'Hero Headline Line 2', placeholder: 'Clear Design.' },
        { key: 'hero.subtext',        label: 'Hero Subtext', type: 'textarea' },
        { key: 'hero.cta_primary',    label: 'Primary CTA Button Text', placeholder: 'View My Work' },
        { key: 'hero.cta_secondary',  label: 'Secondary CTA Button Text', placeholder: 'Get in Touch' },
        { key: 'footer.tagline',      label: 'Footer Tagline', placeholder: 'Cinematic Videos. Clear Design.' },
        { key: 'footer.copyright',    label: 'Footer Copyright', placeholder: '© 2025 Alazar Asdesach' },
      ]
    }
  };

  const group = FIELD_GROUPS[sectionId];
  if (!group) return null;

  useEffect(() => {
    api.settings.get().then(data => { setSettings(data || {}); }).finally(() => setLoading(false));
  }, [sectionId]);

  const handleSave = async () => {
    const subset = {};
    group.fields.forEach(f => { if (settings[f.key] !== undefined) subset[f.key] = settings[f.key]; });
    try {
      await api.settings.update(subset);
      toast.success('Settings saved!');
    } catch (err) { toast.error(err.message); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[#F5F0F1]">{group.title}</h2>
        <p className="text-[#A89597] text-sm mt-1">{group.desc}</p>
      </div>
      <div className={cardCls}>
        {loading ? (
          <div className="space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-[#1E0A0D] rounded-xl animate-pulse" />)}</div>
        ) : (
          <div className="space-y-4">
            {group.fields.map(f => (
              <div key={f.key}>
                <label className={labelCls}>{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea rows={3} value={settings[f.key] || ''} onChange={e => setSettings({...settings, [f.key]: e.target.value})}
                    placeholder={f.placeholder || ''} className={inputCls} />
                ) : (
                  <input type="text" value={settings[f.key] || ''} onChange={e => setSettings({...settings, [f.key]: e.target.value})}
                    placeholder={f.placeholder || ''} className={inputCls} />
                )}
              </div>
            ))}
            <div className="pt-2">
              <button onClick={handleSave} className={btnPrimary}><Save size={14} /> Save All Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Blog Panel ────────────────────────────────────────────────────────────────
function BlogPanel() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title:'', slug:'', excerpt:'', content:'', cover_image:'', category:'blog', tags:'', published:false });
  const [editId, setEditId] = useState(null);

  const load = () => api.blog.getAll({ draft: true }).then(setPosts).catch(() => {});
  useEffect(() => { load(); }, []);

  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const startCreate = () => { setForm({ title:'', slug:'', excerpt:'', content:'', cover_image:'', category:'blog', tags:'', published:false }); setEditId(null); setShowForm(true); };
  const startEdit = (p) => { setForm({...p, tags: Array.isArray(p.tags) ? p.tags.join(', ') : p.tags}); setEditId(p.id); setShowForm(true); };

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tags: typeof form.tags === 'string' ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : form.tags };
    try {
      if (editId) { await api.blog.update(editId, payload); toast.success('Post updated!'); }
      else        { await api.blog.create(payload); toast.success('Post created!'); }
      setShowForm(false); load();
    } catch (err) { toast.error(err.message); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[#F5F0F1]">Blog & News</h2>
        <div className="flex gap-3">
          <button onClick={load} className={btnSecondary}><RefreshCw size={14} /></button>
          <button onClick={startCreate} className={btnPrimary}><Plus size={14} /> New Post</button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            onSubmit={submit} className={`${cardCls} border-[#8B1E3F]/50 space-y-4`}>
            <h3 className="font-bold text-[#F5F0F1] text-sm uppercase tracking-wider">{editId ? 'Edit' : 'New'} Post</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={labelCls}>Title</label>
                <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value, slug: slugify(e.target.value)})} placeholder="Post title..." className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Slug (URL)</label>
                <input type="text" required value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="post-url-slug" className={`${inputCls} font-mono`} />
              </div>
              <div>
                <label className={labelCls}>Category</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={inputCls}>
                  <option value="blog">Blog</option>
                  <option value="news">News</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="project">Project Spotlight</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Cover Image URL</label>
                <input type="url" value={form.cover_image} onChange={e => setForm({...form, cover_image: e.target.value})} placeholder="https://..." className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Tags (comma-separated)</label>
                <input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="color grading, tutorial" className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>Excerpt</label>
                <textarea rows={2} value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} placeholder="Short description for listings..." className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>Content (Markdown supported)</label>
                <textarea rows={10} value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Write your post content here. Markdown is supported." className={`${inputCls} font-mono text-xs`} />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="post-published" checked={!!form.published} onChange={e => setForm({...form, published: e.target.checked})} className="w-4 h-4 accent-[#8B1E3F]" />
                <label htmlFor="post-published" className="text-sm text-[#A89597]">Publish immediately</label>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className={btnSecondary}>Cancel</button>
              <button type="submit" className={btnPrimary}><Save size={14} /> {form.published ? 'Publish Post' : 'Save Draft'}</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className={cardCls}>
        {posts.length === 0 ? (
          <p className="text-[#A89597] text-sm">No posts yet. Create your first post above.</p>
        ) : (
          <div className="space-y-2">
            {posts.map(p => (
              <div key={p.id} className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-[#1E0A0D] transition-colors group">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#F5F0F1] truncate">{p.title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.published ? 'bg-emerald-900/30 text-emerald-400' : 'bg-amber-900/30 text-amber-400'}`}>
                      {p.published ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8B1E3F]/20 text-[#8B1E3F] font-bold uppercase">{p.category}</span>
                  </div>
                  <div className="text-xs text-[#A89597] font-mono mt-0.5">/{p.slug}</div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                  <button onClick={() => startEdit(p)} className="p-2 text-[#A89597] hover:text-[#F5F0F1] hover:bg-[#8B1E3F]/20 rounded-lg transition-colors"><Edit3 size={14} /></button>
                  <button onClick={() => api.blog.delete(p.id).then(() => { toast.success('Post deleted'); load(); }).catch(e => toast.error(e.message))} className={btnDanger}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Media Library Panel ───────────────────────────────────────────────────────
function MediaPanel() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const load = () => api.media.list().then(setFiles).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await api.media.upload(file);
      toast.success('Uploaded!');
      load();
    } catch (err) { toast.error(err.message); }
    finally { setUploading(false); }
  };

  const copyUrl = (url) => { navigator.clipboard.writeText(url); toast.success('URL copied!'); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[#F5F0F1]">Media Library</h2>
        <label className={`${btnPrimary} cursor-pointer`}>
          {uploading ? <><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Uploading...</> : <><Upload size={14} /> Upload File</>}
          <input type="file" className="hidden" onChange={handleUpload} accept="image/*,video/*,.pdf" disabled={uploading} />
        </label>
      </div>

      {files.length === 0 ? (
        <div className={`${cardCls} text-center py-16`}>
          <ImageIcon size={40} className="text-[#A89597] mx-auto mb-4 opacity-40" />
          <p className="text-[#A89597] text-sm">No files uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map(f => (
            <div key={f.filename} className={`${cardCls} p-0 overflow-hidden group relative`}>
              {/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f.filename) ? (
                <img src={f.url} alt={f.filename} className="w-full h-32 object-cover" />
              ) : (
                <div className="w-full h-32 bg-[#1E0A0D] flex items-center justify-center">
                  <Film size={32} className="text-[#8B1E3F]" />
                </div>
              )}
              <div className="p-3">
                <div className="text-xs text-[#A89597] truncate">{f.filename}</div>
                <div className="text-[10px] text-[#A89597] mt-0.5">{(f.size / 1024).toFixed(1)} KB</div>
              </div>
              <div className="absolute inset-0 bg-[#1E0A0D]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => copyUrl(f.url)} className="p-2 rounded-lg bg-[#6B1D2F] text-white hover:bg-[#8B1E3F] transition-colors" title="Copy URL"><ExternalLink size={14} /></button>
                <button onClick={() => api.media.delete(f.filename).then(() => { toast.success('Deleted'); load(); }).catch(e => toast.error(e.message))}
                  className="p-2 rounded-lg bg-red-900/50 text-red-400 hover:bg-red-900 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Page Sections Visibility Panel ────────────────────────────────────────────
function SectionsPanel() {
  const [sections, setSections] = useState([]);
  useEffect(() => { api.content.getPageSections().then(setSections).catch(() => {}); }, []);

  const toggle = async (sec) => {
    try {
      const updated = { ...sec, visible: !sec.visible };
      await api.content.updatePageSection(sec.id, updated);
      setSections(prev => prev.map(s => s.id === sec.id ? updated : s));
      toast.success(`${sec.label} ${updated.visible ? 'shown' : 'hidden'}`);
    } catch (err) { toast.error(err.message); }
  };

  const byPage = sections.reduce((acc, s) => {
    acc[s.page] = acc[s.page] || [];
    acc[s.page].push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[#F5F0F1]">Page Sections</h2>
        <p className="text-[#A89597] text-sm mt-1">Toggle section visibility on each page without touching code.</p>
      </div>
      {Object.entries(byPage).map(([page, secs]) => (
        <div key={page} className={cardCls}>
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#8B1E3F] mb-4">{page} page</h3>
          <div className="space-y-2">
            {secs.map(s => (
              <div key={s.id} className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-[#1E0A0D] transition-colors">
                <div className="flex items-center gap-3">
                  <GripVertical size={14} className="text-[#A89597]" />
                  <span className="text-sm text-[#F5F0F1]">{s.label}</span>
                </div>
                <button onClick={() => toggle(s)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${s.visible ? 'bg-[#8B1E3F]' : 'bg-[#1E0A0D] border border-[rgba(139,30,63,0.3)]'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${s.visible ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      {sections.length === 0 && (
        <div className={cardCls}>
          <p className="text-[#A89597] text-sm">No sections configured. They will appear here after first seeding the database.</p>
        </div>
      )}
    </div>
  );
}

// ── Inquiries Panel ───────────────────────────────────────────────────────────
function InquiriesPanel({ inquiries, onRefresh }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[#F5F0F1]">Inquiries ({inquiries.length})</h2>
        <button onClick={onRefresh} className={btnSecondary}><RefreshCw size={14} /></button>
      </div>
      <div className={cardCls}>
        {inquiries.length === 0 ? (
          <p className="text-[#A89597] text-sm">No inquiries yet. They'll appear here when visitors submit the contact form.</p>
        ) : (
          <div className="space-y-4">
            {inquiries.map(inq => (
              <div key={inq.id} className="p-4 bg-[#1E0A0D] rounded-xl border border-[rgba(139,30,63,0.15)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-[#F5F0F1]">{inq.first_name} {inq.last_name}</div>
                    <div className="text-sm text-[#A89597]">{inq.email}</div>
                    <div className="flex gap-3 mt-2 text-xs text-[#D4C5C7]">
                      <span>📋 {inq.project_type}</span>
                      <span>💰 {inq.budget}</span>
                    </div>
                    <p className="text-sm text-[#A89597] mt-2">{inq.details}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#8B1E3F]/20 text-[#8B1E3F] uppercase">{inq.status}</span>
                    <button onClick={() => api.inquiries.delete(inq.id).then(() => { toast.success('Deleted'); onRefresh(); }).catch(e => toast.error(e.message))}
                      className="text-red-400 hover:text-red-300 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Testimonials Panel ────────────────────────────────────────────────────────
function TestimonialsPanel() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ quote:'', author:'', title:'Client', company:'', avatar:'', rating:5 });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => api.testimonials.getAll().then(setItems).catch(() => {});
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editId) { await api.testimonials.update(editId, form); toast.success('Updated!'); }
      else        { await api.testimonials.create(form); toast.success('Created!'); }
      setShowForm(false); setForm({ quote:'', author:'', title:'Client', company:'', avatar:'', rating:5 }); setEditId(null); load();
    } catch (err) { toast.error(err.message); }
  };

  return (
    <SimpleListPanel
      title="Testimonials"
      items={items}
      fields={[
        { key: 'author',  label: 'Client Name' },
        { key: 'company', label: 'Company' },
        { key: 'title',   label: 'Job Title', placeholder: 'Creative Director' },
        { key: 'avatar',  label: 'Avatar URL', placeholder: 'https://...' },
        { key: 'rating',  label: 'Rating (1-5)', type: 'number' },
        { key: 'quote',   label: 'Testimonial Quote', type: 'textarea', full: true },
      ]}
      onCreate={(d) => api.testimonials.create(d).then(load)}
      onUpdate={(id, d) => api.testimonials.update(id, d).then(load)}
      onDelete={(id) => api.testimonials.delete(id).then(load)}
      loading={false}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN ADMIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function Admin() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ projects: [], inquiries: [], quotes: [], health: {}, stats: [] });

  // Content state for simple panels
  const [faqs, setFaqs]         = useState([]);
  const [gear, setGear]         = useState([]);
  const [awards, setAwards]     = useState([]);
  const [skills, setSkills]     = useState([]);
  const [career, setCareer]     = useState([]);
  const [logos, setLogos]       = useState([]);
  const [bts, setBts]           = useState([]);
  const [colorGrading, setColorGrading] = useState([]);
  const [guarantees, setGuarantees]     = useState([]);
  const [caseStudies, setCaseStudies]   = useState([]);
  const [social, setSocial]     = useState([]);

  const loadCore = useCallback(async () => {
    setLoading(true);
    try {
      const [h, pList, iList, qList, sData] = await Promise.all([
        api.health(),
        api.projects.getAll(),
        api.inquiries.getAll(),
        api.quotes.getAll(),
        api.stats.get(),
      ]);
      setData({ health: h, projects: pList, inquiries: iList, quotes: qList || [], stats: sData?.stats || [] });
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  const loadContent = useCallback(async () => {
    const [f, g, a, sk, c, l, b, cg, gu, cs, so] = await Promise.allSettled([
      api.content.getFaqs(), api.content.getGear(), api.content.getAwards(),
      api.content.getSkills(), api.content.getCareer(), api.content.getClientLogos(),
      api.content.getBtsGallery(), api.content.getColorGrading(), api.content.getGuarantees(),
      api.content.getCaseStudies(), api.content.getSocialLinks(),
    ]);
    if (f.status === 'fulfilled') setFaqs(f.value || []);
    if (g.status === 'fulfilled') setGear(g.value || []);
    if (a.status === 'fulfilled') setAwards(a.value || []);
    if (sk.status === 'fulfilled') setSkills(sk.value || []);
    if (c.status === 'fulfilled') setCareer(c.value || []);
    if (l.status === 'fulfilled') setLogos(l.value || []);
    if (b.status === 'fulfilled') setBts(b.value || []);
    if (cg.status === 'fulfilled') setColorGrading(cg.value || []);
    if (gu.status === 'fulfilled') setGuarantees(gu.value || []);
    if (cs.status === 'fulfilled') setCaseStudies(cs.value || []);
    if (so.status === 'fulfilled') setSocial(so.value || []);
  }, []);

  useEffect(() => {
    loadCore();
    loadContent();
  }, [loadCore, loadContent]);

  const handleLogout = () => { logout(); navigate('/login'); };

  // Render the active panel
  const renderPanel = () => {
    switch (activeSection) {
      case 'dashboard':     return <DashboardPanel data={data} />;
      case 'about-cms':     return <AboutAdmin />;
      case 'portfolio-cms': return <PortfolioAdmin />;
      case 'services-cms':  return <ServicesAdmin />;
      case 'contact-cms':   return <InquiriesAdmin />;
      case 'inquiries':    return <InquiriesAdmin />;
      case 'projects':     return <ProjectsPanel projects={data.projects} onRefresh={loadCore} />;
      case 'blog':         return <BlogPanel />;
      case 'testimonials': return <TestimonialsPanel />;
      case 'stats':        return <StatsPanel stats={data.stats} />;
      case 'media':        return <MediaPanel />;
      case 'sections':     return <SectionsPanel />;
      case 'profile':      return <SettingsPanel sectionId="profile" />;
      case 'seo':          return <SettingsPanel sectionId="seo" />;
      case 'showreel':     return <SettingsPanel sectionId="showreel" />;
      case 'quotes':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#F5F0F1]">Rate Quotes ({data.quotes.length})</h2>
            <div className={cardCls}>
              {data.quotes.length === 0 ? <p className="text-[#A89597] text-sm">No quotes yet.</p> : (
                <table className="w-full">
                  <thead><tr className="border-b border-[rgba(139,30,63,0.2)] text-xs uppercase tracking-wider text-[#A89597]">
                    <th className="pb-3 pr-4 text-left">Project Type</th><th className="pb-3 pr-4 text-left">Scope</th>
                    <th className="pb-3 pr-4 text-left">Total</th><th className="pb-3 text-left">Notes</th>
                  </tr></thead>
                  <tbody className="divide-y divide-[rgba(139,30,63,0.1)]">
                    {data.quotes.map(q => (
                      <tr key={q.id} className="hover:bg-[#1E0A0D] transition-colors">
                        <td className="py-3 pr-4 text-sm text-[#F5F0F1]">{q.project_type}</td>
                        <td className="py-3 pr-4 text-sm text-[#A89597]">{q.scope}</td>
                        <td className="py-3 pr-4 text-sm font-bold text-[#8B1E3F]">${Number(q.total_price).toLocaleString()}</td>
                        <td className="py-3 text-xs text-[#A89597]">{q.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        );
      case 'faqs':
        return <SimpleListPanel title="FAQs" items={faqs}
          fields={[{ key:'question', label:'Question', type:'textarea', full:true }, { key:'answer', label:'Answer', type:'textarea', full:true }, { key:'sort_order', label:'Order', type:'number' }]}
          onCreate={(d) => api.content.createFaq(d).then(() => api.content.getFaqs().then(setFaqs))}
          onUpdate={(id, d) => api.content.updateFaq(id, d).then(() => api.content.getFaqs().then(setFaqs))}
          onDelete={(id) => api.content.deleteFaq(id).then(() => api.content.getFaqs().then(setFaqs))}
          loading={false} />;
      case 'gear':
        return <SimpleListPanel title="Gear" items={gear}
          fields={[{ key:'category', label:'Category', placeholder:'Camera Systems' }, { key:'name', label:'Gear Name', placeholder:'RED V-Raptor 8K' }, { key:'description', label:'Description', type:'textarea', full:true }]}
          onCreate={(d) => api.content.createGear(d).then(() => api.content.getGear().then(setGear))}
          onUpdate={(id, d) => api.content.updateGear(id, d).then(() => api.content.getGear().then(setGear))}
          onDelete={(id) => api.content.deleteGear(id).then(() => api.content.getGear().then(setGear))}
          loading={false} />;
      case 'awards':
        return <SimpleListPanel title="Awards" items={awards}
          fields={[{ key:'year', label:'Year', placeholder:'2025' }, { key:'title', label:'Award Title', placeholder:'Vimeo Staff Pick' }, { key:'project', label:'Project Name' }]}
          onCreate={(d) => api.content.createAward(d).then(() => api.content.getAwards().then(setAwards))}
          onUpdate={(id, d) => api.content.updateAward(id, d).then(() => api.content.getAwards().then(setAwards))}
          onDelete={(id) => api.content.deleteAward(id).then(() => api.content.getAwards().then(setAwards))}
          loading={false} />;
      case 'skills':
        return <SimpleListPanel title="Skills" items={skills}
          fields={[{ key:'category', label:'Category' }, { key:'name', label:'Skill Name' }, { key:'level', label:'Level (0-100)', type:'number' }, { key:'description', label:'Description', type:'textarea', full:true }]}
          onCreate={(d) => api.content.createSkill(d).then(() => api.content.getSkills().then(setSkills))}
          onUpdate={(id, d) => api.content.updateSkill(id, d).then(() => api.content.getSkills().then(setSkills))}
          onDelete={(id) => api.content.deleteSkill(id).then(() => api.content.getSkills().then(setSkills))}
          loading={false} />;
      case 'career':
        return <SimpleListPanel title="Experience" items={career}
          fields={[{ key:'period', label:'Period', placeholder:'2022 to Present' }, { key:'role', label:'Role', placeholder:'Founder & Lead Director' }, { key:'company', label:'Company' }, { key:'location', label:'Location' }, { key:'description', label:'Description', type:'textarea', full:true }]}
          onCreate={(d) => api.content.createCareer(d).then(() => api.content.getCareer().then(setCareer))}
          onUpdate={(id, d) => api.content.updateCareer(id, d).then(() => api.content.getCareer().then(setCareer))}
          onDelete={(id) => api.content.deleteCareer(id).then(() => api.content.getCareer().then(setCareer))}
          loading={false} />;
      case 'client-logos':
        return <SimpleListPanel title="Client Logos" items={logos}
          fields={[{ key:'name', label:'Client Name' }, { key:'display_text', label:'Display Text (if no logo image)' }, { key:'logo_url', label:'Logo Image URL', placeholder:'https://...' }]}
          onCreate={(d) => api.content.createClientLogo(d).then(() => api.content.getClientLogos().then(setLogos))}
          onUpdate={(id, d) => api.content.updateClientLogo(id, d).then(() => api.content.getClientLogos().then(setLogos))}
          onDelete={(id) => api.content.deleteClientLogo(id).then(() => api.content.getClientLogos().then(setLogos))}
          loading={false} />;
      case 'bts':
        return <SimpleListPanel title="BTS Gallery" items={bts}
          fields={[{ key:'title', label:'Title' }, { key:'location', label:'Location' }, { key:'image', label:'Image URL', placeholder:'https://...' }, { key:'caption', label:'Caption', type:'textarea', full:true }]}
          onCreate={(d) => api.content.createBtsItem(d).then(() => api.content.getBtsGallery().then(setBts))}
          onUpdate={(id, d) => api.content.updateBtsItem(id, d).then(() => api.content.getBtsGallery().then(setBts))}
          onDelete={(id) => api.content.deleteBtsItem(id).then(() => api.content.getBtsGallery().then(setBts))}
          loading={false} />;
      case 'color-grading':
        return <SimpleListPanel title="Color Grading Samples" items={colorGrading}
          fields={[{ key:'title', label:'Title' }, { key:'log_image', label:'LOG Image URL', placeholder:'https://...' }, { key:'graded_image', label:'Graded Image URL', placeholder:'https://...' }, { key:'camera', label:'Camera' }, { key:'color_space', label:'Color Space' }, { key:'lut', label:'LUT Name' }, { key:'iso', label:'ISO' }]}
          onCreate={(d) => api.content.createColorGrading(d).then(() => api.content.getColorGrading().then(setColorGrading))}
          onUpdate={(id, d) => api.content.updateColorGrading(id, d).then(() => api.content.getColorGrading().then(setColorGrading))}
          onDelete={(id) => api.content.deleteColorGrading(id).then(() => api.content.getColorGrading().then(setColorGrading))}
          loading={false} />;
      case 'guarantees':
        return <SimpleListPanel title="Hiring Guarantees" items={guarantees}
          fields={[{ key:'title', label:'Title' }, { key:'description', label:'Description', type:'textarea', full:true }]}
          onCreate={(d) => api.content.createGuarantee(d).then(() => api.content.getGuarantees().then(setGuarantees))}
          onUpdate={(id, d) => api.content.updateGuarantee(id, d).then(() => api.content.getGuarantees().then(setGuarantees))}
          onDelete={(id) => api.content.deleteGuarantee(id).then(() => api.content.getGuarantees().then(setGuarantees))}
          loading={false} />;
      case 'case-studies':
        return <SimpleListPanel title="Case Studies" items={caseStudies}
          fields={[{ key:'client', label:'Client' }, { key:'project', label:'Project Name' }, { key:'metric', label:'Key Metric', placeholder:'4.8M+' }, { key:'metric_label', label:'Metric Label', placeholder:'Video Views' }, { key:'result', label:'Result', placeholder:'+420% Sales Growth' }, { key:'image', label:'Image URL', placeholder:'https://...' }]}
          onCreate={(d) => api.content.createCaseStudy(d).then(() => api.content.getCaseStudies().then(setCaseStudies))}
          onUpdate={(id, d) => api.content.updateCaseStudy(id, d).then(() => api.content.getCaseStudies().then(setCaseStudies))}
          onDelete={(id) => api.content.deleteCaseStudy(id).then(() => api.content.getCaseStudies().then(setCaseStudies))}
          loading={false} />;
      case 'social':
        return <SimpleListPanel title="Social Links" items={social}
          fields={[{ key:'name', label:'Platform Name', placeholder:'Telegram' }, { key:'url', label:'URL', placeholder:'https://t.me/...' }, { key:'handle', label:'Handle / Username', placeholder:'@handle' }, { key:'type', label:'Type', placeholder:'telegram' }]}
          onCreate={(d) => api.content.createSocialLink(d).then(() => api.content.getSocialLinks().then(setSocial))}
          onUpdate={(id, d) => api.content.updateSocialLink(id, d).then(() => api.content.getSocialLinks().then(setSocial))}
          onDelete={(id) => api.content.deleteSocialLink(id).then(() => api.content.getSocialLinks().then(setSocial))}
          loading={false} />;
      default:
        return (
          <div className={cardCls}>
            <p className="text-[#A89597]">Select a section from the sidebar to manage it.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#1E0A0D] flex text-[#F5F0F1]" style={{ fontFamily: 'Roboto, sans-serif' }}>

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-64 min-h-screen bg-[#2E1216] border-r border-[rgba(139,30,63,0.2)] flex flex-col flex-shrink-0 fixed md:relative z-40"
          >
            {/* Brand */}
            <div className="p-6 border-b border-[rgba(139,30,63,0.2)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6B1D2F] flex items-center justify-center flex-shrink-0">
                  <Film size={18} className="text-white" />
                </div>
                <div>
                  <div className="font-black text-[#F5F0F1] text-sm leading-tight">ALAZAR STUDIO</div>
                  <div className="text-[10px] text-[#8B1E3F] font-semibold uppercase tracking-wider">CMS v2.0</div>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {GROUPS.map(group => {
                const groupItems = NAV_ITEMS.filter(i => i.group === group);
                return (
                  <div key={group}>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#A89597] px-3 py-2 mt-3">{group}</div>
                    {groupItems.map(item => (
                      <button key={item.id} onClick={() => setActiveSection(item.id)}
                        className={cls(
                          'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all',
                          activeSection === item.id
                            ? 'bg-[#6B1D2F] text-white shadow-lg shadow-[rgba(107,29,47,0.3)]'
                            : 'text-[#A89597] hover:text-[#F5F0F1] hover:bg-[#1E0A0D]'
                        )}>
                        <item.icon size={14} />
                        {item.label}
                      </button>
                    ))}
                  </div>
                );
              })}
            </nav>

            {/* Admin info + logout */}
            <div className="p-4 border-t border-[rgba(139,30,63,0.2)]">
              <div className="flex items-center gap-3 mb-3 px-1">
                <div className="w-8 h-8 rounded-full bg-[#6B1D2F] flex items-center justify-center text-white text-xs font-black flex-shrink-0">A</div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#F5F0F1] truncate">{admin?.name || 'Alazar Asdesach'}</div>
                  <div className="text-[10px] text-[#A89597] truncate">{admin?.email}</div>
                </div>
              </div>
              <button onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all font-semibold">
                <LogOut size={13} /> Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className={cls('flex-1 flex flex-col min-w-0', sidebarOpen ? 'md:ml-0' : '')}>

        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#1E0A0D]/90 backdrop-blur border-b border-[rgba(139,30,63,0.2)] px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(v => !v)} className="p-2 rounded-xl hover:bg-[#2E1216] text-[#A89597] hover:text-[#F5F0F1] transition-colors">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-[#A89597] uppercase tracking-widest font-black">Admin Dashboard</div>
            <div className="text-sm font-semibold text-[#F5F0F1] capitalize">{NAV_ITEMS.find(i => i.id === activeSection)?.label || 'Dashboard'}</div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className={`w-2 h-2 rounded-full ${data.health.status === 'healthy' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-[#A89597] hidden sm:block">{data.health.database?.includes('PostgreSQL') ? 'PostgreSQL' : 'Memory Store'}</span>
          </div>
          <button onClick={() => { loadCore(); loadContent(); toast.success('Refreshed!'); }}
            className="p-2 rounded-xl hover:bg-[#2E1216] text-[#A89597] hover:text-[#F5F0F1] transition-colors">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </header>

        {/* Panel */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeSection} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              {renderPanel()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
