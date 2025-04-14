import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BanknotesIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

export default function CompletionModal({ isOpen, onClose, balance }: Props) {
  const navigate = useNavigate();

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
          <div className="fixed inset-0 bg-black bg-opacity-75" />
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
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-3xl bg-dark-card text-center align-middle shadow-neo transition-all border border-dark-border/30 p-6">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: 1 }}
                  className="text-center"
                >
                  <div className="flex justify-center items-center mb-4">
                    <span className="text-3xl">🎉</span>
                  </div>
                  
                  <Dialog.Title as="h3" className="text-2xl font-bold text-neon-accent font-heading mb-2">
                    Parabéns! Você completou 8 pesquisas!
                  </Dialog.Title>
                  
                  <p className="text-light mb-6">
                    Você já pode sacar seus R$ {balance.toFixed(2)}! Você pode fazer o saque agora ou continuar respondendo para aumentar seus ganhos.
                  </p>
                </motion.div>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onClose();
                      navigate('/withdraw');
                    }}
                    className="w-full bg-neon-accent text-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-glow-accent-sm"
                  >
                    <BanknotesIcon className="w-5 h-5" />
                    Fazer Saque Agora
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onClose();
                      navigate('/home');
                    }}
                    className="w-full bg-dark-surface text-light font-medium py-4 rounded-xl hover:bg-dark-border/10 transition-colors flex items-center justify-center gap-2 border border-dark-border"
                  >
                    <DocumentTextIcon className="w-5 h-5" />
                    Continuar Respondendo
                  </motion.button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}