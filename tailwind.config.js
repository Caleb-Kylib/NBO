/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
            DEFAULT: "#2563EB",
            hover: "#1D4ED8",
        }, // Blue-600
        secondary: "#F59E0B", // Amber-500
        dark: "#1E293B", // Slate-800
        light: "#F3F4F6", // Gray-100
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
