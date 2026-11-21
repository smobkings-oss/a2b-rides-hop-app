/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#F4C430',
          500: '#D4AF37',
          600: '#B8860B',
        },
        holographic: {
          from: '#8A2BE2',
          via: '#00CED1',
          to: '#FFD700',
        },
      },
      backgroundImage: {
        'holographic': 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        'gold-gradient': 'linear-gradient(to right, #D4AF37, #F4C430, #D4AF37)',
      },
    },
  },
  plugins: [],
}
