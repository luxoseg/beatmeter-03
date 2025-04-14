import { useCallback, useRef, useEffect } from 'react';

export function useSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload audio on component mount
    audioRef.current = new Audio();
    audioRef.current.src = './media/dinheiro.mp3';
    audioRef.current.load();

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playRewardSound = useCallback(() => {
    if (!audioRef.current) return;

    try {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;
      
      const playPromise = audioRef.current.play();
      
      if (playPromise) {
        playPromise.catch((error) => {
          console.error('Playback failed:', error.message);
        });
      }
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  }, []);

  return { playRewardSound };
}