import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Clock, Send, CheckCircle2, Database } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import AvailabilityCTA from '../components/sections/AvailabilityCTA';
import { theme } from '../constants';
import api from '../api';
import alazarImg from '../assets/images/alazar.png';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    projectType: 'freelance-video',
    budget: '$3k - $5k',
    details: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.details.trim()) newErrors.details = 'Please describe your project details';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await api.inquiries.create(formData);
      setSubmitted(true);
    } catch (err) {
      setServerError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ firstName: '', lastName: '', email: '', projectType: 'freelance-video', budget: '$3k - $5k', details: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAFAF9] pt-28 sm:pt-36 pb-0 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Floating background image */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-0 w-[450px] md:w-[600px] opacity-15 pointer-events-none z-0 mix-blend-luminosity filter blur-[0.5px]"
      >
        <img src={alazarImg} alt="Alazar Visual" className="w-full h-auto object-contain" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl mb-16 sm:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6 sm:space-y-8 relative z-10"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#6B1D2F]/10 border border-[#6B1D2F]/20 rounded-full text-xs text-[#6B1D2F] font-medium mb-4">
                <Database size={13} /> Direct Database Sync
              </div>
              <span className="text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold block mb-3">Get In Touch</span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#1C1917] mb-4 sm:mb-6 leading-tight" style={{ fontFamily: theme.fonts.heading }}>
                Let's <span className="italic font-light text-[#6B1D2F]">Work Together.</span>
              </h1>
              <p className="text-[#78716C] font-light text-base md:text-lg leading-relaxed">
                Ready to start your next video or design project? Fill out the form and your inquiry goes straight into the PostgreSQL database.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
              {[
                { icon: <Mail size={18} />, label: 'Email', content: <a href="mailto:hello@alazar.com" className="text-[#1C1917] font-light hover:text-[#6B1D2F] transition-colors text-xs sm:text-sm">hello@alazar.com</a> },
                { icon: <Phone size={18} />, label: 'Phone / WhatsApp', content: <p className="text-[#1C1917] font-light text-xs sm:text-sm">+1 (555) 123-4567</p> },
                { icon: <Clock size={18} />, label: 'Response Time', content: <p className="text-[#1C1917] font-light text-xs sm:text-sm">Within 24 hours</p> },
              ].map(({ icon, label, content }) => (
                <div key={label} className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-white rounded-xl border border-[#E5D9DB] shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F5E8EA] border border-[#C59A9F]/40 rounded-full flex items-center justify-center text-[#6B1D2F] flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs text-[#78716C] uppercase tracking-wider font-semibold">{label}</p>
                    {content}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-white p-5 sm:p-8 md:p-12 rounded-2xl border border-[#E5D9DB] shadow-sm relative"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-16 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-[#F5E8EA] border border-[#C59A9F] text-[#6B1D2F] rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-3xl text-[#1C1917] font-bold" style={{ fontFamily: theme.fonts.heading }}>
                    Inquiry Saved to Database
                  </h3>
                  <p className="text-[#78716C] font-light max-w-md mx-auto text-sm leading-relaxed">
                    Thank you, {formData.firstName}. Your project brief has been recorded in PostgreSQL. I'll review it shortly.
                  </p>
                  <Button variant="outline" onClick={resetForm}>Send Another Inquiry</Button>
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
                  <h3 className="text-2xl text-[#1C1917] font-bold mb-2" style={{ fontFamily: theme.fonts.heading }}>
                    Project Inquiry
                  </h3>

                  {serverError && (
                    <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">
                      {serverError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input label="First Name" name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} error={errors.firstName} required />
                    <Input label="Last Name" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} />
                  </div>

                  <Input label="Email Address" name="email" type="email" placeholder="john@company.com" value={formData.email} onChange={handleChange} error={errors.email} required />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#78716C] font-semibold tracking-wider uppercase">Project Type</label>
                      <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full bg-[#FAFAF9] border border-[#E5D9DB] rounded-lg px-4 py-3 text-[#1C1917] focus:outline-none focus:border-[#6B1D2F] text-sm appearance-none cursor-pointer transition-colors">
                        <option value="freelance-video">Video Editing & Color Grading</option>
                        <option value="freelance-design">Brand Design & Graphics</option>
                        <option value="in-person">On-Set Filming & Directing</option>
                        <option value="full-package">Full Package (Video + Design)</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#78716C] font-semibold tracking-wider uppercase">Budget Range</label>
                      <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-[#FAFAF9] border border-[#E5D9DB] rounded-lg px-4 py-3 text-[#1C1917] focus:outline-none focus:border-[#6B1D2F] text-sm appearance-none cursor-pointer transition-colors">
                        <option value="under-3k">&lt; $3,000</option>
                        <option value="$3k - $5k">$3,000 - $5,000</option>
                        <option value="$5k - $10k">$5,000 - $10,000</option>
                        <option value="$10k+">$10,000+</option>
                      </select>
                    </div>
                  </div>

                  <Input label="Project Details" name="details" multiline rows={5} placeholder="Tell me about your goals, target audience, deliverables, and timeline..." value={formData.details} onChange={handleChange} error={errors.details} required />

                  <Button type="submit" variant="primary" loading={loading} icon={<Send size={16} />} className="w-full py-4 mt-2">
                    Send Inquiry to PERN Backend
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AvailabilityCTA />
    </motion.div>
  );
}
