/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--colors-flat-primary-flat)",
        success: "var(--colors-flat-success-flat)",
        danger: "var(--colors-flat-danger-flat)",
        warning: "var(--colors-flat-warning-flat)",
        default: "var(--colors-flat-default-flat)",
      },
    },
  },
  plugins: [],
};
