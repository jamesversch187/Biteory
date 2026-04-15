import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#F5EFE6',
        cream: '#EFE6D5',
        'warm-border': '#D8C9B5',
        sand: '#C4A882',
        earth: '#8B6D47',
        bark: '#5C3D1E',
        ink: '#2C1A0E',
        upvote: '#A0522D',
        downvote: '#9B6B7D',
        'white-warm': '#FDFAF6',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
