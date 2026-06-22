/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terra-bg':      '#2C2825',
        'terra-forest':  '#1E2922',
        'terra-text':    '#EAE5DE',
        'terra-clay':    '#A3765D',
        'terra-mist':    '#C4BDB4',
        'terra-warm':    '#3A3330',
      },
      fontFamily: {
        serif:  ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans:   ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':        'fadeIn 1.2s ease forwards',
        'fade-in-slow':   'fadeIn 1.8s ease forwards',
        'fade-up':        'fadeUp 1s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'linen': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeBlend in='SourceGraphic' mode='multiply'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
