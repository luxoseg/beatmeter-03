import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface Depoimento {
  id: number;
  nome: string;
  foto: string;
  valor: number;
  dias: number;
  texto: string;
  avaliacao: number;
  cidade: string;
  estado: string;
}

const depoimentos: Depoimento[] = [
  {
    id: 1,
    nome: "Marcos Silva",
    foto: "/images/testimonials/user1.jpg",
    valor: 432.50,
    dias: 2,
    texto: "Nunca acreditei que fosse possível ganhar dinheiro online de forma tão fácil. Completei 10 pesquisas e consegui sacar na hora. O dinheiro caiu na minha conta em menos de 24h!",
    avaliacao: 5,
    cidade: "São Paulo",
    estado: "SP"
  },
  {
    id: 2,
    nome: "Beatriz Santos",
    foto: "/images/testimonials/user2.jpg",
    valor: 754.80,
    dias: 5,
    texto: "Eu estava muito desconfiada no início, mas depois que fiz a validação, comecei a ganhar muito mais! Já fiz 3 saques e todos caíram na minha conta Nubank rapidinho.",
    avaliacao: 5,
    cidade: "Rio de Janeiro",
    estado: "RJ"
  },
  {
    id: 3,
    nome: "Ricardo Oliveira",
    foto: "/images/testimonials/user3.jpg",
    valor: 1245.00,
    dias: 7,
    texto: "No começo achei que era golpe, principalmente por causa da taxa de validação. Mas quando vi que era reembolsável e ainda ganhei o bônus de R$50, fiquei impressionado. Sistema 100% confiável!",
    avaliacao: 4,
    cidade: "Belo Horizonte",
    estado: "MG"
  }
];

export default function Depoimentos() {
  const [depoimentoAtual, setDepoimentoAtual] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [_destacado, _setDestacado] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Controla o carrossel automático
  useEffect(() => {
    if (!autoPlay) return;
    
    const intervalo = setInterval(() => {
      setDepoimentoAtual((atual) => (atual + 1) % depoimentos.length);
    }, 5000);
    
    return () => clearInterval(intervalo);
  }, [autoPlay]);
  
  // Pausa o carrossel ao passar o mouse
  const pausarAutoPlay = () => setAutoPlay(false);
  const continuarAutoPlay = () => setAutoPlay(true);
  
  // Formata o valor para exibição
  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // Navegar para a página completa de depoimentos
  const verMaisDepoimentos = () => {
    navigate('/testimonials');
  };

  return (
    <div className="bg-dark-surface rounded-2xl shadow-neo border border-dark-border/30 p-6 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-light mb-2 font-heading">Depoimentos Verificados</h2>
        <div className="flex items-center justify-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon key={star} className="h-5 w-5 text-yellow-400" />
          ))}
        </div>
        <p className="text-dim max-w-md mx-auto">
          Veja o que as pessoas estão falando sobre nossa plataforma de avaliação musical
        </p>
      </div>
      
      {/* Carrossel de depoimentos */}
      <div 
        ref={carouselRef} 
        className="relative overflow-hidden" 
        onMouseEnter={pausarAutoPlay}
        onMouseLeave={continuarAutoPlay}
      >
        <div className="absolute top-2 left-2 z-10 bg-dark-surface text-neon-primary text-xs font-bold px-2 py-1 rounded-full flex items-center border border-neon-primary/30">
          <CheckCircleIcon className="h-4 w-4 mr-1" />
          Verificado
        </div>
      
        <AnimatePresence mode="wait">
          <motion.div
            key={depoimentoAtual}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-card rounded-xl p-5 relative border border-dark-border/20"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <div className="relative w-24 h-24 mx-auto md:mx-0 mb-4 md:mb-0">
                  <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-neon-primary/70">
                    <img
                      src={depoimentos[depoimentoAtual].foto}
                      alt={depoimentos[depoimentoAtual].nome}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback para imagem genérica se a foto não carregar
                        (e.target as HTMLImageElement).src = "/images/placeholder-profile.jpg";
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-neon-primary rounded-full p-1">
                    <CheckCircleIcon className="h-4 w-4 text-dark" />
                  </div>
                </div>
                
                <div className="text-center md:text-left">
                  <h3 className="font-bold text-light">{depoimentos[depoimentoAtual].nome}</h3>
                  <p className="text-sm text-dim">{depoimentos[depoimentoAtual].cidade}, {depoimentos[depoimentoAtual].estado}</p>
                  
                  <div className="flex justify-center md:justify-start mt-2">
                    {[...Array(depoimentos[depoimentoAtual].avaliacao)].map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="md:w-3/4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center text-dim text-sm">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span>há {depoimentos[depoimentoAtual].dias} dias</span>
                    </div>
                    
                    <div className="bg-neon-accent text-dark text-sm px-3 py-1 rounded-full font-bold">
                      Sacou {formatarValor(depoimentos[depoimentoAtual].valor)}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-light italic">"{depoimentos[depoimentoAtual].texto}"</p>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between border-t border-dark-border/30 pt-3">
                    <div className="text-sm text-dim flex items-center">
                      <CurrencyDollarIcon className="h-4 w-4 mr-1 text-neon-accent" />
                      Pagamento verificado
                    </div>
                    
                    <div className="flex gap-1">
                      {depoimentos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setDepoimentoAtual(index)}
                          className={`w-2 h-2 rounded-full ${
                            index === depoimentoAtual ? 'bg-neon-primary' : 'bg-dark-border'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Botão de "Ver mais depoimentos" */}
      <div className="text-center mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={verMaisDepoimentos}
          className="bg-dark-surface hover:bg-dark-card text-neon-primary border border-neon-primary/30 font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
        >
          Ver mais depoimentos
        </motion.button>
      </div>
    </div>
  );
}