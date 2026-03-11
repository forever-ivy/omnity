import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        macos: {
          bg: "#FAFAF7",
          card: "#FFFFFF",
          orange: "#CC7B5C",
          "orange-hover": "#BF6D4D",
          gray: "#666663",
          "gray-light": "#BFBFBA",
          text: "#191919",
          "text-secondary": "#666663",
          slate: {
            dark: "#191919",
            medium: "#262625",
            light: "#40403E",
          },
          ivory: {
            dark: "#E5E4DF",
            medium: "#F0F0EB",
            light: "#FAFAF7",
          },
          kraft: "#D4A27F",
          error: "#BF4D3F",
          focus: "#6DA4F5",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        macos: "16px",
        "macos-lg": "20px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0, 0, 0, 0.04)",
        hover: "0 8px 32px rgba(0, 0, 0, 0.08)",
      },
      backdropBlur: {
        macos: "24px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        serif: ["var(--font-crimson)", "Georgia", "serif"],
        mono: ["SF Mono", "Monaco", "Menlo", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
