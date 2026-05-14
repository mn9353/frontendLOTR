import React from 'react';
import { motion } from 'framer-motion';

export const WraithOverlay = ({ active }: { active: boolean }) => {
  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[990] overflow-hidden">
      {/* The Global Wraith Filter Overlay - This filters the page behind it without breaking position: fixed */}
      <div 
        className="absolute inset-0" 
        style={{ backdropFilter: 'hue-rotate(180deg) contrast(1.4) brightness(0.8) grayscale(100%)', WebkitBackdropFilter: 'hue-rotate(180deg) contrast(1.4) brightness(0.8) grayscale(100%)' }}
      ></div>

      {/* Ghostly Mist */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-cyan-900/20 mix-blend-overlay"
      />
      
      {/* Floating Ghostly Runes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: window.innerHeight + 100,
            opacity: 0,
            scale: 0.5
          }}
          animate={{ 
            y: -100,
            opacity: [0, 0.4, 0],
            rotate: Math.random() * 360,
            x: `calc(${Math.random() * 100}vw + ${Math.sin(i) * 50}px)`
          }}
          transition={{ 
            duration: 10 + Math.random() * 10, 
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute text-cyan-400/30 font-display-lg text-4xl"
        >
          {['ᚱ', 'ᚢ', 'ᚦ', 'ᚩ', 'ᚱ', 'ᚳ', 'ᚷ', 'ᚹ', 'ᚻ', 'ᚾ', 'ᛁ', 'ᛃ'][i % 12]}
        </motion.div>
      ))}

      {/* Central Ethereal Ring */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
        animate={{ 
          opacity: [0.1, 0.4, 0.1], 
          scale: [1, 1.1, 1],
          rotate: 360 
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] pointer-events-none flex items-center justify-center"
      >
        {/* Ring Inscription layer */}
        <motion.img 
          src="/ring_inscription.png"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full object-contain invert mix-blend-screen opacity-20 brightness-150 hue-rotate-180"
        />
        
        <img 
          src="/the_one_ring_hd_top.png"
          alt="The One Ring"
          className="w-full h-full object-contain invert mix-blend-screen drop-shadow-[0_0_20px_#f2ca50] brightness-125 relative z-10"
        />
      </motion.div>

      {/* Screen Edge Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(34,211,238,0.2)]"></div>
    </div>
  );
};
