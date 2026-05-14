import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Preloader } from './components/Preloader';
import { ScrollForm } from './components/ScrollForm';
import { WraithOverlay } from './components/WraithOverlay';
import { CustomCursor } from './components/CustomCursor';
import { ArtifactCard } from './components/ArtifactCard';
import { useAudio } from './hooks/useAudio';
import { AudioToggle } from './components/AudioToggle';

function App() {
  const [wraithMode, setWraithMode] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { isMuted, toggleMute, playClick, allowBgMusic } = useAudio();

  // Allow Preloader to tell App it has finished so we can conditionally unmount it and start music
  const handlePreloaderComplete = () => {
    setLoaded(true);
    playClick(); // Play the sword sound when the loader completes
    allowBgMusic();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxBg = document.querySelector('.ancient-map-parallax') as HTMLElement;
      if (parallaxBg) {
        parallaxBg.style.backgroundPositionY = -(scrolled * 0.1) + 'px';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleWraithMode = () => {
    setWraithMode(!wraithMode);
    if (!wraithMode) {
      document.body.classList.add('wraith-world');
    } else {
      document.body.classList.remove('wraith-world');
    }
  };

  return (
    <>
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}
      <CustomCursor />
      <AudioToggle isMuted={isMuted} toggleMute={toggleMute} />
      
      {/* Theme Changer (Wraith Mode) */}
      <button 
        onClick={() => { toggleWraithMode(); playClick(); }}
        className="fixed bottom-6 left-6 z-[99999] p-3 rounded-full border bg-[#1a1a1a] backdrop-blur transition-transform hover:scale-110 active:scale-95"
        style={{
          boxShadow: wraithMode ? '0 0 20px rgba(255,255,255,0.6)' : '0 0 15px rgba(242,202,80,0.4)',
          borderColor: wraithMode ? 'rgba(255,255,255,0.5)' : 'rgba(242,202,80,0.3)'
        }}
        title="Toggle Wraith Mode"
      >
        <img 
          src="/the_one_ring_hd_top.png" 
          alt="The One Ring Toggle" 
          className="w-5 h-5 object-contain transition-all duration-700"
          style={{ 
            filter: wraithMode ? 'invert(1) brightness(2) grayscale(100%)' : 'invert(1) brightness(1.25)', 
            transform: wraithMode ? 'rotate(180deg)' : 'none' 
          }}
        />
      </button>

      <WraithOverlay active={wraithMode} />
      <main className="bg-surface-dim min-h-screen text-on-surface selection:bg-primary/30 overflow-x-hidden relative">
      {/* Cinematic Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/middle_earth_map_1778702133925.png')] opacity-[0.07] bg-cover bg-center mix-blend-overlay opacity-0-in-wraith"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dim via-transparent to-surface-dim"></div>
      </div>

      <header className="fixed top-0 left-0 w-full z-[100] px-4 sm:px-margin-desktop py-3 md:py-4 backdrop-blur-md bg-surface-dim/40 border-b border-mithril/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="font-display-lg text-primary text-lg md:text-xl tracking-[0.2em] sm:tracking-[0.3em] drop-shadow-[0_0_10px_rgba(242,202,80,0.3)]">
            MANOJ N.
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="group relative">
              <button className="menu-trigger relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all duration-500">
                <img alt="Menu" className="ring-image w-full h-full object-contain transition-all duration-700 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_#f2ca50] mix-blend-screen invert brightness-125" src="/the_one_ring_hd_top.png"/>
              </button>
              <div className="menu-content absolute top-full right-0 mt-2 sm:mt-4 w-56 sm:w-64 bg-surface-container-highest/95 backdrop-blur-xl border border-primary/30 p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto z-[100] transition-all duration-300">
                <div className="flex flex-col gap-4 relative z-[110] pointer-events-auto">
                  <a className="font-display-lg text-base md:text-lg tracking-widest transition-all hover:text-mithril hover:translate-x-2 block cursor-pointer" href="#journey" onClick={playClick}>JOURNEY</a>
                  <a className="font-display-lg text-base md:text-lg tracking-widest transition-all hover:text-mithril hover:translate-x-2 block cursor-pointer" href="#battles" onClick={playClick}>BATTLES</a>
                  <a className="font-display-lg text-base md:text-lg tracking-widest transition-all hover:text-mithril hover:translate-x-2 block cursor-pointer" href="#artifacts" onClick={playClick}>ARTIFACTS</a>
                  <a className="font-display-lg text-base md:text-lg tracking-widest transition-all hover:text-mithril hover:translate-x-2 block cursor-pointer" href="#arsenal" onClick={playClick}>ARSENAL</a>
                  <a className="font-display-lg text-base md:text-lg tracking-widest transition-all hover:text-mithril hover:translate-x-2 block cursor-pointer" href="#scrolls" onClick={playClick}>SCROLLS</a>
                </div>
              </div>
            </div>
            
            <button className="hidden sm:flex px-6 py-2 md:px-6 md:py-2 bg-primary text-on-primary font-label-caps tracking-widest text-[9px] md:text-[10px] hover:bg-primary-fixed transition-all shadow-[0_0_20px_rgba(242,202,80,0.2)] border border-primary/50 rounded-full"
              onClick={playClick}>
              Hire Me
            </button>
          </div>
        </div>
      </header>

      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-20 px-4" id="intro">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-60 cinematic-mask opacity-0-in-wraith" src="/middle_earth_map.png"/>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/90"></div>
          <div className="absolute inset-0 mist-overlay"></div>
        </div>
        <div className="relative z-10 text-center w-full max-w-4xl px-4">
          {/* Floating Swords Decoration - Hidden on mobile */}
          <div className="absolute -left-64 top-1/2 -translate-y-1/2 hidden xl:block animate-floating-sword">
            <img src="/sword_vertical.png" alt="Legendary Sword" className="h-[600px] w-auto opacity-40 mix-blend-screen invert" />
          </div>
          <div className="absolute -right-64 top-1/2 -translate-y-1/2 hidden xl:block animate-floating-sword" style={{ animationDelay: '2s' }}>
            <img src="/sword_vertical.png" alt="Legendary Sword" className="h-[600px] w-auto opacity-40 mix-blend-screen invert scale-x-[-1]" />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] md:w-[120%] aspect-square -z-10 opacity-[0.08] pointer-events-none animate-slow-spin">
            <img alt="Decorative Ring Background" className="w-full h-full object-contain invert mix-blend-screen brightness-150" src="/the_one_ring_hd_side.png"/>
            <motion.img 
              src="/ring_inscription.png"
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full h-full object-contain invert mix-blend-screen opacity-20 brightness-200"
            />
          </div>
          
          <p className="font-label-caps text-primary tracking-[0.4em] mb-6 md:mb-4 animate-pulse text-[10px] md:text-xs">ESTABLISHED MMXXIV</p>
          <h1 className="font-display-lg text-4xl sm:text-5xl md:text-7xl text-primary mb-4 md:mb-3 drop-shadow-[0_0_20px_rgba(242,202,80,0.5)] leading-[1.1] md:leading-tight tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.3em]">
            MANOJ N.
          </h1>
          <p className="font-headline-md text-mithril italic mb-8 md:mb-10 tracking-widest text-[11px] sm:text-sm md:text-lg px-4">
            MASTER OF THE DIGITAL FORGE & FULL STACK ARCHITECT
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4">
            <a className="w-full sm:w-auto group relative px-8 md:px-8 py-4 md:py-4 bg-primary text-background font-display-lg tracking-[0.2em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(242,202,80,0.4)] rounded-sm flex items-center justify-center gap-3" href="#journey" onClick={playClick}>
              <img src="/sword_vertical.png" className="h-5 md:h-6 w-auto mix-blend-screen invert brightness-0" alt="sword icon" />
              <span className="text-sm md:text-sm">EXPLORE JOURNEY</span>
            </a>
            <button className="w-full sm:w-auto px-8 md:px-8 py-4 md:py-4 border-2 border-mithril/30 text-mithril font-display-lg tracking-widest hover:border-primary hover:text-primary transition-all rounded-sm backdrop-blur-sm group overflow-hidden relative text-sm md:text-sm" onClick={playClick}>
              <span className="relative z-10">DOWNLOAD SCROLL</span>
              <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="font-label-caps text-[8px] md:text-[10px] text-mithril tracking-widest">SCROLL TO EXPLORE</span>
          <span className="material-symbols-outlined animate-bounce text-primary text-xl md:text-2xl">expand_more</span>
        </div>
      </header>

      <div className="sword-divider relative z-10 my-12 md:my-24 flex items-center justify-center px-4">
        <div className="h-px flex-1 max-w-[200px] md:max-w-[300px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
        <img src="/sword_vertical.png" alt="Sword Divider" className="h-32 md:h-48 w-auto object-contain mx-4 md:mx-8 mix-blend-screen invert drop-shadow-[0_0_20px_rgba(242,202,80,0.4)]" />
        <div className="h-px flex-1 max-w-[200px] md:max-w-[300px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
      </div>

      {/* The Journey (About) */}
      <section className="relative py-16 md:py-section-gap px-4 md:px-margin-desktop max-w-5xl mx-auto runic-transition" id="journey">
        <div className="bg-surface-container-low parchment-texture p-6 sm:p-10 md:p-20 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-2 md:border-4 border-primary/20">
          <div className="absolute top-0 left-0 w-full h-8 opacity-40" style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, #201f1f 10px, #201f1f 20px)' }}></div>
          <div className="absolute bottom-0 left-0 w-full h-8 opacity-40 rotate-180" style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, #201f1f 10px, #201f1f 20px)' }}></div>
          <div className="text-center mb-10 md:mb-16 relative">
            <div className="hidden md:block absolute -top-8 left-1/2 -translate-x-1/2 text-primary/30 text-6xl font-display-lg opacity-20">ELVEN ARCH</div>
            <h2 className="font-display-lg text-2xl sm:text-4xl md:text-display-lg text-primary mb-4 drop-shadow-md">THE FORGING JOURNEY</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
          </div>
          <div className="font-body-lg text-sm md:text-base text-on-surface-variant space-y-6 md:space-y-8 leading-relaxed max-w-3xl mx-auto italic">
            <p>
                In the fires of complex codebases and high-stakes architecture, I have spent a decade honing the craft of engineering. My path began with the fundamental building blocks of the web, evolving into the mastery of distributed systems that scale across vast digital realms.
            </p>
            <p>
                Like a master smith at the forge, I believe every line of code should be intentional. I specialize in building real-time architectures and resilient cloud infrastructures that stand the test of time, ensuring that every "artifact" I produce is both beautiful in its logic and unbreakable in its execution.
            </p>
            <div className="pt-6 md:pt-8 text-center">
              <span className="font-display-lg text-primary tracking-widest text-xs sm:text-sm md:text-base">"One System to Rule the Flow, One Logic to Find Them."</span>
            </div>
          </div>
        </div>
      </section>

      <div className="sword-divider">
        <span className="font-display-lg text-mithril/40 tracking-[0.5em] text-xs">ᚱ ᚢ ᚾ ᛖ ᛋ</span>
      </div>

      {/* The Battles (Experience) */}
      <section className="py-24 md:py-section-gap px-4 md:px-margin-desktop bg-surface-dim/40 backdrop-blur-sm runic-transition relative" id="battles">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16 md:mb-24">
            <h2 className="font-display-lg text-3xl sm:text-5xl md:text-display-lg text-primary text-center">LEGENDARY CAMPAIGNS</h2>
            <p className="font-label-caps text-mithril mt-4 tracking-[0.2em] sm:tracking-[0.3em] text-[10px] md:text-xs">CHRONICLES OF PROFESSIONAL BATTLES</p>
          </div>
          <div className="relative border-l border-mithril/20 ml-4 sm:ml-8 md:ml-0 md:flex md:flex-col md:items-center space-y-16 md:space-y-24">
            {/* Battle Card 1 */}
            <div className="relative md:w-full md:grid md:grid-cols-2 gap-gutter group">
              <div className="hidden md:block"></div>
              <div className="pl-8 sm:pl-12 md:pl-12 relative">
                <div className="absolute -left-[14px] md:left-[-14px] top-0 transition-transform group-hover:scale-125 group-hover:rotate-12">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-container-highest border border-primary/30 flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(242,202,80,0.2)]">
                    <img src="/sword_vertical.png" className="w-6 h-6 md:w-8 md:h-8 object-contain mix-blend-screen invert" alt="battle icon" />
                  </div>
                </div>
                <div className="bg-surface-container-high dwarven-frame p-6 sm:p-8 hover:bg-surface-container-highest transition-all duration-500 glimmer-effect shadow-xl">
                  <span className="font-label-caps text-primary mb-2 block tracking-widest text-[10px]">MMXIX - PRESENT</span>
                  <h3 className="font-headline-md text-lg md:text-headline-md text-mithril mb-2 uppercase">Grand Architect @ Citadel Solutions</h3>
                  <p className="font-body-md text-sm md:text-base text-on-surface-variant">Leading the defense of high-traffic financial systems. Optimized database query performance by 40% through advanced sharding techniques and ritualistic code reviews.</p>
                </div>
              </div>
            </div>

            {/* Battle Card 2 */}
            <div className="relative md:w-full md:grid md:grid-cols-2 gap-gutter group">
              <div className="pr-12 relative text-right hidden md:block">
                <div className="absolute -right-[14px] top-0 transition-transform group-hover:scale-125 group-hover:-rotate-12">
                  <div className="w-12 h-12 rounded-full bg-surface-container-highest border border-mithril/30 flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(180,199,208,0.2)]">
                    <img src="/sword_vertical.png" className="w-8 h-8 object-contain mix-blend-screen invert" alt="battle icon" />
                  </div>
                </div>
                <div className="bg-surface-container-high dwarven-frame p-8 hover:bg-surface-container-highest transition-all duration-500 glimmer-effect shadow-xl">
                  <span className="font-label-caps text-primary mb-2 block tracking-widest">MMXVI - MMXIX</span>
                  <h3 className="font-headline-md text-mithril mb-2 uppercase">Senior Sentinel @ Iron Gate Tech</h3>
                  <p className="font-body-md text-on-surface-variant">Forged the primary API gateway for millions of daily active users. Implemented a micro-orchestration layer that reduced downtime to zero during the Great Migration.</p>
                </div>
              </div>
              <div className="md:hidden pl-12 relative">
                <div className="absolute -left-[14px] top-0">
                  <div className="w-12 h-12 rounded-full bg-surface-container-highest border border-primary/30 flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(242,202,80,0.2)]">
                    <img src="/sword_vertical.png" className="w-8 h-8 object-contain mix-blend-screen invert" alt="battle icon" />
                  </div>
                </div>
                <div className="bg-surface-container-high dwarven-frame p-8 glimmer-effect">
                  <span className="font-label-caps text-primary mb-2 block">MMXVI - MMXIX</span>
                  <h3 className="font-headline-md text-mithril mb-2">Senior Sentinel @ Iron Gate Tech</h3>
                  <p className="font-body-md text-on-surface-variant">Forged the primary API gateway for millions of daily active users.</p>
                </div>
              </div>
              <div></div>
            </div>

            {/* Battle Card 3 */}
            <div className="relative md:w-full md:grid md:grid-cols-2 gap-gutter group">
              <div className="hidden md:block"></div>
              <div className="pl-12 md:pl-12 relative">
                <div className="absolute -left-[14px] md:left-[-14px] top-0 transition-transform group-hover:scale-125 group-hover:rotate-12">
                  <span className="material-symbols-outlined text-emerald text-3xl drop-shadow-[0_0_8px_rgba(27,77,62,0.4)]">shield</span>
                </div>
                <div className="bg-surface-container-high dwarven-frame p-8 hover:bg-surface-container-highest transition-all duration-500 glimmer-effect shadow-xl">
                  <span className="font-label-caps text-primary mb-2 block tracking-widest">MMXIV - MMXVI</span>
                  <h3 className="font-headline-md text-mithril mb-2 uppercase">Scout Engineer @ Mithril Ventures</h3>
                  <p className="font-body-md text-on-surface-variant">Discovered and eliminated 200+ high-priority bugs in the early-stage mobile artifacts. Contributed to the foundational UI library used across all territories.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sword-divider relative z-10 my-12 flex items-center justify-center">
        <div className="h-px w-full max-w-[300px] bg-gradient-to-r from-transparent via-mithril/40 to-transparent"></div>
        <img src="/sword_vertical.png" alt="Sword Divider" className="h-24 w-auto object-contain mx-4 mix-blend-screen invert drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
        <div className="h-px w-full max-w-[300px] bg-gradient-to-r from-transparent via-mithril/40 to-transparent"></div>
      </div>

      {/* The Artifacts (Projects) */}
      <section className="py-24 md:py-section-gap px-4 md:px-margin-desktop runic-transition relative" id="artifacts">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display-lg text-3xl sm:text-5xl md:text-display-lg text-primary mb-16 md:mb-24 text-center tracking-widest">FORGED ARTIFACTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <ArtifactCard 
              title="The Aether Link" 
              description="A real-time messaging nexus built with Elixir and Phoenix, capable of sustaining 500k concurrent ethereal connections."
              tags={['Phoenix', 'Websockets', 'Rust']}
              image="/aether_link.png"
            />
            <ArtifactCard 
              title="Mithril Vault" 
              description="A decentralized ledger of incredible security, encrypting transactional secrets using custom elliptic-curve runes."
              tags={['Solidity', 'Hardhat', 'React']}
              image="/ring_inscription.png"
            />
            <ArtifactCard 
              title="Oracle Engine" 
              description="A predictive AI engine that foresees architectural bottlenecks before they manifest in the production realms."
              tags={['Python', 'PyTorch', 'FastAPI']}
              image="/oracle_engine.png"
            />
          </div>
        </div>
      </section>

      <div className="sword-divider">
        <span className="font-display-lg text-mithril/40 tracking-[0.5em] text-xs">ᚱ ᚢ ᚾ ᛖ ᛋ</span>
      </div>

      {/* The Arsenal (Skills) */}
      <section className="py-24 md:py-section-gap bg-surface-container-low/50 backdrop-blur-md runic-transition px-4" id="arsenal">
        <div className="max-w-7xl mx-auto md:px-margin-desktop">
          <h2 className="font-display-lg text-3xl sm:text-5xl md:text-display-lg text-primary mb-16 md:mb-24 text-center uppercase tracking-widest">THE MASTER ARSENAL</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div className="text-center group">
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 rounded-full border border-primary flex items-center justify-center relative transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
                  <div className="absolute inset-0 border border-primary/40 rounded-full animate-runic-beacon"></div>
                  <div className="absolute inset-[-4px] border border-primary/20 rounded-full animate-ping opacity-30"></div>
                </div>
              </div>
              <h3 className="font-headline-md text-mithril mb-6 uppercase">Frontend Relics</h3>
              <ul className="space-y-4 font-label-caps text-on-surface-variant tracking-widest italic">
                <li className="hover:text-primary transition-colors cursor-default">React & Next.js</li>
                <li className="hover:text-primary transition-colors cursor-default">TypeScript Mastery</li>
                <li className="hover:text-primary transition-colors cursor-default">Tailwind Alchemist</li>
                <li className="hover:text-primary transition-colors cursor-default">Three.js Sorcery</li>
              </ul>
            </div>

            <div className="text-center group">
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 rounded-full border border-primary flex items-center justify-center relative transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>settings_input_component</span>
                  <div className="absolute inset-0 border border-primary/40 rounded-full animate-runic-beacon"></div>
                  <div className="absolute inset-[-4px] border border-primary/20 rounded-full animate-ping opacity-30"></div>
                </div>
              </div>
              <h3 className="font-headline-md text-mithril mb-6 uppercase">Core Systems</h3>
              <ul className="space-y-4 font-label-caps text-on-surface-variant tracking-widest italic">
                <li className="hover:text-primary transition-colors cursor-default">Node.js / Go / Rust</li>
                <li className="hover:text-primary transition-colors cursor-default">Distributed Systems</li>
                <li className="hover:text-primary transition-colors cursor-default">PostgreSQL Runes</li>
                <li className="hover:text-primary transition-colors cursor-default">Redis Caching</li>
              </ul>
            </div>

            <div className="text-center group">
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 rounded-full border border-primary flex items-center justify-center relative transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                  <div className="absolute inset-0 border border-primary/40 rounded-full animate-runic-beacon"></div>
                  <div className="absolute inset-[-4px] border border-primary/20 rounded-full animate-ping opacity-30"></div>
                </div>
              </div>
              <h3 className="font-headline-md text-mithril mb-6 uppercase">Fortification</h3>
              <ul className="space-y-4 font-label-caps text-on-surface-variant tracking-widest italic">
                <li className="hover:text-primary transition-colors cursor-default">Kubernetes Bastions</li>
                <li className="hover:text-primary transition-colors cursor-default">AWS / GCP Citadels</li>
                <li className="hover:text-primary transition-colors cursor-default">CI/CD Sieges</li>
                <li className="hover:text-primary transition-colors cursor-default">Security Guarding</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Scrolls (Contact) */}
      <section className="py-16 md:py-section-gap px-4 md:px-margin-desktop" id="scrolls">
        <ScrollForm />
      </section>

      <footer className="bg-surface-dim/80 text-mithril font-body-md full-width py-16 md:py-24 border-t border-mithril/10 backdrop-blur-md px-4">
        <div className="flex flex-col items-center gap-unit w-full max-w-7xl mx-auto">
          <div className="font-display-lg text-primary text-3xl md:text-5xl mb-6 md:mb-8 tracking-[0.2em] sm:tracking-[0.4em] drop-shadow-[0_0_10px_rgba(242,202,80,0.3)] text-center">MANOJ N.</div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-gutter mb-8 md:mb-12 text-xs md:text-sm">
            <a className="text-mithril/60 hover:text-primary underline-offset-8 underline transition-colors decoration-emerald/30" href="#" onClick={playClick}>Privacy</a>
            <a className="text-mithril/60 hover:text-primary underline-offset-8 underline transition-colors decoration-emerald/30" href="#" onClick={playClick}>Terms</a>
            <a className="text-mithril/60 hover:text-primary underline-offset-8 underline transition-colors decoration-emerald/30" href="#" onClick={playClick}>Github</a>
            <a className="text-mithril/60 hover:text-primary underline-offset-8 underline transition-colors decoration-emerald/30" href="#" onClick={playClick}>LinkedIn</a>
          </div>
          <p className="font-label-caps text-[8px] md:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-center opacity-60">
            © MMXXIV THE ARCHIVES OF MANOJ N. | FORGED IN CODE
          </p>
          <div className="mt-8 opacity-40 flex gap-6 md:gap-8">
            <span className="material-symbols-outlined hover:text-primary transition-colors cursor-help text-xl">shield</span>
            <span className="material-symbols-outlined hover:text-mithril transition-colors cursor-help text-xl">auto_awesome</span>
            <span className="material-symbols-outlined hover:text-emerald transition-colors cursor-help text-xl">history_edu</span>
          </div>
        </div>
      </footer>
      </main>
    </>
  );
}

export default App;
