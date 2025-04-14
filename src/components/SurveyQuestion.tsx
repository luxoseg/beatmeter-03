import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  id?: string;
  question: string;
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
  type?: 'rating' | 'choice';
  highlight?: boolean;
}

export default function SurveyQuestion({ 
  id, 
  question, 
  options, 
  selectedOption, 
  onSelect, 
  type = 'choice',
  highlight = false
}: Props) {
  const getQuestionClasses = () => {
    if (highlight) {
      return 'text-neon-secondary bg-dark-surface/40 border border-neon-secondary/30 rounded p-3 shadow-glow-secondary-sm';
    }
    return 'text-light';
  };
  
  if (type === 'rating') {
    return (
      <div id={id} className={`mb-6 ${highlight ? 'pb-3 bg-dark-surface/40 rounded p-4 border border-neon-secondary/40' : ''}`}>
        <h3 className={`text-lg font-bold mb-5 text-center flex items-center justify-center gap-2 font-display text-neon-primary ${getQuestionClasses()}`}>
          {highlight && <ExclamationCircleIcon className="w-5 h-5 text-neon-secondary" />}
          {question}
        </h3>
        
        <div className="flex justify-center gap-3">
          {options.map((option) => (
            <motion.button
              key={option}
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(option)}
              className={`flex flex-col items-center justify-center gap-2 w-12 h-12 rounded ${
                selectedOption === option 
                  ? 'bg-dark-surface border border-neon-primary text-neon-primary shadow-glow-primary' 
                  : highlight 
                    ? 'bg-dark-surface border border-neon-secondary/30 text-neon-secondary/70'
                    : 'bg-dark-surface border border-dark-border text-dim hover:border-neon-primary/30 hover:text-neon-primary/70'
              }`}
            >
              <StarIcon className={`w-5 h-5 ${
                selectedOption === option 
                  ? 'text-neon-primary animate-pulse-neon-primary' 
                  : 'text-dim'
              }`} />
              <span className="text-sm font-mono">{option}</span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div id={id} className={`mb-8 ${highlight ? 'pb-3 bg-dark-surface/40 rounded p-4 border border-neon-secondary/30' : ''}`}>
      <h3 className={`text-lg font-bold mb-5 text-center flex items-center justify-center gap-2 font-display text-neon-primary ${getQuestionClasses()}`}>
        {highlight && <ExclamationCircleIcon className="w-5 h-5 text-neon-secondary" />}
        {question}
      </h3>
      
      <div className="space-y-3">
        {options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ 
              x: selectedOption === option ? 0 : 5,
              boxShadow: selectedOption === option 
                ? '0 0 20px rgba(0, 240, 255, 0.5)' 
                : '0 0 10px rgba(255, 255, 255, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option)}
            className={`w-full py-3 rounded text-center text-base transition-all duration-300 relative ${
              selectedOption === option
                ? 'bg-dark-surface border border-neon-primary text-neon-primary shadow-glow-primary'
                : highlight
                  ? 'bg-dark-surface border border-neon-secondary/30 text-light'
                  : 'bg-dark-surface border border-dark-border text-light hover:border-neon-primary/30 hover:text-neon-primary/50'
            }`}
          >
            <span className="font-mono tracking-wide">{option}</span>
            
            {/* Arrow indicator for selected option */}
            {selectedOption === option && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-primary"
              >
                &gt;
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}