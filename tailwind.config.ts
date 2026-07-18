import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0b14",
        foreground: "#ffffff",
        primary: "#38bdf8",
        secondary: "#1a1c2e",
        accent: "#0ea5e9",
        muted: "#8b93b1",
        card: "#1a1c2e",
        border: "#2a2d4e",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;