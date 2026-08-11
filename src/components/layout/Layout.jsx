import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import CustomCursor from '../common/CustomCursor';
import SmoothScroll from '../common/SmoothScroll';

export const Layout = ({ children, currentPage, setCurrentPage }) => {
  return (
    <SmoothScroll>
      <div className="font-sans bg-[#1E0A0D] text-[#F5F0F1] selection:bg-[#8B1E3F] selection:text-white min-h-screen flex flex-col relative overflow-x-hidden">
        {/* Custom Interactive Cursor */}
        <CustomCursor />

        {/* Ambient lighting glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-[#8B1E3F]/12 blur-[160px] rounded-full pointer-events-none z-0"></div>

        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <main className="flex-grow z-10">
          {children}
        </main>

        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </SmoothScroll>
  );
};

export default Layout;
