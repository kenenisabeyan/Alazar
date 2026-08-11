import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle2, ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react';
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
    <section className="py-28 bg-white border-t border-[#E5D9DB] relative" style={{ fontFamily: theme.fonts.body }}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold block"
          >
            Instant Estimator
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#1C1917]"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Interactive <span className="italic font-light text-[#6B1D2F]">Project Estimator</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#78716C] font-light text-base"
          >
            Customize your project scope, select post-production deliverables, and receive an instant estimate for your brand campaign.
          </motion.p>
        </div>

        {/* Calculator Interface Grid */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Controls Left */}
          <div className="md:col-span-7 bg-white p-8 md:p-10 rounded-2xl border border-[#E5D9DB] shadow-sm space-y-8 text-left">
            
            {/* Step 1: Project Type */}
            <div>
              <label className="text-xs text-[#78716C] font-bold uppercase tracking-wider block mb-3">
                1. Select Project Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {calculatorOptions.projectTypes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedType(t.id)}
                    className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all ${
                      selectedType === t.id 
                        ? 'bg-[#F5E8EA] border-[#6B1D2F] text-[#6B1D2F] shadow-sm' 
                        : 'bg-[#FAFAF9] border-[#E5D9DB] text-[#1C1917] hover:border-[#C59A9F]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Production Scope */}
            <div>
              <label className="text-xs text-[#78716C] font-bold uppercase tracking-wider block mb-3">
                2. Operational Scope
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {calculatorOptions.scopes.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedScope(s.id)}
                    className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all ${
                      selectedScope === s.id 
                        ? 'bg-[#F5E8EA] border-[#6B1D2F] text-[#6B1D2F] shadow-sm' 
                        : 'bg-[#FAFAF9] border-[#E5D9DB] text-[#1C1917] hover:border-[#C59A9F]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-on Modules */}
            <div>
              <label className="text-xs text-[#78716C] font-bold uppercase tracking-wider block mb-3">
                3. Premium Modules & Upgrades
              </label>
              <div className="space-y-2.5">
                {calculatorOptions.addons.map((a) => {
                  const isChecked = selectedAddons.includes(a.id);
                  return (
                    <div
                      key={a.id}
                      onClick={() => toggleAddon(a.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-medium cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-[#F5E8EA] border-[#6B1D2F] text-[#6B1D2F]' 
                          : 'bg-[#FAFAF9] border-[#E5D9DB] text-[#78716C] hover:text-[#1C1917]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isChecked ? 'bg-[#6B1D2F] border-[#6B1D2F] text-white' : 'border-[#E5D9DB] bg-white'
                        }`}>
                          {isChecked && <CheckCircle2 size={14} />}
                        </div>
                        <span>{a.label}</span>
                      </div>
                      <span className="font-bold">+${a.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Estimate Result Right Card */}
          <div className="md:col-span-5 bg-white p-8 md:p-10 rounded-2xl border-2 border-[#6B1D2F] shadow-md text-left flex flex-col justify-between h-full space-y-6">
            
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5D9DB]">
                <span className="text-xs uppercase tracking-widest text-[#6B1D2F] font-bold">Estimated Investment</span>
                <Calculator size={20} className="text-[#6B1D2F]" />
              </div>

              <div className="mb-6">
                <span className="text-xs text-[#78716C] font-semibold uppercase tracking-wider block mb-1">Total Quote Estimate</span>
                <p className="text-5xl font-bold text-[#1C1917]" style={{ fontFamily: theme.fonts.heading }}>
                  ${estimatedTotal.toLocaleString()}
                  <span className="text-sm font-normal text-[#78716C]"> USD</span>
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E5D9DB]">
                <div className="flex items-center gap-2 text-xs text-[#1C1917]">
                  <Clock size={15} className="text-[#6B1D2F]" />
                  <span>Est. Turnaround: <strong className="font-bold">{estimatedDays}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#1C1917]">
                  <ShieldCheck size={15} className="text-[#6B1D2F]" />
                  <span>Includes 2 Revision Rounds & 4K Masters</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#1C1917]">
                  <Sparkles size={15} className="text-[#6B1D2F]" />
                  <span>ProRes 422 HQ + H.264 Deliverables</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                variant="primary" 
                className="w-full py-4"
                icon={<ArrowRight size={16} />}
                onClick={() => {
                  if (setCurrentPage) setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Lock In Package Quote
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProjectCalculator;
