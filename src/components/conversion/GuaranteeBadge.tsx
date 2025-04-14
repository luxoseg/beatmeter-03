import { motion } from 'framer-motion';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function GuaranteeBadge() {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="border-2 border-dashed border-yellow-500 rounded-lg p-3 bg-yellow-50 mb-4 text-center"
    >
      <div className="flex justify-center mb-1">
        <div className="bg-yellow-500 text-white p-2 rounded-full">
          <ShieldCheckIcon className="w-5 h-5" />
        </div>
      </div>
      
      <h4 className="font-bold text-yellow-800 text-sm">GARANTIA 100% DE DEVOLUÇÃO</h4>
      
      <p className="text-yellow-700 text-xs mt-1">
        Taxa 100% reembolsável no seu primeiro saque + bônus adicional
      </p>
    </motion.div>
  );
}