'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle2, ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import Button from '@/components/common/Button';
import { calculatorOptions, theme } from '@/utils/constants';

export const ProjectCalculator: React.FC = () => {
  const [selectedType, setSelectedType] = useState(calculatorOptions.projectTypes[0].id);
  const [selectedScope, setSelectedScope] = useState(calculatorOptions.scopes[0].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['color', 'sound']);

  const typeObj = calculatorOptions.projectTypes.find(t => t.id === selectedType) || calculatorOptions.projectTypes[0];
  const scopeObj = calculatorOptions.scopes.find(s => s.id === selectedScope) || calculatorOptions.scopes[0];

  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = calculatorOptions.addons.find(a => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const estimatedTotal = Math.round(typeObj.basePrice * scopeObj.multiplier + addonsTotal);
  const estimatedDays = selectedScope === 'onset' ? '7 - 12 Days' : '4 - 7 Days';

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(a => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  return (
    <section className="py-28 bg-canvas border-t border-border relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-burgundy font-semibold block"
          >
            Instant Estimator
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-charcoal"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Interactive <span className="italic font-light text-burgundy">Project Estimator</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate font-light text-base"
          >
            Customize your project scope, select post-production deliverables, and receive an instant estimate for your brand campaign.
          </motion.p>
        </div>

        {/* Calculator Interface Grid */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Controls Left */}
          <div className="md:col-span-7 bg-surface p-8 md:p-10 rounded-2xl border border-border shadow-card space-y-8 text-left">
            
            {/* Step 1: Project Type */}
            <div>
              <label className="text-xs text-slate font-bold uppercase tracking-wider block mb-3">
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
                        ? 'bg-burgundy-faint border-burgundy text-burgundy shadow-sm' 
                        : 'bg-canvas border-border text-charcoal hover:border-burgundy-soft'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Production Scope */}
            <div>
              <label className="text-xs text-slate font-bold uppercase tracking-wider block mb-3">
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
                        ? 'bg-burgundy-faint border-burgundy text-burgundy shadow-sm' 
                        : 'bg-canvas border-border text-charcoal hover:border-burgundy-soft'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-on Modules */}
            <div>
              <label className="text-xs text-slate font-bold uppercase tracking-wider block mb-3">
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
                          ? 'bg-burgundy-faint border-burgundy text-burgundy' 
                          : 'bg-canvas border-border text-slate hover:text-charcoal'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isChecked ? 'bg-burgundy border-burgundy text-white' : 'border-border bg-surface'
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
          <div className="md:col-span-5 bg-surface p-8 md:p-10 rounded-2xl border-2 border-burgundy shadow-burgundy-sm text-left flex flex-col justify-between h-full space-y-6">
            
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <span className="text-xs uppercase tracking-widest text-burgundy font-bold">Estimated Investment</span>
                <Calculator size={20} className="text-burgundy" />
              </div>

              <div className="mb-6">
                <span className="text-xs text-slate font-semibold uppercase tracking-wider block mb-1">Total Quote Estimate</span>
                <p className="text-5xl font-bold text-charcoal" style={{ fontFamily: theme.fonts.heading }}>
                  ${estimatedTotal.toLocaleString()}
                  <span className="text-sm font-normal text-slate"> USD</span>
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-charcoal">
                  <Clock size={15} className="text-burgundy" />
                  <span>Est. Turnaround: <strong className="font-bold">{estimatedDays}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-charcoal">
                  <ShieldCheck size={15} className="text-burgundy" />
                  <span>Includes 2 Revision Rounds & 4K Masters</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-charcoal">
                  <Sparkles size={15} className="text-burgundy" />
                  <span>ProRes 422 HQ + H.264 Deliverables</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                variant="primary" 
                className="w-full py-4"
                icon={<ArrowRight size={16} />}
                href="/contact"
                data-cursor="pointer"
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
