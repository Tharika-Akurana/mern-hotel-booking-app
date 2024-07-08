/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        goldenYellow: '#FFD700',
        darkGold: '#B8860B',
        lightGold: '#FFFACD',
        goldLeaf: '#DAA520',
        richBrown: '#8B4513',
        warmBeige: '#F5F5DC',
        charcoal: '#36454F',
        ivory: '#FFFFF0',
        whiteSmoke: '#F5F5F5',
        saffron: '#F7C319',
        Sunglow: '#FACF43',
        cream: '#FDFBCF',
      },
    },
  },
  plugins: [],
}