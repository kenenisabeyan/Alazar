import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { theme } from '../utils/constants';

export const Contact = () => {
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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.details.trim()) newErrors.details = 'Please describe your project details';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAFAF9] pt-36 pb-24"
      style={{ fontFamily: theme.fonts.body }}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid md:grid-cols-12 gap-16 items-start">
          
          {/* Contact Info Left */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5 space-y-8"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold block mb-3">Initiate Collaboration</span>
              <h1 className="text-5xl md:text-7xl font-bold text-[#1C1917] mb-6 leading-none" style={{ fontFamily: theme.fonts.heading }}>
                Let's <span className="italic font-light text-[#6B1D2F]">Create.</span>
              </h1>
              <p className="text-[#78716C] font-light text-base md:text-lg leading-relaxed">
                Ready to elevate your visual project? Fill out the inquiry form or reach out directly to discuss timelines, concept ideas, and availability.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#E5D9DB] shadow-sm">
                <div className="w-12 h-12 bg-[#F5E8EA] border border-[#C59A9F]/40 rounded-full flex items-center justify-center text-[#6B1D2F] flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-[#78716C] uppercase tracking-wider font-semibold">Direct Email</p>
                  <a href="mailto:hello@alazar.com" className="text-[#1C1917] font-light hover:text-[#6B1D2F] transition-colors text-sm">
                    hello@alazar.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#E5D9DB] shadow-sm">
                <div className="w-12 h-12 bg-[#F5E8EA] border border-[#C59A9F]/40 rounded-full flex items-center justify-center text-[#6B1D2F] flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-[#78716C] uppercase tracking-wider font-semibold">Phone / WhatsApp</p>
                  <p className="text-[#1C1917] font-light text-sm">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#E5D9DB] shadow-sm">
                <div className="w-12 h-12 bg-[#F5E8EA] border border-[#C59A9F]/40 rounded-full flex items-center justify-center text-[#6B1D2F] flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-[#78716C] uppercase tracking-wider font-semibold">Response Window</p>
                  <p className="text-[#1C1917] font-light text-sm">Within 24 business hours</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Contact Form Right */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7 bg-white p-8 md:p-12 rounded-2xl border border-[#E5D9DB] shadow-sm relative"
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
                    Inquiry Received
                  </h3>
                  <p className="text-[#78716C] font-light max-w-md mx-auto text-sm leading-relaxed">
                    Thank you for reaching out, {formData.firstName}. Your project brief has been logged. I will review your requirements and get back to you shortly.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        projectType: 'freelance-video',
                        budget: '$3k - $5k',
                        details: '',
                      });
                    }}
                  >
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
                  <h3 className="text-2xl text-[#1C1917] font-bold mb-2" style={{ fontFamily: theme.fonts.heading }}>
                    Project Inquiry
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input 
                      label="First Name" 
                      name="firstName"
                      placeholder="John" 
                      value={formData.firstName}
                      onChange={handleChange}
                      error={errors.firstName}
                      required
                    />
                    <Input 
                      label="Last Name" 
                      name="lastName"
                      placeholder="Doe" 
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <Input 
                    label="Email Address" 
                    name="email"
                    type="email" 
                    placeholder="john@company.com" 
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#78716C] font-semibold tracking-wider uppercase">
                        Project Discipline
                      </label>
                      <select 
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full bg-[#FAFAF9] border border-[#E5D9DB] rounded-lg px-4 py-3 text-[#1C1917] focus:outline-none focus:border-[#6B1D2F] focus:ring-1 focus:ring-[#6B1D2F]/20 text-sm appearance-none cursor-pointer transition-colors"
                      >
                        <option value="freelance-video">Freelance Video Editing / Color</option>
                        <option value="freelance-design">Brand Identity & Graphic Design</option>
                        <option value="in-person">In-Person Shoot / Consultation</option>
                        <option value="full-package">Full Production (Video + Design)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#78716C] font-semibold tracking-wider uppercase">
                        Estimated Budget Range
                      </label>
                      <select 
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-[#FAFAF9] border border-[#E5D9DB] rounded-lg px-4 py-3 text-[#1C1917] focus:outline-none focus:border-[#6B1D2F] focus:ring-1 focus:ring-[#6B1D2F]/20 text-sm appearance-none cursor-pointer transition-colors"
                      >
                        <option value="under-3k">&lt; $3,000</option>
                        <option value="$3k - $5k">$3,000 - $5,000</option>
                        <option value="$5k - $10k">$5,000 - $10,000</option>
                        <option value="$10k+">$10,000+</option>
                      </select>
                    </div>
                  </div>

                  <Input 
                    label="Project Details & Vision" 
                    name="details"
                    multiline 
                    rows={5}
                    placeholder="Tell me about your goals, target audience, deliverables needed, and timeline benchmarks..." 
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
                    className="w-full py-4 mt-2"
                  >
                    Send Inquiry
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
