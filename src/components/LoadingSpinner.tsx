import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-4 border-neon-primary border-t-transparent rounded-full"
      />
    </div>
  );
}