/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      width:{
        '73': '40px',
        '74': '1200px',
      },

      height:{
        '73': '20px',
        '74': '850px',
      },
      
    },
  },
  plugins: [],
};
