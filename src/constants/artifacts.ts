// LoTR Theme - All artifact/content data
// Replace image and audio URLs with Supabase storage links after upload

export interface Artifact {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

export interface Quest {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  image?: string;
  rewards?: string[];
}

export interface Character {
  id: number;
  name: string;
  role: string;
  description: string;
  image?: string;
}

// ARTIFACTS - Update these image URLs with your Supabase links
export const ARTIFACTS: Artifact[] = [
  {
    id: 1,
    title: "The Aether Link",
    description: "A real-time messaging nexus built with Elixir and Phoenix, capable of sustaining 500k concurrent ethereal connections.",
    tags: ['Phoenix', 'Websockets', 'Rust'],
    image: "/aether_link.png",
  },
  {
    id: 2,
    title: "Mithril Vault",
    description: "A decentralized ledger of incredible security, encrypting transactional secrets using custom elliptic-curve runes.",
    tags: ['Solidity', 'Hardhat', 'React'],
    image: "/ring_inscription.png",
  },
  {
    id: 3,
    title: "Oracle Engine",
    description: "A predictive AI engine that foresees architectural bottlenecks before they manifest in the production realms.",
    tags: ['Python', 'PyTorch', 'FastAPI'],
    image: "/oracle_engine.png",
  },
];

// QUESTS - Add your quest/project data here
export const QUESTS: Quest[] = [
  {
    id: 1,
    title: "Fellowship Quest",
    description: "Join the fellowship and embark on an epic journey",
    difficulty: 'legendary',
    image: "https://nhrwkotrxyczxdpkuney.supabase.co/storage/v1/object/public/portfolio_images/project_photos/lord_of_the_rings/middle_earth_map.webp",
    rewards: ['Experience', 'Knowledge', 'Glory'],
  },
];

// CHARACTERS - Add your character lore here
export const CHARACTERS: Character[] = [
  {
    id: 1,
    name: "The Engineer",
    role: "Grand Architect",
    description: "A master builder of digital realms",
    image: "https://nhrwkotrxyczxdpkuney.supabase.co/storage/v1/object/public/portfolio_images/project_photos/lord_of_the_rings/ring_hd_slant.webp",
  },
];

// AUDIO ASSETS - Supabase Links
export const AUDIO_ASSETS = {
  backgroundMusic: "https://nhrwkotrxyczxdpkuney.supabase.co/storage/v1/object/public/portfolio_images/portfolio_audios/lord%20of%20the%20rings/Evenstar_-_Lord_Of_The_Rings-141139-mobiles24.mp3",
  clickSound: "https://nhrwkotrxyczxdpkuney.supabase.co/storage/v1/object/public/portfolio_images/portfolio_audios/lord%20of%20the%20rings/combat-sword-swing-hit.mp3",
  submitSound: "https://nhrwkotrxyczxdpkuney.supabase.co/storage/v1/object/public/portfolio_images/portfolio_audios/lord%20of%20the%20rings/horn-of-gondor.mp3",
};

// IMAGE ASSETS - Supabase URLs + Local (loader needs to be local as it's used in preloader)
export const IMAGE_ASSETS = {
  ringSlant: "https://nhrwkotrxyczxdpkuney.supabase.co/storage/v1/object/public/portfolio_images/project_photos/lord_of_the_rings/ring_hd_slant.webp",
  ringFlat: "https://nhrwkotrxyczxdpkuney.supabase.co/storage/v1/object/public/portfolio_images/project_photos/lord_of_the_rings/ring_hd_flat.webp",
  ringLoader: "/lor_ring_loader.webp", // Local - used in preloader
  middleEarthMap: "https://nhrwkotrxyczxdpkuney.supabase.co/storage/v1/object/public/portfolio_images/project_photos/lord_of_the_rings/middle_earth_map.webp",
  ringInscription: "/ring_inscription.png",
  swordDiagonal: "https://nhrwkotrxyczxdpkuney.supabase.co/storage/v1/object/public/portfolio_images/project_photos/lord_of_the_rings/sword_diagonal.webp",
  swordStraight: "https://nhrwkotrxyczxdpkuney.supabase.co/storage/v1/object/public/portfolio_images/project_photos/lord_of_the_rings/sword_straight.webp",
  aetherLink: "/aether_link.png",
  oracleEngine: "/oracle_engine.png",
};

// UI CONFIGURATION
export const UI_CONFIG = {
  wraith: {
    enabled: true,
    textColor: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.6)',
  },
  normal: {
    enabled: true,
    textColor: '#f2ca50',
    glowColor: 'rgba(242, 202, 80, 0.4)',
  },
};
