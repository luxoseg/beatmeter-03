import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Como funciona o processo de validação do saque?",
    answer: "Para garantir a segurança e legitimidade dos saques, realizamos uma validação única através de uma pequena taxa de confirmação. Esta taxa é 100% reembolsável no seu primeiro saque, junto com seus ganhos! É uma medida de segurança que implementamos após detectar tentativas de fraude na plataforma."
  },
  {
    question: "Outras pessoas estão realmente recebendo?",
    answer: "Sim! Já realizamos mais de 15.000 pagamentos confirmados. Nosso sistema de avaliação é uma parceria oficial com grandes plataformas de streaming que precisam dessas informações para melhorar seus algoritmos. Por isso, podemos oferecer recompensas reais para opiniões sinceras."
  },
  {
    question: "Por que preciso fazer a validação agora?",
    answer: "A validação é necessária para garantir sua vaga no programa. Devido ao alto volume de usuários, precisamos garantir que apenas pessoas reais participem. Além disso, as vagas são limitadas e a demanda é muito alta - por isso recomendamos fazer a validação o quanto antes para não perder sua oportunidade."
  },
  {
    question: "E se eu não gostar do programa?",
    answer: "Oferecemos garantia total de satisfação! Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do valor da taxa de validação. Nosso objetivo é manter uma comunidade de avaliadores satisfeitos e engajados."
  },
  {
    question: "Quanto posso ganhar por mês?",
    answer: "O ganho médio dos nossos avaliadores é de R$ 2.800 a R$ 5.000 por mês. Tudo depende da sua dedicação e do número de avaliações que você realizar. Muitos usuários conseguem uma renda extra significativa dedicando apenas 1-2 horas por dia!"
  },
  {
    question: "Existe risco de perder meu dinheiro?",
    answer: "Absolutamente nenhum! A taxa de validação é 100% reembolsável no seu primeiro saque. Além disso, você recebe um bônus extra como agradecimento pela confiança. Nossa plataforma é segura e transparente, com milhares de usuários satisfeitos."
  }
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto mt-14 sm:mt-2">
      <h1 className="text-2xl font-bold text-center text-neon-primary mb-8">
        Perguntas Frequentes
      </h1>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-surface rounded-lg shadow-neo border border-dark-border/30 overflow-hidden"
          >
            <button
              onClick={() => setOpenItem(openItem === index ? null : index)}
              className="w-full px-6 py-4 text-left font-medium text-light hover:bg-dark-card transition-colors"
            >
              {item.question}
            </button>

            <AnimatePresence>
              {openItem === index && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-dark-card text-dim">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}