import { motion } from 'framer-motion';

export default function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-dark-900/60 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-dark-surface p-8 rounded-3xl shadow-neo text-center border border-neon-primary/30">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <motion.div
            animate={{ 
              rotate: 360,
              transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
            }}
            className="w-full h-full border-4 border-neon-primary/20 border-t-neon-primary rounded-full absolute"
          />
        </div>
        <p className="text-light font-medium">Processando sua resposta...</p>
      </div>
    </motion.div>
  );
}