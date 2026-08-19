import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, CheckCircle2, ArrowRight, Sparkles, Clock, ShieldCheck, Zap } from 'lucide-react';
import Button from '../common/Button';
import { calculatorOptions, theme } from '../../constants';

export const ProjectCalculator = () => {
  const navigate = useNavigate();
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
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#C59A9F]/40 shadow-xl shadow-black/5 space-y-8 text-left">

            {/* Step 1: Project Type */}
            <div>
              <label className="text-xs text-[#6B1D2F] font-black uppercase tracking-widest block mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center text-xs font-black shadow-sm">1</span>
                Select Production Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {calculatorOptions.projectTypes.map((t) => {
                  const isSelected = selectedType === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedType(t.id)}
                      className={`relative overflow-hidden py-5 px-5 sm:py-5.5 sm:px-6 min-h-[58px] rounded-2xl border-2 text-left text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-between gap-3 group active:scale-[0.98] ${isSelected
                        ? 'bg-gradient-to-r from-[#6B1D2F] via-[#7D2237] to-[#8B2440] border-[#6B1D2F] text-white shadow-xl shadow-[#6B1D2F]/25 scale-[1.02] ring-2 ring-[#6B1D2F]/20'
                        : 'bg-white/80 border-[#C59A9F]/60 text-[#1C1917] hover:border-[#6B1D2F] hover:bg-white hover:shadow-md hover:scale-[1.01]'
                        }`}
                    >
                      <span className="leading-snug relative z-10">{t.label}</span>
                      <span className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 relative z-10 ${isSelected ? 'border-white bg-white scale-110' : 'border-[#C59A9F] bg-white/80 group-hover:border-[#6B1D2F]'
                        }`}>
                        {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#6B1D2F]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Production Scope */}
            <div>
              <label className="text-xs text-[#6B1D2F] font-black uppercase tracking-widest block mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center text-xs font-black shadow-sm">2</span>
                Define Project Scope
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {calculatorOptions.scopes.map((s) => {
                  const isSelected = selectedScope === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedScope(s.id)}
                      className={`relative overflow-hidden py-5 px-5 sm:py-5.5 sm:px-6 min-h-[58px] rounded-2xl border-2 text-left text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-between gap-3 group active:scale-[0.98] ${isSelected
                        ? 'bg-gradient-to-r from-[#6B1D2F] via-[#7D2237] to-[#8B2440] border-[#6B1D2F] text-white shadow-xl shadow-[#6B1D2F]/25 scale-[1.02] ring-2 ring-[#6B1D2F]/20'
                        : 'bg-white/80 border-[#C59A9F]/60 text-[#1C1917] hover:border-[#6B1D2F] hover:bg-white hover:shadow-md hover:scale-[1.01]'
                        }`}
                    >
                      <span className="leading-snug relative z-10">{s.label}</span>
                      <span className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 relative z-10 ${isSelected ? 'border-white bg-white scale-110' : 'border-[#C59A9F] bg-white/80 group-hover:border-[#6B1D2F]'
                        }`}>
                        {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#6B1D2F]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Add-on Modules */}
            <div>
              <label className="text-xs text-[#6B1D2F] font-black uppercase tracking-widest block mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center text-xs font-black shadow-sm">3</span>
                Optional Add-on Enhancements
              </label>
              <div className="space-y-3.5">
                {calculatorOptions.addons.map((a) => {
                  const isChecked = selectedAddons.includes(a.id);
                  return (
                    <div
                      key={a.id}
                      onClick={() => toggleAddon(a.id)}
                      className={`relative overflow-hidden py-5 px-5 sm:py-5.5 sm:px-6 min-h-[58px] rounded-2xl border-2 flex items-center justify-between text-xs sm:text-sm font-extrabold cursor-pointer transition-all duration-300 group active:scale-[0.99] ${isChecked
                        ? 'bg-gradient-to-r from-[#6B1D2F] via-[#7D2237] to-[#8B2440] border-[#6B1D2F] text-white shadow-xl shadow-[#6B1D2F]/20 scale-[1.01] ring-2 ring-[#6B1D2F]/20'
                        : 'bg-white/80 border-[#C59A9F]/60 text-[#1C1917] hover:border-[#6B1D2F] hover:bg-white hover:shadow-md hover:scale-[1.005]'
                        }`}
                    >
                      <div className="flex items-center gap-3 relative z-10">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all duration-300 ${isChecked ? 'bg-white border-white text-[#6B1D2F] scale-110 shadow-sm' : 'border-[#6B1D2F] bg-white text-transparent group-hover:scale-105'
                          }`}>
                          <CheckCircle2 size={16} className={isChecked ? 'text-[#6B1D2F]' : 'opacity-0'} />
                        </div>
                        <span className={isChecked ? 'text-white' : 'text-[#1C1917]'}>{a.label}</span>
                      </div>
                      <span className={`font-black relative z-10 ${isChecked ? 'text-white' : 'text-[#6B1D2F]'}`}>+${a.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Estimate Result Right Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#6B1D2F] via-[#7D2237] to-[#8B2440] text-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#C59A9F]/40 text-left flex flex-col justify-between space-y-8 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C59A9F]/25 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/20">
                <span className="text-xs uppercase tracking-widest text-[#F5E8EA] font-black flex items-center gap-2">
                  <Sparkles size={14} className="text-[#C59A9F]" /> Real-Time Estimate
                </span>
                <Calculator size={22} className="text-[#F5E8EA]" />
              </div>

              <div className="mb-8">
                <span className="text-xs text-[#F5E8EA]/90 font-bold uppercase tracking-wider block mb-2">Estimated Investment</span>
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
                    <span className="text-sm font-normal text-[#F5E8EA] ml-2">USD</span>
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/20 text-xs text-white/95 font-medium">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-[#C59A9F]" />
                  <span>Turnaround Time: <strong className="text-white font-extrabold">{estimatedDays}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-[#C59A9F]" />
                  <span>Includes 2 Revision Rounds & Full Master Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles size={16} className="text-[#C59A9F]" />
                  <span>Broadcast Ready 4K & RAW Master Exports</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <button
                type="button"
                onClick={() => { navigate('/contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="relative overflow-hidden w-full py-5.5 sm:py-6 px-8 min-h-[62px] sm:min-h-[66px] font-black tracking-widest uppercase rounded-full shadow-2xl bg-gradient-to-r from-white via-[#FFF5F6] to-white text-[#6B1D2F] hover:text-[#521321] flex items-center justify-center gap-3.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-xs sm:text-sm cursor-pointer border border-white/80 ring-4 ring-white/15 hover:ring-white/35 group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                <span className="relative z-10 font-black drop-shadow-sm tracking-[0.12em]">Lock In Estimate & Inquire</span>
                <div className="relative z-10 w-9 h-9 rounded-full bg-[#6B1D2F]/10 group-hover:bg-[#6B1D2F] flex items-center justify-center transition-colors duration-300">
                  <ArrowRight size={18} className="text-[#6B1D2F] group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
                </div>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProjectCalculator;

