/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace']
      },
      colors: {
        'neon-primary': '#00f0ff',
        'neon-secondary': '#ff2e63',
        'neon-accent': '#01c38d',
        'dark': '#0c0c14',
        'dark-surface': '#1e1e2c',
        'dark-card': '#16161e',
        'dark-border': '#313147', 
        'light': '#eaeaff',
        'dim': '#8787a3',
        
        // Legacy colors for compatibility
        primary: {
          50: '#e6fffd',
          100: '#b3fffa',
          200: '#80fff8',
          300: '#4dfff5',
          400: '#1affef',
          500: '#00f0ff',
          600: '#00c0cc',
          700: '#009099',
          800: '#006066',
          900: '#003033',
        },
        secondary: {
          50: '#ffe6ed',
          100: '#ffb3c7',
          200: '#ff80a1',
          300: '#ff4d7b',
          400: '#ff1a55',
          500: '#ff2e63',
          600: '#cc0025',
          700: '#99001c',
          800: '#660013',
          900: '#330009',
        },
        accent: {
          50: '#e6fff6',
          100: '#b3ffe8',
          200: '#80ffda',
          300: '#4dffcc',
          400: '#1affbe',
          500: '#01c38d',
          600: '#009c71',
          700: '#007554',
          800: '#004e38',
          900: '#00271c',
        },
        dark: {
          50: '#e6e6e9',
          100: '#b3b3be',
          200: '#8080a3',
          300: '#4d4d7f',
          400: '#1a1a5a',
          500: '#0c0c14',
          600: '#09090f',
          700: '#07070c',
          800: '#040408',
          900: '#020204',
        },
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'inherit': 'inherit',
      },
      boxShadow: {
        'neo': '0 4px 20px 0px rgba(0, 0, 0, 0.5)',
        'neo-sm': '0 2px 10px 0px rgba(0, 0, 0, 0.4)',
        'neo-lg': '0 10px 30px 0px rgba(0, 0, 0, 0.7)',
        'neo-inner': 'inset 0 2px 6px 0px rgba(0, 0, 0, 0.5)',
        
        'glow-primary-sm': '0 0 5px rgba(0, 240, 255, 0.3)',
        'glow-primary': '0 0 10px rgba(0, 240, 255, 0.5)',
        'glow-primary-lg': '0 0 20px rgba(0, 240, 255, 0.7)',
        
        'glow-secondary-sm': '0 0 5px rgba(255, 46, 99, 0.3)',
        'glow-secondary': '0 0 10px rgba(255, 46, 99, 0.5)',
        'glow-secondary-lg': '0 0 20px rgba(255, 46, 99, 0.7)',
        
        'glow-accent-sm': '0 0 5px rgba(1, 195, 141, 0.3)',
        'glow-accent': '0 0 10px rgba(1, 195, 141, 0.5)',
        'glow-accent-lg': '0 0 20px rgba(1, 195, 141, 0.7)',
        
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
        'primary': '0 5px 15px rgba(0, 240, 255, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'glitch': 'glitch 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(-5px, 5px)' },
          '20%': { transform: 'translate(-5px, -5px)' },
          '30%': { transform: 'translate(5px, 5px)' },
          '40%': { transform: 'translate(5px, -5px)' },
          '50%': { transform: 'translate(-5px, 5px)' },
          '60%': { transform: 'translate(-5px, -5px)' },
          '70%': { transform: 'translate(5px, 5px)' },
          '80%': { transform: 'translate(5px, -5px)' },
          '90%': { transform: 'translate(-5px, 5px)' },
        },
        backgroundGlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}