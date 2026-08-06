/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary — dark forest green
        forest: {
          50: '#f0f7f3',
          100: '#dceee3',
          200: '#bbddc9',
          300: '#8ec4a6',
          400: '#5ba67d',
          500: '#3a8a5f',
          600: '#2a6f4a',
          700: '#22593d',
          800: '#1e4733',
          900: '#1a3a2a',
          950: '#0d2218',
        },
        // Secondary — ocean blue
        ocean: {
          50: '#eef6fb',
          100: '#d4eaf5',
          200: '#b0d9ec',
          300: '#7fc0dd',
          400: '#47a0c8',
          500: '#2884b0',
          600: '#1e6b94',
          700: '#1c5878',
          800: '#1e4a64',
          900: '#1d3f54',
          950: '#152a38',
        },
        // Beige — background + warm neutrals
        beige: {
          50: '#faf7f0',
          100: '#f5f0e6',
          200: '#ebe2d2',
          300: '#ddcfb8',
          400: '#cab594',
          500: '#b59e76',
          600: '#9a8560',
          700: '#7d6b4e',
          800: '#655640',
          900: '#544639',
          950: '#332a22',
        },
        // Accent — warm gold (kept for highlights)
        gold: {
          50: '#fffaec',
          100: '#fff1c9',
          200: '#ffe08e',
          300: '#ffc94f',
          400: '#fbb523',
          500: '#f4970a',
          600: '#d97506',
          700: '#b4530b',
          800: '#924210',
          900: '#783612',
          950: '#421a06',
        },
        coral: {
          50: '#fff3f0',
          100: '#ffe2d9',
          200: '#ffc4b3',
          300: '#ff9c80',
          400: '#fb6f4f',
          500: '#ef4d2a',
          600: '#db3a1e',
          700: '#b62c18',
          800: '#93281b',
          900: '#79261c',
          950: '#410f08',
        },
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(13, 34, 24, 0.08), 0 8px 24px -8px rgba(13, 34, 24, 0.10)',
        card: '0 20px 50px -20px rgba(13, 34, 24, 0.40), 0 8px 20px -12px rgba(13, 34, 24, 0.25)',
        glow: '0 0 40px -8px rgba(42, 111, 74, 0.45)',
        ocean: '0 0 40px -8px rgba(40, 132, 176, 0.45)',
        gold: '0 0 36px -6px rgba(244, 151, 10, 0.5)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'float-lg': {
          '0%, 100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(-12px, 22px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-lg': 'float-lg 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
