/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.6rem'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        background: "#1F1A24",
        background90: "#1F1A2490",
        text: "#E8F1F2",
        text90: "#E8F1F290",
        primary: "#ECEC3C",
        primary90: "#ECEC3C90",
        secondary: "#BB6D1E",
        secondary90: "#BB6D1E90",
        tertiary: "#9649CB",
        tertiary90: "#9649CB90",
        failure: "#CF1919",
        failure90: "#CF191990",
        success: "#4EE521",
        success90: "#4EE52190"
      }
    },
  },
  variants: {
    scrollbar: ['rounded'],
  },
  plugins: [],
}
