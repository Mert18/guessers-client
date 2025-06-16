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
          DEFAULT: "#efefef",
          bright: "#FBFDFF",
          dark: "#e7e7e7"
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
        failure: {
          DEFAULT: "#CE4A3A",
          bright: "#d85747",
          dark: "#b83a2b",
        },
        success: {
          DEFAULT: "#3dba18",
          bright: "#4ac824",
          dark: "#34a412",
        },
        warning: {
          DEFAULT: "#E28043",
          bright: "#f0955c",
          dark: "#cc7037",
        }
      }
    },
  },
  variants: {
    scrollbar: ['rounded'],
  },
  plugins: [],
} satisfies Config;
