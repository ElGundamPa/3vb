import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#10b981",
          foreground: "#062e24"
        },
        accent: {
          DEFAULT: "#f59e0b",
          foreground: "#3a2a06"
        },
        muted: {
          DEFAULT: "#6b7280",
          foreground: "#111827"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        fadeUp: "fadeUp 700ms ease-in-out both"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;

