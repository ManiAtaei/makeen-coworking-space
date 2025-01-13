import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens :{
      mobile : "380px",
      mobileNum: "500px",
      sm : "640px",
      md: "768px",
      lg: "1024px",
      titleNav : "1160px",
      xl : "1280px",
      containerPage : "1440px",
      "2xl": "1536px"
    },

    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      fontFamily: {
        xblack: ["x-black", "sans-serif"],

        xbold: ["x-bold", "sans-serif"],

        xdemibold: ["x-demibold", "sans-serif"],

        xextrabold: ["x-extrabold", "sans-serif"],

        xlightbold: ["x-lightbold", "sans-serif"],

        xlight: ["x-light", "sans-serif"],

        xmedium: ["x-medium", "sans-serif"],

        xregular: ["x-regular", "sans-serif"],

        xthin: ["x-thin", "sans-serif"],

        xultralight: ["x-ultralight", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
