import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          deep: '#071a0d',
          mid: '#0f2d17',
          DEFAULT: '#1a4d2e',
        },
        grass: {
          dark: '#2d6a3f',
          DEFAULT: '#3a7d44',
          light: '#5ab54c',
        },
        sage: '#8fcf80',
        cream: '#fef6e4',
        parchment: '#f5ead4',
        gold: {
          dark: '#c48a00',
          DEFAULT: '#f4a800',
          light: '#ffc94a',
        },
        soil: '#8b5e3c',
      },
      fontFamily: {
        fraunces: ['var(--font-fraunces)', 'Georgia', 'serif'],
        nunito: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
