import { useState, useEffect } from 'react';
import { UsersIcon } from '@heroicons/react/24/outline';

interface LimitedSpotsProps {
  initialSpots: number;
}

export default function LimitedSpots({ initialSpots }: LimitedSpotsProps) {
  const [spots, setSpots] = useState(initialSpots);
  
  useEffect(() => {
    // Check if spots count exists in localStorage
    const savedSpots = localStorage.getItem('limited_spots');
    
    if (savedSpots) {
      setSpots(parseInt(savedSpots));
    } else {
      localStorage.setItem('limited_spots', initialSpots.toString());
    }
    
    // Decrease spots randomly
    const interval = setInterval(() => {
      const shouldDecrease = Math.random() < 0.3; // 30% chance
      
      if (shouldDecrease) {
        setSpots(prev => {
          const newSpots = Math.max(1, prev - 1); // Never go below 1
          localStorage.setItem('limited_spots', newSpots.toString());
          return newSpots;
        });
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [initialSpots]);
  
  return (
    <div className="mt-2 text-yellow-100 flex items-center justify-center gap-1 text-sm font-medium">
      <UsersIcon className="w-4 h-4" />
      {spots <= 5 ? (
        <span className="animate-pulse">⚠️ Apenas {spots} {spots === 1 ? 'vaga restante' : 'vagas restantes'} hoje!</span>
      ) : (
        <span>Apenas {spots} vagas restantes hoje</span>
      )}
    </div>
  );
}