import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';

interface WithdrawContextType {
  checkWithdrawLimit: (amount: number) => boolean;
  isWithdrawing: boolean;
  startWithdraw: () => void;
  endWithdraw: () => void;
  completedSurveys: number;
  incrementCompletedSurveys: () => void;
  canWithdraw: () => boolean;
  setDevSurveys: () => void;
  devMode: boolean;
}

const WithdrawContext = createContext<WithdrawContextType | undefined>(undefined);

const MINIMUM_SURVEYS = 8;

const WITHDRAW_LIMITS = [
  { min: 470, max: 475 },
  { min: 940, max: 950 },
  { min: 1400, max: Infinity }
];

// Uso direto das props para evitar circular dependency
export function WithdrawProvider({ children }: { children: ReactNode }) {
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [completedSurveys, setCompletedSurveys] = useState(0);
  // Vamos ler o modo dev do localStorage para evitar referência circular
  const [isDevMode, setIsDevMode] = useState(false);

  // Verificar se o modo dev está ativo
  useEffect(() => {
    // Inscrever-se em alterações no localStorage para o modo dev
    const checkDevMode = () => {
      const devModeActive = localStorage.getItem('devMode') === 'active';
      setIsDevMode(devModeActive);
      
      // Se o modo dev for ativado, definimos automaticamente o número de pesquisas para 8
      if (devModeActive && completedSurveys < MINIMUM_SURVEYS) {
        setCompletedSurveys(MINIMUM_SURVEYS);
      }
    };

    // Verificar estado inicial
    checkDevMode();

    // Adicionar um listener para o storage para detectar mudanças no modo dev
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'devMode') {
        checkDevMode();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Criar um intervalo para verificar regularmente (necessário para atualizações na mesma aba)
    const interval = setInterval(checkDevMode, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [completedSurveys]);

  // Definir artificialmente 8 pesquisas completas (para modo dev)
  const setDevSurveys = () => {
    setCompletedSurveys(MINIMUM_SURVEYS);
  };

  const canWithdraw = () => {
    // Se o modo dev estiver ativo, bypass a verificação
    if (isDevMode) {
      return true;
    }

    // Verificação normal
    if (completedSurveys < MINIMUM_SURVEYS) {
      toast.error(`Complete pelo menos ${MINIMUM_SURVEYS} pesquisas para poder sacar!`);
      return false;
    }
    return true;
  };

  const checkWithdrawLimit = (earnedAmount: number) => {
    // Bypass os limites de saque no modo dev
    if (isDevMode) {
      return false;
    }

    // Verificação normal
    if (completedSurveys >= MINIMUM_SURVEYS) {
      const limitReached = WITHDRAW_LIMITS.some(({ min, max }) => 
        earnedAmount >= min && earnedAmount < max
      );

      if (limitReached) {
        toast.success("Você atingiu o limite diário! Faça seu saque agora.");
      }

      return limitReached;
    }
    return false;
  };

  const startWithdraw = () => {
    if (canWithdraw()) {
      setIsWithdrawing(true);
    }
  };

  const endWithdraw = () => setIsWithdrawing(false);
  
  const incrementCompletedSurveys = () => {
    // Não incrementa se já está no modo dev
    if (!isDevMode) {
      setCompletedSurveys(prev => prev + 1);
    }
  };

  return (
    <WithdrawContext.Provider value={{ 
      checkWithdrawLimit, 
      isWithdrawing, 
      startWithdraw, 
      endWithdraw,
      completedSurveys,
      incrementCompletedSurveys,
      canWithdraw,
      setDevSurveys,
      devMode: isDevMode
    }}>
      {children}
    </WithdrawContext.Provider>
  );
}

export function useWithdraw() {
  const context = useContext(WithdrawContext);
  if (!context) {
    throw new Error('useWithdraw must be used within a WithdrawProvider');
  }
  return context;
}