import { motion } from 'framer-motion';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface Props {
  amount: number;
}

export default function SurveyRewardBadge({ amount }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-full"
    >
      <CurrencyDollarIcon className="w-5 h-5" />
      <span className="font-medium">R$ {amount.toFixed(2)}</span>
    </motion.div>
  );
}