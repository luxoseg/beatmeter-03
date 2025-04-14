import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateRandomNotification } from '../utils/notifications';
import type { ActivityNotification } from '../types/notifications';

interface NotificationContextType {
  currentNotification: ActivityNotification | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [currentNotification, setCurrentNotification] = useState<ActivityNotification | null>(null);

  useEffect(() => {
    const showNotification = () => {
      const notification = generateRandomNotification();
      setCurrentNotification(notification);
      
      setTimeout(() => {
        setCurrentNotification(null);
      }, 3000);
    };

    const initialTimeout = setTimeout(showNotification, 5000);
    const interval = setInterval(showNotification, Math.random() * 7000 + 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ currentNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}