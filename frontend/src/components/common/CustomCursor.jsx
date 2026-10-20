import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Play, Eye, ArrowUpRight } from 'lucide-react';

export const CustomCursor = () => {
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'hover' | 'play' | 'view'
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for weighted inertia feel
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const visibleRef = React.useRef(false);

  useEffect(() => {
    // Only activate cursor on devices with fine pointer (desktop mouse)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor], button, a, input, textarea, select');
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  const isExpanded = cursorState !== 'default';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Magnetic Ring / Badge */}
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
        {/* Dynamic Badge Content */}
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

      {/* Inner Precision Dot */}
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
