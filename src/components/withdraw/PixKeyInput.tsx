import { useState, useEffect } from 'react';
import { validatePixKey } from '../../utils/validation';

interface Props {
  type: 'cpf' | 'phone' | 'email' | 'random';
  value: string;
  onChange: (value: string) => void;
  onValidityChange: (isValid: boolean) => void;
}

export default function PixKeyInput({ type, value, onChange, onValidityChange }: Props) {
  const [error, setError] = useState('');

  const formatValue = (input: string): string => {
    if (type === 'cpf') {
      // Remove non-digits
      return input.replace(/\D/g, '').slice(0, 11);
    }
    if (type === 'phone') {
      // Remove non-digits
      return input.replace(/\D/g, '').slice(0, 11);
    }
    return input;
  };

  const getPlaceholder = (): string => {
    switch (type) {
      case 'cpf':
        return '00000000000';
      case 'phone':
        return '11999999999';
      case 'email':
        return 'seu@email.com';
      case 'random':
        return 'Chave aleatória';
    }
  };

  const validate = (input: string) => {
    if (!input) {
      setError('Este campo é obrigatório');
      onValidityChange(false);
      return;
    }

    if (!validatePixKey(input, type)) {
      switch (type) {
        case 'cpf':
          setError('CPF deve conter 11 dígitos numéricos');
          break;
        case 'phone':
          setError('Telefone deve conter 11 dígitos numéricos');
          break;
        case 'email':
          setError('Email inválido');
          break;
        case 'random':
          setError('Chave inválida');
          break;
      }
      onValidityChange(false);
    } else {
      setError('');
      onValidityChange(true);
    }
  };

  useEffect(() => {
    validate(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatValue(e.target.value);
    onChange(formatted);
  };

  return (
    <div>
      <input
        type={type === 'email' ? 'email' : 'text'}
        value={value}
        onChange={handleChange}
        placeholder={getPlaceholder()}
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
        } focus:border-transparent outline-none transition-all`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}