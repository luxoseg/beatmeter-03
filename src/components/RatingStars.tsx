import { motion } from 'framer-motion';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

interface Props {
  rating: number;
  onChange: (rating: number) => void;
}

export default function RatingStars({ rating, onChange }: Props) {
  return (
    <div className="flex justify-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(star)}
          className="focus:outline-none"
        >
          {star <= rating ? (
            <StarSolid className="w-8 h-8 text-yellow-400" />
          ) : (
            <StarOutline className="w-8 h-8 text-gray-400" />
          )}
        </motion.button>
      ))}
    </div>
  );
}