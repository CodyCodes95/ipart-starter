/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@codythatsme/smart-suite-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: "1rem",
      sm: "1.2rem",
      base: "1.5rem",
      lg: "1.8rem",
      xl: "2rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
      "4xl": "3.5rem",
      "5xl": "4rem",
      "6xl": "4.5rem",
      "7xl": "5rem",
    },
    extend: {},
  },
  plugins: [],
};
