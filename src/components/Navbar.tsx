import { useBalance } from '../contexts/BalanceContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import Stats from './Stats';
import { MusicalNoteIcon, WrenchIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { balance } = useBalance();
  const { userEmail } = useAuth();
  const { devMode } = useAuth();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="glass-panel backdrop-blur-xl border-b border-dark-border/20 py-1.5 sm:py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-0">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <motion.div 
                  animate={{ 
                    boxShadow: ['0 0 8px rgba(0, 240, 255, 0.8)', '0 0 16px rgba(0, 240, 255, 0.4)', '0 0 8px rgba(0, 240, 255, 0.8)']
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex items-center justify-center p-1 rounded h-9 w-9 bg-dark border border-neon-primary/60"
                >
                  <MusicalNoteIcon className="h-5 w-5 text-neon-primary" />
                </motion.div>
                <motion.span 
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="font-display font-bold text-xl text-neon-primary"
                >
                  BEAT<span className="text-neon-secondary">METER</span>
                </motion.span>
                
                {devMode && (
                  <div className="flex items-center ml-2 text-neon-accent text-xs px-1.5 py-0.5 rounded bg-dark-card border border-neon-accent/30">
                    <WrenchIcon className="w-3 h-3 mr-1" />
                    DEV
                  </div>
                )}
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-neon-secondary px-4 py-1.5 rounded sm:hidden"
                data-tutorial="balance-display"
              >
                R$ {balance.toFixed(2)}
              </motion.div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:ml-auto">
              {userEmail && (
                <span className="text-sm text-dim text-center sm:text-left truncate max-w-[200px] font-mono">
                  <span className="hidden sm:inline text-neon-primary/70">&gt; </span>
                  <span className="font-medium text-light/80">{userEmail.split('@')[0]}</span>
                </span>
              )}
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block btn-neon-secondary px-4 py-1.5 rounded"
                data-tutorial="balance-display"
              >
                <span className="font-mono">R$ {balance.toFixed(2)}</span>
              </motion.div>
            </div>
          </div>
          
          <div className="mt-0.5 sm:mt-0">
            <Stats />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}