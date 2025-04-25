/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon': '#97FB57',
        'blak': '#121212',
        'darkGrey': '#909090',
        'lightgrey': '#F6F2F2',
        'customlightBlack': '#444444',
        'darkGreen': '#337418',
        'customwhite': '#F8F8F8'

      },
      boxShadow: {
        neon: '0 0 20px #39ff14, 0 0 40px #39ff14', 
      },
    },
  },
  plugins: [],
}
