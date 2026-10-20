import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Shield, Film, Lock, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.auth.login(email, password);
      if (res.success) {
        login(res.token, res.admin);
        toast.success('Welcome back, Alazar!');
        navigate('/admin');
      } else {
        toast.error(res.message || 'Login failed');
      }
    } catch (err) {
      toast.error(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E0A0D] flex items-center justify-center p-6 relative overflow-hidden">

      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,30,63,0.15) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #8B1E3F 0%, transparent 70%)' }} />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#8B1E3F 1px, transparent 1px), linear-gradient(to right, #8B1E3F 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-[#2E1216] border border-[rgba(139,30,63,0.3)] rounded-3xl p-10 shadow-2xl">

          {/* Logo / Brand */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#6B1D2F] mb-5 shadow-lg"
            >
              <Film size={28} className="text-white" />
            </motion.div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield size={14} className="text-[#8B1E3F] animate-pulse" />
              <span className="text-xs text-[#8B1E3F] font-semibold uppercase tracking-widest">Admin Access</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#F5F0F1] tracking-tight">
              Alazar <span className="text-[#8B1E3F]">Studio</span>
            </h1>
            <p className="text-[#A89597] text-sm mt-1">CMS Dashboard v2.0</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#A89597] mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A89597]" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@alazar.studio"
                  className="w-full bg-[#1E0A0D] border border-[rgba(139,30,63,0.3)] rounded-xl pl-11 pr-4 py-3.5
                             text-[#F5F0F1] text-sm placeholder-[#78716C]
                             focus:outline-none focus:border-[#8B1E3F] focus:ring-1 focus:ring-[#8B1E3F]
                             transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#A89597] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A89597]" />
                <input
                  id="admin-password"
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full bg-[#1E0A0D] border border-[rgba(139,30,63,0.3)] rounded-xl pl-11 pr-12 py-3.5
                             text-[#F5F0F1] text-sm placeholder-[#78716C]
                             focus:outline-none focus:border-[#8B1E3F] focus:ring-1 focus:ring-[#8B1E3F]
                             transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A89597] hover:text-[#F5F0F1] transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full mt-2 py-4 rounded-xl font-bold text-sm uppercase tracking-widest
                         bg-[#6B1D2F] hover:bg-[#8B1E3F] text-white transition-all duration-200
                         shadow-lg shadow-[rgba(107,29,47,0.4)] disabled:opacity-60 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield size={16} /> Access Dashboard
                </>
              )}
            </motion.button>
          </form>

          {/* Footer note */}
          <p className="text-center text-[#292524] font-medium text-xs mt-8">
            Credentials are set in the server environment variables.
          </p>
        </div>

        {/* Back to site link */}
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="block text-center text-[#A89597] hover:text-[#F5F0F1] text-sm mt-6 transition-colors"
        >
          ← Back to Portfolio
        </motion.a>
      </motion.div>
    </div>
  );
}
