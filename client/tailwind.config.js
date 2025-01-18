/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      signinpurple: '#4C43E0',
      white: '#FFFFFF',
      black: '#000000',
      blue: '#66a5ed',
      grey: '#808080',
      violet: '#8A2BE2',
      slate: '#708090',
      yellow: '#FFFF00',
      green: '#008000',
      footer: '#fcfcfc',
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),

  ],
}