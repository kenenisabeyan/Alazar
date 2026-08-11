'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Play, Eye } from 'lucide-react';

export const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'play' | 'view'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor], button, a, input, textarea, select');
      if (!target) {
        setCursorState('default');
        return;
      }

      const cursorType = target.getAttribute('data-cursor');
      if (cursorType === 'play') {
        setCursorState('play');
      } else if (cursorType === 'view') {
        setCursorState('view');
      } else {
        setCursorState('hover');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  const isExpanded = cursorState !== 'default';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorState === 'play' || cursorState === 'view' ? 84 : isExpanded ? 48 : 28,
          height: cursorState === 'play' || cursorState === 'view' ? 84 : isExpanded ? 48 : 28,
          backgroundColor: cursorState === 'play' || cursorState === 'view' ? '#8B1E3F' : isExpanded ? 'rgba(139, 30, 63, 0.25)' : 'rgba(255, 255, 255, 0)',
          borderColor: cursorState === 'play' || cursorState === 'view' ? '#8B1E3F' : isExpanded ? '#8B1E3F' : 'rgba(245, 240, 241, 0.4)',
          borderWidth: cursorState === 'play' || cursorState === 'view' ? '0px' : '1.5px',
          boxShadow: isExpanded ? '0 0 25px rgba(139, 30, 63, 0.5)' : 'none',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.2 }}
      >
        {cursorState === 'play' && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="flex items-center gap-1 text-white font-bold text-xs uppercase tracking-wider"
          >
            <Play size={16} fill="white" />
            <span>Play</span>
          </motion.div>
        )}

        {cursorState === 'view' && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="flex items-center gap-1 text-white font-bold text-xs uppercase tracking-wider"
          >
            <Eye size={16} />
            <span>View</span>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#F5F0F1] rounded-full pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isExpanded ? 0 : 1,
          opacity: isExpanded ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};

export default CustomCursor;
