import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Props {
  reward: number;
  onClose: () => void;
}

export default function CompletionMessage({ reward, onClose }: Props) {
  useEffect(() => {
    // Trigger the confetti effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#6c28fe', '#4c16bf', '#1aa4d3', '#ff9500']
      }));
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#6c28fe', '#4c16bf', '#1aa4d3', '#ff9500']
      }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-dark-900/70 backdrop-blur-sm p-4"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-card border border-white/30"
      >
        <div className="mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircleIcon className="w-10 h-10 text-primary-500" />
          </motion.div>
        </div>

        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-dark-900 mb-2 font-heading"
        >
          Parabéns! 🎉
        </motion.h2>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-dark-600 mb-4"
        >
          Você completou sua primeira pesquisa e ganhou
          <motion.span 
            className="block text-3xl font-bold gradient-text my-4 font-heading"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: 2, duration: 1 }}
          >
            R$ {reward.toFixed(2)}
          </motion.span>
          Continue avaliando mais artistas para aumentar seus ganhos!
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-4 rounded-xl shadow-primary"
        >
          Continuar Avaliando
        </motion.button>
      </motion.div>
    </motion.div>
  );
}