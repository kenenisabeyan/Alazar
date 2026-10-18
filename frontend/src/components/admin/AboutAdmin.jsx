import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Film, Target, Cpu, Briefcase, Award, Camera, ShieldCheck,
  Eye, EyeOff, Plus, Trash2, Edit2, Check, Save, ArrowUp, ArrowDown, Layers, Sliders, Mail, Globe, Phone, MapPin
} from 'lucide-react';
import api from '../../api';

export default function AboutAdmin() {
  const [activeTab, setActiveTab] = useState('profile');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Form States for Modals/Editing
  const [editingItem, setEditingItem] = useState(null);
  const [formModal, setFormModal] = useState(null); // 'capability', 'skill', 'award', 'work', 'gear', 'bts'

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    setLoading(true);
    try {
      const res = await api.about.getAdminFull();
      if (res.success) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Failed to load admin about data:', err);
    } finally {
      setLoading(false);
    }
  };

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3500);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.about.updateProfile(data.about_profile);
      if (res.success) notify('Profile updated successfully!');
    } catch (err) {
      notify('Error updating profile: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (entityPath, id, currentList, setKey) => {
    try {
      const res = await api.about.toggleItem(entityPath, id);
      if (res.success) {
        setData(prev => ({
          ...prev,
          [setKey]: prev[setKey].map(item => item.id === id ? { ...item, isVisible: !item.isVisible } : item)
        }));
        notify('Visibility toggled');
      }
    } catch (err) {
      notify('Toggle error: ' + err.message);
    }
  };

  const handleDelete = async (entityPath, id, setKey) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await api.about.deleteItem(entityPath, id);
      if (res.success) {
        setData(prev => ({
          ...prev,
          [setKey]: prev[setKey].filter(item => item.id !== id)
        }));
        notify('Item deleted');
      }
    } catch (err) {
      notify('Delete error: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-[#292524]">
        <div className="w-8 h-8 border-2 border-[#6B1D2F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold">Loading About CMS Management System...</p>
      </div>
    );
  }

  const profile = data?.about_profile || {};
  const capabilities = data?.creative_capabilities || [];
  const disciplines = data?.creative_disciplines || [];
  const skills = data?.professional_skills || [];
  const workExps = data?.work_experiences || [];
  const awards = data?.awards || [];
  const gear = data?.production_gears || [];
  const bts = data?.behind_the_scenes_media || [];
  const sections = data?.about_page_sections || [];

  const tabs = [
    { id: 'profile', label: 'Profile & Hero', icon: User },
    { id: 'capabilities', label: 'Capabilities', icon: Target },
    { id: 'disciplines', label: 'Disciplines & Tags', icon: Film },
    { id: 'skills', label: 'Skills & Software', icon: Cpu },
    { id: 'work', label: 'Career History', icon: Briefcase },
    { id: 'awards', label: 'Awards', icon: Award },
    { id: 'gear', label: 'Gear Kit', icon: Camera },
    { id: 'bts', label: 'Behind The Scenes', icon: Eye },
    { id: 'cta_contact', label: 'CTA & Contact', icon: Mail },
    { id: 'sections', label: 'Section Manager', icon: Layers },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ── Top Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6B1D2F]/10 text-[#6B1D2F] text-xs font-black uppercase tracking-wider mb-2">
            About Page CMS
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Creative Profile & Content Manager
          </h1>
          <p className="text-sm text-stone-700 font-medium">
            Manage profile details, skills, work timeline, awards, gear, gallery, and section visibility.
          </p>
        </div>
        <button
          onClick={fetchAboutData}
          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-all"
        >
          Refresh Data
        </button>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-sm rounded-xl"
        >
          ✅ {message}
        </motion.div>
      )}

      {/* ── Navigation Tabs ─────────────────────────────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-stone-200">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === id
                ? 'bg-[#6B1D2F] text-white shadow-md shadow-[#6B1D2F]/20'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* ── Tab 1: Profile & Hero ───────────────────────────────────────────── */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSave} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-stone-900 border-b pb-3">Hero Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.fullName || ''}
                onChange={e => setData(prev => ({ ...prev, about_profile: { ...prev.about_profile, fullName: e.target.value } }))}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#6B1D2F] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">Professional Title</label>
              <input
                type="text"
                value={profile.professionalTitle || ''}
                onChange={e => setData(prev => ({ ...prev, about_profile: { ...prev.about_profile, professionalTitle: e.target.value } }))}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#6B1D2F] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">Hero Headline</label>
              <input
                type="text"
                value={profile.headline || ''}
                onChange={e => setData(prev => ({ ...prev, about_profile: { ...prev.about_profile, headline: e.target.value } }))}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#6B1D2F] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">Years Experience</label>
              <input
                type="text"
                value={profile.yearsExperience || ''}
                onChange={e => setData(prev => ({ ...prev, about_profile: { ...prev.about_profile, yearsExperience: e.target.value } }))}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#6B1D2F] outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">Short Description Summary</label>
              <textarea
                rows={3}
                value={profile.shortDescription || ''}
                onChange={e => setData(prev => ({ ...prev, about_profile: { ...prev.about_profile, shortDescription: e.target.value } }))}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#6B1D2F] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">Main Profile Image URL</label>
              <input
                type="text"
                value={profile.profileImage || ''}
                onChange={e => setData(prev => ({ ...prev, about_profile: { ...prev.about_profile, profileImage: e.target.value } }))}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#6B1D2F] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">Availability Badge Text</label>
              <input
                type="text"
                value={profile.availabilityStatus || ''}
                onChange={e => setData(prev => ({ ...prev, about_profile: { ...prev.about_profile, availabilityStatus: e.target.value } }))}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#6B1D2F] outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-[#6B1D2F] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg hover:bg-[#521523] transition-all disabled:opacity-50"
            >
              <Save size={15} />
              {saving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      )}

      {/* ── Tab 2: Capabilities ─────────────────────────────────────────────── */}
      {activeTab === 'capabilities' && (
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-lg font-black text-stone-900">Core Philosophy & Capabilities</h2>
            <button
              onClick={() => {
                const title = prompt('Enter Capability Title:');
                const desc = prompt('Enter Capability Description:');
                if (title && desc) {
                  api.about.createItem('capabilities', { title, description: desc, iconName: 'Film' }).then(() => fetchAboutData());
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#6B1D2F] text-white text-xs font-black uppercase rounded-xl"
            >
              <Plus size={14} /> Add Capability
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map(cap => (
              <div key={cap.id} className="p-4 rounded-xl border border-stone-200 flex items-start justify-between bg-stone-50">
                <div>
                  <span className="text-xs font-black text-[#6B1D2F] uppercase">{cap.iconName || 'Icon'}</span>
                  <h4 className="font-bold text-stone-900 text-sm mt-0.5">{cap.title}</h4>
                  <p className="text-xs text-stone-700 font-medium mt-1">{cap.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggle('capabilities', cap.id, capabilities, 'creative_capabilities')}
                    className={`p-2 rounded-lg text-xs ${cap.isVisible ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-500'}`}
                  >
                    {cap.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button
                    onClick={() => handleDelete('capabilities', cap.id, 'creative_capabilities')}
                    className="p-2 rounded-lg bg-rose-100 text-rose-700 text-xs"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 3: Disciplines ──────────────────────────────────────────────── */}
      {activeTab === 'disciplines' && (
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-stone-900 border-b pb-4">Dual Creative Disciplines & Specialties</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {disciplines.map(disc => (
              <div key={disc.id} className="p-6 rounded-2xl border border-stone-200 bg-stone-50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#6B1D2F] text-white text-[10px] font-black uppercase">
                    {disc.badge}
                  </span>
                  <span className="text-xs text-stone-700 font-bold">{disc.experienceLabel}</span>
                </div>
                <h3 className="text-xl font-black text-stone-900">{disc.headline}</h3>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">{disc.description}</p>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => handleToggle('disciplines', disc.id, disciplines, 'creative_disciplines')}
                    className="px-3 py-1.5 rounded-lg bg-stone-200 text-xs font-bold text-stone-700 flex items-center gap-1.5"
                  >
                    {disc.isVisible ? <Eye size={13} /> : <EyeOff size={13} />} Toggle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 4: Skills Matrix ────────────────────────────────────────────── */}
      {activeTab === 'skills' && (
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-lg font-black text-stone-900">Software & Technical Skills Matrix</h2>
            <button
              onClick={() => {
                const name = prompt('Skill Name (e.g. DaVinci Resolve):');
                const level = prompt('Percentage Level (1-100):', '95');
                if (name) {
                  api.about.createItem('skills', { name, percentage: parseInt(level, 10), categoryId: 1, experienceLevel: 'EXPERT' }).then(() => fetchAboutData());
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#6B1D2F] text-white text-xs font-black uppercase rounded-xl"
            >
              <Plus size={14} /> Add Skill
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map(sk => (
              <div key={sk.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-stone-900 text-sm">{sk.name}</h4>
                    <span className="px-2 py-0.5 rounded bg-[#6B1D2F]/10 text-[#6B1D2F] text-[10px] font-bold">
                      {sk.percentage}%
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 font-medium mt-0.5">{sk.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggle('skills', sk.id, skills, 'professional_skills')}
                    className={`p-2 rounded-lg text-xs ${sk.isVisible ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-500'}`}
                  >
                    {sk.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button
                    onClick={() => handleDelete('skills', sk.id, 'professional_skills')}
                    className="p-2 rounded-lg bg-rose-100 text-rose-700 text-xs"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 5: Work History ─────────────────────────────────────────────── */}
      {activeTab === 'work' && (
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-lg font-black text-stone-900">Career Experience Timeline</h2>
            <button
              onClick={() => {
                const pos = prompt('Position Title:');
                const company = prompt('Company Name:');
                if (pos && company) {
                  api.about.createItem('work-experience', { position: pos, company, startDate: '2024', endDate: 'Present', description: 'Lead Creative' }).then(() => fetchAboutData());
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#6B1D2F] text-white text-xs font-black uppercase rounded-xl"
            >
              <Plus size={14} /> Add Experience
            </button>
          </div>

          <div className="space-y-4">
            {workExps.map(w => (
              <div key={w.id} className="p-6 rounded-2xl border border-stone-200 bg-stone-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6B1D2F] uppercase">{w.startDate} to {w.endDate}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggle('work-experience', w.id, workExps, 'work_experiences')}
                      className={`p-1.5 rounded-lg text-xs ${w.isVisible ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-500'}`}
                    >
                      {w.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <button
                      onClick={() => handleDelete('work-experience', w.id, 'work_experiences')}
                      className="p-1.5 rounded-lg bg-rose-100 text-rose-700 text-xs"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-black text-stone-900">{w.position}</h3>
                <p className="text-xs font-bold text-stone-600">{w.company} • {w.location}</p>
                <p className="text-xs text-stone-700 leading-relaxed font-medium">{w.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 6: Awards ───────────────────────────────────────────────────── */}
      {activeTab === 'awards' && (
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-lg font-black text-stone-900">Industry Recognition & Awards</h2>
            <button
              onClick={() => {
                const title = prompt('Award Title (e.g. Vimeo Staff Pick):');
                const project = prompt('Project Name:');
                const year = prompt('Year:', '2025');
                if (title) {
                  api.about.createItem('awards', { title, projectName: project || '', year: year || '2025' }).then(() => fetchAboutData());
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#6B1D2F] text-white text-xs font-black uppercase rounded-xl"
            >
              <Plus size={14} /> Add Award
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {awards.map(aw => (
              <div key={aw.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-[#6B1D2F] uppercase">{aw.year}</span>
                  <h4 className="font-black text-stone-900 text-sm">{aw.title}</h4>
                  <p className="text-xs text-stone-700 font-medium">{aw.projectName || 'Project'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggle('awards', aw.id, awards, 'awards')}
                    className={`p-2 rounded-lg text-xs ${aw.isVisible ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-500'}`}
                  >
                    {aw.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button
                    onClick={() => handleDelete('awards', aw.id, 'awards')}
                    className="p-2 rounded-lg bg-rose-100 text-rose-700 text-xs"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 7: Gear Kit ─────────────────────────────────────────────────── */}
      {activeTab === 'gear' && (
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-lg font-black text-stone-900">Production Gear & Rigging Kit</h2>
            <button
              onClick={() => {
                const name = prompt('Gear Name (e.g. RED V-Raptor 8K):');
                const desc = prompt('Description:');
                if (name) {
                  api.about.createItem('gear', { name, description: desc || '', categoryId: 1, badge: 'Cinema Rig' }).then(() => fetchAboutData());
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#6B1D2F] text-white text-xs font-black uppercase rounded-xl"
            >
              <Plus size={14} /> Add Equipment
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gear.map(g => (
              <div key={g.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-[#6B1D2F] uppercase">{g.badge || 'Gear'}</span>
                  <h4 className="font-black text-stone-900 text-sm">{g.name}</h4>
                  <p className="text-xs text-stone-700 font-medium mt-0.5">{g.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggle('gear', g.id, gear, 'production_gears')}
                    className={`p-2 rounded-lg text-xs ${g.isVisible ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-500'}`}
                  >
                    {g.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button
                    onClick={() => handleDelete('gear', g.id, 'production_gears')}
                    className="p-2 rounded-lg bg-rose-100 text-rose-700 text-xs"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 8: Behind The Scenes ────────────────────────────────────────── */}
      {activeTab === 'bts' && (
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-lg font-black text-stone-900">Behind The Scenes Gallery Media</h2>
            <button
              onClick={() => {
                const title = prompt('Media Title:');
                const img = prompt('Image URL:');
                if (title && img) {
                  api.about.createItem('bts-media', { title, image: img, categoryId: 1, caption: 'On Set' }).then(() => fetchAboutData());
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#6B1D2F] text-white text-xs font-black uppercase rounded-xl"
            >
              <Plus size={14} /> Add Gallery Media
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {bts.map(m => (
              <div key={m.id} className="rounded-xl border border-stone-200 bg-stone-50 overflow-hidden space-y-2 p-3">
                {m.image && <img src={m.image} alt="" className="w-full h-36 object-cover rounded-lg" />}
                <h4 className="font-bold text-stone-900 text-xs">{m.title}</h4>
                <p className="text-[10px] text-stone-700 font-medium">{m.caption}</p>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => handleToggle('bts-media', m.id, bts, 'behind_the_scenes_media')}
                    className={`p-1.5 rounded text-xs ${m.isVisible ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-500'}`}
                  >
                    {m.isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                  </button>
                  <button
                    onClick={() => handleDelete('bts-media', m.id, 'behind_the_scenes_media')}
                    className="p-1.5 rounded bg-rose-100 text-rose-700 text-xs"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 9: CTA & Contact ───────────────────────────────────────────── */}
      {activeTab === 'cta_contact' && (
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-stone-900 border-b pb-4">CTA & Global Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">Primary Contact Email</label>
              <input
                type="text"
                value={data?.contact_information?.primaryEmail || ''}
                onChange={e => setData(prev => ({ ...prev, contact_information: { ...prev.contact_information, primaryEmail: e.target.value } }))}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#6B1D2F] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">Telegram Handle</label>
              <input
                type="text"
                value={data?.contact_information?.telegram || ''}
                onChange={e => setData(prev => ({ ...prev, contact_information: { ...prev.contact_information, telegram: e.target.value } }))}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#6B1D2F] outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              onClick={() => api.about.updateContact(data.contact_information).then(() => notify('Contact info updated'))}
              className="px-6 py-2.5 bg-[#6B1D2F] text-white text-xs font-black uppercase rounded-xl"
            >
              Save Contact Settings
            </button>
          </div>
        </div>
      )}

      {/* ── Tab 10: Section Manager ─────────────────────────────────────────── */}
      {activeTab === 'sections' && (
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-stone-900 border-b pb-4">About Page Section Visibility & Ordering</h2>
          <div className="space-y-3">
            {sections.map(sec => (
              <div key={sec.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-[#6B1D2F] uppercase">{sec.sectionKey}</span>
                  <h4 className="font-bold text-stone-900 text-sm">{sec.titleOverride || sec.sectionKey}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggle('sections', sec.id, sections, 'about_page_sections')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${sec.isVisible ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-500'}`}
                  >
                    {sec.isVisible ? 'Visible' : 'Hidden'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
