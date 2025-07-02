/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          coral: '#FE5F55',
          white: '#FFFFFF',
          blue: '#2A324B',
          green: '#3A7D44',
          yellow: '#F2AF29',
          black: '#000000',
        },
      },
    },
  },
  plugins: [],
};
