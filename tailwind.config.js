/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        smokeWhite: "#F3F4F6",
        lightGray: "#ADB6CF",
        accentBlue: "#397EF6",
        accentBlueFocus: "#397EF655",
        lightBlack: "#2F2E37",
      },
      boxShadow: {
        focus: "0 0 0 0.25rem #000",
      },
    },
  },
  plugins: [],
};
