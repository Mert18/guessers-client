import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.6rem'
      },
      colors: {
        background: {
          default: "#FDFBFB",
          bright: "#FDFBFB",
        },
        primary : {
          default: "#297373",
          bright: "#297373",
        },
        text: {
          default: "#333333",
          bright: "#333333"
        },
        secondary: {
          default: "#FF8552",
        },
        failure: "#DA3E3E",
        success: "#32CD32"
      }
    },
  },
  variants: {
    scrollbar: ['rounded'],
  },
  plugins: [],
} satisfies Config;
