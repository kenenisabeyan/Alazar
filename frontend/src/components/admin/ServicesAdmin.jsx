import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench, Plus, Trash2, Edit2, Check, Save, Sparkles, Layers,
  RefreshCw, X, HelpCircle, ShieldCheck, DollarSign
} from 'lucide-react';
import api from '../../api';

export default function ServicesAdmin() {
  const [activeTab, setActiveTab] = useState('services');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Modal State for Service
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    badge: '',
    badgeDark: false,
    title: '',
    desc: '',
    items: '',
    cta: 'Request Quote',
    ctaVariant: 'primary'
  });

  useEffect(() => {
    fetchServicesAdminData();
  }, []);

  const fetchServicesAdminData = async () => {
    setLoading(true);
    try {
      const res = await api.services.getAdminFull();
      if (res && res.success) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Failed to load services admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3500);
  };

  const handleOpenServiceModal = (svc = null) => {
    if (svc) {
      setEditingService(svc);
      setFormData({
        badge: svc.badge || '',
        badgeDark: !!svc.badgeDark,
        title: svc.title || '',
        desc: svc.desc || '',
        items: Array.isArray(svc.items) ? svc.items.join(', ') : (svc.items || ''),
        cta: svc.cta || 'Request Quote',
        ctaVariant: svc.ctaVariant || 'primary'
      });
    } else {
      setEditingService(null);
      setFormData({
        badge: 'Remote Post-Production',
        badgeDark: false,
        title: 'Video Editing & Post-Production',
        desc: 'High-quality video editing, color grading, sound mixing, and graphic design delivered globally — no travel required.',
        items: 'Cinematic Color Grading, Commercial Editing, Brand Identity, Motion Edits, Audio Mixing',
        cta: 'Request Remote Quote',
        ctaVariant: 'outline'
      });
    }
    setServiceModalOpen(true);
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        items: typeof formData.items === 'string'
          ? formData.items.split(',').map(s => s.trim()).filter(Boolean)
          : formData.items
      };

      if (editingService) {
        const res = await api.services.update(editingService.id, payload);
        if (res.success) {
          notify('Service updated successfully!');
          setData(prev => ({
            ...prev,
            services: prev.services.map(s => s.id === editingService.id ? res.data : s)
          }));
        }
      } else {
        const res = await api.services.create(payload);
        if (res.success) {
          notify('Service created successfully!');
          setData(prev => ({
            ...prev,
            services: [...prev.services, res.data]
          }));
        }
      }
      setServiceModalOpen(false);
    } catch (err) {
      notify('Error saving service: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await api.services.delete(id);
      if (res.success) {
        notify('Service deleted successfully!');
        setData(prev => ({
          ...prev,
          services: prev.services.filter(s => s.id !== id)
        }));
      }
    } catch (err) {
      notify('Error deleting service: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-[#292524]">
        <RefreshCw size={28} className="animate-spin mx-auto mb-3 text-[#6B1D2F]" />
        <p className="font-bold text-sm uppercase tracking-widest">Loading Services CMS Dashboard...</p>
      </div>
    );
  }

  const services = data?.services || [];

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
            Services & Workflow CMS
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Service Manager</h1>
          <p className="text-xs text-[#E8B4BE] mt-1 font-medium max-w-xl">
            Control service packages, pricing calculators, process steps, client assurance guarantees, and FAQs.
          </p>
        </div>

        <button
          onClick={() => handleOpenServiceModal()}
          className="px-6 py-3 rounded-full bg-[#6B1D2F] hover:bg-[#8B1E3F] text-white font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 border border-white/20"
        >
          <Plus size={16} /> Add New Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((svc) => (
          <div key={svc.id} className="bg-white rounded-3xl p-7 border-2 border-[#C59A9F]/40 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  svc.badgeDark ? 'bg-[#6B1D2F] text-white' : 'bg-[#FAFAF9] text-[#6B1D2F] border border-[#C59A9F]/50'
                }`}>
                  {svc.badge}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenServiceModal(svc)}
                    className="p-2 rounded-xl bg-[#FAFAF9] border border-[#C59A9F]/40 text-[#1C1917] hover:text-[#6B1D2F]"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteService(svc.id)}
                    className="p-2 rounded-xl bg-[#FAFAF9] border border-rose-200 text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-black text-[#1C1917] mb-2">{svc.title}</h3>
              <p className="text-xs text-[#292524] font-medium leading-relaxed mb-4">{svc.desc}</p>
              
              <div className="space-y-1.5 pt-2 border-t border-[#C59A9F]/20">
                {(Array.isArray(svc.items) ? svc.items : []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
                    <Check size={12} className="text-[#6B1D2F]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#C59A9F]/20 flex justify-between items-center">
              <span className="text-[10px] uppercase font-black text-[#292524]">CTA Button: {svc.cta}</span>
              <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg bg-[#FAFAF9] text-[#6B1D2F] border border-[#C59A9F]/30">{svc.ctaVariant}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Service Modal */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-[#C59A9F]/40 max-h-[90vh] overflow-y-auto space-y-6"
          >
            <div className="flex justify-between items-center border-b border-[#C59A9F]/20 pb-4">
              <h3 className="text-xl font-black text-[#1C1917]">
                {editingService ? 'Edit Service Package' : 'Create New Service Package'}
              </h3>
              <button onClick={() => setServiceModalOpen(false)} className="text-[#292524] hover:text-[#6B1D2F]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-[#1C1917] uppercase font-black tracking-wider text-[10px] mb-1">Badge Text</label>
                <input
                  type="text"
                  required
                  value={formData.badge}
                  onChange={e => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              <div>
                <label className="block text-[#1C1917] uppercase font-black tracking-wider text-[10px] mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              <div>
                <label className="block text-[#1C1917] uppercase font-black tracking-wider text-[10px] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.desc}
                  onChange={e => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              <div>
                <label className="block text-[#1C1917] uppercase font-black tracking-wider text-[10px] mb-1">Deliverable Bullet Points (comma separated)</label>
                <input
                  type="text"
                  value={formData.items}
                  onChange={e => setFormData({ ...formData, items: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1C1917] uppercase font-black tracking-wider text-[10px] mb-1">CTA Label</label>
                  <input
                    type="text"
                    value={formData.cta}
                    onChange={e => setFormData({ ...formData, cta: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>

                <div>
                  <label className="block text-[#1C1917] uppercase font-black tracking-wider text-[10px] mb-1">CTA Variant</label>
                  <select
                    value={formData.ctaVariant}
                    onChange={e => setFormData({ ...formData, ctaVariant: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#C59A9F]/40 bg-[#FAFAF9] text-[#1C1917] focus:outline-none focus:border-[#6B1D2F]"
                  >
                    <option value="primary">primary</option>
                    <option value="outline">outline</option>
                    <option value="secondary">secondary</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="badgeDarkCheck"
                  checked={formData.badgeDark}
                  onChange={e => setFormData({ ...formData, badgeDark: e.target.checked })}
                  className="rounded text-[#6B1D2F] focus:ring-[#6B1D2F]"
                />
                <label htmlFor="badgeDarkCheck" className="text-xs font-bold text-[#1C1917]">Use dark badge styling</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#C59A9F]/20">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#FAFAF9] border border-[#C59A9F]/40 text-[#292524] font-black text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full bg-[#6B1D2F] text-white font-black text-xs uppercase tracking-widest hover:bg-[#8B1E3F] transition-all shadow-md"
                >
                  {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
