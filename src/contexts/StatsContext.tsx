import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Stats {
  totalPaid: number;
  totalRecipients: number;
}

interface StatsContextType {
  stats: Stats;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<Stats>({
    totalPaid: 158750.00,
    totalRecipients: 847
  });

  useEffect(() => {
    const updateStats = () => {
      setStats(prev => ({
        totalPaid: prev.totalPaid + Math.random() * (1000 - 500) + 500,
        totalRecipients: prev.totalRecipients + Math.floor(Math.random() * 3) + 1
      }));
    };

    const interval = setInterval(updateStats, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StatsContext.Provider value={{ stats }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
}