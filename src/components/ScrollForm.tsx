import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useAudio } from '../hooks/useAudio';

export const ScrollForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { playSubmit } = useAudio();

  return (
    <div ref={ref} className="max-w-4xl mx-auto relative perspective-[1000px]">
      <motion.div
        initial={{ rotateX: 90, opacity: 0, originY: 0 }}
        animate={isInView ? { rotateX: 0, opacity: 1 } : { rotateX: 90, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="scroll-container p-4 sm:p-8 md:p-24 relative shadow-[0_0_100px_rgba(0,0,0,0.6)] rounded-lg overflow-hidden border-[8px] md:border-[16px] border-[#2c1810]"
        style={{ 
          background: "url('https://nhrwkotrxyczxdpkuney.supabase.co/storage/v1/object/public/portfolio_images/project_photos/137914-3840x2160-desktop-4k-the-lord-of-the-rings-wallpaper-photo.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        
        {/* Corner Ornaments */}
        <div className="absolute top-4 left-4 w-16 h-16 opacity-60 pointer-events-none z-10"><span className="material-symbols-outlined text-4xl text-primary drop-shadow-[0_0_10px_rgba(242,202,80,0.5)]">auto_awesome</span></div>
        <div className="absolute top-4 right-4 w-16 h-16 rotate-90 opacity-60 pointer-events-none z-10"><span className="material-symbols-outlined text-4xl text-primary drop-shadow-[0_0_10px_rgba(242,202,80,0.5)]">auto_awesome</span></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 -rotate-90 opacity-60 pointer-events-none z-10"><span className="material-symbols-outlined text-4xl text-primary drop-shadow-[0_0_10px_rgba(242,202,80,0.5)]">auto_awesome</span></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 rotate-180 opacity-60 pointer-events-none z-10"><span className="material-symbols-outlined text-4xl text-primary drop-shadow-[0_0_10px_rgba(242,202,80,0.5)]">auto_awesome</span></div>
        
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="font-display-lg text-2xl sm:text-4xl md:text-display-lg text-primary drop-shadow-[0_0_15px_rgba(242,202,80,0.5)]">SUMMON FELLOWSHIP</h2>
            <p className="font-body-md text-mithril mt-2 italic font-semibold tracking-widest uppercase text-[10px] sm:text-xs">Send a message across the digital ether.</p>
            <div className="w-24 h-px bg-primary/30 mx-auto mt-6"></div>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="space-y-8 md:space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <div className="space-y-2 group">
                <label className="font-label-caps text-mithril text-[10px] tracking-widest group-hover:text-primary transition-colors">YOUR NAME</label>
                <input className="w-full bg-transparent border-none border-b border-mithril/40 focus:ring-0 focus:border-primary text-primary placeholder:text-mithril/30 px-0 py-4 italic transition-all font-display-lg" placeholder="E.g. Aragorn, Son of Arathorn" type="text"/>
              </div>
              <div className="space-y-2 group">
                <label className="font-label-caps text-mithril text-[10px] tracking-widest group-hover:text-primary transition-colors">RETURN ADDRESS</label>
                <input className="w-full bg-transparent border-none border-b border-mithril/40 focus:ring-0 focus:border-primary text-primary placeholder:text-mithril/30 px-0 py-4 italic transition-all font-display-lg" placeholder="messenger@citadel.com" type="email"/>
              </div>
            </div>
            <div className="space-y-2 group">
              <label className="font-label-caps text-mithril text-[10px] tracking-widest group-hover:text-primary transition-colors">THE SCROLL'S CONTENT</label>
              <textarea className="w-full bg-transparent border-none border-b border-mithril/40 focus:ring-0 focus:border-primary text-primary placeholder:text-mithril/30 px-0 py-4 italic transition-all font-display-lg" placeholder="Describe your quest or proposed alliance..." rows={4}></textarea>
            </div>
            
            <div className="pt-12 flex justify-center relative">
              <button className="relative group" type="submit" onClick={(e) => { e.preventDefault(); playSubmit(); }}>
                <div className="absolute inset-0 bg-[#8b0000] rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-opacity ring-pulse"></div>
                <div className="relative w-48 h-48 bg-[#8b0000] rounded-full flex flex-col items-center justify-center border-[8px] border-[#a52a2a] shadow-[inset_0_0_40px_rgba(0,0,0,0.8),0_20px_40px_rgba(0,0,0,0.6)] group-active:scale-95 transition-transform overflow-hidden">
                  <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/leather.png')]"></div>
                  <img alt="The One Ring Seal" className="w-24 h-24 object-contain opacity-80 ring-pulse mb-2 mix-blend-screen invert brightness-125" src="/the_one_ring_hd_top.png"/>
                  <span className="relative z-10 font-display-lg text-primary tracking-[0.2em] text-xs leading-none">SEND SCROLL</span>
                  <div className="absolute bottom-4 font-label-caps text-[8px] text-primary/40 tracking-[0.4em]">RED WAX SEAL</div>
                </div>
              </button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};
