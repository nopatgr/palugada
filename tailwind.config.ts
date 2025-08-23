import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Custom Brand Colors for Different Pages
        'brand': {
          'home': {
            'primary': '#0ea5e9',    // Blue
            'secondary': '#14b8a6',  // Teal
            'gradient': 'from-[#0ea5e9] to-[#14b8a6]'
          },
          'product': {
            'primary': '#10b981',    // Emerald
            'secondary': '#f9fafb',  // Soft Gray
            'gradient': 'from-[#10b981] to-[#059669]'
          },
          'testimonial': {
            'primary': '#8b5cf6',    // Purple
            'secondary': '#ec4899',  // Pink
            'gradient': 'from-[#8b5cf6] to-[#ec4899]'
          },
          'blog': {
            'primary': '#f97316',    // Orange
            'secondary': '#ffffff',  // White
            'gradient': 'from-[#f97316] to-[#ea580c]'
          },
          'about': {
            'primary': '#1e3a8a',    // Navy Blue
            'secondary': '#e5e7eb',  // Gray
            'gradient': 'from-[#1e3a8a] to-[#1d4ed8]'
          },
          'booking': {
            'primary': '#b91c1c',    // Maroon
            'secondary': '#ffffff',  // White
            'gradient': 'from-[#b91c1c] to-[#dc2626]'
          }
        },
        // Custom Futuristic Purple + Black Palette (for admin)
        'futuristic': {
          'primary': '#0D0D0D',
          'secondary': '#1A1A1A',
          'accent': '#7F5AF0',
          'accent-hover': '#9C84F9',
          'cyan': '#00CFFF',
          'text-primary': '#FFFFFF',
          'text-secondary': '#C5C5C5',
          'border': '#2A2A2A',
          'glow': '#00CFFF80',
          'button-secondary': '#FFFFFF20',
          'button-secondary-hover': '#333333',
        },
        // Default theme colors
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
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "slide-in-from-top": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-from-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.9)", opacity: "0" },
        },
        "rotate-in": {
          "0%": { transform: "rotate(-180deg)", opacity: "0" },
          "100%": { transform: "rotate(0deg)", opacity: "1" },
        },
        "rotate-out": {
          "0%": { transform: "rotate(0deg)", opacity: "1" },
          "100%": { transform: "rotate(180deg)", opacity: "0" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "bounce-out": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.3)", opacity: "0" },
        },
        "flip-in": {
          "0%": { transform: "perspective(400px) rotateY(90deg)", opacity: "0" },
          "40%": { transform: "perspective(400px) rotateY(-20deg)" },
          "60%": { transform: "perspective(400px) rotateY(10deg)" },
          "80%": { transform: "perspective(400px) rotateY(-5deg)" },
          "100%": { transform: "perspective(400px) rotateY(0deg)", opacity: "1" },
        },
        "flip-out": {
          "0%": { transform: "perspective(400px) rotateY(0deg)", opacity: "1" },
          "100%": { transform: "perspective(400px) rotateY(-90deg)", opacity: "0" },
        },
        "zoom-in": {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "zoom-out": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.5)", opacity: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-left": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-slow-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-delay": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "float-delay-2": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-25px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.5s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.5s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.5s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.5s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        "scale-out": "scale-out 0.5s ease-out",
        "rotate-in": "rotate-in 0.5s ease-out",
        "rotate-out": "rotate-out 0.5s ease-out",
        "bounce-in": "bounce-in 0.6s ease-out",
        "bounce-out": "bounce-out 0.6s ease-out",
        "flip-in": "flip-in 0.6s ease-out",
        "flip-out": "flip-out 0.6s ease-out",
        "zoom-in": "zoom-in 0.5s ease-out",
        "zoom-out": "zoom-out 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        "slide-left": "slide-left 0.5s ease-out",
        "slide-right": "slide-right 0.5s ease-out",
        "spin-slow": "spin-slow 20s linear infinite",
        "spin-slow-reverse": "spin-slow-reverse 25s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delay": "float-delay 6s ease-in-out infinite 2s",
        "float-delay-2": "float-delay-2 6s ease-in-out infinite 4s",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "slow-zoom": "slow-zoom 20s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
