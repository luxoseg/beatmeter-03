import { v4 as uuidv4 } from 'uuid';
import type { ActivityNotification } from '../types/notifications';

// Random Brazilian names
const names = [
  'João Silva', 'Maria Santos', 'Pedro', 'Ana Costa', 'Lucas Pereira', 
  'Julia Rodrigues', 'Gabriel Ferreira', 'Beatriz Almeida', 'Rafael Carvalho', 
  'Larissa', 'Thiago', 'Amanda Lima', 'Bruno Gomes', 'Carolina', 
  'Diego Barbosa', 'Fernanda Cardoso', 'Marcelo Alves', 'Camila Dias', 'Gustavo',
  'Isabela', 'Leonardo Nunes', 'Mariana Rocha', 'Nicolas', 'Patricia Lima',
  'Ricardo Moreira', 'Sofia', 'Tiago Peixoto', 'Valentina', 
  'William', 'Yasmin Oliveira'
];

export function generateRandomNotification(): ActivityNotification {
  const name = names[Math.floor(Math.random() * names.length)];
  const type = Math.random() < 0.4 ? 'withdraw' : Math.random() < 0.7 ? 'survey' : 'active';
  
  return {
    id: uuidv4(),
    type,
    name,
    amount: type === 'withdraw' ? Math.floor(Math.random() * 300) + 200 : undefined,
    surveyCount: type === 'survey' ? Math.floor(Math.random() * 5) + 1 : undefined,
  };
}