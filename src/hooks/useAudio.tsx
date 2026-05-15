import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { AUDIO_ASSETS } from '../constants/artifacts';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playSubmit: () => void;
  allowBgMusic: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false); // Default to unmuted
  const isMutedRef = useRef(false);
  const [bgAllowed, setBgAllowed] = useState(false);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const activeSoundsRef = useRef<Set<HTMLAudioElement>>(new Set());

  useEffect(() => {
    // Preload sword sound immediately on mount
    const swordAudio = new Audio(AUDIO_ASSETS.clickSound);
    swordAudio.preload = 'auto';

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
      activeSoundsRef.current.forEach(audio => audio.pause());
      activeSoundsRef.current.clear();
    };
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      isMutedRef.current = next;
      return next;
    });
  }, []);

  useEffect(() => {
    if (bgAllowed && !bgMusicRef.current) {
      bgMusicRef.current = new Audio(AUDIO_ASSETS.backgroundMusic);
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = 0.1; // Gentle background volume
    }

    if (bgMusicRef.current) {
      if (isMuted || !bgAllowed) {
        bgMusicRef.current.pause();
        if (isMuted) {
          activeSoundsRef.current.forEach(audio => audio.pause());
          activeSoundsRef.current.clear();
        }
      } else {
        const playPromise = bgMusicRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }
  }, [isMuted, bgAllowed]);

  // Global listener to recover from autoplay blocks
  useEffect(() => {
    const handleInteraction = () => {
      if (bgMusicRef.current && !isMutedRef.current && bgAllowed && bgMusicRef.current.paused) {
        const playPromise = bgMusicRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [bgAllowed]);

  const playSound = useCallback((soundName: string, volume: number = 0.5) => {
    if (isMuted) return;
    try {
      let audioUrl = '';
      if (soundName === 'sword-clash') audioUrl = AUDIO_ASSETS.clickSound;
      else if (soundName === 'gondor-horn') audioUrl = AUDIO_ASSETS.submitSound;
      else audioUrl = `${soundName}.mp3`;

      const audio = new Audio(audioUrl);
      audio.volume = volume;
      activeSoundsRef.current.add(audio);
      audio.onended = () => activeSoundsRef.current.delete(audio);

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => activeSoundsRef.current.delete(audio));
      }
    } catch (e) {}
  }, [isMuted]);

  const value = {
    isMuted,
    toggleMute,
    playClick: () => playSound('sword-clash', 0.5),
    playSubmit: () => playSound('gondor-horn', 0.6),
    allowBgMusic: useCallback(() => setBgAllowed(true), [])
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
