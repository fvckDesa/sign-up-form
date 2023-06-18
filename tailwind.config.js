/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        smokeWhite: "#F3F4F6",
        lightGray: "#ADB6CF",
        accentBlue: "#397EF6",
        lightBlack: "#2F2E37",
      },
    },
  },
  plugins: [],
};
