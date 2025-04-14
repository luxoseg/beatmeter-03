import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import { useNotifications } from '../contexts/NotificationContext';

// Lazy load components to improve performance
const ActivityNotification = lazy(() => import('./ActivityNotification'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="h-12 bg-dark-surface animate-pulse rounded"></div>
);

export default function Layout() {
  const { currentNotification } = useNotifications();

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-primary via-neon-secondary to-neon-accent opacity-60"></div>
        <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-accent via-neon-primary to-neon-secondary opacity-60"></div>
        
        {/* Grid pattern */}
        <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMzMTMxNDciIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMCAwaDYwdjYwSDB6IiBzdHJva2U9IiMxZTFlMmMiLz48L2c+PC9zdmc+')] opacity-5"></div>
        
        {/* Animated spotlights */}
        <div className="fixed top-1/3 left-1/4 w-64 h-64 rounded-full bg-neon-primary/5 blur-[80px] animate-pulse-slow"></div>
        <div className="fixed bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-neon-secondary/5 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
  
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-24 sm:pt-20 pb-24 mobile-content-pad"
      >
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </motion.main>
      
      <Suspense fallback={<LoadingFallback />}>
        {currentNotification && <ActivityNotification notification={currentNotification} />}
      </Suspense>
      
      <BottomNav />
    </div>
  );
}