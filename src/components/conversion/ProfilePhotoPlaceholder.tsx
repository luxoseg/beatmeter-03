import { motion } from 'framer-motion';

interface ProfilePhotoPlaceholderProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ProfilePhotoPlaceholder({ name, size = 'md' }: ProfilePhotoPlaceholderProps) {
  // Gera uma cor baseada no nome
  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    
    return color;
  };
  
  // Obtém as iniciais do nome
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
  };
  
  return (
    <motion.div 
      className={`rounded-full flex items-center justify-center font-bold text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: stringToColor(name) }}
      whileHover={{ scale: 1.05 }}
    >
      {getInitials(name)}
    </motion.div>
  );
}