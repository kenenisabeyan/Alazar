import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, CheckCircle2, ArrowRight, Sparkles, Clock, ShieldCheck, Zap } from 'lucide-react';
import Button from '../common/Button';
import { calculatorOptions, theme } from '../../utils/constants';

export const ProjectCalculator = ({ setCurrentPage }) => {
  const [selectedType, setSelectedType] = useState(calculatorOptions.projectTypes[0].id);
  const [selectedScope, setSelectedScope] = useState(calculatorOptions.scopes[0].id);
  const [selectedAddons, setSelectedAddons] = useState(['color', 'sound']);

  const typeObj = calculatorOptions.projectTypes.find(t => t.id === selectedType) || calculatorOptions.projectTypes[0];
  const scopeObj = calculatorOptions.scopes.find(s => s.id === selectedScope) || calculatorOptions.scopes[0];

  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = calculatorOptions.addons.find(a => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const estimatedTotal = Math.round(typeObj.basePrice * scopeObj.multiplier + addonsTotal);
  const estimatedDays = selectedScope === 'onset' ? '7 - 12 Days' : '4 - 7 Days';

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(a => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  return (
    <section className="py-28 bg-[#FAFAF9] relative overflow-hidden" style={{ fontFamily: theme.fonts.body }}>
      {/* Background Ambient Mesh */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-gradient-to-br from-[#6B1D2F]/08 via-[#C59A9F]/12 to-transparent blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C59A9F]/40 text-xs uppercase tracking-widest text-[#6B1D2F] font-extrabold shadow-sm"
          >
            <Zap size={13} /> Transparent Pricing
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-[#1C1917] tracking-tight"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Interactive <span className="italic font-light text-gradient-burgundy">Scope Estimator</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#78716C] font-light text-base md:text-lg"
          >
            Customize your project parameters, scope, and deliverable modules for an instant budgetary estimate.
          </motion.p>
        </div>

        {/* Calculator Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Left */}
          <div className="lg:col-span-7 glass-card-luxury p-8 sm:p-10 rounded-3xl space-y-8 text-left">
            
            {/* Step 1: Project Type */}
            <div>
              <label className="text-xs text-[#78716C] font-extrabold uppercase tracking-widest block mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center text-[10px]">1</span>
                Select Production Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {calculatorOptions.projectTypes.map((t) => {
                  const isSelected = selectedType === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedType(t.id)}
                      className={`p-4.5 rounded-2xl border text-left text-xs font-bold transition-all relative overflow-hidden ${
                        isSelected 
                          ? 'bg-[#6B1D2F] border-[#6B1D2F] text-white shadow-lg shadow-[#6B1D2F]/20' 
                          : 'bg-white border-[#E5D9DB] text-[#1C1917] hover:border-[#C59A9F] hover:bg-[#FAFAF9]'
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Production Scope */}
            <div>
              <label className="text-xs text-[#78716C] font-extrabold uppercase tracking-widest block mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center text-[10px]">2</span>
                Define Project Scope
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {calculatorOptions.scopes.map((s) => {
                  const isSelected = selectedScope === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedScope(s.id)}
                      className={`p-4.5 rounded-2xl border text-left text-xs font-bold transition-all ${
                        isSelected 
                          ? 'bg-[#6B1D2F] border-[#6B1D2F] text-white shadow-lg shadow-[#6B1D2F]/20' 
                          : 'bg-white border-[#E5D9DB] text-[#1C1917] hover:border-[#C59A9F] hover:bg-[#FAFAF9]'
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Add-on Modules */}
            <div>
              <label className="text-xs text-[#78716C] font-extrabold uppercase tracking-widest block mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center text-[10px]">3</span>
                Optional Add-on Enhancements
              </label>
              <div className="space-y-3">
                {calculatorOptions.addons.map((a) => {
                  const isChecked = selectedAddons.includes(a.id);
                  return (
                    <div
                      key={a.id}
                      onClick={() => toggleAddon(a.id)}
                      className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-semibold cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-[#F5E8EA] border-[#6B1D2F] text-[#6B1D2F]' 
                          : 'bg-white border-[#E5D9DB] text-[#78716C] hover:text-[#1C1917] hover:border-[#C59A9F]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                          isChecked ? 'bg-[#6B1D2F] border-[#6B1D2F] text-white shadow-sm' : 'border-[#E5D9DB] bg-white'
                        }`}>
                          {isChecked && <CheckCircle2 size={15} />}
                        </div>
                        <span>{a.label}</span>
                      </div>
                      <span className="font-extrabold text-[#6B1D2F]">+${a.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Estimate Result Right Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1E0A0D] to-[#2E1216] text-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#8B1E3F]/40 text-left flex flex-col justify-between space-y-8 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B1E3F]/20 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#8B1E3F]/40">
                <span className="text-xs uppercase tracking-widest text-[#E8C4C8] font-black flex items-center gap-2">
                  <Sparkles size={14} className="text-[#E8C4C8]" /> Real-Time Estimate
                </span>
                <Calculator size={22} className="text-[#E8C4C8]" />
              </div>

              <div className="mb-8">
                <span className="text-xs text-[#A89597] font-bold uppercase tracking-wider block mb-2">Estimated Investment</span>
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={estimatedTotal}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="text-5xl md:text-6xl font-black text-white tracking-tight" 
                    style={{ fontFamily: theme.fonts.heading }}
                  >
                    ${estimatedTotal.toLocaleString()}
                    <span className="text-sm font-normal text-[#A89597] ml-2">USD</span>
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="space-y-4 pt-6 border-t border-[#8B1E3F]/40 text-xs text-[#F5F0F1]/90 font-medium">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-[#E8C4C8]" />
                  <span>Turnaround Time: <strong className="text-white font-extrabold">{estimatedDays}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-[#E8C4C8]" />
                  <span>Includes 2 Revision Rounds & Full Master Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles size={16} className="text-[#E8C4C8]" />
                  <span>Broadcast Ready 4K & RAW Master Exports</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <Button 
                variant="primary" 
                className="w-full py-4.5 font-black tracking-widest uppercase rounded-full shadow-xl shadow-[#8B1E3F]/30 hover:shadow-[#8B1E3F]/50 bg-gradient-to-r from-[#8B1E3F] to-[#A3234A]"
                icon={<ArrowRight size={17} />}
                onClick={() => {
                  if (setCurrentPage) setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Lock In Estimate & Inquire
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProjectCalculator;

