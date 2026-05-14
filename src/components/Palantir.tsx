import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const PalantirSphere = ({ activeImage }: { activeImage: string | null }) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  // Create a default texture or use the active image
  const defaultTexture = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop';
  
  const texture = useLoader(THREE.TextureLoader, activeImage || defaultTexture);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      <Sphere ref={sphereRef} args={[2.5, 64, 64]}>
        <MeshDistortMaterial
          map={texture}
          color={activeImage ? "#ffffff" : "#444444"}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.5}
          roughness={0.2}
          distort={activeImage ? 0.2 : 0.4}
          speed={2}
        />
      </Sphere>
      {/* Outer glow sphere */}
      <Sphere args={[2.7, 32, 32]}>
        <meshBasicMaterial 
          color="#f2ca50" 
          transparent 
          opacity={activeImage ? 0.15 : 0.05} 
          side={THREE.BackSide} 
        />
      </Sphere>
      <Sparkles count={50} scale={6} size={2} speed={0.4} opacity={0.5} color="#f2ca50" />
    </group>
  );
};

interface Artifact {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const artifacts: Artifact[] = [
  {
    id: 'aether',
    title: 'The Aether Link',
    description: 'A real-time messaging nexus built with Elixir and Phoenix, sustaining 500k concurrent ethereal connections.',
    tags: ['Phoenix', 'Websockets'],
    image: '/aether_link.png'
  },
  {
    id: 'mithril',
    title: 'Mithril Vault',
    description: 'A decentralized ledger of incredible security, encrypting transactional secrets using custom elliptic-curve runes.',
    tags: ['Solidity', 'Hardhat'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'oracle',
    title: 'Oracle Engine',
    description: 'A predictive AI engine that foresees architectural bottlenecks before they manifest in production.',
    tags: ['PyTorch', 'FastAPI'],
    image: '/oracle_engine.png'
  }
];

export const PalantirProjectViewer = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const currentImage = activeProject 
    ? artifacts.find(a => a.id === activeProject)?.image || null 
    : null;

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center min-h-[600px] w-full max-w-7xl mx-auto">
      {/* List of Projects */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 z-10">
        {artifacts.map((artifact) => (
          <div 
            key={artifact.id}
            className={`p-6 border-l-4 transition-all duration-500 cursor-pointer backdrop-blur-md ${
              activeProject === artifact.id 
                ? 'border-primary bg-primary/10 shadow-[0_0_30px_rgba(242,202,80,0.15)] scale-105' 
                : 'border-mithril/20 bg-surface-container-low/50 hover:bg-surface-container-high/80 hover:border-mithril'
            }`}
            onMouseEnter={() => setActiveProject(artifact.id)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <h3 className={`font-headline-md mb-2 uppercase tracking-wider transition-colors ${
              activeProject === artifact.id ? 'text-primary' : 'text-mithril'
            }`}>
              {artifact.title}
            </h3>
            <p className="font-body-md text-on-surface-variant mb-4 opacity-80 text-sm">
              {artifact.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {artifact.tags.map(tag => (
                <span key={tag} className="text-[10px] px-2 py-1 bg-emerald/10 border border-emerald/50 text-mithril font-label-caps uppercase rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* The Palantír WebGL Viewer */}
      <div className="w-full lg:w-1/2 h-[500px] relative">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center font-display-lg text-primary animate-pulse">
              Gazing into the Palantír...
            </div>
          }>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 10]} intensity={1.5} />
              <pointLight position={[-10, -10, -10]} color="#f2ca50" intensity={2} />
              <PalantirSphere activeImage={currentImage} />
              <Environment preset="night" />
            </Canvas>
          </Suspense>
        </div>
        
        {/* Pedestal graphic or base */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-12 bg-gradient-to-b from-surface-container-highest to-background rounded-[100%] blur-[2px] opacity-80 border-t border-mithril/20 shadow-[0_-10px_30px_rgba(242,202,80,0.1)] pointer-events-none"></div>
      </div>
    </div>
  );
};
