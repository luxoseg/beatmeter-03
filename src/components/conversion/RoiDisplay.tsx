import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChartBarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

interface RoiDisplayProps {
  validationFee?: number;
}

export default function RoiDisplay({ validationFee = 21.24 }: RoiDisplayProps) {
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly'>('monthly');
  
  const earnings = {
    beforeValidation: {
      daily: 100,
      monthly: 3000
    },
    afterValidation: {
      daily: 300,
      monthly: 9000
    }
  };
  
  const roi = {
    daily: (earnings.afterValidation.daily - validationFee) / validationFee * 100,
    monthly: (earnings.afterValidation.monthly - validationFee) / validationFee * 100
  };
  
  return (
    <div className="bg-dark-surface rounded-xl p-4 mb-4 border border-dark-border/30">
      <h4 className="font-medium text-light mb-2 flex items-center gap-2">
        <ChartBarIcon className="w-5 h-5 text-neon-accent" />
        Seu Potencial de Ganhos
      </h4>
      
      <div className="bg-dark-card rounded-xl overflow-hidden mb-3 border border-dark-border/20">
        <div className="flex border-b border-dark-border/20">
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === 'daily' 
                ? 'bg-neon-accent text-dark' 
                : 'bg-dark-surface text-light hover:bg-dark-border/10'
            }`}
            onClick={() => setActiveTab('daily')}
          >
            Ganhos Diários
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === 'monthly' 
                ? 'bg-neon-accent text-dark' 
                : 'bg-dark-surface text-light hover:bg-dark-border/10'
            }`}
            onClick={() => setActiveTab('monthly')}
          >
            Ganhos Mensais
          </button>
        </div>
        
        <div className="p-3">
          <div className="flex gap-2 items-center justify-between mb-2">
            <div className="text-sm text-dim">Sem validação:</div>
            <div className="font-medium text-light">
              R$ {activeTab === 'daily' 
                ? earnings.beforeValidation.daily.toFixed(2) 
                : earnings.beforeValidation.monthly.toFixed(2)
              }
            </div>
          </div>
          
          <div className="flex gap-2 items-center justify-between">
            <div className="text-sm text-dim">Com validação:</div>
            <div className="font-bold text-neon-accent">
              R$ {activeTab === 'daily' 
                ? earnings.afterValidation.daily.toFixed(2) 
                : earnings.afterValidation.monthly.toFixed(2)
              }
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-dark-border/20">
            <div className="flex items-center justify-between">
              <div className="text-sm text-dim">Crescimento:</div>
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="font-bold text-neon-accent flex items-center gap-1"
              >
                <ArrowTrendingUpIcon className="w-4 h-4" />
                +200%
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-dark-surface p-3 rounded-xl border border-neon-accent/30">
        <div className="flex justify-between items-center">
          <div className="text-sm text-light">Retorno sobre investimento:</div>
          <div className="font-bold text-neon-accent">
            {Math.round(activeTab === 'daily' ? roi.daily : roi.monthly)}x
          </div>
        </div>
        <div className="text-xs text-dim mt-1">
          Para cada R$1 investido na validação, você recebe R${Math.round(activeTab === 'daily' ? roi.daily/100 : roi.monthly/100)} de volta!
        </div>
      </div>
    </div>
  );
}