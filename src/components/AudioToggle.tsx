import { motion } from 'framer-motion';

interface AudioToggleProps {
  isMuted: boolean;
  toggleMute: () => void;
  isLoader?: boolean;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({ isMuted, toggleMute, isLoader }) => {
  const color = isLoader ? '#d0ebff' : '#d4af37';
  const borderColor = isLoader ? 'rgba(208,235,255,0.2)' : 'rgba(212,175,55,0.3)';
  const shadow = isLoader ? '0 0 15px rgba(208,235,255,0.2)' : '0 0 15px rgba(212,175,55,0.4)';

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => { e.stopPropagation(); toggleMute(); }}
      className={`fixed bottom-6 right-6 z-[99999] p-3 rounded-full border backdrop-blur transition-all duration-700 ${isLoader ? 'bg-transparent hover:bg-[#d0ebff]/5' : 'bg-[#1a1a1a]'}`}
      style={{
        boxShadow: isMuted ? 'none' : shadow,
        borderColor: isMuted ? borderColor : color
      }}
      title={isMuted ? "Unseal the Magic (Enable Sound)" : "Silence the Magic (Disable Sound)"}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isMuted ? "rgba(255,255,255,0.4)" : color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {isMuted ? (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </>
        ) : (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </>
        )}
      </svg>
    </motion.button>
  );
};
