import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SmoothScroll from './components/common/SmoothScroll';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { useAuth } from './contexts/AuthContext';

/** Wraps any route that requires admin auth — redirects to /login if not authenticated */
function ProtectedRoute({ children }) {
  const { isLoggedIn, isChecking } = useAuth();
  if (isChecking) return (
    <div className="min-h-screen bg-[#1E0A0D] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#8B1E3F]/30 border-t-[#8B1E3F] rounded-full animate-spin" />
    </div>
  );
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

/** Redirects already-logged-in admins away from the login page */
function PublicOnlyRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/admin" replace /> : children;
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <ScrollToTop />
        <Routes>
          {/* Admin Login — no Layout wrapper */}
          <Route path="/login" element={
            <PublicOnlyRoute><Login /></PublicOnlyRoute>
          } />

          {/* Admin Dashboard — no Layout wrapper, protected */}
          <Route path="/admin" element={
            <ProtectedRoute><Admin /></ProtectedRoute>
          } />

          {/* Public portfolio routes — with persistent Layout wrapper */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}
