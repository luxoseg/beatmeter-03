import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';

interface CountdownTimerProps {
  initialMinutes: number;
  initialSeconds: number;
}

export default function CountdownTimer({ initialMinutes, initialSeconds }: CountdownTimerProps) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  
  useEffect(() => {
    // Check if countdown values exist in localStorage
    const savedMinutes = localStorage.getItem('countdown_minutes');
    const savedSeconds = localStorage.getItem('countdown_seconds');
    const savedTimestamp = localStorage.getItem('countdown_timestamp');
    
    if (savedMinutes && savedSeconds && savedTimestamp) {
      // Calculate elapsed time since last save
      const now = new Date().getTime();
      const elapsed = Math.floor((now - parseInt(savedTimestamp)) / 1000);
      
      // Calculate remaining time
      const totalSeconds = parseInt(savedMinutes) * 60 + parseInt(savedSeconds);
      const remainingSeconds = Math.max(0, totalSeconds - elapsed);
      
      if (remainingSeconds > 0) {
        setMinutes(Math.floor(remainingSeconds / 60));
        setSeconds(remainingSeconds % 60);
      } else {
        // Countdown finished, reset to initial values
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
        saveCountdown(initialMinutes, initialSeconds);
      }
    } else {
      // First time, save initial values
      saveCountdown(initialMinutes, initialSeconds);
    }
    
    const interval = setInterval(() => {
      // Update countdown
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
      
      // Save current values
      saveCountdown(
        seconds > 0 ? minutes : minutes - 1,
        seconds > 0 ? seconds - 1 : 59
      );
    }, 1000);
    
    return () => clearInterval(interval);
  }, [minutes, seconds, initialMinutes, initialSeconds]);
  
  const saveCountdown = (min: number, sec: number) => {
    if (min < 0) min = 0;
    if (sec < 0) sec = 0;
    
    localStorage.setItem('countdown_minutes', min.toString());
    localStorage.setItem('countdown_seconds', sec.toString());
    localStorage.setItem('countdown_timestamp', new Date().getTime().toString());
  };
  
  return (
    <motion.div 
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 font-medium"
    >
      <ClockIcon className="w-4 h-4" />
      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </motion.div>
  );
}