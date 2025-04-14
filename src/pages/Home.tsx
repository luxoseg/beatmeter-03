import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { addUTMParams } from '../App';
import MusicCard from '../components/MusicCard';
import AudioVisualizer from '../components/AudioVisualizer';
import StatsDashboard from '../components/StatsDashboard';
import Tutorial from '../components/Tutorial';
import Depoimentos from '../components/Depoimentos';
import { surveys, premiumSurveys } from '../data/surveys';
import { useSurveys } from '../contexts/SurveysContext';
import { useWithdraw } from '../contexts/WithdrawContext';
import { motion } from 'framer-motion';
import { SparklesIcon, BoltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import DevModeToggle from '../components/DevModeToggle';

export default function Home() {
  const navigate = useNavigate();
  const { answeredSurveys } = useSurveys();
  const { completedSurveys } = useWithdraw();
  const { devMode } = useAuth();
  const hasAnsweredFirstSurvey = answeredSurveys.length > 0;

  // Redirecionar para página de saque após 8 pesquisas
  if (completedSurveys >= 8) {
    navigate('/withdraw');
  }

  // Sort surveys: unanswered first, then answered
  const sortedSurveys = [...surveys].sort((a, b) => {
    const aAnswered = answeredSurveys.includes(a.id);
    const bAnswered = answeredSurveys.includes(b.id);
    return aAnswered === bAnswered ? 0 : aAnswered ? 1 : -1;
  });

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 sm:space-y-4 mt-14 sm:mt-2"
      >
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-card rounded-3xl p-6 sm:p-4 mb-8 sm:mb-4 border border-primary-100 bg-dark-card relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 h-full w-1/3 -skew-x-12 opacity-10 bg-gradient-to-r from-transparent to-primary-500"></div>
          <div className="absolute top-0 left-0 h-16 w-16 rounded-full -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-secondary-300/30 to-transparent"></div>
          
          <div className="flex flex-row gap-4 items-center">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-dark-surface text-neon-primary rounded-full p-3 hidden sm:flex"
            >
              <SparklesIcon className="w-6 h-6" />
            </motion.div>
            
            <div>
              <h1 className="text-3xl font-bold text-light mb-2 font-heading">
                <span className="gradient-text">Avalie & Ganhe</span>
              </h1>
              <p className="text-dim font-medium">
                Sua opinião vale dinheiro! Avalie artistas e receba recompensas instantâneas
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <AudioVisualizer />
          </div>
          
          <div className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full bg-dark-surface/50"></div>
          
          {devMode && (
            <div className="absolute top-2 right-2 bg-neon-accent text-dark text-xs px-2 py-0.5 rounded-md font-mono">
              DEV MODE
            </div>
          )}
        </motion.div>

        <StatsDashboard />
        
        {/* Seção de Depoimentos - Mostra no topo apenas se não houver pesquisas respondidas */}
        {!hasAnsweredFirstSurvey && <div className="mb-8 sm:mb-4"><Depoimentos /></div>}

        <div className="relative mb-6 sm:mb-4">
          <div className="flex items-center gap-2 mb-4">
            <BoltIcon className="w-5 h-5 text-neon-accent" />
            <h2 className="text-xl font-bold text-light font-heading">
              Artistas em Destaque
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sortedSurveys.map((survey) => (
              <MusicCard
                key={survey.id}
                id={survey.id}
                artist={survey.artist}
                image={survey.image}
                reward={survey.reward}
                premium={survey.premium}
                onParticipate={() => navigate(addUTMParams(`/survey/${survey.id}`))}
              />
            ))}
          </div>
        </div>

        {/* Seção de Artistas Premium */}
        <div className="relative mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5 text-neon-secondary" />
              <h2 className="text-xl font-bold text-light font-heading">
                Artistas Premium
              </h2>
            </div>
            
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-neon-secondary/10 border border-neon-secondary/30 text-xs font-mono text-neon-secondary px-2 py-1 rounded-md"
            >
              Recompensa 3x maior
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {premiumSurveys.map((survey) => (
              <MusicCard
                key={survey.id}
                id={survey.id}
                artist={survey.artist}
                image={survey.image}
                reward={survey.reward}
                premium={survey.premium}
                onParticipate={() => {
                  // Aqui abriremos o modal de verificação em vez de ir para a pesquisa
                  navigate('/withdraw');
                }}
              />
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 bg-dark-surface p-4 rounded-xl border border-neon-secondary/20 text-sm text-dim text-center"
          >
            Desbloqueie os Artistas Premium fazendo a validação da sua conta e ganhe até R$ 150,00 por pesquisa!
          </motion.div>
        </div>

        {/* Seção de Depoimentos - Mostra embaixo após a primeira pesquisa */}
        {hasAnsweredFirstSurvey && <Depoimentos />}
      </motion.div>
      <Tutorial />
      <DevModeToggle />
    </>
  );
}