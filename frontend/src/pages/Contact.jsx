import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Phone, Clock, Send, CheckCircle2,
  Database, Film, Palette, Sparkles,
} from 'lucide-react';

import Input             from '../components/common/Input';
import Button            from '../components/common/Button';
import ExpertiseSection  from '../components/sections/ExpertiseSection';
import AvailabilityCTA   from '../components/sections/AvailabilityCTA';
import { theme }         from '../constants';
import api               from '../api';
import alazarImg         from '../assets/images/alazar.png';
import heroBg            from '../assets/images/hero-bg.png';

const serviceOptions = [
  { value: 'freelance-video',  label: 'Video Editing & Color Grading',    icon: Film    },
  { value: 'freelance-design', label: 'Brand Design & Graphics',           icon: Palette },
  { value: 'in-person',        label: 'On-Set Filming & Directing',        icon: Film    },
  { value: 'full-package',     label: 'Full Package (Video + Design)',      icon: Sparkles },
];

const contactMeta = [
  {
    icon: Mail,
    label: 'Email',
    content: (
      <a href="mailto:a.asdesach1@gmail.com" className="text-[#1C1917] font-medium hover:text-[#6B1D2F] transition-colors text-sm">
        a.asdesach1@gmail.com
      </a>
    ),
  },
  {
    icon: Phone,
    label: 'Phone / WhatsApp',
    content: <p className="text-[#1C1917] font-medium text-sm">+1 (555) 123-4567</p>,
  },
  {
    icon: Clock,
    label: 'Response Time',
    content: <p className="text-[#1C1917] font-medium text-sm">Within 24 hours</p>,
  },
];

const defaultForm = {
  firstName: '',
  lastName: '',
  email: '',
  projectType: 'freelance-video',
  budget: '$3k to $5k',
  details: '',
};

export default function Contact() {
  const location = useLocation();
  const [formData, setFormData] = useState(() => {
    if (location.state?.estimate) {
      const est = location.state.estimate;
      let budgetVal = '$3k to $5k';
      if (est < 3000) budgetVal = 'under-3k';
      else if (est <= 5000) budgetVal = '$3k to $5k';
      else if (est <= 10000) budgetVal = '$5k to $10k';
      else budgetVal = '$10k+';

      const typeMap = {
        'commercial': 'freelance-video',
        'documentary': 'freelance-video',
        'music-video': 'freelance-video',
        'brand-design': 'freelance-design',
      };

      return {
        ...defaultForm,
        projectType: typeMap[location.state.projectType] || 'freelance-video',
        budget: budgetVal,
        details: `Calculator Estimate: $${est.toLocaleString()} USD (${location.state.typeName || 'Production'}, ${location.state.scope || 'Scope'}).`,
      };
    }
    if (location.state?.selectedProject) {
      return {
        ...defaultForm,
        details: `Hello Alazar, I saw your project "${location.state.selectedProject}" and would like to discuss a similar production/design for my project.`,
      };
    }
    if (location.state?.projectType) {
      return {
        ...defaultForm,
        projectType: location.state.projectType,
      };
    }
    return defaultForm;
  });

  // Keep formData in sync if user navigates with new state
  React.useEffect(() => {
    if (location.state?.selectedProject) {
      setFormData(prev => ({
        ...prev,
        details: `Hello Alazar, I saw your project "${location.state.selectedProject}" and would like to discuss a similar production/design for my project.`,
      }));
    } else if (location.state?.projectType) {
      setFormData(prev => ({
        ...prev,
        projectType: location.state.projectType,
      }));
    }
  }, [location.state]);

  const [loading,     setLoading]     = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [inquiryRef,  setInquiryRef]  = useState('');
  const [serverError, setServerError] = useState(null);
  const [errors,      setErrors]      = useState({});
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const contactMetaItems = [
    {
      icon: Mail,
      label: 'Email',
      value: 'a.asdesach1@gmail.com',
      content: (
        <div className="flex items-center gap-2">
          <a href="mailto:a.asdesach1@gmail.com" className="text-[#1C1917] font-medium hover:text-[#6B1D2F] transition-colors text-sm">
            a.asdesach1@gmail.com
          </a>
          <button
            type="button"
            onClick={() => copyToClipboard('a.asdesach1@gmail.com', 'email')}
            className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#FAFAF9] border border-[#C59A9F]/50 text-[#6B1D2F] hover:bg-[#6B1D2F] hover:text-white transition-colors"
          >
            {copiedField === 'email' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      ),
    },
    {
      icon: Phone,
      label: 'Phone / WhatsApp',
      value: '+1 (555) 123-4567',
      content: (
        <div className="flex items-center gap-2">
          <p className="text-[#1C1917] font-medium text-sm">+1 (555) 123-4567</p>
          <button
            type="button"
            onClick={() => copyToClipboard('+1 (555) 123-4567', 'phone')}
            className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#FAFAF9] border border-[#C59A9F]/50 text-[#6B1D2F] hover:bg-[#6B1D2F] hover:text-white transition-colors"
          >
            {copiedField === 'phone' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      ),
    },
    {
      icon: Clock,
      label: 'Response Time',
      content: <p className="text-[#1C1917] font-medium text-sm">Within 24 hours</p>,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.details.trim()) newErrors.details = 'Please describe your project';

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoading(true);
    try {
      const res = await api.inquiries.create(formData);
      setInquiryRef(res?.referenceNumber || res?.data?.reference_number || 'INQ-2026-948123');
      setSubmitted(true);
    } catch (err) {
      setServerError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      id="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAFAF9] mesh-bg pt-28 sm:pt-36 pb-0 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Motion Flow Background Image Layer 1: hero-bg.png */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          x: ['0%', '-2%', '0%'],
          y: ['0%', '-1.5%', '0%'],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 z-0 pointer-events-none opacity-25 mix-blend-multiply"
      >
        <img
          src={heroBg}
          alt="Hero Flow Texture"
          className="w-full h-full object-cover object-center filter blur-[1px]"
        />
      </motion.div>

      {/* Motion Flow Layer 2: Floating alazar.png visual element */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 1.5, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-10 right-0 sm:right-10 md:right-20 w-[260px] xs:w-[340px] sm:w-[500px] md:w-[650px] opacity-10 sm:opacity-20 md:opacity-25 pointer-events-none z-0 mix-blend-multiply filter blur-[0.5px]"
      >
        <img
          src={alazarImg}
          alt="Alazar Motion Flow"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-[#6B1D2F]/18 via-[#8B1E3F]/12 to-[#C59A9F]/20 blur-[180px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-[#C59A9F]/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] mb-20 sm:mb-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* ── Left info panel ─────────────────────────────────────── */}
          <motion.div
            id="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6 sm:space-y-8 scroll-mt-28"
          >
            <div>
              <h1
                className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] mb-4 sm:mb-5 leading-[1.06] tracking-tight break-words"
                style={{ fontFamily: theme.fonts.heading }}
              >
                Let's Build<br />
                <span className="text-gradient-burgundy font-black">Something Great.</span>
              </h1>
              <p className="text-[#1C1917] font-medium text-sm sm:text-base md:text-lg leading-relaxed max-w-md bg-white/85 backdrop-blur-md px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border border-[#C59A9F]/40 shadow-sm inline-block max-w-full break-words">
                Ready to start your next video or design project? Fill out the brief below, your inquiry goes straight into the PERN backend.
              </p>
            </div>

            {/* Discipline mini-cards */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {[
                { icon: Film,    title: 'Video Production',  sub: 'Editing · Grading · Sound' },
                { icon: Palette, title: 'Graphic Design',    sub: 'Brand · Motion · 3D Art'   },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex flex-col items-center justify-center text-center p-3 sm:p-4 bg-white rounded-2xl border border-[#C59A9F] shadow-sm hover:border-[#6B1D2F] transition-colors">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#6B1D2F]/20 mb-1.5 sm:mb-2">
                    <Icon size={16} />
                  </div>
                  <div className="w-full">
                    <p className="text-xs font-black text-[#1C1917] leading-tight mb-0.5 text-center break-words">{title}</p>
                    <p className="text-[10px] text-[#292524] font-semibold text-center">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact meta */}
            <div className="space-y-3">
              {contactMetaItems.map(({ icon: Icon, label, content }) => (
                <div key={label} className="flex items-center gap-3 sm:gap-3.5 p-3.5 sm:p-4 bg-white rounded-2xl border border-[#C59A9F] shadow-sm">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#FAFAF9] border border-[#C59A9F]/40 rounded-full flex items-center justify-center text-[#6B1D2F] flex-shrink-0">
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-[#6B1D2F] uppercase tracking-widest font-black mb-0.5">{label}</p>
                    {content}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability pulse */}
            <div className="flex items-center gap-3 p-3.5 sm:p-4 bg-gradient-to-r from-[#6B1D2F] to-[#8B1E3F] rounded-2xl shadow-lg shadow-[#6B1D2F]/20">
              <div className="relative flex-shrink-0">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-0.5">Current Status</p>
                <p className="text-xs sm:text-sm font-black text-white">Accepting Q3 / Q4 Projects Worldwide</p>
              </div>
            </div>
          </motion.div>

          {/* ── Right form panel ───────────────────────────────────── */}
          <motion.div
            id="contact-form"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-white rounded-[2rem] border-2 border-[#C59A9F] shadow-xl overflow-hidden scroll-mt-24 relative"
          >
            {/* Direct alias for #form links */}
            <div id="form" className="absolute -top-24 left-0 pointer-events-none" />
            {/* Top accent */}
            <div className="h-1 bg-gradient-to-r from-[#6B1D2F] via-[#C59A9F] to-[#8B1E3F]" />

            <div className="p-5 sm:p-8 md:p-12">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-16 text-center space-y-6"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-[#6B1D2F]/30">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3
                      className="text-3xl font-black text-[#1C1917]"
                      style={{ fontFamily: theme.fonts.heading }}
                    >
                      Inquiry Saved!
                    </h3>

                    {inquiryRef && (
                      <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#FAFAF9] border border-[#C59A9F] rounded-full text-xs font-mono font-bold text-[#6B1D2F] shadow-sm">
                        <span>Reference Code: <strong>{inquiryRef}</strong></span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(inquiryRef, 'ref')}
                          className="px-2.5 py-0.5 rounded bg-[#6B1D2F] text-white text-[10px] uppercase font-sans font-black hover:bg-[#8B1E3F] transition-colors"
                        >
                          {copiedField === 'ref' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    )}

                    <p className="text-[#292524] font-medium max-w-sm mx-auto text-sm leading-relaxed">
                      Thank you, <strong className="text-[#1C1917]">{formData.firstName}</strong>. Your brief has been recorded in PostgreSQL, I'll review it within 24 hours.
                    </p>
                    <Button variant="outline" onClick={() => { setSubmitted(false); setFormData(defaultForm); }}>
                      Send Another Inquiry
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <h3
                        className="text-2xl font-black text-[#1C1917] mb-1"
                        style={{ fontFamily: theme.fonts.heading }}
                      >
                        Project Inquiry
                      </h3>
                      <p className="text-[11px] text-[#292524] font-bold uppercase tracking-wider">
                        All fields marked * are required
                      </p>
                    </div>

                    {serverError && (
                      <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl">
                        {serverError}
                      </div>
                    )}

                    {/* Name row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input label="First Name *" name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} error={errors.firstName} required />
                      <Input label="Last Name"    name="lastName"  placeholder="Doe"  value={formData.lastName}  onChange={handleChange} />
                    </div>

                    <Input label="Email Address *" name="email" type="email" placeholder="john@company.com" value={formData.email} onChange={handleChange} error={errors.email} required />

                    {/* Service type — custom styled buttons */}
                    <div>
                      <label className="text-[11px] text-[#1C1917] font-black tracking-widest uppercase block mb-3">
                        Service Type
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {serviceOptions.map(({ value, label, icon: Icon }) => {
                          const active = formData.projectType === value;
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setFormData(p => ({ ...p, projectType: value }))}
                              className={`flex flex-col items-center justify-center text-center p-3 sm:p-3.5 rounded-xl border-2 text-xs font-black transition-all ${
                                active
                                  ? 'bg-[#6B1D2F] border-[#6B1D2F] text-white shadow-md'
                                  : 'bg-white border-[#C59A9F]/50 text-[#1C1917] hover:border-[#6B1D2F]'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mb-1.5 sm:mb-2 ${
                                active ? 'bg-white/20 text-white' : 'bg-[#FAFAF9] text-[#6B1D2F]'
                              }`}>
                                <Icon size={15} />
                              </div>
                              <span className="text-[11px] sm:text-xs leading-tight text-center">{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] text-[#1C1917] font-black tracking-widest uppercase">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-[#FAFAF9] border-2 border-[#C59A9F] rounded-xl px-4 py-3.5 text-[#1C1917] font-medium focus:outline-none focus:border-[#6B1D2F] text-sm appearance-none cursor-pointer transition-colors"
                      >
                        <option value="under-3k">&lt; $3,000</option>
                        <option value="$3k to $5k">$3,000 to $5,000</option>
                        <option value="$5k to $10k">$5,000 to $10,000</option>
                        <option value="$10k+">$10,000+</option>
                      </select>
                    </div>

                    <Input
                      label="Project Details *"
                      name="details"
                      multiline
                      rows={5}
                      placeholder="Describe your goals, audience, deliverables, and timeline..."
                      value={formData.details}
                      onChange={handleChange}
                      error={errors.details}
                      required
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      loading={loading}
                      icon={<Send size={16} />}
                      className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest"
                    >
                      Send Project Inquiry
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Specialist context ─────────────────────────────────────────── */}
      <ExpertiseSection />

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <AvailabilityCTA />
    </motion.div>
  );
}
