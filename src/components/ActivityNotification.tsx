import { motion, AnimatePresence } from 'framer-motion';
import { BanknotesIcon, UserIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface ActivityNotification {
  id: string;
  type: 'survey' | 'withdraw' | 'active';
  name: string;
  amount?: number;
  surveyCount?: number;
}

interface Props {
  notification: ActivityNotification | null;
}

export default function ActivityNotification({ notification }: Props) {
  if (!notification) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'withdraw':
        return <BanknotesIcon className="w-5 h-5 text-neon-accent" />;
      case 'survey':
        return <CheckCircleIcon className="w-5 h-5 text-neon-secondary" />;
      case 'active':
        return <UserIcon className="w-5 h-5 text-neon-primary" />;
    }
  };

  const getBackground = () => {
    switch (notification.type) {
      case 'withdraw':
        return 'border border-neon-accent/30 bg-dark-surface';
      case 'survey':
        return 'border border-neon-secondary/30 bg-dark-surface';
      case 'active':
        return 'border border-neon-primary/30 bg-dark-surface';
    }
  };

  const getTextColor = () => {
    switch (notification.type) {
      case 'withdraw':
        return 'text-neon-accent';
      case 'survey':
        return 'text-neon-secondary';
      case 'active':
        return 'text-neon-primary';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        className="fixed bottom-20 sm:bottom-24 right-4 max-w-sm glass-panel backdrop-blur-lg rounded-xl shadow-neo border border-dark-border/30 p-4 z-50"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ 
              boxShadow: notification.type === 'withdraw' 
                ? ['0 0 5px rgba(1, 195, 141, 0.3)', '0 0 10px rgba(1, 195, 141, 0.5)', '0 0 5px rgba(1, 195, 141, 0.3)']
                : notification.type === 'survey'
                  ? ['0 0 5px rgba(255, 46, 99, 0.3)', '0 0 10px rgba(255, 46, 99, 0.5)', '0 0 5px rgba(255, 46, 99, 0.3)']
                  : ['0 0 5px rgba(0, 240, 255, 0.3)', '0 0 10px rgba(0, 240, 255, 0.5)', '0 0 5px rgba(0, 240, 255, 0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`p-2 ${getBackground()} rounded-lg`}
          >
            {getIcon()}
          </motion.div>
          <div>
            <p className="text-sm text-light font-mono">
              {notification.type === 'withdraw' ? (
                <>
                  <span className="font-medium">{notification.name}</span> acabou de sacar{' '}
                  <span className={`font-bold ${getTextColor()}`}>R$ {notification.amount?.toFixed(2)}</span>
                </>
              ) : notification.type === 'survey' ? (
                <>
                  <span className="font-medium">{notification.name}</span> completou{' '}
                  <span className={`font-bold ${getTextColor()}`}>{notification.surveyCount}</span> pesquisas
                </>
              ) : (
                <>
                  <span className="font-medium">{notification.name}</span>{' '}
                  <span className={getTextColor()}>está respondendo agora</span>
                </>
              )}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}