import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#0a0a0f",
          800: "#0f0f18",
          700: "#161622",
          600: "#1e1e2e",
          500: "#2a2a3a",
        },
        accent: {
          purple: "#8b5cf6",
          blue: "#6366f1",
          cyan: "#22d3ee",
          violet: "#a78bfa",
        },
        muted: "#7a7a8a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "section": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
