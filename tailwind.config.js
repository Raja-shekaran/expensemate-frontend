/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        secondary: "#facc15",
        accent: "#10b981",
        danger: "#ef4444",
        cardBg: "#ffffff",
        tableHeader: "#6366f1",
      },
      boxShadow: {
        soft: "0 2px 12px rgba(0,0,0,0.08)",
        card: "0 4px 18px rgba(0,0,0,0.12)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
    },
  },
  plugins: [],
};
