import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircleIcon, ChatBubbleBottomCenterTextIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface Testimonial {
  id: number;
  name: string;
  date: string;
  amount: number;
  comment: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Silva",
    date: "há 2 dias",
    amount: 436.50,
    comment: "Achei que era mentira, mas recebi meu primeiro saque em menos de 24h. Já estou recomendando para todo mundo!",
    image: "/images/users/user1.jpg"
  },
  {
    id: 2,
    name: "Ana Santos",
    date: "há 5 dias",
    amount: 587.25,
    comment: "Faço pesquisas no meu tempo livre e consigo tirar uma renda extra que me ajuda muito no fim do mês!",
    image: "/images/users/user2.jpg"
  },
  {
    id: 3,
    name: "Rodrigo Oliveira",
    date: "há 1 semana",
    amount: 912.00,
    comment: "Fiquei com receio da taxa, mas o reembolso veio junto com meu primeiro saque como prometido. Vale muito a pena!",
    image: "/images/users/user3.jpg"
  },
  {
    id: 4,
    name: "Juliana Mendes",
    date: "há 2 semanas",
    amount: 752.80,
    comment: "Já testei vários sites de pesquisas e esse é de longe o melhor e mais seguro. Pagamento sempre em dia!",
    image: "/images/users/user4.jpg"
  },
  {
    id: 5,
    name: "Fernando Costa",
    date: "há 3 semanas",
    amount: 1244.50,
    comment: "Consegui pagar minhas contas graças ao BeatMeter. A validação foi o melhor investimento que fiz!",
    image: "/images/users/user5.jpg"
  }
];

export default function TestimonialCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      setImageLoaded(false);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="border-t border-dark-border/30 pt-4 mt-4">
      <h4 className="font-medium text-light mb-3 flex items-center gap-2">
        <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-neon-secondary" />
        Depoimentos de Usuários Verificados
      </h4>
      
      <div className="bg-dark-surface rounded-xl p-3 relative overflow-hidden border border-dark-border/30">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-neon-accent">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-dark-card animate-pulse flex items-center justify-center">
                    <UserCircleIcon className="w-10 h-10 text-dim" />
                  </div>
                )}
                <img 
                  src={testimonials[currentTestimonial].image} 
                  alt={testimonials[currentTestimonial].name}
                  className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/placeholder-profile.jpg";
                  }}
                />
                <div className="absolute -bottom-1 -right-1 bg-dark-card rounded-full p-0.5 border border-neon-accent">
                  <CheckCircleIcon className="w-3 h-3 text-neon-accent" />
                </div>
              </div>
              
              <div>
                <div className="font-medium text-sm text-light">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-xs text-dim">
                  {testimonials[currentTestimonial].date}
                </div>
              </div>
              
              <div className="ml-auto">
                <div className="bg-neon-accent text-dark text-xs px-2 py-1 rounded-md font-medium">
                  Sacou R$ {testimonials[currentTestimonial].amount.toFixed(2)}
                </div>
              </div>
            </div>
            
            <div className="text-sm text-light italic pl-14">
              "{testimonials[currentTestimonial].comment}"
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-center mt-3 gap-1">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentTestimonial(index);
                setImageLoaded(false);
              }}
              className={`w-2 h-2 rounded-full ${
                currentTestimonial === index ? 'bg-neon-accent' : 'bg-dark-border'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}