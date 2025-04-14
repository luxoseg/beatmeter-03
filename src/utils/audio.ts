import { useCallback } from 'react';

class AudioManager {
  private static instance: AudioManager;
  private audio: HTMLAudioElement | null = null;

  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public playRewardSound() {
    try {
      // Create new audio instance if needed
      if (!this.audio) {
        this.audio = new Audio();
        this.audio.src = '/media/dinheiro.mp3';
        this.audio.volume = 0.5;
      }

      // Reset and play
      this.audio.currentTime = 0;
      const playPromise = this.audio.play();

      if (playPromise) {
        playPromise.catch((error) => {
          console.error('Playback failed:', error);
        });
      }
    } catch (error) {
      console.error('Audio setup failed:', error);
    }
  }
}

export function useAudio() {
  const playRewardSound = useCallback(() => {
    AudioManager.getInstance().playRewardSound();
  }, []);

  return { playRewardSound };
}