import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, BanknotesIcon, QuestionMarkCircleIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useRef } from 'react';

export default function BottomNav() {
  const location = useLocation();
  const { toggleDevMode } = useAuth();
  const clickCount = useRef(0);
  const lastClickTime = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleHelpClick = () => {
    const now = Date.now();
    
    // Resetar contador se passou mais de 2 segundos desde o último clique
    if (now - lastClickTime.current > 2000) {
      clickCount.current = 1;
    } else {
      clickCount.current++;
    }

    lastClickTime.current = now;

    // Limpar timeout anterior se existir
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Definir novo timeout para resetar contador após 2 segundos
    timeoutRef.current = setTimeout(() => {
      clickCount.current = 0;
    }, 2000);

    // Verificar se atingiu 8 cliques
    if (clickCount.current === 8) {
      toggleDevMode();
      clickCount.current = 0;
    }
  };

  const navItems = [
    { path: '/withdraw', icon: BanknotesIcon, label: 'Saque', dataTutorial: 'withdraw-button' },
    { path: '/home', icon: HomeIcon, label: 'Início' },
    { path: '/testimonials', icon: ChatBubbleBottomCenterTextIcon, label: 'Depoimentos' },
    { path: '/faq', icon: QuestionMarkCircleIcon, label: 'Ajuda', onClick: handleHelpClick },
  ];

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-3 left-2 right-2 z-50"
    >
      <div className="container mx-auto">
        <div className="glass-panel backdrop-blur-xl rounded-2xl shadow-neo border border-dark-border/30">
          <div className="flex justify-around items-center py-1.5 sm:py-2">
            {navItems.map(({ path, icon: Icon, label, dataTutorial, onClick }) => (
              <Link 
                key={path}
                to={path}
                onClick={onClick}
                className={`flex flex-col items-center gap-1 px-6 py-2 ${
                  location.pathname === path 
                    ? 'nav-link active' 
                    : 'nav-link'
                }`}
                data-tutorial={dataTutorial}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                <motion.span 
                  className="text-[10px] sm:text-xs font-medium font-mono"
                  animate={{ 
                    y: location.pathname === path ? 0 : 3, 
                    opacity: location.pathname === path ? 1 : 0.7,
                    textShadow: location.pathname === path ? 
                      ['0 0 5px rgba(0, 240, 255, 0.7)', '0 0 10px rgba(0, 240, 255, 0.5)', '0 0 5px rgba(0, 240, 255, 0.7)'] : 
                      'none'
                  }}
                  transition={{ duration: 2, repeat: location.pathname === path ? Infinity : 0 }}
                >
                  {label}
                </motion.span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}