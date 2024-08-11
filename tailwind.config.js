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
        background2: "#3A3A3A",
        background3: "#515151",
        text: "#F8F7EF",
        primary: "#E8C547",
        primary_accent: "#A28A32",
        secondary: "#4777E8",
        secondary_accent: "#3252A2",
        failure: "#BB1A24",
        success: "#6EB64B"
      }
    },
  },
  plugins: [],
}
