import React from 'react';
import { motion } from 'framer-motion';

interface ArtifactProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
}

export const ArtifactCard = ({ title, description, tags, image }: ArtifactProps) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-[#0e0e0e] border border-primary/20 overflow-hidden transition-all duration-500 flex flex-col hover:border-primary/60 hover:shadow-[0_0_30px_rgba(242,202,80,0.1)]"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          className="w-full h-full object-cover desaturate group-hover:desaturate-0 transition-all duration-700 scale-110 group-hover:scale-100" 
          alt={title} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-60"></div>
      </div>
      <div className="p-6 md:p-8">
        <h3 className="font-display-lg text-xl md:text-2xl text-primary mb-4 tracking-wider uppercase">{title}</h3>
        <p className="font-body-md text-sm md:text-base text-on-surface-variant/80 mb-6 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {tags.map((tag) => (
            <span key={tag} className="text-[9px] md:text-[10px] px-2 py-1 border border-primary/30 text-primary/60 font-label-caps tracking-widest uppercase">
              {tag}
            </span>
          ))}
        </div>
        <a className="inline-flex items-center gap-2 font-label-caps text-[10px] md:text-xs text-primary hover:gap-4 transition-all tracking-[0.2em] group/link" href="#">
          EXAMINE RELIC 
          <span className="material-symbols-outlined text-sm transition-transform group-hover/link:translate-x-1">arrow_forward</span>
        </a>
      </div>
    </motion.div>
  );
};
