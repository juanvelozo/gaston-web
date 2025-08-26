// tailwind.config.js
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    'toast-base',
    'toast-title',
    'toast-description',
    // También agregamos patrones para no purgar clases con atributos data-type
    {
      pattern: /toast-base/,
    },
    {
      pattern: /(backdrop|bg|text|border)-(.*)/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        'work-sans': ['Work Sans', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
      },

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
