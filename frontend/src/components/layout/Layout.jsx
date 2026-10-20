import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import CustomCursor from '../common/CustomCursor';
import ScrollProgress from '../common/ScrollProgress';
import CommandPalette from '../common/CommandPalette';

export const Layout = ({ children }) => {
  return (
    <div
      className="font-sans bg-[#FAFAF9] text-[#1C1917] selection:bg-[#6B1D2F] selection:text-white min-h-screen flex flex-col relative overflow-x-hidden"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <ScrollProgress />
      <CommandPalette />

      {/* Custom Interactive Magnetic Cursor */}
      <CustomCursor />

      {/* Ambient soft glow — subtle burgundy warmth */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#C59A9F]/10 blur-[180px] rounded-full pointer-events-none z-0" />

      <Navigation />

      <main className="flex-grow">
        {children || <Outlet />}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
