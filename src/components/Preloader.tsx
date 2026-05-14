import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onComplete }: { onComplete?: () => void }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    // Simulate loading
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowEnter(true);
          }, 800);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setLoading(false);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Fire Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0a0a0a_70%)] z-10 pointer-events-none"></div>
          <div className="absolute bottom-[-20%] w-full h-[50%] bg-[#ff4500] blur-[100px] opacity-20 mix-blend-screen animate-pulse pointer-events-none"></div>
          
          <div className="relative z-20 flex flex-col items-center">
              {/* Single High-Impact Circular Inscription Loader */}
              <div className="w-80 h-80 relative flex items-center justify-center pointer-events-none mb-12">
                <motion.div
                  animate={{ 
                    opacity: [0.4, 0.8, 0.5, 1],
                    filter: [
                      `brightness(${1.5 + (progress / 100) * 1.5})`,
                      `brightness(${2 + (progress / 100) * 2.5})`,
                      `brightness(${1.8 + (progress / 100) * 2})`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <img 
                    src="/ring_inscription.png"
                    style={{ 
                      maskImage: `conic-gradient(from 0deg, black ${progress}%, transparent ${progress}%)`,
                      WebkitMaskImage: `conic-gradient(from 0deg, black ${progress}%, transparent ${progress}%)`,
                      transition: 'mask-image 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    className="w-full h-full object-contain invert mix-blend-screen [filter:sepia(1)_saturate(40)_hue-rotate(0deg)] drop-shadow-[0_0_25px_#ff4500]"
                  />
                </motion.div>
                
                {/* Forging Spark & Flare at the Axis point */}
                <motion.div
                  style={{ 
                    rotate: `${(progress / 100) * 360}deg`,
                  }}
                  className="absolute inset-0 z-20"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.8, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ duration: 0.15, repeat: Infinity }}
                      className="w-12 h-12 bg-[#ff4500] rounded-full blur-xl shadow-[0_0_60px_#ff4500]"
                    />
                    <div className="absolute inset-0 w-4 h-4 bg-white rounded-full blur-[2px] m-auto shadow-[0_0_20px_#fff]"></div>
                    
                    {/* Trailing Forge Embers */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0.6, 0],
                          y: [0, 50 + Math.random() * 60],
                          x: [(Math.random() - 0.5) * 40]
                        }}
                        transition={{ 
                          duration: 0.6, 
                          repeat: Infinity, 
                          delay: i * 0.05 
                        }}
                        className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-[#f2ca50] rounded-full blur-[1px]"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>


            {/* Elvish Text Loading & Enter Button */}
            <div className="text-center h-32 flex flex-col justify-center items-center mt-8">
              <AnimatePresence mode="wait">
                {!showEnter ? (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.h2 
                      className="font-display-lg text-primary text-2xl tracking-[0.5em] mb-4 uppercase"
                    >
                      Forging Artifacts
                    </motion.h2>
                    <div className="w-64 h-1 bg-surface-container-highest rounded-full overflow-hidden mx-auto">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#f2ca50] to-[#ff4500]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut" }}
                      />
                    </div>
                    <p className="font-label-caps text-[10px] text-mithril mt-4 tracking-[0.3em] opacity-60">
                      {progress}%
                    </p>
                  </motion.div>
                ) : (
                  <motion.button
                    key="enter"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.05, textShadow: "0 0 20px #ff4500", boxShadow: "0 0 40px rgba(255,69,0,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEnter}
                    className="px-6 py-3 md:px-10 md:py-4 bg-[#0a0a0a]/80 border border-primary/50 text-primary font-display-lg tracking-[0.2em] md:tracking-[0.4em] text-sm md:text-xl rounded-sm shadow-[0_0_20px_rgba(242,202,80,0.15)] hover:border-[#ff4500] transition-all uppercase cursor-pointer backdrop-blur-sm relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff4500]/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    Enter Middle Earth
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
