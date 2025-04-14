import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { validateEmail } from '../utils/validation';
import { ArrowRightIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [devKeyPressed, setDevKeyPressed] = useState(false);
  const { login, isAuthenticated, toggleDevMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the return path from location state
  const from = location.state?.from || '/home';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    // Captura os parâmetros UTM da URL
    const utmParams = new URLSearchParams(window.location.search);
    
    // Verifica se há parâmetros UTM na URL
    if (utmParams.toString()) {
      // Armazena ou atualiza os parâmetros UTM no localStorage
      localStorage.setItem('utmParams', utmParams.toString());
    }
    
    // Adiciona o manipulador de eventos de teclado para a combinação Ctrl+Alt+D
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 'd') {
        setDevKeyPressed(true);
        toggleDevMode();
        toast.success("Modo desenvolvedor ativado via atalho", {
          icon: '🔧',
          style: {
            background: '#1e1e2c',
            color: '#eaeaff',
            border: '1px solid #313147'
          }
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleDevMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Por favor, insira seu email');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Por favor, insira um email válido');
      return;
    }

    setIsSubmitting(true);

    try {
      await login(email);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-dark relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-neon-primary/5 blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-neon-secondary/5 blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-neon-accent/5 blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMzMTMxNDciIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMCAwaDYwdjYwSDB6IiBzdHJva2U9IiMxZTFlMmMiLz48L2c+PC9zdmc+')] opacity-5"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto w-full px-6"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="neo-card rounded-2xl p-8 relative overflow-hidden"
        >
          {/* Card decorations */}
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-neon-primary/5 blur-xl"></div>
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-neon-secondary/5 blur-xl"></div>
          
          <div className="relative">
            <div className="flex justify-center mb-8">
              <motion.div 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-3"
              >
                <div 
                  className="flex items-center justify-center w-12 h-12 rounded-xl border border-neon-primary relative overflow-hidden"
                  style={{ boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)' }}
                >
                  <MusicalNoteIcon className="h-6 w-6 text-neon-primary" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neon-primary/30 via-transparent to-transparent opacity-30"></div>
                </div>
                <motion.span 
                  className="text-2xl font-bold font-display text-neon-primary"
                  animate={{ textShadow: ['0 0 5px rgba(0, 240, 255, 0.7)', '0 0 10px rgba(0, 240, 255, 0.5)', '0 0 5px rgba(0, 240, 255, 0.7)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  BEAT<span className="text-neon-secondary">METER</span>
                </motion.span>
              </motion.div>
            </div>

            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-2xl font-bold text-center text-light mb-2 font-display"
            >
              Bem-vindo(a) ao BEATMETER
            </motion.h2>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center text-dim mb-8"
            >
              Insira seu e-mail para começar a avaliar artistas
            </motion.p>

            <motion.form 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-primary to-neon-secondary rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu e-mail"
                    className="input-neon w-full font-mono"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-dim">
                  <span className="text-neon-primary">@</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-neon-primary w-full py-4 px-6 rounded-lg flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                <span className="font-mono tracking-wide">
                  {isSubmitting ? 'PROCESSANDO...' : 'INICIAR'}
                </span>
                {!isSubmitting && (
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRightIcon className="w-5 h-5" />
                  </motion.div>
                )}
              </motion.button>
            </motion.form>
            
            {devKeyPressed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center text-xs text-neon-accent font-mono"
              >
                🔧 Modo desenvolvedor ativado
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-8 text-center text-dim"
        >
          <p className="font-mono">2025 BEATMETER</p>
          <p className="mt-2 text-xs">Termos e Política de Privacidade</p>
        </motion.footer>
      </motion.div>
    </div>
  );
}