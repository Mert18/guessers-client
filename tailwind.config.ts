import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'linear-primary': "url('/backgrounds/login-bg.png')",
      },
      fontSize: {
        '2xs': '0.6rem'
      },
      colors: {
        primary : {
          DEFAULT: "#8f6ed1",
          bright: "#9068ee",
          dark: "#6542B5",
          darker: "#5c38ae"
        },
        white: {
          DEFAULT: "#EEF8FF",
          bright: "#FBFDFF"
        },
        black: {
          DEFAULT: "#353535",
          bright: "#464646"
        },
        secondary: {
          DEFAULT: "#26c0bd",
          bright: "#2bcac6",
          dark: "#21b1ad"
        },
        failure: "#CE4A3A",
        success: "#4EE521",
        warning: "#E28043"
      }
    },
  },
  variants: {
    scrollbar: ['rounded'],
  },
  plugins: [],
} satisfies Config;
