import { motion } from 'framer-motion';
import SurveyRewardBadge from './SurveyRewardBadge';

interface Props {
  name: string;
  image: string;
  reward: number;
  onStart: () => void;
}

export default function ArtistCard({ name, image, reward, onStart }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="relative aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h3 className="text-white text-xl font-bold mb-2">{name}</h3>
          <SurveyRewardBadge amount={reward} />
        </div>
      </div>

      <div className="p-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          Participar da Pesquisa
        </motion.button>
      </div>
    </motion.div>
  );
}