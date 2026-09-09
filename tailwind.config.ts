import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050609",
        black: "#000000",
        paper: "#ffffff",
        smoke: "#fafafa",
        mist: "#f2f2f2",
        line: "#ebebeb",
        rule: "#d9d9d9",
        steel: "#d5d7de",
        muted: "#797d82",
        muted2: "#888d92",
        deep: "#5c6063",
        coal: "#141414",
        accent: "#ff6041",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      screens: { xs: "430px", sm: "640px", md: "810px", lg: "1024px", xl: "1200px", "2xl": "1440px" },
      maxWidth: { shell: "1600px", prose2: "1440px" },
      transitionTimingFunction: { swift: "cubic-bezier(0.22,1,0.36,1)" },
    },
  },
  plugins: [],
};
export default config;
