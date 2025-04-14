import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { surveys } from '../data/surveys';
import { useBalance } from '../contexts/BalanceContext';
import { useSurveys } from '../contexts/SurveysContext';
import { useWithdraw } from '../contexts/WithdrawContext';
import { useSound } from '../hooks/useSound';
import SurveyQuestion from '../components/SurveyQuestion';
import LoadingOverlay from '../components/LoadingOverlay';
import CompletionMessage from '../components/CompletionMessage';
import CompletionModal from '../components/CompletionModal';
import { ArrowLeftIcon, BanknotesIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

type Answers = {
  rating: string | null;
  recommendation: string | null;
  ageGroup: string | null;
};

export default function Survey() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { balance, addToBalance } = useBalance();
  const { answeredSurveys, markSurveyAsAnswered } = useSurveys();
  const { checkWithdrawLimit, incrementCompletedSurveys, completedSurveys } = useWithdraw();
  const { playRewardSound } = useSound();
  const mainRef = useRef<HTMLDivElement>(null);
  
  const survey = surveys.find(s => s.id === Number(id));
  const [isLoading, setIsLoading] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showValidationWarning, setShowValidationWarning] = useState(false);
  const isFirstSurvey = answeredSurveys.length === 0;
  
  // Scroll para o topo quando o componente montar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  const [answers, setAnswers] = useState<Answers>({
    rating: null,
    recommendation: null,
    ageGroup: null
  });
  
  // Determinar o progresso da pesquisa atual
  const calculateProgress = () => {
    let progress = 0;
    if (answers.rating) progress += 1;
    if (answers.recommendation) progress += 1;
    if (answers.ageGroup) progress += 1;
    return (progress / 3) * 100;
  };

  // Verificar quais perguntas estão faltando
  const getMissingQuestions = () => {
    const missing = [];
    if (!answers.rating) missing.push('avaliação');
    if (!answers.recommendation) missing.push('recomendação');
    if (!answers.ageGroup) missing.push('faixa etária');
    return missing;
  };

  const scrollToNextQuestion = (questionElement: HTMLElement | null) => {
    if (questionElement) {
      // Calcula a posição considerando o header fixo
      const headerOffset = 100; // Altura aproximada do header + margem
      const elementPosition = questionElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleAnswerSelect = (type: keyof Answers, option: string) => {
    setAnswers(prev => ({ ...prev, [type]: option }));
    setShowValidationWarning(false);
    
    // Determina a próxima pergunta para scroll
    let nextQuestionId = '';
    if (type === 'rating') nextQuestionId = 'recommendation-question';
    if (type === 'recommendation') nextQuestionId = 'age-question';
    if (type === 'ageGroup') nextQuestionId = 'submit-button';

    // Scroll para a próxima pergunta
    setTimeout(() => {
      scrollToNextQuestion(document.getElementById(nextQuestionId));
    }, 100);
  };

  // Encontrar a primeira pergunta não respondida
  const scrollToFirstUnanswered = () => {
    if (!answers.rating) {
      scrollToNextQuestion(document.getElementById('rating-question'));
    } else if (!answers.recommendation) {
      scrollToNextQuestion(document.getElementById('recommendation-question'));
    } else if (!answers.ageGroup) {
      scrollToNextQuestion(document.getElementById('age-question'));
    }
  };

  if (!survey) {
    return <div className="text-center text-dark-600">Pesquisa não encontrada</div>;
  }

  const handleSubmit = async () => {
    if (!answers.rating || !answers.recommendation || !answers.ageGroup) {
      setShowValidationWarning(true);
      toast.error('Por favor, responda todas as questões');
      scrollToFirstUnanswered();
      return;
    }

    setIsLoading(true);
    playRewardSound();

    await new Promise(resolve => setTimeout(resolve, 1500));

    const newBalance = balance + survey.reward;
    addToBalance(survey.reward);
    markSurveyAsAnswered(survey.id);
    incrementCompletedSurveys();
    setIsLoading(false);

    if (isFirstSurvey) {
      setShowCompletion(true);
    } else {
      if (checkWithdrawLimit(newBalance)) {
        return;
      }
      toast.success(`Você ganhou R$ ${survey.reward.toFixed(2)}!`);
      
      if (completedSurveys + 1 === 8) {
        setShowCompletionModal(true);
        return;
      }
      
      navigate('/home');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingOverlay />}
        {showCompletion && (
          <CompletionMessage
            reward={survey.reward}
            onClose={() => {
              setShowCompletion(false);
              navigate('/home');
            }}
          />
        )}
      </AnimatePresence>

      <CompletionModal 
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        balance={balance + survey.reward}
      />
      
      <div className="mt-20 mb-4 flex items-center justify-between">
        <motion.button 
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/home')}
          className="flex items-center gap-1.5 text-light hover:text-neon-primary bg-dark-surface/80 backdrop-blur-sm px-3 py-2 rounded-xl border border-dark-border/30"
        >
          <ArrowLeftIcon className="w-4 h-4" /> Voltar
        </motion.button>
        
        <div className="bg-accent-100 text-accent-600 font-semibold px-4 py-2 rounded-xl text-sm flex items-center gap-1.5 shadow-sm">
          <BanknotesIcon className="w-4 h-4" />
          R$ {survey.reward.toFixed(2)}
        </div>
      </div>
      
      <div className="w-full h-3 bg-dark-100 rounded-full mb-6 overflow-hidden">
        <motion.div 
          animate={{ width: `${calculateProgress()}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="h-full bg-gradient-to-r from-primary-500 to-primary-400"
        />
      </div>
      
      <motion.div
        ref={mainRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="max-w-md mx-auto bg-dark-surface rounded-3xl shadow-neo overflow-hidden border border-dark-border/30"
      >
        <div className="relative h-48">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-dark-card animate-pulse" />
          )}
          <img
            src={survey.image}
            alt={survey.artist}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-dark-900/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-4">
            <h2 className="text-white text-xl font-bold font-heading">{survey.artist}</h2>
          </div>
        </div>

        <div className="p-5 space-y-6 bg-dark-card">
          <SurveyQuestion
            id="rating-question"
            type="rating"
            question={survey.questions.rating}
            options={['1', '2', '3', '4', '5']}
            selectedOption={answers.rating}
            onSelect={(option) => handleAnswerSelect('rating', option)}
            highlight={showValidationWarning && !answers.rating}
          />

          <SurveyQuestion
            id="recommendation-question"
            question={survey.questions.recommendation}
            options={['Sim', 'Não']}
            selectedOption={answers.recommendation}
            onSelect={(option) => handleAnswerSelect('recommendation', option)}
            highlight={showValidationWarning && !answers.recommendation}
          />

          <SurveyQuestion
            id="age-question"
            question={survey.questions.ageGroup}
            options={['-18 anos', '+18 anos']}
            selectedOption={answers.ageGroup}
            onSelect={(option) => handleAnswerSelect('ageGroup', option)}
            highlight={showValidationWarning && !answers.ageGroup}
          />

          {showValidationWarning && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-accent-50 border border-accent-200 rounded-xl p-4 flex items-start gap-3"
            >
              <ExclamationCircleIcon className="w-6 h-6 text-accent-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-accent-700 font-medium">Por favor, responda todas as questões</p>
                {getMissingQuestions().length > 0 && (
                  <p className="text-xs text-accent-600 mt-1">
                    Falta responder: {getMissingQuestions().join(', ')}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          <motion.button
            id="submit-button"
            whileHover={{ scale: answers.rating && answers.recommendation && answers.ageGroup ? 1.02 : 1 }}
            whileTap={{ scale: answers.rating && answers.recommendation && answers.ageGroup ? 0.98 : 1 }}
            onClick={handleSubmit}
            className={`w-full font-bold py-4 rounded-xl transition-all duration-300 ${
              answers.rating && answers.recommendation && answers.ageGroup
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-primary'
                : 'bg-dark-200 text-dark-400'
            }`}
          >
            Enviar respostas
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}