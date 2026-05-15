import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onComplete }: { onComplete?: () => void }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showEnter, setShowEnter] = useState(false);
  const [password, setPassword] = useState("");
  const [errorShake, setErrorShake] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (!isTouch) {
      document.body.style.cursor = 'none';
      document.documentElement.style.cursor = 'none';
      document.body.classList.add('preloader-active');
    }

    // Show Mellon hint briefly, then swap to input early
    const hintTimer = setTimeout(() => setShowHint(true), 500);
    const enterTimer = setTimeout(() => setShowEnter(true), 2500);

    // Simulate loading - 5 seconds total (100 * 50ms)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => {
      clearTimeout(hintTimer);
      clearTimeout(enterTimer);
      clearInterval(interval);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.cursor = '';
      document.documentElement.style.cursor = '';
      document.body.classList.remove('preloader-active');
    };
  }, []);

  const handleEnter = () => {
    setLoading(false);
    if (onComplete) onComplete();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = password.toLowerCase().trim();
    if (cleanPass === 'mellon' || cleanPass === 'friend') {
      handleEnter();
    } else {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 800);
      setPassword("");
    }
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] bg-[#030712] flex flex-col items-center justify-between py-4 sm:py-6 md:py-8 overflow-hidden"
        >
          {/* Top Inscription — letter-by-letter Ithildin shimmer */}
          <div className="w-full text-center px-4 z-20 flex-shrink-0">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 50 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="font-display-lg text-sm md:text-xl tracking-[0.3em] md:tracking-[0.6em] uppercase inline-flex flex-wrap justify-center gap-0"
            >
              {"Speak, friend, and enter".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, textShadow: '0 0 0px transparent' }}
                  animate={progress > 50 ? {
                    opacity: [0, 1, 0.7],
                    textShadow: [
                      '0 0 0px transparent',
                      '0 0 20px rgba(208,235,255,0.9), 0 0 40px rgba(208,235,255,0.5)',
                      '0 0 8px rgba(208,235,255,0.3)'
                    ]
                  } : { opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: progress > 50 ? i * 0.06 : 0,
                    ease: "easeOut"
                  }}
                  style={{ color: '#d0ebff', display: char === ' ' ? 'inline-block' : 'inline', width: char === ' ' ? '0.4em' : 'auto' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Doors of Durin Reveal Background */}
          <motion.div 
            initial={{ scale: 1 }}
            animate={{ scale: 1.03 }}
            transition={{ duration: 10, ease: "easeOut" }}
            className="relative flex-1 w-full max-h-[85vh] z-0 pointer-events-none my-4"
            style={{
              backgroundImage: `url('/doord_of_durin_website.webp')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              maskImage: 'linear-gradient(to bottom, black 33%, transparent 66%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 33%, transparent 66%)',
              maskSize: '100% 300%',
              WebkitMaskSize: '100% 300%',
              maskPosition: `0 ${100 - progress}%`,
              WebkitMaskPosition: `0 ${100 - progress}%`,
              transition: 'mask-position 0.3s ease-out, -webkit-mask-position 0.3s ease-out',
              opacity: Math.min(0.95, progress / 40),
              filter: `drop-shadow(0 0 ${progress / 3}px rgba(173, 216, 230, ${progress / 100})) brightness(${1 + (progress / 200)}) blur(${Math.max(0, 8 - progress / 10)}px)`
            }}
          ></motion.div>

          {/* Moonlight Ambient Glow overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,_rgba(173,216,230,0.08)_0%,_transparent_60%)] z-10 pointer-events-none"></div>

          {/* Bottom Form Section */}
          <div className="w-full z-20 flex flex-col items-center justify-center px-4 flex-shrink-0 min-h-[120px] relative">
            <div className="relative w-full max-w-xs md:max-w-sm flex flex-col items-center justify-center">
              
              {/* The Text / Input container (fixed height so it doesn't jump) */}
              <div className="relative w-full h-10 md:h-12 flex justify-center items-end mb-2">
                <AnimatePresence>
                  {!showEnter ? (
                    <motion.h2 
                      key="hint" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: showHint ? 0.7 : 0 }} 
                      exit={{ opacity: 0, filter: 'blur(12px)', transition: { duration: 0.8, ease: "easeOut" } }} 
                      transition={{ duration: 1.2 }}
                      className="absolute font-display-lg text-[#d0ebff] text-xs md:text-sm tracking-[1em] md:tracking-[1.5em] uppercase pl-4"
                      style={{ textShadow: '0 0 12px rgba(208,235,255,0.3)' }}
                    >
                      Mellon
                    </motion.h2>
                  ) : (
                    <motion.form
                      key="enter"
                      initial={{ opacity: 0, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
                      onSubmit={handleSubmit}
                      className="absolute w-full"
                    >
                      <input 
                         type="text"
                         value={password}
                         onChange={e => setPassword(e.target.value)}
                         placeholder="Enter the password..."
                         className={`bg-transparent border-0 text-center text-[#d0ebff] font-display-lg tracking-[0.3em] md:tracking-[0.5em] text-xl md:text-2xl focus:outline-none focus:ring-0 outline-none transition-all w-full placeholder:text-[#d0ebff]/40 placeholder:tracking-widest placeholder:text-sm ${errorShake ? 'text-[#ff4500] placeholder:text-[#ff4500]/40' : ''}`}
                         autoFocus
                         autoComplete="off"
                         spellCheck="false"
                         style={{ boxShadow: 'none', cursor: 'none' }}
                      />
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* The Persistent Magical Line */}
              <div className="w-full relative h-[1px] flex justify-center mt-2">
                 <motion.div 
                   className={`absolute h-[1px] bg-gradient-to-r from-transparent shadow-[0_0_15px_currentColor] to-transparent ${errorShake ? 'via-[#ff4500] text-[#ff4500]' : 'via-[#d0ebff] text-[#d0ebff]'}`}
                   initial={{ width: "0%", opacity: 0 }}
                   animate={{ 
                      width: showEnter ? "100%" : `${progress}%`, 
                      opacity: showEnter ? 1 : progress / 100 
                   }}
                   transition={{ duration: showEnter ? 1.5 : 0.1, delay: showEnter ? 1.5 : 0, ease: "easeInOut" }}
                 />
              </div>

              {/* Skip Riddle Button */}
              <AnimatePresence>
                {showEnter && (
                  <motion.button 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.25 }}
                    whileHover={{ opacity: 0.55 }}
                    transition={{ duration: 2, delay: 5 }}
                    type="button" 
                    onClick={handleEnter} 
                    className="absolute -bottom-10 text-[8px] font-label-caps tracking-[0.3em] text-[#d0ebff] transition-opacity uppercase"
                  >
                     skip riddle
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
