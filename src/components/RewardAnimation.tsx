import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Props {
  amount: number;
  onComplete: () => void;
}

export default function RewardAnimation({ amount, onComplete }: Props) {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-4xl font-bold text-green-500 mb-2"
      >
        + R$ {amount.toFixed(2)}
      </motion.div>
      <p className="text-gray-600">Recompensa adicionada!</p>
    </motion.div>
  );
}