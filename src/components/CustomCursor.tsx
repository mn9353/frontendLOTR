import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = ({ isLoader }: { isLoader?: boolean }) => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  // Don't render on touch devices — no mouse means no cursor needed
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isTouchDevice) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  if (isLoader) {
    // Star of Fëanor — the glowing star from the Doors of Durin
    return (
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{ x: mousePos.x - 20, y: mousePos.y - 20 }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.3 }}
        style={{ width: 40, height: 40 }}
      >
        <motion.svg
          width="40" height="40" viewBox="0 0 40 40" fill="none"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ filter: 'drop-shadow(0 0 4px rgba(208,235,255,0.9)) drop-shadow(0 0 10px rgba(208,235,255,0.4)) drop-shadow(0 0 2px rgba(0,0,0,1))' }}
        >
          {/* 8-pointed Star of Fëanor — two overlapping squares rotated 45° */}
          <polygon
            points="20,2 23,17 38,20 23,23 20,38 17,23 2,20 17,17"
            fill="rgba(208,235,255,0.15)"
            stroke="#d0ebff"
            strokeWidth="1"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <polygon
            points="20,5 22,17 35,20 22,23 20,35 18,23 5,20 18,17"
            fill="rgba(208,235,255,0.08)"
            stroke="rgba(208,235,255,0.5)"
            strokeWidth="0.5"
            strokeLinejoin="round"
            opacity="0.6"
          />
          {/* Center jewel */}
          <circle cx="20" cy="20" r="2" fill="#d0ebff" opacity="0.95"/>
        </motion.svg>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999]"
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: 'spring', damping: 30, stiffness: 500, mass: 0.1 }}
      />
    </>
  );
};
