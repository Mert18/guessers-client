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
      colors: {
        background: "#191A1D",
        background2: "#2A2E44",
        background3: "#575B70",
        text: "#F8F7EF",
        primary: "#E8C547",
        secondary: "#5C80BC",
        failure: "#BB1A24",
        success: "#6EB64B"
      }
    },
  },
  plugins: [],
}
