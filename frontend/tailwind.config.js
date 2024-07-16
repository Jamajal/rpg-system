/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      width:{
        '73': '1235px',
      },

      height:{
        '73': '900px',
        'login': '410px'
      },
      
      colors: {
        'body': '#FFFFFF',
        'aside': '#EAE8E7',
        'main': '#F0F0F0'
      }
    },
  },
  plugins: [],
};
