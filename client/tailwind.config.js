/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '350px',
      sm: '600px',
      md: '905px',
      lg: '1280px',
      xl: '1440px',
      xx: '1920px'
    },
    extend: {
      colors: {
        primary: '#024881',
        secondary: '#152533',
        complementary: '#dcdde1',
        black: '#1f2020',
        white: '#f8f8f8',
        'gray-darker': '#202020',
        'gray-dark': '#2f3640',
        gray: '#535c68',
        'gray-light': '#939ba5',
        'gray-lighter': '#bdc3c7',
        successful: '#0c0',
        warning: '#da8908',
        error: '#c0392b',
        alert: '#8e44ad',
        info: '#2980b9'
      }
    }
  },
  plugins: []
};
