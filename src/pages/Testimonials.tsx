import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

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
    nome: "Carlos Oliveira",
    foto: "/images/users/user1.jpg",
    valor: 432.50,
    dias: 2,
    texto: "Nunca acreditei que fosse possível ganhar dinheiro online de forma tão fácil. Completei 10 pesquisas e consegui sacar na hora. O dinheiro caiu na minha conta em menos de 24h!",
    avaliacao: 5,
    cidade: "São Paulo",
    estado: "SP"
  },
  {
    id: 2,
    nome: "Amanda Silva",
    foto: "/images/users/user2.jpg",
    valor: 754.80,
    dias: 5,
    texto: "Eu estava muito desconfiada no início, mas depois que fiz a validação, comecei a ganhar muito mais! Já fiz 3 saques e todos caíram na minha conta Nubank rapidinho.",
    avaliacao: 5,
    cidade: "Rio de Janeiro",
    estado: "RJ"
  },
  {
    id: 3,
    nome: "Roberto Santos",
    foto: "/images/users/user3.jpg",
    valor: 1245.00,
    dias: 7,
    texto: "No começo achei que era golpe, principalmente por causa da taxa de validação. Mas quando vi que era reembolsável e ainda ganhei o bônus de R$50, fiquei impressionado. Sistema 100% confiável!",
    avaliacao: 4,
    cidade: "Belo Horizonte",
    estado: "MG"
  },
  {
    id: 4,
    nome: "Juliana Costa",
    foto: "/images/users/user4.jpg",
    valor: 968.75,
    dias: 3,
    texto: "Sou mãe solo e esse app tem sido uma bênção! Consigo fazer as pesquisas enquanto meu filho dorme e já estou conseguindo uma renda extra de quase R$3.000 por mês!",
    avaliacao: 5,
    cidade: "Salvador",
    estado: "BA"
  },
  {
    id: 5,
    nome: "Pedro Almeida",
    foto: "/images/users/user5.jpg",
    valor: 2150.30,
    dias: 15,
    texto: "Já testei vários apps de pesquisas e esse é de longe o melhor! Os pagamentos são sempre em dia e o suporte responde super rápido. Recomendo demais!",
    avaliacao: 5,
    cidade: "Curitiba",
    estado: "PR"
  },
  {
    id: 6,
    nome: "Fernanda Lima",
    foto: "/images/users/user6.jpg",
    valor: 876.25,
    dias: 1,
    texto: "Comecei ontem e já consegui fazer meu primeiro saque! A validação foi super tranquila e voltou junto com meu pagamento, exatamente como prometido.",
    avaliacao: 5,
    cidade: "Fortaleza",
    estado: "CE"
  },
  {
    id: 7,
    nome: "Marcelo Souza",
    foto: "/images/users/user7.jpg",
    valor: 1150.40,
    dias: 10,
    texto: "No início achei que seria complicado, mas a plataforma é super intuitiva. Consigo fazer avaliações entre uma tarefa e outra e a remuneração é excelente. Tudo muito transparente!",
    avaliacao: 5,
    cidade: "Recife",
    estado: "PE"
  },
  {
    id: 8,
    nome: "Tatiana Mendes",
    foto: "/images/users/user8.jpg",
    valor: 495.75,
    dias: 4,
    texto: "Estou usando para complementar minha renda durante a faculdade. É perfeito porque faço no meu próprio tempo e já consegui pagar todas as minhas contas deste mês!",
    avaliacao: 4,
    cidade: "Brasília",
    estado: "DF"
  },
  {
    id: 9,
    nome: "Ricardo Gomes",
    foto: "/images/users/user9.jpg",
    valor: 1879.20,
    dias: 8,
    texto: "Como produtor musical, adoro poder dar minha opinião sobre música e ainda ser remunerado por isso. A validação da conta realmente foi essencial para acessar as melhores oportunidades.",
    avaliacao: 5,
    cidade: "Porto Alegre",
    estado: "RS"
  },
  {
    id: 10,
    nome: "Marina Cardoso",
    foto: "/images/users/user10.jpg",
    valor: 2580.90,
    dias: 12,
    texto: "Estou há um mês na plataforma e já consegui juntar dinheiro para comprar um novo celular! Os pagamentos são sempre pontuais e o suporte responde qualquer dúvida rapidamente.",
    avaliacao: 5,
    cidade: "Florianópolis",
    estado: "SC"
  }
];

export default function Testimonials() {
  const [depoimentoAtual, setDepoimentoAtual] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [destacado, setDestacado] = useState<number | null>(null);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
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

  // Obtém os depoimentos a serem exibidos na lista
  const getDepoimentosExibidos = () => {
    const depoimentosFiltrados = depoimentos.filter((_, index) => index !== depoimentoAtual);
    return mostrarTodos ? depoimentosFiltrados : depoimentosFiltrados.slice(0, 3);
  };

  // Alterna entre mostrar mais/menos depoimentos
  const toggleMostrarTodos = () => {
    setMostrarTodos(!mostrarTodos);
    // Scroll para o botão quando expandir a lista
    if (!mostrarTodos) {
      setTimeout(() => {
        document.getElementById('ver-mais-btn')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-14 sm:mt-2">
      <h1 className="text-2xl font-bold text-center text-light mb-8 font-heading">
        Depoimentos Verificados
      </h1>

      <div className="bg-dark-surface rounded-2xl shadow-neo border border-dark-border/30 p-6 mb-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon key={star} className="h-5 w-5 text-yellow-400" />
            ))}
          </div>
          <p className="text-dim max-w-md mx-auto">
            Veja o que as pessoas estão falando sobre nossa plataforma de avaliação musical
          </p>
        </div>
        
        {/* Estatísticas de destaque */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center bg-dark-card rounded-lg p-3">
            <div className="font-bold text-2xl text-neon-primary">98%</div>
            <div className="text-dim text-sm">Satisfação</div>
          </div>
          <div className="text-center bg-dark-card rounded-lg p-3">
            <div className="font-bold text-2xl text-neon-secondary">24h</div>
            <div className="text-dim text-sm">Pagamento</div>
          </div>
          <div className="text-center bg-dark-card rounded-lg p-3">
            <div className="font-bold text-2xl text-neon-accent">15mil+</div>
            <div className="text-dim text-sm">Usuários</div>
          </div>
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
        
        {/* Lista de depoimentos simplificados */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {getDepoimentosExibidos().map((depoimento) => (
            <motion.div
              key={depoimento.id}
              whileHover={{ scale: 1.03 }}
              className={`bg-dark-card p-4 rounded-lg cursor-pointer border ${
                destacado === depoimento.id ? 'border-neon-primary' : 'border-dark-border/20'
              }`}
              onMouseEnter={() => setDestacado(depoimento.id)}
              onMouseLeave={() => setDestacado(null)}
              onClick={() => setDepoimentoAtual(depoimentos.findIndex(d => d.id === depoimento.id))}
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-neon-primary/50">
                  <img
                    src={depoimento.foto}
                    alt={depoimento.nome}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/placeholder-profile.jpg";
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-light">{depoimento.nome}</h4>
                  <p className="text-xs text-neon-accent">{formatarValor(depoimento.valor)}</p>
                </div>
              </div>
              <p className="text-xs text-dim line-clamp-2">"{depoimento.texto}"</p>
            </motion.div>
          ))}
        </div>
        
        {/* Botão de "Ver mais depoimentos" */}
        <div className="text-center mt-6">
          <button 
            id="ver-mais-btn"
            onClick={toggleMostrarTodos}
            className="bg-dark-surface hover:bg-dark-card text-neon-primary border border-neon-primary/30 font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
          >
            {mostrarTodos ? "Ver menos depoimentos" : "Ver mais depoimentos"}
          </button>
        </div>
      </div>
    </div>
  );
}