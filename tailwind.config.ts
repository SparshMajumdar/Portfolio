import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6ffed',
          100: '#b3ffd9',
          200: '#80ffc5',
          300: '#4dffb1',
          400: '#1aff9d',
          500: '#00ff8c',
          600: '#00cc70',
          700: '#009954',
          800: '#006638',
          900: '#00331c',
          950: '#001a0e',
        },
        accent: {
          50: '#e0faf3',
          100: '#c1f5e8',
          200: '#83ecd1',
          300: '#44e2b9',
          400: '#06D6A0',
          500: '#05ab80',
          600: '#048060',
          700: '#035640',
          800: '#022b20',
          900: '#011510',
        },
        secondary: {
          50: '#e6ffe6',
          100: '#ccffcc',
          200: '#99ff99',
          300: '#66ff66',
          400: '#33ff33',
          500: '#00ff00',
          600: '#00cc00',
          700: '#009900',
          800: '#006600',
          900: '#003300',
        },
        // Dark mode green shades
        'dark-green': {
          50: '#e6fff0',
          100: '#ccffe0',
          200: '#99ffc2',
          300: '#66ffa3',
          400: '#33ff85',
          500: '#00ff66',
          600: '#00cc52',
          700: '#00993d',
          800: '#006629',
          900: '#003314',
          950: '#001a0a',
        }
      },
      fontFamily: {
        sans: ['Share Tech Mono', 'monospace'],
        mono: ['Share Tech Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 255, 140, 0.1)',
        'card': '0 10px 30px rgba(0, 255, 140, 0.15)',
        'neon': '0 0 10px rgba(0, 255, 140, 0.5), 0 0 20px rgba(0, 255, 140, 0.3), 0 0 30px rgba(0, 255, 140, 0.1)',
        'green-glow': '0 0 15px rgba(26, 255, 157, 0.6), 0 0 30px rgba(26, 255, 157, 0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'matrix': 'matrix 20s linear infinite',
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        matrix: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        'pulse-green': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(0, 255, 140, 0.5)',
            textShadow: '0 0 5px rgba(0, 255, 140, 0.5)'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(0, 255, 140, 0.8)',
            textShadow: '0 0 15px rgba(0, 255, 140, 0.8)'
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;