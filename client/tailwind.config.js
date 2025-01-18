/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      signinpurple: '#4C43E0',
      buttonblue: '#8771d9',
      buttonbluehover: '#5f4f9c',
      buttonpurple: '#c171d9',
      buttonpurplehover: '#9355a6',
      white: '#FFFFFF',
      black: '#000000',
      blue: '#66a5ed',
      grey: '#808080',
      violet: '#8A2BE2',
      slate: '#708090',
      yellow: '#FFD700',
      green: '#008000',
      footer: '#fcfcfc',
    },
    backgroundImage: {
      heropattern: "url('https://images.unsplash.com/photo-1729113849434-6b9380ba0968?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      headerbg: "url('https://images.unsplash.com/photo-1533846102306-40e8f1facf0a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    },
    plugins: [
      require('tailwind-scrollbar-hide'),
    ],
  },
}