import { motion } from 'framer-motion';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

interface Level {
  name: string;
  benefits: string[];
  current: boolean;
  unlocked: boolean;
}

export default function ValidationLevels() {
  const levels: Level[] = [
    {
      name: "Iniciante",
      benefits: [
        "Ganhos até R$50 por pesquisa",
        "Até 10 pesquisas por dia",
        "Suporte básico"
      ],
      current: true,
      unlocked: true
    },
    {
      name: "Avançado",
      benefits: [
        "Ganhos até R$100 por pesquisa",
        "Até 20 pesquisas por dia",
        "Suporte prioritário",
        "Acesso a pesquisas premium"
      ],
      current: false,
      unlocked: false
    },
    {
      name: "VIP",
      benefits: [
        "Ganhos até R$150 por pesquisa",
        "Pesquisas ilimitadas",
        "Suporte VIP 24/7",
        "Acesso a todas as pesquisas",
        "Saques instantâneos"
      ],
      current: false,
      unlocked: false
    }
  ];
  
  return (
    <div className="mb-4">
      <h4 className="font-medium text-light mb-2 flex items-center gap-2">
        <StarIcon className="w-5 h-5 text-yellow-400" />
        Níveis de Usuário Desbloqueados Após Validação
      </h4>
      
      <div className="space-y-2">
        {levels.map((level, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -2 }}
            className={`border rounded-xl overflow-hidden ${
              level.current 
                ? 'border-neon-accent bg-dark-surface' 
                : level.unlocked 
                  ? 'border-dark-border bg-dark-surface' 
                  : 'border-dark-border bg-dark-surface'
            }`}
          >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-dark-border/30">
              <div className={`p-1 rounded-full ${
                level.current 
                  ? 'bg-neon-accent/20 text-neon-accent' 
                  : level.unlocked 
                    ? 'bg-neon-secondary/20 text-neon-secondary' 
                    : 'bg-dark-border/20 text-dim'
              }`}>
                {level.current ? (
                  <StarIcon className="w-4 h-4" />
                ) : (
                  <StarOutline className="w-4 h-4" />
                )}
              </div>
              
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  level.current ? 'text-neon-accent' : 'text-light'
                }`}>
                  {level.name}
                </div>
              </div>
              
              {level.current && (
                <div className="text-xs bg-neon-accent text-dark px-2 py-0.5 rounded-full">
                  Atual
                </div>
              )}
              
              {!level.current && !level.unlocked && (
                <div className="text-xs bg-yellow-500 text-dark px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  Bloqueado
                </div>
              )}
            </div>
            
            <div className="px-3 py-2">
              <ul className="space-y-1">
                {level.benefits.map((benefit, i) => (
                  <li key={i} className="text-xs flex items-start gap-1">
                    <span className={`mt-0.5 text-xs ${
                      level.current || level.unlocked ? 'text-neon-accent' : 'text-dim'
                    }`}>
                      •
                    </span>
                    <span className={
                      level.current 
                        ? 'text-light' 
                        : level.unlocked 
                          ? 'text-dim' 
                          : 'text-dim/70'
                    }>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}