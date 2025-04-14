import { motion } from 'framer-motion';

interface Props {
  title: string;
  value: string | number;
  icon?: React.ComponentType<any>;
  color?: string;
}

const colorMap = {
  primary: 'bg-primary-100 text-primary-500',
  secondary: 'bg-secondary-100 text-secondary-500',
  accent: 'bg-accent-100 text-accent-500',
  dark: 'bg-dark-100 text-dark-500'
};

export default function StatsCard({ title, value, icon: Icon, color = 'primary' }: Props) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-2xl shadow-card p-4 hover:shadow-xl transition-all duration-300 border border-dark-100/30"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${colorMap[color as keyof typeof colorMap]}`}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-dark-500 font-medium truncate">{title}</p>
          <p className="text-xl font-bold text-dark-900 font-heading">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}