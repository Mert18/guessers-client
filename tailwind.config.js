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
        'primary': '#505050',
        'primary-darker': '#333131',
        'primary-brighter': '#7B7878',
        'background': '#ECF0F1',
        'background-darker': '#D5DCDE',
        'background-brighter': '#FFFFFF',
        'background-accent': '#E1E7E9',
        'secondary': '#F39361',
        'secondary-brighter': '#F1BA9D',
        'secondary-darker': '#DE6A2E',
        'tertiary': '#EBE3D6',
        'tertiary-brighter': '#F5F1E9',
        'tertiary-darker': '#D7CBB9',
        'success': '#A1C398',
        'success-brighter': '#CAE3C3',
        'success-darker': '#71B060',
        'error': '#E25555',
        'error-brighter': '#ED8989',
        'error-darker': '#B02B2B',
        'quaternary': '#EBBF8C',
        'quaternary-darker': '#CC924E',
      }
    },
  },
  plugins: [],
}
