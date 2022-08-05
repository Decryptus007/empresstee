/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        600: "60vh",
        800: "80vh",
        1150: "115vh",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    borderRadius: {
      'about': '3rem',
    },
  },
  plugins: [],
};
