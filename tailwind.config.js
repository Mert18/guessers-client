/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionDuration: {
        '3000': '3000ms',
      },
      colors: {
        'primary': '#000000',
        'primary-brighter': '#333333',
        'background': '#ECF0F1',
        'background-darker': '#D5DCDE',
        'background-brighter': '#FFFFFF',
        'background-accent': '#E1E7E9',
        'secondary': '#E25555',
        'secondary-darker': '#B02B2B',
        'tertiary': '#A1C398',
        'tertiary-darker': '#71B060',
        'quaternary': '#EBBF8C',
        'quaternary-darker': '#CC924E',
      }
    },
  },
  plugins: [],
}
