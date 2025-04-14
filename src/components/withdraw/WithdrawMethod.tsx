import { motion } from 'framer-motion';
import { 
  QrCodeIcon, 
  IdentificationIcon, 
  EnvelopeIcon, 
  PhoneIcon 
} from '@heroicons/react/24/outline';

const icons = {
  cpf: IdentificationIcon,
  phone: PhoneIcon,
  email: EnvelopeIcon,
  random: QrCodeIcon,
} as const;

type PixKeyType = keyof typeof icons;

interface Props {
  type: PixKeyType;
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export default function WithdrawMethod({ type, label, selected, onSelect }: Props) {
  const Icon = icons[type];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors ${
        selected 
          ? 'border-green-500 bg-green-50' 
          : 'border-gray-200 hover:border-green-200'
      }`}
    >
      <Icon className={`w-8 h-8 ${selected ? 'text-green-500' : 'text-gray-500'}`} />
      <span className={`mt-2 text-sm font-medium ${selected ? 'text-green-500' : 'text-gray-600'}`}>
        {label}
      </span>
    </motion.button>
  );
}