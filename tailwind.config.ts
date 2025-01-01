import type { Config } from "tailwindcss";

export default {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "2xs": "0.6rem",
      },
      colors: {
        primary: {
          one: {
            DEFAULT: "#007BFF",
            hover: "#0056B3",
          },
          two: {
            DEFAULT: "#FF9500",
            hover: "#CC7700",
          },
        },
        dark: {
          bg: {
            DEFAULT: "#020f1d",
            sec: "#031629"
          },
          text: {
            DEFAULT: "#eeeeee",
            sec: "#efefef"
          }
        },
        light: {
          bg: {
            DEFAULT: "#eeeeee",
            sec: "#e7e7e7"
          },
          text: {
            DEFAULT: "#333333",
            sec: "#010101"
          }
        },
        feedback: {
          success: "#28A745",
          failure: "#DC3545",
          info: "#17A2B8",
        },
      },
    },
  },
  variants: {
    scrollbar: ["rounded"],
  },
  plugins: [],
} satisfies Config;
