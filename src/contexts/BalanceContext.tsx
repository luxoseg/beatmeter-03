import { createContext, useContext, useState, ReactNode } from 'react';

interface BalanceContextType {
  balance: number;
  addToBalance: (amount: number) => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(100.00);

  const addToBalance = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  return (
    <BalanceContext.Provider value={{ balance, addToBalance }}>
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const context = useContext(BalanceContext);
  if (context === undefined) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  return context;
}