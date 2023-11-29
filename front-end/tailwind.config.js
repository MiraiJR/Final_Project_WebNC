/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/application/**/*.{ts,tsx}",
    "./src/shared/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
    borderRadius: {
      xs: "12px",
      sm: "24px",
      base: "30px",
      lg: "48px",
      xl: "58px",
      xxxl: "200px",
    },
    fontSize: {
      xs: "12px",
      sm: "24px",
      base: "30px",
      lg: "48px",
      xl: "58px",
    },
    container: {
      base: "1000px",
    },
  },
  plugins: [],
};
