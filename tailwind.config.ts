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
          default: "#E2E9E4",
          bright: "#efefef",
        },
        primary : {
          default: "#9B7DD7",
          bright: "#B19CDA",
        },
        text: {
          default: "#6A3788",
          bright: "#8A669E"
        },
        secondary: {
          default: "#EEA370",
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
