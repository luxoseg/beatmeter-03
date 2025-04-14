import { motion } from 'framer-motion';
import { PlayIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useSurveys } from '../contexts/SurveysContext';
import { useState, useEffect, useRef } from 'react';

interface Props {
  id: number;
  artist: string;
  image: string;
  reward: number;
  premium?: boolean;
  onParticipate: () => void;
}

export default function MusicCard({ id, artist, image, reward, premium = false, onParticipate }: Props) {
  const { answeredSurveys } = useSurveys();
  const isAnswered = answeredSurveys.includes(id);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Detect if image is already cached and set loaded state
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setImageLoaded(true);
    }
  }, []);

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: premium ? '0 0 15px rgba(255, 46, 99, 0.3)' : '0 0 15px rgba(0, 240, 255, 0.3)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        delay: id * 0.05
      }}
      className={`relative overflow-hidden shadow-neo ${
        isAnswered ? 'opacity-75' : ''
      } bg-dark-card rounded border ${premium ? 'border-neon-secondary/50' : 'border-dark-border/50'}`}
      data-tutorial="artist-card"
    >
      {premium && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-dark-surface/90 border border-neon-secondary/50 px-2 py-1 rounded-lg">
          <ShieldCheckIcon className="w-3 h-3 text-neon-secondary" />
          <span className="text-[9px] text-neon-secondary font-mono">PREMIUM</span>
        </div>
      )}
      
      <div className="aspect-square overflow-hidden relative">
        {/* Loading state */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-dark-surface animate-pulse">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-px opacity-20">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-dark-border w-full h-full"></div>
              ))}
            </div>
          </div>
        )}
        
        {/* Artist image */}
        <img 
          ref={imgRef}
          src={image} 
          alt={artist}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-60 scale-100' : 'opacity-0 scale-105'
          } ${isAnswered ? 'grayscale' : ''} hover:opacity-80 hover:scale-105`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Scanline effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-primary/5 to-transparent opacity-70 bg-[size:100%_4px] animate-scan pointer-events-none"></div>
        
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent"></div>
        
        {/* Artist info */}
        <div className="absolute bottom-0 w-full p-3">
          <div className="flex justify-between items-end">
            <div>
              <h3 className={`${premium ? 'text-neon-secondary' : 'text-neon-primary'} text-sm sm:text-base font-display font-bold tracking-wider`}>{artist}</h3>
              <span className={`text-xs sm:text-sm text-light ${premium ? 'bg-neon-secondary/20 border border-neon-secondary/30' : 'bg-neon-primary/20 border border-neon-primary/30'} px-2.5 py-0.5 rounded-sm font-mono`}>
                R$ {reward.toFixed(2)}
              </span>
            </div>
            
            {/* Badge for answered surveys */}
            {isAnswered && (
              <div className="flex items-center gap-1 bg-dark-surface/90 border border-dark-border px-1.5 py-0.5 rounded-sm">
                <LockClosedIcon className="w-3 h-3 text-neon-secondary" />
                <span className="text-[9px] sm:text-xs text-dim font-mono whitespace-nowrap">FEITO</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Neon border effect */}
        <div className="absolute inset-0 pointer-events-none border border-neon-primary/30"></div>
        
        {/* Premium overlay for locked premium artists */}
        {premium && (
          <div className="absolute inset-0 bg-dark-500/40 backdrop-blur-sm flex flex-col items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-dark-surface/80 p-3 rounded-full border border-neon-secondary/40 mb-2"
            >
              <LockClosedIcon className="w-5 h-5 text-neon-secondary" />
            </motion.div>
            <p className="text-light text-xs font-medium text-center px-3">Apenas para usuários verificados</p>
          </div>
        )}
      </div>
      
      {/* Action button */}
      {!isAnswered && (
        <div className="p-2 relative">
          <motion.button
            whileHover={{ 
              boxShadow: premium ? '0 0 15px rgba(255, 46, 99, 0.5), 0 0 30px rgba(255, 46, 99, 0.3)' : '0 0 15px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.3)', 
              y: -2 
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onParticipate}
            className={`w-full ${premium 
              ? 'bg-dark-surface text-neon-secondary border border-neon-secondary/60 shadow-glow-secondary-sm' 
              : 'bg-dark-surface text-neon-primary border border-neon-primary/60 shadow-glow-primary-sm'
            } font-mono py-2 rounded flex items-center justify-center gap-2`}
          >
            {premium ? (
              <>
                <ShieldCheckIcon className="w-4 h-4" />
                VERIFICAR
              </>
            ) : (
              <>
                <PlayIcon className="w-4 h-4" />
                AVALIAR
              </>
            )}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}