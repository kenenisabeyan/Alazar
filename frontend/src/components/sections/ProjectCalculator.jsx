import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator, CheckCircle2, ArrowRight,
  Clock, ShieldCheck, Zap, Film, PenTool,
  Plus, Minus, ChevronRight,
} from 'lucide-react';
import { calculatorOptions, theme } from '../../constants';

// ─── Small building-block components ────────────────────────────────────────

const StepBadge = ({ n }) => (
  <span className="w-7 h-7 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center text-xs font-black shadow-sm flex-shrink-0">
    {n}
  </span>
);

const SectionLabel = ({ step, children }) => (
  <label className="text-[11px] text-[#6B1D2F] font-black uppercase tracking-widest flex items-center gap-2 mb-4 select-none">
    <StepBadge n={step} /> {children}
  </label>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export const ProjectCalculator = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(calculatorOptions.projectTypes[0].id);
  const [selectedScope, setSelectedScope] = useState(calculatorOptions.scopes[0].id);
  const [selectedAddons, setSelectedAddons] = useState(['color', 'sound']);

  const typeObj = calculatorOptions.projectTypes.find(t => t.id === selectedType) ?? calculatorOptions.projectTypes[0];
  const scopeObj = calculatorOptions.scopes.find(s => s.id === selectedScope) ?? calculatorOptions.scopes[0];

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const a = calculatorOptions.addons.find(x => x.id === id);
    return sum + (a ? a.price : 0);
  }, 0);

  const baseSubtotal = Math.round(typeObj.basePrice * scopeObj.multiplier);
  const grandTotal = baseSubtotal + addonsTotal;
  const estimatedDays = selectedScope === 'onset' ? '7 to 12 Days' : '4 to 7 Days';

  const toggleAddon = (id) =>
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);

  // ── Shared button classes ─────────────────────────────────────────────────
  const optBtn = (active) =>
    `relative overflow-hidden rounded-2xl border-2 text-left text-xs font-black transition-all duration-300 flex items-center justify-between gap-3 group cursor-pointer p-4 ${active
      ? 'bg-[#6B1D2F] border-[#6B1D2F] text-white shadow-xl shadow-[#6B1D2F]/25'
      : 'bg-white border-[#C59A9F]/50 text-[#1C1917] hover:border-[#6B1D2F] hover:shadow-md'
    }`;

  return (
    <section
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body, background: '#FAFAF9' }}
    >
      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#6B1D2F]/08 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C59A9F]/12 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C59A9F]/40 text-[11px] font-black text-[#6B1D2F] uppercase tracking-widest shadow-sm mb-5"
            >
              <Zap size={12} className="text-[#6B1D2F]" /> Transparent Pricing
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.06] tracking-tight break-words"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Interactive<br />
              <span className="text-gradient-burgundy font-black">Scope Estimator.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#1C1917] font-medium text-sm sm:text-base max-w-xs leading-relaxed bg-white/85 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#C59A9F]/40 shadow-sm"
          >
            Configure your production scope in real-time for an instant budgetary estimate with complete transparency.
          </motion.p>
        </div>

        {/* ── Calculator grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT — controls panel ------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-7 bg-white rounded-[2rem] border border-[#C59A9F]/60 shadow-xl p-5 sm:p-8 md:p-10 space-y-8 sm:space-y-10"
          >

            {/* Step 1 – project type */}
            <div>
              <SectionLabel step="1">Production Category</SectionLabel>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                {calculatorOptions.projectTypes.map((t) => {
                  const isActive = selectedType === t.id;
                  const Icon = t.id.includes('design') ? PenTool : Film;
                  return (
                    <button key={t.id} type="button" onClick={() => setSelectedType(t.id)} className={optBtn(isActive)}>
                      {/* Active glow blob */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent pointer-events-none" />
                      )}
                      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 relative z-10 w-full sm:w-auto">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all mx-auto sm:mx-0 ${isActive ? 'bg-white/20 text-white shadow-md' : 'bg-[#FAFAF9] text-[#6B1D2F]'
                          }`}>
                          <Icon size={16} />
                        </div>
                        <div className="min-w-0">
                          <span className={`leading-snug block text-xs font-black break-normal whitespace-normal ${isActive ? 'text-white' : 'text-[#1C1917]'}`}>
                            {t.label}
                          </span>
                          <span className={`text-[10px] font-bold block mt-0.5 ${isActive ? 'text-[#FAFAF9]/80' : 'text-[#292524]'}`}>
                            from ${t.basePrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 items-center justify-center flex-shrink-0 relative z-10 transition-all hidden sm:flex ${isActive ? 'border-white bg-white/30' : 'border-[#C59A9F]/60 bg-white'
                        }`}>
                        {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 – scope */}
            <div>
              <SectionLabel step="2">Project Scope</SectionLabel>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                {calculatorOptions.scopes.map((s) => {
                  const isActive = selectedScope === s.id;
                  return (
                    <button key={s.id} type="button" onClick={() => setSelectedScope(s.id)} className={optBtn(isActive)}>
                      {isActive && <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent pointer-events-none" />}
                      <div className="relative z-10 flex-1 w-full text-center sm:text-left">
                        <span className={`block text-xs font-black mb-0.5 break-normal whitespace-normal ${isActive ? 'text-white' : 'text-[#1C1917]'}`}>{s.label}</span>
                        <span className={`text-[10px] font-bold block ${isActive ? 'text-[#FAFAF9]/80' : 'text-[#292524]'}`}>
                          ×{s.multiplier} base rate
                        </span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 items-center justify-center flex-shrink-0 relative z-10 transition-all hidden sm:flex ${isActive ? 'border-white bg-white/30' : 'border-[#C59A9F]/60 bg-white'
                        }`}>
                        {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3 – add-ons */}
            <div>
              <SectionLabel step="3">Optional Add-on Modules</SectionLabel>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                {calculatorOptions.addons.map((a) => {
                  const checked = selectedAddons.includes(a.id);
                  return (
                    <div
                      key={a.id}
                      onClick={() => toggleAddon(a.id)}
                      className={`flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2 sm:gap-4 rounded-2xl border-2 p-3 sm:p-4 cursor-pointer transition-all duration-300 group ${checked
                          ? 'bg-[#6B1D2F] border-[#6B1D2F] text-white shadow-lg shadow-[#6B1D2F]/20'
                          : 'bg-white border-[#C59A9F]/50 hover:border-[#6B1D2F] hover:shadow-sm'
                        }`}
                    >
                      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 flex-1 min-w-0 w-full sm:w-auto">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all mx-auto sm:mx-0 ${checked
                            ? 'bg-white/20 text-white shadow-sm'
                            : 'bg-[#FAFAF9] text-[#6B1D2F] group-hover:bg-[#6B1D2F] group-hover:text-white'
                          }`}>
                          {checked
                            ? <CheckCircle2 size={15} />
                            : <Plus size={15} />}
                        </div>
                        <span className={`text-xs font-black break-normal whitespace-normal leading-tight ${checked ? 'text-white' : 'text-[#1C1917]'}`}>
                          {a.label}
                        </span>
                      </div>
                      <span className={`text-[11px] sm:text-xs font-black flex-shrink-0 flex items-center justify-center gap-1 mt-1 sm:mt-0 ${checked ? 'text-[#FAFAF9]/90' : 'text-[#6B1D2F]'
                        }`}>
                        {checked ? <Minus size={11} /> : <Plus size={11} />}
                        ${a.price.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.div>

          {/* RIGHT — live estimate panel ---------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-5 bg-gradient-to-br from-[#6B1D2F] via-[#521523] to-[#3B0E19] text-white rounded-[2rem] overflow-hidden shadow-2xl shadow-[#6B1D2F]/20 border border-[#C59A9F]/30 flex flex-col sticky top-28"
          >
            {/* Top accent stripe */}
            <div className="h-1 w-full bg-gradient-to-r from-[#8B1E3F] via-[#C59A9F] to-[#8B1E3F]" />

            {/* Ambient glow inside */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 p-5 sm:p-8 md:p-10 flex flex-col gap-6 sm:gap-8 flex-grow">

              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-widest text-white/70 font-black">
                  Live Estimate
                </span>
                <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center shadow-lg">
                  <Calculator size={18} />
                </div>
              </div>

              {/* Grand total */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-white/60 mb-2">
                  Estimated Investment
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={grandTotal}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.97 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-end gap-2"
                  >
                    <span
                      className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none"
                      style={{ fontFamily: theme.fonts.heading }}
                    >
                      ${grandTotal.toLocaleString()}
                    </span>
                    <span className="text-sm font-bold text-white/60 pb-1">USD</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Breakdown rows */}
              <div className="space-y-3 p-5 bg-[#1E0A0D]/30 border border-white/15 rounded-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-3">
                  Price Breakdown
                </p>

                <div className="flex justify-between text-xs font-medium text-white/90">
                  <span className="flex items-center gap-2">
                    <ChevronRight size={12} className="text-[#C59A9F]" />
                    {typeObj.label}
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={typeObj.basePrice}
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.18 }}
                    >
                      ${typeObj.basePrice.toLocaleString()}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {scopeObj.multiplier !== 1.0 && (
                  <div className="flex justify-between text-xs font-medium text-white/90">
                    <span className="flex items-center gap-2">
                      <ChevronRight size={12} className="text-[#C59A9F]" />
                      {scopeObj.label} (×{scopeObj.multiplier})
                    </span>
                    <span className="text-[#C59A9F]">
                      +${(baseSubtotal - typeObj.basePrice).toLocaleString()}
                    </span>
                  </div>
                )}

                {selectedAddons.map(id => {
                  const a = calculatorOptions.addons.find(x => x.id === id);
                  if (!a) return null;
                  return (
                    <div key={id} className="flex justify-between text-xs font-medium text-white/90">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-[#C59A9F]" />
                        {a.label}
                      </span>
                      <span className="text-[#C59A9F]">+${a.price.toLocaleString()}</span>
                    </div>
                  );
                })}

                <div className="pt-3 border-t border-white/15 flex justify-between text-sm font-black text-white">
                  <span>Total</span>
                  <span>${grandTotal.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Delivery meta */}
              <div className="space-y-3">
                {[
                  { icon: Clock, text: `Turnaround: ${estimatedDays}` },
                  { icon: ShieldCheck, text: '2 revision rounds · Full master delivery' },
                  { icon: Zap, text: 'Broadcast-ready 4K & RAW exports' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-xs text-white/80 font-medium">
                    <Icon size={14} className="text-[#C59A9F] flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={() => {
                  navigate('/contact', {
                    state: {
                      estimate: grandTotal,
                      projectType: selectedType,
                      scope: scopeObj.label,
                      typeName: typeObj.label,
                    }
                  });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-auto w-full py-4 rounded-2xl bg-white text-[#6B1D2F] text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all duration-300 hover:bg-[#FAFAF9] shadow-xl group"
              >
                Lock In This Estimate
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCalculator;
