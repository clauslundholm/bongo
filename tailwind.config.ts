import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bongo: {
          pink: "#FF1FA2",
          "pink-deep": "#E0007C",
          yellow: "#FFE600",
          "yellow-deep": "#FFD400",
          black: "#0A0A0A",
          ink: "#141414",
          cream: "#FFF6E9",
          purple: "#7A1FFF",
          cyan: "#00E5FF",
        },
        // ProfitPulse-style admin palette
        admin: {
          bg: "#C9B79C",
          ink: "#15181E",
          ink2: "#1E222A",
          panel: "#F4F2ED",
          card: "#FFFFFF",
          line: "#E8E5DD",
          muted: "#8C8A84",
          yellow: "#F4D03F",
          "yellow-soft": "#FBEFBE",
          "yellow-text": "#7A6A12",
          peach: "#F8D6B6",
          "peach-text": "#8A4D1F",
          green: "#C5E9CD",
          "green-text": "#2F6B3C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        pop: "6px 6px 0 0 #0A0A0A",
        "pop-lg": "10px 10px 0 0 #0A0A0A",
        "pop-pink": "6px 6px 0 0 #FF1FA2",
        "pop-yellow": "6px 6px 0 0 #FFE600",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        wiggle: {
          "0%,100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(255,31,162,0.7)" },
          "50%": { boxShadow: "0 0 40px 8px rgba(255,31,162,0.9)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        "marquee-fast": "marquee 12s linear infinite",
        "marquee-rev": "marquee-rev 22s linear infinite",
        wiggle: "wiggle 0.4s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "spin-slow": "spin-slow 9s linear infinite",
        "pulse-glow": "pulse-glow 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
