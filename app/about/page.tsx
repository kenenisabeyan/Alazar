'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Film, PenTool, Camera, Sparkles } from 'lucide-react';
import Button from '@/components/common/Button';
import GearSection from '@/components/sections/GearSection';
import ClientLogos from '@/components/sections/ClientLogos';
import BehindTheScenes from '@/components/sections/BehindTheScenes';
import { theme } from '@/utils/constants';

export default function AboutPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-canvas pt-36 pb-24"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header Hero */}
        <div className="grid md:grid-cols-12 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-6 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-burgundy-faint border border-burgundy-soft/40 text-xs tracking-widest text-burgundy uppercase font-semibold">
              <Sparkles size={14} /> Director & Lead Editor
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-charcoal leading-tight" style={{ fontFamily: theme.fonts.heading }}>
              Alazar Asdesach.<br />
              <span className="italic font-light text-burgundy">Master of Motion & Tone.</span>
            </h1>

            <p className="text-slate font-light text-base md:text-lg leading-relaxed">
              With over 8 years behind camera viewfinders and DaVinci Resolve suites, I direct, edit, and color grade high-impact visual stories for global fashion labels, luxury brands, and music artists.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="primary" href="/portfolio">
                Explore Filmography
              </Button>
              <Button variant="outline" href="/contact">
                Initiate Collaboration
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-card bg-surface">
              <Image 
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Alazar Asdesach Portrait" 
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-surface/95 backdrop-blur-md rounded-2xl border border-border shadow-card text-left">
                <p className="text-xs uppercase tracking-widest text-burgundy font-bold mb-1">Directorial Creed</p>
                <p className="text-xs text-charcoal italic">"Every cut should serve the emotion; every frame must feel intentional."</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Philosophy Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="bg-surface p-8 rounded-2xl border border-border shadow-card text-left">
            <div className="w-12 h-12 rounded-xl bg-burgundy-faint text-burgundy flex items-center justify-center mb-6">
              <Film size={24} />
            </div>
            <h3 className="text-xl font-bold text-charcoal mb-3" style={{ fontFamily: theme.fonts.heading }}>
              Kinetic Pacing
            </h3>
            <p className="text-xs text-slate font-light leading-relaxed">
              Matching rhythmic cuts, speed-ramping, and audio transients so video content holds audience attention seamlessly.
            </p>
          </div>

          <div className="bg-surface p-8 rounded-2xl border border-border shadow-card text-left">
            <div className="w-12 h-12 rounded-xl bg-burgundy-faint text-burgundy flex items-center justify-center mb-6">
              <Camera size={24} />
            </div>
            <h3 className="text-xl font-bold text-charcoal mb-3" style={{ fontFamily: theme.fonts.heading }}>
              Anamorphic Optics
            </h3>
            <p className="text-xs text-slate font-light leading-relaxed">
              Crafting wide 2.39:1 widescreen cinema aspect ratios with organic lens flares and rich depth of field.
            </p>
          </div>

          <div className="bg-surface p-8 rounded-2xl border border-border shadow-card text-left">
            <div className="w-12 h-12 rounded-xl bg-burgundy-faint text-burgundy flex items-center justify-center mb-6">
              <PenTool size={24} />
            </div>
            <h3 className="text-xl font-bold text-charcoal mb-3" style={{ fontFamily: theme.fonts.heading }}>
              Color Science
            </h3>
            <p className="text-xs text-slate font-light leading-relaxed">
              Executing Kodak film print emulations and Rec.709/DCI-P3 mastering in DaVinci Resolve Studio 19.
            </p>
          </div>
        </div>

      </div>

      {/* Embedded Gear Section */}
      <GearSection />

      {/* Embedded Client Logos & Recognition */}
      <ClientLogos />

      {/* Embedded Behind The Scenes */}
      <BehindTheScenes />

    </motion.div>
  );
}
