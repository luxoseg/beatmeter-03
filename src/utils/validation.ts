export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePixKey = (key: string, type: string): boolean => {
  switch (type) {
    case 'cpf':
      return /^\d{11}$/.test(key);
    case 'phone':
      return /^\d{11}$/.test(key);
    case 'email':
      return validateEmail(key);
    case 'qr':
      return key.length > 0;
    case 'random':
      return key.trim() !== ''; // Verifica se a chave não está vazia
    default:
      return false;
  }
}; // Adicionando nova linha no final do arquivo