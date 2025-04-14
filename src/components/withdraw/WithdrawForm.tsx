import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBalance } from '../../contexts/BalanceContext';
import toast from 'react-hot-toast';
import PixKeyInput from './PixKeyInput';

interface Props {
  method: 'cpf' | 'phone' | 'email' | 'random';
  onSubmit: () => void;
}

export default function WithdrawForm({ method, onSubmit }: Props) {
  const { balance } = useBalance();
  const [key, setKey] = useState('');
  const [amount, setAmount] = useState('');
  const [isKeyValid, setIsKeyValid] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!key || !amount) {
      toast.error('Preencha todos os campos');
      return;
    }

    if (!isKeyValid) {
      toast.error('Chave PIX inválida');
      return;
    }

    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast.error('Valor inválido');
      return;
    }

    if (withdrawAmount > balance) {
      toast.error('Saldo insuficiente');
      return;
    }

    onSubmit();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Chave PIX
        </label>
        <PixKeyInput
          type={method}
          value={key}
          onChange={setKey}
          onValidityChange={setIsKeyValid}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Valor do saque
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Digite o valor"
          step="0.01"
          min="0"
          max={balance}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors"
      >
        Realizar Saque
      </motion.button>
    </motion.form>
  );
}