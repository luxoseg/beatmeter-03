import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  CalendarDaysIcon,
  CurrencyDollarIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';
import StatsCard from './StatsCard';
import { useSurveys } from '../contexts/SurveysContext';
import { useBalance } from '../contexts/BalanceContext';

export default function StatsDashboard() {
  const { answeredSurveys } = useSurveys();
  const { balance } = useBalance();

  // Calculate daily and monthly stats
  const surveysToday = answeredSurveys.length;
  const potentialEarnings = (10 - answeredSurveys.length) * 35; // Average reward per survey

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-3">
      <motion.div 
        custom={0}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <StatsCard
          title="Saldo Atual"
          value={`R$ ${balance.toFixed(2)}`}
          icon={CurrencyDollarIcon}
          color="primary"
        />
      </motion.div>

      <motion.div 
        custom={1}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <StatsCard
          title="Pesquisas Hoje"
          value={surveysToday}
          icon={CalendarDaysIcon}
          color="secondary"
        />
      </motion.div>

      <motion.div 
        custom={2}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <StatsCard
          title="Pesquisas Restantes"
          value={10 - answeredSurveys.length}
          icon={CheckCircleIcon}
          color="accent"
        />
      </motion.div>

      <motion.div 
        custom={3}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <StatsCard
          title="Potencial Diário"
          value={`R$ ${potentialEarnings.toFixed(2)}`}
          icon={ChartBarIcon}
          color="dark"
        />
      </motion.div>
    </div>
  );
}