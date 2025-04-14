import { Dialog, Transition } from '@headlessui/react';
import { addUTMParams } from '../../App'; 
import { Fragment, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBalance } from '../../contexts/BalanceContext';
import { ShieldCheckIcon, SparklesIcon, StarIcon, CheckCircleIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { ArrowUpIcon } from '@heroicons/react/24/solid';

// Interface para os depoimentos
interface Testimonial {
  id: number;
  name: string;
  location: string;
  amount: number;
  days: number;
  comment: string;
  image: string;
}

// Lista expandida de depoimentos
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Paulo Costa",
    location: "São Paulo, SP",
    amount: 436.50,
    days: 2,
    comment: "Achei que era mentira, mas recebi meu primeiro saque em menos de 24h. Já estou recomendando para todo mundo!",
    image: "/images/testimonials/modal/user1.jpg"
  },
  {
    id: 2,
    name: "Ana Rodrigues",
    location: "Rio de Janeiro, RJ",
    amount: 587.25,
    days: 5,
    comment: "Faço pesquisas no meu tempo livre e consigo tirar uma renda extra que me ajuda muito no fim do mês!",
    image: "/images/testimonials/modal/user2.jpg"
  },
  {
    id: 3,
    name: "Felipe Santos",
    location: "Belo Horizonte, MG",
    amount: 912.00,
    days: 7,
    comment: "Fiquei com receio da taxa, mas o reembolso veio junto com meu primeiro saque como prometido. Vale muito a pena!",
    image: "/images/testimonials/modal/user3.jpg"
  },
  {
    id: 4,
    name: "Juliana Mendes",
    location: "Salvador, BA",
    amount: 752.80,
    days: 3,
    comment: "Já testei vários sites de pesquisas e esse é de longe o melhor e mais seguro. Pagamento sempre em dia!",
    image: "/images/users/user4.jpg"
  },
  {
    id: 5,
    name: "Fernando Costa",
    location: "Curitiba, PR",
    amount: 1244.50,
    days: 15,
    comment: "Já testei vários apps de pesquisas e esse é de longe o melhor! Os pagamentos são sempre em dia e o suporte responde super rápido.",
    image: "/images/users/user5.jpg"
  },
  {
    id: 6,
    name: "Fernanda Lima",
    location: "Fortaleza, CE",
    amount: 876.25,
    days: 1,
    comment: "Comecei ontem e já consegui fazer meu primeiro saque! A validação foi super tranquila e o valor voltou junto com meu pagamento.",
    image: "/images/users/user6.jpg"
  },
  {
    id: 7,
    name: "Marcelo Souza",
    location: "Recife, PE",
    amount: 1150.40,
    days: 10,
    comment: "Consigo fazer avaliações entre uma tarefa e outra. A remuneração é excelente e tudo muito transparente!",
    image: "/images/users/user7.jpg"
  },
  {
    id: 8,
    name: "Tatiana Mendes",
    location: "Brasília, DF",
    amount: 495.75,
    days: 4,
    comment: "Estou usando para complementar minha renda durante a faculdade. É perfeito porque faço no meu próprio tempo!",
    image: "/images/users/user8.jpg"
  }
];

// Depoimentos em destaque (mostrados no painel principal)
const featuredTestimonials = [3, 5, 7]; // IDs dos depoimentos em destaque

export interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const { balance } = useBalance();
  const [showButton, setShowButton] = useState(false);
  const [utmifyReady, setUtmifyReady] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Armazenar os parâmetros UTM no localStorage
      const utmParams = new URLSearchParams(window.location.search);
      if (utmParams.toString()) {
        localStorage.setItem('utmParams', utmParams.toString());
      }

      const checkUtmify = setInterval(() => {
        if (window.utmifyConfig && typeof window.utmify !== 'undefined') {
          setUtmifyReady(true);
          clearInterval(checkUtmify);
        }
      }, 100);

      return () => {
        clearInterval(checkUtmify);
        setUtmifyReady(false);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setShowButton(false);

      const timer = setTimeout(() => {
        setShowButton(true);
      }, 35000); // 35 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  // Efeito para alternar automaticamente os depoimentos em destaque
  useEffect(() => {
    if (showButton) {
      const interval = setInterval(() => {
        setActiveTestimonial(prev => (prev + 1) % featuredTestimonials.length);
      }, 6000);
      
      return () => clearInterval(interval);
    }
  }, [showButton]);

  const checkoutUrl = addUTMParams('https://pay.pagamentospagsegurosaqui.shop/checkout/816bd459-a113-4982-bdc4-6d3e0fedc13b');

  // Obtém o depoimento em destaque atual
  const currentFeaturedTestimonial = testimonials.find(t => t.id === featuredTestimonials[activeTestimonial]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-dark-card border border-dark-border/30 text-left align-middle shadow-neo transition-all">
                <div className="bg-neon-accent text-dark text-center py-3 rounded-t-3xl">
                  <h2 className="text-xl font-bold font-display">ASSISTA O VÍDEO ABAIXO</h2>
                  <p className="text-sm">PARA LIBERAR SEU SAQUE E ACESSO VITALÍCIO</p>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <img src="/images/logo.png" alt="Beat Meter" className="h-8" />
                    <div className="bg-dark-surface rounded-lg px-4 py-2 border border-dark-border/50">
                      <span className="text-sm text-dim">SALDO</span>
                      <div className="font-bold text-xl text-neon-primary">R$ {balance.toFixed(2)}</div>
                    </div>
                  </div>

                  <Dialog.Title as="h3" className="text-xl font-bold text-center text-neon-primary mb-4 font-display">
                    DESBLOQUEIO DE SALDO
                  </Dialog.Title>

                  <p className="text-center text-light mb-6">
                    Veja como liberar seu saque assistindo ao vídeo.
                  </p>

                  <div className="mb-6">
                    <div id="ifr_6779d1568048d9bfdb4c5e4e_wrapper" style={{ margin: '0 auto', width: '100%' }}>
                      <div style={{ padding: '56.25% 0 0 0', position: 'relative' }} id="ifr_6779d1568048d9bfdb4c5e4e_aspect">
                        <iframe 
                          frameBorder="0"
                          allowFullScreen
                          src="https://scripts.converteai.net/088318a8-a7b2-4f8f-9fb0-4a6f8460194d/players/6779d1568048d9bfdb4c5e4e/embed.html"
                          id="ifr_6779d1568048d9bfdb4c5e4e"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '0.5rem'
                          }}
                          referrerPolicy="origin"
                        />
                      </div>
                    </div>
                  </div>

                  <Transition
                    show={showButton}
                    enter="transition-opacity duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                  >
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        className="w-full bg-neon-accent text-dark font-bold py-4 rounded-xl hover:bg-neon-accent/90 transition-colors mb-6 shadow-glow-accent-sm"
                        onClick={() => {
                          if (!utmifyReady) {
                            console.warn('Utmify ainda não foi carregado completamente');
                          }
                          
                          // Garante que as UTMs sejam processadas antes do redirecionamento
                          const utmParams = new URLSearchParams(localStorage.getItem('utmParams') || '');
                          const urlWithUTM = `${checkoutUrl}?${utmParams.toString()}`;

                          window.location.href = urlWithUTM;
                        }}
                      >
                        DESBLOQUEAR AGORA
                      </motion.button>

                      {/* Seção simplificada de benefícios após verificação */}
                      <div className="mb-6">
                        <h4 className="text-center text-neon-primary font-bold text-lg mb-4">
                          O QUE VOCÊ VAI TER APÓS A VERIFICAÇÃO
                        </h4>
                        
                        <div className="grid grid-cols-1 gap-4">
                          {/* Benefício 1: Garantia */}
                          <div className="bg-dark-surface border border-neon-accent/30 rounded-xl p-4 flex items-start gap-3">
                            <div className="bg-neon-accent text-dark p-2 rounded-full mt-0.5 shrink-0">
                              <ShieldCheckIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="font-bold text-neon-accent text-sm mb-1">GARANTIA DE DEVOLUÇÃO 100%</h5>
                              <p className="text-light text-sm">
                                Taxa de R$21,24 totalmente reembolsável no seu primeiro saque + bônus de R$50,00
                              </p>
                            </div>
                          </div>
                          
                          {/* Benefício 2: Pesquisas Premium */}
                          <div className="bg-dark-surface border border-neon-secondary/30 rounded-xl p-4 flex items-start gap-3">
                            <div className="bg-neon-secondary text-dark p-2 rounded-full mt-0.5 shrink-0">
                              <SparklesIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="font-bold text-neon-secondary text-sm mb-1">ACESSO A PESQUISAS PREMIUM</h5>
                              <p className="text-light text-sm">
                                Desbloqueie pesquisas exclusivas com recompensas até 3x maiores (R$75-150 por pesquisa)
                              </p>
                            </div>
                          </div>
                          
                          {/* Benefício 3: Nível VIP */}
                          <div className="bg-dark-surface border border-yellow-500/30 rounded-xl p-4 flex items-start gap-3">
                            <div className="bg-yellow-500 text-dark p-2 rounded-full mt-0.5 shrink-0">
                              <StarIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="font-bold text-yellow-400 text-sm mb-1">NÍVEL VIP DESBLOQUEADO</h5>
                              <p className="text-light text-sm">
                                Ganhos até R$150 por pesquisa, pesquisas ilimitadas e saques instantâneos
                              </p>
                            </div>
                          </div>
                          
                          {/* Benefício 4: Crescimento de Ganhos */}
                          <div className="bg-dark-surface border border-neon-primary/30 rounded-xl p-4 flex items-start gap-3">
                            <div className="bg-neon-primary text-dark p-2 rounded-full mt-0.5 shrink-0">
                              <ArrowUpIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="font-bold text-neon-primary text-sm mb-1">POTENCIAL DE GANHOS AMPLIADO</h5>
                              <p className="text-light text-sm">
                                Aumente seus ganhos em +200% (de R$3.000 para R$9.000 por mês)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Alertas e Social Proof */}
                      <div className="mb-6 space-y-4">
                        <div className="text-center">
                          <div className="inline-block bg-dark-surface text-yellow-400 py-1 px-3 rounded-full text-xs font-mono animate-pulse border border-yellow-500/30">
                            Apenas 17 vagas restantes hoje
                          </div>
                        </div>
                      </div>

                      {/* Seção expandida de depoimentos */}
                      <div className="mb-6">
                        <h4 className="font-medium text-light mb-3 flex items-center justify-center gap-2">
                          <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-neon-secondary" />
                          <span>Depoimentos de Usuários Verificados</span>
                        </h4>
                        
                        {/* Depoimento em destaque com transição automática */}
                        <div className="bg-dark-surface rounded-xl p-4 border border-dark-border/30 mb-4 relative overflow-hidden">
                          <div className="absolute top-2 right-2 bg-neon-accent/10 border border-neon-accent/30 rounded-full px-2 py-0.5 text-xs text-neon-accent font-mono flex items-center gap-1">
                            <CheckCircleIcon className="w-3 h-3" />
                            verificado
                          </div>
                          
                          <AnimatePresence mode="wait">
                            {currentFeaturedTestimonial && (
                              <motion.div
                                key={currentFeaturedTestimonial.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="pt-4"
                              >
                                <div className="flex items-start gap-3 mb-3">
                                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-neon-accent flex-shrink-0">
                                    <img 
                                      src={currentFeaturedTestimonial.image} 
                                      alt={currentFeaturedTestimonial.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/images/placeholder-profile.jpg";
                                      }}
                                    />
                                  </div>
                                  
                                  <div>
                                    <div className="font-semibold text-neon-primary mb-1">
                                      {currentFeaturedTestimonial.name}
                                    </div>
                                    
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="text-xs text-dim">
                                        {currentFeaturedTestimonial.location}
                                      </div>
                                      <div className="w-1 h-1 bg-dim rounded-full"></div>
                                      <div className="text-xs text-dim">
                                        há {currentFeaturedTestimonial.days} {currentFeaturedTestimonial.days === 1 ? 'dia' : 'dias'}
                                      </div>
                                    </div>
                                    
                                    <div className="bg-neon-accent text-dark text-xs px-2 py-1 rounded-md font-medium inline-block mb-2">
                                      Sacou R$ {currentFeaturedTestimonial.amount.toFixed(2)}
                                    </div>
                                    
                                    <div className="text-sm text-light italic">
                                      "{currentFeaturedTestimonial.comment}"
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          <div className="flex justify-center mt-1 gap-1">
                            {featuredTestimonials.map((id, index) => (
                              <button
                                key={id}
                                onClick={() => setActiveTestimonial(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                  activeTestimonial === index ? 'bg-neon-accent' : 'bg-dark-border'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        
                        {/* Grade de depoimentos menores */}
                        <div className="grid grid-cols-2 gap-3">
                          {testimonials
                            .filter(t => !featuredTestimonials.includes(t.id))
                            .slice(0, showAllTestimonials ? undefined : 4)
                            .map(testimonial => (
                              <motion.div
                                key={testimonial.id}
                                whileHover={{ y: -2 }}
                                className="bg-dark-surface rounded-lg p-3 border border-dark-border/20"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-neon-accent/50">
                                    <img 
                                      src={testimonial.image} 
                                      alt={testimonial.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/images/placeholder-profile.jpg";
                                      }}
                                    />
                                  </div>
                                  
                                  <div className="min-w-0">
                                    <div className="font-medium text-xs text-light truncate">
                                      {testimonial.name}
                                    </div>
                                    <div className="text-[10px] text-dim truncate">
                                      Sacou R$ {testimonial.amount.toFixed(2)}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="text-xs text-light line-clamp-2 italic">
                                  "{testimonial.comment}"
                                </div>
                              </motion.div>
                            ))
                          }
                        </div>
                        
                        {/* Botão para mostrar mais/menos depoimentos */}
                        {testimonials.filter(t => !featuredTestimonials.includes(t.id)).length > 4 && (
                          <button
                            onClick={() => setShowAllTestimonials(!showAllTestimonials)}
                            className="w-full text-center text-neon-secondary text-sm mt-3 font-medium"
                          >
                            {showAllTestimonials ? 'Ver menos depoimentos' : 'Ver mais depoimentos'}
                          </button>
                        )}
                        
                        {/* Estatísticas de satisfação */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="mt-4 bg-dark-surface rounded-lg p-3 border border-dark-border/30"
                        >
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <div className="text-neon-accent font-bold text-xl">98%</div>
                              <div className="text-xs text-dim">satisfação</div>
                            </div>
                            <div>
                              <div className="text-neon-primary font-bold text-xl">15mil+</div>
                              <div className="text-xs text-dim">usuários</div>
                            </div>
                            <div>
                              <div className="text-neon-secondary font-bold text-xl">24h</div>
                              <div className="text-xs text-dim">pagamento</div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </>
                  </Transition>

                  {!showButton && (
                    <div className="text-center text-dim font-medium">
                      Aguarde o vídeo para liberar o botão de desbloqueio...
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default WithdrawModal;