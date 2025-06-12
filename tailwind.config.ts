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
        "linear-primary": "url('/backgrounds/login-bg.png')",
      },
      fontSize: {
        "2xs": "0.6rem",
      },
      colors: {
        primary: {
          DEFAULT: "#6C63FF",
          bright: "#7C74FF",
          dark: "#5246DD",
          darker: "#453ABD",
        },
        white: {
          DEFAULT: "#F5F7FA",
          bright: "#FFFFFF",
          darker: "#E8E8E8",
        },
        black: {
          DEFAULT: "#2D2D2D",
          bright: "#3A3A3A",
        },
        secondary: {
          DEFAULT: "#3DB8A5",
          bright: "#52CBBB",
          dark: "#309D8C",
        },
        failure: {
          DEFAULT: "#E74C3C",
          bright: "#EE5A49",
          dark: "#C0392B",
        },
        success: {
          DEFAULT: "#2ECC71",
          bright: "#45D77C",
          dark: "#27AE60",
        },
        warning: {
          DEFAULT: "#F39C12",
          bright: "#F4B142",
          dark: "#D68910",
        },
      },
    },
  },
  variants: {
    scrollbar: ["rounded"],
  },
  plugins: [],
} satisfies Config;
