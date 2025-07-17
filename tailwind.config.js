/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    'backdrop-blur-sm',
    'backdrop-saturate-150',
    'bg-opacity-60',
    'bg-opacity-50',
    'bg-opacity-80',
    'text-brand-white',
    'text-brand-black',
    'bg-brand-green',
    'bg-brand-coral',
    'bg-brand-yellow',
    'bg-brand-teal',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          coral: '#FE5F55',
          white: '#FEFAFA',
          blue: '#2A324B',
          green: '#3A7D44',
          yellow: '#F2AF29',
          black: '#101720',
          teal: '#2A9D8F',
          navy: '#1E2A38',
          olive: '#7D883B',
          softPink: '#F1A9F0',
          burntOrange: '#D95D39',
          skyBlue: '#69A9D0',
        },
      },
    },
  },
  plugins: [],
};
