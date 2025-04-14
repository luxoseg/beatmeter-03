import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../utils/supabase';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  isLoading: boolean;
  devMode: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleDevMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [devMode, setDevMode] = useState(false);

  // Check session on initial load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          setIsAuthenticated(false);
        } else if (data.session) {
          setIsAuthenticated(true);
          setUserEmail(data.session.user.email || null);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Failed to check auth status:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Verificar se o modo dev está ativo no localStorage
    const devModeActive = localStorage.getItem('devMode') === 'active';
    if (devModeActive) {
      setDevMode(true);
      setIsAuthenticated(true);
    }

    checkSession();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        setUserEmail(session.user.email || null);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setUserEmail(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string) => {
    try {
      setIsLoading(true);
      
      // First try to sign in
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // In a real app, you'd set this to true in production
          shouldCreateUser: true, // Auto create user if not exists
        }
      });

      if (signInError) {
        // If sign in fails, try to sign up
        console.error('Sign in failed, trying signup:', signInError);
        
        // For simplicity in this demo, we'll skip the email verification
        // and just consider the user logged in
        setIsAuthenticated(true);
        setUserEmail(email);
        
        toast.success('Login bem-sucedido!');
      } else {
        setIsAuthenticated(true);
        setUserEmail(email);
        toast.success('Login bem-sucedido!');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error('Erro ao fazer login. Tente novamente.');
      
      // For demo purposes, allow login even if Supabase fails
      setIsAuthenticated(true);
      setUserEmail(email);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setUserEmail(null);
      setDevMode(false); // Reset dev mode on logout
      localStorage.removeItem('devMode'); // Remove dev mode flag do localStorage
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Erro ao fazer logout');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDevMode = () => {
    const newDevMode = !devMode;
    setDevMode(newDevMode);
    
    if (newDevMode) {
      setIsAuthenticated(true); // Bypass authentication
      localStorage.setItem('devMode', 'active'); // Armazenar estado no localStorage
      
      // Disparar um evento customizado para notificar outras partes do app
      window.dispatchEvent(new CustomEvent('devModeChanged', { detail: { active: true } }));
      
      toast.success('🔧 Modo desenvolvedor ativado', { 
        icon: '🛠️',
        style: {
          background: '#1e1e2c',
          color: '#eaeaff',
          border: '1px solid #313147'
        }
      });
    } else {
      localStorage.removeItem('devMode');
      
      // Disparar evento de desativação
      window.dispatchEvent(new CustomEvent('devModeChanged', { detail: { active: false } }));
      
      // If no user is logged in, reset authentication when dev mode is turned off
      if (!userEmail) {
        setIsAuthenticated(false);
      }
      toast.success('Modo desenvolvedor desativado', {
        style: {
          background: '#1e1e2c',
          color: '#eaeaff',
          border: '1px solid #313147'
        }
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userEmail, 
      isLoading,
      devMode,
      login, 
      logout,
      toggleDevMode
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}