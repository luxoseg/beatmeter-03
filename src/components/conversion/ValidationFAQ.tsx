import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Quanto tempo demora para receber meu saque?",
    answer: "Assim que você fizer a validação, o saque será processado em até 24 horas diretamente para sua chave PIX. Você receberá o comprovante por e-mail."
  },
  {
    question: "A taxa de validação é reembolsável?",
    answer: "Sim! A taxa de validação é 100% reembolsável no seu primeiro saque. Além disso, você recebe um bônus extra de R$ 50,00 como agradecimento pela confiança em nosso sistema."
  },
  {
    question: "O que acontece depois que eu fizer a validação?",
    answer: "Após a validação, seu saldo atual será liberado para saque, você ganhará acesso a pesquisas premium com maior valor (até R$150 por pesquisa) e seu nível de usuário será elevado automaticamente para VIP."
  },
  {
    question: "Como funciona a garantia de satisfação?",
    answer: "Oferecemos garantia total de satisfação! Se você não ficar satisfeito com as oportunidades de pesquisa oferecidas após a validação, devolvemos 100% do valor da taxa. Nosso objetivo é manter uma comunidade de avaliadores satisfeitos."
  }
];

export default function ValidationFAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <div className="border-t border-dark-border/30 pt-4 mt-4">
      <h4 className="font-medium text-light mb-3 flex items-center gap-2">
        <QuestionMarkCircleIcon className="w-5 h-5 text-neon-secondary" />
        Perguntas Frequentes sobre Validação
      </h4>
      
      <div className="space-y-2">
        {faqItems.map((item, index) => (
          <div key={index} className="border border-dark-border/30 rounded-xl overflow-hidden bg-dark-surface">
            <button
              onClick={() => setOpenItem(openItem === index ? null : index)}
              className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-dark-border/10 transition-colors"
            >
              <span className="font-medium text-sm text-light">{item.question}</span>
              {openItem === index ? (
                <ChevronUpIcon className="w-5 h-5 text-dim" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-dim" />
              )}
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
                  <div className="p-4 text-sm text-dim border-t border-dark-border/30">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}