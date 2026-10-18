import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail, ArrowRight, Facebook, Send,
  Film, Shapes, CheckCircle2, Layers, Clock,
} from 'lucide-react';
import { theme } from '../../constants';
import { navigateToSection } from '../../utils/navigation';

const socialLinks = [
  { icon: Send, href: 'https://t.me/Onlygrace2', label: 'Telegram @Onlygrace2' },
  { icon: Facebook, href: 'https://www.facebook.com/share/169w6Q4Mqo4/?mibextid=wwXIfr', label: 'Facebook Profile' },
  { icon: Facebook, href: 'https://www.facebook.com/share/1CMuAk9pQM/?mibextid=wwXIfr', label: 'Facebook Page' },
];

const guarantees = [
  { icon: CheckCircle2, text: '100% On-Time Delivery' },
  { icon: Film, text: '8K Master File Delivery' },
  { icon: Layers, text: 'Video + Design in One' },
  { icon: Clock, text: 'Reply within 24 Hours' },
];

export const AvailabilityCTA = ({ cta, contact }) => {
  const navigate = useNavigate();
  const primaryEmail = contact?.primaryEmail || cta?.email || 'svga.asdesach1@gmail.com';
  const availabilityBadge = cta?.availabilityText || contact?.availabilityText || 'Accepting Q3 / Q4 Projects, Global & Remote';

  return (
    <section
      className="relative overflow-hidden"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* ── Rich Burgundy upper band ───────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#6B1D2F] via-[#4F1422] to-[#2E0B13] relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#6B1D2F]/35 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#8B1E3F]/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] relative z-10 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left copy */}
            <div className="lg:col-span-7 space-y-8">

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.04] tracking-tight break-words"
                style={{ fontFamily: theme.fonts.heading }}
              >
                Have a Project<br />
                <span className="text-[#C59A9F] font-black">in Mind?</span>
              </motion.h2>

              {/* Sub-copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-white/95 font-normal text-sm sm:text-lg leading-relaxed max-w-xl"
              >
                Let's build high-impact video edits, cinematic color grades, and brand design systems that make your audience stop scrolling. Fast turnaround. No agencies. Direct access.
              </motion.p>

              {/* Guarantee chips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3"
              >
                {guarantees.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2 rounded-none bg-white/[0.12] border border-white/25 text-[10px] sm:text-[11px] font-bold text-white hover:bg-white/[0.20] transition-all"
                  >
                    <Icon size={13} className="text-[#C59A9F] flex-shrink-0 mx-auto sm:mx-0" />
                    <span className="break-normal whitespace-normal">{text}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full max-w-lg"
              >
                <button
                  onClick={() => navigateToSection(navigate, '/contact')}
                  className="w-full sm:w-auto flex-1 min-w-0 group inline-flex items-center justify-center gap-2 px-4 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#6B1D2F] to-[#8B1E3F] text-white text-xs font-black uppercase tracking-wider sm:tracking-widest shadow-2xl shadow-[#6B1D2F]/35 hover:shadow-[#6B1D2F]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                  <Send size={14} className="text-[#C59A9F] flex-shrink-0" />
                  <span className="truncate">Start Project</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform flex-shrink-0 hidden sm:inline" />
                </button>

                <a
                  href={`mailto:${primaryEmail}`}
                  className="w-full sm:w-auto flex-1 min-w-0 group inline-flex items-center justify-center gap-2 px-4 sm:px-8 py-3.5 sm:py-4 rounded-full border-2 border-white/20 text-white text-xs font-black uppercase tracking-wider sm:tracking-widest hover:border-white/50 hover:bg-white/[0.07] transition-all duration-300"
                >
                  <Mail size={14} className="text-[#C59A9F] flex-shrink-0" />
                  <span className="truncate">{primaryEmail}</span>
                </a>
              </motion.div>

            </div>

            {/* Right: discipline panels */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-5 flex flex-col gap-4"
            >
              {[
                {
                  icon: Film,
                  title: 'Video Production',
                  items: ['Commercial Editing', 'Color Grading', 'Sound Design', 'Showreel Creation'],
                  dark: true,
                },
                {
                  icon: Shapes,
                  title: 'Graphic Design',
                  items: ['Brand Identity', 'Poster & Key Art', '3D Motion Graphics', 'UI Design Kits'],
                  dark: false,
                },
              ].map(({ icon: Icon, title, items, dark }) => (
                <div
                  key={title}
                  className={`rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${dark
                      ? 'bg-white/[0.06] border-white/10 hover:bg-white/[0.09]'
                      : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08]'
                    }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-none bg-[#6B1D2F] text-white flex items-center justify-center shadow-lg shadow-[#6B1D2F]/30">
                      <Icon size={17} />
                    </div>
                    <h4 className="text-sm font-black text-white" style={{ fontFamily: theme.fonts.heading }}>
                      {title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map(item => (
                      <span key={item} className="text-[10px] font-bold text-white/80 px-2.5 py-1 rounded-none bg-white/[0.10] border border-white/20 uppercase tracking-wider">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Response time card */}
              <div className="rounded-2xl p-5 border border-white/10 bg-gradient-to-r from-[#6B1D2F]/30 to-[#8B1E3F]/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-none bg-[#6B1D2F] text-white flex items-center justify-center shadow-lg shadow-[#6B1D2F]/30 flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/75 uppercase tracking-widest mb-0.5">Average Response</p>
                  <p className="text-sm font-black text-white">Under 24 Hours · Worldwide</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Light lower band — social + copyright ─────────────────────────── */}
      <div className="bg-[#FAFAF9] border-t border-[#C59A9F]">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1550px] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Brand mark */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6B1D2F]" />
            <span
              className="text-sm font-black text-[#1C1917] uppercase tracking-widest"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Alazar<span className="text-[#6B1D2F]">.</span>
            </span>
            <span className="text-[11px] text-[#292524] font-semibold ml-2 hidden sm:inline">
              Video Director & Senior Graphic Designer
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white border border-[#C59A9F] flex items-center justify-center text-[#292524] hover:bg-[#6B1D2F] hover:text-white hover:border-[#6B1D2F] hover:shadow-lg hover:shadow-[#6B1D2F]/20 transition-all duration-300"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-[#292524] font-bold uppercase tracking-wider">
            © {new Date().getFullYear()} Alazar Asdesach
          </p>
        </div>
      </div>

    </section>
  );
};

export default AvailabilityCTA;
